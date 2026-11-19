/**
 * Seeds de `klantverhaal`-documenten (/klantverhaal/<slug>). Los daarvan zet
 * `seed:klantverhalen-home` het homepage-blok om naar de slider — pas draaien
 * nadat de nieuwe code live staat, anders toont de oude site placeholder-copy.
 *
 * Rachied & Roxy: tekst uit "Text Roxy en Rachied.docx". Sanne & Mick: tekst
 * uit "Tekst Sanne en Mick.docx".
 */
import {toPortableText, type RichNode} from '../../src/lib/rich-text'
import {client, key, uploadImage} from './shared'

type BodyNode = RichNode | {pullQuote: string} | {resultaat: {value: string; label: string}[]}

type Verhaal = {
  slug: string
  /** Eerdere slugs: dan wordt dat bestaande document bijgewerkt in plaats van een nieuw aangemaakt. */
  formerSlugs?: string[]
  title: string
  titleHighlight?: string
  shortTitle: string
  intro: string
  image: {src: string; alt: string; caption?: string}
  body: BodyNode[]
  dienst: 'Aankoop' | 'Verkoop' | 'Taxatie'
  wie: string
  plaats: string
  buurt?: string
  feiten?: {label: string; value: string}[]
  grade?: number
  quote?: string
  makelaarQuote?: string
  date: string
  seo: {title: string; description: string}
}

const p = (text: string): RichNode => ({style: 'normal', text})
const h = (text: string): RichNode => ({style: 'h2', text})

