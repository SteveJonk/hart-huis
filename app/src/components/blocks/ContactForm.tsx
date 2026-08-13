'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '@/components/ui/Button';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { CONTACT_FORM, type ContactIconName } from '@/lib/contact-content';

/** Field shape as authored in the Sanity contact-form plugin. */
export type ContactFormField = {
  label: string;
  name: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'file';
  isRequired?: boolean;
  showPlaceholder?: boolean;
  placeholder?: string;
  helpText?: string;
  note?: string;
  selectOptions?: string[];
  radioOptions?: string[];
  checkboxOptions?: string[];
};

export type ContactFormDefinition = {
  id: string;
  title?: string;
  showtitle?: boolean;
  fields: ContactFormField[];
  submitButtonText?: string;
};

export type ContactFormAsideItem = {
  icon: ContactIconName;
  title: string;
  subtitle: string;
};

export type ContactFormAside = {
  title: string;
  body: string;
  items: ContactFormAsideItem[];
  cta?: { label: string; href: string };
};

/** Public half of the plugin's reCAPTCHA settings — the secret stays server-side. */
export type ContactFormRecaptcha = {
  enabled: boolean;
  siteKey: string;
};

export type ContactFormProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  note?: string;
  successTitle?: string;
  successBody?: string;
  form?: ContactFormDefinition;
  aside?: ContactFormAside;
  recaptcha?: ContactFormRecaptcha;
};

const DEFAULTS = {
  eyebrow: CONTACT_FORM.eyebrow,
  title: CONTACT_FORM.title,
  lead: CONTACT_FORM.lead,
  note: CONTACT_FORM.note,
  successTitle: CONTACT_FORM.successTitle,
  successBody: CONTACT_FORM.successBody,
  aside: {
    ...CONTACT_FORM.aside,
    items: [...CONTACT_FORM.aside.items],
  } as ContactFormAside,
};

/** Fields that sit two-per-row on desktop, like the design. */
const NARROW_TYPES = new Set(['text', 'email', 'tel', 'url', 'select']);

const inputClass = cn(
  'w-full rounded-[3px] border border-ink/16 bg-white px-[18px] py-4 text-[0.97rem] text-ink',
  'transition-[border-color,box-shadow] duration-250 ease-brand placeholder:text-ink-45',
  'focus:border-sage-deep focus:shadow-[0_0_0_3px_rgba(95,112,87,0.16)] focus:outline-none',
);

const labelClass =
  'mb-[9px] block text-[0.78rem] font-semibold tracking-[0.1em] text-ink-70 uppercase';

const selectCaret = {
  backgroundImage:
    'linear-gradient(45deg,transparent 50%,#5f544e 50%),linear-gradient(135deg,#5f544e 50%,transparent 50%)',
  backgroundPosition: 'calc(100% - 21px) 24px, calc(100% - 15px) 24px',
  backgroundSize: '6px 6px, 6px 6px',
  backgroundRepeat: 'no-repeat',
} as const;

/** Turns `[label](href)` in editor copy into a real link. */
function linkify(text: string): ReactNode {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    if (parts[i + 1]) {
      nodes.push(
        <Link
          key={i}
          href={parts[i + 2]}
          className='text-sage-deep underline underline-offset-[3px]'
        >
          {parts[i + 1]}
        </Link>,
      );
    }
  }
  return nodes;
}

