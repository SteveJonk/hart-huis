import type { PortableTextBlock } from '@portabletext/types';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Wrap } from '@/components/ui/Wrap';
import { isInternalHref, resolveHref, type SanityLink } from '@/lib/links';

export type RichTextProps = {
  eyebrow?: string | null;
  title?: string | null;
  body?: PortableTextBlock[] | null;
};

/**
 * Lopende tekst uit Portable Text: koppen, opsommingen en links binnen een
 * alinea. Bedoeld voor documentpagina's (privacyverklaring, voorwaarden), niet
 * voor marketingsecties — die hebben elk hun eigen blok met vaste velden.
 *
 * Geen defaults uit een content-bestand: dit blok heeft geen eigen copy, het
 * rendert wat de redactie schrijft. Zonder body rendert het niets.
 */
export function RichText({ eyebrow, title, body }: RichTextProps = {}) {
  if (!Array.isArray(body) || body.length === 0) return null;

  return (
    <section className='pt-[76px] pb-[122px] max-sm:pt-12 max-sm:pb-[82px]'>
      <Wrap>
        <div className='mx-auto max-w-[72ch]'>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {title ? (
            <h2 className='mb-8 text-[clamp(1.9rem,3.4vw,2.7rem)] max-sm:mb-6'>{title}</h2>
          ) : null}
          <PortableText value={body} components={components} />
        </div>
      </Wrap>
    </section>
  );
}

type TableValue = { rows?: { _key: string; cells?: string[] }[] };

const components: PortableTextComponents = {
  types: {
    // Eerste rij is de koprij. Drie kolommen passen niet op een telefoon, dus
    // de tabel scrollt in zijn eigen container — de pagina zelf niet.
    table: ({ value }: { value: TableValue }) => {
      const rows = value?.rows?.filter((row) => Array.isArray(row.cells)) ?? [];
      if (rows.length === 0) return null;
      const [head, ...body] = rows;

      return (
        <div className='mb-[26px] overflow-x-auto'>
          <table className='w-full min-w-[36rem] border-collapse text-[0.95rem] leading-[1.6] text-ink-70'>
            <thead>
              <tr>
                {head.cells?.map((cell, index) => (
                  <th
                    key={index}
                    className='border-b border-sand px-3 py-2 text-left align-top font-semibold text-ink'
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row) => (
                <tr key={row._key} className='border-b border-sand/60 last:border-0'>
                  {row.cells?.map((cell, index) => (
                    <td key={index} className='px-3 py-2 align-top whitespace-pre-line'>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className='mb-[18px] leading-[1.75] text-ink-70'>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className='mt-[54px] mb-[18px] text-[clamp(1.5rem,2.6vw,2rem)] first:mt-0 max-sm:mt-10'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='mt-9 mb-3 text-[clamp(1.15rem,1.9vw,1.4rem)] first:mt-0'>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className='my-8 border-l-2 border-sand pl-6 font-display text-[1.15rem] leading-[1.6] text-burgundy italic'>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className='mb-[18px] list-disc pl-[22px] leading-[1.75] text-ink-70 marker:text-sage-deep'>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className='mb-[18px] list-decimal pl-[22px] leading-[1.75] text-ink-70 marker:text-sage-deep'>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className='mb-[6px] pl-1'>{children}</li>,
    number: ({ children }) => <li className='mb-[6px] pl-1'>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className='font-semibold text-ink'>{children}</strong>,
    em: ({ children }) => <em className='italic'>{children}</em>,
    // `value` is het link-object uit markDefs, met internalLink al uitgeklapt
    // door PAGE_QUERY — dezelfde vorm als elke cta.
    link: ({ value, children }) => {
      const href = resolveHref(value as SanityLink | undefined);
      if (!href) return <>{children}</>;

      const className =
        'text-burgundy underline underline-offset-[3px] transition-opacity duration-200 hover:opacity-70';

      if (isInternalHref(href)) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }

      // Alleen een echte URL opent in een nieuw tabblad; mailto: en tel:
      // horen in hetzelfde venster af te handelen.
      const external = /^https?:/i.test(href);
      return (
        <a
          href={href}
          className={className}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
};
