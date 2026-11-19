'use client';

import Image from '@/components/ui/Image';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { IconArrow, IconArrowLeft } from '@/components/ui/IconArrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';

export type StoriesImage = {
  src: string;
  alt: string;
};

export type StorySlide = {
  title: string;
  /** Quote van de klant. Zonder quote toont de slide de intro als gewone tekst. */
  quote?: string;
  intro?: string;
  attribution: string;
  href: string;
  image: StoriesImage;
  /** Optioneel: met één foto vult de hoofdfoto de hele kolom. */
  secondaryImage?: StoriesImage;
};

export type StoriesProps = {
  eyebrow?: string;
  ctaLabel?: string;
  slides?: StorySlide[];
};

const DEFAULTS = {
  eyebrow: 'Klanten vertellen',
  ctaLabel: 'Lees hun verhaal',
};

const navButton = cn(
  'grid size-11 place-items-center rounded-full border border-ink/22',
  'transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream',
);

/**
 * Klantverhalen als slider. Alle slides liggen in dezelfde gridcel, zodat de
 * sectie zo hoog is als de langste slide en er niets verspringt bij wisselen.
 * Niet-actieve slides zijn `inert`: niet focusbaar en niet voorgelezen.
 */
export function Stories({
  eyebrow = DEFAULTS.eyebrow,
  ctaLabel = DEFAULTS.ctaLabel,
  slides = [],
}: StoriesProps = {}) {
  const [active, setActive] = useState(0);
  if (slides.length === 0) return null;

  const go = (step: number) => setActive((index) => (index + step + slides.length) % slides.length);

  return (
    <section
      className='relative bg-sand py-[130px] max-sm:py-[82px]'
      aria-roledescription='carrousel'
      aria-label={eyebrow}
    >
      <Wrap>
        <Reveal className='grid [grid-template-areas:"stack"]'>
          {slides.map((slide, index) => (
            <div
              key={slide.href}
              inert={index !== active}
              aria-roledescription='slide'
              aria-label={`${index + 1} van ${slides.length}`}
              className={cn(
                '[grid-area:stack] grid grid-cols-[1.05fr_0.95fr] items-center gap-20',
                'transition-opacity duration-700 ease-brand max-md:grid-cols-1 max-md:gap-14',
                index === active ? 'opacity-100' : 'pointer-events-none opacity-0',
              )}
            >
              <div
                className={cn(
                  'relative -mt-[190px] h-[600px]',
                  'max-md:mt-0 max-md:h-[430px] max-sm:h-[380px] max-xs:h-[330px]',
                )}
              >
                <div
                  className={cn(
                    'absolute top-0 left-0 h-full overflow-hidden rounded-arch',
                    slide.secondaryImage ? 'w-[70%] max-sm:w-[74%]' : 'w-full',
                  )}
                >
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    sizes='(max-width: 960px) 100vw, 50vw'
                    className='object-cover'
                  />
                </div>
                {slide.secondaryImage ? (
                  <div
                    className={cn(
                      'absolute right-0 bottom-10 h-[42%] w-[46%] overflow-hidden rounded shadow-story',
                      'max-sm:bottom-0 max-sm:h-[38%] max-sm:w-[52%]',
                    )}
                  >
                    <Image
                      src={slide.secondaryImage.src}
                      alt={slide.secondaryImage.alt}
                      fill
                      sizes='(max-width: 960px) 52vw, 24vw'
                      className='object-cover'
                    />
                  </div>
                ) : null}
              </div>

              <div>
                <Eyebrow>{eyebrow}</Eyebrow>
                <h2 className='mb-6 max-w-[14ch] text-[clamp(2.1rem,4vw,3.5rem)]'>{slide.title}</h2>
                {slide.quote ? (
                  <blockquote
                    className={cn(
                      'mb-[26px] border-l border-ink/25 pl-[26px] font-display text-[1.32rem] leading-normal italic',
                      'max-sm:pl-[18px] max-sm:text-[1.12rem]',
                    )}
                  >
                    &ldquo;{slide.quote}&rdquo;
                  </blockquote>
                ) : slide.intro ? (
                  <p className='mb-[26px] max-w-[46ch] leading-[1.72] text-[#4d3d37]'>{slide.intro}</p>
                ) : null}
                <div className='mb-[34px] text-[0.82rem] font-semibold tracking-[0.14em] text-ink-70 uppercase'>
                  {slide.attribution}
                </div>
                <Button href={slide.href} variant='ink'>
                  {ctaLabel}
                </Button>
              </div>
            </div>
          ))}
        </Reveal>

        {slides.length > 1 ? (
          <div className='mt-10 grid grid-cols-[1.05fr_0.95fr] gap-20 max-md:grid-cols-1'>
            <div className='col-start-2 flex items-center gap-2.5 max-md:col-start-1'>
              <button type='button' aria-label='Vorig verhaal' onClick={() => go(-1)} className={navButton}>
                <IconArrowLeft size={15} />
              </button>
              <button type='button' aria-label='Volgend verhaal' onClick={() => go(1)} className={navButton}>
                <IconArrow size={15} />
              </button>
              <span className='ml-3 text-[0.83rem] font-semibold tabular-nums text-ink-70' aria-live='polite'>
                {active + 1} / {slides.length}
              </span>
            </div>
          </div>
        ) : null}
      </Wrap>
    </section>
  );
}
