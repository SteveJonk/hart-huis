import Link from 'next/link';
import { ContactIcon } from '@/components/ui/ContactIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { CONTACT_WAYS, type ContactWay } from '@/lib/contact-content';

export type ContactWaysProps = {
  items?: ContactWay[];
};

const DEFAULTS: Required<ContactWaysProps> = {
  items: CONTACT_WAYS,
};

/** Four ways to get in touch, pulled up over the hero. */
export function ContactWays({ items = DEFAULTS.items }: ContactWaysProps = {}) {
  return (
    <section className='pb-[118px] max-md:pb-[82px] max-sm:pb-[78px]'>
      <Wrap>
        <div
          className={[
            'relative z-20 mt-[-64px] grid grid-cols-4 gap-5',
            'max-lg:grid-cols-2 max-md:mt-11 max-md:gap-4',
            'max-sm:mt-9 max-sm:grid-cols-1 max-sm:gap-3.5',
          ].join(' ')}
        >
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index === 0 ? undefined : index) as 1 | 2 | 3 | undefined}
              className='h-full'
            >
              <Link
                href={item.href}
                className={[
                  'flex h-full flex-col rounded bg-white px-7 pt-8 pb-[30px]',
                  'transition-[transform,box-shadow] duration-[450ms] ease-brand',
                  'hover:-translate-y-1.5 hover:shadow-[0_30px_58px_-34px_rgba(36,31,28,0.42)]',
                  'max-sm:px-6 max-sm:py-[26px]',
                ].join(' ')}
              >
                <span
                  className={[
                    'mb-[22px] grid size-[52px] place-items-center rounded-full bg-sand text-burgundy',
                    'max-sm:mb-[18px] max-sm:size-[46px]',
                  ].join(' ')}
                >
                  <ContactIcon icon={item.icon} />
                </span>
                <h3 className='mb-[7px] text-[1.28rem]'>{item.title}</h3>
                <p className='mb-[18px] flex-1 text-[0.9rem] leading-[1.6] text-ink-70'>
                  {item.body}
                </p>
                <b className='block text-base font-semibold'>{item.value}</b>
                <small className='mt-[3px] block text-[0.8rem] text-ink-45'>
                  {item.note}
                </small>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
