import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { BEOORDELINGEN_HERO } from '@/lib/beoordelingen-content';
import { cn } from '@/lib/cn';
import { gradeDistribution, type ReviewStats } from '@/lib/reviews';

export type BeoordelingenHeroCta = {
  label: string;
  href: string;
};

export type BeoordelingenHeroProps = {
  breadcrumbLabel?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  lead?: string;
  primaryCta?: BeoordelingenHeroCta;
  secondaryCta?: BeoordelingenHeroCta;
  score?: string;
  scoreLabel?: string;
  countLabel?: string;
  scoreNote?: string;
  stats?: ReviewStats;
};

const DEFAULTS = {
  breadcrumbLabel: BEOORDELINGEN_HERO.breadcrumbLabel,
  eyebrow: BEOORDELINGEN_HERO.eyebrow,
  title: BEOORDELINGEN_HERO.titleBefore,
  titleHighlight: BEOORDELINGEN_HERO.titleEm,
  lead: BEOORDELINGEN_HERO.lead,
  primaryCta: BEOORDELINGEN_HERO.primaryCta as BeoordelingenHeroCta,
  secondaryCta: BEOORDELINGEN_HERO.secondaryCta as BeoordelingenHeroCta,
  scoreLabel: BEOORDELINGEN_HERO.scoreLabel,
  scoreNote: BEOORDELINGEN_HERO.scoreNote,
};

/** Opener van /beoordelingen: copy naast de zandkleurige scorekaart. */
export function BeoordelingenHero({
  breadcrumbLabel = DEFAULTS.breadcrumbLabel,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  titleHighlight = DEFAULTS.titleHighlight,
  lead = DEFAULTS.lead,
  primaryCta = DEFAULTS.primaryCta,
  secondaryCta = DEFAULTS.secondaryCta,
  score,
  scoreLabel = DEFAULTS.scoreLabel,
  countLabel,
  scoreNote = DEFAULTS.scoreNote,
  stats = {},
}: BeoordelingenHeroProps = {}) {
  const distribution = gradeDistribution(stats);

  return (
    <header
      className='pt-[170px] pb-[108px] max-md:pt-[132px] max-md:pb-[82px] max-sm:pt-[118px] max-sm:pb-[68px]'
      data-solid-header
    >
      <Wrap
        className={cn(
          'grid grid-cols-[1.06fr_0.94fr] items-center gap-[76px]',
          'max-lg:gap-[50px] max-md:grid-cols-1 max-md:items-start',
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
              'mb-[22px] max-w-[15ch] text-[clamp(2.4rem,5vw,4.2rem)]',
              'max-md:max-w-none max-sm:mb-[18px] max-sm:text-[clamp(2.05rem,8.6vw,3.2rem)]',
            )}
          >
            {title}
            {titleHighlight ? (
              <em className='text-burgundy italic'>{titleHighlight}</em>
            ) : null}
          </h1>
          <p
            className={cn(
              'mb-[34px] max-w-[46ch] leading-[1.72] text-ink-70',
              'max-sm:mb-7 max-sm:max-w-none max-sm:text-[0.97rem]',
            )}
          >
            {lead}
          </p>
          <div className='flex flex-wrap gap-3.5'>
            <Button href={primaryCta.href} className='max-sm:w-full max-sm:justify-center'>
              {primaryCta.label}
            </Button>
            {secondaryCta ? (
              <Button
                href={secondaryCta.href}
                variant='ink'
                className='max-sm:w-full max-sm:justify-center'
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>

        <Reveal className='rounded bg-sand px-11 py-[42px] shadow-card max-sm:px-[26px] max-sm:py-[30px]'>
          <div className='mb-8 flex items-center gap-6 max-sm:mb-[26px] max-sm:gap-[18px] max-xs:flex-col max-xs:items-start max-xs:gap-4'>
            {score ? (
              <div
                className={cn(
                  'grid size-[126px] shrink-0 place-items-center rounded-full bg-cream text-center',
                  'max-sm:size-24',
                )}
              >
                <div>
                  <b className='block font-display text-[2.7rem] leading-none font-medium max-sm:text-[2rem]'>
                    {score}
                  </b>
                  <small className='mt-1.5 block text-[0.57rem] font-semibold tracking-[0.2em] text-ink-70'>
                    {scoreLabel}
                  </small>
                </div>
              </div>
            ) : null}
            <div>
              {countLabel ? (
                <b className='mb-1.5 block font-display text-[1.6rem] leading-[1.2] font-medium max-sm:text-[1.3rem]'>
                  {countLabel}
                </b>
              ) : null}
              <span className='block text-[0.88rem] leading-[1.6] text-[#5d4a43]'>
                {scoreNote}
              </span>
            </div>
          </div>

          <ul>
            {distribution.map((row) => (
              <li
                key={row.label}
                className='mb-[11px] flex items-center gap-3.5 text-[0.86rem] text-[#5d4a43] last:mb-0'
              >
                <span className='w-[26px] shrink-0 font-semibold text-ink'>{row.label}</span>
                <span className='h-1.5 flex-1 overflow-hidden rounded-pill bg-burgundy/14'>
                  <span
                    className='block h-full rounded-pill bg-sage-deep transition-[width] duration-[1.1s] ease-brand'
                    style={{ width: row.width }}
                  />
                </span>
                <span className='w-[30px] shrink-0 text-right tabular-nums'>{row.count}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Wrap>
    </header>
  );
}
