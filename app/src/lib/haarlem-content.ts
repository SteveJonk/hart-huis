import { SITE } from "@/lib/site";
import type { Fact, FaqItem } from "@/lib/verkoop-content";
import type { IconCardItem } from "@/lib/waardebepaling-content";

// Copy voor /haarlem, uit het stad-template `example-designs/!stad-haarlem.html`.
// Per stad verschillen: marktcijfers, intro, wijken, quote en FAQ.

export const HAARLEM_SEO = {
  // Zonder merknaam: die plakt de site er zelf achter.
  title: "Makelaar in Haarlem",
  description: `Makelaar in Haarlem voor verkoop, aankoop en taxatie. Dorien Hollemans kent elke Haarlemse buurt, met 20 jaar ervaring en een ${SITE.fundaScore} op Funda.`,
};

export const HAARLEM_HERO = {
  image: "/images/haarlem/haarlem-hero.jpg",
  imageAlt: "Grachten en monumentale panden in het centrum van Haarlem",
  eyebrow: "NVM-makelaar in Haarlem",
  titleBefore: "Je makelaar in ",
  titleEm: "Haarlem",
  titleAfter: " en elke buurt eromheen",
  lead: "Verkopen, kopen of taxeren in Haarlem? Dorien Hollemans kent de stad van binnenuit — van de Vijfhoek tot Schalkwijk. Persoonlijk, betrokken en met twintig jaar marktkennis in Zuid-Kennemerland.",
  primary: { href: "/waardebepaling", label: "Gratis waardebepaling" },
  secondary: { href: SITE.phoneHref, label: SITE.phone },
} as const;

export const HAARLEM_FACTS: Fact[] = [
  { value: "€ 584.000", label: "gemiddelde verkoopprijs in Haarlem, laatste kwartaal" },
  { value: "34 dagen", label: "gemiddelde tijd dat een woning te koop staat" },
  { value: "+2,8%", label: "gemiddeld verkocht boven de vraagprijs" },
  { value: "€ 6.100/m²", label: "gemiddelde prijs per vierkante meter" },
];

export const HAARLEM_FACTS_NOTE =
  "Marktcijfers Haarlem, geactualiseerd 2026. Gemiddelden zeggen iets over de stad, niet over jouw woning — vraag een waardebepaling voor een concreet bedrag.";

export const HAARLEM_INTRO = {
  eyebrow: "Makelaar met kennis van Haarlem",
  title: "Elke Haarlemse buurt heeft zijn eigen prijs",
  paragraphs: [
    "Een jaren-30-woning in de Kleverparkbuurt vraagt om een andere aanpak dan een appartement in Schalkwijk of een grachtenpand in de Vijfhoek. Wie de stad kent, weet dat de prijs per vierkante meter binnen Haarlem tientallen procenten kan verschillen — soms al binnen één postcode.",
    "Dorien is geboren en getogen in Zuid-Kennemerland en werkt al twintig jaar in deze regio. Ze kent niet alleen de straten, maar ook wat een woning daar écht doet: welke buurt in trek is bij jonge gezinnen, waar kopers overbieden en waar juist ruimte is om te onderhandelen.",
    "Via het NVM-netwerk ziet ze bovendien de werkelijke transactiecijfers van Haarlem, niet alleen de vraagprijzen op Funda. Dat maakt haar waardebepaling scherper — en haar advies eerlijker.",
  ],
  image: {
    src: "/images/haarlem/haarlem-dorien.jpg",
    alt: "Dorien Hollemans, makelaar in Haarlem",
  },
} as const;

export const HAARLEM_DIENSTEN_INTRO = {
  eyebrow: "Wat we in Haarlem doen",
  title: "Verkoop, aankoop en taxatie — allemaal in Haarlem",
  lead: "Of je nu je huis verkoopt, op zoek bent naar je volgende woning of een taxatierapport nodig hebt: je hebt één vast aanspreekpunt dat de stad kent.",
} as const;

export const HAARLEM_DIENSTEN: Required<IconCardItem>[] = [
  {
    icon: "house",
    title: "Je woning verkopen in Haarlem",
    body: "Een scherpe vraagprijs op basis van échte Haarlemse transactiecijfers, sterke presentatie en een makelaar die stevig voor je onderhandelt.",
    cta: { label: "Verkopen in Haarlem", href: "/verkoop" },
  },
  {
    icon: "search",
    title: "Een woning kopen in Haarlem",
    body: "In een gewilde stad als Haarlem moet je snel én scherp zijn. Wij zoeken mee, gaan mee naar bezichtigingen en horen vaak eerder wat er te koop komt.",
    cta: { label: "Kopen in Haarlem", href: "/aankoop" },
  },
  {
    icon: "doc",
    title: "Je Haarlemse woning taxeren",
    body: "Een gevalideerd NWWI-taxatierapport voor je hypotheek, scheiding of erfenis. Opgesteld door een register-taxateur die Haarlem kent.",
    cta: { label: "Taxatie in Haarlem", href: "/taxatie" },
  },
];

