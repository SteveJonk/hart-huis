import { SITE } from "@/lib/site";
import type { Benefit, Fact, FaqItem, Step } from "@/lib/verkoop-content";

export const TAXATIE_HERO = {
  image: "/images/taxatie/pagehero.jpg",
  imageAlt: "Woningen aan een gracht in Haarlem",
  eyebrow: "Erkend taxateur in Haarlem en omstreken",
  titleBefore: "Een taxatierapport waar je bank ",
  titleEm: "niets op aan te merken heeft",
  lead: "Gevalideerd door het NWWI en geaccepteerd door alle geldverstrekkers. Meestal binnen een week bij je in de mailbox, opgesteld door een register-taxateur die de Haarlemse markt van binnenuit kent.",
  primary: { href: "#", label: "Vraag een taxatie aan" },
  secondary: { href: SITE.phoneHref, label: SITE.phone },
} as const;

export const TAXATIE_FACTS: Fact[] = [
  {
    value: "± 1 week",
    label: "van afspraak tot gevalideerd rapport in je mailbox",
  },
  {
    value: "NWWI",
    label: "gevalideerd, dus geaccepteerd door elke bank en verzekeraar",
  },
  {
    value: "NRVT",
    label: "ingeschreven register-taxateur, ook gecertificeerd via VastgoedCert",
  },
];

export const TAXATIE_BENEFITS_IMAGE = {
  src: "/images/taxatie/wanneer.jpg",
  alt: "Het kantoor van Hart & Huis Makelaardij in Haarlem",
};

export const TAXATIE_BENEFITS_INTRO = {
  eyebrow: "Wanneer heb je er een nodig",
  title: "Vier situaties waarin een rapport verplicht is",
  lead: "Een taxatie is geen luxe maar meestal een vereiste: een geldverstrekker of een notaris vraagt erom. Deze vier redenen komen bij ons het vaakst langs.",
} as const;

export const TAXATIE_BENEFITS: Benefit[] = [
  {
    icon: "house",
    title: "Je koopt een woning",
    body: "Vrijwel elke bank wil een gevalideerd rapport voordat de hypotheek rondkomt. Zonder taxatie geen financiering.",
  },
  {
    icon: "renovate",
    title: "Je gaat oversluiten of verbouwen",
    body: "Bij het wijzigen van je hypotheek, een verbouwing meefinancieren of het laten vervallen van je NHG-risico-opslag is een actuele waarde nodig.",
  },
  {
    icon: "scale",
    title: "Een scheiding of boedelverdeling",
    body: "Wie blijft er wonen en wat wordt er uitgekocht? Een onafhankelijk rapport haalt de discussie over de waarde uit het gesprek.",
  },
  {
    icon: "doc",
    title: "Een erfenis of nalatenschap",
    body: "De notaris en de Belastingdienst willen weten wat de woning waard was op de peildatum. Wij leveren dat onderbouwd aan.",
  },
];

export type CompareItem = { text: string; included?: boolean };

export type CompareCard = {
  label: string;
  title: string;
  body: string;
  items: CompareItem[];
  cta: { label: string; href: string };
  dark?: boolean;
};

export const TAXATIE_COMPARE_INTRO = {
  eyebrow: "Vaak verward",
  title: "Waardebepaling of taxatie?",
  lead: "Dit is de vraag die we het vaakst krijgen. Het scheelt nogal: de een is gratis en indicatief, de ander is een officieel document waar je bank op vertrouwt. Weet je niet welke je nodig hebt? Bel even, dan zeggen we het je in twee minuten.",
} as const;

