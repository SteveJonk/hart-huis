/**
 * Controleert de omzetting van de schrijfvorm naar Portable Text.
 *
 * De privacyverklaring wordt één keer geseed en daarna in de studio beheerd —
 * gaat de omzetting stil de mist in, dan staat er een verkeerde tekst in het
 * CMS die niemand meer aan deze code koppelt. Vier dingen zijn dragend:
 *   1. koppen en alinea's houden hun stijl, lijsten worden losse blokken met
 *      `listItem` + `level` (zo bewaart Sanity een opsomming);
 *   2. [label](href) wordt een link-annotatie in `markDefs`, met exact één
 *      span die ernaar verwijst;
 *   3. **vet** wordt een `strong`-mark, ook binnen een link;
 *   4. elke `_key` in het resultaat is uniek — dubbele keys laat Sanity niet
 *      publiceren, en identieke regels komen in een lange tekst echt voor.
 */
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {PRIVACY_BODY} from '../src/lib/privacy-content'
import {
  toPortableText,
  type PortableTextParagraph,
  type RichNode,
} from '../src/lib/rich-text'

const key = (seed: string) => createHash('sha1').update(seed).digest('hex').slice(0, 12)

/** De meeste controles hieronder gaan over alinea's; tabellen filteren we eruit. */
const alineas = (nodes: RichNode[], keyFn = key) =>
  toPortableText(nodes, keyFn).filter(
    (block): block is PortableTextParagraph => block._type === 'block',
  )

// 1. Stijlen en lijsten.
const basis = alineas(
  [
    {style: 'h2', text: 'Kop'},
    {style: 'normal', text: 'Alinea'},
    {list: 'bullet', items: ['Een', 'Twee']},
  ],
)

assert.equal(basis.length, 4)
assert.equal(basis[0].style, 'h2')
assert.equal(basis[0].children[0].text, 'Kop')
assert.equal(basis[1].style, 'normal')
assert.deepEqual(
  basis.slice(2).map((block) => [block.style, block.listItem, block.level]),
  [
    ['normal', 'bullet', 1],
    ['normal', 'bullet', 1],
  ],
)

// 2. Links.
const [metLink] = alineas([
  {style: 'normal', text: 'Mail ons op [info@example.nl](mailto:info@example.nl) of bel.'},
])

assert.equal(metLink.markDefs.length, 1)
assert.equal(metLink.markDefs[0].href, 'mailto:info@example.nl')
assert.equal(metLink.markDefs[0].linkType, 'external')
assert.deepEqual(
  metLink.children.map((span) => span.text),
  ['Mail ons op ', 'info@example.nl', ' of bel.'],
)
assert.deepEqual(
  metLink.children.map((span) => span.marks),
  [[], [metLink.markDefs[0]._key], []],
)

// 3. Vet, ook binnen een link.
const [metVet] = alineas([
  {style: 'normal', text: 'Dit is **belangrijk** en [**dit ook**](/contact).'},
])

assert.deepEqual(
  metVet.children.map((span) => [span.text, span.marks.includes('strong')]),
  [
    ['Dit is ', false],
    ['belangrijk', true],
    [' en ', false],
    ['dit ook', true],
    ['.', false],
  ],
)
assert.equal(metVet.markDefs[0].href, '/contact')
assert.ok(metVet.children[3].marks.includes(metVet.markDefs[0]._key))

// 4. Unieke sleutels over een echte, lange tekst.
const privacy = toPortableText(PRIVACY_BODY, (seed) => key(`privacy:${seed}`))
const keys = privacy.flatMap((block) =>
  block._type === 'table'
    ? [block._key, ...block.rows.map((row) => row._key)]
    : [
        block._key,
        ...block.children.map((span) => span._key),
        ...block.markDefs.map((mark) => mark._key),
      ],
)

assert.equal(new Set(keys).size, keys.length, 'dubbele _key in de omgezette tekst')
assert.ok(privacy.length > 30, 'de privacytekst lijkt leeg te zijn gelopen')

// 5. Een tabel wordt één blok met een rij per regel; de eerste rij is de kop.
const tabel = toPortableText([{table: [['Kop A', 'Kop B'], ['a', 'b']]}], key)[0]
assert.equal(tabel._type, 'table')
assert.ok(tabel._type === 'table')
assert.deepEqual(
  tabel.rows.map((row) => row.cells),
  [
    ['Kop A', 'Kop B'],
    ['a', 'b'],
  ],
)
assert.ok(
  privacy.some((block) => block._type === 'table'),
  'de privacytekst hoort tabellen te bevatten',
)

// Herhaalde regels mogen geen botsende sleutels geven.
const herhaald = alineas([
  {style: 'normal', text: 'Zelfde regel.'},
  {style: 'normal', text: 'Zelfde regel.'},
])
assert.notEqual(herhaald[0]._key, herhaald[1]._key)

// Een lege body blijft leeg — het component rendert dan niets.
assert.deepEqual(toPortableText([] as RichNode[], key), [])

console.log('check:richtext — alle controles geslaagd')
