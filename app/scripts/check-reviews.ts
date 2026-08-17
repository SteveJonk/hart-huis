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
