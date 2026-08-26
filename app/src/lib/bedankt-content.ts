/**
 * Copy voor /bedankt — de pagina waar een formulier naartoe stuurt als
 * "Doorsturen na versturen" aanstaat.
 *
 * Bewust met bestaande blocks opgebouwd: `pageHero`, `numberedSteps`,
 * `iconCards`, `crossLinks` en `ctaBand`. Geen nieuwe componenten.
 */
import { SITE } from "@/lib/site";
import type { IconCardItem, NumberedStepItem } from "@/lib/waardebepaling-content";

export const BEDANKT_HERO = {
  image: "/images/contact/kantoor.jpg",
  imageAlt: "Ons kantoor aan de Vergierdeweg in Haarlem",
  breadcrumbLabel: "Bedankt",
  eyebrow: "Je bericht is verstuurd",
  titleBefore: "Bedankt, we hebben je bericht ",
  titleEm: "goed ontvangen",
  lead: "Je hoort binnen één werkdag van ons — meestal een stuk eerder. Heb je haast? Bel gerust, dan pakken we het meteen op.",
  primary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
  secondary: { label: "Bekijk het actuele aanbod", href: "/aanbod" },
} as const;

export const BEDANKT_STAPPEN_INTRO = {
  eyebrow: "Hoe het verdergaat",
  title: "Dit gebeurt er nu",
  lead: "Geen callcenter en geen wachtrij: je bericht komt rechtstreeks bij ons binnen en wordt door ons zelf beantwoord.",
} as const;

export const BEDANKT_STAPPEN: NumberedStepItem[] = [
  {
    number: "01",
    title: "We lezen je bericht",
    body: "Je inzending komt direct in onze mailbox terecht. We nemen hem dezelfde dag door, ook 's avonds.",
  },
  {
    number: "02",
    title: "We nemen contact op",
    body: "Binnen één werkdag bellen of mailen we je, op de manier die jij hebt aangegeven. Even geen tijd? Dan spreken we een moment af dat wel uitkomt.",
  },
  {
    number: "03",
    title: "We komen langs",
    body: "Willen we verder praten, dan plannen we een afspraak bij jou thuis of op ons kantoor. Vrijblijvend en zonder verplichtingen.",
  },
];

export const BEDANKT_ONDERTUSSEN_INTRO = {
  eyebrow: "Ondertussen",
  title: "Alvast even rondkijken",
  lead: "Terwijl je op ons wacht, kun je hier verder — het scheelt straks een hoop uitleg.",
} as const;

export const BEDANKT_ONDERTUSSEN: IconCardItem[] = [
  {
    icon: "house",
    title: "Ons actuele aanbod",
    body: "Alle woningen die we op dit moment in de verkoop hebben, met foto's, plattegronden en de vraagprijs.",
  },
  {
    icon: "heart",
    title: "Wat anderen zeggen",
    body: "Lees de beoordelingen van verkopers en kopers die je voorgingen — ongefilterd, rechtstreeks van Funda.",
  },
  {
    icon: "person",
    title: "Wie je straks spreekt",
    body: "Twee makelaars, geen tussenlagen. Op onze over-onspagina zie je precies wie er langskomt.",
  },
];

export const BEDANKT_CROSSLINKS = [
  {
    title: "Je woning verkopen",
    body: "Van gratis waardebepaling tot de sleuteloverdracht, met één vast aanspreekpunt.",
    href: "/verkoop",
  },
  {
    title: "Een woning zoeken",
    body: "Meld je aan voor een gratis zoekopdracht en hoor het als eerste — ook bij stille verkoop.",
    href: "/zoekopdracht",
  },
  {
    title: "Wat is je huis waard?",
    body: "Een onderbouwde waardebepaling, bij je thuis en zonder kosten.",
    href: "/waardebepaling",
  },
] as const;

export const BEDANKT_CTA = {
  image: "/images/cta-office.jpg",
  imageAlt: "Het kantoor van Hart & Huis",
  eyebrow: "Liever meteen iemand spreken?",
  title: "Bel ons gerust even",
  body: "Zit je met een vraag die niet kan wachten, of wil je liever direct een afspraak maken? Dan zijn we op werkdagen gewoon bereikbaar.",
  primary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
  secondary: { label: `Mail ${SITE.email}`, href: SITE.emailHref },
} as const;
