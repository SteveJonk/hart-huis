import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import {
  OVER_ONS_ASSURANCES,
  OVER_ONS_ASSURANCES_INTRO,
  type Assurance,
} from '@/lib/over-ons-content';

export type AssurancesProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: Assurance[];
};

const DEFAULTS: Required<AssurancesProps> = {
  eyebrow: OVER_ONS_ASSURANCES_INTRO.eyebrow,
  title: OVER_ONS_ASSURANCES_INTRO.title,
  lead: OVER_ONS_ASSURANCES_INTRO.lead,
  items: OVER_ONS_ASSURANCES,
};

function IconCheck() {
  return (
    <svg width='17' height='17' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <path d='M4 12.5 9.5 18 20 7' stroke='currentColor' strokeWidth='1.8' />
    </svg>
  );
}

/** Dark band with credentials, checked off two by two. */
export function Assurances({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  items = DEFAULTS.items,
}: AssurancesProps = {}) {
  return (
    <section
      className={[
        'relative overflow-hidden bg-ink py-[112px] text-cream max-sm:py-[82px]',
        'before:pointer-events-none before:absolute before:bottom-[-220px] before:left-[-140px]',
        'before:size-[480px] before:rounded-full before:bg-cream/4',
        'max-sm:before:size-[300px] max-sm:before:bottom-[-140px] max-sm:before:left-[-110px]',
        'after:pointer-events-none after:absolute after:top-[-260px] after:right-[-180px]',
        'after:size-[660px] after:rounded-full after:border after:border-cream/13',
        'max-sm:after:size-[400px] max-sm:after:top-[-160px] max-sm:after:right-[-130px]',
      ].join(' ')}
    >
      <Wrap
        className={[
          'relative z-[2] grid grid-cols-[0.9fr_1.1fr] items-start gap-[70px]',
          'max-lg:gap-11 max-md:grid-cols-1',
        ].join(' ')}
      >
        <Reveal>
          <Eyebrow sand>{eyebrow}</Eyebrow>
          <h2 className='mb-[18px] max-w-[13ch] text-[clamp(1.9rem,3.4vw,2.7rem)] text-white max-sm:max-w-none'>
            {title}
          </h2>
          <p className='max-w-[38ch] leading-[1.75] text-taupe max-md:max-w-none'>
            {lead}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className='grid grid-cols-2 gap-[30px] max-sm:grid-cols-1 max-sm:gap-6'>
            {items.map((item) => (
              <div key={item.title} className='flex items-start gap-4'>
                <span className='grid size-[38px] shrink-0 place-items-center rounded-full bg-cream/10 text-sand'>
                  <IconCheck />
                </span>
                <div>
                  <b className='mb-[5px] block text-base text-white'>
                    {item.title}
                  </b>
                  <p className='text-[0.9rem] leading-[1.65] text-taupe'>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
