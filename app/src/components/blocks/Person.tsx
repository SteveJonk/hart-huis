import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { CONTACT_PERSON } from '@/lib/contact-content';

export type PersonImage = {
  src: string;
  alt: string;
};

export type PersonCard = {
  initials: string;
  name: string;
  role: string;
  links?: { label: string; href: string }[];
};

export type PersonProps = {
  image?: PersonImage;
  eyebrow?: string;
  title?: string;
  body?: string;
  person?: PersonCard;
};

const DEFAULTS: Required<PersonProps> = {
  image: CONTACT_PERSON.image,
  eyebrow: CONTACT_PERSON.eyebrow,
  title: CONTACT_PERSON.title,
  body: CONTACT_PERSON.body,
  person: {
    ...CONTACT_PERSON.person,
    links: [...CONTACT_PERSON.person.links],
  },
};

/** Photo beside a short intro and the one person you'll actually speak to. */
export function Person({
  image = DEFAULTS.image,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  body = DEFAULTS.body,
  person = DEFAULTS.person,
}: PersonProps = {}) {
  return (
    <section className='bg-sand py-[118px] max-sm:py-[82px]'>
      <Wrap
        className={[
          'grid grid-cols-[0.82fr_1.18fr] items-center gap-[74px]',
          'max-lg:gap-[50px] max-md:grid-cols-1',
        ].join(' ')}
      >
        <Reveal>
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
              sizes='(max-width: 960px) 100vw, 34vw'
              className='object-cover'
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className='mb-[18px] max-w-[16ch] text-[clamp(2rem,3.6vw,3rem)] max-sm:max-w-none'>
            {title}
          </h2>
          <p className='mb-9 max-w-[46ch] leading-[1.72] text-[#4d3d37] max-sm:mb-7 max-sm:max-w-none'>
            {body}
          </p>

          <div
            className={[
              'flex items-center gap-5 border-y border-ink/16 py-6',
              'max-sm:flex-wrap max-sm:gap-4 max-sm:py-[22px]',
            ].join(' ')}
          >
            <span
              className={[
                'grid size-[58px] shrink-0 place-items-center rounded-full bg-cream',
                'font-display text-[1.15rem] max-sm:size-[50px]',
              ].join(' ')}
            >
              {person.initials}
            </span>
            <span className='min-w-0 flex-1 max-sm:flex-[1_1_60%]'>
              <b className='mb-0.5 block text-[1.1rem] font-semibold'>{person.name}</b>
              <span className='text-[0.86rem] text-[#5d4a43]'>{person.role}</span>
            </span>
            <span className='flex flex-wrap gap-[9px] max-sm:flex-[1_1_100%]'>
              {(person.links ?? []).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={[
                    'rounded-pill border border-ink/22 px-[18px] py-[13px]',
                    'text-[0.83rem] font-semibold whitespace-nowrap',
                    'transition duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-cream',
                    'max-sm:flex-1 max-sm:text-center max-xs:flex-[1_1_100%]',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
            </span>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
