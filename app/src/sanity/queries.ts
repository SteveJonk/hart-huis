import { defineQuery } from 'next-sanity';

/** Resolve internal page references on link/cta objects. */
const linkExpansion = /* groq */ `{
  ...,
  internalLink->{
    "slug": slug.current
  }
}`;

/** Card fields for a `woning`, shared by the aanbod grid and "vergelijkbare woningen". */
const woningCard = /* groq */ `{
  adres,
  "slug": slug.current,
  plaats,
  status,
  prijs,
  woonoppervlak,
  kamers,
  aangebodenSinds,
  "foto": fotos[0]
}`;

/**
 * Aggregates over alle reviews, afgeleid bij het uitvoeren van de query.
 * Bewust niet opgeslagen: een afgeleide waarde kan niet verouderen.
 * `math::avg` geeft null zolang geen enkele review een cijfer heeft.
 */
const reviewStats = /* groq */ `{
  "totaalReviews": count(*[_type == "review"]),
  "totaalAankoop": count(*[_type == "review" && type == "Aankoop"]),
  "totaalVerkoop": count(*[_type == "review" && type == "Verkoop"]),
  "gemiddeldCijfer": math::avg(*[_type == "review" && defined(grade)].grade)
}`;

/**
 * Staafjes van de cijferverdeling: het cijfer wordt op een heel getal afgerond
 * (9,5 telt als een 10), alles onder de 6,5 valt in de restbak.
 */
const reviewDistribution = /* groq */ `{
  "cijfer10": count(*[_type == "review" && grade >= 9.5]),
  "cijfer9": count(*[_type == "review" && grade >= 8.5 && grade < 9.5]),
  "cijfer8": count(*[_type == "review" && grade >= 7.5 && grade < 8.5]),
  "cijfer7": count(*[_type == "review" && grade >= 6.5 && grade < 7.5]),
  "cijfer6": count(*[_type == "review" && defined(grade) && grade < 6.5])
}`;

/** Velden die een reviewkaart nodig heeft, inclusief de deelcijfers. */
const reviewCard = /* groq */ `{
  quote,
  name,
  type,
  date,
  grade,
  accessibilityAndCommunication,
  expertise,
  localMarketKnowledge,
  negotiationAndResult,
  priceQuality,
  serviceAndGuidance
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
      // Geen "..." in de takken hieronder: die spreidt het ruwe document
      // opnieuw uit en overschrijft alles wat hierboven geprojecteerd is (de
      // laatste sleutel wint). De "..." bovenaan levert de gewone velden al.
      _type == "hero" => {
        ...${reviewStats}
      },
      _type == "reviews" => {
        "reviews": *[_type == "review"] | order(date desc)[0...8]${reviewCard},
        ...${reviewStats}
      },
      _type == "beoordelingenHero" => {
        ...${reviewStats},
        ...${reviewDistribution}
      },
      _type == "uitgelichteReview" => {
        review->${reviewCard}
      },
      _type == "reviewGrid" => {
        "items": *[_type == "review"] | order(date desc)${reviewCard}
      },
      _type == "objectGrid" => {
        ctaCard{..., cta${linkExpansion}},
        "objecten": *[_type == "woning"] | order(aangebodenSinds desc)${woningCard}
      },
      _type == "listings" => {
        "objecten": *[_type == "woning"] | order(aangebodenSinds desc)[0...3]${woningCard}
      },
      _type == "contactFormSection" => {
        "recaptcha": *[_type == "formGeneralSettings"][0]{
          recaptchaEnabled,
          recaptchaSiteKey
        }
      },
      _type == "faqs" => {
        faqs[]->{
          ...,
          link${linkExpansion}
        }
      }
    }
  }
`);

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
