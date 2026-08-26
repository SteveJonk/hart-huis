'use client';

import { useRef } from 'react';

import { ArrowLink } from '@/components/ui/ArrowLink';
import { IconArrow, IconArrowLeft } from '@/components/ui/IconArrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { useReviewsCarousel } from '@/hooks/useReviewsCarousel';
import { cn } from '@/lib/cn';
import { REVIEWS } from '@/lib/home-content';
import {
  formatGrade,
  formatReviewDate,
  subjectGrades,
  truncateQuote,
  type ReviewItem,
} from '@/lib/reviews';
import { SITE } from '@/lib/site';

export type { ReviewItem };

export type ReviewsLink = {
  label: string;
  href: string;
};

export type ReviewsProps = {
  score?: string;
  scoreLabel?: string;
  reviewCountLabel?: string;
  intro?: string;
  reviews?: ReviewItem[];
  link?: ReviewsLink;
  /** Deelcijfertabel per review. Uit op de homepage, aan op /beoordelingen. */
  showGrades?: boolean;
};

const DEFAULTS: Required<Omit<ReviewsProps, 'link' | 'showGrades'>> &
  Pick<ReviewsProps, 'link'> = {
  score: SITE.fundaScore,
  scoreLabel: 'OP FUNDA',
  reviewCountLabel: `${SITE.reviewCount} keer beoordeeld`,
  intro: 'Door kopers én verkopers, rechtstreeks vanuit Funda en Google.',
  reviews: REVIEWS,
  link: { label: 'Alle beoordelingen bekijken', href: '#' },
};

/** Cijferrondje, naam, datum en de soort-tag. Staat op de kaart én in de dialog. */
function ReviewMeta({ review }: { review: ReviewItem }) {
  const grade = formatGrade(review.grade);
  const date = formatReviewDate(review.date);

  return (
    <header className='mb-5 flex items-center gap-3.5 max-xs:flex-wrap'>
      {grade ? (
        <span className='grid size-[52px] shrink-0 place-items-center rounded-full bg-sand font-display text-[1.12rem] font-medium'>
          {grade}
        </span>
      ) : (
        <span className='block h-[26px] font-display text-[3.4rem] leading-[0.55] text-sand'>
          &rdquo;
        </span>
      )}
      <span className='min-w-0 flex-1 leading-[1.4]'>
        <b className='block text-[0.92rem] font-semibold'>{review.name}</b>
        {date ? <span className='text-[0.79rem] text-ink-45'>{date}</span> : null}
      </span>
      {review.type ? (
        <span className='rounded-pill border border-sage-deep/30 px-[11px] py-1.5 text-[0.6rem] font-semibold tracking-[0.14em] text-sage-deep uppercase'>
          {review.type}
        </span>
      ) : null}
    </header>
  );
}

