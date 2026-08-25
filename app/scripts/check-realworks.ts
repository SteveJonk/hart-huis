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
  BLIJFT_ONLINE,
  label,
  planMedia,
  sentence,
  slugify,
  toWoning,
  VEROUDERD_QUERY,
  verouderingsGrens,
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

// De opruimgrens ligt twee maanden terug, en verkochte objecten blijven staan.
assert.equal(verouderingsGrens(new Date('2026-08-25T10:00:00.000Z')), '2026-06-25T10:00:00.000Z');
assert.equal(verouderingsGrens(new Date('2026-01-15T10:00:00.000Z')), '2025-11-15T10:00:00.000Z');
assert.deepEqual([...BLIJFT_ONLINE].sort(), ['verkocht', 'voorbehoud']);

// Elke status uit de mapping is er één die de opruimquery kent; komt er een
// nieuwe bij, dan moet BLIJFT_ONLINE opnieuw langs.
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
    woning('te-koop-oud', 'beschikbaar', '2026-05-01T10:00:00Z'),
    woning('verkocht-oud', 'verkocht', '2026-01-01T10:00:00Z'),
    woning('voorbehoud-oud', 'voorbehoud', '2026-01-01T10:00:00Z'),
    { ...woning('concept-oud', 'beschikbaar', '2026-01-01T10:00:00Z'), _id: 'drafts.te-koop-oud' },
    { _id: 'pagina', _type: 'page', _updatedAt: '2026-01-01T10:00:00Z' },
  ];

  const gevonden = await (
    await evaluate(parse(VEROUDERD_QUERY), {
      dataset,
      params: {
        blijftOnline: [...BLIJFT_ONLINE],
        grens: verouderingsGrens(new Date('2026-08-25T10:00:00.000Z')),
      },
    })
  ).get();

  assert.deepEqual(
    (gevonden as Array<{ _id: string }>).map((document) => document._id),
    ['te-koop-oud'],
    'alleen een niet-verkocht object dat twee maanden stilstaat gaat offline',
  );
}

// tsx compileert deze scripts naar CJS, dus geen top-level await.
checkVerouderdQuery()
  .then(() =>
    console.log(`✓ ${feed.resultaten.length} objecten gemapt zonder verrassingen`),
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
