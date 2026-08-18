import { SITE } from "@/lib/site";
import type { Benefit, Fact, FaqItem, Step } from "@/lib/verkoop-content";

export const AANKOOP_HERO = {
  image: "/images/aankoop/pagehero.jpg",
  imageAlt:
    "Twee mensen bekijken het woningaanbod in de etalage van Hart & Huis",
  eyebrow: "Aankoopmakelaar in Haarlem en omstreken",
  titleBefore: "Wees er eerder bij dan ",
  titleEm: "de rest",
  lead: "Een huis koop je met je hart. Wij nemen het zakelijke deel over: we zoeken actief mee, gaan mee naar elke bezichtiging en zorgen dat je niet te veel betaalt.",
  primary: { href: "#", label: "Gratis zoekopdracht aanmaken" },
  secondary: { href: SITE.phoneHref, label: SITE.phone },
} as const;

export const AANKOOP_FACTS: Fact[] = [
  {
    value: "30",
    label: "woningen aangekocht voor kopers in de afgelopen twaalf maanden",
  },
  {
    value: "20 jaar",
    label: "marktkennis in Zuid-Kennemerland, als NVM-makelaar én taxateur",
  },
  {
    value: SITE.fundaScore,
    label: "gemiddelde beoordeling op Funda door kopers en verkopers",
  },
];

export const AANKOOP_BENEFITS_IMAGE = {
  src: "/images/aankoop/waarom.jpg",
  alt: "Dorien Hollemans onderzoekt vergelijkbare woningtransacties",
};

export const AANKOOP_BENEFITS_INTRO = {
  eyebrow: "Waarom een aankoopmakelaar",
  title: "Je koopt een huis niet elke dag. Wij wel.",
  lead: "Een woning kopen is een grote beslissing waar je lang aan vastzit. In een markt waar je snel moet handelen is het prettig als iemand met afstand meekijkt — en weet wat een woning écht waard is.",
} as const;

export const AANKOOP_BENEFITS: Benefit[] = [
  {
    icon: "chart",
    title: "Je betaalt niet te veel",
    body: "We onderzoeken recente transacties van vergelijkbare woningen. Dorien is zelf ook taxateur, dus ze weet precies waar een reële bieding ligt.",
  },
  {
    icon: "search",
    title: "Vaak als eerste op de hoogte",
    body: "Via het NVM-netwerk in de regio horen we regelmatig van woningen vóórdat ze op Funda staan — inclusief stille verkoop.",
  },
  {
    icon: "eye",
    title: "Een objectief oordeel",
    body: "Jij wordt verliefd op een huis, wij niet. We zeggen het eerlijk als de fundering, het dak of de vraagprijs niet klopt — ook als dat even tegenvalt.",
  },
  {
    icon: "clock",
    title: "Het scheelt je avonden zoeken",
    body: "Wij filteren het aanbod, plannen de bezichtigingen en houden de deadlines bij. Jij hoeft alleen te beslissen of het jouw huis is.",
  },
];

export const AANKOOP_ZOEKOPDRACHT = {
  icon: "search" as const,
  title: "Gratis zoekopdracht",
  body: "Vertel ons waar je naar zoekt en wij houden het voor je in de gaten. Je hoort het als eerste wanneer er iets voorbijkomt dat past — ook bij stille verkoop, en ook als je nog helemaal niet zeker weet of je gaat verhuizen. Gratis en zonder verplichtingen.",
  cta: { label: "Maak je zoekopdracht aan", href: "#" },
} as const;

export const AANKOOP_STEPS_INTRO = {
  eyebrow: "Het traject",
  title: "Zo vinden we jouw huis",
  lead: "Vijf stappen, van je woonwensen tot de sleutel bij de notaris. Bij elke bezichtiging zijn we erbij — ook 's avonds en in het weekend.",
  cta: { label: "Plan een kennismaking", href: "#" },
} as const;

export const AANKOOP_STEPS: Step[] = [
  {
    number: "01",
    title: "Je woonwensen",
    body: "Tijdens de kennismaking staat centraal wat jij zoekt: buurt, budget, type woning, en wat absoluut niet mag ontbreken. We denken creatief mee — soms ligt de oplossing in een straat waar je zelf nog niet aan had gedacht, of in een woning die met een kleine verbouwing precies wordt wat je wilt.",
    image: "/images/aankoop/step-1.jpg",
  },
  {
    number: "02",
    title: "Zoeken en bezichtigen",
    body: "Wij zoeken actief mee en gaan bij elke bezichtiging mee. Terwijl jij kijkt of je je er thuis voelt, letten wij op de staat van het dak, de fundering, het schilderwerk en de indeling. Omdat wij niet emotioneel betrokken zijn, krijg je altijd een objectieve mening — ook als die niet is wat je hoopte te horen.",
    image: "/images/aankoop/step-2.jpg",
  },
  {
    number: "03",
    title: "Bieden en onderhandelen",
    body: "Voordat we bieden onderzoeken we recente transacties van vergelijkbare woningen in de buurt. Je krijgt advies over een reëel bod en over de voorwaarden die je eraan hangt. Omdat we zelf taxateur zijn, weten we wat een woning waard is in plaats van wat er wordt gevraagd.",
    image: "/images/aankoop/step-3.jpg",
  },
  {
    number: "04",
    title: "Gefeliciteerd, je hebt gekocht",
    body: "We adviseren je over de inhoud van de koopovereenkomst en nemen alle bijlagen bij de koopakte grondig door — daar zitten vaak de dingen die je later kunnen opbreken. Klopt alles, dan kan er getekend worden. Met die koopakte regel je vervolgens je hypotheek.",
    image: "/images/aankoop/step-4.jpg",
  },
  {
    number: "05",
    title: "Sleutel bij de notaris",
    body: "Op de dag van de oplevering lopen we samen door de woning: is alles zoals afgesproken en wordt het huis leeg opgeleverd? Pas als dat klopt, teken je met een gerust hart bij de notaris. En dan is het huis van jou.",
    image: "/images/aankoop/step-5.jpg",
  },
];

