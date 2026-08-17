/**
 * Kleinste ding dat faalt als de Funda-parser breekt.
 * Run met: npm run check:funda
 *
 * Draait tegen `scripts/fixtures/funda-widget.html`. Zolang dat een nagebouwde
 * pagina is bewijst deze test alleen dat de parser doet wat hij belooft op de
 * structuur die we verwachten — niet dat die structuur klopt. Vervang de
 * fixture door een echte opgeslagen widget-pagina en draai dit opnieuw.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildWidgetUrl,
  detectLastPage,
  parseDutchDate,
  parseGrade,
  parseReviews,
  reviewDocumentId,
  reviewKey,
  scrapeFundaReviews,
  type FundaReviewType,
} from '../src/lib/funda-reviews';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = readFileSync(path.join(__dirname, 'fixtures/funda-widget.html'), 'utf8');

// ---------------------------------------------------------------- losse delen

assert.equal(parseDutchDate('12 juli 2026'), '2026-07-12');
assert.equal(parseDutchDate('3 maart 2026'), '2026-03-03');
assert.equal(parseDutchDate('1 sep. 2025'), '2025-09-01');
assert.equal(parseDutchDate('12-07-2026'), '2026-07-12');
assert.equal(parseDutchDate('ergens vorig jaar'), undefined);

assert.equal(parseGrade('9,5'), 9.5);
assert.equal(parseGrade('10'), 10);
// buiten 0-10 is geen cijfer maar een verkeerd gelezen getal
assert.equal(parseGrade('12'), undefined);
assert.equal(parseGrade(''), undefined);

// dezelfde review levert altijd hetzelfde id op, ook met andere spatiëring
const key = reviewKey({ type: 'Verkoop', name: 'Marloes B.', address: 'Kerkstraat 12', date: '12 juli 2026' });
assert.equal(
  key,
  reviewKey({ type: 'Verkoop', name: 'marloes  b.', address: 'Kerkstraat 12 ', date: '12 juli 2026' }),
);
// ...maar het andere tabblad is een andere review
assert.notEqual(
  key,
  reviewKey({ type: 'Aankoop', name: 'Marloes B.', address: 'Kerkstraat 12', date: '12 juli 2026' }),
);
assert.match(reviewDocumentId(key), /^funda-review-[0-9a-f]{16}$/);

assert.equal(
  buildWidgetUrl({ id: '10356', page: 2, type: 'Verkoop' }),
  'https://www.funda.nl/beoordelingenwidget/10356/2/3=D7C3B9;6=61/Verkoop',
);

assert.equal(detectLastPage(fixture), 2);
assert.equal(detectLastPage('<p>geen paginering</p>'), null);

// ------------------------------------------------------------------- parseren

const reviews = parseReviews(fixture, 'Verkoop');
assert.equal(reviews.length, 2, 'beide beoordelingen uit de fixture');

const [first, second] = reviews;

assert.equal(first.name, 'Marloes B.');
assert.equal(first.address, 'Kerkstraat 12, Haarlem');
assert.equal(first.date, '2026-07-12');
assert.equal(first.type, 'Verkoop');
assert.equal(first.grade, 9.5);
assert.equal(first.expertise, 10);
assert.equal(first.localMarketKnowledge, 10);
assert.equal(first.priceQuality, 9);
assert.equal(first.serviceAndGuidance, 9);

// de aanbevelingsregel hoort er niet in, de tekst van de reviewer wel — ook
// als die zelf "aanbevelen" schrijft
assert.equal(
  first.quote,
  'Fantastische begeleiding gehad bij de verkoop van ons huis. Altijd snel antwoord op vragen & echt betrokken. Ik kan ze zeker aanbevelen.',
);
assert.doesNotMatch(first.quote, /zou deze makelaar aanbevelen/);
// de tweede review gebruikt de andere formulering van dezelfde boilerplate
assert.doesNotMatch(second.quote, /beveelt deze makelaar aan/);

// een naam van de vólgende review mag niet in de vorige belanden
assert.doesNotMatch(first.quote, /De Vries/);
assert.equal(second.name, 'Familie De Vries');
assert.equal(second.grade, 10);
assert.equal(second.quote, 'Dorien nam ons stap voor stap mee door het hele proces. Fijne samenwerking.');

// ------------------------------------------------------- het andere tabblad

/**
 * Aankoop vraagt vier ándere criteria uit dan Verkoop. Bewust inline en niet
 * als tweede fixture: er is nog geen echte Aankoop-pagina opgeslagen, dus dit
 * bewijst alleen dat de parser beide labelsets aankan. De hoofdletters wijken
 * met opzet af — Funda schrijft ze niet overal hetzelfde.
 */
