/**
 * Smallest thing that fails if de structured data stilletjes verandert.
 *
 * JSON-LD is onzichtbaar: een verkeerde vorm merk je pas als Google het al
 * weken negeert. Vijf dingen zijn hier dragend:
 *   1. `prune` gooit lege velden weg maar houdt de `@id`-verwijzingen heel —
 *      zonder die verwijzingen valt de graaf uit elkaar;
 *   2. de organisatie krijgt haar gegevens uit het footer-document en valt
 *      terug op `site.ts`, en de rating verschijnt alleen met echte cijfers;
 *   3. een pagina met vragen is óók een FAQPage, met precies die vragen;
 *   4. een objectpagina levert advertentie, kruimelpad en woning op, met een
 *      `Offer` waarvan prijs en beschikbaarheid uit het document komen;
 *   5. `REVIEW_STATS_QUERY` geeft de vorm terug die `aggregateRating` leest.
 */
import assert from 'node:assert/strict'
import {evaluate, parse} from 'groq-js'
import {
  absoluteUrl,
  aggregateRating,
  availability,
  breadcrumbJsonLd,
  jsonLdGraph,
  objectPageJsonLd,
  organizationJsonLd,
  pageFaqs,
  pageJsonLd,
  plainDescription,
  postalAddress,
  prune,
  residenceType,
  siteJsonLd,
  type JsonLdNode,
} from '../src/lib/json-ld'
import {SITE} from '../src/lib/site'
import {REVIEW_STATS_QUERY} from '../src/sanity/queries'

/** De knoop met dit `@type` uit een graaf — `@type` mag ook een lijst zijn. */
function node(graph: JsonLdNode | null, type: string): JsonLdNode {
  const nodes = (graph?.['@graph'] ?? []) as JsonLdNode[]
  const found = nodes.find((item) => {
    const types = item['@type']
    return Array.isArray(types) ? types.includes(type) : types === type
  })
  assert.ok(found, `geen ${type} in de graaf`)
  return found
}

// 1. prune: leeg weg, verwijzingen blijven.
assert.deepEqual(
  prune({'@type': 'Thing', name: 'x', leeg: null, blanco: '  ', lijst: [], nest: {a: null}}),
  {'@type': 'Thing', name: 'x'},
)
assert.equal(prune({'@type': 'ImageObject', url: null}), undefined, 'alleen een @type is geen knoop')
assert.deepEqual(prune({'@id': 'https://x/#organisatie'}), {'@id': 'https://x/#organisatie'})
assert.deepEqual(prune(['a', null, '', 'b']), ['a', 'b'])
assert.equal(prune([null, undefined]), undefined)
assert.equal(prune(0), 0, 'een nul is een waarde, geen leegte')
assert.equal(prune(false), false)
assert.equal(jsonLdGraph([null, undefined]), null, 'een lege graaf wordt niets')

assert.equal(absoluteUrl('/'), SITE.baseUrl)
assert.equal(absoluteUrl(''), SITE.baseUrl)
assert.equal(absoluteUrl('verkoop'), `${SITE.baseUrl}/verkoop`)
assert.equal(absoluteUrl('/verkoop'), `${SITE.baseUrl}/verkoop`)
assert.equal(absoluteUrl('https://elders.nl/x'), 'https://elders.nl/x')

// 2. Organisatie: adres uit het CMS, terugval op site.ts, rating alleen bij cijfers.
assert.deepEqual(postalAddress(['Vergierdeweg 288', '2026 ZK Haarlem']), {
  '@type': 'PostalAddress',
  streetAddress: 'Vergierdeweg 288',
  postalCode: '2026 ZK',
  addressLocality: 'Haarlem',
  addressCountry: 'NL',
})
// Zonder herkenbare postcoderegel blijft alles straat — beter dan raden.
assert.deepEqual(postalAddress(['Ergens 1']), {
  '@type': 'PostalAddress',
  streetAddress: 'Ergens 1',
  addressCountry: 'NL',
})
assert.equal(postalAddress([]), undefined)
assert.equal(postalAddress(null), undefined)

assert.equal(aggregateRating(null), undefined)
assert.equal(aggregateRating({totaalReviews: 12, gemiddeldCijfer: null}), undefined, 'geen cijfers, geen rating')
assert.equal(aggregateRating({totaalReviews: 0, gemiddeldCijfer: 9}), undefined, 'geen reviews, geen rating')
assert.deepEqual(aggregateRating({totaalReviews: 84, gemiddeldCijfer: 9.6666}), {
  '@type': 'AggregateRating',
  ratingValue: 9.7,
  reviewCount: 84,
  bestRating: 10,
  worstRating: 1,
})

