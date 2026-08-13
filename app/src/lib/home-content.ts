export type HeroSlide = {
  src: string;
  alt: string;
};

export type IntroFact = {
  value: string;
  label: string;
};

export type ServiceCard = {
  href: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  delay?: 1 | 2 | 3;
};

export type Review = {
  quote: string;
  name: string;
};

export type Listing = {
  href: string;
  status: string;
  sold?: boolean;
  place: string;
  title: string;
  meta: string;
  price: string;
  image: string;
  imageAlt: string;
  delay?: 1 | 2 | 3;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/hero-1.jpg",
    alt: "Makelaars van Hart & Huis onderweg in Haarlem",
  },
  {
    src: "/images/hero-2.jpg",
    alt: "Het Spaarne in Haarlem",
  },
  {
    src: "/images/hero-3.jpg",
    alt: "Hart & Huis voor een woning in Haarlem",
  },
];

export const INTRO_FACTS: IntroFact[] = [
  { value: "420+", label: "woningen verkocht in de regio" },
  { value: "98%", label: "verkocht boven de vraagprijs" },
  { value: "21", label: "dagen gemiddelde looptijd" },
];

export const SERVICES: ServiceCard[] = [
  {
    href: "#",
    label: "Verkoop",
    title: "Je huis verkopen",
    description:
      "Een scherpe vraagprijs, sterke presentatie en een makelaar die stevig voor je onderhandelt. Zonder ruis, met een strak plan.",
    image: "/images/dienst-verkoop.jpg",
    imageAlt: "Verkoop van je woning",
  },
  {
    href: "#",
    label: "Aankoop",
    title: "Je huis vinden",
    description:
      "Wij zien woningen vaak eerder dan Funda. Meld je aan voor een gratis zoekopdracht en wees er als eerste bij — ook bij stille verkoop.",
    image: "/images/dienst-aankoop.jpg",
    imageAlt: "Aankoopbegeleiding",
    delay: 1,
  },
  {
    href: "#",
    label: "Taxatie",
    title: "Je huis laten taxeren",
    description:
      "Een gevalideerd NWWI-taxatierapport voor je hypotheek, erfenis of scheiding. Meestal binnen vijf werkdagen in je mailbox.",
    image: "/images/dienst-taxatie.jpg",
    imageAlt: "Taxatie van je woning",
    delay: 2,
  },
];

export const REVIEWS: Review[] = [
  {
    quote:
      "Vanaf het eerste gesprek voelde het goed. Er werd echt geluisterd naar wat wij zochten, en niet naar wat er toevallig te koop stond.",
    name: "Marloes B.",
  },
  {
    quote:
      "Scherp in de onderhandeling en rustig als wij het even niet meer wisten. Precies de combinatie die je nodig hebt in deze markt.",
    name: "Peter & Ans",
  },
  {
    quote:
      "Als starters wisten we helemaal niets. Alles werd stap voor stap uitgelegd, zonder dat we ons dom voelden. Aanrader.",
    name: "Youssef E.",
  },
  {
    quote:
      "Ons huis stond na tien dagen verkocht, ruim boven de vraagprijs. De styling en de foto's maakten echt het verschil.",
    name: "Familie de Wit",
  },
];

export const LISTINGS: Listing[] = [
  {
    href: "#",
    status: "Beschikbaar",
    place: "Haarlem — Centrum",
    title: "Spaarne 42",
    meta: "128 m² · 4 kamers",
    price: "€ 695.000",
    image: "/images/listing-1.jpg",
    imageAlt: "Woning aan het Spaarne",
  },
  {
    href: "#",
    status: "Open huis za.",
    place: "Haarlem — Burgwal",
    title: "Bakenessergracht 9",
    meta: "96 m² · 3 kamers",
    price: "€ 549.000",
    image: "/images/listing-2.jpg",
    imageAlt: "Woning aan de gracht",
    delay: 1,
  },
  {
    href: "#",
    status: "Verkocht",
    sold: true,
    place: "Haarlem — Kleverpark",
    title: "Kleverlaan 118",
    meta: "142 m² · 5 kamers",
    price: "€ 875.000",
    image: "/images/listing-3.jpg",
    imageAlt: "Woning in het centrum van Haarlem",
    delay: 2,
  },
];
