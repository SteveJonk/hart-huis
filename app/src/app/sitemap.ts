import type { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { SITEMAP_QUERY } from '@/sanity/queries';
import { SITE } from '@/lib/site';

const BASE_URL = SITE.baseUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, objecten } = await client.fetch(SITEMAP_QUERY);

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...objecten.map((woning) => ({
      url: `${BASE_URL}/aanbod/${woning.slug}`,
      lastModified: new Date(woning._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
