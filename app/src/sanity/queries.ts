import { defineQuery } from 'next-sanity';

/** Resolve internal page references on link/cta objects. */
const linkExpansion = /* groq */ `{
  ...,
  internalLink->{
    "slug": slug.current
  }
}`;

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    content[]{
      ...,
      primaryCta${linkExpansion},
      secondaryCta${linkExpansion},
      link${linkExpansion},
      cta${linkExpansion},
      nvm{
        ...,
        cta${linkExpansion}
      },
      items[]{
        ...,
        link${linkExpansion},
        cta${linkExpansion}
      },
      cards[]{
        ...,
        cta${linkExpansion}
      },
      regions[]{
        ...,
        link${linkExpansion}
      },
      places[]{
        ...,
        link${linkExpansion}
      },
      _type == "reviews" => {
        ...,
        reviews[]->,
        link${linkExpansion}
      },
      _type == "faqs" => {
        ...,
        faqs[]->{
          ...,
          link${linkExpansion}
        },
        link${linkExpansion}
      }
    }
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_id == "navigation"][0]{
    navLeft[]${linkExpansion},
    navRight[]${linkExpansion}
  }
`);

export const FOOTER_QUERY = defineQuery(`
  *[_id == "footer"][0]{
    linkGroups[]{
      title,
      links[]${linkExpansion}
    },
    socialLinks[]{ platform, url },
    copyright
  }
`);
