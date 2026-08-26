/**
 * Haalt de actieve objecten op bij Realworks en zet ze als `woning`-documenten
 * in Sanity. De feed is de waarheid voor de tekstvelden: een object dat er al
 * staat wordt overschreven (op `realworksId`), niet gedupliceerd. Uitzondering
 * zijn de media: foto's en brochure die al op het document staan blijven staan
 * en worden niet opnieuw gedownload. Heeft de feed méér foto's dan het
 * document, dan worden de ontbrekende erachter aangevuld. Ook het redactionele
 * `makelaar`-veld blijft staan — dat zit niet in de feed.
 *
 * Aan het eind gaan objecten die niet verkocht zijn en al twee maanden niet
 * meer in de feed zaten offline (het gepubliceerde document wordt verwijderd,
 * het concept blijft staan).
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
  BLIJFT_ONLINE,
  planMedia,
  REALWORKS_URL,
  toWoning,
  VEROUDERD_QUERY,
  verouderingsGrens,
  vrijeKey,
  zonderBestandsnaam,
  type BestaandeWoning,
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
  // document bijwerkt in plaats van er een tweede naast te zetten. De media
  // komen mee — inclusief de bestandsnaam van elke foto, want daarmee bepalen
  // we welke foto's uit de feed nog ontbreken.
  const bestaand = await client.fetch<BestaandeWoning[]>(
    `*[_type == "woning"]{
      _id,
      realworksId,
      brochure,
      makelaar,
      "fotos": fotos[]{..., "bestandsnaam": asset->originalFilename}
    }`,
  );
  const bestaandByRealworksId = new Map(
    bestaand
      .filter((doc) => typeof doc.realworksId === 'number')
      .map((doc) => [doc.realworksId as number, doc]),
  );

  const plannen = objects.map((object) =>
    planMedia(object, bestaandByRealworksId.get(object.realworksId)),
  );

  const images = await existingAssets(
    client,
    'sanity.imageAsset',
    [...new Set(plannen.flatMap((plan) => plan.laden.map((foto) => foto.filename)))],
  );
  const files = await existingAssets(
    client,
    'sanity.fileAsset',
    plannen
      .filter((plan) => plan.brochureLaden)
      .map((plan) => plan.object.brochure!.filename),
  );

  let geschreven = 0;
  let nieuw = 0;
  let fotosGeladen = 0;
  let fotosBehouden = 0;
  let fotosToegevoegd = 0;
  const warnings: string[] = [];

  for (const { object, bestaandDoc, behouden, laden, brochureLaden } of plannen) {
    // Zes tegelijk: een object heeft er zomaar vijftig, en één voor één
    // duurt dat langer dan de functie mag draaien.
    const resolved: Array<string | null> = [];
    for (let start = 0; start < laden.length; start += UPLOAD_BATCH) {
      const batch = laden.slice(start, start + UPLOAD_BATCH);
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

    const gebruikteKeys = new Set(
      behouden
        .map((foto) => foto._key)
        .filter((key): key is string => typeof key === 'string'),
    );
    const nieuweFotos = laden
      .map((foto, index) => ({ foto, index, assetId: resolved[index] }))
      .filter((entry) => entry.assetId)
      .map(({ foto, index, assetId }) => ({
        _type: 'image',
        _key: vrijeKey(`${object.realworksId}-${index}`, gebruikteKeys),
        asset: { _type: 'reference', _ref: assetId as string },
        alt: foto.alt,
      }));

    // Wat er al stond voorop, in de volgorde van de studio; nieuwe foto's erachter.
    const fotos = [...behouden.map(zonderBestandsnaam), ...nieuweFotos];
    fotosBehouden += behouden.length;
    if (behouden.length > 0) fotosToegevoegd += nieuweFotos.length;

    let brochure: Record<string, unknown> | undefined = bestaandDoc?.brochure ?? undefined;
    if (brochureLaden && object.brochure) {
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

    if (!bestaandDoc) nieuw += 1;

    // De feed is de waarheid voor de tekstvelden: het hele document gaat
    // eroverheen. De media zijn de uitzondering — die worden hierboven
    // hergebruikt zodat ze niet elke run opnieuw binnenkomen — en de
    // makelaarskaart, die de redactie zelf vult en die niet in de feed zit.
    await client.createOrReplace({
      _id: bestaandDoc?._id ?? `woning-${object.slug}`,
      _type: 'woning',
      ...object.fields,
      ...(fotos.length > 0 ? { fotos } : {}),
      ...(brochure ? { brochure } : {}),
      ...(bestaandDoc?.makelaar ? { makelaar: bestaandDoc.makelaar } : {}),
    });
    geschreven += 1;
  }

  return { geschreven, nieuw, fotosGeladen, fotosBehouden, fotosToegevoegd, warnings };
}

type VerouderdObject = Record<string, unknown> & {
  _id: string;
  adres?: string;
  _updatedAt?: string;
};

/**
 * Objecten die niet verkocht zijn en al twee maanden niet meer zijn bijgewerkt.
 * Elke run raakt ieder object uit de feed aan, dus een oude `_updatedAt`
 * betekent: dit object zat er al die tijd niet meer in.
 */
