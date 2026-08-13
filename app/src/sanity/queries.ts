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
