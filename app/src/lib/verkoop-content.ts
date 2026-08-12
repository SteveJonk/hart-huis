import { SITE } from "@/lib/site";

export type Fact = { value: string; label: string };

export type Benefit = {
  title: string;
  body: string;
  icon: "person" | "camera" | "chart" | "doc" | "house" | "renovate" | "scale";
};

export type Step = {
  number: string;
  title: string;
  body: string;
  image: string;
};

export type FaqItem = {
  question: string;
  /** Plain answer text. Optional `link` is inserted before `afterLink`. */
  answer: string;
  link?: { href: string; label: string };
  afterLink?: string;
};

export const VERKOOP_FAQ: FaqItem[] = [
  {
    question: "Wat kost een verkoopmakelaar?",
    answer:
      "Onze vergoeding heet courtage en hangt af van je woning en het traject dat we samen afspreken. Bij de kennismaking hoor je exact wat je betaalt en waarvoor — inclusief de kosten van fotografie en plattegronden. Je zit nergens aan vast voordat je de opdracht ondertekent.",
  },
  {
    question: "Wat is mijn woning op dit moment waard?",
    answer:
      "Dat vertellen we je graag tijdens een gratis waardebepaling bij je thuis. Dat is iets anders dan een taxatie: een waardebepaling is onze onderbouwde inschatting van de haalbare verkoopprijs, een taxatierapport is een gevalideerd document dat je hypotheekverstrekker wil zien. Heb je dat laatste nodig? ",
    link: { href: "#", label: "Kijk dan bij taxatie" },
    afterLink: ".",
  },
  {
    question: "Hoe lang duurt het verkopen van een huis?",
    answer:
      "In onze regio gaat een woning gemiddeld binnen drie weken onder voorbehoud. Dat verschilt per prijsklasse, buurt en staat van onderhoud. Bij de kennismaking geven we je een realistische verwachting in plaats van een mooi verhaal.",
  },
  {
    question: "Moet ik mijn huis eerst laten stylen?",
    answer:
      "Verplicht is het niet, maar het scheelt vaak meer dan het kost. Soms is opruimen, ontpersoonlijken en een lamp verplaatsen al genoeg. Wil je verder gaan, dan werken we samen met een interieurstyliste die een advies op maat maakt.",
  },
  {
    question: "Kan ik tegelijk verkopen en iets nieuws kopen?",
    answer:
      "Dat kan, en het is precies waar de meeste mensen tegen opzien. We plannen de verkoop en de zoektocht op elkaar af, zodat je niet tussen twee huizen in komt te zitten. Combineer je verkoop met ",
    link: { href: "#", label: "aankoopbegeleiding" },
    afterLink: ", dan geldt een gunstiger tarief.",
  },
];

export const VERKOOP_HERO = {
  image: "/images/verkoop/pagehero.jpg",
  imageAlt: "Dorien en Tessa onderweg met een Te Koop-bord in Haarlem",
  eyebrow: "Verkoopmakelaar in Haarlem en omstreken",
  titleBefore: "Je woning verkopen, ",
  titleEm: "zonder zorgen",
  lead:
    "Van waardebepaling en styling tot de sleuteloverdracht bij de notaris. Je hebt één vast aanspreekpunt — Dorien of Tessa — die weet wat jouw woning in deze buurt kan opbrengen.",
  primary: { href: "#", label: "Vraag een gratis waardebepaling" },
  secondary: { href: SITE.phoneHref, label: SITE.phone },
} as const;

export const VERKOOP_FACTS: Fact[] = [
  {
    value: "98%",
    label: "van onze woningen wordt boven de vraagprijs verkocht",
  },
  {
    value: "21 dagen",
    label: "gemiddelde looptijd van aanmelding tot verkocht",
  },
  {
    value: SITE.fundaScore,
    label: "gemiddelde beoordeling op Funda door verkopers",
  },
];

export const VERKOOP_BENEFITS: Benefit[] = [
  {
    icon: "person",
    title: "Eén vast aanspreekpunt",
    body: "Geen wisselende contactpersonen of callcenter. Je hebt direct het mobiele nummer van Dorien of Tessa.",
  },
  {
    icon: "camera",
    title: "Een presentatie die opvalt",
    body: "Professionele fotoreportage, plattegronden, een korte video en een tekst die kijkers nieuwsgierig maakt.",
  },
  {
    icon: "chart",
    title: "Scherpe onderhandeling",
    body: "Twintig jaar ervaring in deze regio. We weten wat een bod waard is en wanneer je moet doorpakken.",
  },
  {
    icon: "doc",
    title: "Alles juridisch dicht",
    body: "Koopakte, termijnen, ontbindende voorwaarden en de eindinspectie. Wij houden de deadlines bij, jij niet.",
  },
];