export const AANKOOP_QUOTE = {
  image: "/images/aankoop/quote.jpg",
  imageAlt: "Een straat in Haarlem",
  eyebrow: "Een koper vertelt",
  quote:
    "Bij het eerste huis dachten wij meteen: bieden. Dorien liet duidelijk merken dat we dat beter niet konden doen. Achteraf ontzettend blij dat we geluisterd hebben.",
  initials: "MK",
  name: "Marijke & Koen",
  place: "Aankoop woning in Santpoort",
} as const;

export const AANKOOP_FAQ_INTRO = {
  eyebrow: "Veelgestelde vragen",
  title: "Goed om te weten",
  lead: "Zit je vraag er niet bij? Bel of app gerust — ook als je nog aan het oriënteren bent en nog nergens toe hebt besloten.",
  link: { label: "Stel je vraag", href: "#" },
} as const;

export const AANKOOP_FAQ: FaqItem[] = [
  {
    question: "Wat kost een aankoopmakelaar?",
    answer:
      "Je betaalt courtage: een vooraf afgesproken bedrag of percentage, dat je pas verschuldigd bent als de aankoop daadwerkelijk doorgaat. Bij de kennismaking hoor je precies wat het kost en wat er allemaal in zit. In de praktijk verdient een aankoopmakelaar zichzelf vaak terug in de onderhandeling.",
  },
  {
    question: "Wat is een gratis zoekopdracht precies?",
    answer:
      "Je geeft door waar je naar zoekt, en wij houden het aanbod voor je in de gaten. Komt er iets voorbij dat past, dan hoor je dat van ons — vaak voordat het op Funda staat. Er zitten geen kosten of verplichtingen aan, en je kunt op elk moment stoppen. Het is dus ook prima als je nog aan het oriënteren bent.",
  },
  {
    question: "Ik heb het huis al gevonden. Kan ik jullie dan nog inschakelen?",
    answer:
      "Zeker. Veel mensen bellen ons pas als ze een woning op het oog hebben. We kunnen dan mee naar de bezichtiging, onderzoek doen naar de waarde en de onderhandeling voor je voeren. Hoe eerder je belt hoe beter, maar ook één dag voor een biedingsdeadline is niet te laat.",
  },
  {
    question: "Doen jullie ook bouwkundige keuringen?",
    answer:
      "Tijdens de bezichtiging letten wij op de bouwtechnische staat en vertellen we je waar we ons zorgen om maken. Voor een officieel bouwkundig rapport schakelen we een keurder in waar we vaker mee werken. We adviseren je wanneer dat verstandig is — bij oudere woningen in Haarlem-Noord vrijwel altijd.",
  },
  {
    question: "Ik moet eerst mijn eigen huis verkopen. Wat nu?",
    answer:
      "Dan plannen we de verkoop en de zoektocht op elkaar af, zodat je niet tussen twee huizen in belandt. We bespreken vooraf wat er gebeurt als je koopt vóór je verkocht hebt, en welke ontbindende voorwaarden je daarbij nodig hebt. Combineer je ",
    link: { href: "/verkoop", label: "verkoop" },
    afterLink: " en aankoop, dan geldt een gunstiger tarief.",
  },
  {
    question: "Kunnen jullie ook bieden op een veiling?",
    answer:
      "Ja. Veilingen zijn een specialisme van ons en daarin zijn we vrij uniek in de regio. Het proces is heel anders dan een gewone aankoop: andere kosten, andere risico's en geen ontbindende voorwaarden. Bel ons voordat je naar een veiling gaat, dan lopen we samen door wat je te wachten staat.",
  },
];

export const AANKOOP_REGION = {
  eyebrow: "Ons werkgebied",
  title: "Jouw NVM-makelaar voor de hele regio",
  lead: "We kennen niet alleen Haarlem, maar ook de straten eromheen — en wat een woning daar waard is. Kies je plaats voor meer over kopen in die buurt.",
} as const;

export const AANKOOP_REGIONS = [
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

export const AANKOOP_CROSSLINKS = [
  {
    title: "Eerst je huidige woning verkopen?",
    body: "Gratis waardebepaling, zodat je weet met welk budget je kunt zoeken.",
    href: "/verkoop",
  },
  {
    title: "Nu al woningen bekijken?",
    body: "Ons actuele aanbod in Haarlem, Spaarndam, Velsen en omstreken.",
    href: "/aanbod",
  },
] as const;

export const AANKOOP_CTA = {
  image: "/images/aankoop/cta.jpg",
  imageAlt: "Het Spaarne in Haarlem",
  eyebrow: "Gratis en zonder verplichtingen",
  title: "Laat ons meezoeken naar jouw huis",
  body: "Vertel waar je naar zoekt en je hoort het als eerste zodra er iets voorbijkomt dat past. Ook als je pas over een jaar wilt verhuizen — dan sta je alvast op de lijst.",
  primary: { label: "Gratis zoekopdracht aanmaken", href: "#" },
  secondary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
