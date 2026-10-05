import type { ImageLoaderProps } from 'next/image';

/** Kwaliteit voor de Sanity-CDN; met `auto=format` wordt dat meestal WebP/AVIF. */
export const SANITY_QUALITY = 85;

/**
 * Sanity-beelden die de CDN zelf kan schalen. SVG's vallen erbuiten: die horen
 * ongeschaald door te komen.
 */
export function isSanityImage(src: unknown): src is string {
  if (typeof src !== 'string' || !src.startsWith('https://cdn.sanity.io/images/')) return false;
  return !src.split('?')[0].toLowerCase().endsWith('.svg');
}

/**
 * Loader voor next/image: laat de Sanity-CDN elke breedte uit de srcset
 * rechtstreeks uit het origineel maken, in plaats van dat Next een al
 * gecomprimeerde, vaste maat nóg eens schaalt en comprimeert.
 *
 * De `w`/`h` die `imageSrc()` in de URL zet, gelden daarbij alleen nog als
 * verhouding: bij een uitsnede (`h` erbij) groeit de hoogte mee met de breedte.
 * Overige parameters (`rect` van een hotspot-crop, `fit`) blijven staan.
 */
export function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  const params = url.searchParams;
  const w = Number(params.get('w'));
  const h = Number(params.get('h'));

  params.set('w', String(width));
  if (w > 0 && h > 0) params.set('h', String(Math.round((width * h) / w)));
  params.set('q', String(quality ?? SANITY_QUALITY));
  params.set('auto', 'format');

  // URLSearchParams codeert de komma's in `rect=` als %2C; laat ze staan zoals
  // @sanity/image-url ze schrijft.
  return url.toString().replace(/%2C/gi, ',');
}
