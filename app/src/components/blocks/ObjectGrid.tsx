'use client';

import { useMemo, useState } from 'react';
import {
  ListingCard,
  toListing,
  type WoningCardInput,
} from '@/components/blocks/Listings';
import { Button } from '@/components/ui/Button';
import { Wrap } from '@/components/ui/Wrap';
import {
  AANBOD_CTA_AFTER,
  AANBOD_EMPTY,
  AANBOD_GRID_CTA,
  AANBOD_LABELS,
  AANBOD_PAGE_SIZE,
  AANBOD_PRICE_RANGES,
  AANBOD_SORTINGS,
  AANBOD_STATUS_FILTERS,
} from '@/lib/aanbod-content';
import { cn } from '@/lib/cn';

export type ObjectGridItem = WoningCardInput & {
  aangebodenSinds?: string | null;
};

export type ObjectGridCta = {
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
};

export type ObjectGridProps = {
  items?: ObjectGridItem[];
  ctaCard?: ObjectGridCta;
  emptyTitle?: string;
  emptyBody?: string;
};

const selectClass = cn(
  'w-full appearance-none rounded-pill border border-ink/18 bg-white',
  'py-[13px] pr-10 pl-[18px] text-[0.84rem] font-medium text-ink',
  'cursor-pointer transition-colors duration-[250ms] ease-brand hover:border-ink',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy',
  'bg-[linear-gradient(45deg,transparent_50%,#5f544e_50%),linear-gradient(135deg,#5f544e_50%,transparent_50%)]',
  'bg-[length:6px_6px,6px_6px] bg-[position:calc(100%-20px)_21px,calc(100%-14px)_21px] bg-no-repeat',
  'max-sm:py-3 max-sm:pr-9 max-sm:pl-[15px] max-sm:text-[0.8rem]',
);

