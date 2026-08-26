import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import {
  OVER_ONS_VALUES,
  OVER_ONS_VALUES_INTRO,
  type ValueCard,
} from '@/lib/over-ons-content';

export type ValueCardsProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: ValueCard[];
};

const DEFAULTS: Required<ValueCardsProps> = {
  eyebrow: OVER_ONS_VALUES_INTRO.eyebrow,
  title: OVER_ONS_VALUES_INTRO.title,
  lead: OVER_ONS_VALUES_INTRO.lead,
  items: OVER_ONS_VALUES,
};

function ValueIcon({ icon }: { icon: ValueCard['icon'] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true as const,
  };

  switch (icon) {
    case 'heart':
      return (
        <svg {...common}>
          <path
            d='M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0112 7.5a4.4 4.4 0 017.5 2.9c0 5-7.5 9.6-7.5 9.6z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'rings':
      return (
        <svg {...common}>
          <circle cx='8' cy='12' r='4.6' stroke='currentColor' strokeWidth='1.5' />
          <circle cx='16' cy='12' r='4.6' stroke='currentColor' strokeWidth='1.5' />
        </svg>
      );
    case 'lines':
      return (
        <svg {...common}>
          <path d='M4 7.5h16M4 12h16M4 16.5h10' stroke='currentColor' strokeWidth='1.5' />
        </svg>
      );
  }
}

export function ValueCards({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  items = DEFAULTS.items,
}: ValueCardsProps = {}) {
  return (
    <section className='py-[122px] max-sm:py-[82px]'>
      <Wrap>
        <Reveal className='mb-14 max-w-[620px] max-sm:mb-[34px]'>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className='mb-4 text-[clamp(2rem,3.6vw,3rem)]'>{title}</h2>
          <p className='leading-[1.72] text-ink-70'>{lead}</p>
        </Reveal>

        <div className='grid grid-cols-3 gap-[26px] max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-4'>
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index === 0 ? undefined : index) as 1 | 2 | 3 | undefined}
            >
              <div
                className={[
                  'h-full rounded bg-white px-[34px] pt-[38px] pb-[34px]',
                  'transition-[transform,translate,scale,rotate,box-shadow] duration-[450ms] ease-brand',
                  'hover:-translate-y-1.5 hover:shadow-[0_30px_58px_-34px_rgba(36,31,28,0.4)]',
                  'max-sm:px-[26px] max-sm:pt-[30px] max-sm:pb-7',
                ].join(' ')}
              >
                <span className='mb-6 grid size-[54px] place-items-center rounded-full bg-sand text-burgundy max-sm:mb-5 max-sm:size-12'>
                  <ValueIcon icon={item.icon} />
                </span>
                <h3 className='mb-[11px] text-[1.42rem]'>{item.title}</h3>
                <p className='text-[0.95rem] leading-[1.7] text-ink-70'>
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
