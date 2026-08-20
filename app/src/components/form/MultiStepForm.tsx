'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/cn';
import { toFieldRows, type MultiStepFormDefinition } from '@/lib/form-fields';
import { FormField, type FormFieldVariant } from './fields';

export type MultiStepFormProps = {
  form: MultiStepFormDefinition;
  /** Heading above the form. Hidden once the form has been sent. */
  title?: string;
  lead?: string;
  /** Small print under the form, shown in every state. */
  footer?: ReactNode;
  variant?: FormFieldVariant;
};

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const actionButtonClass = cn(
  'inline-flex w-full items-center justify-center gap-2.5 rounded-pill border border-transparent',
  'bg-sage px-[28px] py-[17px] text-btn font-semibold text-moss',
  'transition-[background,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-sage-hover',
  'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-burgundy',
  'disabled:pointer-events-none disabled:opacity-60',
);

function IconArrowRight() {
  return (
    <svg width='15' height='15' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
      <path d='M2 7h10M8.2 3.2 12 7l-3.8 3.8' stroke='currentColor' strokeWidth='1.4' />
    </svg>
  );
}

/**
 * Renders a Sanity-authored form over one or more steps and posts the whole
 * thing to /api/submit-form in one request.
 *
 * Every step stays mounted (hidden steps keep their values in the FormData),
 * which is why the form carries `noValidate`: the browser would otherwise
 * refuse to submit over a required field it cannot focus. Validation is driven
 * per step instead — `reportValidity()` still shows the native message.
 */
export function MultiStepForm({
  form,
  title,
  lead,
  footer,
  variant = 'compact',
}: MultiStepFormProps) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = form.steps;
  const total = steps.length;
  const isLastStep = step >= total - 1;

  function controlsOf(index: number): Control[] {
    const container = stepRefs.current[index];
    if (!container) return [];
    return Array.from(container.querySelectorAll<Control>('input, select, textarea'));
  }

  /** Silent check — safe to run on a step the user cannot see. */
  function stepIsValid(index: number) {
    return controlsOf(index).every((control) => control.checkValidity());
  }

  /** Focuses and explains the first problem on a step the user *can* see. */
  function reportStep(index: number) {
    const invalid = controlsOf(index).find((control) => !control.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    return false;
  }

  function goNext() {
    if (reportStep(step)) setStep((current) => Math.min(current + 1, total - 1));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Should only ever be the current step, since you cannot walk past an
    // invalid one — but an earlier step is still recoverable: show it first,
    // because reportValidity() cannot open a bubble on a hidden field.
    const firstInvalid = steps.findIndex((_, index) => !stepIsValid(index));
    if (firstInvalid !== -1) {
      if (firstInvalid !== step) flushSync(() => setStep(firstInvalid));
      reportStep(firstInvalid);
      return;
    }

    const body = new FormData(event.currentTarget);
    body.set('formId', form.id);

    setStatus('sending');
    setError(null);
    try {
      const response = await fetch('/api/submit-form', { method: 'POST', body });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Versturen is niet gelukt.');
      }
      setStatus('done');
    } catch (submitError) {
      setStatus('idle');
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Versturen is niet gelukt. Probeer het later opnieuw of bel ons even.',
      );
    }
  }

  if (status === 'done') {
    return (
      <>
        <div className='py-3 text-center'>
          <div className='mx-auto mb-4 grid size-[58px] place-items-center rounded-full bg-sage/25 text-sage-deep'>
            <svg width='30' height='30' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M4 12.5 9.5 18 20 7' stroke='currentColor' strokeWidth='2' />
            </svg>
          </div>
          {form.successTitle ? (
            <h3 className='mb-2.5 text-[1.6rem]'>{form.successTitle}</h3>
          ) : null}
          {form.successBody ? (
            <p className='mx-auto max-w-[34ch] text-[0.95rem] leading-[1.7] text-ink-70'>
              {form.successBody}
            </p>
          ) : null}
        </div>
        {footer}
      </>
    );
  }

  return (
    <>
      {title || lead ? (
        <div className='mb-6'>
          {title ? <h2 className='mb-2 text-[1.55rem]'>{title}</h2> : null}
          {lead ? <p className='text-[0.92rem] leading-[1.6] text-ink-70'>{lead}</p> : null}
        </div>
      ) : null}

      {total > 1 ? (
        <div className='mb-[26px] flex items-center gap-3.5'>
          <div className='h-1 flex-1 overflow-hidden rounded-pill bg-ink/13'>
            <span
              className='block h-full rounded-pill bg-sage-deep transition-[width] duration-[450ms] ease-brand'
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
          <span className='text-[0.74rem] font-semibold tracking-[0.11em] whitespace-nowrap text-ink-45 uppercase'>
            Stap {step + 1} van {total}
          </span>
        </div>
      ) : null}

      <form onSubmit={onSubmit} noValidate>
        {steps.map((formStep, index) => (
          <div
            key={index}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            hidden={index !== step}
          >
            {formStep.title ? (
              <h3 className='mb-4 text-[1.15rem]'>{formStep.title}</h3>
            ) : null}

            {toFieldRows(formStep.fields).map((row) => {
              const key = row.map((field) => field.name).join('-');
              return row.length === 2 ? (
                <div key={key} className='grid grid-cols-2 gap-3.5 max-sm:grid-cols-1 max-sm:gap-0'>
                  {row.map((field) => (
                    <FormField
                      key={field.name}
                      field={field}
                      variant={variant}
                      idPrefix={form.id}
                    />
                  ))}
                </div>
              ) : (
                <FormField
                  key={key}
                  field={row[0]}
                  variant={variant}
                  idPrefix={form.id}
                />
              );
            })}
          </div>
        ))}

        {error ? (
          <p role='alert' className='mb-4 text-[0.9rem] text-burgundy'>
            {error}
          </p>
        ) : null}

        {isLastStep ? (
          <button type='submit' disabled={status === 'sending'} className={actionButtonClass}>
            {status === 'sending'
              ? 'Bezig met versturen…'
              : (form.submitButtonText ?? 'Verstuur')}
          </button>
        ) : (
          <button type='button' onClick={goNext} className={actionButtonClass}>
            {form.nextButtonText ?? 'Verder'}
            <IconArrowRight />
          </button>
        )}

        {step > 0 ? (
          <button
            type='button'
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            className='mt-3.5 flex w-full items-center justify-center gap-1.5 text-[0.85rem] font-medium text-ink-45 transition-colors duration-250 ease-brand hover:text-ink'
          >
            ← {form.backButtonText ?? 'Terug'}
          </button>
        ) : null}
      </form>

      {footer}
    </>
  );
}
