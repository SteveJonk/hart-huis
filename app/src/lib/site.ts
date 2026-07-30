export const SITE = {
  name: "Hart & Huis Makelaardij",
  phone: "023 - 822 39 52",
  phoneHref: "tel:0238223952",
  email: "info@hartenhuis.nl",
  emailHref: "mailto:info@hartenhuis.nl",
  address: ["Vergierdeweg 288", "2026 ZK Haarlem"],
  whatsappHref: "#",
  fundaScore: "9,6",
  reviewCount: 84,
} as const;

export type NavLink = { href: string; label: string };

export const NAV_LEFT: NavLink[] = [
  { href: "#", label: "Verkoop" },
  { href: "#", label: "Aankoop" },
  { href: "#", label: "Taxatie" },
  { href: "#", label: "NVM" },
];

export const NAV_RIGHT: NavLink[] = [
  { href: "#", label: "Actueel aanbod" },
  { href: "#", label: "Beoordelingen" },
  { href: "#", label: "Over ons" },
  { href: "#", label: "Contact" },
];

export const NAV_MOBILE: NavLink[] = [...NAV_LEFT, ...NAV_RIGHT];

export const FOOTER_DIENSTEN: NavLink[] = [
  { href: "#", label: "Verkoop" },
  { href: "#", label: "Aankoop" },
  { href: "#", label: "Taxatie" },
  { href: "#", label: "NVM" },
];

export const FOOTER_QUICK: NavLink[] = [
  { href: "#", label: "Actueel aanbod" },
  { href: "#", label: "Beoordelingen" },
  { href: "#", label: "Over ons" },
  { href: "#", label: "Contact" },
];

export const FOOTER_CERTS = ["NVM", "FUNDA", "NWWI", "VASTGOEDCERT"] as const;

export const REGIONS = [
  "Heemstede",
  "Bloemendaal",
  "Overveen",
  "Santpoort",
  "Spaarndam",
  "Zandvoort",
  "Hillegom",
] as const;
