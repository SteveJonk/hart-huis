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
      person{
        ...,
        links[]${linkExpansion}
      },
      aside{
        ...,
        cta${linkExpansion}
      },
      form->{
        _id,
        title,
        showtitle,
        submitButtonText,
        fields[]
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
      _type == "contactFormSection" => {
        ...,
        "recaptcha": *[_type == "formGeneralSettings"][0]{
          recaptchaEnabled,
          recaptchaSiteKey
        }
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

/** Card fields for a `woning`, shared by the detail page's "vergelijkbare woningen". */
const woningCard = /* groq */ `{
  adres,
  "slug": slug.current,
  plaats,
  status,
  prijs,
  woonoppervlak,
  kamers,
  "foto": fotos[0]
}`;

/**
 * One object (house for sale) plus three others to show underneath — same
 * plaats first, then the most recently offered.
 */
export const WONING_QUERY = defineQuery(`
  *[_type == "woning" && slug.current == $slug][0]{
    _id,
    adres,
    "slug": slug.current,
    postcode,
    plaats,
    status,
    prijs,
    prijsConditie,
    aangebodenSinds,
    aanvaarding,
    soortWoning,
    bouwjaar,
    woonoppervlak,
    perceel,
    inhoud,
    kamers,
    slaapkamers,
    energielabel,
    kenmerkGroepen[]{
      titel,
      rijen[]{label, waarde}
    },
    aanbiedingsTekst,
    aanbiedingsTekstEngels,
    fotos,
    "brochureUrl": brochure.asset->url,
    seo,
    "vergelijkbaar": *[_type == "woning" && _id != ^._id]
      | order(select(plaats == ^.plaats => 0, 1) asc, aangebodenSinds desc)[0...3]${woningCard}
  }
`);

/** Fields of one form, by document id. Used to validate submissions server-side. */
export const CONTACT_FORM_QUERY = defineQuery(`
  *[_type == "contactForm" && _id == $formId][0]{
    _id,
    title,
    fields[]{label, name, type, isRequired}
  }
`);

/**
 * Mail settings for the contact-form plugin. Server-side only — it holds SMTP
 * credentials, so never fetch this from a client component.
 */
export const CONTACT_FORM_SETTINGS_QUERY = defineQuery(`
  *[_type == "formGeneralSettings"][0]{
    adminEmail,
    smtpUsername,
    smtpPassword,
    confirmationSubject,
    confirmationMessage,
    recaptchaEnabled,
    recaptchaSecretKey
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
