import { SITE } from "@/lib/site";

export type Image = { src: string; alt: string };

export const OVER_ONS_OPENER = {
  eyebrow: "Over ons",
  title: "Wat leuk dat je even ",
  titleEm: "wilt kennismaken",
  lead: "Ik ben Dorien Hollemans, geboren en getogen in Zuid-Kennemerland. Na twintig jaar in het makelaarsvak begon ik in mei 2021 voor mezelf: een eigen kantoor waar ik mensen op mijn eigen manier kan helpen. Persoonlijk, betrokken en zonder dat je een nummer wordt.",
  motto: "“Alleen ga je sneller, samen kom je verder.”",
  attribution: "Dorien Hollemans · NVM Register Makelaar & Taxateur",
} as const;

export const OVER_ONS_DUO = {
  image: {
    src: "/images/over-ons/portret.jpg",
    alt: "Dorien Hollemans van Hart & Huis Makelaardij",
  },
  stampValue: "2021",
  stampLabel: "EIGEN KANTOOR",
  secondaryImage: {
    src: "/images/over-ons/kantoor.jpg",
    alt: "Het kantoor van Hart & Huis aan de Vergierdeweg in Haarlem",
  },
  caption:
    "Ons kantoor aan de Vergierdeweg in Haarlem-Noord. Je herkent het aan de etalage met het actuele aanbod — loop gerust binnen.",
} as const;

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
  image?: Image;
};

export const OVER_ONS_TIMELINE_INTRO = {
  eyebrow: "Mijn verhaal",
  title: "Van kandidaat-makelaar naar eigen kantoor",
  lead: "Ik ben niet in dit vak gerold omdat het moest, maar omdat ik het gewoon leuk vind. Hoe dat is gegaan, in vier stappen.",
} as const;

export const OVER_ONS_TIMELINE: TimelineItem[] = [
  {
    year: "Vanaf 2005",
    title: "Leren in Haarlem en Amsterdam",
    body: "Ik begon als kandidaat-makelaar en werkte een aantal jaren in de regio Haarlem en in Amsterdam. Twee heel verschillende markten, en juist daardoor een goede leerschool. Ik merkte snel dat ik het contact met mensen het mooiste deel van het werk vond.",
  },
  {
    year: "2018",
    title: "Register Makelaar en Taxateur",
    body: "Ik wilde meer, dus ging ik er in de avonduren voor leren. In 2018 haalde ik de vaktest en mocht ik me Register Makelaar en Taxateur noemen. Voor mij echt de kers op de taart — en het betekent dat ik ook zelf de waarde van een woning kan bepalen in plaats van erop te moeten vertrouwen.",
  },
  {
    year: "Mei 2021",
    title: "Hart & Huis Makelaardij",
    body: "Op 1 mei 2021 opende ik mijn eigen kantoor. Een droom die uitkwam: eindelijk de ruimte om het op mijn manier te doen. Klein genoeg om iedereen persoonlijk te kennen, groot genoeg om het hele traject uit handen te nemen. Ik heb er elke dag plezier in.",
  },
  {
    year: "Nu",
    title: "Verbindingsmakelaar in de regio",
    body: "Inmiddels ken ik Haarlem, Spaarndam, Velsen en de dorpen eromheen als mijn broekzak — en veel mensen die er wonen ook. Dat netwerk is precies waar je als koper of verkoper iets aan hebt: ik hoor vaak eerder dan Funda wat er gaat gebeuren.",
    image: {
      src: "/images/over-ons/haarlem-straat.jpg",
      alt: "Een straat in het centrum van Haarlem",
    },
  },
];

export type ValueCard = {
  icon: "heart" | "rings" | "lines";
  title: string;
  body: string;
};

export const OVER_ONS_VALUES_INTRO = {
  eyebrow: "Waar ik in geloof",
  title: "Drie dingen waar ik niet van afwijk",
  lead: "Iedere makelaar zegt dat hij persoonlijk en betrokken is. Dit is wat ik daar concreet mee bedoel.",
} as const;

