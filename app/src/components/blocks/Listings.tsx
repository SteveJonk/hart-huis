import type { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { RevealLink } from '@/components/ui/RevealLink';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { euro } from '@/lib/format';
import { LISTINGS } from '@/lib/home-content';
import { statusOf } from '@/lib/object-content';
import { REGIONS } from '@/lib/site';
import Link from 'next/link';

export type ListingImage = {
  src: string;
  alt: string;
};

/** Pill tone: available (white), sold subject to conditions (sand), sold (burgundy). */
export type ListingTone = 'white' | 'sand' | 'burgundy';

export type ListingItem = {
  href: string;
  status: string;
  tone?: ListingTone;
  place: string;
  title: string;
  /** Plain string on the home page; the aanbod grid passes icon + label spans. */
  meta: ReactNode;
  price: string;
  image: ListingImage;
  delay?: 1 | 2 | 3;
};

export type ListingsCta = {
  label: string;
  href: string;
};

export type ListingsRegion = {
  label: string;
  href: string;
};

export type ListingsProps = {
  title?: string;
  cta?: ListingsCta;
  items?: ListingItem[];
  regionsLabel?: string;
  regions?: ListingsRegion[];
};

const DEFAULT_ITEMS: ListingItem[] = LISTINGS.map((listing) => ({
  href: listing.href,
  status: listing.status,
  tone: listing.sold ? 'burgundy' : 'white',
  place: listing.place,
  title: listing.title,
  meta: listing.meta,
  price: listing.price,
  image: { src: listing.image, alt: listing.imageAlt },
  delay: listing.delay,
}));

const DEFAULT_REGIONS: ListingsRegion[] = REGIONS.map((region) => ({
  label: region,
  href: '#',
}));

const DEFAULTS: Required<Omit<ListingsProps, 'cta'>> & Pick<ListingsProps, 'cta'> = {
  title: 'Actueel aanbod',
  cta: { label: 'Bekijk alle woningen', href: '#' },
  items: DEFAULT_ITEMS,
  regionsLabel: 'Ook actief in:',
  regions: DEFAULT_REGIONS,
};

const toneClass: Record<ListingTone, string> = {
  white: 'bg-white text-ink',
  sand: 'bg-sand text-burgundy',
  burgundy: 'bg-burgundy text-white',
};

/** De velden van een `woning` die een kaart nodig heeft. */
export type WoningCardInput = {
  slug: string;
  adres: string;
  plaats: string;
  status?: string | null;
  prijs?: number | null;
  woonoppervlak?: number | null;
  kamers?: number | null;
  image?: ListingImage;
};

function IconArea() {
  return (
    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' aria-hidden>
      <path
        d='M4 4h16v16H4zM4 9h5M4 15h5M15 4v5M15 15v5'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  );
}

function IconRooms() {
  return (
    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' aria-hidden>
      <path
        d='M6 21V4h9v17M15 12h3v9M11 12.5h.01'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}

/**
 * Eén woning naar een kaart. Staat hier en niet in ObjectGrid, want die is een
 * client component: de server kan er dan geen functie uit aanroepen.
 */
export function toListing(item: WoningCardInput): ListingItem {
  const { label, tone } = statusOf(item.status);

  return {
    href: `/aanbod/${item.slug}`,
    status: label,
    tone,
    place: item.plaats,
    title: item.adres,
    price: euro(item.prijs) ?? 'Prijs op aanvraag',
    image: item.image ?? { src: '', alt: item.adres },
    meta: (
      <>
        {item.woonoppervlak ? (
          <span className='flex items-center gap-1.5 whitespace-nowrap'>
            <IconArea />
            {item.woonoppervlak} m²
          </span>
        ) : null}
        {item.kamers ? (
          <span className='flex items-center gap-1.5 whitespace-nowrap'>
            <IconRooms />
            {item.kamers} kamers
          </span>
        ) : null}
      </>
    ),
  };
}

export function ListingCard({ listing }: { listing: ListingItem }) {
  return (
    <RevealLink
      href={listing.href}
      delay={listing.delay}
      className={cn(
        'group block overflow-hidden rounded bg-white',
        'transition-[transform,box-shadow] duration-500 ease-brand hover:shadow-listing',
      )}
    >
      <div className='relative aspect-[4/3] overflow-hidden'>
        <span
          className={cn(
            'absolute top-4 left-4 z-[2] rounded-pill px-[13px] py-[7px]',
            'text-[0.66rem] font-semibold tracking-[0.14em] uppercase',
            toneClass[listing.tone ?? 'white'],
          )}
        >
          {listing.status}
        </span>
        <Image
          src={listing.image.src}
          alt={listing.image.alt}
          width={800}
          height={600}
          className='h-full w-full object-cover transition-transform duration-[1100ms] ease-brand group-hover:scale-[1.06]'
        />
      </div>
      <div className='px-[26px] pt-6 pb-[26px]'>
        <div className='mb-2 text-[0.74rem] font-semibold tracking-[0.16em] text-ink-45 uppercase'>
          {listing.place}
        </div>
        <h3 className='mb-4 font-sans text-[1.12rem] font-semibold tracking-normal'>
          {listing.title}
        </h3>
        <div className='flex items-baseline justify-between border-t border-cream pt-4 text-[0.86rem] text-ink-70'>
          <span className='flex gap-3.5 max-xs:gap-2.5'>{listing.meta}</span>
          <b className='font-display text-[1.3rem] font-medium text-ink'>
            {listing.price}
          </b>
        </div>
      </div>
    </RevealLink>
  );
}

export function Listings({
  title = DEFAULTS.title,
  cta = DEFAULTS.cta,
  items = DEFAULTS.items,
  regionsLabel = DEFAULTS.regionsLabel,
  regions = DEFAULTS.regions,
}: ListingsProps = {}) {
  return (
    <section className='pb-[126px] max-sm:pb-[82px]'>
      <Wrap>
        <Reveal>
          <SectionHead>
            <h2>{title}</h2>
            {cta ? (
              <Button href={cta.href} variant='ink'>
                {cta.label}
              </Button>
            ) : null}
          </SectionHead>
        </Reveal>

        <div className='grid grid-cols-3 gap-7 max-md:grid-cols-2 max-sm:grid-cols-1'>
          {items.map((listing) => (
            <ListingCard key={listing.title} listing={listing} />
          ))}
        </div>

        <Reveal className='mt-[46px] flex flex-wrap items-center gap-x-3.5 gap-y-2.5 text-[0.86rem] text-ink-45'>
          <span className='mr-1.5'>{regionsLabel}</span>
          {regions?.map((region) => (
            <Link
              key={region.label}
              href={region.href}
              className={cn(
                'rounded-pill border border-ink/16 px-[15px] py-[7px]',
                'transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream',
              )}
            >
              {region.label}
            </Link>
          ))}
        </Reveal>
      </Wrap>
    </section>
  );
}