export const HAARLEM_WIJKEN_INTRO = {
  eyebrow: "Overal in de stad",
  title: "Actief in alle wijken van Haarlem",
  lead: "Van de historische binnenstad tot de naoorlogse wijken: we kennen de bijzonderheden van elke buurt en wat kopers daar zoeken.",
} as const;

export const HAARLEM_WIJKEN = [
  "Centrum & Vijfhoek",
  "Kleverparkbuurt",
  "Bomenbuurt",
  "Rozenprieel",
  "Haarlem-Noord",
  "Sinnevelt",
  "Schalkwijk",
  "Meerwijk",
  "Molenwijk",
  "Ramplaankwartier",
  "Delftwijk",
  "Parkwijk",
] as const;

export const HAARLEM_QUOTE = {
  image: "/images/over-ons/spaarne.jpg",
  imageAlt: "Het Spaarne in Haarlem",
  eyebrow: "Een koper vertelt",
  quote:
    "We wisten precies in welke Haarlemse straat we wilden wonen. Dorien hoorde eerder dan Funda dat er iets vrijkwam — en toen stonden wij vooraan.",
  initials: "SJ",
  name: "Sanne & Joost",
  place: "Kochten een woning in de Kleverparkbuurt, Haarlem",
} as const;

export const HAARLEM_FAQ_INTRO = {
  eyebrow: "Veelgestelde vragen",
  title: "Makelaar in Haarlem",
  lead: "De vragen die we het vaakst krijgen van Haarlemmers. Staat je vraag er niet bij? Bel of app gerust.",
  link: { label: "Stel je vraag", href: "/contact" },
} as const;

export const HAARLEM_FAQ: FaqItem[] = [
  {
    question: "Wat is mijn huis in Haarlem waard?",
    answer:
      "Dat hangt sterk af van de buurt, het bouwjaar en de staat van je woning — binnen Haarlem lopen de prijzen per vierkante meter flink uiteen. Een gratis waardebepaling bij je thuis geeft je een concreet, onderbouwd bedrag in plaats van een postcodegemiddelde. Dorien komt langs, kijkt rond en vertelt je nog tijdens het gesprek wat haalbaar is.",
  },
  {
    question: "Hoe snel verkoop ik mijn woning in Haarlem?",
    answer:
      "Haarlem is een gewilde stad en de markt is actief. Woningen staan er gemiddeld zo'n vijf weken te koop, maar goed gepresenteerde huizen in populaire buurten gaan vaak sneller en boven de vraagprijs. Bij de kennismaking geven we je een realistische verwachting voor jouw specifieke woning en buurt.",
  },
  {
    question: "Werken jullie in heel Haarlem?",
    answer:
      "Ja, in alle wijken — van het centrum en de Vijfhoek tot Haarlem-Noord en Schalkwijk. Omdat we hier al twintig jaar werken, kennen we de bijzonderheden van elke buurt: waar kopers overbieden, waar ruimte is om te onderhandelen en wat een woning op die specifieke plek waard is.",
  },
  {
    question: "Wat kost een makelaar in Haarlem?",
    answer:
      "De courtage verschilt per traject en per woning. Bij ons hoor je bij de gratis kennismaking precies wat je betaalt en waarvoor, inclusief fotografie en plattegronden. Geen pakketten met kleine lettertjes, geen verrassingen achteraf. Je zit nergens aan vast voordat je de opdracht ondertekent.",
  },
  {
    question: "Kunnen jullie ook helpen bij aankoop in Haarlem?",
    answer:
      "Zeker. In een competitieve stad als Haarlem is een aankoopmakelaar vaak het verschil tussen mislopen en net op tijd zijn. We zoeken actief mee, gaan mee naar bezichtigingen en onderhandelen scherp — en via het NVM-netwerk horen we regelmatig van woningen voordat ze op Funda staan.",
  },
];

export const HAARLEM_OMGEVING_INTRO = {
  eyebrow: "Ons werkgebied",
  title: "Ook makelaar in de omgeving",
  lead: "Verkopen of kopen net buiten Haarlem? We zijn actief in de hele regio Zuid-Kennemerland en de IJmond.",
} as const;

// ponytail: nog geen stadspagina's voor deze plaatsen, dus '#' zoals op /verkoop en /aankoop.
export const HAARLEM_OMGEVING = [
  "Heemstede",
  "Bloemendaal",
  "Overveen",
  "Aerdenhout",
  "Spaarndam",
  "Santpoort",
  "Velserbroek",
  "Velsen",
  "Driehuis",
  "IJmuiden",
  "Zandvoort",
  "Hoofddorp",
] as const;

export const HAARLEM_CTA = {
  image: "/images/aankoop/cta.jpg",
  imageAlt: "Woningen aan het Spaarne in Haarlem",
  eyebrow: "Gratis en zonder verplichtingen",
  title: "Benieuwd wat jouw woning in Haarlem opbrengt?",
  body: "We komen langs, lopen door je huis en vertellen je eerlijk wat haalbaar is in de Haarlemse markt. Ook als je pas over een jaar wilt verkopen.",
  primary: { label: "Plan een waardebepaling", href: "/waardebepaling" },
  secondary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
