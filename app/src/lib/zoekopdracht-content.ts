import type { FormDefinition } from "@/lib/form-fields";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/lib/verkoop-content";
import type {
  IconCardItem,
  NumberedStepItem,
  QuoteStripItem,
} from "@/lib/waardebepaling-content";

export const ZOEKOPDRACHT_HERO = {
  image: "/images/zoekopdracht/hero.jpg",
  imageAlt: "Woningen in Haarlem",
  eyebrow: "Gratis zoekopdracht · Haarlem en omstreken",
  titleBefore: "Hoor het ",
  titleEm: "eerder",
  titleAfter: " dan de rest van Funda",
  lead: "Vertel ons waar je naar zoekt, dan houden wij het voor je in de gaten. Ook woningen die stil verkocht worden en nooit online komen. Gratis, en je zit nergens aan vast.",
  usps: [
    "Wij horen via het NVM-netwerk vaak eerder wat er te koop komt",
    "Inclusief stille verkoop die nooit op Funda verschijnt",
    "Ook als je je nog aan het oriënteren bent",
  ],
  score: "9,6",
  scoreLabel: "OP FUNDA",
  reviewCount: "30 woningen",
  reviewNote: "het afgelopen jaar aangekocht voor kopers in deze regio.",
  formTitle: "Maak je zoekopdracht aan",
  formLead: "Twee korte stappen, klaar in een minuut.",
  privacyNote:
    "Je gegevens gaan alleen naar ons. Je kunt je zoekopdracht op elk moment stopzetten, met één mailtje.",
} as const;

export const ZOEKOPDRACHT_FORM_TITLE = "Zoekopdracht";
export const ZOEKOPDRACHT_FORM_ID = "zoekopdracht";

/** Het `form`-document waar de hero naar wijst, in `steps`-modus. */
export const ZOEKOPDRACHT_FORM: FormDefinition & { title: string } = {
  title: ZOEKOPDRACHT_FORM_TITLE,
  id: ZOEKOPDRACHT_FORM_ID,
  mode: "steps",
  nextButtonText: "Verder",
  backButtonText: "Terug naar stap 1",
  submitButtonText: "Maak mijn zoekopdracht aan",
  successTitle: "Gelukt, we gaan voor je meekijken",
  successBody:
    "Je zoekopdracht staat klaar. Zodra er iets voorbijkomt dat past, hoor je het van ons — vaak voordat het op Funda staat.",
  steps: [
    {
      fields: [
        {
          label: "Waar zoek je?",
          name: "plaats",
          type: "select",
          width: "full",
          isRequired: true,
          placeholder: "Maak een keuze",
          selectOptions: [
            "Haarlem",
            "Spaarndam en omgeving",
            "Heemstede of Bloemendaal",
            "Santpoort of Velserbroek",
            "Velsen, Driehuis of IJmuiden",
            "Zandvoort of Aerdenhout",
            "Meerdere plaatsen in de regio",
          ],
        },
        {
          label: "Budget",
          name: "budget",
          type: "select",
          width: "half",
          isRequired: true,
          placeholder: "Maak een keuze",
          selectOptions: [
            "Tot € 400.000",
            "€ 400.000 – € 550.000",
            "€ 550.000 – € 750.000",
            "€ 750.000 – € 1.000.000",
            "Meer dan € 1.000.000",
          ],
        },
        {
          label: "Slaapkamers",
          name: "kamers",
          type: "select",
          width: "half",
          isRequired: true,
          placeholder: "Maak een keuze",
          selectOptions: ["1 of meer", "2 of meer", "3 of meer", "4 of meer"],
        },
      ],
    },
    {
      fields: [
        {
          label: "Naam",
          name: "naam",
          type: "text",
          width: "full",
          isRequired: true,
          placeholder: "Voor- en achternaam",
        },
        {
          label: "E-mailadres",
          name: "mail",
          type: "email",
          width: "half",
          isRequired: true,
          placeholder: "jij@voorbeeld.nl",
        },
        {
          label: "Telefoonnummer",
          name: "tel",
          type: "tel",
          width: "half",
          isRequired: true,
          placeholder: "06 - 12 34 56 78",
        },
        {
          label: "Wanneer wil je verhuizen?",
          name: "termijn",
          type: "select",
          width: "full",
          isRequired: true,
          placeholder: "Maak een keuze",
          selectOptions: [
            "Zo snel mogelijk",
            "Binnen 6 maanden",
            "Ergens dit jaar",
            "Weet ik nog niet, ik oriënteer me",
          ],
        },
        {
          label: "Akkoord",
          name: "akkoord",
          type: "checkbox",
          width: "full",
          isRequired: true,
          checkboxOptions: [
            "Hart & Huis mag contact met me opnemen over mijn aanvraag. Zie de [privacyverklaring](#).",
          ],
        },
      ],
    },
  ],
};

