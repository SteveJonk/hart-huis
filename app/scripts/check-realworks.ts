/**
 * Kleinste ding dat faalt als de Realworks-mapping breekt.
 * Run met: npm run check:realworks
 *
 * De fixture is een echt antwoord van `GET /wonen/v3/objecten?actief=true`
 * (22 augustus 2026), met de media-lijsten ingekort tot een handvol items per
 * object. Ververs hem met:
 *
 *   curl -s -H "Authorization: $REALWORKS_AUTH_HEADER" \
 *     'https://api.realworks.nl/wonen/v3/objecten?actief=true' \
 *     > app/scripts/fixtures/realworks-objecten.json
 */
import assert from 'node:assert/strict';
import { evaluate, parse } from 'groq-js';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  label,
  planMedia,
  sentence,
  slugify,
  toWoning,
  beschermVerkocht,
  VEROUDERD_QUERY,
  VERKOCHT_STATUSSEN,
  VERWIJDERBAAR_QUERY,
  verouderingsGrens,
  verouderingsGrensVerkocht,
  verwijderingsGrens,
  WEESASSETS_QUERY,
  vrijeKey,
  type BestaandeWoning,
  type MappedWoning,
  type RealworksObject,
} from '../src/lib/realworks';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const feed = JSON.parse(
  readFileSync(path.join(__dirname, 'fixtures/realworks-objecten.json'), 'utf8'),
) as { resultaten: RealworksObject[] };

assert.equal(label('AAN_RUSTIGE_WEG'), 'Aan rustige weg');
assert.equal(label('CV_KETEL'), 'CV-ketel');
assert.equal(label(null), undefined);
assert.equal(sentence(['DAKISOLATIE', 'VLOERISOLATIE']), 'Dakisolatie, vloerisolatie');
assert.equal(slugify("Kees 't Hoenstraat 7 Spaarndam"), 'kees-t-hoenstraat-7-spaarndam');

// Elk object levert de velden die het schema verplicht stelt.
for (const object of feed.resultaten) {
  const woning = toWoning(object);
  assert.ok(woning.fields.adres, `adres ontbreekt bij ${object.id}`);
  assert.ok(woning.fields.plaats, `plaats ontbreekt bij ${object.id}`);
  assert.ok(woning.slug, `slug ontbreekt bij ${object.id}`);
  assert.ok(
    ['beschikbaar', 'voorbehoud', 'verkocht'].includes(woning.fields.status as string),
    `onbekende status bij ${object.id}`,
  );
  assert.ok(woning.fotos.length > 0, `geen foto's bij ${object.id}`);
}

// Het huis dat we met de hand nagelopen hebben.
const huis = toWoning(feed.resultaten.find((object) => object.id === 10430251)!);
assert.equal(huis.fields.adres, "Kees 't Hoenstraat 7");
assert.equal(huis.fields.plaats, 'Spaarndam');
assert.equal(huis.slug, 'kees-t-hoenstraat-7-spaarndam');
assert.equal(huis.fields.postcode, '2064 XJ');
assert.equal(huis.fields.status, 'beschikbaar'); // ONDER_BOD is nog te koop
assert.equal(huis.fields.prijs, 800000);
assert.equal(huis.fields.prijsConditie, 'k.k.');
assert.equal(huis.fields.aangebodenSinds, '2026-08-18');
assert.equal(huis.fields.aanvaarding, 'In overleg');
assert.equal(huis.fields.soortWoning, 'Eengezinswoning, 2-onder-1-kapwoning');
assert.equal(huis.fields.bouwjaar, 1973);
assert.equal(huis.fields.woonoppervlak, 168);
assert.equal(huis.fields.perceel, 256);
assert.equal(huis.fields.inhoud, 604);
assert.equal(huis.fields.kamers, 5);
assert.equal(huis.fields.slaapkamers, 4);
assert.equal(huis.fields.energielabel, 'A');
assert.ok((huis.fields.aanbiedingsTekst as string).startsWith('Ben je een natuurliefhebber'));

const groepen = huis.fields.kenmerkGroepen as Array<{
  titel: string;
  rijen: Array<{ label: string; waarde: string[] }>;
}>;
const waarde = (titel: string, label: string) =>
  groepen.find((groep) => groep.titel === titel)?.rijen.find((rij) => rij.label === label)?.waarde;

assert.deepEqual(waarde('Overdracht', 'Vraagprijs'), ['€ 800.000,- k.k.']);
assert.deepEqual(waarde('Overdracht', 'Status'), ['Onder bod']);
assert.deepEqual(waarde('Energie', 'Isolatie'), ['Dakisolatie, vloerisolatie']);
assert.deepEqual(waarde('Energie', 'Verwarming'), ['Warmtepomp']);
assert.deepEqual(waarde('Indeling', 'Aantal badkamers'), ['1']);
assert.deepEqual(waarde('Indeling', 'Badkamervoorzieningen'), ['Ligbad', 'Toilet', 'Douche']);
assert.deepEqual(waarde('Buitenruimte en parkeren', 'Ligging tuin'), ['West']);
assert.deepEqual(waarde('Oppervlakten en inhoud', 'Externe bergruimte'), ['11 m²']);