const organisatie = organizationJsonLd({
  address: ['Vergierdeweg 288', '2026 ZK Haarlem'],
  phone: '023 - 000 00 00',
  email: 'post@example.nl',
  logoUrl: 'https://cdn.sanity.io/logo.png',
  sameAs: ['https://www.instagram.com/hartenhuis', null],
  stats: {totaalReviews: 84, gemiddeldCijfer: 9.7},
})
assert.equal(organisatie['@type'], 'RealEstateAgent')
assert.equal(organisatie['@id'], `${SITE.baseUrl}/#organisatie`)
assert.equal(organisatie.telephone, '023 - 000 00 00')
assert.deepEqual(prune(organisatie)?.sameAs, ['https://www.instagram.com/hartenhuis'])

// Een leeg footer-document mag de gegevens uit site.ts niet wegdrukken.
const kaal = prune(organizationJsonLd({}))!
assert.equal(kaal.telephone, SITE.phone)
assert.equal(kaal.email, SITE.email)
assert.equal((kaal.address as JsonLdNode).addressLocality, 'Haarlem')
assert.equal(kaal.aggregateRating, undefined)
assert.equal(kaal.logo, undefined, 'geen logo-knoop zonder URL')

const site = siteJsonLd({})
assert.equal((node(site, 'WebSite').publisher as JsonLdNode)['@id'], organisatie['@id'])

// 3. Pagina's: kruimelpad begint bij Home, vragen maken er een FAQPage van.
const kruimels = breadcrumbJsonLd('/verkoop', [{name: 'Verkoop', path: '/verkoop'}])!
assert.deepEqual(kruimels.itemListElement, [
  {'@type': 'ListItem', position: 1, name: 'Home', item: SITE.baseUrl},
  {'@type': 'ListItem', position: 2, name: 'Verkoop', item: `${SITE.baseUrl}/verkoop`},
])
assert.equal(breadcrumbJsonLd('/', []), undefined, 'home heeft geen kruimelpad')

assert.deepEqual(
  pageFaqs([
    {_type: 'hero', title: 'x'},
    {_type: 'faqs', faqs: [{title: 'Wat kost het?', answer: 'Niets.'}, null]},
    {_type: 'faqs', faqs: null},
  ]),
  [{question: 'Wat kost het?', answer: 'Niets.'}],
)

const verkoop = pageJsonLd({
  path: '/verkoop',
  title: 'Je huis verkopen',
  description: 'Zo werkt het.',
  faqs: [{question: 'Wat kost het?', answer: 'Niets.'}, {question: 'Leeg?', answer: null}],
  trail: [{name: 'Verkoop', path: '/verkoop'}],
})
const pagina = node(verkoop, 'WebPage')
assert.deepEqual(pagina['@type'], ['WebPage', 'FAQPage'], 'vragen maken er ook een FAQPage van')
assert.equal(pagina['@id'], `${SITE.baseUrl}/verkoop#pagina`)
assert.deepEqual(pagina.mainEntity, [
  {
    '@type': 'Question',
    name: 'Wat kost het?',
    acceptedAnswer: {'@type': 'Answer', text: 'Niets.'},
  },
])
assert.deepEqual(pagina.breadcrumb, {'@id': `${SITE.baseUrl}/verkoop#kruimelpad`})
assert.ok(node(verkoop, 'BreadcrumbList'))

// Zonder vragen blijft het een gewone WebPage, zonder mainEntity.
const zonderVragen = node(pageJsonLd({path: '/contact', title: 'Contact'}), 'WebPage')
assert.equal(zonderVragen['@type'], 'WebPage')
assert.equal(zonderVragen.mainEntity, undefined)
assert.equal(zonderVragen.breadcrumb, undefined)

// 4. Objectpagina.
assert.equal(residenceType('Eengezinswoning'), 'SingleFamilyResidence')
assert.equal(residenceType('Bovenwoning appartement'), 'Apartment')
assert.equal(residenceType(null), 'Residence', 'onbekende soort blijft een Residence')

assert.equal(availability('verkocht'), 'https://schema.org/SoldOut')
assert.equal(availability('voorbehoud'), 'https://schema.org/LimitedAvailability')
assert.equal(availability(null), 'https://schema.org/InStock', 'onbekend telt als beschikbaar')

// De Engelse helft en de opmaakmarkeringen horen niet in een beschrijving.
assert.equal(
  plainDescription('**Mooi huis**<br>- ruime tuin<br>- garage<br>**English**<br>Nice house'),
  'Mooi huis ruime tuin, garage',
)
assert.equal(plainDescription(null), undefined)
assert.ok((plainDescription('a '.repeat(400))?.length ?? 0) <= 401, 'lange tekst wordt afgekapt')
assert.ok(plainDescription('woord '.repeat(200))!.endsWith('…'))

