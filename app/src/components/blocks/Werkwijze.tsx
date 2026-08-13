import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { BEOORDELINGEN_WERKWIJZE } from '@/lib/beoordelingen-content';
import { cn } from '@/lib/cn';

export type WerkwijzeItem = {
  number: string;
  title: string;
  body: string;
};

export type WerkwijzeProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: readonly WerkwijzeItem[];
};

const DEFAULTS = {
  eyebrow: BEOORDELINGEN_WERKWIJZE.eyebrow,
  title: BEOORDELINGEN_WERKWIJZE.title,
  lead: BEOORDELINGEN_WERKWIJZE.lead,
  items: BEOORDELINGEN_WERKWIJZE.items as readonly WerkwijzeItem[],
};

/** Donkere uitlegsectie met genummerde punten. */
export function Werkwijze({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  items = DEFAULTS.items,
}: WerkwijzeProps = {}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-ink py-[112px] text-cream max-sm:py-[82px]',
        'after:pointer-events-none after:absolute after:-top-[260px] after:-right-[180px]',
        'after:size-[660px] after:rounded-full after:border after:border-cream/13 after:content-[""]',
        'before:pointer-events-none before:absolute before:-bottom-[220px] before:-left-[140px]',
        'before:size-[480px] before:rounded-full before:bg-cream/4 before:content-[""]',
        'max-sm:after:size-[400px] max-sm:after:-top-40 max-sm:after:-right-[130px]',
        'max-sm:before:size-[300px] max-sm:before:-bottom-[140px] max-sm:before:-left-[110px]',
      )}
    >
      <Wrap
        className={cn(
          'relative z-[2] grid grid-cols-[0.9fr_1.1fr] items-start gap-[70px]',
          'max-lg:gap-[50px] max-md:grid-cols-1',
        )}
      >
        <Reveal>
          <Eyebrow sand>{eyebrow}</Eyebrow>
          <h2 className='mb-[18px] max-w-[14ch] text-[clamp(1.9rem,3.4vw,2.7rem)] text-white max-sm:max-w-none'>
            {title}
          </h2>
          <p className='max-w-[38ch] leading-[1.75] text-taupe max-md:max-w-none'>{lead}</p>
        </Reveal>

        <Reveal delay={1}>
          <ul className='grid gap-[26px] max-sm:gap-[22px]'>
            {items.map((item) => (
              <li key={item.number} className='flex items-start gap-[18px]'>
                <span className='grid size-[42px] shrink-0 place-items-center rounded-full bg-cream/10 font-display text-[0.95rem] font-medium text-sand'>
                  {item.number}
                </span>
                <div>
                  <b className='mb-[5px] block text-[1.02rem] text-white'>{item.title}</b>
                  <p className='text-[0.93rem] leading-[1.68] text-taupe'>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Wrap>
    </section>
  );
}
