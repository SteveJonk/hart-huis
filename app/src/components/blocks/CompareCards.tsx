import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { cn } from '@/lib/cn';
import {
  TAXATIE_COMPARE,
  TAXATIE_COMPARE_INTRO,
  type CompareCard,
} from '@/lib/taxatie-content';

export type CompareCardsProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** Ruimte boven de sectie, nodig als er een gekleurde band vóór staat. */
  spaceTop?: boolean;
  cards?: CompareCard[];
};

const DEFAULTS: Required<Omit<CompareCardsProps, 'spaceTop'>> = {
  eyebrow: TAXATIE_COMPARE_INTRO.eyebrow,
  title: TAXATIE_COMPARE_INTRO.title,
  lead: TAXATIE_COMPARE_INTRO.lead,
  cards: TAXATIE_COMPARE,
};

function IconCheck() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <path d='M4 12.5 9.5 18 20 7' stroke='currentColor' strokeWidth='1.8' />
    </svg>
  );
}

function IconCross() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <path d='M7 7l10 10M17 7 7 17' stroke='currentColor' strokeWidth='1.8' />
    </svg>
  );
}

/** Two side-by-side option cards, the second one on ink. */
export function CompareCards({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  spaceTop = false,
  cards = DEFAULTS.cards,
}: CompareCardsProps = {}) {
  return (
    <section
      className={cn(
        'pb-[122px] max-sm:pb-[82px]',
        spaceTop && 'pt-[122px] max-sm:pt-[82px]',
      )}
    >
      <Wrap>
        <Reveal className='mb-[52px] max-w-[640px] max-sm:mb-[34px] max-sm:max-w-none'>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className='mb-4 text-[clamp(2rem,3.6vw,3rem)]'>{title}</h2>
          <p className='leading-[1.72] text-ink-70'>{lead}</p>
        </Reveal>

        <div className='grid grid-cols-2 items-start gap-[26px] max-md:grid-cols-1'>
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index === 0 ? undefined : 1}>
              <div
                className={cn(
                  'relative overflow-hidden rounded px-[38px] pt-10 pb-9',
                  'transition-[transform,translate,scale,rotate,box-shadow] duration-[450ms] ease-brand',
                  'hover:-translate-y-[5px] hover:shadow-[0_30px_58px_-34px_rgba(36,31,28,0.4)]',
                  'max-sm:px-[26px] max-sm:pt-8 max-sm:pb-[30px]',
                  card.dark ? 'bg-ink text-cream' : 'bg-white',
                  card.dark &&
                    cn(
                      'after:pointer-events-none after:absolute after:top-[-140px] after:right-[-110px]',
                      'after:size-[340px] after:rounded-full after:border after:border-cream/13',
                      'max-sm:after:size-[240px] max-sm:after:top-[-100px] max-sm:after:right-[-80px]',
                      'before:pointer-events-none before:absolute before:bottom-[-160px] before:left-[-90px]',
                      'before:size-[270px] before:rounded-full before:bg-cream/4',
                      'max-sm:before:size-[190px] max-sm:before:bottom-[-110px] max-sm:before:left-[-70px]',
                    ),
                )}
              >
                <div className='relative z-[2]'>
                  <span
                    className={cn(
                      'mb-5 inline-block rounded-pill px-[13px] py-[7px]',
                      'text-[0.63rem] font-semibold tracking-[0.16em] uppercase',
                      card.dark
                        ? 'bg-cream/12 text-sand'
                        : 'bg-sand text-burgundy',
                    )}
                  >
                    {card.label}
                  </span>
                  <h3
                    className={cn(
                      'mb-2.5 text-[1.7rem] max-sm:text-[1.45rem]',
                      card.dark && 'text-white',
                    )}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={cn(
                      'mb-[26px] max-w-[38ch] text-[0.94rem] leading-[1.68] max-md:max-w-none',
                      card.dark ? 'text-taupe' : 'text-ink-70',
                    )}
                  >
                    {card.body}
                  </p>
                  <ul
                    className={cn(
                      'list-none',
                      card.cta ? 'mb-[30px]' : 'mb-0',
                    )}
                  >
                    {card.items.map((item) => {
                      const included = item.included !== false;
                      return (
                        <li
                          key={item.text}
                          className={cn(
                            'flex items-start gap-[13px] py-[11px] text-[0.95rem] leading-[1.6]',
                            '[&+li]:border-t',
                            card.dark ? '[&+li]:border-cream/12' : '[&+li]:border-cream',
                            !included && 'text-ink-45',
                          )}
                        >
                          <span
                            className={cn(
                              'mt-[3px] shrink-0',
                              !included
                                ? 'text-ink-45'
                                : card.dark
                                  ? 'text-sand'
                                  : 'text-sage-deep',
                            )}
                          >
                            {included ? <IconCheck /> : <IconCross />}
                          </span>
                          <span>{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  {card.cta ? (
                    <Button
                      href={card.cta.href}
                      variant={card.dark ? 'primary' : 'ink'}
                      className='w-full justify-center'
                    >
                      {card.cta.label}
                    </Button>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
