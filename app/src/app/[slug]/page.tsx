import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { PageBuilder } from '@/components/PageBuilder';
import { client } from '@/sanity/client';
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

  const page = await client.fetch(PAGE_QUERY, { slug }, options);

  if (!page) {
    return { title: 'Pagina niet gevonden' };
  }

  return {
    title: page.title,
  };
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
    <main>
      <PageBuilder content={page.content} />
    </main>
  );
}