/** Filter bar + listing grid, filtered and sorted in the browser over all objects. */
export function ObjectGrid({
  items = [],
  ctaCard,
  emptyTitle = AANBOD_EMPTY.title,
  emptyBody = AANBOD_EMPTY.body,
}: ObjectGridProps = {}) {
  const [status, setStatus] = useState<string>('alle');
  const [plaats, setPlaats] = useState<string>('alle');
  const [prijs, setPrijs] = useState<string>('alle');
  const [sortering, setSortering] = useState<string>('nieuw');
  const [visible, setVisible] = useState(AANBOD_PAGE_SIZE);

  const places = useMemo(
    () =>
      [...new Set(items.map((item) => item.plaats).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, 'nl'),
      ),
    [items],
  );

  const shown = useMemo(() => {
    const range = AANBOD_PRICE_RANGES.find((option) => option.value === prijs);

    const filtered = items.filter((item) => {
      if (status !== 'alle' && (item.status ?? 'beschikbaar') !== status) return false;
      if (plaats !== 'alle' && item.plaats !== plaats) return false;
      if (range && range.value !== 'alle') {
        const price = item.prijs ?? 0;
        if (price < range.min) return false;
        if (range.max !== null && price >= range.max) return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortering === 'laag') return (a.prijs ?? 0) - (b.prijs ?? 0);
      if (sortering === 'hoog') return (b.prijs ?? 0) - (a.prijs ?? 0);
      return (b.aangebodenSinds ?? '').localeCompare(a.aangebodenSinds ?? '');
    });
  }, [items, status, plaats, prijs, sortering]);

  const page = shown.slice(0, visible);
  const reset = <T,>(set: (value: T) => void) => (value: T) => {
    set(value);
    setVisible(AANBOD_PAGE_SIZE);
  };

  const gridCta =
    shown.length > 0 ? (
      <div
        key='cta'
        className={cn(
          'relative flex min-h-[280px] flex-col justify-center overflow-hidden rounded bg-ink px-8 py-9 text-cream',
          'before:absolute before:-bottom-[130px] before:-left-[70px] before:h-[230px] before:w-[230px]',
          'before:rounded-full before:bg-cream/5 before:content-[""]',
          'after:pointer-events-none after:absolute after:-top-[120px] after:-right-[90px]',
          'after:h-[300px] after:w-[300px] after:rounded-full after:border after:border-cream/14 after:content-[""]',
          'max-sm:min-h-0 max-sm:px-[26px] max-sm:py-[30px]',
        )}
      >
        <h3 className='relative z-[2] mb-[11px] text-[1.5rem] text-white'>
          {ctaCard?.title ?? AANBOD_GRID_CTA.title}
        </h3>
        <p className='relative z-[2] mb-[22px] text-[0.92rem] leading-[1.65] text-taupe'>
          {ctaCard?.body ?? AANBOD_GRID_CTA.body}
        </p>
        <Button
          href={(ctaCard?.cta ?? AANBOD_GRID_CTA.cta).href}
          size='sm'
          className='relative z-[2] self-start max-sm:w-full max-sm:justify-center'
        >
          {(ctaCard?.cta ?? AANBOD_GRID_CTA.cta).label}
        </Button>
      </div>
    ) : null;

  const cards = page.map((item) => (
    <ListingCard key={item.slug} listing={toListing(item)} />
  ));
  if (gridCta) {
    cards.splice(Math.min(AANBOD_CTA_AFTER, cards.length), 0, gridCta);
  }

  return (
    <>
      <div
        className={cn(
          'sticky top-[76px] z-[60] mb-11 border-b border-ink/12 bg-cream py-[18px]',
          'max-md:top-[72px] max-sm:mb-[30px] max-sm:py-3.5',
        )}
      >
        <Wrap className='flex flex-wrap items-center gap-3.5 max-md:gap-3'>
          <div
            role='group'
            aria-label={AANBOD_LABELS.statusGroup}
            className={cn(
              'flex flex-wrap gap-2',
              'max-sm:-mx-5 max-sm:w-full max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:px-5',
              'max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden',
            )}
          >
            {AANBOD_STATUS_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type='button'
                aria-pressed={status === filter.value}
                onClick={() => reset(setStatus)(filter.value)}
                className={cn(
                  'shrink-0 rounded-pill border px-[19px] py-[13px] text-[0.84rem] font-semibold whitespace-nowrap',
                  'cursor-pointer transition duration-300 ease-brand',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy',
                  'max-sm:px-4 max-sm:py-3 max-sm:text-[0.8rem]',
                  status === filter.value
                    ? 'border-ink bg-ink text-cream'
                    : 'border-ink/20 hover:border-ink',
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className='ml-auto flex flex-wrap items-center gap-2.5 max-md:ml-0 max-md:w-full max-sm:gap-2'>
            <label className='relative flex-1'>
              <span className='sr-only'>{AANBOD_LABELS.placeFilter}</span>
              <select
                value={plaats}
                onChange={(event) => reset(setPlaats)(event.target.value)}
                className={selectClass}
              >
                <option value='alle'>{AANBOD_LABELS.allPlaces}</option>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </label>

            <label className='relative flex-1'>
              <span className='sr-only'>{AANBOD_LABELS.priceFilter}</span>
              <select
                value={prijs}
                onChange={(event) => reset(setPrijs)(event.target.value)}
                className={selectClass}
              >
                {AANBOD_PRICE_RANGES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className='relative flex-1'>
              <span className='sr-only'>{AANBOD_LABELS.sortFilter}</span>
              <select
                value={sortering}
                onChange={(event) => setSortering(event.target.value)}
                className={selectClass}
              >
                {AANBOD_SORTINGS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <span
            aria-live='polite'
            className='text-[0.84rem] whitespace-nowrap text-ink-45 max-sm:order-3 max-sm:w-full'
          >
            {shown.length === 1 ? '1 woning' : `${shown.length} woningen`}
          </span>
        </Wrap>
      </div>

      <section className='pb-[122px] max-sm:pb-[82px]'>
        <Wrap>
          <div className='grid grid-cols-3 items-start gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[18px]'>
            {cards}
          </div>

          {shown.length === 0 ? (
            <p className='py-[72px] text-center text-ink-45'>
              <b className='mb-2 block font-display text-[1.5rem] font-medium text-ink'>
                {emptyTitle}
              </b>
              {emptyBody}
            </p>
          ) : null}

          {shown.length > visible ? (
            <div className='mt-12 flex justify-center max-sm:mt-[34px]'>
              <Button
                href='#'
                variant='ink'
                className='max-sm:w-full max-sm:justify-center'
                onClick={(event) => {
                  event.preventDefault();
                  setVisible((value) => value + AANBOD_PAGE_SIZE);
                }}
              >
                {AANBOD_LABELS.more}
              </Button>
            </div>
          ) : null}
        </Wrap>
      </section>
    </>
  );
}
