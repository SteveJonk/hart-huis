import type { SanityImageSource } from '@sanity/image-url';
import type { Metadata } from 'next';
import { urlFor } from '@/sanity/image';
import { SITE } from '@/lib/site';

export type SanitySeo = {
  title?: string | null;
  description?: string | null;
  ogImage?: SanityImageSource | null;
  noIndex?: boolean | null;
};

type SanityPage = {
  title?: string | null;
  seo?: SanitySeo | null;
} | null;

type Options = {
  isHome?: boolean;
};

/** De og:image van een `seo`-object, op het formaat dat social previews willen. */
export function seoImageUrl(seo: SanitySeo | null | undefined): string | null {
  if (!seo?.ogImage) return null;
  return urlFor(seo.ogImage)?.width(1200).height(630).fit('crop').url() ?? null;
}

/** Map a page document's `seo` object onto Next metadata. Unset fields fall back to the root layout. */
export function pageMetadata(page: SanityPage, options?: Options): Metadata {
  if (!page) {
    return { title: 'Pagina niet gevonden', robots: { index: false } };
  }

  const seo = page.seo ?? {};
  const title = seo.title || page.title || null;
  const description = seo.description || null;
  const image = seoImageUrl(seo);

  const pageTitle = `${title} - ${SITE.name}`;
  const homeTitle = `${SITE.name} - ${description}`;

  // Only set keys that have a value — an explicit `undefined` overrides the
  // layout's default instead of inheriting it.
  return {
    ...(options?.isHome ? { title: homeTitle } : { title: pageTitle }),
    ...(description ? { description } : {}),
    ...(seo.noIndex ? { robots: { index: false, follow: false } } : {}),
    ...(title || description || image
      ? {
          openGraph: {
            type: 'website',
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
            ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
          },
        }
      : {}),
    ...(image ? { twitter: { card: 'summary_large_image' as const } } : {}),
  };
}