const VERHALEN: Verhaal[] = [
  {
    slug: 'rachied-en-roxy-velserbroek',
    title: 'Een nieuw thuis voor een groeiend gezin in Velserbroek',
    titleHighlight: 'groeiend gezin',
    shortTitle: 'Een thuis voor een groeiend gezin',
    intro:
      'Een nieuw huis zoeken is altijd spannend. Maar als je tijdens die zoektocht ontdekt dat je gezin wordt uitgebreid, wordt het pas écht bijzonder! Dit is het verhaal van Rachied en Roxy, die ik mocht begeleiden bij de aankoop van hun nieuwe gezinshuis in Velserbroek.',
    image: {
      src: '/images/klantverhalen/rachied-roxy-velserbroek.jpg',
      alt: 'Rachied en Roxy in hun nieuwe woning in Velserbroek, midden in de verbouwing',
    },
    body: [
      h('Een persoonlijke aanbeveling en meteen een klik'),
      p('Rachied en Roxy kwamen bij Hart & Huis Makelaardij terecht via een collega van Rachied, die ik eerder had geholpen bij de aankoop van een woning.'),
      p('Tijdens onze eerste kennismaking op kantoor in Haarlem voelde het meteen goed. Er was een leuke klik en we hadden alle drie zin om samen op zoek te gaan naar een fijn nieuw huis.'),
      p('Rachied had al eerder een woning gekocht, maar bij de eindinspectie van zijn vorige huis was niet alles even soepel verlopen. Dat wilde hij deze keer graag anders aanpakken. Hij vond het belangrijk dat er goed werd meegekeken en dat alles, tot en met de sleuteloverdracht, netjes geregeld zou worden.'),
      p('Voor Roxy was het kopen van een huis juist helemaal nieuw. Zij begon de zoektocht met een open blik, vertrouwde op haar gevoel en op de ervaring van Rachied.'),
      p('Twee verschillende ervaringen, maar één gezamenlijke wens: een fijn huis vinden waar ze samen hun toekomst konden opbouwen.'),
      h('Op zoek naar een huis in Velserbroek voor een groeiend gezin'),
      p('Rachied heeft al een tienerzoon, dus voldoende ruimte voor iedereen was een belangrijk onderdeel van de zoektocht.'),
      p('En toen kwam er tijdens de huizenjacht nog een geweldige verrassing: Rachied en Roxy verwachtten samen een kindje! ❤️'),
      p('Hun toekomstplannen kregen daarmee een extra mooie betekenis. Ze zochten niet zomaar een huis, maar een fijne gezinswoning met voldoende slaapkamers en ruimte om samen te groeien.'),
      p('Gelukkig vonden we op tijd een heerlijke woning in Velserbroek. Een huis met lekker veel ruimte en volop mogelijkheden om het helemaal naar hun eigen smaak te maken.'),
      h('Van een huis naar hun eigen thuis'),
      p('Na de aankoop gingen Rachied en Roxy enthousiast aan de slag om van hun nieuwe huis echt hun eigen plekje te maken.'),
      p('De badkamer werd vernieuwd, het toilet kreeg een opknapbeurt en de muren werden strak gestuct. Ook de keuken kreeg een leuke nieuwe uitstraling, met warme roze tegeltjes welke ook in de badkamer en het toilet zijn gebruikt.'),
      p('Met deze persoonlijke aanpassingen veranderde de woning in Velserbroek stap voor stap in een heerlijk thuis voor hun gezin.'),
      h('Waarom persoonlijke aankoopbegeleiding het verschil maakt'),
      p('Wat ik zo leuk vind aan dit verhaal, is dat Rachied en Roxy allebei met een heel andere ervaring aan de zoektocht begonnen.'),
      p('Rachied wist uit ervaring hoe belangrijk het is dat alles goed geregeld wordt, ook tijdens de eindinspectie en sleuteloverdracht. Voor Roxy was het haar eerste koopwoning en was het hele aankoopproces nog nieuw.'),
      p('Als aankoopmakelaar in Haarlem, Velserbroek en omgeving vind ik het belangrijk dat zowel ervaren kopers als starters zich prettig en zeker voelen tijdens het kopen van een woning.'),
      p('Bij Hart & Huis Makelaardij gaat aankoopbegeleiding verder dan alleen het vinden van een geschikt huis. Het draait om luisteren naar woonwensen, eerlijk adviseren, goed onderhandelen en ervoor zorgen dat alles van de eerste bezichtiging tot aan de sleuteloverdracht zorgvuldig wordt begeleid.'),
    ],
    dienst: 'Aankoop',
    wie: 'Rachied & Roxy',
    plaats: 'Velserbroek',
    // De slotzin van Dorien uit de tekst, als afsluitende makelaar-quote.
    makelaarQuote:
      'Dat ik Rachied en Roxy mocht helpen bij het vinden van een thuis voor hun groeiende gezin, maakt mijn werk extra leuk.',
    date: '2026-11-19',
    seo: {
      title: 'Klantverhaal: Rachied & Roxy in Velserbroek',
      description:
        'Hoe Rachied en Roxy, met een kindje op komst, met aankoopbegeleiding van Hart & Huis een gezinswoning in Velserbroek vonden.',
    },
  },
  {
    slug: 'sanne-en-mick-santpoort',
    // Stond eerst als voorbeeldverhaal "Sanne & Joost" in Sanity; zo wordt dat document bijgewerkt.
    formerSlugs: ['sanne-en-joost-haarlem'],
    title: 'Van twee woningen naar één fijn gezinshuis in Santpoort',
    titleHighlight: 'één fijn gezinshuis',
    shortTitle: 'Van twee appartementen naar één gezinshuis',
    intro:
      'Achter iedere woning schuilt een verhaal. En soms loopt dat verhaal heel anders dan je vooraf had bedacht. Zo ook bij Sanne en Mick, die ik mocht begeleiden bij de verkoop van twee appartementen én de aankoop van hun nieuwe thuis in Santpoort.',
    image: {
      src: '/images/klantverhalen/sanne-mick-santpoort.jpg',
      alt: 'Sanne en Mick met hun zoontje in de tuin van hun huis in Santpoort',
    },
    body: [
      h('Een toevallige ontmoeting in Haarlem'),
      p('Jaren geleden ontmoette ik Sanne en haar vader tijdens een bezichtiging van een woning die ik in de verkoop had. Uiteindelijk besloot Sanne een nieuwbouwappartement in Haarlem te kopen. Een mooie stap naar een eigen plek!'),
      p('Maar het leven had andere plannen.'),
      p('Terwijl Sanne wachtte op de oplevering van haar nieuwbouwwoning, ontmoette ze Mick. Hij woonde in een leuk appartement in Santpoort en het duurde niet lang voordat Sanne bij hem introk.'),
      p('Samen ontstond de wens om een huis te kopen waar ze hun toekomst konden opbouwen. Een plek die écht van hen samen zou zijn.'),
      h('Twee appartementen verkopen, één nieuw thuis vinden'),
      p('Voordat de zoektocht naar hun droomhuis kon beginnen, moesten er eerst twee woningen verkocht worden.'),
      p('Sanne en Mick schakelden mij in om hen hierbij te helpen.'),
      p('We begonnen met de verkoop van het appartement van Mick in Santpoort. Nadat deze woning succesvol was verkocht, volgde het inmiddels opgeleverde nieuwbouwappartement van Sanne in Haarlem.'),
      p('Ook hiervoor vonden we een enthousiaste koper!'),
      p('Met beide woningen verkocht, was het tijd voor de volgende stap: samen op zoek naar hun nieuwe thuis.'),
      h('Een nieuw hoofdstuk in Santpoort'),
      p('De zoektocht bracht ons uiteindelijk weer naar Santpoort. Daar vonden we een heerlijk huis dat helemaal bij hun wensen paste.'),
      p('Inmiddels wonen Sanne en Mick hier samen met hun zoontje en genieten ze volop van hun gezinsleven.'),
      p('Wat begon met twee eigen appartementen, groeide uit tot één fijn gezinshuis waar ze samen nieuwe herinneringen maken.'),
      h('Meer dan alleen een huis kopen of verkopen'),
      p("Wat ik zo bijzonder vind aan dit verhaal? Dat een toevallige ontmoeting tijdens een bezichtiging in Haarlem jaren later uitgroeide tot zo'n mooi traject. Van twee succesvolle verkopen tot de aankoop van een nieuw thuis."),
      p('Als makelaar in Haarlem en omgeving, waaronder Santpoort, vind ik het ontzettend leuk om mensen bij zulke belangrijke stappen in hun leven te mogen begeleiden.'),
      p('Bij Hart & Huis Makelaardij draait het niet alleen om het kopen of verkopen van een woning. Het gaat vooral om de mensen achter de voordeur. Om hun wensen, plannen en toekomst. Met persoonlijk contact, eerlijk advies en korte lijnen help ik mijn klanten graag verder.'),
    ],
    // Twee verkopen en een aankoop; het verhaal begint bij de verkoop.
    dienst: 'Verkoop',
    wie: 'Sanne & Mick',
    plaats: 'Santpoort',
    feiten: [{label: 'Traject', value: '2× verkoop + aankoop'}],
    // De slotzin van Dorien uit de tekst, als afsluitende makelaar-quote.
    makelaarQuote:
      'Dat Sanne en Mick mij het vertrouwen gaven om hen tijdens dit hele traject te begeleiden, maakt mijn werk extra leuk.',
    date: '2026-06-01',
    seo: {
      title: 'Klantverhaal: Sanne & Mick in Santpoort',
      description:
        'Hoe Sanne en Mick met Hart & Huis twee appartementen verkochten en samen een gezinshuis in Santpoort kochten.',
    },
  },
]

