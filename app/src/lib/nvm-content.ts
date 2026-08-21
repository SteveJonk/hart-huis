import { SITE } from "@/lib/site";
import type { Benefit, Fact, FaqItem } from "@/lib/verkoop-content";
import type { CompareCard } from "@/lib/taxatie-content";
import type { IconCardItem } from "@/lib/waardebepaling-content";
import type { WerkwijzeItem } from "@/components/blocks/Werkwijze";

export const NVM_HERO = {
  image: "/images/nvm/pagehero.jpg",
  imageAlt: "Grachtenpanden in het centrum van Haarlem",
  eyebrow: "Aangesloten bij de Nederlandse Vereniging van Makelaars",
  titleBefore: "Iedereen mag zich makelaar noemen. ",
  titleEm: "Niet iedereen mag NVM-makelaar heten.",
  lead: "Makelaar is in Nederland geen beschermd beroep — je hebt er geen diploma voor nodig. Het NVM-lidmaatschap is dat wel: strenge opleidingseisen, verplichte bijscholing, een erecode en tuchtrecht. Dit is wat dat voor jou betekent.",
  primary: { label: "Plan een kennismaking", href: "#" },
  secondary: { label: SITE.phone, href: SITE.phoneHref },
} as const;

export const NVM_FACTS: Fact[] = [
  {
    value: "4.000+",
    label: "aangesloten makelaars — de grootste vereniging van Nederland",
  },
  {
    value: "Erecode",
    label: "bindende gedragsregels waarin jouw belang voorop staat",
  },
  {
    value: "Tuchtrecht",
    label: "een onafhankelijk college waar je terechtkunt bij een geschil",
  },
];

export const NVM_BENEFITS_IMAGE = {
  src: "/images/nvm/kantoor.jpg",
  alt: "Het kantoor van Hart & Huis Makelaardij in Haarlem",
};

export const NVM_BENEFITS_INTRO = {
  eyebrow: "Wat is de NVM",
  title: "Een keurmerk waar je iets aan hebt",
  lead: "De NVM is een netwerk van makelaars die voldoen aan strenge opleidings- en kwaliteitseisen. Voor ons betekent dat werk: bijscholen, een erecode naleven en ons laten controleren. Voor jou betekent het zekerheid.",
} as const;

export const NVM_BENEFITS: Benefit[] = [
  {
    icon: "diploma",
    title: "Bewezen vakkennis",
    body: "Je wordt geen lid zonder de juiste diploma's, en je blijft geen lid zonder je jaarlijks bij te scholen op markt, wet- en regelgeving.",
  },
  {
    icon: "shield",
    title: "De NVM-Erecode",
    body: "Bindende gedragsregels waarin het belang van de klant voorop staat. Houden we ons er niet aan, dan kun je dat laten toetsen.",
  },
  {
    icon: "chart",
    title: "Toegang tot de marktdata",
    body: "Wij zien de werkelijke transactiecijfers van de regio, niet alleen de vraagprijzen op Funda. Dat maakt onze waardebepaling scherper.",
  },
  {
    icon: "mail",
    title: "Verplicht verzekerd",
    body: "Elk lid moet zich goed verzekeren. Gaat er onverhoopt iets mis, dan loop jij geen financieel risico door onze fout.",
  },
];

export const NVM_PRAKTIJK_INTRO = {
  eyebrow: "In de praktijk",
  title: "Wat merk jij er concreet van?",
  lead: "Een keurmerk is pas iets waard als je het terugziet in hoe er met je wordt omgegaan. Zes dingen die direct met ons NVM-lidmaatschap te maken hebben.",
} as const;

