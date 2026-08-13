/**
 * Smallest thing that fails if de afgeleide review-cijfers breken.
 * Run with: npm run check:reviews
 */
import assert from 'node:assert/strict';
import { formatGrade, reviewCountLabel, reviewScore } from '../src/lib/reviews';

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

console.log('✓ review-aggregates ok');
