import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageBuilder } from '@/components/PageBuilder';
import { client } from '@/sanity/client';
import { PAGE_QUERY } from '@/sanity/queries';

const options = { next: { revalidate: 30 } };

export const metadata: Metadata = {
  title: 'Je woning verkopen in Haarlem — Hart & Huis Makelaardij',
  description:
    'Je woning verkopen in Haarlem en omstreken. Van gratis waardebepaling en styling tot de overdracht bij de notaris, met één vast aanspreekpunt.',
};

export default async function VerkoopPage() {
  const page = await client.fetch(PAGE_QUERY, { slug: 'verkoop' }, options);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageBuilder content={page.content} />
    </main>
  );
}
