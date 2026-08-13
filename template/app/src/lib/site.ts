/**
 * Site-wide constants used by the header, footer and CTA blocks.
 *
 * These are the details that appear in too many places to be worth putting in
 * the CMS. Fill them in once per project.
 */
export const SITE = {
  name: 'Your Company',
  /** Used as the meta description fallback and the footer strapline. */
  description: 'A short sentence describing what the company does.',
  phone: '+31 (0)20 000 0000',
  phoneHref: 'tel:+31200000000',
  email: 'hello@example.com',
  emailHref: 'mailto:hello@example.com',
  address: ['Example Street 1', '1000 AA Amsterdam'],
} as const;

export type NavLink = { href: string; label: string };

export type FooterLinkGroup = {
  title: string;
  links: NavLink[];
};

/**
 * Small text badges in the footer — memberships, certifications, awards.
 * Set to an empty array to hide the row.
 */
export const FOOTER_BADGES: readonly string[] = [];
