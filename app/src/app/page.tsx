import { notFound } from 'next/navigation';
import { PageBuilder } from '@/components/PageBuilder';
import { client } from '@/sanity/client';
import { PAGE_QUERY } from '@/sanity/queries';

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const page = await client.fetch(PAGE_QUERY, { slug: 'home' }, options);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageBuilder content={page.content} />
    </main>
  );
}
