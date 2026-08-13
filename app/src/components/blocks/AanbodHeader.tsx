import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Wrap } from '@/components/ui/Wrap';
import { AANBOD_HEADER } from '@/lib/aanbod-content';
import { cn } from '@/lib/cn';

export type AanbodHeaderCta = {
  label: string;
  href: string;
};

export type AanbodHeaderProps = {
  breadcrumbLabel?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  lead?: string;
  asideTitle?: string;
  asideBody?: string;
  asideCta?: AanbodHeaderCta;
};

const DEFAULTS: Required<AanbodHeaderProps> = {
  breadcrumbLabel: AANBOD_HEADER.breadcrumbLabel,
  eyebrow: AANBOD_HEADER.eyebrow,
  title: AANBOD_HEADER.titleBefore,
  titleHighlight: AANBOD_HEADER.titleEm,
  lead: AANBOD_HEADER.lead,
  asideTitle: AANBOD_HEADER.aside.title,
  asideBody: AANBOD_HEADER.aside.body,
  asideCta: AANBOD_HEADER.aside.cta,
};

/** Opener for the aanbod overview: copy beside the "gratis zoekopdracht" card. */
export function AanbodHeader({
  breadcrumbLabel = DEFAULTS.breadcrumbLabel,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  titleHighlight = DEFAULTS.titleHighlight,
  lead = DEFAULTS.lead,
  asideTitle = DEFAULTS.asideTitle,
  asideBody = DEFAULTS.asideBody,
  asideCta = DEFAULTS.asideCta,
}: AanbodHeaderProps = {}) {
  return (
    <header
      className='pt-[162px] pb-[46px] max-md:pt-[132px] max-md:pb-[38px] max-sm:pt-[118px] max-sm:pb-[30px]'
      data-solid-header
    >
      <Wrap
        className={cn(
          'grid grid-cols-[1.25fr_0.75fr] items-end gap-16',
          'max-lg:gap-10 max-md:grid-cols-1 max-md:items-start max-md:gap-8',
        )}
      >
        <div>
          <nav
            className='mb-6 flex items-center gap-2.5 text-[0.78rem] text-ink-45'
            aria-label='Kruimelpad'
          >
            <Link
              href='/'
              className='transition-colors duration-[250ms] ease-brand hover:text-ink hover:underline hover:underline-offset-[3px]'
            >
              Home
            </Link>
            <svg
              width='11'
              height='11'
              viewBox='0 0 14 14'
              fill='none'
              aria-hidden='true'
              className='opacity-60'
            >
              <path d='M5 3l4 4-4 4' stroke='currentColor' strokeWidth='1.3' />
            </svg>
            <b className='font-medium text-ink'>{breadcrumbLabel}</b>
          </nav>

          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            className={cn(
              'mb-5 max-w-[16ch] text-[clamp(2.3rem,4.6vw,3.8rem)]',
              'max-md:max-w-none max-sm:mb-4 max-sm:text-[clamp(2rem,8.4vw,3rem)]',
            )}
          >
            {title}
            {titleHighlight ? (
              <em className='text-burgundy italic'>{titleHighlight}</em>
            ) : null}
          </h1>
          <p className='max-w-[48ch] leading-[1.72] text-ink-70 max-sm:max-w-none max-sm:text-[0.97rem]'>
            {lead}
          </p>
        </div>

        <div className='rounded bg-sand px-[30px] py-7 max-sm:px-[22px] max-sm:py-6'>
          <b className='mb-2 block font-display text-[1.3rem] font-medium'>{asideTitle}</b>
          <p className='mb-[18px] text-[0.9rem] leading-[1.6] text-[#5d4a43]'>{asideBody}</p>
          <Button href={asideCta.href} size='sm' className='w-full justify-center'>
            {asideCta.label}
          </Button>
        </div>
      </Wrap>
    </header>
  );
}
