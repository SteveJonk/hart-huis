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

/** Overview page — not built yet, so this is the one place to change the target. */
export const OBJECT_BACK_LINK = {
  label: 'Terug naar het aanbod',
  href: '/aanbod',
} as const;

export const OBJECT_VIEWING_CTA = {
  label: 'Plan een bezichtiging',
  href: '#',
} as const;

export const OBJECT_MAKELAAR = {
  initials: 'DH',
  name: 'Dorien Hollemans',
  role: 'NVM Register Makelaar & Taxateur',
  body: "Vragen over deze woning? Bel of app gerust, ook 's avonds. Ik ken het huis van binnen en van buiten.",
  phone: '06 - 476 87 321',
  phoneHref: 'tel:0647687321',
} as const;

export const OBJECT_SIMILAR = {
  eyebrow: 'Misschien ook iets',
  title: 'Vergelijkbare woningen',
  cta: { label: 'Bekijk het hele aanbod', href: OBJECT_BACK_LINK.href },
} as const;

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
