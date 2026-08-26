/**
 * Structured data (schema.org, JSON-LD) opgebouwd uit wat er in Sanity staat.
 *
 * Alles hier is puur: erin gaat het queryresultaat, eruit komt een gewoon
 * object. Ophalen doen de routes, renderen doet `<JsonLd>` — zo is elke vorm
 * hieronder te controleren zonder Sanity of React (`npm run check:jsonld`).
 *
 * De opzet is één graaf per pagina met `@id`'s die naar elkaar verwijzen, in
 * plaats van losse blokken die dezelfde gegevens herhalen:
 *
 *   - de organisatie (`#organisatie`) en de site (`#website`) staan op elke
 *     pagina, want ze komen uit navigatie + footer die de PageWrapper toch al
 *     ophaalt;
 *   - elke pagina voegt daar een `WebPage` (of `RealEstateListing`) aan toe met
 *     een kruimelpad, en een objectpagina bovendien de woning zelf.
 *
 * Lege velden vallen weg: `prune` gooit null, lege strings, lege arrays en
 * daarmee leeg geworden objecten eruit, zodat een half ingevuld document geen
 * `"telephone": null` oplevert.
 */
import { parseAanbiedingstekst } from '@/lib/aanbiedingstekst';
import { REGIONS, SITE } from '@/lib/site';

export type JsonLdNode = Record<string, unknown>;

/** Verwijzingen tussen de knopen — niet het document zelf, alleen de sleutel. */
export const ORGANIZATION_ID = `${SITE.baseUrl}/#organisatie`;
export const WEBSITE_ID = `${SITE.baseUrl}/#website`;

const ORGANIZATION_REF = { '@id': ORGANIZATION_ID };
const WEBSITE_REF = { '@id': WEBSITE_ID };

/** `/verkoop` → `https://www.hartenhuis.nl/verkoop`; `/` en `''` → de basis-URL. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  const suffix = path === '/' || path === '' ? '' : `/${path.replace(/^\//, '')}`;
  return `${SITE.baseUrl}${suffix}`;
}

/**
 * Weg met alles wat leeg is, ook een object dat daardoor leeg wordt. Een
 * `@type` alleen telt niet als inhoud, een `@id` wel: `{"@id": "…#organisatie"}`
 * is de verwijzing waarmee de knopen in de graaf aan elkaar hangen.
 */
export function prune<T>(value: T): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string') return value.trim() === '' ? undefined : (value.trim() as T);
  if (Array.isArray(value)) {
    const items = value.map(prune).filter((item) => item !== undefined);
    return items.length ? (items as T) : undefined;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => [key, prune(item)] as const)
      .filter(([, item]) => item !== undefined);
    const kept = entries.filter(([key]) => key !== '@type');
    if (!kept.length) return undefined;
    return Object.fromEntries(entries) as T;
  }
  return value;
}

/** De buitenste verpakking. Knopen die na `prune` niets voorstellen vallen weg. */
export function jsonLdGraph(nodes: (JsonLdNode | null | undefined)[]): JsonLdNode | null {
  const graph = nodes
    .map((node) => (node ? prune(node) : undefined))
    .filter((node): node is JsonLdNode => Boolean(node));

  if (!graph.length) return null;

  return { '@context': 'https://schema.org', '@graph': graph };
}

// ---------------------------------------------------------------------------
// Organisatie + site
// ---------------------------------------------------------------------------

/** "2026 ZK Haarlem" — de laatste adresregel is postcode + plaats, de rest is straat. */
const POSTCODE_LINE = /^(\d{4}\s?[A-Z]{2})\s+(.+)$/;

export function postalAddress(
  lines: readonly (string | null | undefined)[] | null | undefined,
): JsonLdNode | undefined {
  const parts = (lines ?? []).map((line) => line?.trim()).filter(Boolean) as string[];
  if (!parts.length) return undefined;

  const last = parts[parts.length - 1];
  const match = POSTCODE_LINE.exec(last);

  return prune({
    '@type': 'PostalAddress',
    streetAddress: (match ? parts.slice(0, -1) : parts).join(', '),
    postalCode: match?.[1],
    addressLocality: match?.[2],
    addressCountry: 'NL',
  });
}

