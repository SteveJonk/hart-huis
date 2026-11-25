import Image from '@/components/ui/Image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { HOME_PARTNERS } from '@/lib/home-content';

export type PartnerLogo = { src: string; alt: string };

export type PartnersProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  logos?: PartnerLogo[];
};

/** Gecentreerde kop met een rij partnerlogo's op witte tegels. */
export function Partners({
  eyebrow = HOME_PARTNERS.eyebrow,
  title = HOME_PARTNERS.title,
  body = HOME_PARTNERS.body,
  logos = HOME_PARTNERS.logos,
}: PartnersProps = {}) {
  return (
    <section className='bg-cream py-[104px] max-[620px]:py-[78px]'>
      <Wrap>
        <Reveal className='mx-auto mb-[52px] max-w-[560px] text-center'>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className='mb-3.5 text-[clamp(1.7rem,3vw,2.5rem)]'>{title}</h2>
          {body ? <p className='leading-[1.68] text-ink-70'>{body}</p> : null}
        </Reveal>
        <Reveal delay={1}>
          <ul className='flex flex-wrap justify-center gap-5 max-[620px]:gap-3.5'>
            {logos.map((logo) => (
              <li
                key={logo.src}
                className={[
                  'h-[120px] w-[calc(25%-15px)] rounded bg-white px-10 py-7',
                  'transition-[translate,box-shadow] duration-400 ease-brand',
                  'hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(36,31,28,.35)]',
                  'max-[900px]:w-[calc(33.333%-14px)]',
                  'max-[620px]:h-[104px] max-[620px]:w-[calc(50%-7px)] max-[620px]:px-[26px] max-[620px]:py-[22px]',
                ].join(' ')}
              >
                <div className='relative size-full'>
                  <Image src={logo.src} alt={logo.alt} fill sizes='240px' className='object-contain' />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Wrap>
    </section>
  );
}
