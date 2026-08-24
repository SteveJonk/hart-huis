/**
 * Haalt de actieve objecten op bij Realworks en zet ze als `woning`-documenten
 * in Sanity. De feed is de waarheid: een object dat er al staat wordt volledig
 * overschreven (op `realworksId`), niet gedupliceerd.
 *
 * Aanroepen:
 *   - dagelijks door de Vercel-cron uit `vercel.json` (`Authorization: Bearer $CRON_SECRET`)
 *   - met de knop "Realworks-objecten" in de Sanity Studio (`x-scraper-secret`)
 *
 * Uitproberen zonder iets weg te schrijven:
 *   GET /api/import-realworks?dryRun=1
 *   GET /api/import-realworks?limit=1   (eerste object, handig bij een trage eerste run)
 */
import { NextResponse } from 'next/server';
import {
  REALWORKS_URL,
  toWoning,
  type MappedWoning,
  type RealworksObject,
} from '@/lib/realworks';
import { corsHeaders, isAuthorized } from '@/lib/route-auth';
import { getWriteClient } from '@/sanity/write-client';

export const runtime = 'nodejs';
/** Eerste run laadt alle foto's naar Sanity; dat past niet in de standaard 60s. */
export const maxDuration = 300;

/** Foto's per keer tegelijk naar Sanity. */
const UPLOAD_BATCH = 6;

type Feed = {
  resultaten?: RealworksObject[];
  paginering?: { totaalAantal?: number };
};

class FeedError extends Error {}

