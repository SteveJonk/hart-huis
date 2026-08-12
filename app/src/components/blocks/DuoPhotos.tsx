import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { OVER_ONS_DUO } from '@/lib/over-ons-content';

export type DuoPhotosImage = {
  src: string;
  alt: string;
};

export type DuoPhotosProps = {
  image?: DuoPhotosImage;
  stampValue?: string;
  stampLabel?: string;
  secondaryImage?: DuoPhotosImage;
  caption?: string;
};

const DEFAULTS: Required<DuoPhotosProps> = {
  image: OVER_ONS_DUO.image,
  stampValue: OVER_ONS_DUO.stampValue,
  stampLabel: OVER_ONS_DUO.stampLabel,
  secondaryImage: OVER_ONS_DUO.secondaryImage,
  caption: OVER_ONS_DUO.caption,
};

export function DuoPhotos({
  image = DEFAULTS.image,
  stampValue = DEFAULTS.stampValue,
  stampLabel = DEFAULTS.stampLabel,
  secondaryImage = DEFAULTS.secondaryImage,
  caption = DEFAULTS.caption,
}: DuoPhotosProps = {}) {
  return (
    <section className='pt-[72px] pb-[124px] max-md:pt-14 max-md:pb-[88px] max-sm:pt-11 max-sm:pb-[78px]'>
      <Wrap
        className={[
          'grid grid-cols-[1.15fr_0.85fr] items-end gap-[34px]',
          'max-lg:gap-11 max-md:grid-cols-1 max-md:gap-[26px]',
        ].join(' ')}
      >
        <Reveal className='relative'>
          <div className='relative aspect-[4/5] overflow-hidden rounded-arch max-sm:aspect-[3/4]'>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes='(max-width: 960px) 100vw, 55vw'
              className='object-cover'
              priority
            />
          </div>
          <div
            className={[
              'absolute right-[-40px] bottom-14 z-[3] grid size-[158px] place-items-center',
              'rounded-full bg-sand text-center shadow-stamp',
              'max-md:right-4 max-md:bottom-4 max-md:size-[124px]',
              'max-sm:right-3 max-sm:bottom-3 max-sm:size-[104px]',
              'max-xs:size-[92px]',
            ].join(' ')}
          >
            <div>
              <b className='block font-display text-[1.85rem] leading-none font-normal max-md:text-[1.55rem] max-sm:text-[1.35rem] max-xs:text-[1.2rem]'>
                {stampValue}
              </b>
              <small className='mt-1.5 block text-[0.58rem] leading-[1.4] font-semibold tracking-[0.14em] text-ink-70 max-sm:text-[0.5rem] max-sm:tracking-[0.1em]'>
                {stampLabel}
              </small>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div
            className={[
              'relative mb-16 aspect-[3/4] overflow-hidden rounded',
              'max-md:mb-0 max-md:aspect-16/10',
            ].join(' ')}
          >
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              sizes='(max-width: 960px) 100vw, 40vw'
              className='object-cover'
            />
          </div>
          <p className='mt-4 text-[0.83rem] leading-[1.6] text-ink-45'>
            {caption}
          </p>
        </Reveal>
      </Wrap>
    </section>
  );
}
