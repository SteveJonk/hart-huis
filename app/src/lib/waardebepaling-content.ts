import type { BlockIconName } from "@/components/ui/BlockIcon";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/lib/verkoop-content";

export const WAARDEBEPALING_HERO = {
  image: "/images/waardebepaling/hero.jpg",
  imageAlt: "Woningen in Haarlem",
  eyebrow: "Gratis en vrijblijvend · Haarlem en omstreken",
  titleBefore: "Wat is jouw huis ",
  titleEm: "vandaag",
  titleAfter: " waard?",
  lead: "Binnen twee werkdagen staat Dorien bij je op de stoep met een onderbouwde waardebepaling. Geen verkooppraatje, geen verplichtingen — gewoon eerlijk weten waar je staat.",
  usps: [
    "Onderbouwd met échte transactiecijfers uit jouw straat",
    "Van een NVM-makelaar die zelf ook register-taxateur is",
    "Ook als je pas over een jaar wilt verkopen",
  ],
  score: "9,6",
  scoreLabel: "OP FUNDA",
  reviewCount: "56 beoordelingen",
  reviewNote: "van kopers en verkopers uit Haarlem, Spaarndam en Velsen.",
  formTitle: "Vraag je waardebepaling aan",
  formLead: "Twee korte stappen, klaar in een minuut.",
  successTitle: "Gelukt, we nemen contact op",
  successBody: `Dorien belt je binnen één werkdag om een moment af te spreken. Liever eerder? Bel gerust op ${SITE.phone}.`,
  privacyNote:
    "Je gegevens gaan alleen naar ons. Geen nieuwsbrieven waar je niet om vroeg, en je zit nergens aan vast.",
} as const;

export const WAARDEBEPALING_FORM_TITLE = "Waardebepaling";
export const WAARDEBEPALING_FORM_ID = "waardebepaling";

export type WaardebepalingFormField =
  | {
      label: string;
      name: string;
      type: "text";
      isRequired: true;
      placeholder: string;
    }
  | {
      label: string;
      name: string;
      type: "select";
      isRequired: true;
      selectOptions: readonly string[];
    }
  | {
      label: string;
      name: string;
      type: "email" | "tel";
      isRequired: true;
      placeholder: string;
    }
  | {
      label: string;
      name: string;
      type: "checkbox";
      isRequired: true;
      checkboxOptions: readonly string[];
    };

export const WAARDEBEPALING_WONINGTYPE_OPTIONS = [
  "Tussenwoning",
  "Hoekwoning of 2-onder-1-kap",
  "Vrijstaande woning",
  "Appartement",
  "Anders",
] as const;

export const WAARDEBEPALING_TERMIJN_OPTIONS = [
  "Binnen 3 maanden",
  "Over 3 tot 6 maanden",
  "Ergens dit jaar",
  "Weet ik nog niet, ik oriënteer me",
] as const;

/** Fields for the `contactForm` document this hero's wizard posts to. */
export const WAARDEBEPALING_FORM_FIELDS: WaardebepalingFormField[] = [
  { label: "Postcode", name: "postcode", type: "text", isRequired: true, placeholder: "2026 ZK" },
  { label: "Huisnummer", name: "huisnr", type: "text", isRequired: true, placeholder: "288" },
  {
    label: "Type woning",
    name: "woningtype",
    type: "select",
    isRequired: true,
    selectOptions: WAARDEBEPALING_WONINGTYPE_OPTIONS,
  },
  { label: "Naam", name: "naam", type: "text", isRequired: true, placeholder: "Voor- en achternaam" },
  { label: "E-mailadres", name: "mail", type: "email", isRequired: true, placeholder: "jij@voorbeeld.nl" },
  { label: "Telefoonnummer", name: "tel", type: "tel", isRequired: true, placeholder: "06 - 12 34 56 78" },
  {
    label: "Wanneer wil je verkopen?",
    name: "termijn",
    type: "select",
    isRequired: true,
    selectOptions: WAARDEBEPALING_TERMIJN_OPTIONS,
  },
  {
    label: "Akkoord",
    name: "akkoord",
    type: "checkbox",
    isRequired: true,
    checkboxOptions: [
      "Hart & Huis mag contact met me opnemen over mijn aanvraag. Zie de [privacyverklaring](#).",
    ],
  },
];

