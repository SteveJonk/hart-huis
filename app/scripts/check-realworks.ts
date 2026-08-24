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
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { label, sentence, slugify, toWoning, type RealworksObject } from '../src/lib/realworks';

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
assert.equal(huis.fotos[0].filename, '287669985-w2000.jpg');
assert.ok(huis.fotos.every((foto) => foto.filename.endsWith('.jpg')));

// Zonder width én height geeft Realworks een thumbnail van 150x100.
assert.ok(huis.fotos[0].url.includes('width=2000&height=2000'));
assert.ok(huis.fotos[0].url.includes('check=api_sha256'), 'de handtekening moet intact blijven');

console.log(`✓ ${feed.resultaten.length} objecten gemapt zonder verrassingen`);