export type ReviewStats = {
  totaalReviews?: number | null;
  gemiddeldCijfer?: number | null;
};

/**
 * Funda-cijfers lopen van 1 tot 10. `gemiddeldCijfer` is null zolang geen
 * enkele review een cijfer heeft — dan hoort er ook geen rating in de graaf.
 */
export function aggregateRating(stats: ReviewStats | null | undefined): JsonLdNode | undefined {
  const value = stats?.gemiddeldCijfer;
  const count = stats?.totaalReviews ?? 0;
  if (typeof value !== 'number' || count < 1) return undefined;

  return {
    '@type': 'AggregateRating',
    ratingValue: Math.round(value * 10) / 10,
    reviewCount: count,
    bestRating: 10,
    worstRating: 1,
  };
}

export type OrganizationInput = {
  /** Uit het footer-document; valt terug op de constanten in `site.ts`. */
  address?: readonly (string | null | undefined)[] | null;
  phone?: string | null;
  email?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  sameAs?: readonly (string | null | undefined)[] | null;
  stats?: ReviewStats | null;
};

/**
 * `RealEstateAgent` is een `LocalBusiness`, dus openingstijden, adres en
 * telefoon horen hier thuis en niet op elke pagina opnieuw.
 */
export function organizationJsonLd(input: OrganizationInput = {}): JsonLdNode {
  return {
    '@type': 'RealEstateAgent',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.baseUrl,
    description: input.description,
    telephone: input.phone ?? SITE.phone,
    email: input.email ?? SITE.email,
    address: postalAddress(input.address ?? SITE.address),
    logo: input.logoUrl ? { '@type': 'ImageObject', url: input.logoUrl } : undefined,
    image: input.logoUrl ?? undefined,
    areaServed: REGIONS.map((name) => ({ '@type': 'City', name })),
    sameAs: input.sameAs,
    aggregateRating: aggregateRating(input.stats),
  };
}

export function websiteJsonLd(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.baseUrl,
    name: SITE.name,
    inLanguage: 'nl-NL',
    publisher: ORGANIZATION_REF,
  };
}

/** De twee knopen die op élke pagina staan. */
export function siteJsonLd(input: OrganizationInput = {}): JsonLdNode | null {
  return jsonLdGraph([organizationJsonLd(input), websiteJsonLd()]);
}

// ---------------------------------------------------------------------------
// Pagina's
// ---------------------------------------------------------------------------

export type Crumb = { name: string; path: string };

