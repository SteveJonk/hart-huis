import Image from '@/components/ui/Image';
import Link from 'next/link';
import type { PortableTextBlock } from '@portabletext/types';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Wrap } from '@/components/ui/Wrap';
import { KlantverhaalBody } from '@/components/klantverhaal/KlantverhaalBody';
import { cn } from '@/lib/cn';
import {
  DIENST_LABEL,
  KLANTVERHAAL_MAKELAAR,
  KLANTVERHAAL_MEER,
  KLANTVERHALEN_OVERZICHT,
  ZIJKAART_CTA,
  type Dienst,
} from '@/lib/klantverhaal-content';
import { formatGrade } from '@/lib/reviews';

type Img = { src: string; alt: string };

function DienstTag({ dienst }: { dienst: Dienst }) {
  return (
    <span
      className={cn(
        'rounded-pill px-3.5 py-[7px] text-[0.66rem] font-semibold tracking-[0.14em] uppercase',
        dienst === 'Aankoop' ? 'bg-sage text-moss' : 'bg-sand text-burgundy',
      )}
    >
      {dienst}
    </span>
  );
}

/** Zet het cursieve deel van de titel in een <em>; staat het er niet letterlijk in, dan gewoon de titel. */
function TitleWithHighlight({ title, highlight }: { title: string; highlight?: string | null }) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <em className='text-burgundy italic'>{highlight}</em>
      {title.slice(at + highlight.length)}
    </>
  );
}

export function KlantverhaalKop({
  title,
  titleHighlight,
  intro,
  dienst,
  plaats,
  buurt,
}: {
  title: string;
  titleHighlight?: string | null;
  intro: string;
  dienst: Dienst;
  plaats: string;
  buurt?: string | null;
}) {
  return (
    <header className='pt-[150px] max-sm:pt-[120px]' data-solid-header>
      <Wrap className='max-w-[900px]'>
        <Link
          href={KLANTVERHALEN_OVERZICHT.href}
          className='mb-5 inline-flex items-center gap-[9px] py-3 text-[0.85rem] font-semibold text-ink-70 transition-colors duration-[250ms] ease-brand hover:text-ink'
        >
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
            <path d='M12 7H2m3.8-3.8L2 7l3.8 3.8' stroke='currentColor' strokeWidth='1.4' />
          </svg>
          {KLANTVERHALEN_OVERZICHT.back}
        </Link>
        <div className='mb-[22px] flex flex-wrap gap-[9px]'>
          <DienstTag dienst={dienst} />
          <span className='rounded-pill bg-sand px-3.5 py-[7px] text-[0.66rem] font-semibold tracking-[0.14em] text-burgundy uppercase'>
            {[buurt, plaats].filter(Boolean).join(', ')}
          </span>
        </div>
        <h1 className='mb-[22px] max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.7rem)] max-sm:max-w-none max-sm:text-[clamp(1.9rem,7.6vw,2.6rem)]'>
          <TitleWithHighlight title={title} highlight={titleHighlight} />
        </h1>
        <p className='max-w-[58ch] text-[1.14rem] leading-[1.7] text-ink-70 max-sm:max-w-none max-sm:text-base'>
          {intro}
        </p>
      </Wrap>
    </header>
  );
}

export function KlantverhaalBeeld({ image, caption }: { image: Img; caption?: string | null }) {
  return (
    <section className='pt-[52px] max-sm:pt-9'>
      <Wrap>
        <div className='relative aspect-video overflow-hidden rounded-[5px] max-sm:aspect-[4/3]'>
          <Image src={image.src} alt={image.alt} fill priority sizes='(max-width: 1280px) 100vw, 1200px' className='object-cover' />
        </div>
        {caption ? <p className='mt-3.5 text-center text-[0.84rem] text-ink-45'>{caption}</p> : null}
      </Wrap>
    </section>
  );
}