/** Deelcijfertabel. Leeg als de review geen cijfers heeft. */
function ReviewGrades({ rows }: { rows: ReturnType<typeof subjectGrades> }) {
  if (rows.length === 0) return null;

  return (
    <dl className='mt-[22px] border-t border-cream pt-4 text-[0.83rem]'>
      {rows.map((row) => (
        <div
          key={row.label}
          className='flex items-baseline justify-between gap-4 py-[5px]'
        >
          <dt className='text-ink-45'>{row.label}</dt>
          <dd className='font-semibold tabular-nums'>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Eén beoordeling. De sizing zit bewust níet op de kaart zelf: de carousel
 * wikkelt hem in een basis-/snap-div, de /beoordelingen-grid plaatst hem direct.
 *
 * Een lange beoordeling wordt ingekort en gaat achter "Lees meer" in een
 * `<dialog>`. Uitklappen in de kaart zelf zou de hele rij (en in de carousel
 * ook de kaarten ernaast) meerekken; een dialog staat in de top layer, dus de
 * `overflow-x` van de carousel knipt hem niet af.
 */
export function ReviewCard({
  review,
  showGrades = false,
}: {
  review: ReviewItem;
  showGrades?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { text, truncated } = truncateQuote(review.quote);
  const grades = showGrades ? subjectGrades(review) : [];

  return (
    <article
      data-review-card
      className={cn(
        'flex h-full w-full flex-col rounded bg-white px-[34px] pt-9 pb-[30px]',
        'transition-[transform,translate,scale,rotate,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-card',
        'max-sm:px-[26px] max-sm:pt-[30px] max-sm:pb-[26px]',
      )}
    >
      <ReviewMeta review={review} />

      <p className='flex-1 font-display text-[1.18rem] leading-[1.55] text-ink italic max-sm:text-[1.06rem]'>
        {text}
      </p>

      {truncated ? (
        <>
          <button
            type='button'
            onClick={() => dialogRef.current?.showModal()}
            className={cn(
              'mt-3.5 self-start text-[0.83rem] font-semibold text-sage-deep underline underline-offset-[3px]',
              'transition-colors duration-[250ms] ease-brand hover:text-ink',
            )}
          >
            Lees meer
            <span className='sr-only'> over de beoordeling van {review.name}</span>
          </button>

          <dialog
            ref={dialogRef}
            // Een klik naast de kaart komt op de dialog zelf terecht, niet op
            // de inhoud — daarom zit alle padding op de div erbinnen.
            onClick={(event) => {
              if (event.target === dialogRef.current) dialogRef.current?.close();
            }}
            className={cn(
              'm-auto w-[min(620px,calc(100vw-2rem))] rounded bg-white p-0 text-ink shadow-card',
              'backdrop:bg-ink/55 backdrop:backdrop-blur-[2px]',
            )}
          >
            <div className='max-h-[80vh] overflow-y-auto px-[34px] pt-9 max-sm:px-[26px] max-sm:pt-[30px]'>
              <ReviewMeta review={review} />

              <p className='font-display text-[1.18rem] leading-[1.55] whitespace-pre-line text-ink italic max-sm:text-[1.06rem]'>
                {review.quote}
              </p>

              <ReviewGrades rows={grades} />

              {/* Plakt onderaan: bij een lange beoordeling staat de knop
                  anders duizend pixels naar beneden. */}
              <form
                method='dialog'
                className={cn(
                  'sticky bottom-0 -mx-[34px] mt-7 border-t border-cream bg-white px-[34px] pt-4 pb-7',
                  'max-sm:-mx-[26px] max-sm:px-[26px] max-sm:pb-[30px]',
                )}
              >
                <button
                  type='submit'
                  className={cn(
                    'rounded-pill border border-ink/22 px-5 py-2 text-[0.83rem] font-semibold',
                    'transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream',
                  )}
                >
                  Sluiten
                </button>
              </form>
            </div>
          </dialog>
        </>
      ) : null}

      <ReviewGrades rows={grades} />
    </article>
  );
}

export function Reviews({
  score = DEFAULTS.score,
  scoreLabel = DEFAULTS.scoreLabel,
  reviewCountLabel = DEFAULTS.reviewCountLabel,
  intro = DEFAULTS.intro,
  reviews = DEFAULTS.reviews,
  link = DEFAULTS.link,
  showGrades = false,
}: ReviewsProps = {}) {
  const { trackRef, progress, prev, next } = useReviewsCarousel();

  return (
    <section className='py-[126px] max-sm:py-[82px]'>
      <Wrap>
        <Reveal
          className={cn(
            'mb-12 flex flex-wrap items-end justify-between gap-9',
            'max-sm:mb-12 max-sm:gap-[22px]',
          )}
        >
          <div className='flex items-center gap-[26px] max-sm:gap-[18px]'>
            <div
              className={cn(
                'grid size-[132px] shrink-0 place-items-center rounded-full bg-sand text-center',
                'max-md:size-[110px] max-sm:size-[98px]',
              )}
            >
              <div>
                <b
                  className={cn(
                    'block font-display text-[2.6rem] leading-none font-normal',
                    'max-md:text-[2.1rem] max-sm:text-[1.85rem]',
                  )}
                >
                  {score}
                </b>
                <small className='mt-1.5 block text-[0.57rem] font-semibold tracking-[0.2em] text-ink-70'>
                  {scoreLabel}
                </small>
              </div>
            </div>
            <div className='max-w-[230px] text-[0.9rem] leading-[1.6] text-ink-70'>
              <b className='mb-1.5 block font-display text-[1.5rem] leading-[1.2] font-normal text-ink max-sm:text-[1.25rem]'>
                {reviewCountLabel}
              </b>
              {intro}
            </div>
          </div>
          <div className='flex gap-2.5 max-sm:hidden'>
            <button
              type='button'
              aria-label='Vorige'
              onClick={prev}
              className='grid size-11 place-items-center rounded-full border border-ink/22 transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream'
            >
              <IconArrowLeft size={15} />
            </button>
            <button
              type='button'
              aria-label='Volgende'
              onClick={next}
              className='grid size-11 place-items-center rounded-full border border-ink/22 transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream'
            >
              <IconArrow size={15} />
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div
            ref={trackRef}
            className={cn(
              // contain:layout houdt de kaarten binnen dit blok: zonder deze
              // regel lekt de scrollbare breedte (met genoeg kaarten) naar de
              // paginabreedte door, waardoor je op mobiel ver kunt uitzoomen.
              'flex gap-6 overflow-x-auto pb-2 [contain:layout] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden',
              'max-sm:-mx-wrap-md max-sm:scroll-pl-wrap-md max-sm:px-wrap-md',
              'max-xs:-mx-wrap-sm max-xs:scroll-pl-wrap-sm max-xs:px-wrap-sm',
            )}
          >
            {reviews.map((review) => (
              <div
                key={review.name}
                className={cn(
                  'flex shrink-0 basis-[400px] snap-start',
                  'max-md:basis-[320px] max-sm:basis-[min(83vw,330px)]',
                )}
              >
                <ReviewCard review={review} showGrades={showGrades} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className='relative mt-[30px] h-0.5 max-w-[300px] bg-ink/11 max-sm:mt-6 max-sm:max-w-none'>
          <span
            className='absolute top-0 left-0 h-full bg-ink transition-[width] duration-[250ms] ease-brand'
            style={{ width: `${progress}%` }}
          />
        </Reveal>

        {link ? (
          <Reveal className='mt-[38px]'>
            <ArrowLink href={link.href}>{link.label}</ArrowLink>
          </Reveal>
        ) : null}
      </Wrap>
    </section>
  );
}