export type IconCardItem = {
  icon: BlockIconName;
  title: string;
  body: string;
};

export const WAARDEBEPALING_KRIJGT_INTRO = {
  eyebrow: "Wat je krijgt",
  title: "Geen rekenmachine, maar een makelaar aan tafel",
  lead: "Online waardecheckers gooien er een gemiddelde uit op basis van je postcode. Wij komen kijken — want de staat van je dak, je tuin en je indeling zie je niet in een database.",
} as const;

export const WAARDEBEPALING_KRIJGT: IconCardItem[] = [
  {
    icon: "chart",
    title: "Een realistische vraagprijs",
    body: "Gebaseerd op wat vergelijkbare woningen in jouw buurt écht hebben opgebracht — niet op wat er wordt gevraagd. Via het NVM-systeem zien we de werkelijke transactiecijfers.",
  },
  {
    icon: "heart",
    title: "Tips die het verschil maken",
    body: "Welke kleine ingrepen je vraagprijs omhoog trekken en welke verbouwing je vooral níét moet doen. Wil je verder gaan, dan denkt onze interieurstyliste mee.",
  },
  {
    icon: "clock",
    title: "Advies over het moment",
    body: "Is dit een goed moment om je huis in de markt te zetten, of kun je beter wachten? Je krijgt een eerlijk antwoord, ook als dat betekent dat we voorlopig niets voor je doen.",
  },
];

export type NumberedStepItem = { number: string; title: string; body: string };

export const WAARDEBEPALING_STAPPEN_INTRO = {
  eyebrow: "Hoe het werkt",
  title: "Van aanvraag tot antwoord in drie stappen",
  lead: "Je hoeft niets voor te bereiden en niets op te ruimen. We beoordelen het huis, niet je interieur.",
} as const;

export const WAARDEBEPALING_STAPPEN: NumberedStepItem[] = [
  {
    number: "01",
    title: "Je vult het formulier in",
    body: "Adres, type woning en hoe we je kunnen bereiken. Dat is alles. Binnen één werkdag bellen we je om een moment te prikken dat jou uitkomt — ook 's avonds.",
  },
  {
    number: "02",
    title: "We komen langs",
    body: "Reken op drie kwartier. We lopen samen door je huis, stellen vragen over verbouwingen en onderhoud, en horen wat jouw plannen zijn.",
  },
  {
    number: "03",
    title: "Je hoort wat het waard is",
    body: "Nog tijdens het gesprek noemen we een reële vraagprijs met de onderbouwing erbij. Wil je verder? Dan bespreken we het vervolg. Wil je dat niet, dan is het ook goed.",
  },
];

export const WAARDEBEPALING_WIE = {
  image: "/images/contact/dorien.jpg",
  imageAlt: "Dorien Hollemans van Hart & Huis Makelaardij",
  eyebrow: "Wie er langskomt",
  title: "Je krijgt Dorien aan tafel, niet een verkoper",
  paragraphs: [
    "Dorien Hollemans is geboren en getogen in Zuid-Kennemerland en werkt al twintig jaar in deze regio. Sinds 2021 met haar eigen kantoor, bewust klein gehouden: je hebt bij Hart & Huis één vast aanspreekpunt van begin tot eind.",
    "Ze is NVM-makelaar én ingeschreven register-taxateur. Dat laatste betekent dat ze de waarde van je woning bepaalt volgens dezelfde methodiek als een officiële taxatie — geen natte vinger.",
  ],
  quote:
    "Ik noem liever een prijs die klopt dan een prijs die je graag hoort. Daar heb je uiteindelijk het meeste aan.",
  name: "Dorien Hollemans · NVM Register Makelaar & Taxateur",
} as const;