function toBody(verhaal: Verhaal) {
  const k = (seed: string) => key(`klantverhaal:${verhaal.slug}:${seed}`)
  return verhaal.body.flatMap<object>((node, index) => {
    if ('pullQuote' in node) return [{_type: 'pullQuote', _key: k(`quote-${index}`), text: node.pullQuote}]
    if ('resultaat' in node) {
      return [
        {
          _type: 'resultaat',
          _key: k(`resultaat-${index}`),
          items: node.resultaat.map((item) => ({...item, _key: k(`resultaat-${item.value}`)})),
        },
      ]
    }
    return toPortableText([node], (seed) => k(`${index}:${seed}`))
  })
}

async function upsertKlantverhaal(verhaal: Verhaal) {
  const {src, alt, caption} = verhaal.image
  const image = await uploadImage(src, alt)
  const doc = {
    _type: 'klantverhaal' as const,
    title: verhaal.title,
    titleHighlight: verhaal.titleHighlight,
    shortTitle: verhaal.shortTitle,
    slug: {_type: 'slug' as const, current: verhaal.slug},
    intro: verhaal.intro,
    mainImage: {...image, ...(caption ? {caption} : {})},
    body: toBody(verhaal),
    dienst: verhaal.dienst,
    wie: verhaal.wie,
    plaats: verhaal.plaats,
    buurt: verhaal.buurt,
    feiten: verhaal.feiten?.map((feit) => ({...feit, _key: key(`${verhaal.slug}:${feit.label}`)})),
    grade: verhaal.grade,
    quote: verhaal.quote,
    makelaarQuote: verhaal.makelaarQuote,
    date: verhaal.date,
    seo: {_type: 'seo' as const, ...verhaal.seo},
  }

  const existingId = await client.fetch<string | null>(
    `*[_type == "klantverhaal" && slug.current in $slugs][0]._id`,
    {slugs: [verhaal.slug, ...(verhaal.formerSlugs ?? [])]},
  )
  if (existingId) {
    // set() slaat undefined over: optionele velden die nu leeg zijn expliciet weghalen.
    const empty = Object.entries(doc)
      .filter(([, value]) => value === undefined)
      .map(([field]) => field)
    await client.patch(existingId).set(doc).unset(empty).commit()
    console.log(`✓ klantverhaal /klantverhaal/${verhaal.slug} updated (${existingId})`)
    return
  }
  const created = await client.create(doc)
  console.log(`✓ klantverhaal /klantverhaal/${verhaal.slug} created (${created._id})`)
}

/**
 * Het oude `story`-blok op de homepage had zijn eigen foto's en tekst; het
 * nieuwe haalt alles uit de klantverhalen. Dus: oude velden weg, anker erop.
 * Raakt alleen het story-blok, verder niets op de homepage.
 */
export async function seedKlantverhalenHome() {
  const ids = await client.fetch<string[]>(
    `*[_type == "page" && slug.current == "home" && count(content[_type == "story"]) > 0]._id`,
    {},
    {perspective: 'raw'},
  )
  for (const id of ids) {
    const keys = await client.fetch<string[]>(`*[_id == $id][0].content[_type == "story"]._key`, {id}, {perspective: 'raw'})
    for (const blockKey of keys) {
      const path = `content[_key=="${blockKey}"]`
      await client
        .patch(id)
        .unset(['image', 'secondaryImage', 'title', 'quote', 'attribution', 'cta'].map((field) => `${path}.${field}`))
        .set({[`${path}.ctaLabel`]: 'Lees hun verhaal', [`${path}.anchorId`]: 'klantverhalen'})
        .commit()
    }
    console.log(`✓ home story block → klantverhalen-slider (${id}, ${keys.length} blok)`)
  }
}

/** Alleen de verhalen: nieuwe documenten, raakt geen bestaande pagina. */
export async function seedKlantverhalen() {
  console.log('Klantverhalen')
  for (const verhaal of VERHALEN) await upsertKlantverhaal(verhaal)
}
