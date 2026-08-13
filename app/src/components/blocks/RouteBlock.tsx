import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { CONTACT_ROUTE } from '@/lib/contact-content';

export type RouteBlockImage = {
  src: string;
  alt: string;
};

export type RouteColumn = {
  title: string;
  body: string;
};

export type RouteBlockProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  columns?: RouteColumn[];
  cta?: { label: string; href: string };
  image?: RouteBlockImage;
};

const DEFAULTS: Required<RouteBlockProps> = {
  eyebrow: CONTACT_ROUTE.eyebrow,
  title: CONTACT_ROUTE.title,
  lead: CONTACT_ROUTE.lead,
  columns: [...CONTACT_ROUTE.columns],
  cta: CONTACT_ROUTE.cta,
  image: CONTACT_ROUTE.image,
};

/** Dark band with opening hours, directions and a photo. */
export function RouteBlock({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  columns = DEFAULTS.columns,
  cta = DEFAULTS.cta,
  image = DEFAULTS.image,
}: RouteBlockProps = {}) {
  return (
    <section className='bg-ink py-[112px] text-cream max-sm:py-[82px]'>
      <Wrap
        className={[
          'grid grid-cols-[1.05fr_0.95fr] items-center gap-[70px]',
          'max-lg:gap-[50px] max-md:grid-cols-1',
        ].join(' ')}
      >
        <Reveal>
          <Eyebrow sand>{eyebrow}</Eyebrow>
          <h2 className='mb-[18px] max-w-[14ch] text-[clamp(1.9rem,3.4vw,2.8rem)] text-white max-sm:max-w-none'>
            {title}
          </h2>
          <p className='mb-8 max-w-[44ch] leading-[1.75] text-taupe max-sm:mb-[26px] max-sm:max-w-none'>
            {lead}
          </p>

          <div className='mb-9 grid grid-cols-2 gap-7 max-sm:mb-[30px] max-sm:grid-cols-1 max-sm:gap-[22px]'>
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className='mb-3 font-sans text-[0.72rem] font-semibold tracking-[0.2em] text-[#9d8c85] uppercase'>
                  {column.title}
                </h4>
                <p className='text-[0.94rem] leading-[1.75] whitespace-pre-line text-mist'>
                  {column.body}
                </p>
              </div>
            ))}
          </div>

          {cta ? (
            <Button
              href={cta.href}
              variant='line'
              className='max-sm:w-full max-sm:justify-center'
            >
              {cta.label}
            </Button>
          ) : null}
        </Reveal>

        <Reveal delay={1}>
          <div
            className={[
              'relative aspect-[4/5] overflow-hidden rounded-arch',
              'max-md:aspect-[3/4] max-md:max-w-[430px]',
              'max-sm:aspect-4/3 max-sm:max-w-none',
            ].join(' ')}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes='(max-width: 960px) 100vw, 44vw'
              className='object-cover'
            />
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