const aankoopFixture = `
<div class="beoordeling">
  <div class="naam">Joost en Anne</div>
  <div class="woning">Zijlweg 8, Haarlem<span>Geschreven op 4 mei 2026</span></div>
  <div class="cijfer">9</div>
  <div class="aanbeveling">Deze klant zou deze makelaar aanbevelen.</div>
  <p>Scherp onderhandeld, we kregen het huis onder de vraagprijs.</p>
  <div class="deelcijfer"><span>Bereikbaarheid en Communicatie</span><span>9,5</span></div>
  <div class="deelcijfer"><span>Deskundigheid</span><span>9</span></div>
  <div class="deelcijfer"><span>Onderhandeling en resultaat</span><span>10</span></div>
  <div class="deelcijfer"><span>Prijs / kwaliteit</span><span>8</span></div>
</div>`;

const [aankoop] = parseReviews(aankoopFixture, 'Aankoop');
assert.equal(aankoop.name, 'Joost en Anne');
assert.equal(aankoop.grade, 9);
assert.equal(aankoop.accessibilityAndCommunication, 9.5);
assert.equal(aankoop.expertise, 9);
assert.equal(aankoop.negotiationAndResult, 10);
assert.equal(aankoop.priceQuality, 8);
// criteria van het andere tabblad blijven leeg in plaats van 0
assert.equal(aankoop.localMarketKnowledge, undefined);
assert.equal(aankoop.serviceAndGuidance, undefined);
// het cijferblok begint hier bij een ánder label dan bij Verkoop; de tekst
// mag daar niet in doorlopen
assert.equal(aankoop.quote, 'Scherp onderhandeld, we kregen het huis onder de vraagprijs.');

// en andersom: een Verkoop-review krijgt geen Aankoop-cijfers
assert.equal(first.negotiationAndResult, undefined);
assert.equal(first.accessibilityAndCommunication, undefined);

// -------------------------------------------------------------- de hele lus

async function run(pages: Record<number, string>, type: FundaReviewType = 'Verkoop') {
  const fetched: string[] = [];
  return {
    fetched,
    result: await scrapeFundaReviews({
      id: '10356',
      type,
      delayMs: 0,
      fetchPage: async (url) => {
        fetched.push(url);
        const page = Number(url.match(/\/(\d+)\/\d=/)?.[1] ?? 1);
        return pages[page] ?? '';
      },
    }),
  };
}

async function checkPagination() {
  // "Pagina 2" in de fixture: er wordt een tweede pagina opgehaald
  const twoPages = await run({ 1: fixture, 2: fixture.replace(/Marloes B\./, 'Sanne K.') });
  assert.equal(twoPages.result.pagesFetched, 2);
  assert.equal(twoPages.result.lastPage, 2);
  assert.equal(twoPages.result.reviews.length, 3, 'Sanne erbij, de rest ontdubbeld');

  // Als het paginanummer genegeerd wordt en pagina 2 hetzelfde teruggeeft,
  // stoppen we na twee requests in plaats van door te blijven pompen.
  const repeating = await run({ 1: fixture, 2: fixture });
  assert.equal(repeating.result.pagesFetched, 2);
  assert.equal(repeating.result.reviews.length, 2);
  assert.match(repeating.result.warnings.join(' '), /herhaalde pagina/);

  // Een leeg tabblad is geen crash, maar wel een waarschuwing.
  const empty = await run({});
  assert.equal(empty.result.reviews.length, 0);
  assert.match(empty.result.warnings.join(' '), /0 reviews/);
}

checkPagination()
  .then(() => console.log(`✓ funda-parser ok — ${reviews.length} reviews uit de fixture`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
