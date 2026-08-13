import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { BEOORDELINGEN_UITGELICHT } from '@/lib/beoordelingen-content';
import { cn } from '@/lib/cn';
import { formatGrade, formatReviewDate, type ReviewItem } from '@/lib/reviews';

export type UitgelichteReviewProps = {
  eyebrow?: string;
  image?: { src: string; alt: string };
  review?: ReviewItem;
};

const DEFAULTS = {
  eyebrow: BEOORDELINGEN_UITGELICHT.eyebrow,
  image: BEOORDELINGEN_UITGELICHT.image as { src: string; alt: string },
};

/** Eén uitgelichte beoordeling, groot uitgelicht naast een foto. */
export function UitgelichteReview({
  eyebrow = DEFAULTS.eyebrow,
  image = DEFAULTS.image,
  review,
}: UitgelichteReviewProps = {}) {
  if (!review) return null;

  const grade = formatGrade(review.grade);
  const date = formatReviewDate(review.date);
  const meta = [grade ? `Beoordeeld met een ${grade}` : null, date, review.type]
    .filter(Boolean)
    .join(' · ');

  return (
    <section className='bg-sand py-[118px] max-sm:py-[82px]'>
      <Wrap
        className={cn(
          'grid grid-cols-[0.78fr_1.22fr] items-center gap-[70px]',
          'max-lg:gap-[50px] max-md:grid-cols-1',
        )}
      >
        <Reveal
          className={cn(
            'relative aspect-[4/5] overflow-hidden rounded-arch',
            'max-md:aspect-[3/4] max-md:max-w-[420px] max-sm:aspect-[4/3] max-sm:max-w-none',
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes='(max-width: 960px) 100vw, 32vw'
            className='object-cover'
          />
        </Reveal>

        <Reveal delay={1}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <blockquote
            className={cn(
              'mb-7 font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.45] italic',
              'max-sm:mb-6 max-sm:text-[1.28rem]',
            )}
          >
            &ldquo;{review.quote}&rdquo;
          </blockquote>
          <div className='flex flex-wrap items-center gap-4'>
            <span className='grid size-12 shrink-0 place-items-center rounded-full bg-cream text-[0.84rem] font-semibold'>
              {review.name.slice(0, 1).toUpperCase()}
            </span>
            <span>
              <b className='block text-[0.96rem]'>{review.name}</b>
              {meta ? <span className='text-[0.83rem] text-[#5d4a43]'>{meta}</span> : null}
            </span>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
