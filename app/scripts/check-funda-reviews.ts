/**
 * Kleinste ding dat faalt als de Funda-parser breekt.
 * Run met: npm run check:funda
 *
 * De fixtures zijn **echte opgeslagen widget-pagina's** (17 augustus 2026):
 * verkoop p1, verkoop p9 (de laatste, mét reacties van de makelaar) en aankoop
 * p1. Deze test bewijst dus dat de parser werkt op de HTML zoals Funda die die
 * dag teruggaf. Ververs ze met:
 *
 *   curl -s -A 'Mozilla/5.0' \
 *     'https://www.funda.nl/beoordelingenwidget/live/10356/1/verkoop/p1/' \
 *     > app/scripts/fixtures/funda-widget-verkoop-p1.html
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildWidgetUrl,
  isEmptyPage,
  parseDutchDate,
  parseGrade,
  parseReviews,
  reviewDocumentId,
  reviewKey,
  scrapeFundaReviews,
  stripTags,
  type FundaReviewType,
} from '../src/lib/funda-reviews';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name: string) =>
  readFileSync(path.join(__dirname, 'fixtures', `funda-widget-${name}.html`), 'utf8');

const verkoopP1 = fixture('verkoop-p1');
/** De laatste verkooppagina — hier staan ook reacties van de makelaar. */
const verkoopP9 = fixture('verkoop-p9');
const aankoopP1 = fixture('aankoop-p1');

/** Wat de widget teruggeeft voorbij de laatste pagina. */
const LEEG = '<html><body><p>Er zijn geen beoordelingen om te tonen.</p></body></html>';

// ---------------------------------------------------------------- losse delen

// het paginanummer staat achteraan als pN, het type in kleine letters, en de
// slash op het eind hoort erbij — zonder slash antwoordt Funda met een 301
assert.equal(
  buildWidgetUrl({ id: '10356', page: 2, type: 'Verkoop' }),
  'https://www.funda.nl/beoordelingenwidget/live/10356/1/verkoop/p2/',
);
assert.equal(
  buildWidgetUrl({ id: '10356', page: 1, type: 'Aankoop' }),
  'https://www.funda.nl/beoordelingenwidget/live/10356/1/aankoop/p1/',
);

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

// Funda codeert accenten als nummer; die horen niet zo in Sanity te belanden
assert.equal(stripTags('<p>idee&#235;n &amp; caf&#xe9;</p>'), 'ideeën & café');
// een naam die we niet kennen laten we liever staan dan wissen
assert.equal(stripTags('<p>&hellip;</p>'), '&hellip;');

assert.equal(isEmptyPage(LEEG), true);
assert.equal(isEmptyPage(verkoopP1), false);

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

// twee bewoners van hetzelfde huis schrijven allebei anoniem op dezelfde dag —
// dat is echt gebeurd, en alleen het cijfer houdt ze uit elkaar
const zelfdeHuis = { type: 'Verkoop', name: 'Een funda gebruiker', address: 'Surinamestraat 24', date: '1 juni 2025' };
assert.notEqual(reviewKey({ ...zelfdeHuis, grade: 10 }), reviewKey({ ...zelfdeHuis, grade: 9 }));

// ------------------------------------------------------------ Verkoop-tabblad

const verkoop = parseReviews(verkoopP1, 'Verkoop');
assert.equal(verkoop.length, 5, 'vijf beoordelingen per pagina');

const [eerste] = verkoop;
assert.equal(eerste.name, 'Een funda gebruiker');
assert.equal(eerste.address, 'Koperwiek 22');
assert.equal(eerste.date, '2026-08-15');
assert.equal(eerste.type, 'Verkoop');
assert.equal(eerste.grade, 9.8);
assert.equal(eerste.expertise, 10);
assert.equal(eerste.localMarketKnowledge, 9);
assert.equal(eerste.priceQuality, 10);
assert.equal(eerste.serviceAndGuidance, 10);
// de criteria van het andere tabblad staan niet op deze pagina
assert.equal(eerste.accessibilityAndCommunication, undefined);
assert.equal(eerste.negotiationAndResult, undefined);

// de boilerplate van Funda hoort er niet in, de tekst van de reviewer wel
assert.match(eerste.quote, /^Dorien is een prettige makelaar/);
assert.doesNotMatch(eerste.quote, /aanbevelen\./);
// een naam of adres van de vólgende review mag niet in de vorige belanden
assert.doesNotMatch(eerste.quote, /Milaanstraat/);
// elke review heeft een tekst, een cijfer en vier deelcijfers
for (const review of verkoop) {
  assert.ok(review.quote.length > 20, `korte quote bij ${review.address}`);
  assert.ok(review.grade !== undefined, `geen cijfer bij ${review.address}`);
  assert.ok(review.expertise !== undefined, `geen deskundigheid bij ${review.address}`);
  assert.ok(review.serviceAndGuidance !== undefined, `geen begeleiding bij ${review.address}`);
}