function verouderdeObjecten(client: ReturnType<typeof getWriteClient>) {
  return client.fetch<VerouderdObject[]>(VEROUDERD_QUERY, {
    blijftOnline: [...BLIJFT_ONLINE],
    grens: verouderingsGrens(),
  });
}

/**
 * Depubliceren doet Sanity door het gepubliceerde document weg te gooien; de
 * inhoud blijft als concept bestaan, zodat de redactie hem terug kan zetten of
 * kan nakijken. Precies wat "Unpublish" in de studio doet.
 */
async function depubliceer(
  client: ReturnType<typeof getWriteClient>,
  documenten: VerouderdObject[],
) {
  if (documenten.length === 0) return;

  const tx = client.transaction();
  for (const document of documenten) {
    const concept: Record<string, unknown> = { ...document, _id: `drafts.${document._id}` };
    delete concept._rev;
    delete concept._createdAt;
    delete concept._updatedAt;
    tx.createIfNotExists(concept as Parameters<typeof tx.createIfNotExists>[0]);
    tx.delete(document._id);
  }
  await tx.commit({ visibility: 'async' });
}

async function ruimOp() {
  const client = getWriteClient();
  const verouderd = await verouderdeObjecten(client);
  await depubliceer(client, verouderd);
  return {
    gedepubliceerd: verouderd.length,
    gedepubliceerdeObjecten: verouderd.map(
      (document) => (document.adres as string) ?? document._id,
    ),
  };
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
      // Laten zien wát er offline zou gaan, zonder het te doen. Kan alleen als
      // er een schrijftoken is; zonder token blijft de rest van de testrun wel
      // werken.
      let teDepubliceren: string[] | undefined;
      try {
        teDepubliceren = (await verouderdeObjecten(getWriteClient())).map(
          (document) => (document.adres as string) ?? document._id,
        );
      } catch (error) {
        warnings.push(
          `Kon niet nakijken welke objecten offline zouden gaan: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }

      return NextResponse.json(
        {
          ...summary,
          objecten: objecten.map((object) => ({
            ...object.fields,
            fotos: object.fotos.length,
            brochure: Boolean(object.brochure),
          })),
          ...(teDepubliceren
            ? { gedepubliceerd: teDepubliceren.length, gedepubliceerdeObjecten: teDepubliceren }
            : {}),
        },
        { headers: cors },
      );
    }

    const written = await importObjects(objecten);

    // Alleen na een volledige run: bij ?limit= is maar een deel van de feed
    // aangeraakt, en dan zegt `_updatedAt` niets over wat er nog te koop staat.
    const opgeruimd = limit
      ? { gedepubliceerd: 0, gedepubliceerdeObjecten: [] as string[] }
      : await ruimOp();
    if (limit) {
      warnings.push(
        'Met ?limit= is er niets offline gehaald: er is maar een deel van de feed bijgewerkt.',
      );
    }

    return NextResponse.json(
      { ...summary, ...written, ...opgeruimd, warnings: [...warnings, ...written.warnings] },
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