export function KlantverhaalInhoud({
  body,
  dienst,
  wie,
  plaats,
  buurt,
  feiten,
  grade,
}: {
  body?: PortableTextBlock[] | null;
  dienst: Dienst;
  wie: string;
  plaats: string;
  buurt?: string | null;
  feiten?: { label: string; value: string }[] | null;
  grade?: number | null;
}) {
  const rows = [
    { label: 'Dienst', value: DIENST_LABEL[dienst] },
    { label: 'Wie', value: wie },
    { label: 'Plaats', value: plaats },
    ...(buurt ? [{ label: 'Buurt', value: buurt }] : []),
    ...(feiten ?? []),
  ];
  const cta = ZIJKAART_CTA[dienst];
  const cijfer = formatGrade(grade ?? undefined);

  return (
    <section className='pt-16 pb-[118px] max-md:pt-12 max-md:pb-[82px] max-sm:pt-10 max-sm:pb-[78px]'>
      <Wrap className='grid grid-cols-[1.5fr_0.5fr] items-start gap-[70px] max-lg:grid-cols-[1.4fr_0.6fr] max-lg:gap-11 max-md:grid-cols-1'>
        <KlantverhaalBody value={body} />

        <aside className='sticky top-[100px] grid gap-4 max-md:static max-md:order-first max-md:grid-cols-2 max-sm:grid-cols-1'>
          <div className='rounded bg-white px-[26px] py-7'>
            <h2 className='mb-4 font-sans text-[0.72rem] font-semibold tracking-[0.18em] text-burgundy uppercase'>
              Over dit verhaal
            </h2>
            <dl>
              {rows.map((row, index) => (
                <div
                  key={row.label}
                  className={cn(
                    'flex justify-between gap-3.5 py-[11px] text-[0.9rem]',
                    index === 0 ? 'pt-0' : 'border-t border-cream',
                  )}
                >
                  <dt className='shrink-0 text-ink-45'>{row.label}</dt>
                  <dd className='text-right font-medium'>{row.value}</dd>
                </div>
              ))}
            </dl>
            {cijfer ? (
              <div className='mt-1 flex items-center gap-3.5'>
                <span className='grid size-[52px] shrink-0 place-items-center rounded-full bg-sand font-display text-[1.25rem]'>
                  {cijfer}
                </span>
                <span className='text-[0.82rem] leading-normal text-ink-70'>
                  <b className='block font-semibold text-ink'>Hun beoordeling</b>Gegeven op Funda
                </span>
              </div>
            ) : null}
          </div>

          <div className='relative overflow-hidden rounded bg-ink px-[26px] py-7 text-cream'>
            <span
              aria-hidden='true'
              className='pointer-events-none absolute -top-[90px] -right-[70px] size-[230px] rounded-full border border-cream/14'
            />
            <h2 className='relative mb-[9px] text-[1.3rem] text-white'>{cta.title}</h2>
            <p className='relative mb-[18px] text-[0.88rem] leading-[1.6] text-[#b8a8a1]'>{cta.body}</p>
            <Button href={cta.href} size='sm' className='relative w-full justify-center'>
              {cta.label}
            </Button>
          </div>
        </aside>
      </Wrap>
    </section>
  );
}

export function MakelaarQuote({ quote }: { quote?: string | null }) {
  if (!quote) return null;
  return (
    <section className='bg-sand py-[84px] max-sm:py-[66px]'>
      <Wrap className='flex max-w-[820px] items-center gap-[34px] max-md:gap-[26px] max-sm:flex-col max-sm:gap-[22px] max-sm:text-center'>
        <div className='relative size-[120px] shrink-0 overflow-hidden rounded-full'>
          <Image
            src={KLANTVERHAAL_MAKELAAR.image.src}
            alt={KLANTVERHAAL_MAKELAAR.image.alt}
            fill
            sizes='120px'
            className='object-cover'
          />
        </div>
        <div>
          <p className='mb-3.5 font-display text-[1.35rem] leading-normal italic max-sm:text-[1.2rem]'>
            &ldquo;{quote}&rdquo;
          </p>
          <div className='text-[0.84rem] font-semibold tracking-[0.13em] text-[#5d4a43] uppercase'>
            {KLANTVERHAAL_MAKELAAR.wie}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

export type KlantverhaalCard = {
  href: string;
  title: string;
  intro: string;
  plek: string;
  dienst: Dienst;
  image?: Img;
};

export function MeerVerhalen({ items }: { items: KlantverhaalCard[] }) {
  if (items.length === 0) return null;
  return (
    <section className='py-[104px] max-sm:py-[78px]'>
      <Wrap>
        <Reveal className='mb-11 flex flex-wrap items-end justify-between gap-7 max-sm:mb-8 max-sm:gap-5'>
          <div>
            <Eyebrow>{KLANTVERHAAL_MEER.eyebrow}</Eyebrow>
            <h2 className='text-[clamp(1.9rem,3.4vw,2.7rem)]'>{KLANTVERHAAL_MEER.title}</h2>
          </div>
          <Button href={KLANTVERHALEN_OVERZICHT.href} variant='ink' className='max-sm:w-full max-sm:justify-center'>
            {KLANTVERHALEN_OVERZICHT.all}
          </Button>
        </Reveal>
        <div className='grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-[18px]'>
          {items.map((item, index) => (
            <Reveal key={item.href} delay={(index === 0 ? undefined : index) as 1 | 2 | undefined}>
              <Link
                href={item.href}
                className='block h-full overflow-hidden rounded bg-white transition-[transform,translate,box-shadow] duration-[450ms] ease-brand hover:-translate-y-1.5 hover:shadow-card'
              >
                <div className='relative aspect-[3/2] bg-sand'>
                  {item.image ? (
                    <Image src={item.image.src} alt={item.image.alt} fill sizes='(max-width: 680px) 100vw, 33vw' className='object-cover' />
                  ) : null}
                  <span className='absolute top-3.5 left-3.5'>
                    <DienstTag dienst={item.dienst} />
                  </span>
                </div>
                <div className='px-[26px] pt-6 pb-[26px]'>
                  <div className='mb-[9px] text-[0.72rem] font-semibold tracking-[0.16em] text-ink-45 uppercase'>
                    {item.plek}
                  </div>
                  <h3 className='mb-2.5 text-[1.28rem] leading-[1.25]'>{item.title}</h3>
                  <p className='line-clamp-3 text-[0.92rem] leading-[1.6] text-ink-70'>{item.intro}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
