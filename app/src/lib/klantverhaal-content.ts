import { SITE } from "@/lib/site";

// Vaste copy rond een klantverhaal (/klantverhaal/<slug>), uit
// `example-designs/klantverhaal.html`. Het verhaal zelf staat in Sanity.

export type Dienst = "Aankoop" | "Verkoop" | "Taxatie";

/** Er is (nog) geen overzichtspagina: de slider op de homepage is het overzicht. */
export const KLANTVERHALEN_OVERZICHT = { href: "/#klantverhalen", back: "Terug naar alle verhalen", all: "Alle klantverhalen" };

export const DIENST_LABEL: Record<Dienst, string> = {
  Aankoop: "Aankoopbegeleiding",
  Verkoop: "Verkoopbegeleiding",
  Taxatie: "Taxatie",
};

export const ZIJKAART_CTA: Record<Dienst, { title: string; body: string; label: string; href: string }> = {
  Aankoop: {
    title: "Ook op zoek?",
    body: "Laat ons meekijken en hoor als eerste wanneer er iets voorbijkomt dat past.",
    label: "Gratis zoekopdracht",
    href: "/zoekopdracht",
  },
  Verkoop: {
    title: "Ook verkopen?",
    body: "Hoor eerlijk wat jouw woning opbrengt in de huidige markt. Gratis en vrijblijvend.",
    label: "Gratis waardebepaling",
    href: "/waardebepaling",
  },
  Taxatie: {
    title: "Taxatie nodig?",
    body: "Een gevalideerd taxatierapport, opgesteld door een register-taxateur die de regio kent.",
    label: "Taxatie aanvragen",
    href: "/taxatie",
  },
};

export const KLANTVERHAAL_MAKELAAR = {
  image: { src: "/images/over-ons/portret.jpg", alt: "Dorien Hollemans van Hart & Huis Makelaardij" },
  wie: "Dorien Hollemans · NVM Register Makelaar & Taxateur",
} as const;

export const KLANTVERHAAL_MEER = {
  eyebrow: "Nog meer verhalen",
  title: "Anderen gingen je voor",
} as const;

export const KLANTVERHAAL_CTA = {
  image: { src: "/images/over-ons/spaarne.jpg", alt: "Het Spaarne in Haarlem" },
  eyebrow: "Jouw verhaal begint met een gesprek",
  title: "Zullen we eens kennismaken?",
  body: "Of je nu koopt of verkoopt — het begint met een vrijblijvend gesprek over wat jij zoekt. Loop binnen, bel of app ons.",
  primaryCta: { label: "Plan een kennismaking", href: "/contact" },
  secondaryCta: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