export const TAXATIE_COMPARE: CompareCard[] = [
  {
    label: "Gratis",
    title: "Waardebepaling",
    body: "Onze onderbouwde inschatting van wat je woning nu zou opbrengen. Handig als je overweegt te verkopen of gewoon nieuwsgierig bent.",
    items: [
      { text: "Kosteloos en vrijblijvend" },
      { text: "Direct tijdens het gesprek een richtprijs" },
      { text: "Inclusief advies over vraagprijs en strategie" },
      {
        text: "Geen officieel document, niet bruikbaar voor je bank",
        included: false,
      },
    ],
    cta: { label: "Vraag een waardebepaling aan", href: "#" },
  },
  {
    label: "Vast tarief",
    title: "Taxatierapport",
    body: "Een officieel, onafhankelijk rapport volgens landelijke richtlijnen, gevalideerd door het NWWI. Dit is wat je geldverstrekker wil zien.",
    items: [
      { text: "Geaccepteerd door alle banken en verzekeraars" },
      { text: "Woonoppervlak ingemeten volgens NEN 2580" },
      { text: "Inclusief kadaster, fundering, bodem en bestemming" },
      { text: "Meestal binnen een week in je mailbox" },
    ],
    cta: { label: "Vraag een taxatie aan", href: "#" },
    dark: true,
  },
];

export const TAXATIE_STEPS_INTRO = {
  eyebrow: "Zo werkt het",
  title: "Van aanvraag tot gevalideerd rapport",
  lead: "Vijf stappen, meestal binnen een week afgerond. Je hoeft zelf niets voor te bereiden — behalve ons binnenlaten.",
  cta: { label: "Vraag een taxatie aan", href: "#" },
} as const;

export const TAXATIE_STEPS: Step[] = [
  {
    number: "01",
    title: "Aanvraag en afspraak",
    body: "Je belt of mailt met het adres en het doel van de taxatie. Dat laatste is belangrijk: een rapport voor een hypotheek stelt andere eisen dan een rapport voor de Belastingdienst. Je hoort meteen wat het kost en wanneer we langs kunnen komen — vaak nog dezelfde week.",
    image: "/images/taxatie/step-1.jpg",
  },
  {
    number: "02",
    title: "De opname in de woning",
    body: "We nemen de woning ter plekke op: we meten het woonoppervlak in volgens de NEN 2580-norm, kijken naar de ligging, de staat van het onderhoud en de kwaliteit van de gebruikte materialen. Reken op ongeveer een uur. Je hoeft niets op te ruimen — we beoordelen het huis, niet je interieur.",
    image: "/images/taxatie/step-2.jpg",
  },
  {
    number: "03",
    title: "Het onderzoek achter de schermen",
    body: "Daarna volgt het werk dat je niet ziet: we raadplegen het kadaster, doen onderzoek naar de fundering, de bodemgesteldheid en het bestemmingsplan, en zoeken vergelijkbare woningen die recent verkocht zijn. Juist die referentiepanden bepalen uiteindelijk de waarde.",
    image: "/images/taxatie/step-3.jpg",
  },
  {
    number: "04",
    title: "Uitwerken op kantoor",
    body: "Alles komt samen in het rapport: de getaxeerde marktwaarde, de onderbouwing, foto's, plattegronden en de bijzonderheden die we zijn tegengekomen. Wij schrijven op hoe we tot de waarde zijn gekomen, zodat een beoordelaar het kan volgen.",
    image: "/images/taxatie/step-4.jpg",
  },
  {
    number: "05",
    title: "Validatie door het NWWI",
    body: "Het Nederlands Woning Waarde Instituut controleert of de taxatie uniform en volgens de landelijke richtlijnen is opgesteld. Pas na die goedkeuring gaat het rapport naar jou en naar je adviseur. Vanaf dat moment kun je ermee bij elke geldverstrekker terecht.",
    image: "/images/taxatie/step-5.jpg",
  },
];

export const TAXATIE_QUOTE = {
  image: "/images/taxatie/quote.jpg",
  imageAlt: "Een gracht in Haarlem",
  eyebrow: "Een opdrachtgever vertelt",
  quote:
    "Onze hypotheekadviseur zat te wachten op het rapport en de deadline kwam dichtbij. Binnen vijf dagen was het gevalideerd en rond. Geen enkele vraag van de bank achteraf.",
  initials: "RB",
  name: "Rick B.",
  place: "Taxatie voor hypotheekaanvraag, Haarlem",
} as const;

export const TAXATIE_FAQ_INTRO = {
  eyebrow: "Veelgestelde vragen",
  title: "Goed om te weten",
  lead: "Twijfel je of je een taxatie of een waardebepaling nodig hebt? Bel gerust even, dan is het in een paar minuten duidelijk.",
  link: { label: "Stel je vraag", href: "#" },
} as const;

