import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CONTACT_HERO } from '@/lib/contact-content';

export type SplitHeroImage = {
  src: string;
  alt: string;
};

export type SplitHeroCta = {
  label: string;
  href: string;
};

export type SplitHeroProps = {
  breadcrumbLabel?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  lead?: string;
  primaryCta?: SplitHeroCta;
  secondaryCta?: SplitHeroCta;
  image?: SplitHeroImage;
};

const DEFAULTS: Required<SplitHeroProps> = {
  breadcrumbLabel: CONTACT_HERO.breadcrumbLabel,
  eyebrow: CONTACT_HERO.eyebrow,
  title: CONTACT_HERO.title,
  titleHighlight: CONTACT_HERO.titleEm,
  lead: CONTACT_HERO.lead,
  primaryCta: CONTACT_HERO.primary,
  secondaryCta: CONTACT_HERO.secondary,
  image: CONTACT_HERO.image,
};

/** Copy on cream next to a full-bleed photo — the contact page's opener. */
export function SplitHero({
  breadcrumbLabel = DEFAULTS.breadcrumbLabel,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  titleHighlight = DEFAULTS.titleHighlight,
  lead = DEFAULTS.lead,
  primaryCta = DEFAULTS.primaryCta,
  secondaryCta = DEFAULTS.secondaryCta,
  image = DEFAULTS.image,
}: SplitHeroProps = {}) {
  return (
    <header
      className='grid min-h-[92vh] grid-cols-[1.02fr_0.98fr] items-stretch max-md:min-h-0 max-md:grid-cols-1'
      data-solid-header=''
    >
      <div
        className={[
          'flex flex-col justify-center pt-[170px] pr-[72px] pb-24',
          'max-lg:pt-[150px] max-lg:pr-wrap max-lg:pb-[84px]',
          'max-md:order-1 max-md:px-0 max-md:pt-[126px] max-md:pb-[60px]',
          'max-sm:pt-[118px] max-sm:pb-[52px]',
        ].join(' ')}
      >
        <div
          className={[
            'ml-auto w-full max-w-[560px] pl-wrap',
            'max-md:ml-0 max-md:max-w-none max-md:px-wrap-md',
            'max-xs:px-wrap-sm',
          ].join(' ')}
        >
          <nav
            aria-label='Kruimelpad'
            className='mb-6 flex items-center gap-2.5 text-[0.78rem] text-ink-45 max-sm:mb-[18px] max-sm:text-[0.74rem]'
          >
            <Link href='/' className='transition-colors duration-250 ease-brand hover:text-ink'>
              Home
            </Link>
            <svg width='11' height='11' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
              <path d='M5 3l4 4-4 4' stroke='currentColor' strokeWidth='1.3' />
            </svg>
            <b className='font-medium text-ink'>{breadcrumbLabel}</b>
          </nav>

          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            className={[
              'mb-[22px] max-w-[14ch] text-[clamp(2.4rem,5vw,4.2rem)]',
              'max-sm:mb-[18px] max-sm:max-w-none max-sm:text-[clamp(2.05rem,8.6vw,3.2rem)]',
              'max-xs:text-[2rem]',
            ].join(' ')}
          >
            {title}
            {titleHighlight ? (
              <em className='text-burgundy italic'>{titleHighlight}</em>
            ) : null}
          </h1>
          <p
            className={[
              'mb-9 max-w-[44ch] text-lead leading-[1.72] text-ink-70',
              'max-sm:mb-7 max-sm:max-w-none max-sm:text-[0.97rem]',
            ].join(' ')}
          >
            {lead}
          </p>
          <div className='flex flex-wrap gap-3.5 max-sm:gap-2.5'>
            {primaryCta ? (
              <Button
                href={primaryCta.href}
                className='max-sm:flex-[1_1_100%] max-sm:justify-center'
              >
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button
                href={secondaryCta.href}
                variant='ink'
                className='max-sm:flex-[1_1_100%] max-sm:justify-center'
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className='relative overflow-hidden max-md:order-2 max-md:aspect-16/11 max-sm:aspect-4/3'>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes='(max-width: 960px) 100vw, 49vw'
          className='object-cover'
          priority
        />
      </div>
    </header>
  );
}
