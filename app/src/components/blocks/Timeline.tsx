import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import {
  OVER_ONS_TIMELINE,
  OVER_ONS_TIMELINE_INTRO,
  type TimelineItem,
} from '@/lib/over-ons-content';

export type TimelineProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: TimelineItem[];
};

const DEFAULTS: Required<TimelineProps> = {
  eyebrow: OVER_ONS_TIMELINE_INTRO.eyebrow,
  title: OVER_ONS_TIMELINE_INTRO.title,
  lead: OVER_ONS_TIMELINE_INTRO.lead,
  items: OVER_ONS_TIMELINE,
};

export function Timeline({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  items = DEFAULTS.items,
}: TimelineProps = {}) {
  return (
    <section className='bg-sand py-[120px] max-sm:py-[82px]'>
      <Wrap>
        <div className='mx-auto max-w-[820px]'>
          <Reveal className='mb-14 max-w-[34ch] max-sm:mb-10 max-sm:max-w-none'>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className='mb-4 text-[clamp(2rem,3.6vw,3rem)]'>{title}</h2>
            <p className='leading-[1.72] text-[#4d3d37]'>{lead}</p>
          </Reveal>

          <Reveal delay={1}>
            <ol className='list-none'>
              {items.map((item) => (
                <li
                  key={item.year}
                  className={[
                    'relative pb-[46px] pl-[132px] last:pb-0',
                    'before:absolute before:top-[34px] before:bottom-0 before:left-[47px]',
                    'before:w-px before:bg-ink/22 last:before:hidden',
                    'max-md:pl-[114px]',
                    'max-sm:pb-[34px] max-sm:pl-0 max-sm:before:hidden',
                  ].join(' ')}
                >
                  {item.image ? (
                    <div className='relative mt-2 mb-[46px] aspect-16/10 overflow-hidden rounded max-sm:mt-1 max-sm:mb-[34px] max-sm:aspect-4/3'>
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes='(max-width: 960px) 100vw, 700px'
                        className='object-cover'
                      />
                    </div>
                  ) : null}
                  <span
                    className={[
                      'absolute top-0 left-0 grid h-[34px] w-24 place-items-center rounded-pill bg-cream',
                      'text-[0.82rem] font-semibold tracking-[0.04em]',
                      'max-sm:static max-sm:mb-3.5 max-sm:h-8 max-sm:w-[88px]',
                    ].join(' ')}
                  >
                    {item.year}
                  </span>
                  <h3 className='mb-2.5 text-[1.42rem] max-sm:text-[1.3rem]'>
                    {item.title}
                  </h3>
                  <p className='text-[0.99rem] leading-[1.75] text-[#4d3d37]'>
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