async function fetchFeed(): Promise<Feed> {
  const auth = process.env.REALWORKS_AUTH_HEADER;
  if (!auth) {
    throw new FeedError(
      'REALWORKS_AUTH_HEADER ontbreekt. Zet hem in app/.env en in de omgevingsvariabelen op de server.',
    );
  }

  let response: Response;
  try {
    response = await fetch(REALWORKS_URL, {
      headers: { Authorization: auth, Accept: 'application/json' },
      cache: 'no-store',
    });
  } catch (error) {
    throw new FeedError(
      `Realworks is niet bereikbaar: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!response.ok) {
    const body = (await response.text().catch(() => '')).slice(0, 400);
    const hint =
      response.status === 401 || response.status === 403
        ? ' — controleer de Authorization-token én of het IP-adres van deze server op de whitelist van Realworks staat.'
        : '';
    throw new FeedError(`Realworks gaf HTTP ${response.status}${hint}${body ? `\n${body}` : ''}`);
  }

  try {
    return (await response.json()) as Feed;
  } catch {
    throw new FeedError('Realworks gaf geen geldige JSON terug.');
  }
}

/** Asset-ids van bestanden die al in de bibliotheek staan, op originele bestandsnaam. */
async function existingAssets(
  client: ReturnType<typeof getWriteClient>,
  type: 'sanity.imageAsset' | 'sanity.fileAsset',
  filenames: string[],
) {
  if (filenames.length === 0) return new Map<string, string>();
  const assets = await client.fetch<Array<{ _id: string; originalFilename: string }>>(
    `*[_type == $type && originalFilename in $filenames]{_id, originalFilename}`,
    { type, filenames },
  );
  return new Map(assets.map((asset) => [asset.originalFilename, asset._id]));
}

async function uploadFromUrl(
  client: ReturnType<typeof getWriteClient>,
  kind: 'image' | 'file',
  url: string,
  filename: string,
): Promise<string> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`HTTP ${response.status} bij het ophalen van ${filename}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload(kind, buffer, { filename });
  return asset._id;
}

async function importObjects(objects: MappedWoning[]) {
  const client = getWriteClient();

  // Bestaande objecten: op realworksId, zodat een hernoemd adres hetzelfde
  // document bijwerkt in plaats van er een tweede naast te zetten.
  const bestaand = await client.fetch<Array<{ _id: string; realworksId: number | null }>>(
    `*[_type == "woning"]{_id, realworksId}`,
  );
  const idByRealworksId = new Map(
    bestaand
      .filter((doc) => typeof doc.realworksId === 'number')
      .map((doc) => [doc.realworksId as number, doc._id]),
  );

  const images = await existingAssets(
    client,
    'sanity.imageAsset',
    [...new Set(objects.flatMap((object) => object.fotos.map((foto) => foto.filename)))],
  );
  const files = await existingAssets(
    client,
    'sanity.fileAsset',
    objects.flatMap((object) => (object.brochure ? [object.brochure.filename] : [])),
  );

  let geschreven = 0;
  let nieuw = 0;
  let fotosGeladen = 0;
  const warnings: string[] = [];

  for (const object of objects) {
    // Zes tegelijk: een object heeft er zomaar vijftig, en één voor één
    // duurt dat langer dan de functie mag draaien.
    const resolved: Array<string | null> = [];
    for (let start = 0; start < object.fotos.length; start += UPLOAD_BATCH) {
      const batch = object.fotos.slice(start, start + UPLOAD_BATCH);
      resolved.push(
        ...(await Promise.all(
          batch.map(async (foto) => {
            const known = images.get(foto.filename);
            if (known) return known;
            try {
              const assetId = await uploadFromUrl(client, 'image', foto.url, foto.filename);
              images.set(foto.filename, assetId);
              fotosGeladen += 1;
              return assetId;
            } catch (error) {
              warnings.push(
                `Foto ${foto.filename} van ${object.fields.adres} overgeslagen: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              );
              return null;
            }
          }),
        )),
      );
    }

    const fotos = object.fotos
      .map((foto, index) => ({ foto, index, assetId: resolved[index] }))
      .filter((entry) => entry.assetId)
      .map(({ foto, index, assetId }) => ({
        _type: 'image',
        _key: `${object.realworksId}-${index}`,
        asset: { _type: 'reference', _ref: assetId as string },
        alt: foto.alt,
      }));

    let brochure;
    if (object.brochure) {
      let assetId = files.get(object.brochure.filename);
      if (!assetId) {
        try {
          assetId = await uploadFromUrl(client, 'file', object.brochure.url, object.brochure.filename);
          files.set(object.brochure.filename, assetId);
        } catch (error) {
          warnings.push(
            `Brochure van ${object.fields.adres} overgeslagen: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      }
      if (assetId) brochure = { _type: 'file', asset: { _type: 'reference', _ref: assetId } };
    }

    const bestaandId = idByRealworksId.get(object.realworksId);
    if (!bestaandId) nieuw += 1;

    // De feed is de waarheid: het hele document gaat eroverheen.
    await client.createOrReplace({
      _id: bestaandId ?? `woning-${object.slug}`,
      _type: 'woning',
      ...object.fields,
      ...(fotos.length > 0 ? { fotos } : {}),
      ...(brochure ? { brochure } : {}),
    });
    geschreven += 1;
  }

  return { geschreven, nieuw, fotosGeladen, warnings };
}

async function handle(request: Request) {
  const cors = corsHeaders(request);

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: cors });
  }

  const { searchParams } = new URL(request.url);
  const dryRun = searchParams.get('dryRun') === '1';
  const limit = Number(searchParams.get('limit')) || undefined;

  try {
    const feed = await fetchFeed();
    const resultaten = feed.resultaten ?? [];
    const totaal = feed.paginering?.totaalAantal;

    if (resultaten.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          gevonden: 0,
          error:
            'Realworks gaf 0 objecten terug. Dat kan kloppen (geen actief aanbod), maar meestal komt het doordat het IP-adres van deze server niet op de whitelist staat of doordat de token bij een ander portaal hoort — dan is het antwoord leeg in plaats van een foutmelding.',
        },
        { headers: cors },
      );
    }

    const warnings: string[] = [];
    if (typeof totaal === 'number' && totaal > resultaten.length) {
      warnings.push(
        `De feed meldt ${totaal} objecten maar leverde er ${resultaten.length} in deze pagina. De rest is niet geïmporteerd — Realworks pagineert het antwoord.`,
      );
    }

    const objecten = resultaten.slice(0, limit ?? resultaten.length).map(toWoning);
    const summary = {
      ok: true,
      dryRun,
      gevonden: resultaten.length,
      verwerkt: objecten.length,
      warnings,
    };

    if (dryRun) {
      return NextResponse.json(
        {
          ...summary,
          objecten: objecten.map((object) => ({
            ...object.fields,
            fotos: object.fotos.length,
            brochure: Boolean(object.brochure),
          })),
        },
        { headers: cors },
      );
    }

    const written = await importObjects(objecten);
    return NextResponse.json(
      { ...summary, ...written, warnings: [...warnings, ...written.warnings] },
      { headers: cors },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[import-realworks]', message);
    return NextResponse.json(
      { ok: false, error: message },
      { status: error instanceof FeedError ? 502 : 500, headers: cors },
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