// --------------------------------------------- reacties van de makelaar zelf

/**
 * Onder een beoordeling mag de makelaar reageren, en zo'n reactie heeft zijn
 * eigen "Geschreven op". Die mag er niet als beoordeling in belanden: hij heeft
 * geen cijfers, dus hij zou het gemiddelde en de telling op /beoordelingen
 * vervuilen — en het "adres" werd het laatste deelcijfer van de review erboven.
 */
const metReacties = parseReviews(verkoopP9, 'Verkoop');
assert.equal(metReacties.length, 2, 'twee beoordelingen, twee reacties overgeslagen');
assert.deepEqual(
  metReacties.map((review) => review.address),
  ['de Leeuwstraat 2', 'Joh van der Waeyenstraat 2'],
);
for (const review of metReacties) {
  assert.ok(review.grade !== undefined, `geen cijfer bij ${review.address}`);
  assert.ok(review.expertise !== undefined, `geen deelcijfers bij ${review.address}`);
  assert.doesNotMatch(review.quote, /Bedankt voor de mooie beoordeling/);
}

// ------------------------------------------------------------ Aankoop-tabblad

const aankoop = parseReviews(aankoopP1, 'Aankoop');
assert.equal(aankoop.length, 5);

const [koper] = aankoop;
assert.equal(koper.name, 'Sophie Schipperijn');
assert.equal(koper.address, 'Volhardingstraat 2 A03');
assert.equal(koper.date, '2026-06-16');
assert.equal(koper.grade, 10);
// Aankoop vraagt vier ándere criteria uit dan Verkoop
assert.equal(koper.accessibilityAndCommunication, 10);
assert.equal(koper.expertise, 10);
assert.equal(koper.negotiationAndResult, 10);
assert.equal(koper.priceQuality, 10);
assert.equal(koper.localMarketKnowledge, undefined);
assert.equal(koper.serviceAndGuidance, undefined);
// het cijferblok begint hier bij een ánder label; de tekst mag daar niet in
// doorlopen
assert.equal(
  koper.quote,
  'Fijne en persoonlijke begeleiding, waarbij goed mee werd gedacht en waardevolle informatie en advies werd gegeven. Zonder Dorien was het mij zeker niet gelukt om wat te kopen, dus ik ben erg blij met deze keuze!',
);

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
        const page = Number(url.match(/\/p(\d+)\/$/)?.[1] ?? 1);
        return pages[page] ?? LEEG;
      },
    }),
  };
}

async function checkPagination() {
  // twee echte pagina's achter elkaar: allemaal verschillende reviews, en de
  // lus stopt pas als de widget zegt dat er niets meer is
  const beide = await run({ 1: verkoopP1, 2: verkoopP9 });
  assert.equal(beide.result.pagesFetched, 3, 'p1, p2 en de lege p3');
  assert.equal(beide.result.reviews.length, 7, '5 van p1 + de 2 echte van p9');
  assert.deepEqual(beide.result.warnings, []);
  assert.deepEqual(beide.fetched.slice(-1), [
    'https://www.funda.nl/beoordelingenwidget/live/10356/1/verkoop/p3/',
  ]);

  // Gaf pN ooit weer hetzelfde terug als pN-1, dan stoppen we na twee requests
  // in plaats van door te blijven pompen.
  const herhaling = await run({ 1: verkoopP1, 2: verkoopP1 });
  assert.equal(herhaling.result.pagesFetched, 2);
  assert.equal(herhaling.result.reviews.length, 5);
  assert.match(herhaling.result.warnings.join(' '), /herhaalde pagina/);

  // Vallen twee reviews tóch op dezelfde sleutel, dan wordt het er één in
  // Sanity — dat mag niet stil gebeuren.
  const dubbel = await run({ 1: verkoopP1 + verkoopP1 });
  assert.match(dubbel.result.warnings.join(' '), /deelden een sleutel/);

  // Een leeg tabblad is geen crash, maar wel een waarschuwing.
  const leeg = await run({});
  assert.equal(leeg.result.reviews.length, 0);
  assert.match(leeg.result.warnings.join(' '), /geen beoordelingen/);

  // Een pagina die niets zegt én niets oplevert is een kapotte parser, geen
  // einde van de lijst — die moet hard opvallen.
  const stuk = await run({ 1: '<html><body><p>iets heel anders</p></body></html>' });
  assert.match(stuk.result.warnings.join(' '), /sjabloon gewijzigd/);

  // Aankoop loopt door dezelfde lus, met zijn eigen URL's
  const kopers = await run({ 1: aankoopP1 }, 'Aankoop');
  assert.equal(kopers.result.reviews.length, 5);
  assert.match(kopers.fetched[0], /\/aankoop\/p1\/$/);
}

checkPagination()
  .then(() =>
    console.log(
      `✓ funda-parser ok — ${verkoop.length} verkoop- + ${aankoop.length} aankoopreviews uit echte pagina's`,
    ),
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
