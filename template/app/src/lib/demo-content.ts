/**
 * Placeholder copy for every block.
 *
 * This file has two jobs, and they are deliberately the same data:
 *
 *  1. Component defaults — each block in `src/components/blocks` falls back to
 *     these values when the CMS has not supplied a field, so the site renders
 *     something sensible before any content exists.
 *  2. Seed source — `scripts/seed/*.ts` pushes these same values into Sanity,
 *     so a freshly seeded studio matches what you see on screen.
 *
 * Replace the strings here with your own copy and both sides move together.
 */

import { SITE } from '@/lib/site';

const WIDE = '/images/placeholder-wide.png';
const PORTRAIT = '/images/placeholder-portrait.png';
const SQUARE = '/images/placeholder-square.png';

export const PLACEHOLDER_IMAGES = { WIDE, PORTRAIT, SQUARE } as const;

/* -------------------------------------------------------------------------- */
/* Home                                                                        */
/* -------------------------------------------------------------------------- */

export const HERO_SLIDES = [
  { src: WIDE, alt: 'Placeholder image' },
  { src: SQUARE, alt: 'Placeholder image' },
  { src: PORTRAIT, alt: 'Placeholder image' },
];

export const HERO = {
  eyebrow: 'Your positioning line',
  title: 'A headline that says',
  titleHighlight: 'what you do',
  lead: 'One or two sentences of supporting copy. Say who this is for and what they get, in plain language — this is the line most visitors actually read.',
  primaryCta: { label: 'Primary action', href: '/about' },
  secondaryCta: { label: 'Secondary action', href: '/about' },
  badgeValue: '10',
  badgeLabel: 'YEARS',
};

export const INTRO_FACTS = [
  { value: '250+', label: 'Projects delivered' },
  { value: '18', label: 'People on the team' },
  { value: '4.9', label: 'Average rating' },
];

export const INTRO = {
  image: { src: PORTRAIT, alt: 'Placeholder image' },
  stampValue: '10',
  stampLabel: 'YEARS',
  eyebrow: 'About us',
  title: 'A short section that introduces',
  titleHighlight: 'the people behind it',
  leads: [
    'Two or three sentences of context. What you do, how long you have been doing it, and what makes the way you work different from the obvious alternative.',
    'A second paragraph if the first one leaves something important out. Keep it to the point — the detail belongs on a dedicated page.',
  ],
  facts: INTRO_FACTS,
  link: { label: 'More about us', href: '/about' },
};

export const SERVICES = [
  {
    label: 'Service one',
    title: 'What you offer',
    description:
      'A sentence or two on what this service is and who it suits. Concrete beats clever.',
    image: { src: SQUARE, alt: 'Placeholder image' },
    href: '/about',
  },
  {
    label: 'Service two',
    title: 'A second offering',
    description:
      'Keep these descriptions roughly the same length — the cards sit in a row and uneven copy shows.',
    image: { src: SQUARE, alt: 'Placeholder image' },
    href: '/about',
  },
  {
    label: 'Service three',
    title: 'And a third',
    description:
      'Three reads as a considered set. Add a fourth and the grid reflows to two rows.',
    image: { src: SQUARE, alt: 'Placeholder image' },
    href: '/about',
  },
];

export const SERVICES_SECTION = {
  title: 'What we do',
  lead: 'A line introducing the services below, so the grid does not start cold.',
  highlight: {
    badge: 'CERTIFIED',
    title: 'A claim worth its own panel',
    body: 'Use this dark band for the one credential, guarantee or differentiator that earns the extra attention. Leave it out if you do not have one.',
    cta: { label: 'Read more', href: '/about' },
  },
};

/* -------------------------------------------------------------------------- */
/* Content page                                                                */
/* -------------------------------------------------------------------------- */

export const PAGE_HERO = {
  image: { src: WIDE, alt: 'Placeholder image' },
  breadcrumbLabel: 'About',
  eyebrow: 'Section label',
  title: 'A heading for the',
  titleHighlight: 'inner page',
  lead: 'The same supporting-sentence job as the home hero, but scoped to this page.',
  primaryCta: { label: 'Primary action', href: '#' },
  secondaryCta: { label: 'Secondary action', href: '#' },
};

export const BENEFITS_IMAGE = { src: PORTRAIT, alt: 'Placeholder image' };

