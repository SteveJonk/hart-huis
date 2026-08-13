'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import { OBJECT_BACK_LINK } from '@/lib/object-content';

export type GalleryPhoto = {
  src: string;
  alt: string;
};

type ObjectGalleryProps = {
  photos: GalleryPhoto[];
};

function IconBack() {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' aria-hidden>
      <path d='M12 7H2m3.8-3.8L2 7l3.8 3.8' stroke='currentColor' strokeWidth='1.4' />
    </svg>
  );
}

function IconPhotos() {
  return (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' aria-hidden>
      <path d='M3 5h18v14H3z' stroke='currentColor' strokeWidth='1.6' />
      <path
        d='m3 16 5-4 4 3 4-4 5 4'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinejoin='round'
      />
    </svg>
  );
}

const roundButton = cn(
  'absolute grid place-items-center rounded-full bg-white/12 text-white',
  'transition duration-[250ms] ease-brand hover:bg-white/24',
  'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sage',
);

/** The three-photo header grid, with a lightbox over the full set. */
export function ObjectGallery({ photos }: ObjectGalleryProps) {
  const [current, setCurrent] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = (index: number) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setCurrent(index);
  };

  const close = useCallback(() => {
    setCurrent(null);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setCurrent((index) =>
        index === null ? index : (index + delta + photos.length) % photos.length,
      );
    },
    [photos.length],
  );

  useEffect(() => {
    if (current === null) return;

    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [current, close, step]);

  if (photos.length === 0) return null;

  const active = current === null ? null : photos[current];

  return (
    <section className='relative pt-24 max-md:pt-[88px] max-sm:pt-20' data-solid-header>
      <Wrap>
        <Link
          href={OBJECT_BACK_LINK.href}
          className={cn(
            'mb-5 inline-flex items-center gap-[9px] text-[0.85rem] font-semibold text-ink-70',
            'transition-colors duration-[250ms] ease-brand hover:text-ink max-sm:mb-3.5',
          )}
        >
          <IconBack />
          {OBJECT_BACK_LINK.label}
        </Link>

        <div
          className={cn(
            'relative grid h-[min(62vh,540px)] grid-cols-[1.62fr_1fr] grid-rows-2 gap-3',
            'max-md:h-auto max-md:grid-cols-1 max-md:grid-rows-none',
          )}
        >
          {photos.slice(0, 3).map((photo, index) => (
            <button
              key={photo.src}
              type='button'
              onClick={() => open(index)}
              aria-label={`Foto ${index + 1} vergroten`}
              className={cn(
                'group relative cursor-pointer overflow-hidden rounded bg-sand',
                'focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-burgundy',
                index === 0
                  ? 'row-span-2 max-md:row-auto max-md:aspect-[16/10]'
                  : 'max-md:hidden',
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? '(max-width: 960px) 100vw, 60vw' : '30vw'}
                priority={index === 0}
                className='object-cover transition-opacity duration-300 ease-brand group-hover:opacity-90'
              />
            </button>
          ))}

          <button
            type='button'
            onClick={() => open(0)}
            className={cn(
              'absolute right-5 bottom-5 z-[4] flex items-center gap-[9px] rounded-pill bg-white',
              'px-[22px] py-[13px] text-[0.84rem] font-semibold shadow-[0_12px_30px_-14px_rgba(36,31,28,0.5)]',
              'transition-transform duration-[250ms] ease-brand hover:-translate-y-0.5',
              'max-md:right-4 max-md:bottom-4',
            )}
          >
            <IconPhotos />
            Alle foto&apos;s
          </button>
        </div>
      </Wrap>

      {active ? (
        <div
          role='dialog'
          aria-modal='true'
          aria-label='Fotogalerij'
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          className='fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(24,19,17,0.96)]'
        >
          <button
            ref={closeRef}
            type='button'
            onClick={close}
            aria-label='Sluiten'
            className={cn(roundButton, 'top-[22px] right-6 h-[46px] w-[46px]')}
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden>
              <path d='M6 6l12 12M18 6 6 18' stroke='currentColor' strokeWidth='1.8' />
            </svg>
          </button>

          {photos.length > 1 ? (
            <>
              <button
                type='button'
                onClick={() => step(-1)}
                aria-label='Vorige foto'
                className={cn(
                  roundButton,
                  'top-1/2 left-6 h-[52px] w-[52px] -translate-y-1/2',
                  'max-sm:left-2.5 max-sm:h-11 max-sm:w-11',
                )}
              >
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden>
                  <path
                    d='M15 5l-7 7 7 7'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              <button
                type='button'
                onClick={() => step(1)}
                aria-label='Volgende foto'
                className={cn(
                  roundButton,
                  'top-1/2 right-6 h-[52px] w-[52px] -translate-y-1/2',
                  'max-sm:right-2.5 max-sm:h-11 max-sm:w-11',
                )}
              >
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden>
                  <path
                    d='M9 5l7 7-7 7'
                    stroke='currentColor'
                    strokeWidth='1.8'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </>
          ) : null}

          <div className='relative h-[min(80vh,760px)] w-[min(92vw,1200px)] max-sm:h-[64vh] max-sm:w-[94vw]'>
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes='92vw'
              className='object-contain'
            />
          </div>

          <div className='absolute bottom-[26px] left-1/2 -translate-x-1/2 text-[0.82rem] tracking-[0.1em] text-white/75'>
            {(current ?? 0) + 1} / {photos.length}
          </div>
        </div>
      ) : null}
    </section>
  );
}
