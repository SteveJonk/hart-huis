export const SITE = {
  name: 'Hart & Huis Makelaardij',
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

export const FOOTER_CERTS = ['NVM', 'FUNDA', 'NWWI', 'VASTGOEDCERT'] as const;

export const REGIONS = [
  'Heemstede',
  'Bloemendaal',
  'Overveen',
  'Santpoort',
  'Spaarndam',
  'Zandvoort',
  'Hillegom',
] as const;