export const ZOEKOPDRACHT_KRIJGT_INTRO = {
  eyebrow: "Wat je krijgt",
  title: "Geen zoekmachine, maar een makelaar die meekijkt",
  lead: "Een Funda-alert stuurt je alles wat er online komt, meestal als tien anderen het al hebben gezien. Wij filteren op wat er echt bij je past — en horen vaak eerder.",
} as const;

export const ZOEKOPDRACHT_KRIJGT: IconCardItem[] = [
  {
    icon: "chart",
    title: "Woningen vóór Funda",
    body: "NVM-makelaars zijn verplicht hun aanbod bij de NVM aan te melden, maar niet om het op Funda te zetten. Via dat netwerk horen we regelmatig van woningen die nog niet online staan.",
  },
  {
    icon: "heart",
    title: "Alleen wat écht past",
    body: "Je krijgt geen dagelijkse lijst met tien woningen. Je hoort van ons als er iets is dat de moeite waard is — en waarom we denken dat het bij je past.",
  },
  {
    icon: "clock",
    title: "Meedenken, geen mailrobot",
    body: "Soms ligt de oplossing in een straat waar je zelf nog niet aan dacht, of in een woning die met een kleine verbouwing precies wordt wat je wilt. Daar denken we in mee.",
  },
];

export const ZOEKOPDRACHT_STAPPEN_INTRO = {
  eyebrow: "Hoe het werkt",
  title: "Zo werkt een zoekopdracht",
  lead: "Vrijblijvend, kosteloos, en je stopt wanneer je wilt. Ook als je uiteindelijk zelf iets vindt.",
} as const;

export const ZOEKOPDRACHT_STAPPEN: NumberedStepItem[] = [
  {
    number: "01",
    title: "Je vertelt wat je zoekt",
    body: "Plaats, budget en het aantal slaapkamers dat je nodig hebt. Binnen één werkdag bellen we je even om scherp te krijgen wat je écht belangrijk vindt.",
  },
  {
    number: "02",
    title: "Wij houden het in de gaten",
    body: "Je zoekopdracht loopt mee in ons dagelijkse werk en in het NVM-netwerk. Komt er iets voorbij dat past, dan hoor je het — met onze eerste indruk erbij.",
  },
  {
    number: "03",
    title: "We gaan samen kijken",
    body: "Wil je een woning bezichtigen, dan gaan we mee. Word je enthousiast, dan kunnen we je ook als aankoopmakelaar begeleiden — maar dat hoeft niet.",
  },
];

export const ZOEKOPDRACHT_WIE = {
  image: "/images/contact/dorien.jpg",
  imageAlt: "Dorien Hollemans van Hart & Huis Makelaardij",
  eyebrow: "Wie er langskomt",
  title: "Dorien kijkt met je mee",
  paragraphs: [
    "Dorien Hollemans is geboren en getogen in Zuid-Kennemerland en werkt al twintig jaar in deze regio. Sinds 2021 met haar eigen kantoor, bewust klein gehouden: je hebt bij Hart & Huis één vast aanspreekpunt van begin tot eind.",
    "Ze is NVM-makelaar én ingeschreven register-taxateur. Bij een bieding betekent dat het verschil tussen gokken en weten: ze bepaalt zelf wat een woning waard is, in plaats van af te gaan op de vraagprijs.",
  ],
  quote:
    "Ik zeg het eerlijk als een woning niet deugt, ook als je er verliefd op bent. Daar heb je op de lange termijn het meeste aan.",
  name: "Dorien Hollemans · NVM Register Makelaar & Taxateur",
} as const;

