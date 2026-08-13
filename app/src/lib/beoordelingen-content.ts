/** Copy voor /beoordelingen. Doet dubbel dienst als component-DEFAULTS en seed-bron. */
import { SITE } from '@/lib/site';

export const BEOORDELINGEN_HERO = {
  breadcrumbLabel: 'Beoordelingen',
  eyebrow: 'Beoordelingen',
  titleBefore: 'Wat klanten écht van ons ',
  titleEm: 'vinden',
  lead: 'Alle beoordelingen op deze pagina komen rechtstreeks van Funda en zijn geschreven door mensen die daadwerkelijk een woning bij ons hebben gekocht of verkocht. Wij kunnen ze niet selecteren, aanpassen of verwijderen — ook de kritische niet.',
  primaryCta: { label: 'Plan een kennismaking', href: '#' },
  secondaryCta: { label: 'Bekijk ons profiel op Funda', href: '#' },
  scoreLabel: 'GEMIDDELD',
  scoreNote:
    'Gebaseerd op alle beoordelingen van de afgelopen 24 maanden. 71% van onze klanten wordt uitgenodigd om er een te schrijven.',
} as const;

export const BEOORDELINGEN_UITGELICHT = {
  eyebrow: 'Uitgelicht',
  image: {
    src: '/images/beoordelingen/uitgelicht.jpg',
    alt: 'Een straat in Haarlem',
  },
} as const;

export const BEOORDELINGEN_GRID = {
  title: 'Alle beoordelingen',
  /** `alle` wist het filter; de andere waarden matchen het `type`-veld op een review. */
  filters: [
    { value: 'alle', label: 'Alle' },
    { value: 'Verkoop', label: 'Verkopers' },
    { value: 'Aankoop', label: 'Kopers' },
  ],
  more: 'Toon meer beoordelingen',
  empty: 'Geen beoordelingen in deze categorie.',
  gradesLabel: 'Beoordeeld op',
} as const;

/** Hoeveel kaarten er per keer bijkomen — zelfde ritme als de aanbod-grid. */
export const BEOORDELINGEN_PAGE_SIZE = 9;

export const BEOORDELINGEN_WERKWIJZE = {
  eyebrow: 'Hoe het werkt',
  title: 'Waarom je deze cijfers kunt vertrouwen',
  lead: 'Een review op je eigen website schrijf je zo. Daarom halen wij ze niet zelf op, maar laten we het aan Funda over.',
  items: [
    {
      number: '01',
      title: 'Alleen echte klanten',
      body: 'Funda nodigt uitsluitend mensen uit die daadwerkelijk een woning via ons hebben gekocht of verkocht. Anoniem een cijfer achterlaten kan niet.',
    },
    {
      number: '02',
      title: 'Wij hebben geen invloed',
      body: 'We kunnen beoordelingen niet aanpassen, selecteren of laten verwijderen. Wat er staat, staat er — ook als het minder vleiend is.',
    },
    {
      number: '03',
      title: 'Iedereen krijgt de uitnodiging',
      body: 'Afgelopen jaar nodigden we 71% van onze klanten uit. Niet alleen degenen van wie we wisten dat ze tevreden waren.',
    },
    {
      number: '04',
      title: 'Altijd van de laatste twee jaar',
      body: 'Het gemiddelde is gebaseerd op de afgelopen 24 maanden, dus je kijkt niet naar successen van jaren geleden.',
    },
  ],
} as const;

export const BEOORDELINGEN_CTA = {
  image: {
    src: '/images/beoordelingen/cta.jpg',
    alt: 'Het Spaarne in Haarlem',
  },
  eyebrow: 'Vrijblijvend en zonder verplichtingen',
  title: 'Benieuwd of het bij jou ook zo werkt?',
  body: 'Plan een kennismaking en merk het zelf. Geen verkooppraatje, gewoon een eerlijk gesprek over wat er in jouw situatie verstandig is.',
  primaryCta: { label: 'Plan een kennismaking', href: '#' },
  secondaryCta: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