// Hoofdfoto voorop, plattegronden en de brochure niet in de galerij.
assert.equal(huis.fotos[0].filename, '287669985-w1200.jpg');
assert.ok(huis.fotos.every((foto) => foto.filename.endsWith('.jpg')));

// Zonder width én height geeft Realworks een thumbnail van 150x100.
assert.ok(huis.fotos[0].url.includes('width=1200&height=1200'));
assert.ok(huis.fotos[0].url.includes('check=api_sha256'), 'de handtekening moet intact blijven');

// planMedia: wat er al in Sanity staat blijft staan, en alleen als de feed
// méér foto's heeft worden de ontbrekende aangevuld.
const metFotos = (aantal: number) =>
  ({
    realworksId: 1,
    slug: 's',
    fotos: Array.from({ length: aantal }, (_, i) => ({
      url: `u${i + 1}`,
      filename: `f${i + 1}.jpg`,
      alt: `foto ${i + 1}`,
    })),
    fields: { adres: 'Teststraat 1' },
  }) as unknown as MappedWoning;

const inSanity = (namen: string[]) =>
  ({
    _id: 'woning-test',
    realworksId: 1,
    fotos: namen.map((naam, i) => ({
      _key: `1-${i}`,
      _type: 'image',
      bestandsnaam: naam,
      asset: { _type: 'reference', _ref: `image-${i}` },
    })),
  }) as BestaandeWoning;

// Nieuw object: alles laden.
assert.deepEqual(planMedia(metFotos(3)).laden.map((foto) => foto.filename), [
  'f1.jpg',
  'f2.jpg',
  'f3.jpg',
]);

// Evenveel foto's als in Sanity: niets laden, alles behouden.
const gelijk = planMedia(metFotos(3), inSanity(['f1.jpg', 'f2.jpg', 'f3.jpg']));
assert.equal(gelijk.laden.length, 0);
assert.equal(gelijk.behouden.length, 3);

// Feed heeft er meer: alleen de ontbrekende erbij, de rest blijft staan.
const meer = planMedia(metFotos(5), inSanity(['f1.jpg', 'f2.jpg', 'f3.jpg']));
assert.deepEqual(meer.laden.map((foto) => foto.filename), ['f4.jpg', 'f5.jpg']);
assert.equal(meer.behouden.length, 3);

// Een document zonder foto's wordt gewoon gevuld.
assert.equal(planMedia(metFotos(2), inSanity([])).laden.length, 2);

// Nieuwe foto's krijgen een _key die niet botst met wat er al staat.
const gebruikt = new Set(['1-0', '1-1']);
assert.equal(vrijeKey('1-0', gebruikt), '1-0-2');
assert.equal(vrijeKey('1-0', gebruikt), '1-0-3');
assert.equal(vrijeKey('1-2', gebruikt), '1-2');

// De opruimgrens ligt twee weken terug, voor verkochte objecten een maand.
assert.equal(verouderingsGrens(new Date('2026-08-25T10:00:00.000Z')), '2026-08-11T10:00:00.000Z');
assert.equal(verouderingsGrens(new Date('2026-01-05T10:00:00.000Z')), '2025-12-22T10:00:00.000Z');
assert.equal(verouderingsGrensVerkocht(new Date('2026-08-25T10:00:00.000Z')), '2026-07-25T10:00:00.000Z');
assert.deepEqual([...VERKOCHT_STATUSSEN].sort(), ['verkocht', 'voorbehoud']);

// Elke status uit de mapping is er één die de opruimquery kent; komt er een
// nieuwe bij, dan moet VERKOCHT_STATUSSEN opnieuw langs.
const statussen = new Set(feed.resultaten.map((object) => toWoning(object).fields.status));
assert.ok(
  [...statussen].every((status) =>
    ['beschikbaar', 'voorbehoud', 'verkocht'].includes(status as string),
  ),
  `onbekende status in de feed: ${[...statussen].join(', ')}`,
);

// VEROUDERD_QUERY haalt precies de objecten op die offline moeten.
async function checkVerouderdQuery() {
  const woning = (id: string, status: string, updatedAt: string) => ({
    _id: id,
    _type: 'woning',
    status,
    adres: id,
    _updatedAt: updatedAt,
  });
  const dataset = [
    woning('te-koop-vers', 'beschikbaar', '2026-08-20T10:00:00Z'),
    woning('te-koop-oud', 'beschikbaar', '2026-08-01T10:00:00Z'),
    woning('verkocht-vers', 'verkocht', '2026-08-01T10:00:00Z'),
    woning('verkocht-oud', 'verkocht', '2026-06-01T10:00:00Z'),
    woning('voorbehoud-oud', 'voorbehoud', '2026-06-01T10:00:00Z'),
    { ...woning('concept-oud', 'beschikbaar', '2026-01-01T10:00:00Z'), _id: 'drafts.te-koop-oud' },
    { _id: 'pagina', _type: 'page', _updatedAt: '2026-01-01T10:00:00Z' },
  ];

  const gevonden = await (
    await evaluate(parse(VEROUDERD_QUERY), {
      dataset,
      params: {
        verkocht: [...VERKOCHT_STATUSSEN],
        grens: verouderingsGrens(new Date('2026-08-25T10:00:00.000Z')),
        grensVerkocht: verouderingsGrensVerkocht(new Date('2026-08-25T10:00:00.000Z')),
      },
    })
  ).get();

  assert.deepEqual(
    (gevonden as Array<{ _id: string }>).map((document) => document._id),
    ['te-koop-oud', 'verkocht-oud', 'voorbehoud-oud'],
    'niet-verkocht gaat na twee weken offline, verkocht na een maand',
  );
}