export const ZOEKOPDRACHT_REVIEWS_INTRO = {
  score: "9,6",
  scoreLabel: "OP FUNDA",
  title: "Wat kopers over ons schrijven",
  lead: "56 beoordelingen uit de afgelopen 24 maanden, rechtstreeks van Funda.",
  link: { label: "Bekijk ons Funda-profiel", href: "#" },
} as const;

export const ZOEKOPDRACHT_REVIEWS: QuoteStripItem[] = [
  {
    quote:
      "Bij het eerste huis dachten wij meteen: bieden. We kregen duidelijk te horen dat we dat beter niet konden doen. Achteraf zijn we daar heel blij mee.",
    score: "10,0",
    meta: "Een koper · juli 2026",
  },
  {
    quote:
      "We zochten al ruim een jaar. Er werd echt gezocht naar wat wij wilden, niet naar wat er toevallig beschikbaar was. Dat maakte het verschil.",
    score: "10,0",
    meta: "Een koper · juni 2026",
  },
  {
    quote:
      "Als starters wisten we niets. Alles werd stap voor stap uitgelegd zonder dat we ons dom voelden. Precies wat we nodig hadden.",
    score: "9,5",
    meta: "Een koper · mei 2026",
  },
];

export const ZOEKOPDRACHT_FAQ_INTRO = {
  eyebrow: "Voordat je het aanvraagt",
  title: "De vragen die iedereen stelt",
  lead: "Kort en eerlijk, zodat je weet waar je aan begint.",
  link: { label: "Stel je vraag", href: "#" },
} as const;

export const ZOEKOPDRACHT_FAQ: FaqItem[] = [
  {
    question: "Is een zoekopdracht echt gratis?",
    answer:
      "Ja. Aan het meekijken en het doorgeven van woningen zitten geen kosten. Schakel je ons later in als aankoopmakelaar, dan betaal je daarvoor courtage — maar dat is een aparte keuze die je pas maakt als je die stap wilt zetten.",
  },
  {
    question: "Zit ik ergens aan vast?",
    answer:
      "Nee. Je kunt je zoekopdracht op elk moment stopzetten met één mailtje. Vind je zelf een woning via Funda? Ook prima — dan feliciteren we je gewoon.",
  },
  {
    question: "Ik oriënteer me nog. Heeft het dan zin?",
    answer:
      "Juist dan. Je krijgt gevoel voor wat er in jouw prijsklasse voorbijkomt en wat realistisch is. En als er onverwacht iets bijzonders langskomt, sta je al op de lijst in plaats van dat je het achteraf op Funda ziet.",
  },
  {
    question: "Wat is het verschil met een Funda-alert?",
    answer:
      "Een Funda-alert stuurt alles wat er online komt, op hetzelfde moment als aan iedereen. Wij kijken naar wat bij jou past en horen via het NVM-netwerk vaak al eerder wat eraan komt. Dat scheelt in een krappe markt zomaar een paar dagen voorsprong.",
  },
  {
    question: "Moet ik jullie ook als aankoopmakelaar inschakelen?",
    answer:
      "Nee, dat staat helemaal los van elkaar. Wil je een woning wel bezichtigen met ons erbij, of wil je dat we de onderhandeling voeren, dan bespreken we vooraf wat dat kost. Je beslist dat pas als er een concrete woning is.",
  },
];

export const ZOEKOPDRACHT_SLOT = {
  eyebrow: "Gratis en zonder verplichtingen",
  title: "Laat ons meezoeken naar jouw huis",
  body: "Vertel waar je naar zoekt, dan hoor je het als eerste zodra er iets voorbijkomt dat past. Duurt een minuut.",
  primary: { label: "Maak je zoekopdracht aan", href: "#formulier" },
  secondary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