export const NVM_PRAKTIJK: IconCardItem[] = [
  {
    icon: "search",
    title: "Je ziet meer aanbod",
    body: "Elke NVM-makelaar is verplicht zijn woningaanbod bij de NVM aan te melden, maar niet om het op Funda te zetten. Wij zien daardoor woningen die jij online nog niet kunt vinden.",
  },
  {
    icon: "scale",
    title: "Nooit twee heren dienen",
    body: "Wij mogen niet tegelijk voor de koper en de verkoper van dezelfde woning werken. Je weet dus altijd zeker aan welke kant van de tafel wij zitten: die van jou.",
  },
  {
    icon: "chart",
    title: "Een prijs met onderbouwing",
    body: "Via het NVM-systeem zien we wat vergelijkbare woningen in jouw straat écht hebben opgebracht. Onze vraagprijs of bieding is daardoor geen onderbuikgevoel.",
  },
  {
    icon: "doc",
    title: "Beproefde contracten",
    body: "We werken met de standaard NVM-koopakte en -voorwaarden. Die zijn juridisch uitontwikkeld, waardoor er achteraf zelden discussie ontstaat over wat er is afgesproken.",
  },
  {
    icon: "shield",
    title: "Een vangnet als het misgaat",
    body: "Ben je het oneens met hoe wij hebben gehandeld? Dan kun je terecht bij de geschillencommissie en het tuchtcollege van de NVM. Onafhankelijk, en niet vrijblijvend voor ons.",
  },
  {
    icon: "clock",
    title: "Kennis die actueel blijft",
    body: "Wet- en regelgeving rond wonen verandert continu. Als lid zijn we verplicht bij te blijven, zodat je geen advies krijgt dat vorig jaar nog klopte.",
  },
];

export const NVM_ERECODE_INTRO = {
  eyebrow: "De erecode",
  title: "Waar wij ons aan hebben verbonden",
  lead: "De NVM-Erecode is geen vrijblijvende intentieverklaring maar een set bindende regels. Dit zijn de vier die je in de praktijk het meest terugziet.",
  cta: { label: "Plan een kennismaking", href: "#" },
} as const;

export const NVM_ERECODE: WerkwijzeItem[] = [
  {
    number: "01",
    title: "De klant staat voorop",
    body: "Ons advies moet in jouw belang zijn, ook als dat ons minder oplevert. Concreet: we raden een woning af als hij niet deugt, en we noemen een realistische vraagprijs in plaats van de hoogste.",
  },
  {
    number: "02",
    title: "Geen belangenverstrengeling",
    body: "We treden nooit tegelijk op voor beide partijen bij dezelfde transactie. Ook mogen we een woning niet taxeren die we zelf in de verkoop hebben.",
  },
  {
    number: "03",
    title: "Transparant over kosten",
    body: "Je weet vooraf wat je betaalt en waarvoor. Geen verborgen posten, geen nacalculatie waar je niet op had gerekend.",
  },
  {
    number: "04",
    title: "Aanspreekbaar op je handelen",
    body: "Klopt er iets niet, dan kun je dat laten toetsen door een onafhankelijk tuchtcollege. Een uitspraak daarvan heeft gevolgen voor het lidmaatschap.",
  },
];

export const NVM_COMPARE_INTRO = {
  eyebrow: "Het verschil",
  title: "Met of zonder keurmerk",
  lead: "Dit is geen aanval op collega's zonder lidmaatschap — er zitten uitstekende makelaars tussen. Maar het is wel goed om te weten wat er wettelijk verplicht is en wat niet, zodat je zelf kunt beoordelen wat je belangrijk vindt.",
} as const;

export const NVM_COMPARE: CompareCard[] = [
  {
    label: "Wettelijk minimum",
    title: "Makelaar zonder keurmerk",
    body: "De titel makelaar is in Nederland niet beschermd. Wie zich zo wil noemen, mag dat — zonder diploma, zonder verplichte bijscholing.",
    items: [
      { text: "Geen verplichte opleidingseisen", included: false },
      { text: "Geen bindende erecode of tuchtrecht", included: false },
      { text: "Geen toegang tot de NVM-transactiedata", included: false },
      { text: "Geschil? Dan rest alleen de gang naar de rechter", included: false },
    ],
  },
  {
    label: "Ons lidmaatschap",
    title: "NVM-makelaar",
    body: "Toelatingseisen vooraf, verplichtingen tijdens, en controle achteraf. Daar hebben wij ons vrijwillig aan verbonden.",
    items: [
      { text: "Erkende diploma's en jaarlijkse bijscholing" },
      { text: "Gebonden aan de Erecode en aan tuchtrecht" },
      { text: "Inzicht in werkelijke transactieprijzen in de regio" },
      { text: "Geschillencommissie en verplichte verzekering" },
    ],
    cta: { label: "Maak kennis met ons", href: "#" },
    dark: true,
  },
];

