'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import type { ContactFormField } from './ContactForm';

export type FormHeroImage = { src: string; alt: string };

export type FormHeroForm = {
  id: string;
  fields: ContactFormField[];
};

export type FormHeroProps = {
  image?: FormHeroImage;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  titleAfter?: string;
  lead?: string;
  usps?: string[];
  score?: string;
  scoreLabel?: string;
  reviewCount?: string;
  reviewNote?: string;
  formTitle?: string;
  formLead?: string;
  form?: FormHeroForm;
  successTitle?: string;
  successBody?: string;
  privacyNote?: string;
};

const inputClass = cn(
  'w-full rounded-[3px] border border-ink/16 bg-white px-[18px] py-[15px] text-[0.95rem] text-ink',
  'transition-[border-color,box-shadow] duration-250 ease-brand placeholder:text-ink-45',
  'focus:border-sage-deep focus:shadow-[0_0_0_3px_rgba(95,112,87,0.16)] focus:outline-none',
);

const labelClass = 'mb-2 block text-[0.86rem] font-medium text-ink';

const selectCaret = {
  backgroundImage:
    'linear-gradient(45deg,transparent 50%,#5f544e 50%),linear-gradient(135deg,#5f544e 50%,transparent 50%)',
  backgroundPosition: 'calc(100% - 21px) 22px, calc(100% - 15px) 22px',
  backgroundSize: '6px 6px, 6px 6px',
  backgroundRepeat: 'no-repeat',
} as const;

function fieldByName(fields: ContactFormField[], name: string) {
  return fields.find((field) => field.name === name);
}

/** Turns `[label](href)` in editor copy into a real link. */
function linkify(text: string): ReactNode {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    if (parts[i + 1]) {
      nodes.push(
        <Link key={i} href={parts[i + 2]} className='underline underline-offset-[3px]'>
          {parts[i + 1]}
        </Link>,
      );
    }
  }
  return nodes;
}

function TextField({ field }: { field: ContactFormField }) {
  const id = `field-${field.name}`;
  return (
    <div className='mb-4'>
      <label htmlFor={id} className={labelClass}>
        {field.label}
      </label>
      <input
        type={field.type === 'text' ? 'text' : field.type}
        id={id}
        name={field.name}
        required={field.isRequired}
        placeholder={field.showPlaceholder ? field.label : field.placeholder}
        className={inputClass}
      />
    </div>
  );
}

