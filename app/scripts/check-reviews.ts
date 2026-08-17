/**
 * Smallest thing that fails if de afgeleide review-cijfers breken.
 * Run with: npm run check:reviews
 */
import assert from 'node:assert/strict';
import {
  formatGrade,
  formatReviewDate,
  gradeDistribution,
  reviewCountLabel,
  reviewCountNoun,
  reviewScore,
  subjectGrades,
  truncateQuote,
} from '../src/lib/reviews';

assert.equal(formatGrade(9.55), '9,6');
assert.equal(formatGrade(9), '9,0');
assert.equal(formatGrade(10), '10,0');

// math::avg geeft null zolang geen enkele review een cijfer heeft
assert.equal(formatGrade(null), undefined);
assert.equal(formatGrade(undefined), undefined);

// afgeleid wint van de redactiewaarde
assert.equal(reviewScore({ gemiddeldCijfer: 9.4 }, '9,6'), '9,4');
// ...maar zonder cijfers valt hij terug in plaats van "null" te tonen
assert.equal(reviewScore({ gemiddeldCijfer: null }, '9,6'), '9,6');
assert.equal(reviewScore({}, undefined), undefined);

assert.equal(reviewCountLabel({ totaalReviews: 84 }, 'x'), '84 keer beoordeeld');
// 0 reviews is geen zinnig label
assert.equal(reviewCountLabel({ totaalReviews: 0 }, '84 keer beoordeeld'), '84 keer beoordeeld');

assert.equal(reviewCountNoun({ totaalReviews: 56 }), '56 beoordelingen');
assert.equal(reviewCountNoun({ totaalReviews: 1 }), '1 beoordeling');
assert.equal(reviewCountNoun({ totaalReviews: 0 }), undefined);

// alleen ingevulde deelcijfers komen in de tabel, in vaste volgorde
assert.deepEqual(
  subjectGrades({
    quote: 'q',
    name: 'n',
    expertise: 9.5,
    priceQuality: 8,
    localMarketKnowledge: null,
  }),
  [
    { label: 'Deskundigheid', value: '9,5' },
    { label: 'Prijs / kwaliteit', value: '8,0' },
  ],
);
assert.deepEqual(subjectGrades({ quote: 'q', name: 'n' }), []);

// een koper beoordeelt andere criteria dan een verkoper: de vier van het
// andere tabblad horen niet op de kaart, ook niet als er per ongeluk een
// cijfer in staat
const alleCijfers = {
  quote: 'q',
  name: 'n',
  accessibilityAndCommunication: 9,
  expertise: 9,
  localMarketKnowledge: 8,
  negotiationAndResult: 10,
  priceQuality: 8,
  serviceAndGuidance: 7,
};
assert.deepEqual(
  subjectGrades({ ...alleCijfers, type: 'Aankoop' }).map((row) => row.label),
  ['Bereikbaarheid en communicatie', 'Deskundigheid', 'Onderhandeling en resultaat', 'Prijs / kwaliteit'],
);
assert.deepEqual(
  subjectGrades({ ...alleCijfers, type: 'Verkoop' }).map((row) => row.label),
  ['Deskundigheid', 'Lokale marktkennis', 'Prijs / kwaliteit', 'Service en begeleiding'],
);
// zonder soort (met de hand ingevoerd) blijft alles staan wat ingevuld is
assert.equal(subjectGrades(alleCijfers).length, 6);

// een korte beoordeling blijft heel en krijgt geen "Lees meer"
assert.deepEqual(truncateQuote('Kort en krachtig.'), {
  text: 'Kort en krachtig.',
  truncated: false,
});
// precies op de grens telt nog als kort
assert.equal(truncateQuote('a'.repeat(250)).truncated, false);
assert.equal(truncateQuote('a'.repeat(251)).truncated, true);

// een lange beoordeling wordt op een spatie geknipt, niet midden in een woord
const lang = truncateQuote(`${'woord '.repeat(60)}slot`);
assert.equal(lang.truncated, true);
assert.ok(lang.text.length <= 251, `te lang: ${lang.text.length}`);
assert.match(lang.text, /woord…$/);
// geen leesteken vlak vóór de puntjes
assert.match(truncateQuote(`${'ja, '.repeat(80)}einde`).text, /ja…$/);
// één lang woord zonder spaties valt terug op hard afkappen
assert.equal(truncateQuote('a'.repeat(400)).text, `${'a'.repeat(250)}…`);

// de grootste bak is altijd 100%, de rest schaalt mee
const verdeling = gradeDistribution({ cijfer10: 38, cijfer9: 12, cijfer8: 5, cijfer7: 1 });
assert.deepEqual(
  verdeling.map((row) => [row.label, row.count, row.width]),
  [
    ['10', 38, '100%'],
    ['9', 12, '32%'],
    ['8', 5, '13%'],
    ['7', 1, '3%'],
    ['≤6', 0, '0%'],
  ],
);
// zonder cijfers geen deling door nul
assert.deepEqual(
  gradeDistribution({}).map((row) => row.width),
  ['0%', '0%', '0%', '0%', '0%'],
);

assert.equal(formatReviewDate('2026-07-12'), '12 juli 2026');
assert.equal(formatReviewDate(null), undefined);
assert.equal(formatReviewDate('geen datum'), undefined);

console.log('✓ review-aggregates ok');
