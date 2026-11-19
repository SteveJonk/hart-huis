/**
 * Seeds de `klantverhaal`-documenten (/klantverhaal/<slug>). Los daarvan zet
 * `seed:klantverhalen-home` het homepage-blok om naar de slider — pas draaien
 * nadat de nieuwe code live staat, anders toont de oude site placeholder-copy.
 *
 * Rachied & Roxy: tekst uit "Text Roxy en Rachied.docx". Sanne & Joost: de
 * voorbeeldtekst uit het klantverhaal-ontwerp (`example-designs/klantverhaal.html`).
 */
import {toPortableText, type RichNode} from '../../src/lib/rich-text'
import {client, key, uploadImage} from './shared'

type BodyNode = RichNode | {pullQuote: string} | {resultaat: {value: string; label: string}[]}

type Verhaal = {
  slug: string
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
    slug: 'sanne-en-joost-haarlem',
    title: 'Van een flat in Amsterdam naar een huis met een tuin in Haarlem',
    titleHighlight: 'huis met een tuin',
    shortTitle: 'Van Amsterdam naar de Kleverparkbuurt',
    intro:
      'Sanne en Joost zochten al anderhalf jaar. Binnen zes weken na hun eerste gesprek met Dorien hadden ze de sleutel — in precies de straat waar ze stiekem altijd al wilden wonen.',
    image: {
      src: '/images/klantverhalen/sanne-joost-haarlem.jpg',
      alt: 'Sanne en Joost met hun zoontje in de tuin van hun woning in Haarlem',
    },
    body: [
      p('Toen Sanne en Joost zich meldden, waren ze er bijna klaar mee. "We hadden op alles geboden wat een beetje leek op wat we zochten," vertelt Joost. "En steeds net naast gegrepen. Op een gegeven moment denk je: misschien lukt het gewoon niet in Haarlem."'),
      p('Het stel woonde in een bovenwoning in Amsterdam-West, maar wilde na de geboorte van hun zoon meer ruimte en een tuin. Haarlem stond bovenaan het lijstje: dichtbij werk, maar met de sfeer van een stad op menselijke maat. Alleen bleek de markt er net zo meedogenloos als in Amsterdam.'),
      h('De eerste afspraak'),
      p('"Het eerste wat Dorien deed, was níét meteen huizen aandragen," zegt Sanne. "Ze vroeg vooral veel. Wat we écht belangrijk vonden, waar we ons geld aan wilden uitgeven en waaraan juist niet. Pas daarna ging ze zoeken."'),
      {pullQuote: 'We kregen een belletje: er komt iets aan dat nog niet op Funda staat. Willen jullie er vanavond al kijken?'},
      p('Dat telefoontje ging over een woning aan de rand van de Kleverparkbuurt. Via het NVM-netwerk had Dorien gehoord dat de eigenaren wilden verkopen, nog voordat de woning online zou komen. "We stonden er die avond als eersten," herinnert Joost zich. "Dat gaf zo\'n rust. Geen kijkdag met twintig andere stellen die allemaal hetzelfde dachten."'),
      h('Bieden met een plan'),
      p('De woning was precies wat ze zochten, dus de verleiding was groot om fors over de vraagprijs te gaan. "Dorien hield ons juist een beetje tegen," lacht Sanne. "Ze had vergelijkbare woningen uit de buurt erbij gepakt en liet zien wat die écht hadden opgebracht. Ons bod was scherp, maar onderbouwd — geen gok uit angst."'),
      p('Het werkte. Het bod werd geaccepteerd, de financiering kwam rond, en na de bouwkundige keuring bleek de woning zo gezond als hij eruitzag. "Ze ging mee naar de bezichtiging en wees ons op dingen waar wij nooit op hadden gelet. Het kozijn, de meterkast, vocht in de kelder. Precies de dingen die later geld kosten."'),
      {
        resultaat: [
          {value: '6 weken', label: 'van eerste gesprek tot getekend koopcontract'},
          {value: 'Vóór Funda', label: 'als eersten op bezichtiging, zonder concurrentie'},
          {value: '€ 18.000', label: 'onder hun maximale budget gebleven'},
        ],
      },
      h('En nu?'),
      p('Inmiddels wonen Sanne en Joost er een half jaar. "Onze zoon heeft een tuin om in te spelen, en wij hebben een buurt waar we ons meteen thuis voelden," zegt Sanne. "Als iemand ons vraagt hoe het is gelukt waar het zo lang niet lukte: we hadden gewoon iemand nodig die de markt van binnenuit kende. En die eerlijk tegen ons was, ook toen we te enthousiast werden."'),
    ],
    dienst: 'Aankoop',
    wie: 'Sanne & Joost',
    plaats: 'Haarlem',
    buurt: 'Kleverparkbuurt',
    feiten: [{label: 'Doorlooptijd', value: '6 weken'}],
    grade: 10,
    quote:
      'We zochten al anderhalf jaar. Binnen zes weken stonden we met de sleutel in onze hand — in de straat waar we stiekem altijd al wilden wonen.',
    makelaarQuote:
      'Sanne en Joost wisten heel goed wat ze wilden — ze hadden alleen iemand nodig die er eerder bij was dan de rest. Daar is dat netwerk voor.',
    date: '2026-06-01',
    seo: {
      title: 'Klantverhaal: Sanne & Joost in Haarlem',
      description:
        'Hoe Sanne en Joost na anderhalf jaar zoeken binnen zes weken hun huis in de Kleverparkbuurt kochten — vóór Funda, met Hart & Huis Makelaardij.',
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
    `*[_type == "klantverhaal" && slug.current == $slug][0]._id`,
    {slug: verhaal.slug},
  )
  if (existingId) {
    await client.patch(existingId).set(doc).commit()
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
