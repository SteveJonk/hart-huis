/**
 * Parser voor de Funda-beoordelingenwidget — de widget die makelaars op hun
 * eigen site embedden. De gewone funda.nl-pagina's zitten achter een
 * bot-challenge; deze widget-URL gaf bij het testen gewoon HTML terug.
 *
 *   https://www.funda.nl/beoordelingenwidget/live/{makelaarId}/{page}/{type}
 *
 * Alles hier is puur: geen fetch, geen Sanity. `scrapeFundaReviews()` krijgt
 * zijn fetch geïnjecteerd, zodat `npm run check:funda` de hele lus tegen een
 * opgeslagen HTML-fixture kan draaien.
 */
import { createHash } from 'node:crypto';

export type FundaReviewType = 'Aankoop' | 'Verkoop';

export const FUNDA_REVIEW_TYPES: readonly FundaReviewType[] = ['Aankoop', 'Verkoop'];

/** Makelaar-id van Hart & Huis op Funda. */
export const DEFAULT_MAKELAAR_ID = '10356';

/**
 * De deelcijfers die de widget toont. Funda vraagt per tabblad vier andere
 * criteria uit — Aankoop wil weten hoe de onderhandeling ging, Verkoop hoe de
 * begeleiding was — dus dit zijn er zes waarvan er per review vier voorkomen.
 *
 *   Aankoop: bereikbaarheid en communicatie, deskundigheid,
 *            onderhandeling en resultaat, prijs / kwaliteit
 *   Verkoop: deskundigheid, lokale marktkennis, prijs / kwaliteit,
 *            service en begeleiding
 *
 * Bewust één platte lijst: de parser zoekt gewoon alle labels en wat niet op de
 * pagina staat blijft `undefined`. Scheelt een tweede lijst die uit de pas kan
 * gaan lopen, en een tabblad dat een vijfde criterium krijgt valt hier vanzelf
 * in. Welke velden bij welk type hóren staat in `src/lib/reviews.ts`.
 *
 * De labels zijn letterlijk wat er in de HTML staat (hoofdletterongevoelig
 * gematcht) — verander ze alleen als Funda het sjabloon wijzigt.
 */
export const SUBSCORES = [
  { field: 'accessibilityAndCommunication', label: 'Bereikbaarheid en communicatie' },
  { field: 'expertise', label: 'Deskundigheid' },
  { field: 'localMarketKnowledge', label: 'Lokale marktkennis' },
  { field: 'negotiationAndResult', label: 'Onderhandeling en resultaat' },
  { field: 'priceQuality', label: 'Prijs / kwaliteit' },
  { field: 'serviceAndGuidance', label: 'Service en begeleiding' },
] as const;

export type SubscoreField = (typeof SUBSCORES)[number]['field'];

export type ScrapedReview = {
  /** Stabiele hash over type + naam + adres + datum; wordt het Sanity `_id`. */
  key: string;
  name: string;
  /** Alleen gebruikt om reviews uit elkaar te houden, wordt niet opgeslagen. */
  address: string;
  type: FundaReviewType;
  /** Ruwe datum zoals hij op de widget staat, bijv. "12 juli 2026". */
  dateText: string;
  /** ISO `yyyy-mm-dd`, of undefined als de datum niet te lezen was. */
  date?: string;
  quote: string;
  grade?: number;
} & Partial<Record<SubscoreField, number>>;

/**
 * Het paginanummer staat achteraan als `pN`, niet in het segment na het
 * makelaar-id — dat is een vast `1`. Het type staat er in kleine letters in, en
 * de afsluitende slash hoort erbij: zonder slash antwoordt Funda met een 301.
 *
 *   .../beoordelingenwidget/live/10356/1/verkoop/p2/
 */
export function buildWidgetUrl(options: {
  id: string;
  page: number;
  type: FundaReviewType;
}): string {
  const type = options.type.toLowerCase();
  return `https://www.funda.nl/beoordelingenwidget/live/${options.id}/1/${type}/p${options.page}/`;
}

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: ' ',
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
};

/** In één doorgang, anders wordt een gedecodeerde `&` nóg een keer gelezen. */
const ENTITY = /&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi;

