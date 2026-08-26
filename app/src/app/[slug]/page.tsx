import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { PageBuilder } from '@/components/PageBuilder';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { client } from '@/sanity/client';
import { pageJsonLd, pageFaqs } from '@/lib/json-ld';
import { pageMetadata, seoImageUrl } from '@/sanity/metadata';
import { PAGE_QUERY } from '@/sanity/queries';

const options = { next: { revalidate: 30 } };

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'home') {
    return {};
  }

  return pageMetadata(await client.fetch(PAGE_QUERY, { slug }, options));
}

export default async function SanityPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug === 'home') {
    permanentRedirect('/');
  }

  const page = await client.fetch(PAGE_QUERY, { slug }, options);

  if (!page) {
    notFound();
  }

  return (
    <PageWrapper minimal={Boolean(page.isLandingPage)}>
      <JsonLd
        data={pageJsonLd({
          path: `/${slug}`,
          title: page.seo?.title || page.title,
          description: page.seo?.description,
          imageUrl: seoImageUrl(page.seo),
          faqs: pageFaqs(page.content),
          trail: [{ name: page.title, path: `/${slug}` }],
        })}
      />
      <main>
        <PageBuilder content={page.content} />
      </main>
    </PageWrapper>
  );
}
