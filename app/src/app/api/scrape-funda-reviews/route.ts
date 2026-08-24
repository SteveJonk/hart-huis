/**
 * Haalt de beoordelingen van Funda op en zet ze als `review`-documenten in
 * Sanity. Beide tabbladen (Aankoop en Verkoop), inclusief paginering.
 *
 * Aanroepen:
 *   - dagelijks door de Vercel-cron uit `vercel.json` (stuurt
 *     `Authorization: Bearer $CRON_SECRET` mee)
 *   - met de knop "Funda-reviews" in de Sanity Studio (stuurt
 *     `x-scraper-secret: $FUNDA_SCRAPER_SECRET` mee)
 *
 * Handig bij het uitproberen — schrijft niets weg:
 *   GET /api/scrape-funda-reviews?dryRun=1          → wat er gevonden is
 *   GET /api/scrape-funda-reviews?debug=1&maxPages=1 → de ruwe tekst per pagina
 */
import { NextResponse } from 'next/server';
import { corsHeaders, isAuthorized } from '@/lib/route-auth';
import {
  DEFAULT_MAKELAAR_ID,
  FUNDA_REVIEW_TYPES,
  SUBSCORES,
  buildWidgetUrl,
  reviewDocumentId,
  scrapeFundaReviews,
  stripTags,
  type FundaReviewType,
  type ScrapedReview,
  type SubscoreField,
} from '@/lib/funda-reviews';
import { getWriteClient } from '@/sanity/write-client';

export const runtime = 'nodejs';
/** Twee tabbladen × paginering × 1,2s wachttijd past niet in de standaard 60s. */
export const maxDuration = 300;

const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
};

/** Velden die de scraper bezit. Wat hier niet in staat blijft handwerk. */
const SCRAPED_FIELDS = [
  'quote',
  'name',
  'type',
  'date',
  'grade',
  'fundaKey',
  ...SUBSCORES.map((subscore) => subscore.field),
] as const;

type ReviewDocument = {
  _id: string;
  _type: 'review';
  fundaKey: string;
  quote: string;
  name: string;
  type: FundaReviewType;
  date?: string;
  grade?: number;
} & Partial<Record<SubscoreField, number>>;

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, { headers: REQUEST_HEADERS, cache: 'no-store' });
  if (!response.ok) throw new Error(`HTTP ${response.status} voor ${url}`);
  return response.text();
}

function toDocument(review: ScrapedReview): ReviewDocument {
  const doc: ReviewDocument = {
    _id: reviewDocumentId(review.key),
    _type: 'review',
    fundaKey: review.key,
    quote: review.quote,
    name: review.address,
    type: review.type,
  };

  if (review.date) doc.date = review.date;
  if (review.grade !== undefined) doc.grade = review.grade;
  for (const { field } of SUBSCORES) {
    const value = review[field];
    if (value !== undefined) doc[field] = value;
  }

  return doc;
}

/**
 * Idempotent: het `_id` is een hash van type + naam + adres + datum, dus een
 * tweede run raakt dezelfde documenten aan in plaats van kopieën te maken.
 * Bestaande verwijzingen (zoals de uitgelichte review) blijven zo intact.
 */
async function upsertReviews(reviews: ScrapedReview[]) {
  const client = getWriteClient();
  const documents = reviews.map(toDocument);
  const ids = documents.map((doc) => doc._id);

  const existing = await client.fetch<Array<Record<string, unknown> & { _id: string }>>(
    `*[_type == "review" && _id in $ids]{_id, ${SCRAPED_FIELDS.join(', ')}}`,
    { ids },
  );
  const byId = new Map(existing.map((doc) => [doc._id, doc]));

  let created = 0;
  let updated = 0;
  let unchanged = 0;

  const transaction = client.transaction();
  for (const doc of documents) {
    const current = byId.get(doc._id);

    // GROQ geeft `null` terug voor een veld dat niet gezet is en wij `undefined`;
    // zonder gelijktrekken zou elke run alles "gewijzigd" noemen.
    if (!current) {
      created += 1;
    } else if (
      SCRAPED_FIELDS.every((field) => (current[field] ?? undefined) === doc[field])
    ) {
      unchanged += 1;
      continue;
    } else {
      updated += 1;
    }

    // `_type` blijft buiten de patch: Sanity staat het niet toe die te zetten.
    const { _id, _type, ...fields } = doc;
    // Deelcijfers van het ándere tabblad horen hier niet te staan. Zonder dit
    // blijft een oude waarde hangen en noemt elke run dezelfde review gewijzigd.
    const stale = SUBSCORES.map(({ field }) => field).filter(
      (field) => doc[field] === undefined,
    );
    transaction
      .createIfNotExists({ _id, _type })
      // Funda is de bron: een gewijzigde tekst of cijfer overschrijft Sanity.
      .patch(_id, (patch) => patch.set(fields).unset(stale));
  }

  if (created + updated > 0) await transaction.commit({ visibility: 'async' });

  return { created, updated, unchanged };
}

async function handle(request: Request) {
  const cors = corsHeaders(request);

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: cors });
  }

  const { searchParams } = new URL(request.url);
  const id =
    searchParams.get('id') || process.env.FUNDA_MAKELAAR_ID || DEFAULT_MAKELAAR_ID;
  const dryRun = searchParams.get('dryRun') === '1';
  const debug = searchParams.get('debug') === '1';
  const maxPages = Number(searchParams.get('maxPages')) || undefined;

  const requestedType = searchParams.get('type');
  const types = FUNDA_REVIEW_TYPES.includes(requestedType as FundaReviewType)
    ? [requestedType as FundaReviewType]
    : FUNDA_REVIEW_TYPES;

  try {
    if (debug) {
      // ruwe tekst terug, zodat de regexes te controleren zijn als er 0 uitkomt
      const url = buildWidgetUrl({ id, page: 1, type: types[0] });
      const html = await fetchPage(url);
      return NextResponse.json(
        { url, length: html.length, text: stripTags(html).slice(0, 20000) },
        { headers: cors },
      );
    }

    const scraped: ScrapedReview[] = [];
    const warnings: string[] = [];
    const perType: Record<string, number> = {};
    let pagesFetched = 0;

    for (const type of types) {
      const result = await scrapeFundaReviews({
        id,
        type,
        maxPages,
        fetchPage,
      });
      scraped.push(...result.reviews);
      warnings.push(...result.warnings);
      perType[type] = result.reviews.length;
      pagesFetched += result.pagesFetched;
    }

    if (scraped.length === 0) {
      warnings.push(
        'Geen enkele review herkend — draai ?debug=1 en controleer het sjabloon',
      );
    }

    const summary = {
      ok: true,
      dryRun,
      makelaarId: id,
      pagesFetched,
      found: scraped.length,
      perType,
      warnings,
    };

    if (dryRun) {
      return NextResponse.json({ ...summary, reviews: scraped }, { headers: cors });
    }

    const written =
      scraped.length > 0
        ? await upsertReviews(scraped)
        : { created: 0, updated: 0, unchanged: 0 };
    return NextResponse.json({ ...summary, ...written }, { headers: cors });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[scrape-funda-reviews]', message);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500, headers: cors },
    );
  }
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}
