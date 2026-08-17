/** Seeds the reviews and the home page. */
import {
  HERO_SLIDES,
  INTRO_FACTS,
  REVIEWS,
  SERVICES,
} from '../../src/lib/home-content';
import { REGIONS, SITE } from '../../src/lib/site';
import { client, cta, externalLink, key, uploadImage, upsertPage } from './shared';

async function upsertReview(review: (typeof REVIEWS)[number]) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "review" && name == $name][0]._id`,
    { name: review.name },
  );

  const doc = {
    _type: 'review' as const,
    quote: review.quote,
    name: review.name,
  };

  if (existingId) {
    // verwijderde velden opruimen op eerder geseede reviews
    await client
      .patch(existingId)
      .set(doc)
      .unset(['initials', 'place', 'source'])
      .commit();
    console.log(`  ↻ review ${review.name}`);
    return existingId;
  }

  const created = await client.create(doc);
  console.log(`  + review ${review.name}`);
  return created._id;
}

async function buildHomeContent() {
  console.log('Building home blocks…');

  const heroSlides = await Promise.all(
    HERO_SLIDES.map(async (slide) => ({
      ...(await uploadImage(slide.src, slide.alt)),
      _key: key(slide.src),
    })),
  );

  const introImage = await uploadImage(
    '/images/intro-team.jpg',
    'Het team van Hart & Huis Makelaardij',
  );

  const serviceItems = await Promise.all(
    SERVICES.map(async (service) => ({
      _key: key(service.label),
      label: service.label,
      title: service.title,
      description: service.description,
      link: externalLink(service.href),
      image: await uploadImage(service.image, service.imageAlt),
    })),
  );

  const storyImage = await uploadImage(
    '/images/story-big.jpg',
    'Een straat in Haarlem bij zonsondergang',
  );
  const storySecondary = await uploadImage(
    '/images/story-small.jpg',
    'Gevels in het centrum van Haarlem',
  );

  const ctaImage = await uploadImage(
    '/images/cta-office.jpg',
    'Het kantoor van Hart & Huis Makelaardij in Haarlem',
  );

  return [
    {
      _type: 'hero',
      _key: key('home-hero'),
      slides: heroSlides,
      eyebrow: 'NVM-makelaar in Haarlem en omstreken',
      title: 'Je voelt je thuis bij',
      titleHighlight: 'Hart & Huis',
      lead: 'Verkopen, kopen of taxeren in Haarlem — met twee makelaars die je bij naam kennen, de buurt op hun duimpje kennen en de tijd nemen voor jouw verhaal.',
      primaryCta: cta('Wat is mijn huis waard?', '#'),
      secondaryCta: cta('Bekijk het aanbod', '#'),
      badgeLabel: 'OP FUNDA',
    },
    {
      _type: 'intro',
      _key: key('home-intro'),
      image: introImage,
      stampValue: '20',
      stampLabel: 'JAAR ERVARING',
      eyebrow: 'Over Hart & Huis',
      title: 'Makelaardij met hart voor jouw huis',
      titleHighlight: 'hart',
      leads: [
        'Een huis verkopen of kopen is zelden alleen een transactie. Het is verhuizen naar een nieuwe fase, afscheid nemen van een plek vol herinneringen, of eindelijk die ene straat in kunnen.',
        'Daarom werken wij klein en persoonlijk. Je hebt één vast aanspreekpunt, je krijgt eerlijk advies — ook als dat even tegen je zin ingaat — en je weet altijd waar je staat.',
      ],
      facts: INTRO_FACTS.map((fact) => ({ ...fact, _key: key(fact.label) })),
      link: cta('Maak kennis met ons', '#'),
    },
    {
      _type: 'services',
      _key: key('home-services'),
      title: 'Wat kunnen we voor je doen?',
      lead: 'Van Haarlem-Noord tot Heemstede: verkoop, aankoop en taxaties onder één dak.',
      items: serviceItems,
      nvm: {
        badge: 'NVM',
        title: 'Aangesloten bij de NVM',
        body: 'Vaste kwaliteitseisen, actuele marktdata uit de grootste woningdatabase van Nederland, en een geschillenregeling waar je op terug kunt vallen.',
        cta: cta('Wat betekent dat voor jou?', '#'),
      },
    },
    {
      _type: 'story',
      _key: key('home-story'),
      image: storyImage,
      secondaryImage: storySecondary,
      eyebrow: 'Klanten vertellen',
      title: 'Van Amsterdam naar de Kleverparkbuurt',
      quote:
        'We zochten al anderhalf jaar. Binnen zes weken stonden we met de sleutel in onze hand — in de straat waar we stiekem altijd al wilden wonen.',
      attribution: 'Sanne & Joost — Haarlem',
      cta: cta('Lees hun verhaal', '#'),
    },
    {
      _type: 'reviews',
      _key: key('home-reviews'),
      score: SITE.fundaScore,
      scoreLabel: 'OP FUNDA',
      reviewCountLabel: `${SITE.reviewCount} keer beoordeeld`,
      intro: 'Door kopers én verkopers, rechtstreeks vanuit Funda en Google.',
      link: cta('Alle beoordelingen bekijken', '#'),
    },
    {
      _type: 'listings',
      _key: key('home-listings'),
      title: 'Actueel aanbod',
      cta: cta('Bekijk alle woningen', '#'),
      regionsLabel: 'Ook actief in:',
      regions: REGIONS.map((label) => ({
        _key: key(label),
        label,
        link: externalLink('#'),
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('home-cta'),
      image: ctaImage,
      eyebrow: 'Even sparren?',
      title: 'Loop binnen, bel of app ons',
      body: 'Geen verkooppraatje, gewoon een eerlijk gesprek over wat jouw huis waard is en wat er in deze markt slim is om te doen. Koffie staat klaar.',
      primaryCta: cta('Plan een kennismaking', '#'),
      secondaryCta: cta(SITE.phone, SITE.phoneHref),
    },
  ];
}

export async function seedHome() {
  console.log('Reviews');
  for (const review of REVIEWS) {
    await upsertReview(review);
  }

  console.log('\nHome page');
  await upsertPage('home', 'Home', await buildHomeContent());
}