export const OVER_ONS_VALUES: ValueCard[] = [
  {
    icon: "heart",
    title: "Een huis moet goed voelen",
    body: "Het gevoel gaat voorop. Klopt dat, dan gaan we kijken of het huis ook echt past en of het bouwtechnisch in elkaar zit. In die volgorde — nooit andersom.",
  },
  {
    icon: "rings",
    title: "Het is een samenwerking",
    body: "Ik wil weten wie je bent en wat je bezighoudt. Niet uit nieuwsgierigheid, maar omdat we samen tot een beter resultaat komen dan wanneer ik alleen een woning in de markt zet.",
  },
  {
    icon: "lines",
    title: "Eerlijk, ook als het niet leuk is",
    body: "Soms raad ik een woning af waar je enthousiast over bent, of noem ik een vraagprijs die lager is dan je hoopte. Daar heb je meer aan dan aan iemand die je naar de mond praat.",
  },
];

export const OVER_ONS_BUITEN = {
  eyebrow: "Buiten het werk",
  title: "Werk en privé lopen bij mij door elkaar",
  paragraphs: [
    "Makelaar ben je eigenlijk zeven dagen per week, en dat vind ik prima. Het houdt me juist in balans — ik hoef niet te doen alsof ik om vijf uur een andere persoon word.",
    "In mijn vrije tijd ben ik graag buiten: sporten, wandelen of fietsen door de omgeving die ik ook beroepsmatig zo goed ken. Verder hou ik van een borrel of uit eten gaan, af en toe een stedentrip, en het liefst van alles: er met mijn dochter op uit.",
    "Heb je woonvragen waar je eens over van gedachten wilt wisselen? Bel of app gewoon. Ook als er nog helemaal geen plan is.",
  ],
  cta: { label: "Even kennismaken", href: "#" },
  image: {
    src: "/images/over-ons/spaarne.jpg",
    alt: "Het Spaarne in Haarlem",
  },
} as const;

export type Assurance = { title: string; body: string };

export const OVER_ONS_ASSURANCES_INTRO = {
  eyebrow: "Papieren en specialismen",
  title: "Waar je op kunt rekenen",
  lead: "Persoonlijk is prettig, maar je wilt ook weten dat de kennis erachter zit. Dit staat er zwart op wit.",
} as const;

export const OVER_ONS_ASSURANCES: Assurance[] = [
  {
    title: "NVM Register Makelaar",
    body: "Aangesloten bij de grootste makelaarsvereniging van Nederland, met vaste kwaliteitseisen en een geschillenregeling.",
  },
  {
    title: "Taxateur via NRVT",
    body: "Ingeschreven in het Nederlands Register Vastgoed Taxateurs, dus gevalideerde taxatierapporten via het NWWI.",
  },
  {
    title: "VastgoedCert",
    body: "Gecertificeerd en periodiek getoetst op vakbekwaamheid in de categorie Wonen.",
  },
  {
    title: "Specialisatie veilingen",
    body: "Een van de weinige kantoren in de regio die kopers begeleidt bij veilingaankopen — een traject met heel andere regels.",
  },
  {
    title: "Twintig jaar in deze regio",
    body: "Zuid-Kennemerland van binnenuit: welke straat, welk bouwjaar, welke fundering en welke prijs realistisch is.",
  },
  {
    title: "Nederlands en Engels",
    body: "Ook als je vanuit het buitenland naar Haarlem verhuist, kunnen we het hele traject in het Engels doen.",
  },
];

export const OVER_ONS_CTA = {
  image: { src: "/images/over-ons/cta.jpg", alt: "Een straat in Haarlem" },
  eyebrow: "Vrijblijvend en zonder verplichtingen",
  title: "Ik kijk ernaar uit je te ontmoeten",
  body: "Of je nu wilt verkopen, iets zoekt, of gewoon eens wilt sparren over wat verstandig is — loop binnen, bel of app. De koffie staat klaar.",
  primary: { label: "Plan een kennismaking", href: "#" },
  secondary: { label: SITE.phone, href: SITE.phoneHref },
} as const;
