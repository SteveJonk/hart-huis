import { SITE } from "@/lib/site";
import type { Fact, FaqItem } from "@/lib/verkoop-content";
import type { IconCardItem } from "@/lib/waardebepaling-content";
import {
  HAARLEM_CTA,
  HAARLEM_DIENSTEN,
  HAARLEM_DIENSTEN_INTRO,
  HAARLEM_FACTS,
  HAARLEM_FACTS_NOTE,
  HAARLEM_FAQ,
  HAARLEM_FAQ_INTRO,
  HAARLEM_HERO,
  HAARLEM_INTRO,
  HAARLEM_OMGEVING,
  HAARLEM_OMGEVING_INTRO,
  HAARLEM_QUOTE,
  HAARLEM_SEO,
  HAARLEM_WIJKEN,
  HAARLEM_WIJKEN_INTRO,
} from "@/lib/haarlem-content";

// Copy voor /werkgebied/<slug>, één object per plaats volgens het stad-template
// (`example-designs/!stad-haarlem.html`). `facts` en `quote` zijn optioneel:
// zonder echte marktcijfers of een echte klantquote laat de seed dat blok weg.

type Intro = { eyebrow: string; title: string; lead?: string };

export type Werkgebied = {
  slug: string;
  title: string;
  seo: { title: string; description: string };
  hero: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    lead: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  };
  facts?: { items: Fact[]; note: string };
  intro: Intro & { paragraphs: string[]; image: { src: string; alt: string } };
  dienstenIntro: Intro & { lead: string };
  diensten: Required<IconCardItem>[];
  wijkenIntro: Intro & { lead: string };
  wijken: readonly string[];
  quote?: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    quote: string;
    initials: string;
    name: string;
    place: string;
  };
  faqIntro: Intro & { lead: string; link: { label: string; href: string } };
  faq: FaqItem[];
  omgevingIntro: Intro & { lead: string };
  omgeving: readonly string[];
  cta: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    body: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

const HAARLEM: Werkgebied = {
  slug: "haarlem",
  title: "Haarlem",
  seo: HAARLEM_SEO,
  hero: HAARLEM_HERO,
  facts: { items: HAARLEM_FACTS, note: HAARLEM_FACTS_NOTE },
  intro: {
    ...HAARLEM_INTRO,
    paragraphs: [
      "Haarlem is een stad met karakter en een grote verscheidenheid aan woningen. Van monumentale grachtenpanden en sfeervolle hofjes in de historische binnenstad tot karakteristieke jaren-30-woningen in Kleverpark en ruime gezinswoningen in Haarlem-Noord en Haarlem-Zuid. Iedere wijk heeft zijn eigen uitstraling en dat zie je ook terug op de lokale woningmarkt.",
      "De combinatie van historische charme, groene woonwijken, uitstekende voorzieningen en de nabijheid van strand en duinen maakt Haarlem een geliefde plek om te wonen. Als NVM-makelaar kennen we Haarlem en de verschillende wijken goed. We weten wat er speelt op de lokale woningmarkt en wat dat betekent voor de verkoop van jouw woning. Met persoonlijke aandacht, lokale marktkennis en een doordachte verkoopstrategie halen we samen het beste uit de verkoop.",
    ],
  },
  dienstenIntro: HAARLEM_DIENSTEN_INTRO,
  diensten: HAARLEM_DIENSTEN,
  wijkenIntro: HAARLEM_WIJKEN_INTRO,
  wijken: HAARLEM_WIJKEN,
  quote: HAARLEM_QUOTE,
  faqIntro: HAARLEM_FAQ_INTRO,
  faq: HAARLEM_FAQ,
  omgevingIntro: HAARLEM_OMGEVING_INTRO,
  omgeving: HAARLEM_OMGEVING,
  cta: HAARLEM_CTA,
};