function SelectField({ field }: { field: ContactFormField }) {
  const id = `field-${field.name}`;
  return (
    <div className='mb-4'>
      <label htmlFor={id} className={labelClass}>
        {field.label}
      </label>
      <select
        id={id}
        name={field.name}
        required={field.isRequired}
        defaultValue=''
        style={selectCaret}
        className={cn(inputClass, 'cursor-pointer appearance-none pr-[46px]')}
      >
        <option value=''>Maak een keuze</option>
        {(field.selectOptions ?? []).map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export function FormHero({
  image,
  eyebrow,
  title,
  titleHighlight,
  titleAfter,
  lead,
  usps = [],
  score,
  scoreLabel,
  reviewCount,
  reviewNote,
  formTitle,
  formLead,
  form,
  successTitle,
  successBody,
  privacyNote,
}: FormHeroProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const step1Ref = useRef<HTMLDivElement>(null);

  const postcode = form && fieldByName(form.fields, 'postcode');
  const huisnr = form && fieldByName(form.fields, 'huisnr');
  const woningtype = form && fieldByName(form.fields, 'woningtype');
  const naam = form && fieldByName(form.fields, 'naam');
  const mail = form && fieldByName(form.fields, 'mail');
  const tel = form && fieldByName(form.fields, 'tel');
  const termijn = form && fieldByName(form.fields, 'termijn');
  const akkoord = form && fieldByName(form.fields, 'akkoord');

  function goToStep2() {
    const container = step1Ref.current;
    if (!container) return;
    const fields = Array.from(
      container.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select'),
    );
    const allValid = fields.every((field) => field.reportValidity());
    if (allValid) setStep(2);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;

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

  return (
    <header className='relative overflow-hidden pt-[150px] pb-24 max-md:pt-[118px] max-md:pb-[72px] max-sm:pt-[104px] max-sm:pb-[60px]'>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
      ) : null}
      <div
        className='absolute inset-0 bg-[linear-gradient(180deg,rgba(30,23,20,0.42)_0%,rgba(30,23,20,0.58)_60%,rgba(30,23,20,0.78)_100%)]'
        aria-hidden='true'
      />
      <Wrap className='relative z-[3] grid grid-cols-[1.05fr_0.95fr] items-center gap-16 max-lg:gap-11 max-md:grid-cols-1'>
        <div>
          <span className='mb-[18px] block text-eyebrow font-semibold text-white/80 uppercase max-sm:mb-[13px] max-sm:tracking-[0.16em]'>
            {eyebrow}
          </span>
          <h1 className='mb-[22px] max-w-[16ch] text-[clamp(2.3rem,4.4vw,3.7rem)] text-white max-sm:max-w-none max-sm:text-[clamp(1.95rem,7.6vw,2.8rem)]'>
            {title}
            {titleHighlight ? <em className='text-sand not-italic'>{titleHighlight}</em> : null}
            {titleAfter}
          </h1>
          <p className='mb-[30px] max-w-[44ch] text-[1.08rem] leading-[1.7] text-white/90 max-sm:mb-6 max-sm:text-[0.98rem]'>
            {lead}
          </p>

          <ul className='mb-[34px] grid list-none gap-[13px] max-sm:mb-6'>
            {usps.map((usp) => (
              <li key={usp} className='flex items-start gap-[13px] text-[1rem] leading-[1.55] text-[#f0e7e3]'>
                <svg
                  width='19'
                  height='19'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='mt-[3px] shrink-0 text-sage'
                  aria-hidden='true'
                >
                  <path d='M4 12.5 9.5 18 20 7' stroke='currentColor' strokeWidth='1.9' />
                </svg>
                <span>{usp}</span>
              </li>
            ))}
          </ul>

          {score ? (
            <div className='flex flex-wrap items-center gap-5'>
              <div className='grid size-[62px] shrink-0 place-items-center rounded-full bg-sand text-burgundy'>
                <div className='text-center leading-none'>
                  <b className='block font-display text-[1.5rem]'>{score}</b>
                  <small className='mt-[3px] block text-[0.5rem] font-semibold tracking-[0.16em]'>
                    {scoreLabel}
                  </small>
                </div>
              </div>
              <p className='max-w-[30ch] text-[0.9rem] leading-[1.6] text-white/82'>
                <b className='block font-semibold text-white'>{reviewCount}</b>
                {reviewNote}
              </p>
            </div>
          ) : null}
        </div>

        <div id='formulier' className='rounded-[6px] bg-white px-9 pt-9 pb-8 max-sm:px-6 max-sm:pt-7 max-sm:pb-6'>
          {status === 'done' ? (
            <div className='py-3 text-center'>
              <div className='mx-auto mb-4 grid size-[58px] place-items-center rounded-full bg-sage/25 text-sage-deep'>
                <svg width='30' height='30' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                  <path d='M4 12.5 9.5 18 20 7' stroke='currentColor' strokeWidth='2' />
                </svg>
              </div>
              <h3 className='mb-2.5 text-[1.6rem]'>{successTitle}</h3>
              <p className='mx-auto max-w-[34ch] text-[0.95rem] leading-[1.7] text-ink-70'>
                {successBody}
              </p>
            </div>
          ) : (
            <>
              <div className='mb-6'>
                <h2 className='mb-2 text-[1.55rem]'>{formTitle}</h2>
                <p className='text-[0.92rem] leading-[1.6] text-ink-70'>{formLead}</p>
              </div>

              <div className='mb-[26px] flex items-center gap-3.5'>
                <div className='h-1 flex-1 overflow-hidden rounded-pill bg-ink/13'>
                  <span
                    className='block h-full rounded-pill bg-sage-deep transition-[width] duration-[450ms] ease-brand'
                    style={{ width: step === 1 ? '50%' : '100%' }}
                  />
                </div>
                <span className='text-[0.74rem] font-semibold tracking-[0.11em] whitespace-nowrap text-ink-45 uppercase'>
                  Stap {step} van 2
                </span>
              </div>

              {form ? (
                <form onSubmit={onSubmit}>
                  <div ref={step1Ref} hidden={step !== 1}>
                    <div className='grid grid-cols-[1.1fr_0.9fr] gap-3.5'>
                      {postcode ? <TextField field={postcode} /> : null}
                      {huisnr ? <TextField field={huisnr} /> : null}
                    </div>
                    {woningtype ? <SelectField field={woningtype} /> : null}
                    <button
                      type='button'
                      onClick={goToStep2}
                      className={cn(
                        'inline-flex w-full items-center justify-center gap-2.5 rounded-pill border border-transparent bg-sage px-[28px] py-[17px]',
                        'text-btn font-semibold text-moss transition-[background,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-sage-hover',
                      )}
                    >
                      Verder
                      <svg width='15' height='15' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
                        <path d='M2 7h10M8.2 3.2 12 7l-3.8 3.8' stroke='currentColor' strokeWidth='1.4' />
                      </svg>
                    </button>
                  </div>

                  <div hidden={step !== 2}>
                    {naam ? <TextField field={naam} /> : null}
                    <div className='grid grid-cols-2 gap-3.5 max-sm:grid-cols-1'>
                      {mail ? <TextField field={mail} /> : null}
                      {tel ? <TextField field={tel} /> : null}
                    </div>
                    {termijn ? <SelectField field={termijn} /> : null}

                    {akkoord ? (
                      <div className='my-1 mb-5 flex items-start gap-3'>
                        <input
                          type='checkbox'
                          id='field-akkoord'
                          name={akkoord.name}
                          required={akkoord.isRequired}
                          className='mt-[3px] size-[20px] shrink-0 cursor-pointer accent-sage-deep'
                        />
                        <label
                          htmlFor='field-akkoord'
                          className='cursor-pointer text-[0.85rem] leading-[1.6] text-ink-70 [&_a]:text-sage-deep'
                        >
                          {linkify(akkoord.checkboxOptions?.[0] ?? '')}
                        </label>
                      </div>
                    ) : null}

                    {error ? (
                      <p role='alert' className='mb-4 text-[0.9rem] text-burgundy'>
                        {error}
                      </p>
                    ) : null}

                    <button
                      type='submit'
                      disabled={status === 'sending'}
                      className={cn(
                        'w-full rounded-pill border border-transparent bg-sage px-[28px] py-[17px]',
                        'text-center text-btn font-semibold text-moss transition-[background,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-sage-hover',
                        'disabled:pointer-events-none disabled:opacity-60',
                      )}
                    >
                      {status === 'sending' ? 'Bezig met versturen…' : 'Vraag gratis waardebepaling aan'}
                    </button>
                    <button
                      type='button'
                      onClick={() => setStep(1)}
                      className='mt-3.5 flex w-full items-center gap-1.5 text-[0.85rem] font-medium text-ink-45 transition-colors duration-250 ease-brand hover:text-ink'
                    >
                      ← Terug naar stap 1
                    </button>
                  </div>
                </form>
              ) : (
                <p className='text-ink-45'>Er is nog geen formulier gekoppeld aan dit blok.</p>
              )}

              {privacyNote ? (
                <div className='mt-6 flex items-start gap-2.5 border-t border-ink/12 pt-5 text-[0.79rem] leading-[1.55] text-ink-45'>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='mt-px shrink-0 text-sage-deep'
                    aria-hidden='true'
                  >
                    <path
                      d='M12 3.5 4.5 6.5v6c0 4.5 3.2 7.4 7.5 8.5 4.3-1.1 7.5-4 7.5-8.5v-6z'
                      stroke='currentColor'
                      strokeWidth='1.6'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <span>{privacyNote}</span>
                </div>
              ) : null}
            </>
          )}
        </div>
      </Wrap>
    </header>
  );
}