/** Funda codeert accenten als nummer: "idee&#235;n" → "ideeën". */
function decodeEntity(match: string, dec?: string, hex?: string, name?: string): string {
  if (dec) return String.fromCodePoint(Number(dec));
  if (hex) return String.fromCodePoint(parseInt(hex, 16));
  // een naam die we niet kennen laten we staan, dat is beter dan hem wissen
  return NAMED_ENTITIES[name!.toLowerCase()] ?? match;
}

/**
 * HTML → platte tekst met één regel per element. Bewust geen echte DOM-parser:
 * de widget is een vast sjabloon en dit scheelt een dependency in de bundle.
 */
export function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, '\n')
    .replace(ENTITY, decodeEntity)
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

const MONTHS: Record<string, number> = {
  januari: 1,
  februari: 2,
  maart: 3,
  april: 4,
  mei: 5,
  juni: 6,
  juli: 7,
  augustus: 8,
  september: 9,
  oktober: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mrt: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  sept: 9,
  okt: 10,
  nov: 11,
  dec: 12,
};

/** "12 juli 2026" of "12-07-2026" → "2026-07-12". */
export function parseDutchDate(input: string): string | undefined {
  const text = input.trim().toLowerCase();

  const worded = text.match(/(\d{1,2})\s+([a-z]+)\.?\s+(\d{4})/);
  if (worded) {
    const month = MONTHS[worded[2]];
    if (month) return toIsoDate(Number(worded[1]), month, Number(worded[3]));
  }

  const numeric = text.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (numeric) {
    return toIsoDate(Number(numeric[1]), Number(numeric[2]), Number(numeric[3]));
  }

  return undefined;
}

