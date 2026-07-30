import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/blocks/CtaBand';
import { Intro } from '@/components/blocks/Intro';
import { Listings } from '@/components/blocks/Listings';
import { Reviews } from '@/components/blocks/Reviews';
import { Services } from '@/components/blocks/Services';
import { Stories } from '@/components/blocks/Stories';
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
      {/* Remaining home sections until migrated to page builder blocks */}
      <Intro />
      <Services />
      <Stories />
      <Reviews />
      <Listings />
      <CtaBand />
    </main>
  );
}
