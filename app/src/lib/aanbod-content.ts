import { SITE } from '@/lib/site';

export const AANBOD_HEADER = {
  breadcrumbLabel: 'Actueel aanbod',
  eyebrow: 'Ons aanbod',
  titleBefore: 'Woningen in Haarlem, Spaarndam en ',
  titleEm: 'Velsen',
  lead: 'Alles wat we op dit moment in de verkoop hebben, plus wat er recent is verkocht — zodat je ziet wat woningen in jouw buurt daadwerkelijk opbrengen.',
  aside: {
    title: 'Niets gevonden?',
    body: 'Wij horen vaak eerder dan Funda wat er op de markt komt. Meld je aan voor een gratis zoekopdracht, dan hoor je het als eerste.',
    cta: { label: 'Gratis zoekopdracht', href: '#' },
  },
} as const;

/** Status filter — values match the `woning` status field, `alle` clears the filter. */
export const AANBOD_STATUS_FILTERS = [
  { value: 'alle', label: 'Alle' },
  { value: 'beschikbaar', label: 'Beschikbaar' },
  { value: 'voorbehoud', label: 'Verkocht o.v.' },
  { value: 'verkocht', label: 'Verkocht' },
] as const;

/** `[min, max)` in euros; `max: null` means no upper bound. */
export const AANBOD_PRICE_RANGES = [
  { value: 'alle', label: 'Alle prijzen', min: 0, max: null },
  { value: '0-450000', label: 'Tot € 450.000', min: 0, max: 450000 },
  { value: '450000-650000', label: '€ 450.000 – € 650.000', min: 450000, max: 650000 },
  { value: '650000+', label: 'Vanaf € 650.000', min: 650000, max: null },
] as const;

export const AANBOD_SORTINGS = [
  { value: 'nieuw', label: 'Nieuwste eerst' },
  { value: 'laag', label: 'Prijs oplopend' },
  { value: 'hoog', label: 'Prijs aflopend' },
] as const;

export const AANBOD_LABELS = {
  allPlaces: 'Alle plaatsen',
  statusGroup: 'Filter op status',
  placeFilter: 'Filter op plaats',
  priceFilter: 'Filter op prijs',
  sortFilter: 'Sorteren',
  more: 'Toon meer woningen',
} as const;

/** Dark card that sits between the listings. */
export const AANBOD_GRID_CTA = {
  title: 'Wees er eerder bij',
  body: 'Een deel van onze woningen wordt verkocht voordat het op Funda staat. Met een gratis zoekopdracht hoor jij het als eerste.',
  cta: { label: 'Maak je zoekopdracht aan', href: '#' },
} as const;

export const AANBOD_EMPTY = {
  title: 'Geen woningen gevonden',
  body: 'Pas je filters aan, of maak een gratis zoekopdracht aan zodat we je laten weten wanneer er iets passends bijkomt.',
} as const;

export const AANBOD_CTA = {
  image: {
    src: '/images/over-ons/spaarne.jpg',
    alt: 'Het Spaarne in Haarlem',
  },
  eyebrow: 'Zelf verkopen?',
  title: 'Jouw woning hier tussen?',
  body: 'We komen langs, lopen door je huis en vertellen je eerlijk wat haalbaar is. Gratis en zonder verplichtingen, ook als je pas over een jaar wilt verkopen.',
  primaryCta: { label: 'Plan een waardebepaling', href: '#' },
  secondaryCta: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;

/** How many listings are shown before "toon meer", and where the CTA card sits. */
export const AANBOD_PAGE_SIZE = 8;