const woning = {
  adres: "Kees 't Hoenstraat 7",
  slug: 'kees-t-hoenstraat-7-haarlem',
  postcode: '2026 ZK',
  plaats: 'Haarlem',
  status: 'voorbehoud',
  prijs: 675000,
  prijsConditie: 'k.k.',
  aangebodenSinds: '2026-08-01',
  soortWoning: 'Eengezinswoning',
  bouwjaar: 1932,
  woonoppervlak: 128,
  perceel: 210,
  inhoud: 460,
  kamers: 5,
  slaapkamers: 3,
  energielabel: 'C',
  aanbiedingsTekst: 'Een licht huis aan een rustige straat.',
  imageUrls: ['https://cdn.sanity.io/1.jpg', 'https://cdn.sanity.io/2.jpg'],
}
const objectUrl = `${SITE.baseUrl}/aanbod/${woning.slug}`
const objectGraaf = objectPageJsonLd(woning)

const advertentie = node(objectGraaf, 'RealEstateListing')
assert.equal(advertentie['@id'], `${objectUrl}#pagina`)
assert.equal(advertentie.datePosted, '2026-08-01')
assert.deepEqual(advertentie.mainEntity, {'@id': `${objectUrl}#woning`})

assert.deepEqual(
  (node(objectGraaf, 'BreadcrumbList').itemListElement as JsonLdNode[]).map((item) => item.name),
  ['Home', 'Aanbod', "Kees 't Hoenstraat 7, Haarlem"],
)

const huis = node(objectGraaf, 'SingleFamilyResidence')
assert.deepEqual(huis['@type'], ['SingleFamilyResidence', 'Product'])
assert.equal(huis.numberOfRooms, 5)
assert.equal(huis.numberOfBedrooms, 3)
assert.equal(huis.yearBuilt, 1932)
assert.deepEqual(huis.floorSize, {'@type': 'QuantitativeValue', value: 128, unitCode: 'MTK'})
assert.deepEqual(huis.address, {
  '@type': 'PostalAddress',
  streetAddress: "Kees 't Hoenstraat 7",
  postalCode: '2026 ZK',
  addressLocality: 'Haarlem',
  addressCountry: 'NL',
})
assert.deepEqual(huis.image, woning.imageUrls)
assert.deepEqual(
  (huis.additionalProperty as JsonLdNode[]).map((item) => [item.name, item.value]),
  [
    ['Perceeloppervlakte', 210],
    ['Inhoud', 460],
    ['Energielabel', 'C'],
    ['Soort woning', 'Eengezinswoning'],
  ],
)
assert.deepEqual(huis.offers, {
  '@type': 'Offer',
  '@id': `${objectUrl}#aanbod`,
  url: objectUrl,
  price: 675000,
  priceCurrency: 'EUR',
  availability: 'https://schema.org/LimitedAvailability',
  validFrom: '2026-08-01',
  description: 'k.k.',
  seller: {'@id': `${SITE.baseUrl}/#organisatie`},
})

// "Prijs op aanvraag" is geen aanbod: een 0 wegschrijven zou onwaar zijn.
const zonderPrijs = objectPageJsonLd({...woning, prijs: null})
assert.equal(node(zonderPrijs, 'SingleFamilyResidence').offers, undefined)

// Een document met alleen de verplichte velden mag geen null-velden opleveren.
const kaalObject = objectPageJsonLd({adres: 'Straat 1', plaats: 'Haarlem', slug: 'straat-1'})
const kaalHuis = node(kaalObject, 'Residence')
for (const [key, value] of Object.entries(kaalHuis)) {
  assert.notEqual(value, null, `${key} is null in plaats van weggelaten`)
}
assert.equal(kaalHuis.description, undefined)
assert.equal(kaalHuis.image, undefined)

// 5. De query levert de vorm die aggregateRating leest.
async function checkStatsQuery() {
  const dataset = [
    {_id: 'a', _type: 'review', grade: 9.5, type: 'Verkoop'},
    {_id: 'b', _type: 'review', grade: 10, type: 'Aankoop'},
    {_id: 'c', _type: 'review', type: 'Verkoop'},
  ]
  const stats = (await (
    await evaluate(parse(REVIEW_STATS_QUERY), {dataset})
  ).get()) as Record<string, unknown>

  assert.deepEqual(aggregateRating(stats), {
    '@type': 'AggregateRating',
    ratingValue: 9.8,
    reviewCount: 3,
    bestRating: 10,
    worstRating: 1,
  })
}

// tsx compiles these scripts to CJS, so no top-level await here.
checkStatsQuery()
  .then(() => console.log('check:jsonld — alle controles geslaagd'))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
