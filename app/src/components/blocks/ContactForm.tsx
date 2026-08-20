'use client';

import { useRef, useState, type FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FormField } from '@/components/form/fields';
import { Button } from '@/components/ui/Button';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { CONTACT_FORM, type ContactIconName } from '@/lib/contact-content';
import { toFieldRows, type FormFieldDefinition } from '@/lib/form-fields';

/**
 * Field shape as authored in the Sanity contact-form plugin — the same shape
 * the shared renderer takes, so both form types go through one code path.
 */
export type ContactFormField = FormFieldDefinition;

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
      const response = await fetch('/api/submit-form', { method: 'POST', body });
      const result = (await response.json()) as { success?: boolean; message?: string };
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

              {toFieldRows(form.fields).map((row) => {
                const key = row.map((field) => field.name).join('-');
                return row.length === 2 ? (
                  <div
                    key={key}
                    className='grid grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:gap-0'
                  >
                    {row.map((field) => (
                      <FormField key={field.name} field={field} variant='stacked' />
                    ))}
                  </div>
                ) : (
                  <FormField key={key} field={row[0]} variant='stacked' />
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
                      <span className='text-[0.83rem] text-ink-45'>
                        {item.subtitle}
                      </span>
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
