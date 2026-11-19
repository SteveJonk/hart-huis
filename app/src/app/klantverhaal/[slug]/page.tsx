import type { Metadata } from 'next';
import type { PortableTextBlock } from '@portabletext/types';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand } from '@/components/blocks/CtaBand';
import {
  KlantverhaalBeeld,
  KlantverhaalInhoud,
  KlantverhaalKop,
  MakelaarQuote,
  MeerVerhalen,
} from '@/components/klantverhaal/KlantverhaalSections';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { pageJsonLd } from '@/lib/json-ld';
import { KLANTVERHAAL_CTA } from '@/lib/klantverhaal-content';
import { client } from '@/sanity/client';
import { toImage } from '@/sanity/image';
import { pageMetadata, seoImageUrl } from '@/sanity/metadata';
import { KLANTVERHAAL_QUERY } from '@/sanity/queries';

const options = { next: { revalidate: 30 } };

type KlantverhaalProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: KlantverhaalProps): Promise<Metadata> {
  const { slug } = await params;
  const verhaal = await client.fetch(KLANTVERHAAL_QUERY, { slug }, options);
  if (!verhaal) return pageMetadata(null);

  // Zonder ingevulde SEO: de intro als description en de hoofdfoto als og:image.
  return pageMetadata({
    title: verhaal.title,
    seo: {
      ...verhaal.seo,
      description: verhaal.seo?.description || verhaal.intro,
      ogImage: verhaal.seo?.ogImage ?? verhaal.mainImage,
    },
  });
}

export default async function KlantverhaalPage({ params }: KlantverhaalProps) {
  const { slug } = await params;
  const verhaal = await client.fetch(KLANTVERHAAL_QUERY, { slug }, options);
  const image = verhaal ? toImage(verhaal.mainImage, 2000, 1125) : undefined;

  if (!verhaal || !image) {
    notFound();
  }

  const path = `/klantverhaal/${slug}`;

  return (
    <PageWrapper>
      <JsonLd
        data={pageJsonLd({
          path,
          title: verhaal.seo?.title || verhaal.title,
          description: verhaal.seo?.description || verhaal.intro,
          imageUrl: seoImageUrl({ ogImage: verhaal.seo?.ogImage ?? verhaal.mainImage }),
          trail: [{ name: verhaal.title, path }],
        })}
      />
      <main>
        <KlantverhaalKop
          title={verhaal.title}
          titleHighlight={verhaal.titleHighlight}
          intro={verhaal.intro}
          dienst={verhaal.dienst}
          plaats={verhaal.plaats}
          buurt={verhaal.buurt}
        />
        <KlantverhaalBeeld image={image} caption={verhaal.mainImage.caption} />
        <KlantverhaalInhoud
          body={verhaal.body as PortableTextBlock[] | null}
          dienst={verhaal.dienst}
          wie={verhaal.wie}
          plaats={verhaal.plaats}
          buurt={verhaal.buurt}
          feiten={verhaal.feiten}
          grade={verhaal.grade}
        />
        <MakelaarQuote quote={verhaal.makelaarQuote} />
        <MeerVerhalen
          items={verhaal.meer.map((ander) => ({
            href: `/klantverhaal/${ander.slug}`,
            title: ander.shortTitle || ander.title,
            intro: ander.intro,
            plek: [ander.buurt, ander.plaats].filter(Boolean).join(', '),
            dienst: ander.dienst,
            image: toImage(ander.mainImage, 720, 480),
          }))}
        />
        <CtaBand {...KLANTVERHAAL_CTA} />
      </main>
    </PageWrapper>
  );
}