/** The icon set drawn inline by `Benefits` — see the switch in that component. */
export type BenefitIcon =
  | 'person'
  | 'camera'
  | 'chart'
  | 'doc'
  | 'house'
  | 'renovate'
  | 'scale';

export type Benefit = {
  icon: BenefitIcon;
  title: string;
  body: string;
};

export const BENEFITS: Benefit[] = [
  {
    icon: 'person' as const,
    title: 'A reason to choose you',
    body: 'One sentence of evidence. Avoid adjectives you cannot back up.',
  },
  {
    icon: 'house' as const,
    title: 'A second reason',
    body: 'These read as a scannable list, so lead each one with the noun that matters.',
  },
  {
    icon: 'scale' as const,
    title: 'A third reason',
    body: 'Four or five items is the sweet spot before the list stops being scannable.',
  },
  {
    icon: 'renovate' as const,
    title: 'A fourth reason',
    body: 'Drop this one if you only have three that are genuinely distinct.',
  },
];

export const BENEFITS_SECTION = {
  eyebrow: 'Why us',
  title: 'A heading for the benefits list',
  lead: 'A short paragraph setting up the list below. Say what the reader gets, not what you do.',
};

export const STEPS = [
  {
    number: '01',
    title: 'First step',
    body: 'What happens first, and what the reader needs to do (often: nothing).',
    image: WIDE,
  },
  {
    number: '02',
    title: 'Second step',
    body: 'Keep each step to one idea. If a step needs two sentences, it is probably two steps.',
    image: SQUARE,
  },
  {
    number: '03',
    title: 'Third step',
    body: 'Naming the step after the outcome reads better than naming it after the activity.',
    image: PORTRAIT,
  },
  {
    number: '04',
    title: 'Fourth step',
    body: 'The list scrolls with a sticky image, so four to six steps works best.',
    image: WIDE,
  },
];

export const STEPS_SECTION = {
  eyebrow: 'How it works',
  title: 'The process, start to finish',
  lead: 'A sentence promising the reader there are no surprises, then let the steps do the work.',
  cta: { label: 'Get started', href: '#' },
};

export type FaqItem = {
  question: string;
  answer: string;
  /** Optional inline link rendered straight after the answer text. */
  link?: { label: string; href: string };
  /** Optional trailing text after that link, so the sentence can continue. */
  afterLink?: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'A question people actually ask',
    answer:
      'Answer it directly in the first sentence, then add the nuance. Burying the answer in paragraph two is the most common mistake here.',
  },
  {
    question: 'A question about price or timing',
    answer:
      'These two come up on every site. Answering them plainly, even with a range, builds more trust than deflecting to a contact form.',
  },
  {
    question: 'A question about what happens next',
    answer:
      'Use the last one to remove the final bit of friction before someone gets in touch.',
  },
];

export const FAQ_SECTION = {
  eyebrow: 'FAQ',
  title: 'Good to know',
  intro:
    'A line inviting the reader to ask anything that is not covered, with a link to the obvious next step.',
  link: { label: 'Ask a question', href: '#' },
};

export const CROSS_LINKS = [
  {
    title: 'A related page',
    body: 'One line on why someone reading this page might want that one.',
    href: '/about',
  },
  {
    title: 'Another related page',
    body: 'These sit at the bottom of a page to catch readers who are not ready to convert.',
    href: '/',
  },
];

/* -------------------------------------------------------------------------- */
/* Shared                                                                      */
/* -------------------------------------------------------------------------- */

export const MEDIA_TEXT = {
  eyebrow: 'Section label',
  title: 'A heading beside a photo',
  paragraphs: [
    'The workhorse block: a column of text with a supporting image. Use it wherever a section needs more than a heading but less than a full page.',
    'A second paragraph, because one usually looks thin next to a tall image.',
  ],
  cta: { label: 'Read more', href: '/about' },
  image: { src: PORTRAIT, alt: 'Placeholder image' },
};

export const CTA_BAND = {
  // `secondaryCta` is optional in the CMS; the default points at the phone number.
  image: { src: WIDE, alt: 'Placeholder image' },
  eyebrow: 'Get in touch',
  title: 'The closing call to action',
  body: 'One sentence lowering the barrier — what happens when they get in touch, and what it costs them (usually nothing).',
  primaryCta: { label: 'Contact us', href: '#' },
  secondaryCta: { label: SITE.phone, href: SITE.phoneHref },
};