export const VERKOOP_BENEFITS_IMAGE = {
  src: "/images/verkoop/benefits.jpg",
  alt: "Dorien en Tessa van Hart & Huis op kantoor",
} as const;

export const VERKOOP_STEPS: Step[] = [
  {
    number: "01",
    title: "Kennismaking",
    body: "We lopen samen door je woning en bespreken je wensen en planning. Je hoort wat je huis waard is, wat de markt op dit moment doet en welke verkoopstrategie daarbij past. Ook de courtage leggen we meteen op tafel — geen verrassingen achteraf. Wil je tips om je huis verkoopklaar te maken? Die krijg je, of een advies op maat van onze interieurstyliste.",
    image: "/images/verkoop/step-1.jpg",
  },
  {
    number: "02",
    title: "De presentatie",
    body: "Na het tekenen van de opdracht komt de fotograaf langs voor een uitgebreide reportage. We meten de woning in, maken de plattegronden en filmen een korte video waarin we je huis presenteren. Daarna schrijven wij de Funda-tekst. Zodra jij akkoord bent, gaat de woning live.",
    image: "/images/verkoop/step-2.jpg",
  },
  {
    number: "03",
    title: "Bezichtigingen",
    body: "De momenten plannen we in overleg met jou. We nemen ruim de tijd per kijker, zodat ze de sfeer van je woning echt kunnen voelen en wij het gesprek met ze aan kunnen gaan. Na elke bezichtiging bellen we je met de reacties — ook de kritische.",
    image: "/images/verkoop/step-3.jpg",
  },
  {
    number: "04",
    title: "Van bieding naar koopcontract",
    body: "Zodra er een bod ligt, hoor je het direct. We bespreken je opties en onderhandelen naar de best mogelijke overeenkomst. Zijn we eruit, dan leggen we alle afspraken juridisch waterdicht vast. Na de drie dagen bedenktijd en het rondkomen van de financiering is je woning definitief verkocht.",
    image: "/images/verkoop/step-4.jpg",
  },
  {
    number: "05",
    title: "Overdracht bij de notaris",
    body: "We doen samen met de koper de eindinspectie en zijn erbij als de woning bij de notaris wordt overgedragen. Pas dan is ons werk klaar — en mogen we je feliciteren.",
    image: "/images/verkoop/step-5.jpg",
  },
];

export const VERKOOP_QUOTE = {
  image: "/images/verkoop/quote.jpg",
  imageAlt: "Een straat in Haarlem",
  quote:
    "Ons huis stond na tien dagen verkocht, ruim boven de vraagprijs. Maar wat ik me vooral herinner: ik hoefde zelf niets bij te houden.",
  initials: "FW",
  name: "Familie de Wit",
  place: "Verkoop woning in Overveen",
} as const;

export const VERKOOP_REGIONS = [
  "Haarlem",
  "Spaarndam e.o.",
  "Heemstede",
  "Bloemendaal",
  "Overveen",
  "Santpoort",
  "Velserbroek",
  "Velsen",
  "Driehuis",
  "IJmuiden",
  "Aerdenhout",
  "Zandvoort",
  "Vogelenzang",
  "Hoofddorp",
  "Amsterdam",
] as const;

export const VERKOOP_CROSSLINKS = [
  {
    href: "#",
    title: "Ook iets nieuws zoeken?",
    body: "Wij zien woningen vaak eerder dan Funda. Meld je aan voor een gratis zoekopdracht.",
  },
  {
    href: "#",
    title: "Een taxatierapport nodig?",
    body: "Gevalideerd via het NWWI, meestal binnen vijf werkdagen in je mailbox.",
  },
] as const;

export const VERKOOP_CTA = {
  image: "/images/verkoop/cta.jpg",
  imageAlt: "Hart & Huis Makelaardij in een Haarlemse straat",
  eyebrow: "Gratis en zonder verplichtingen",
  title: "Nieuwsgierig wat je woning nu opbrengt?",
  body: "We komen langs, lopen door je huis en vertellen je eerlijk wat haalbaar is. Ook als je pas over een jaar wilt verkopen — dan weet je waar je aan toe bent.",
  primary: { href: "#", label: "Plan een waardebepaling" },
  secondary: { href: "#", label: "Stel eerst een vraag" },
} as const;
