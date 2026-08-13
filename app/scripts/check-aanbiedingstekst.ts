/**
 * Smallest thing that fails if the Realworks text parser breaks.
 * Run with: npm run check:tekst
 */
import assert from 'node:assert/strict';
import { parseAanbiedingstekst, splitBold } from '../src/lib/aanbiedingstekst';

const feed =
  '**English below**<br><br>Licht en ruim wonen!<br><br>Een tweede alinea met **nadruk** erin.<br><br>Goed om te weten:<br>- energielabel C<br>- keuken uit 2022<br><br>**English**<br><br>Bright and spacious!<br>- energy label C';

const blocks = parseAanbiedingstekst(feed);

assert.deepEqual(blocks, [
  { type: 'paragraph', text: 'Licht en ruim wonen!' },
  { type: 'paragraph', text: 'Een tweede alinea met **nadruk** erin.' },
  { type: 'paragraph', text: 'Goed om te weten:' },
  { type: 'list', items: ['energielabel C', 'keuken uit 2022'] },
]);

assert.deepEqual(parseAanbiedingstekst(null), []);
assert.deepEqual(parseAanbiedingstekst('Eén regel'), [
  { type: 'paragraph', text: 'Eén regel' },
]);

assert.deepEqual(splitBold('Een alinea met **nadruk** erin.'), [
  { text: 'Een alinea met ', bold: false },
  { text: 'nadruk', bold: true },
  { text: ' erin.', bold: false },
]);
assert.deepEqual(splitBold('**Alles vet**'), [{ text: 'Alles vet', bold: true }]);

console.log('aanbiedingstekst: ok');