// Concepten die zes maanden offline staan gaan definitief weg, met de assets
// die niemand anders gebruikt.
async function checkVerwijderbaarQuery() {
  const nu = new Date('2026-09-30T10:00:00.000Z');
  assert.equal(verwijderingsGrens(nu), '2026-03-30T10:00:00.000Z');

  const concept = (id: string, extra: Record<string, unknown> = {}) => ({
    _id: `drafts.${id}`,
    _type: 'woning',
    adres: id,
    status: 'beschikbaar',
    realworksId: 1,
    _updatedAt: '2026-01-01T10:00:00Z',
    fotos: [{ asset: { _ref: `img-${id}` } }, { asset: { _ref: 'img-gedeeld' } }],
    ...extra,
  });
  const dataset = [
    concept('oud'),
    concept('vers', { _updatedAt: '2026-08-01T10:00:00Z' }),
    concept('verkocht', { status: 'verkocht' }),
    concept('verkocht-vers', { status: 'verkocht', _updatedAt: '2026-08-01T10:00:00Z' }),
    concept('handmatig', { realworksId: undefined }),
    concept('in-feed', { realworksId: 99 }),
    concept('heeft-publicatie'),
    { _id: 'heeft-publicatie', _type: 'woning', _updatedAt: '2026-09-01T10:00:00Z' },
    { _id: 'img-oud', _type: 'sanity.imageAsset' },
    { _id: 'img-gedeeld', _type: 'sanity.imageAsset' },
    { _id: 'img-heeft-publicatie', _type: 'sanity.imageAsset' },
    // verwijst naar het gedeelde plaatje, dus dat moet blijven staan
    { _id: 'andere-woning', _type: 'woning', fotos: [{ asset: { _ref: 'img-gedeeld' } }] },
  ];

  const gevonden = (await (
    await evaluate(parse(VERWIJDERBAAR_QUERY), {
      dataset,
      params: { inFeed: [99], grens: verwijderingsGrens(nu) },
    })
  ).get()) as Array<{ _id: string; assets: string[] }>;

  assert.deepEqual(
    gevonden.map((document) => document._id),
    ['drafts.oud', 'drafts.verkocht'],
    'alleen een oud concept uit de import dat niet meer in de feed zit, verkocht of niet',
  );

  const weesassets = await (
    await evaluate(parse(WEESASSETS_QUERY), {
      dataset,
      params: { assetIds: gevonden[0].assets, docIds: gevonden.map((document) => document._id) },
    })
  ).get();
  assert.deepEqual(weesassets, ['img-oud'], 'een asset dat nog ergens anders in gebruik is blijft staan');
}

// Er blijven minstens drie verkochte objecten online; de oudste gaan eerst.
function checkBeschermVerkocht() {
  const v = (id: string, updatedAt: string) => ({ _id: id, status: 'verkocht', _updatedAt: updatedAt });
  const k = { _id: 'te-koop', status: 'beschikbaar', _updatedAt: '2026-01-01T00:00:00Z' };
  const ids = (lijst: Array<{ _id: string }>) => lijst.map((document) => document._id);

  const drie = [v('a', '2026-01-01T00:00:00Z'), v('b', '2026-02-01T00:00:00Z'), v('c', '2026-03-01T00:00:00Z')];
  assert.deepEqual(ids(beschermVerkocht([...drie, k], 3)), ['te-koop'], 'bij drie of minder blijft alles staan');
  assert.deepEqual(ids(beschermVerkocht([], 2)), []);

  const vijf = [...drie, v('d', '2026-04-01T00:00:00Z'), v('e', '2026-05-01T00:00:00Z')];
  assert.deepEqual(
    ids(beschermVerkocht([...vijf].reverse(), 5)).sort(),
    ['a', 'b'],
    'van vijf gepubliceerde gaan de twee oudste weg, de nieuwste drie blijven',
  );
  // 4 online, waarvan 2 kandidaat: er mag er maar één weg.
  assert.deepEqual(ids(beschermVerkocht([drie[0], drie[1]], 4)), ['a']);
  // Wat niet verkocht is, is nooit beschermd.
  assert.deepEqual(ids(beschermVerkocht([k], 1)), ['te-koop']);
}

// tsx compileert deze scripts naar CJS, dus geen top-level await.
checkVerouderdQuery()
  .then(checkVerwijderbaarQuery)
  .then(checkBeschermVerkocht)
  .then(() =>
    console.log(`✓ ${feed.resultaten.length} objecten gemapt zonder verrassingen`),
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
