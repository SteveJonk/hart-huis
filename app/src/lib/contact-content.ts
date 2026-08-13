import { SITE } from "@/lib/site";

/** Icons shared by the contact cards and the form aside. */
export type ContactIconName = "phone" | "whatsapp" | "mail" | "pin";

export const CONTACT_HERO = {
  breadcrumbLabel: "Contact",
  eyebrow: "Contact",
  title: "Loop binnen, bel of ",
  titleEm: "app ons",
  lead: "Je hoeft nog nergens toe besloten te hebben. Twijfel je over verkopen, wil je weten wat je huis waard is of heb je één korte vraag — bel gerust. De koffie staat sowieso klaar.",
  primary: { label: "Plan een kennismaking", href: "#" },
  secondary: { label: SITE.phone, href: SITE.phoneHref },
  image: {
    src: "/images/contact/kantoor.jpg",
    alt: "Het kantoor van Hart & Huis Makelaardij aan de Vergierdeweg in Haarlem",
  },
} as const;

export type ContactWay = {
  icon: ContactIconName;
  title: string;
  body: string;
  value: string;
  note: string;
  href: string;
};

export const CONTACT_WAYS: ContactWay[] = [
  {
    icon: "phone",
    title: "Bellen",
    body: "Het snelst. Meestal krijg je Dorien meteen aan de lijn.",
    value: SITE.phone,
    note: "Ma t/m vr, 09:00 – 17:30",
    href: SITE.phoneHref,
  },
  {
    icon: "whatsapp",
    title: "Appen",
    body: "Even een foto of een korte vraag sturen? Prima, dat leest ook 's avonds.",
    value: "06 - 476 87 321",
    note: "Meestal binnen een uur antwoord",
    href: SITE.whatsappHref,
  },
  {
    icon: "mail",
    title: "Mailen",
    body: "Handig als je documenten of een uitgebreide vraag wilt sturen.",
    value: SITE.email,
    note: "Reactie binnen één werkdag",
    href: SITE.emailHref,
  },
  {
    icon: "pin",
    title: "Langskomen",
    body: "Zonder afspraak welkom. Voor de deur kun je gratis parkeren.",
    value: SITE.address[0],
    note: SITE.address[1],
    href: "#",
  },
];

export const CONTACT_PERSON = {
  image: {
    src: "/images/contact/dorien.jpg",
    alt: "Dorien Hollemans van Hart & Huis Makelaardij",
  },
  eyebrow: "Wie je spreekt",
  title: "Geen callcenter, gewoon Dorien",
  body: "Bij Hart & Huis heb je één aanspreekpunt van begin tot eind. Geen wisselende contactpersonen die je verhaal opnieuw moeten lezen, en geen assistent die terugbelt. Wil je Dorien liever direct? Hieronder staat haar mobiele nummer.",
  person: {
    initials: "DH",
    name: "Dorien Hollemans",
    role: "NVM-makelaar & taxateur · 20 jaar in de regio",
    links: [
      { label: "06 - 476 87 321", href: "tel:0647687321" },
      { label: "Mail", href: SITE.emailHref },
      { label: "App", href: SITE.whatsappHref },
    ],
  },
} as const;

export const CONTACT_FORM = {
  eyebrow: "Stuur een bericht",
  title: "Liever eerst even schrijven?",
  lead: "Vertel kort waar het over gaat, dan bellen of mailen we je terug. Je zit nergens aan vast en we zetten je niet op een lijst.",
  note: "We reageren binnen één werkdag — vaak eerder.",
  successTitle: "Bedankt, je bericht staat bij ons klaar",
  successBody: `Dorien neemt binnen één werkdag contact met je op. Heb je haast? Bel gerust even op ${SITE.phone}.`,
  aside: {
    title: "Liever direct contact?",
    body: "Sommige dingen bespreek je makkelijker even in het echt dan per mail.",
    items: [
      {
        icon: "phone" as ContactIconName,
        title: SITE.phone,
        subtitle: "Ma t/m vr, 09:00 – 17:30",
      },
      {
        icon: "mail" as ContactIconName,
        title: SITE.email,
        subtitle: "Binnen één werkdag antwoord",
      },
      {
        icon: "pin" as ContactIconName,
        title: SITE.address[0],
        subtitle: SITE.address[1],
      },
    ],
    cta: { label: "App ons direct", href: SITE.whatsappHref },
  },
} as const;

/**
 * Seeded into the plugin's `contactForm` document. Field names end up as the
 * keys in the notification email, so keep them stable.
 */
export const CONTACT_FORM_FIELDS = [
  {
    label: "Naam",
    name: "naam",
    type: "text",
    isRequired: true,
    placeholder: "Voor- en achternaam",
  },
  {
    label: "Telefoonnummer",
    name: "telefoon",
    type: "tel",
    isRequired: false,
    placeholder: "06 - 12 34 56 78",
  },
  {
    label: "E-mailadres",
    name: "email",
    type: "email",
    isRequired: true,
    placeholder: "jij@voorbeeld.nl",
  },
  {
    label: "Waar gaat het over?",
    name: "onderwerp",
    type: "select",
    isRequired: false,
    selectOptions: [
      "Ik wil mijn woning verkopen",
      "Ik zoek een woning",
      "Ik heb een taxatie nodig",
      "Ik wil een woning bezichtigen",
      "Iets anders",
    ],
  },
  {
    label: "Je bericht",
    name: "bericht",
    type: "textarea",
    isRequired: false,
    placeholder: "Waar kunnen we je mee helpen?",
  },
  {
    label: "Akkoord",
    name: "akkoord",
    type: "checkbox",
    isRequired: true,
    checkboxOptions: [
      "Ik ga ermee akkoord dat Hart & Huis mijn gegevens gebruikt om contact met me op te nemen. Meer hierover in de [privacyverklaring](/privacy).",
    ],
  },
] as const;

export const CONTACT_FORM_TITLE = "Contactformulier";

export const CONTACT_ROUTE = {
  eyebrow: "Route en openingstijden",
  title: "Je vindt ons in Haarlem-Noord",
  lead: "Ons kantoor zit aan de Vergierdeweg, op loopafstand van de Kleverparkbuurt. Je herkent het aan de etalage met het actuele aanbod.",
  columns: [
    {
      title: "Openingstijden",
      body: "Maandag t/m vrijdag\n09:00 – 17:30\n\nZaterdag op afspraak\nZondag gesloten",
    },
    {
      title: "Bereikbaarheid",
      body: "Gratis parkeren voor de deur\nBus 3 en 73, halte Vergierdeweg\n15 minuten fietsen vanaf station Haarlem",
    },
  ],
  cta: { label: "Open in Google Maps", href: "#" },
  image: { src: "/images/contact/straat.jpg", alt: "Een straat in Haarlem" },
} as const;

export const CONTACT_CROSSLINKS = [
  {
    title: "Wat is mijn huis waard?",
    body: "Gratis waardebepaling bij je thuis, ook als je pas over een jaar wilt verkopen.",
    href: "#",
  },
  {
    title: "Op zoek naar een woning?",
    body: "Meld je aan voor een gratis zoekopdracht en wees er eerder bij dan Funda.",
    href: "#",
  },
] as const;