function Field({ field }: { field: ContactFormField }) {
  const id = `field-${field.name}`;
  const placeholder = field.showPlaceholder ? field.label : field.placeholder;

  if (field.type === 'checkbox') {
    return (
      <>
        {(field.checkboxOptions ?? []).map((option) => (
          <div key={option} className='my-1.5 mb-[26px] flex items-start gap-3 max-sm:gap-3.5'>
            <input
              type='checkbox'
              id={`${id}-${option.slice(0, 12)}`}
              name={field.name}
              value={option}
              required={field.isRequired}
              className='mt-px size-[22px] shrink-0 cursor-pointer accent-sage-deep max-sm:size-[26px]'
            />
            <label
              htmlFor={`${id}-${option.slice(0, 12)}`}
              className='cursor-pointer text-[0.88rem] leading-[1.6] text-ink-70'
            >
              {linkify(option)}
            </label>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className='mb-5'>
      <label htmlFor={id} className={labelClass}>
        {field.label}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          id={id}
          name={field.name}
          required={field.isRequired}
          placeholder={placeholder}
          className={cn(inputClass, 'min-h-[150px] resize-y leading-[1.6]')}
        />
      ) : field.type === 'select' ? (
        <select
          id={id}
          name={field.name}
          required={field.isRequired}
          style={selectCaret}
          className={cn(inputClass, 'cursor-pointer appearance-none pr-[46px]')}
        >
          {(field.selectOptions ?? []).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : field.type === 'radio' ? (
        <div className='flex flex-wrap gap-x-6 gap-y-2.5'>
          {(field.radioOptions ?? []).map((option) => (
            <label
              key={option}
              className='flex cursor-pointer items-center gap-2.5 text-[0.95rem] text-ink-70'
            >
              <input
                type='radio'
                name={field.name}
                value={option}
                required={field.isRequired}
                className='size-[18px] cursor-pointer accent-sage-deep'
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          id={id}
          name={field.name}
          required={field.isRequired}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {field.helpText ? (
        <p className='mt-2 text-[0.82rem] text-ink-45'>{linkify(field.helpText)}</p>
      ) : null}
    </div>
  );
}

/** Groups consecutive narrow fields into rows of two, wide fields stand alone. */
function toRows(fields: ContactFormField[]): ContactFormField[][] {
  const rows: ContactFormField[][] = [];
  for (const field of fields) {
    const last = rows[rows.length - 1];
    if (
      NARROW_TYPES.has(field.type) &&
      last &&
      last.length === 1 &&
      NARROW_TYPES.has(last[0].type)
    ) {
      last.push(field);
    } else {
      rows.push([field]);
    }
  }
  return rows;
}

export function ContactForm({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  note = DEFAULTS.note,
  successTitle = DEFAULTS.successTitle,
  successBody = DEFAULTS.successBody,
  form,
  aside = DEFAULTS.aside,
  recaptcha,
}: ContactFormProps = {}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const usesRecaptcha = Boolean(recaptcha?.enabled && recaptcha.siteKey);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;

    const body = new FormData(event.currentTarget);
    body.set('formId', form.id);

    if (usesRecaptcha) {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setError('Bevestig even dat je geen robot bent.');
        return;
      }
      body.set('recaptchaToken', token);
    }

    setStatus('sending');
    setError(null);
    try {
      const response = await fetch('/api/submit-form', {method: 'POST', body});
      const result = (await response.json()) as {success?: boolean; message?: string};
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Versturen is niet gelukt.');
      }
      setStatus('done');
    } catch (submitError) {
      // A token is single-use: clear it so a retry gets a fresh one.
      recaptchaRef.current?.reset();
      setStatus('idle');
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Versturen is niet gelukt. Probeer het later opnieuw of bel ons even.',
      );
    }
  }

  return (
    <section className='py-[118px] max-sm:py-[82px]'>
      <Wrap
        className={[
          'grid grid-cols-[1.32fr_0.68fr] items-start gap-16',
          'max-lg:gap-[50px] max-md:grid-cols-1',
        ].join(' ')}
      >
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className='mb-4 max-w-[15ch] text-[clamp(2rem,3.6vw,3rem)] max-sm:max-w-none'>
            {title}
          </h2>
          <p className='mb-10 max-w-[48ch] leading-[1.7] text-ink-70 max-sm:mb-8 max-sm:max-w-none'>
            {lead}
          </p>

          {status === 'done' ? (
            <div className='rounded border-l-[3px] border-sage-deep bg-white px-10 py-11'>
              <h3 className='mb-2.5 text-[1.6rem]'>{successTitle}</h3>
              <p className='leading-[1.7] text-ink-70'>{successBody}</p>
            </div>
          ) : form ? (
            <form onSubmit={onSubmit}>
              {form.showtitle && form.title ? (
                <h3 className='mb-6 text-[1.4rem]'>{form.title}</h3>
              ) : null}

              {toRows(form.fields).map((row) => {
                const key = row.map((field) => field.name).join('-');
                return row.length === 2 ? (
                  <div key={key} className='grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:gap-0'>
                    {row.map((field) => (
                      <Field key={field.name} field={field} />
                    ))}
                  </div>
                ) : (
                  <Field key={key} field={row[0]} />
                );
              })}

              {usesRecaptcha ? (
                <div className='mb-6'>
                  <ReCAPTCHA ref={recaptchaRef} sitekey={recaptcha!.siteKey} />
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
                  'inline-flex items-center gap-2.5 rounded-pill border border-transparent bg-sage px-[34px] py-[17px]',
                  'text-btn font-semibold whitespace-nowrap text-moss',
                  'transition-[background,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-sage-hover',
                  'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-burgundy',
                  'disabled:pointer-events-none disabled:opacity-60',
                  'max-sm:w-full max-sm:justify-center',
                )}
              >
                {status === 'sending'
                  ? 'Bezig met versturen…'
                  : (form.submitButtonText ?? 'Verstuur bericht')}
              </button>
              {note ? <p className='mt-4 text-[0.84rem] text-ink-45'>{note}</p> : null}
            </form>
          ) : (
            <p className='text-ink-45'>
              Er is nog geen formulier gekoppeld aan dit blok.
            </p>
          )}
        </Reveal>

        {aside ? (
          <Reveal delay={1} className='sticky top-[120px] max-md:static max-md:mt-2'>
            <aside
              className={[
                'rounded bg-white px-[34px] py-[38px]',
                'max-sm:px-[26px] max-sm:py-[30px]',
              ].join(' ')}
            >
              <h3 className='mb-3.5 text-[1.42rem]'>{aside.title}</h3>
              <p className='mb-[26px] text-[0.92rem] leading-[1.7] text-ink-70'>
                {aside.body}
              </p>
              <ul className='mb-7 list-none'>
                {aside.items.map((item) => (
                  <li
                    key={item.title}
                    className='flex items-start gap-[13px] border-t border-cream py-[13px] first:border-t-0 first:pt-0'
                  >
                    <span className='mt-[3px] shrink-0 text-sage-deep'>
                      <ContactIcon icon={item.icon} size={17} />
                    </span>
                    <span>
                      <b className='block text-[0.94rem] font-semibold'>{item.title}</b>
                      <span className='text-[0.83rem] text-ink-45'>{item.subtitle}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {aside.cta ? (
                <Button href={aside.cta.href} className='w-full justify-center'>
                  {aside.cta.label}
                </Button>
              ) : null}
            </aside>
          </Reveal>
        ) : null}
      </Wrap>
    </section>
  );
}