export const NVM_FAQ_INTRO = {
  eyebrow: "Veelgestelde vragen",
  title: "Goed om te weten",
  lead: "Zit je vraag er niet bij? Bel of app gerust — ook als je gewoon nieuwsgierig bent hoe het vak in elkaar zit.",
  link: { label: "Stel je vraag", href: "#" },
} as const;

export const NVM_FAQ: FaqItem[] = [
  {
    question: "Is een NVM-makelaar duurder?",
    answer:
      "Niet per definitie. Courtages verschillen per kantoor en per traject, ongeacht het lidmaatschap. Wat je er wel voor terugkrijgt is de zekerheid dat er diploma's, bijscholing, een erecode en een geschillenregeling achter zitten. Bij ons hoor je het tarief bij de kennismaking, zodat je het zelf kunt afwegen.",
  },
  {
    question: "Waarom staat niet alles op Funda?",
    answer:
      "Elke NVM-makelaar moet zijn aanbod bij de NVM aanmelden, maar het op Funda plaatsen is niet verplicht. Soms wil een verkoper geen ruchtbaarheid — bij een scheiding bijvoorbeeld, of omdat er nog kinderen thuis wonen. Die woningen worden stil verkocht binnen het netwerk. Als je bij ons een ",
    link: { href: "#", label: "gratis zoekopdracht" },
    afterLink: " hebt lopen, hoor je daarvan.",
  },
  {
    question: "Kunnen jullie voor mij én de verkoper optreden?",
    answer:
      "Nee. De Erecode verbiedt dat expliciet, omdat je dan twee tegengestelde belangen zou moeten dienen. Zien wij een woning die wij zelf in de verkoop hebben en wil jij daarop bieden, dan verwijzen we je door naar een collega-aankoopmakelaar.",
  },
  {
    question: "Wat als ik ontevreden ben over jullie werk?",
    answer:
      "Zeg het ons eerst — dat lossen we in de meeste gevallen samen op. Komen we er niet uit, dan kun je terecht bij de geschillencommissie van de NVM. Voor gedragskwesties bestaat daarnaast een onafhankelijk tuchtcollege. Die route staat open voor iedere klant van een NVM-lid en kost je geen advocaat.",
  },
  {
    question: "Wat betekent het dat jullie ook register-taxateur zijn?",
    answer:
      "Dat is een aanvullende erkenning bovenop het NVM-lidmaatschap. Als ingeschreven taxateur in het NRVT mogen we ",
    link: { href: "#", label: "gevalideerde taxatierapporten" },
    afterLink:
      " opstellen die elke geldverstrekker accepteert. Het betekent ook dat onze waardebepaling bij een verkoop is gebaseerd op dezelfde methodiek als een officiële taxatie.",
  },
];

export const NVM_CROSSLINKS = [
  {
    title: "Je woning verkopen",
    body: "Van gratis waardebepaling tot de overdracht bij de notaris, met één vast aanspreekpunt.",
    href: "#",
  },
  {
    title: "Een woning zoeken",
    body: "Meld je aan voor een gratis zoekopdracht en hoor het als eerste — ook bij stille verkoop.",
    href: "#",
  },
] as const;

export const NVM_CTA = {
  image: "/images/nvm/cta.jpg",
  imageAlt: "Het Spaarne in Haarlem",
  eyebrow: "Vrijblijvend en zonder verplichtingen",
  title: "Liever gewoon even kennismaken?",
  body: "Keurmerken zeggen iets, maar een gesprek zegt meer. Loop binnen of bel, dan merk je zelf hoe we werken.",
  primary: { label: "Plan een kennismaking", href: "#" },
  secondary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