export const TAXATIE_FAQ: FaqItem[] = [
  {
    question: "Wat kost een taxatie?",
    answer:
      "We werken met een vast tarief per rapport, inclusief de validatiekosten van het NWWI. Je hoort het bedrag bij de aanvraag, dus voordat we langskomen — geen nacalculatie en geen verrassingen. Het tarief hangt af van het type woning en het doel van de taxatie. Goed om te weten: taxatiekosten voor een hypotheek zijn in veel gevallen aftrekbaar voor de inkomstenbelasting.",
  },
  {
    question: "Hoe lang duurt het voordat ik het rapport heb?",
    answer:
      "Reken op ongeveer een week vanaf de opname in de woning. De opname zelf duurt een uur, daarna hebben we een paar dagen nodig voor het onderzoek en het uitwerken, en vervolgens gaat het rapport naar het NWWI voor validatie. Heb je haast vanwege een financieringsdeadline? Zeg het erbij, dan kijken we wat er mogelijk is.",
  },
  {
    question: "Accepteert mijn bank jullie rapport?",
    answer:
      "Ja. Doordat het rapport door het NWWI wordt gevalideerd, voldoet het aan de landelijke richtlijnen die alle geldverstrekkers hanteren. Het maakt daardoor niet uit bij welke bank, verzekeraar of intermediair je zit.",
  },
  {
    question: "Kunnen jullie taxeren als jullie mijn huis ook verkopen?",
    answer:
      "Nee, en dat is precies de bedoeling. Een taxateur moet onafhankelijk zijn, dus we mogen geen woning taxeren die we zelf in de verkoop hebben of waarbij we als ",
    link: { href: "#", label: "aankoopmakelaar" },
    afterLink:
      " optreden. In dat geval verwijzen we je door naar een collega-taxateur in de regio die we vertrouwen.",
  },
  {
    question: "Wat heeft een taxatie met mijn energielabel te maken?",
    answer:
      "Meer dan je denkt. Isolatie, zonnepanelen en een warmtepomp verbeteren het energielabel, en dat werkt door in de getaxeerde waarde omdat kopers rekening houden met de energielasten. Heb je recent verduurzaamd? Leg de bonnetjes en het nieuwe label klaar, dan nemen we het mee in de onderbouwing.",
  },
  {
    question: "Moet ik iets voorbereiden voor de afspraak?",
    answer:
      "Niet echt. Handig zijn: de eigendomsakte of het koopcontract, de laatste WOZ-beschikking, het energielabel en eventuele bouwtekeningen of verbouwingsnota's. Heb je die niet bij de hand, dan zoeken wij het meeste zelf op via het kadaster.",
  },
];

export const TAXATIE_REGION = {
  eyebrow: "Ons werkgebied",
  title: "Taxaties in de hele regio",
  lead: "Als taxateur ben je gebonden aan een werkgebied rond je kantoor — en dat is precies wat een taxatie betrouwbaar maakt. Wij taxeren in Haarlem en de omliggende kernen.",
} as const;

export const TAXATIE_REGIONS = [
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

export const TAXATIE_CROSSLINKS = [
  {
    title: "Toch liever eerst verkopen?",
    body: "Gratis waardebepaling bij je thuis, inclusief advies over vraagprijs en strategie.",
    href: "#",
  },
  {
    title: "Wat betekent NVM voor jou?",
    body: "Vaste kwaliteitseisen, actuele marktdata en een geschillenregeling om op terug te vallen.",
    href: "#",
  },
] as const;

export const TAXATIE_CTA = {
  image: "/images/taxatie/cta.jpg",
  imageAlt: "Het Spaarne in Haarlem",
  eyebrow: "Vast tarief, vooraf duidelijk",
  title: "Taxatie nodig? Bel even, dan plannen we het in",
  body: "Vertel ons het adres en waar je het rapport voor nodig hebt. Je hoort meteen wat het kost en wanneer we langs kunnen komen.",
  primary: { label: "Vraag een taxatie aan", href: "#" },
  secondary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
