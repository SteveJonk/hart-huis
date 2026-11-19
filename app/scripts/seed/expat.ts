/**
 * Seeds the expat FAQs and the /expat page (design: hart-en-huis-expat.html).
 * Copy lives here rather than in a src/lib content file: no component falls
 * back to it, so Sanity is the only place it is read from.
 */
import {SITE} from '../../src/lib/site'
import {client, cta, externalLink, key, uploadImage, upsertFaq, upsertPage} from './shared'

const IMG = '/images/expat'
const KENNISMAKING = {label: 'Plan een kennismaking', href: '/contact'}

const FAQ = [
  {
    question: 'Kan een buitenlander zomaar een huis kopen in Nederland?',
    answer:
      'Ja. Nederland kent geen beperkingen voor niet-Nederlanders die een woning willen kopen. Je hebt geen verblijfsvergunning of Nederlands paspoort nodig om eigenaar te worden. Wel heb je een BSN (burgerservicenummer) nodig voor de notariële afwikkeling — wij leggen uit hoe je dat regelt.',
  },
  {
    question: 'Kan het hele traject in het Engels?',
    answer:
      'Ja. Alle gesprekken, bezichtigingen en uitleg kunnen in het Engels. De officiële documenten, zoals de koopakte, zijn wettelijk in het Nederlands, maar wij nemen ze met je door en vertalen de punten die ertoe doen, zodat je precies weet wat je tekent.',
  },
  {
    question: 'Ik woon nog in het buitenland. Kunnen we toch beginnen?',
    answer:
      'Zeker. Het eerste gesprek doen we telefonisch of via videocall, en een eerste bezichtiging kunnen we voor je doen via een videoverbinding. Zo kom je pas naar Nederland voor woningen die écht de moeite waard zijn.',
  },
  {
    question: 'Kan ik als expat een hypotheek krijgen?',
    answer:
      'In veel gevallen wel, maar het hangt af van je situatie: je inkomen, je contract en of je in Nederland werkt. Het is specialistenwerk, dus we verwijzen je door naar hypotheekadviseurs die ervaring hebben met internationale kopers. Zij kijken wat in jouw geval mogelijk is.',
  },
  {
    question: 'Wat kost aankoopbegeleiding?',
    answer:
      'Je betaalt courtage: een vooraf afgesproken bedrag dat je pas verschuldigd bent als de aankoop doorgaat. Bij de kennismaking hoor je precies wat het kost en wat erin zit. Geen verrassingen achteraf.',
  },
]

const STEPS = [
  {
    title: 'Kennismaking',
    body: 'We bespreken je situatie: waar kom je vandaan, wanneer verhuis je, wat zoek je en wat is je budget. Ook leggen we uit hoe het Nederlandse koopproces werkt, zodat je weet wat je te wachten staat. Dit gesprek kan telefonisch of via videocall, ook als je nog in het buitenland zit.',
  },
  {
    title: 'Zoeken en bezichtigen',
    body: 'We zoeken actief mee en gaan bij elke bezichtiging mee. Zit je nog in het buitenland? Dan kunnen we een eerste bezichtiging voor je doen via videocall, zodat je geen reis maakt voor een woning die toch niet past.',
  },
  {
    title: 'Bieden en onderhandelen',
    body: 'We onderzoeken wat vergelijkbare woningen in de buurt hebben opgebracht en adviseren je over een reëel bod. Daarna onderhandelen wij namens jou — in het Nederlands met de verkopende makelaar, in het Engels met jou.',
  },
  {
    title: 'De koopovereenkomst',
    body: 'We nemen de koopakte en alle bijlagen met je door en vertalen de belangrijke punten, zodat je precies weet waar je je handtekening onder zet. Pas als alles klopt, teken je. Daarna regel je met die akte je hypotheek.',
  },
  {
    title: 'Sleutel bij de notaris',
    body: 'We doen samen de eindinspectie en zijn erbij bij de overdracht bij de notaris. Welkom in je nieuwe huis — en in Haarlem.',
  },
]