function toIsoDate(day: number, month: number, year: number): string | undefined {
  if (day < 1 || day > 31 || month < 1 || month > 12) return undefined;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** Een cijfer tussen 0 en 10; "9,5" en "9.5" tellen allebei. Anders undefined. */
export function parseGrade(input: string | undefined): number | undefined {
  if (!input) return undefined;
  const value = Number(input.replace(',', '.'));
  if (!Number.isFinite(value) || value < 0 || value > 10) return undefined;
  return value;
}

/**
 * Stabiel over herhaalde runs, zodat een review zichzelf niet dupliceert.
 *
 * Het cijfer zit erin omdat naam + adres + datum niet uniek is: twee bewoners
 * van hetzelfde huis schrijven allebei "Een funda gebruiker" op dezelfde dag.
 * Dat is echt gebeurd (Surinamestraat 24, 1 juni 2025) en zonder het cijfer
 * viel er één van de twee weg. Bewust géén stuk van de reviewtekst erin: dan
 * zou een verbetering in de parser alle sleutels omgooien en elke review
 * opnieuw aanmaken.
 */
export function reviewKey(parts: {
  type: string;
  name: string;
  address: string;
  date: string;
  grade?: number;
}): string {
  const raw = [parts.type, parts.name, parts.address, parts.date, String(parts.grade ?? '')]
    .map((part) => part.trim().toLowerCase().replace(/\s+/g, ' '))
    .join('|');
  return createHash('sha1').update(raw).digest('hex').slice(0, 16);
}

/** Sanity-`_id` van een gescrapete review. Deterministisch, dus upsert-baar. */
export function reviewDocumentId(key: string): string {
  return `funda-review-${key}`;
}

const GRADE_PATTERN = String.raw`\d{1,2}(?:[.,]\d)?`;

function escapeForRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Label mag in de HTML met andere spaties rond de `/` staan dan wij noteren. */
function labelPattern(label: string): string {
  return escapeForRegExp(label).replace(/\\?\s*\/\\?\s*/g, String.raw`\s*/\s*`);
}

/**
 * Waar het cijferblok begint: de eerste plek waar een deelcijferlabel staat.
 * Niet het eerste label uit `SUBSCORES` opzoeken — welk criterium bovenaan
 * staat verschilt per tabblad. Alles ervóór is naam, totaalcijfer en tekst.
 */
function subscoreStart(after: string): number {
  const index = after.search(SUBSCORE_LABELS);
  return index === -1 ? after.length : index;
}

const SUBSCORE_LABELS = new RegExp(
  SUBSCORES.map((subscore) => labelPattern(subscore.label)).join('|'),
  'i',
);

function lines(block: string): string[] {
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Snijdt de platte tekst op bij elke "Geschreven op" en leest per review de
 * velden eromheen: naam en adres staan ervóór, cijfers en tekst erna. Het
 * snijpunt is de datumregel zelf, zodat de naam van de vólgende review nooit
 * in de vorige belandt.
 */
export function parseReviews(html: string, type: FundaReviewType): ScrapedReview[] {
  const text = stripTags(html)
    .replace(/Lees volledige beoordeling/g, '')
    .replace(/Sluit beoordeling/g, '');

  const markers = [...text.matchAll(/Geschreven op[: ]*\s*([^\n]+)/g)];
  const reviews: ScrapedReview[] = [];

  for (let index = 0; index < markers.length; index += 1) {
    const marker = markers[index];
    const markerStart = marker.index ?? 0;
    const previous = markers[index - 1];
    const previousEnd = previous ? (previous.index ?? 0) + previous[0].length : 0;
    const nextStart = markers[index + 1]?.index ?? text.length;

    const before = text.slice(previousEnd, markerStart);
    const after = text.slice(markerStart + marker[0].length, nextStart);

    // De makelaar mag onder een beoordeling reageren, en zo'n reactie heeft
    // zijn eigen "Geschreven op". Zonder deze check wordt elke reactie een
    // review met de deelcijfers van de vorige review als "adres".
    if (isReply(before)) continue;

    const dateText = marker[1].trim();
    const { name, address } = parseNameAndAddress(before);
    if (!name && !address) continue;

    const scores = parseScores(after);
    const review: ScrapedReview = {
      key: reviewKey({ type, name, address, date: dateText, grade: scores.grade }),
      name: name || address,
      address,
      type,
      dateText,
      date: parseDutchDate(dateText),
      quote: '',
      ...scores,
    };

    review.quote = parseQuote(after);
    if (!review.quote) continue;

    reviews.push(review);
  }

  return reviews;
}

/**
 * "Reactie van Hart & Huis Makelaardij" staat direct boven de datum van een
 * reactie van de makelaar zelf — daar staat bij een echte beoordeling de naam
 * van de reviewer.
 */
function isReply(before: string): boolean {
  const previousLine = lines(before).at(-1) ?? '';
  return /^Reactie van\b/i.test(previousLine);
}

/**
 * De regels vlak vóór "Geschreven op" bevatten naam en adres. Op welke regel
 * ze staan verschilt, dus we gaan op cijfers af: een adres heeft een huisnummer
 * of postcode, een naam niet.
 */
function parseNameAndAddress(before: string): { name: string; address: string } {
  const candidates = lines(before).slice(-4);
  const address = [...candidates].reverse().find((line) => /\d/.test(line)) ?? '';
  const name =
    [...candidates].reverse().find((line) => line !== address && !/\d/.test(line)) ??
    '';
  return { name, address };
}

/** Totaalcijfer en de vier deelcijfers uit het blok ná de datum. */
function parseScores(after: string): Partial<Record<'grade' | SubscoreField, number>> {
  const scores: Partial<Record<'grade' | SubscoreField, number>> = {};

  const head = after.slice(0, subscoreStart(after));
  const grade = parseGrade(
    head.match(new RegExp(String.raw`(?:^|\n)\s*(${GRADE_PATTERN})\s*(?:\n|$)`))?.[1],
  );
  if (grade !== undefined) scores.grade = grade;

  for (const { field, label } of SUBSCORES) {
    const match = after.match(
      new RegExp(`${labelPattern(label)}\\s*\\n?\\s*(${GRADE_PATTERN})`, 'i'),
    );
    const value = parseGrade(match?.[1]);
    if (value !== undefined) scores[field] = value;
  }

  return scores;
}

/** Boilerplate tussen cijfer en tekst: "… zou deze makelaar aanbevelen". */
const RECOMMENDATION_LINE = /aanbevel|beveelt/i;
const RECOMMENDATION_MAX_LENGTH = 120;

/**
 * De reviewtekst staat tussen het totaalcijfer en het eerste deelcijferlabel.
 *
 * We knippen op de losse getalregel (het totaalcijfer) en gooien daarna
 * hooguit één aanbevelingsregel weg. Bewust niet op "aanbevelen" zoeken in de
 * hele blok: reviewers schrijven zelf ook "ik kan ze zeker aanbevelen", en dan
 * zou de halve beoordeling wegvallen.
 */
function parseQuote(after: string): string {
  let body = lines(after.slice(0, subscoreStart(after)));

  const gradeLine = body.findIndex((line) =>
    new RegExp(`^${GRADE_PATTERN}$`).test(line),
  );
  if (gradeLine !== -1) body = body.slice(gradeLine + 1);

  if (
    body.length > 1 &&
    body[0].length <= RECOMMENDATION_MAX_LENGTH &&
    RECOMMENDATION_LINE.test(body[0])
  ) {
    body = body.slice(1);
  }

  return body.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Voorbij de laatste pagina antwoordt de widget gewoon met 200 en deze zin.
 * Dat is het stopsignaal van de lus — betrouwbaarder dan de paginering
 * uitrekenen, en het onderscheidt "hier houdt het op" van "de parser is stuk".
 */
export function isEmptyPage(html: string): boolean {
  return /geen beoordelingen om te tonen/i.test(html);
}

export type ScrapeOptions = {
  id: string;
  type: FundaReviewType;
  maxPages?: number;
  delayMs?: number;
  fetchPage: (url: string) => Promise<string>;
  sleep?: (ms: number) => Promise<void>;
};

export type ScrapeResult = {
  reviews: ScrapedReview[];
  pagesFetched: number;
  warnings: string[];
};

const DEFAULT_MAX_PAGES = 100;
const DEFAULT_DELAY_MS = 1200;

const defaultSleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Loopt `p1`, `p2`, … af tot de widget zegt dat er niets meer is.
 *
 * Bewust niet de paginering uitlezen om te weten wanneer we klaar zijn: die
 * toont een venster ("1 2 3 … 9") en gaat dus mis zodra Funda dat sjabloon
 * verandert. Eén pagina te ver ophalen kost één request en is nooit fout.
 *
 * De dubbelencheck blijft eronder liggen: gaf `pN` ooit weer dezelfde reviews
 * terug als `pN-1`, dan stoppen we na twee requests in plaats van honderd.
 */
export async function scrapeFundaReviews(
  options: ScrapeOptions,
): Promise<ScrapeResult> {
  const maxPages = options.maxPages ?? DEFAULT_MAX_PAGES;
  const delayMs = options.delayMs ?? DEFAULT_DELAY_MS;
  const sleep = options.sleep ?? defaultSleep;

  const seen = new Map<string, ScrapedReview>();
  const warnings: string[] = [];
  let pagesFetched = 0;
  let parsed = 0;

  for (let page = 1; page <= maxPages; page += 1) {
    const html = await options.fetchPage(buildWidgetUrl({ ...options, page }));
    pagesFetched += 1;

    const reviews = parseReviews(html, options.type);
    if (reviews.length === 0) {
      // Geen reviews én geen "er zijn geen beoordelingen": dan lag het niet aan
      // het einde van de lijst maar aan ons.
      if (!isEmptyPage(html)) {
        warnings.push(
          `${options.type}: pagina ${page} leverde 0 reviews op en zegt niet dat hij leeg is — sjabloon gewijzigd?`,
        );
      } else if (page === 1) {
        warnings.push(`${options.type}: dit tabblad heeft geen beoordelingen`);
      }
      break;
    }

    const fresh = reviews.filter((review) => !seen.has(review.key));

    if (fresh.length === 0) {
      warnings.push(
        `${options.type}: pagina ${page} herhaalde pagina ${page - 1} — paginering genegeerd na ${seen.size} reviews`,
      );
      break;
    }

    for (const review of fresh) seen.set(review.key, review);
    parsed += reviews.length;

    if (page === maxPages)
      warnings.push(`${options.type}: gestopt op de limiet van ${maxPages} pagina's`);

    await sleep(delayMs);
  }

  // Twee reviews met dezelfde sleutel worden één document in Sanity. Dat mag
  // niet stilletjes gebeuren — zie `reviewKey` voor waar de sleutel op rust.
  if (parsed > seen.size) {
    warnings.push(
      `${options.type}: ${parsed - seen.size} review(s) deelden een sleutel met een andere en zijn samengevallen`,
    );
  }

  return { reviews: [...seen.values()], pagesFetched, warnings };
}