/** "Home" staat er altijd voor; een kruimelpad van alleen Home is er geen. */
export function breadcrumbJsonLd(path: string, trail: Crumb[]): JsonLdNode | undefined {
  if (!trail.length) return undefined;

  const items = [{ name: 'Home', path: '/' }, ...trail];

  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#kruimelpad`,
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export type FaqInput = { question?: string | null; answer?: string | null };

export function faqQuestions(faqs: readonly FaqInput[] | null | undefined): JsonLdNode[] {
  return (faqs ?? [])
    .filter((faq) => faq?.question && faq?.answer)
    .map((faq) => ({
      '@type': 'Question',
      name: faq.question!.trim(),
      acceptedAnswer: { '@type': 'Answer', text: faq.answer!.trim() },
    }));
}

/**
 * De vragen die op een pagina staan, uit de `faqs`-blokken van de pagebuilder.
 * Losse `faq`-documenten zijn referenties: de query lost ze al op, dus wat
 * hier binnenkomt is de vraag (`title`) met het antwoord.
 */
export function pageFaqs(
  content: readonly ({ _type?: string } & Record<string, unknown>)[] | null | undefined,
): FaqInput[] {
  return (content ?? [])
    .filter((block) => block?._type === 'faqs')
    .flatMap((block) => (Array.isArray(block.faqs) ? block.faqs : []))
    .filter((faq): faq is { title?: string; answer?: string } => Boolean(faq))
    .map((faq) => ({ question: faq.title, answer: faq.answer }));
}

export type PageInput = {
  path: string;
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  faqs?: readonly FaqInput[] | null;
  trail?: Crumb[];
  /** Objectpagina's zijn een `RealEstateListing`; die willen extra velden. */
  type?: string | string[];
  extra?: JsonLdNode;
};

/**
 * Eén `WebPage` per URL. Staan er vragen op de pagina, dan is diezelfde knoop
 * óók een `FAQPage` — twee losse knopen voor één URL zouden twee pagina's
 * beweren die er niet zijn.
 */
export function webPageJsonLd(input: PageInput): JsonLdNode {
  const url = absoluteUrl(input.path);
  const questions = faqQuestions(input.faqs);
  const base = input.type ?? 'WebPage';
  const types = Array.isArray(base) ? [...base] : [base];
  if (questions.length && !types.includes('FAQPage')) types.push('FAQPage');

  return {
    '@type': types.length === 1 ? types[0] : types,
    '@id': `${url}#pagina`,
    url,
    name: input.title,
    description: input.description,
    inLanguage: 'nl-NL',
    isPartOf: WEBSITE_REF,
    about: ORGANIZATION_REF,
    primaryImageOfPage: input.imageUrl ? { '@type': 'ImageObject', url: input.imageUrl } : undefined,
    breadcrumb: input.trail?.length ? { '@id': `${url}#kruimelpad` } : undefined,
    mainEntity: questions.length ? questions : undefined,
    ...input.extra,
  };
}

/** Wat een gewone CMS-pagina aan de graaf toevoegt. */
export function pageJsonLd(input: PageInput): JsonLdNode | null {
  return jsonLdGraph([
    webPageJsonLd(input),
    input.trail?.length ? breadcrumbJsonLd(input.path, input.trail) : undefined,
  ]);
}

// ---------------------------------------------------------------------------
// Objectpagina
// ---------------------------------------------------------------------------

/** `soortWoning` komt vrij uit de feed, dus dit matcht op woorddelen. */
export function residenceType(soort: string | null | undefined): string {
  const value = (soort ?? '').toLowerCase();
  if (/appartement|flat|maisonnette|penthouse|studio/.test(value)) return 'Apartment';
  if (/eengezins|geschakeld|vrijstaand|tussenwoning|hoekwoning|twee-onder|woonhuis|villa|bungalow/.test(value)) {
    return 'SingleFamilyResidence';
  }
  return 'Residence';
}

const AVAILABILITY: Record<string, string> = {
  beschikbaar: 'https://schema.org/InStock',
  voorbehoud: 'https://schema.org/LimitedAvailability',
  verkocht: 'https://schema.org/SoldOut',
};

/** Onbekende status telt als beschikbaar — net als `statusOf` in object-content. */
export function availability(status: string | null | undefined): string {
  return AVAILABILITY[status ?? 'beschikbaar'] ?? AVAILABILITY.beschikbaar;
}

const DESCRIPTION_LIMIT = 400;

/**
 * De aanbiedingstekst is ruwe Realworks-opmaak (`<br>`, `**vet**`, "- "), en
 * bevat vaak de Engelse vertaling. `parseAanbiedingstekst` haalt die eruit;
 * hier blijft één platte alinea over, afgekapt op een woordgrens.
 */
export function plainDescription(
  raw: string | null | undefined,
  limit = DESCRIPTION_LIMIT,
): string | undefined {
  const text = parseAanbiedingstekst(raw)
    .map((block) => (block.type === 'paragraph' ? block.text : block.items.join(', ')))
    .join(' ')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return undefined;
  if (text.length <= limit) return text;

  const cut = text.slice(0, limit);
  const space = cut.lastIndexOf(' ');
  return `${(space > limit / 2 ? cut.slice(0, space) : cut).replace(/[,.;:]$/, '')}…`;
}

function quantitative(value: number | null | undefined, unitCode: string) {
  return typeof value === 'number' ? { '@type': 'QuantitativeValue', value, unitCode } : undefined;
}

function property(name: string, value: unknown, unitCode?: string) {
  if (value === null || value === undefined || value === '') return undefined;
  return { '@type': 'PropertyValue', name, value, unitCode };
}

export type WoningInput = {
  adres: string;
  slug?: string | null;
  postcode?: string | null;
  plaats: string;
  status?: string | null;
  prijs?: number | null;
  prijsConditie?: string | null;
  aangebodenSinds?: string | null;
  aanvaarding?: string | null;
  soortWoning?: string | null;
  bouwjaar?: number | null;
  woonoppervlak?: number | null;
  perceel?: number | null;
  inhoud?: number | null;
  kamers?: number | null;
  slaapkamers?: number | null;
  energielabel?: string | null;
  aanbiedingsTekst?: string | null;
  /** Het `seo`-object van het document, als het schema dat ooit krijgt. */
  seo?: { description?: string | null } | null;
  /** Al opgeloste afbeeldings-URL's — `imageSrc` draait in de route. */
  imageUrls?: readonly string[];
};

export function woningPath(woning: Pick<WoningInput, 'slug'>): string {
  return `/aanbod/${woning.slug ?? ''}`;
}

/**
 * De woning zelf. Twee types tegelijk: een `Residence` beschrijft het huis
 * (oppervlak, kamers, bouwjaar), maar `offers` bestaat alleen op een `Product`
 * — en zonder vraagprijs is de helft van een objectpagina weg. Schema.org
 * staat meerdere types op één knoop toe, dus dit is geen omweg maar de manier.
 */
export function residenceJsonLd(woning: WoningInput): JsonLdNode {
  const url = absoluteUrl(woningPath(woning));
  const naam = `${woning.adres}, ${woning.plaats}`;

  return {
    '@type': [residenceType(woning.soortWoning), 'Product'],
    '@id': `${url}#woning`,
    name: naam,
    url,
    description: woning.seo?.description || plainDescription(woning.aanbiedingsTekst),
    image: woning.imageUrls?.length ? [...woning.imageUrls] : undefined,
    address: prune({
      '@type': 'PostalAddress',
      streetAddress: woning.adres,
      postalCode: woning.postcode,
      addressLocality: woning.plaats,
      addressCountry: 'NL',
    }),
    numberOfRooms: woning.kamers ?? undefined,
    numberOfBedrooms: woning.slaapkamers ?? undefined,
    floorSize: quantitative(woning.woonoppervlak, 'MTK'),
    yearBuilt: woning.bouwjaar ?? undefined,
    additionalProperty: [
      property('Perceeloppervlakte', woning.perceel, 'MTK'),
      property('Inhoud', woning.inhoud, 'MTQ'),
      property('Energielabel', woning.energielabel),
      property('Soort woning', woning.soortWoning),
      property('Aanvaarding', woning.aanvaarding),
    ],
    offers: offerJsonLd(woning),
  };
}

/**
 * Geen prijs, geen aanbod: "Prijs op aanvraag" als `price: 0` wegschrijven is
 * onwaar. De prijsconditie (k.k. / v.o.n.) staat in `description`, want die
 * verandert wat er betaald wordt maar heeft geen eigen veld.
 */
export function offerJsonLd(woning: WoningInput): JsonLdNode | undefined {
  if (typeof woning.prijs !== 'number') return undefined;

  const url = absoluteUrl(woningPath(woning));

  return {
    '@type': 'Offer',
    '@id': `${url}#aanbod`,
    url,
    price: woning.prijs,
    priceCurrency: 'EUR',
    availability: availability(woning.status),
    validFrom: woning.aangebodenSinds ?? undefined,
    description: woning.prijsConditie ?? undefined,
    seller: ORGANIZATION_REF,
  };
}

/**
 * De objectpagina: een `RealEstateListing` (de advertentie) die naar de woning
 * verwijst, plus het kruimelpad Home › Aanbod › adres.
 */
export function objectPageJsonLd(woning: WoningInput): JsonLdNode | null {
  const path = woningPath(woning);
  const url = absoluteUrl(path);
  const naam = `${woning.adres}, ${woning.plaats}`;

  return jsonLdGraph([
    webPageJsonLd({
      path,
      title: naam,
      description: woning.seo?.description || plainDescription(woning.aanbiedingsTekst),
      imageUrl: woning.imageUrls?.[0],
      type: 'RealEstateListing',
      trail: [
        { name: 'Aanbod', path: '/aanbod' },
        { name: naam, path },
      ],
      extra: {
        datePosted: woning.aangebodenSinds ?? undefined,
        mainEntity: { '@id': `${url}#woning` },
      },
    }),
    breadcrumbJsonLd(path, [
      { name: 'Aanbod', path: '/aanbod' },
      { name: naam, path },
    ]),
    residenceJsonLd(woning),
  ]);
}