export type QuoteStripItem = { quote: string; score: string; meta: string };

export const WAARDEBEPALING_REVIEWS_INTRO = {
  score: "9,6",
  scoreLabel: "OP FUNDA",
  title: "Wat verkopers over ons schrijven",
  lead: "56 beoordelingen uit de afgelopen 24 maanden, rechtstreeks van Funda.",
  link: { label: "Bekijk ons Funda-profiel", href: "#" },
} as const;

export const WAARDEBEPALING_REVIEWS: QuoteStripItem[] = [
  {
    quote:
      "Onze woning stond binnen twee weken onder voorbehoud verkocht. De verkoopstrategie klopte en we werden overal in meegenomen, ook als er even niets te melden was.",
    score: "10,0",
    meta: "Een verkoper · juli 2026",
  },
  {
    quote:
      "Rust en overzicht in een periode die best spannend was. De eindinspectie en de overdracht bij de notaris waren tot in de puntjes geregeld.",
    score: "10,0",
    meta: "Een verkoper · april 2026",
  },
  {
    quote:
      "De foto's en de tekst op Funda waren echt goed. We kregen binnen een weekend meer bezichtigingen dan we hadden verwacht.",
    score: "9,5",
    meta: "Een verkoper · mei 2026",
  },
];

export const WAARDEBEPALING_FAQ_INTRO = {
  eyebrow: "Voordat je het aanvraagt",
  title: "De vragen die iedereen stelt",
  lead: "Kort en eerlijk, zodat je weet waar je aan begint.",
  link: { label: "Stel je vraag", href: "#" },
} as const;

export const WAARDEBEPALING_FAQ: FaqItem[] = [
  {
    question: "Is het echt gratis?",
    answer:
      "Ja. Er zitten geen kosten aan en je krijgt achteraf geen rekening. We doen dit omdat een deel van de mensen die we spreken later ook daadwerkelijk met ons in zee gaat — maar dat is aan jou, niet aan ons.",
  },
  {
    question: "Zit ik dan ergens aan vast?",
    answer:
      "Nee. Je verplicht je tot niets, ook niet tot een vervolggesprek. Na de waardebepaling hoor je van ons wat je huis waard is en wat wij zouden doen. Wat je daarmee doet, bepaal je zelf.",
  },
  {
    question: "Ik wil pas over een jaar verkopen. Heeft het dan zin?",
    answer:
      "Zeker, en eigenlijk is dat het beste moment. Dan weet je met welk budget je kunt zoeken, en heb je nog tijd om de dingen te doen die je vraagprijs omhoog halen. Verkopen op korte termijn is geen voorwaarde.",
  },
  {
    question: "Wat is het verschil met een online waardecheck?",
    answer:
      "Een online check rekent met een gemiddelde per postcode. Die weet niet dat jouw dak in 2020 is vernieuwd, dat je een aanbouw hebt of dat de tuin op het zuiden ligt. Dat scheelt in de praktijk tienduizenden euro's — beide kanten op.",
  },
  {
    question: "Wat is het verschil met een taxatie?",
    answer:
      "Een waardebepaling is onze onderbouwde inschatting van de haalbare verkoopprijs en is gratis. Een taxatie is een officieel, gevalideerd rapport dat je bank wil zien bij een hypotheek — dat is betaald werk. Weet je niet welke je nodig hebt? Bel even, dan is het zo duidelijk.",
  },
];

export const WAARDEBEPALING_SLOT = {
  eyebrow: "Gratis en zonder verplichtingen",
  title: "Benieuwd wat jouw huis nu opbrengt?",
  body: "Vul je adres in, dan bellen we je binnen één werkdag om een moment af te spreken. Duurt een minuut.",
  primary: { label: "Vraag je waardebepaling aan", href: "#formulier" },
  secondary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
