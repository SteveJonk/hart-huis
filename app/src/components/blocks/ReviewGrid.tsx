'use client';

import { useMemo, useState } from 'react';
import { ReviewCard } from '@/components/blocks/Reviews';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import {
  BEOORDELINGEN_GRID,
  BEOORDELINGEN_PAGE_SIZE,
} from '@/lib/beoordelingen-content';
import { cn } from '@/lib/cn';
import type { ReviewItem } from '@/lib/reviews';

export type ReviewGridProps = {
  title?: string;
  items?: ReviewItem[];
  more?: string;
  empty?: string;
};

/** Alle beoordelingen, in de browser gefilterd op soort en per 9 getoond. */
export function ReviewGrid({
  title = BEOORDELINGEN_GRID.title,
  items = [],
  more = BEOORDELINGEN_GRID.more,
  empty = BEOORDELINGEN_GRID.empty,
}: ReviewGridProps = {}) {
  const [filter, setFilter] = useState<string>('alle');
  const [visible, setVisible] = useState(BEOORDELINGEN_PAGE_SIZE);

  const counts = useMemo(
    () =>
      BEOORDELINGEN_GRID.filters.map((option) => ({
        ...option,
        count:
          option.value === 'alle'
            ? items.length
            : items.filter((item) => item.type === option.value).length,
      })),
    [items],
  );

  const shown = useMemo(
    () => (filter === 'alle' ? items : items.filter((item) => item.type === filter)),
    [items, filter],
  );

  return (
    <section className='py-[118px] max-sm:py-[82px]'>
      <Wrap>
        <Reveal
          className={cn(
            'mb-[46px] flex flex-wrap items-end justify-between gap-8',
            'max-sm:mb-[34px] max-sm:gap-6',
          )}
        >
          <h2 className='max-w-[16ch] text-[clamp(1.9rem,3.4vw,2.8rem)] max-sm:max-w-none'>
            {title}
          </h2>
          <div
            role='group'
            aria-label='Filter beoordelingen'
            className='flex flex-wrap gap-2.5 max-sm:w-full'
          >
            {counts.map((option) => (
              <button
                key={option.value}
                type='button'
                aria-pressed={filter === option.value}
                onClick={() => {
                  setFilter(option.value);
                  setVisible(BEOORDELINGEN_PAGE_SIZE);
                }}
                className={cn(
                  'rounded-pill border px-[22px] py-[13px] text-[0.86rem] font-semibold',
                  'transition duration-300 ease-brand',
                  'max-sm:flex-1 max-sm:px-3.5 max-sm:text-[0.82rem] max-xs:basis-full',
                  filter === option.value
                    ? 'border-ink bg-ink text-cream'
                    : 'border-ink/20 hover:border-ink',
                )}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </Reveal>

        {shown.length > 0 ? (
          <Reveal>
            <div
              className={cn(
                'grid grid-cols-3 items-start gap-[26px]',
                'max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[18px]',
              )}
            >
              {shown.slice(0, visible).map((review, index) => (
                <ReviewCard
                  key={review.name + '-' + index}
                  review={review}
                  showGrades
                />
              ))}
            </div>
          </Reveal>
        ) : (
          <p className='py-[60px] text-center text-ink-45'>{empty}</p>
        )}

        {shown.length > visible ? (
          <div className='mt-12 flex justify-center max-sm:mt-[34px]'>
            <Button
              href='#'
              variant='ink'
              className='max-sm:w-full max-sm:justify-center'
              onClick={(event) => {
                event.preventDefault();
                setVisible((value) => value + BEOORDELINGEN_PAGE_SIZE);
              }}
            >
              {more}
            </Button>
          </div>
        ) : null}
      </Wrap>
    </section>
  );
}
