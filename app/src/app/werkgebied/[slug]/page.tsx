import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { PageBuilder } from '@/components/PageBuilder';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { client } from '@/sanity/client';
import { pageJsonLd, pageFaqs } from '@/lib/json-ld';
import { pageMetadata, seoImageUrl } from '@/sanity/metadata';
import { WERKGEBIED_QUERY } from '@/sanity/queries';

const options = { next: { revalidate: 30 } };

type WerkgebiedProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: WerkgebiedProps): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(await client.fetch(WERKGEBIED_QUERY, { slug }, options));
}

export default async function WerkgebiedPage({ params }: WerkgebiedProps) {
  const { slug } = await params;
  const page = await client.fetch(WERKGEBIED_QUERY, { slug }, options);

  if (!page) {
    notFound();
  }

  const path = `/werkgebied/${slug}`;

  return (
    <PageWrapper>
      <JsonLd
        data={pageJsonLd({
          path,
          title: page.seo?.title || page.title,
          description: page.seo?.description,
          imageUrl: seoImageUrl(page.seo),
          faqs: pageFaqs(page.content),
          trail: [{ name: page.title, path }],
        })}
      />
      <main>
        <PageBuilder content={page.content} />
      </main>
    </PageWrapper>
  );
}