const SPAARNDAM: Werkgebied = {
  slug: "spaarndam",
  title: "Spaarndam",
  seo: {
    title: "Makelaar in Spaarndam",
    description: `Makelaar in Spaarndam voor verkoop, aankoop en taxatie. Dorien Hollemans kent het dorp, de dijkwoningen en de lokale markt, met een ${SITE.fundaScore} op Funda.`,
  },
  hero: {
    // ponytail: nog geen eigen Spaarndam-foto's; vervangen in de studio zodra die er zijn.
    image: "/images/over-ons/spaarne.jpg",
    imageAlt: "Woningen aan het water langs het Spaarne",
    eyebrow: "NVM-makelaar in Spaarndam",
    titleBefore: "Je makelaar in ",
    titleEm: "Spaarndam",
    titleAfter: ", aan het water en aan de dijk",
    lead: "Verkopen, kopen of taxeren in Spaarndam? Dorien Hollemans kent het dorp van binnenuit — van de historische kern in Spaarndam-West tot de gezinswoningen in Spaarndam-Oost. Persoonlijk, betrokken en met twintig jaar marktkennis in de regio.",
    primary: { href: "/waardebepaling", label: "Gratis waardebepaling" },
    secondary: { href: SITE.phoneHref, label: SITE.phone },
  },
  intro: {
    eyebrow: "Makelaar met kennis van Spaarndam",
    title: "Een dorp met een eigen karakter",
    paragraphs: [
      "Spaarndam is een dorp met een bijzonder karakter. Met zijn historische dorpskern, karakteristieke dijkwoningen en ligging aan het water heeft het een geheel eigen uitstraling. In Spaarndam-West vind je sfeervolle historische woningen en smalle straatjes, terwijl Spaarndam-Oost een gevarieerd aanbod aan gezinswoningen en moderne woonwijken biedt.",
      "De combinatie van dorps wonen, water, natuur en de nabijheid van Haarlem maakt Spaarndam een geliefde woonomgeving. Als NVM-makelaar kennen we Spaarndam en de lokale woningmarkt goed. We weten wat de verschillende buurten bijzonder maakt en helpen je graag bij het verkopen van jouw woning. Met persoonlijke aandacht, lokale kennis en een doordachte verkoopstrategie halen we samen het beste uit de verkoop.",
    ],
    image: HAARLEM_INTRO.image,
  },
  dienstenIntro: {
    eyebrow: "Wat we in Spaarndam doen",
    title: "Verkoop, aankoop en taxatie — allemaal in Spaarndam",
    lead: "Of je nu je huis verkoopt, een woning zoekt of een taxatierapport nodig hebt: je hebt één vast aanspreekpunt dat het dorp kent.",
  },
  diensten: [
    {
      icon: "house",
      title: "Je woning verkopen in Spaarndam",
      body: "Een historische dijkwoning vraagt om een andere presentatie dan een gezinswoning in Spaarndam-Oost. Wij zorgen voor een scherpe vraagprijs, een sterke presentatie en onderhandelen stevig voor je.",
      cta: { label: "Verkopen in Spaarndam", href: "/verkoop" },
    },
    {
      icon: "search",
      title: "Een woning kopen in Spaarndam",
      body: "In een klein dorp komt niet veel te koop. Wij zoeken mee, gaan mee naar bezichtigingen en horen via ons netwerk vaak eerder wat er vrijkomt.",
      cta: { label: "Kopen in Spaarndam", href: "/aankoop" },
    },
    {
      icon: "doc",
      title: "Je woning in Spaarndam taxeren",
      body: "Een gevalideerd NWWI-taxatierapport voor je hypotheek, scheiding of erfenis. Opgesteld door een register-taxateur die Spaarndam kent.",
      cta: { label: "Taxatie in Spaarndam", href: "/taxatie" },
    },
  ],
  wijkenIntro: {
    eyebrow: "Overal in het dorp",
    title: "Actief in heel Spaarndam",
    lead: "Van de smalle straatjes in de oude kern tot de nieuwere woonwijken: we weten wat elke buurt bijzonder maakt en wat kopers er zoeken.",
  },
  wijken: ["Historische dorpskern", "Spaarndam-West", "Spaarndam-Oost", "Langs de dijk"],
  faqIntro: {
    eyebrow: "Veelgestelde vragen",
    title: "Makelaar in Spaarndam",
    lead: "De vragen die we het vaakst krijgen uit Spaarndam. Staat je vraag er niet bij? Bel of app gerust.",
    link: { label: "Stel je vraag", href: "/contact" },
  },
  faq: [
    {
      question: "Wat is mijn huis in Spaarndam waard?",
      answer:
        "Dat hangt sterk af van de ligging, het bouwjaar en de staat van je woning — een monumentale dijkwoning in de oude kern is een heel andere markt dan een gezinswoning in Spaarndam-Oost. Een gratis waardebepaling bij je thuis geeft je een concreet, onderbouwd bedrag. Dorien komt langs, kijkt rond en vertelt je nog tijdens het gesprek wat haalbaar is.",
    },
    {
      question: "Hoe snel verkoop ik mijn woning in Spaarndam?",
      answer:
        "Spaarndam is klein en er komt weinig te koop, dus een goed gepresenteerde woning trekt al snel belangstelling — ook van kopers uit Haarlem en Amsterdam die dorps willen wonen. Bij de kennismaking geven we je een realistische verwachting voor jouw woning.",
    },
    {
      question: "Werken jullie in heel Spaarndam?",
      answer:
        "Ja, in Spaarndam-West en Spaarndam-Oost, en ook in de omliggende plaatsen. We kennen de bijzonderheden van het dorp: wat een woning aan het water extra waard is, waar kopers op letten bij een historisch pand en wat er speelt in de nieuwere wijken.",
    },
    {
      question: "Wat kost een makelaar in Spaarndam?",
      answer:
        "De courtage verschilt per traject en per woning. Bij ons hoor je bij de gratis kennismaking precies wat je betaalt en waarvoor, inclusief fotografie en plattegronden. Geen pakketten met kleine lettertjes en je zit nergens aan vast voordat je de opdracht ondertekent.",
    },
    {
      question: "Kunnen jullie ook helpen bij aankoop in Spaarndam?",
      answer:
        "Zeker. Omdat er in Spaarndam maar weinig woningen te koop komen, is het belangrijk om er vroeg bij te zijn. We zoeken actief mee, gaan mee naar bezichtigingen en onderhandelen scherp — en via het NVM-netwerk horen we regelmatig van woningen voordat ze op Funda staan.",
    },
  ],
  omgevingIntro: {
    eyebrow: "Ons werkgebied",
    title: "Ook makelaar in de omgeving",
    lead: "Verkopen of kopen net buiten Spaarndam? We zijn actief in de hele regio Zuid-Kennemerland en de IJmond.",
  },
  omgeving: [
    "Haarlem",
    "Haarlemmerliede",
    "Halfweg",
    "Velsen",
    "Santpoort",
    "Velserbroek",
    "IJmuiden",
    "Heemstede",
    "Bloemendaal",
    "Zandvoort",
  ],
  cta: {
    ...HAARLEM_CTA,
    imageAlt: "Woningen aan het water",
    title: "Benieuwd wat jouw woning in Spaarndam opbrengt?",
    body: "We komen langs, lopen door je huis en vertellen je eerlijk wat haalbaar is in Spaarndam. Ook als je pas over een jaar wilt verkopen.",
  },
};

export const WERKGEBIEDEN: Werkgebied[] = [HAARLEM, SPAARNDAM];

/** Link naar de werkgebiedpagina van een plaats, of `#` als die er (nog) niet is. */
export function werkgebiedHref(plaats: string) {
  const match = WERKGEBIEDEN.find((w) => w.title === plaats);
  return match ? `/werkgebied/${match.slug}` : "#";
}
