import Image from 'next/image';
import { FormRenderer } from '@/components/form/FormRenderer';
import { Wrap } from '@/components/ui/Wrap';
import type { FormDefinition } from '@/lib/form-fields';

export type FormHeroImage = { src: string; alt: string };

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
  form?: FormDefinition;
  privacyNote?: string;
};

/**
 * Photo hero with a form card beside it. The card is only chrome — the fields,
 * steps, buttons and confirmation all come from the `form` document that
 * `form` points at, so this block works for any form.
 */
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
  privacyNote,
}: FormHeroProps) {
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
              <li
                key={usp}
                className='flex items-start gap-[13px] text-[1rem] leading-[1.55] text-[#f0e7e3]'
              >
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

        <div
          id='formulier'
          className='rounded-[6px] bg-white px-9 pt-9 pb-8 max-sm:px-6 max-sm:pt-7 max-sm:pb-6'
        >
          {form ? (
            <FormRenderer
              form={form}
              title={formTitle}
              lead={formLead}
              footer={
                privacyNote ? (
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
                ) : null
              }
            />
          ) : (
            <p className='text-ink-45'>Er is nog geen formulier gekoppeld aan dit blok.</p>
          )}
        </div>
      </Wrap>
    </header>
  );
}
