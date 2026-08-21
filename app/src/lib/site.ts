export const SITE = {
  name: 'Hart & Huis Makelaardij',
  /** Zonder slash aan het eind — sitemap, robots en absolute links plakken er zelf een pad achter. */
  baseUrl: 'https://www.hartenhuis.nl',
  phone: '023 - 822 39 52',
  phoneHref: 'tel:0238223952',
  email: 'info@hartenhuis.nl',
  emailHref: 'mailto:info@hartenhuis.nl',
  address: ['Vergierdeweg 288', '2026 ZK Haarlem'],
  whatsappHref: '#',
  fundaScore: '10',
  reviewCount: 84,
} as const;

export type NavLink = { href: string; label: string };

export type FooterLinkGroup = {
  title: string;
  links: NavLink[];
};

export const DEFAULT_FOOTER_LOGOS = [
  { src: '/images/logos/NVM.png', alt: 'NVM' },
  { src: '/images/logos/funda.png', alt: 'Funda' },
  { src: '/images/logos/nwwi.png', alt: 'NWWI' },
  { src: '/images/logos/vgc.png', alt: 'VastgoedCert' },
  { src: '/images/logos/regtax.png', alt: 'RegTax' },
] as const;

export const REGIONS = [
  'Heemstede',
  'Bloemendaal',
  'Overveen',
  'Santpoort',
  'Spaarndam',
  'Zandvoort',
  'Hillegom',
] as const;
