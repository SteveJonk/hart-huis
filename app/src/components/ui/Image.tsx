'use client';

import NextImage, { type ImageProps } from 'next/image';
import { isSanityImage, sanityLoader } from '@/sanity/image-loader';

/**
 * next/image, maar Sanity-beelden laat hij door de Sanity-CDN schalen (zie
 * `sanityLoader`). Lokale beelden uit `public/` gaan gewoon via `/_next/image`.
 *
 * Een client component omdat `loader` een functie is, en die kan niet vanuit
 * een server component als prop mee. Een globale `images.loaderFile` kan ook
 * niet: daarmee zet Next `/_next/image` uit en breken de lokale beelden.
 */
export default function Image(props: ImageProps) {
  return <NextImage {...props} loader={isSanityImage(props.src) ? sanityLoader : props.loader} />;
}
