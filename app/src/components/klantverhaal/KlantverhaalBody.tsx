import Image from '@/components/ui/Image';
import Link from 'next/link';
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { isInternalHref, resolveHref, type SanityLink } from '@/lib/links';
import { imageSrc, type SanityImage } from '@/sanity/image';

type Resultaat = { items?: { _key: string; value?: string; label?: string }[] };

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className='mb-5 max-w-[62ch] leading-[1.82] text-ink-70'>{children}</p>
    ),
    h2: ({ children }) => <h2 className='mt-11 mb-4 text-[1.75rem] max-sm:mt-9 max-sm:text-[1.5rem]'>{children}</h2>,
  },
  marks: {
    link: ({ value, children }: { value?: SanityLink; children: React.ReactNode }) => {
      const href = resolveHref(value);
      if (!href) return <>{children}</>;
      const className = 'text-sage-deep underline underline-offset-[3px] hover:text-ink';
      return isInternalHref(href) ? (
        <Link href={href} className={className}>{children}</Link>
      ) : (
        <a href={href} className={className}>{children}</a>
      );
    },
  },
  types: {
    pullQuote: ({ value }: { value?: { text?: string } }) =>
      value?.text ? (
        <blockquote className='my-10 border-l-2 border-sand py-8 pl-[34px] max-sm:my-8 max-sm:py-6 max-sm:pl-[22px]'>
          <p className='max-w-[30ch] font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.46] text-ink italic'>
            &ldquo;{value.text}&rdquo;
          </p>
        </blockquote>
      ) : null,
    image: ({ value }: { value?: SanityImage }) => {
      const src = imageSrc(value, 1400, 933);
      if (!src) return null;
      return (
        <figure className='relative my-10 aspect-[3/2] overflow-hidden rounded'>
          <Image src={src} alt={value?.alt ?? ''} fill sizes='(max-width: 960px) 100vw, 66vw' className='object-cover' />
        </figure>
      );
    },
    resultaat: ({ value }: { value?: Resultaat }) => {
      const items = value?.items?.filter((item) => item.value && item.label) ?? [];
      if (items.length === 0) return null;
      return (
        <div className='my-10 grid grid-cols-3 gap-6 rounded bg-sand px-[34px] py-[30px] max-sm:grid-cols-1 max-sm:gap-[18px] max-sm:px-6 max-sm:py-[26px]'>
          {items.map((item) => (
            <div key={item._key}>
              <b className='mb-1.5 block font-display text-[1.9rem] leading-none font-normal text-burgundy max-sm:text-[1.6rem]'>
                {item.value}
              </b>
              <span className='block text-[0.84rem] leading-normal text-[#5d4a43]'>{item.label}</span>
            </div>
          ))}
        </div>
      );
    },
  },
};

/** Het verhaal zelf. De eerste alinea is iets groter en donkerder, als in het ontwerp. */
export function KlantverhaalBody({ value }: { value?: PortableTextBlock[] | null }) {
  if (!Array.isArray(value) || value.length === 0) return <div />;
  return (
    <div className='[&>*:first-child]:mt-0 [&>p:first-child]:text-[1.1rem] [&>p:first-child]:text-ink'>
      <PortableText value={value} components={components} />
    </div>
  );
}
