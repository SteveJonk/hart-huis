import type { FormDefinition } from '@/lib/form-fields';
import { parsePhoneNumber } from '@/lib/phone';
import { SITE } from '@/lib/site';

/** The three feed statuses, with the label and pill tone the site shows for each. */
export const OBJECT_STATUS = {
  beschikbaar: { label: 'Beschikbaar', tone: 'white' },
  voorbehoud: { label: 'Verkocht o.v.', tone: 'sand' },
  verkocht: { label: 'Verkocht', tone: 'burgundy' },
} as const;

export type WoningStatus = keyof typeof OBJECT_STATUS;

export function statusOf(status: string | null | undefined) {
  return OBJECT_STATUS[(status ?? 'beschikbaar') as WoningStatus] ?? OBJECT_STATUS.beschikbaar;
}

/**
 * Fallback voor de knop op de prijskaart, zolang het `objectSettings`-document
 * nog niet bestaat. Staat er wél een formulier in dat document, dan opent de
 * knop dat in een venster en wordt `href` niet gebruikt.
 */
export const OBJECT_VIEWING_CTA = {
  label: 'Plan een bezichtiging',
  href: '/contact',
} as const;

/**
 * Vangnet voor de makelaarskaart in de zijkolom. De kaart komt uit het veld
 * `makelaar` op de woning; deze waarden staan als `initialValue` in dat schema
 * en blijven hier voor woningen die het veld (nog) niet hebben — de
 * Realworks-import vult het niet.
 */
export const OBJECT_MAKELAAR = {
  initials: 'DH',
  name: 'Dorien Hollemans',
  role: 'NVM Register Makelaar & Taxateur',
  body: "Vragen over deze woning? Bel of app gerust, ook 's avonds. Ik ken het huis van binnen en van buiten.",
  phone: '06 - 476 87 321',
} as const;

export type ObjectMakelaar = {
  initials: string;
  name: string;
  role: string;
  body: string;
  phone: string;
  phoneHref: string;
};

/** Wat het CMS levert; elk veld mag ontbreken. */
export type WoningMakelaar = {
  naam?: string | null;
  initialen?: string | null;
  functie?: string | null;
  tekst?: string | null;
  telefoon?: string | null;
} | null;

/** Per veld terugvallen, zodat één leeg veld niet de hele kaart terugzet. */
export function toMakelaar(makelaar: WoningMakelaar): ObjectMakelaar {
  const phone = makelaar?.telefoon || OBJECT_MAKELAAR.phone;

  return {
    initials: makelaar?.initialen || OBJECT_MAKELAAR.initials,
    name: makelaar?.naam || OBJECT_MAKELAAR.name,
    role: makelaar?.functie || OBJECT_MAKELAAR.role,
    body: makelaar?.tekst || OBJECT_MAKELAAR.body,
    phone,
    phoneHref: `tel:${parsePhoneNumber(phone)}`,
  };
}

/**
 * Terugval voor de kop boven "Vergelijkbare woningen"; de redactie beheert hem
 * op `objectSettings`. Zie `SimilarObjects`, dat deze waarden als defaults
 * gebruikt.
 */
export const OBJECT_SIMILAR = {
  eyebrow: 'Misschien ook iets',
  title: 'Vergelijkbare woningen',
  cta: { label: 'Bekijk het hele aanbod', href: '/aanbod' },
} as const;

/** Terugval voor de CTA-band onderaan; ook die staat op `objectSettings`. */
export const OBJECT_CTA = {
  image: {
    src: '/images/over-ons/spaarne.jpg',
    alt: 'Het Spaarne in Haarlem',
  },
  eyebrow: 'Gratis en zonder verplichtingen',
  title: 'Niets gevonden dat past?',
  body: 'Wij horen vaak eerder dan Funda wat er op de markt komt. Meld je aan voor een gratis zoekopdracht, dan denken we met je mee.',
  primaryCta: { label: 'Gratis zoekopdracht aanmaken', href: '#' },
  secondaryCta: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;

/**
 * Het kantoornummer op de prijskaart. Staat in het footerdocument; `SITE` is
 * daar sinds de JSON-LD-commit alleen nog terugval voor. De `tel:`-link wordt
 * afgeleid, net als in `SiteFooter`.
 */
export function toKantoorTelefoon(phone: string | null | undefined) {
  const nummer = phone || SITE.phone;
  return { label: nummer, href: `tel:${parsePhoneNumber(nummer)}` };
}

export const OBJECT_FORM_ID = 'bezichtiging';

/**
 * Het `form`-document achter de knop op de prijskaart. Verder helemaal in
 * handen van de redactie: dit is alleen wat `seed:objectpagina` neerzet.
 *
 * Het veld `object` is verborgen en wordt door de objectpagina ingevuld — zo
 * staat in de mail om welke woning het gaat, zonder dat de bezoeker het typt.
 */
export const OBJECT_FORM: FormDefinition & { title: string } = {
  title: 'Bezichtiging aanvragen',
  id: OBJECT_FORM_ID,
  mode: 'simple',
  submitButtonText: 'Verstuur aanvraag',
  successTitle: 'Bedankt, we nemen contact op',
  successBody:
    'Je aanvraag staat bij ons. We bellen of mailen je zo snel mogelijk om een moment af te spreken.',
  fields: [
    {
      label: 'Woning',
      name: 'object',
      type: 'hidden',
      defaultValue: '{{adres}} — {{url}}',
    },
    { label: 'Naam', name: 'naam', type: 'text', width: 'full', isRequired: true },
    { label: 'E-mailadres', name: 'email', type: 'email', width: 'half', isRequired: true },
    { label: 'Telefoonnummer', name: 'telefoon', type: 'tel', width: 'half', isRequired: true },
    {
      label: 'Wanneer schikt het je?',
      name: 'moment',
      type: 'select',
      width: 'full',
      placeholder: 'Maak een keuze',
      selectOptions: [
        'Doordeweeks overdag',
        "Doordeweeks 's avonds",
        'In het weekend',
        'Maakt niet uit',
      ],
    },
    {
      label: 'Vraag of opmerking',
      name: 'bericht',
      type: 'textarea',
      width: 'full',
      placeholder: 'Waar ben je benieuwd naar?',
    },
    {
      label: 'Akkoord',
      name: 'akkoord',
      type: 'checkbox',
      width: 'full',
      isRequired: true,
      checkboxOptions: [
        'Ik ga akkoord met het [privacybeleid](/privacy) en het opslaan van mijn gegevens.',
      ],
    },
  ],
};

/** Wat `objectSettings` krijgt als het document nog niet bestaat. */
export const OBJECT_SETTINGS = {
  ctaLabel: OBJECT_VIEWING_CTA.label,
  dialogTitle: 'Plan een bezichtiging',
  dialogLead: 'Je vraagt een bezichtiging aan voor {{adres}}. We nemen snel contact met je op.',
  fallbackHref: OBJECT_VIEWING_CTA.href,
} as const;