async function buildExpatContent(faqIds: string[]) {
  console.log('Building expat blocks…')
  const img = (name: string, alt: string) => uploadImage(`${IMG}/expat-${name}.jpg`, alt)

  return [
    {
      _type: 'pageHero',
      _key: key('expat-hero'),
      image: await img('pagehero', 'Monumentale woningen in het centrum van Haarlem'),
      breadcrumbLabel: 'Expat services',
      eyebrow: 'Aankoopbegeleiding voor internationale kopers',
      title: 'Een huis kopen in Haarlem als ',
      titleHighlight: 'internationale koper',
      lead: 'Verhuizen naar Nederland en een woning kopen in een onbekend systeem, in een taal die niet de jouwe is? Wij begeleiden expats door het hele Nederlandse koopproces — van zoektocht tot sleuteloverdracht, desgewenst volledig in het Engels.',
      primaryCta: cta(KENNISMAKING.label, KENNISMAKING.href),
      secondaryCta: cta(SITE.phone, SITE.phoneHref),
      note: 'We help international buyers in English — just ask.',
    },
    {
      _type: 'factBar',
      _key: key('expat-facts'),
      facts: [
        {value: 'Engels', label: 'het hele traject kan in het Engels, van gesprek tot koopakte'},
        {value: '20 jaar', label: 'marktkennis van Haarlem en Zuid-Kennemerland'},
        {value: 'NVM', label: 'register-makelaar en taxateur, aangesloten bij de NVM'},
      ].map((fact) => ({...fact, _key: key(`expat-${fact.value}`)})),
    },
    {
      _type: 'benefits',
      _key: key('expat-benefits'),
      eyebrow: 'Waarom juist als internationale koper',
      title: 'Het Nederlandse koopproces zit vol verrassingen',
      lead: 'Kopen in Nederland werkt anders dan in bijna elk ander land: biedingen zonder tussenpersoon, strakke termijnen, en documenten in het Nederlands waar je handtekening juridisch bindend is. Wij zorgen dat je precies weet waar je ja tegen zegt.',
      image: await img('waarom', 'Dorien Hollemans begeleidt internationale kopers in Haarlem'),
      items: [
        {
          icon: 'globe',
          title: 'Geen taalbarrière',
          body: 'Bezichtigingen, onderhandelingen en uitleg van de koopovereenkomst kunnen volledig in het Engels. Je weet altijd precies wat er staat.',
        },
        {
          icon: 'search',
          title: 'Toegang tot de lokale markt',
          body: 'Via het NVM-netwerk horen we vaak eerder van woningen dan ze online komen — een groot voordeel als je niet dagelijks Funda kunt afstruinen.',
        },
        {
          icon: 'chart',
          title: 'Je betaalt een reële prijs',
          body: 'Als nieuwkomer heb je geen gevoel voor wat normaal is in een buurt. Wij onderbouwen elk bod met echte transactiecijfers, zodat je niet te veel betaalt.',
        },
        {
          icon: 'doc',
          title: 'Het papierwerk geregeld',
          body: 'Koopakte, ontbindende voorwaarden, bedenktijd en de overdracht bij de notaris. Wij bewaken de deadlines en leggen elke stap uit.',
        },
      ].map((item) => ({...item, _key: key(`expat-${item.title}`)})),
    },
    {
      _type: 'numberedSteps',
      _key: key('expat-hulp'),
      eyebrow: 'Waar we mee helpen',
      title: 'Meer dan alleen het huis vinden',
      lead: 'Een woning kopen als expat raakt aan meer dan de aankoop zelf. We denken mee over de dingen waar je als nieuwkomer tegenaan loopt — en verwijzen je door naar betrouwbare partners waar nodig.',
      items: [
        {
          title: 'De juiste buurt',
          body: 'Dicht bij werk, bij internationale scholen of juist bij het groen? We vertalen je wensen naar de buurten die bij je passen.',
        },
        {
          title: 'Hypotheek & financiering',
          body: 'Als niet-Nederlander een hypotheek regelen vraagt om een gespecialiseerd adviseur. We verwijzen je naar partners die met expats werken.',
        },
        {
          title: 'Bouwkundig & juridisch',
          body: 'Van de bouwkundige keuring tot de notaris: we schakelen de juiste mensen in en zorgen dat alles in begrijpelijke taal wordt uitgelegd.',
        },
        {
          title: "Bieden op z'n Nederlands",
          body: 'Overbieden, stille verkoop, biedingen zonder makelaar aan de andere kant. Wij leggen de spelregels uit en onderhandelen voor je.',
        },
      ].map((item, i) => ({
        ...item,
        number: String(i + 1).padStart(2, '0'),
        _key: key(`expat-hulp-${i + 1}`),
      })),
    },
    {
      _type: 'steps',
      _key: key('expat-steps'),
      eyebrow: 'Het traject',
      title: 'Zo begeleiden we je stap voor stap',
      lead: 'Vijf stappen van kennismaking tot de sleutel. Bij elke bezichtiging zijn we erbij, en elke stap leggen we uit — ook in het Engels.',
      cta: cta(KENNISMAKING.label, KENNISMAKING.href),
      items: await Promise.all(
        STEPS.map(async (step, i) => {
          const number = String(i + 1).padStart(2, '0')
          return {
            _key: key(`expat-step-${number}`),
            number,
            ...step,
            image: await img(`step-${i + 1}`, step.title),
          }
        }),
      ),
    },
    {
      _type: 'quoteBand',
      _key: key('expat-quote'),
      image: await img('quote', 'Een gracht in Haarlem'),
      eyebrow: 'Een internationale koper vertelt',
      quote:
        'We relocated from London and had no idea how buying works here. Dorien explained everything in English and made sure we understood every document before signing.',
      initials: 'EM',
      name: 'Emma & Mark',
      place: 'Relocated from the UK, bought in Haarlem',
    },
    {
      _type: 'faqs',
      _key: key('expat-faqs'),
      eyebrow: 'Veelgestelde vragen',
      title: 'Goed om te weten',
      intro:
        'Zit je vraag er niet bij? Bel of app gerust — ook als je nog in het buitenland zit en je je eerst aan het oriënteren bent.',
      link: cta('Stel je vraag', '/contact'),
      faqs: faqIds.map((id) => ({_type: 'reference' as const, _ref: id, _key: key(id)})),
    },
    {
      _type: 'crossLinks',
      _key: key('expat-crosslinks'),
      items: [
        {
          title: 'Reguliere aankoopbegeleiding',
          body: 'Ook zonder taalwens helpen we je aan je volgende woning in de regio.',
          href: '/aankoop',
        },
        {
          title: 'Nu al woningen bekijken?',
          body: 'Ons actuele aanbod in Haarlem, Spaarndam, Velsen en omstreken.',
          href: '/aanbod',
        },
      ].map((item) => ({
        _key: key(`expat-${item.title}`),
        title: item.title,
        body: item.body,
        link: externalLink(item.href),
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('expat-cta'),
      image: await img('cta', 'Het Spaarne in Haarlem'),
      eyebrow: 'Vrijblijvend en zonder verplichtingen',
      title: 'Verhuizen naar Haarlem? Laten we kennismaken',
      body: 'Vertel ons je plannen, dan leggen we uit hoe we je kunnen helpen — in het Nederlands of in het Engels, net wat jij prettig vindt.',
      primaryCta: cta(KENNISMAKING.label, KENNISMAKING.href),
      secondaryCta: cta(`Bel ${SITE.phone}`, SITE.phoneHref),
    },
  ]
}

export async function seedExpat() {
  console.log('Expat FAQs')
  const faqIds: string[] = []
  for (const faq of FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nExpat page')
  const pageId = await upsertPage('expat', 'Expat services', await buildExpatContent(faqIds), {
    title: 'Huis kopen in Haarlem als expat',
    description:
      'Aankoopbegeleiding voor internationale kopers in Haarlem: van zoektocht tot sleuteloverdracht, desgewenst volledig in het Engels. NVM-makelaar.',
  })

  await addToMenus(pageId)
}

/**
 * Puts "Expat services" in the live menu and footer without re-running
 * seed:nav, which replaces both singletons and would wipe editor changes
 * (social links, copyright). Skipped where the page is already linked.
 */
async function addToMenus(pageId: string) {
  const link = {
    _key: key(`internal:Expat services:${pageId}`),
    label: 'Expat services',
    linkType: 'internal' as const,
    internalLink: {_type: 'reference' as const, _ref: pageId},
  }
  const linked = (path: string) =>
    `count(${path}[internalLink._ref == $pageId]) > 0`

  const nav = await client.fetch<{has: boolean} | null>(
    `*[_id == "navigation"][0]{"has": ${linked('navRight')}}`,
    {pageId},
  )
  if (nav && !nav.has) {
    await client.patch('navigation').insert('before', 'navRight[0]', [link]).commit()
    console.log('✓ Expat services added to the menu')
  }

  const footer = await client.fetch<{has: boolean} | null>(
    `*[_id == "footer"][0]{"has": ${linked('linkGroups[title == "Diensten"][0].links')}}`,
    {pageId},
  )
  if (footer && !footer.has) {
    await client
      .patch('footer')
      .insert('after', 'linkGroups[title == "Diensten"].links[-1]', [link])
      .commit()
    console.log('✓ Expat services added to the footer')
  }
}
