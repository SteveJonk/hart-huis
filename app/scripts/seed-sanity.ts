/**
 * Seed Sanity with home + verkoop page builder content.
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor or Admin) in app/.env
 * Create one at: https://www.sanity.io/manage/project/s7u8d78o/api#tokens
 *
 * Usage (from app/):
 *   npm run seed:sanity
 *
 * Idempotent: reuses assets by filename, reviews by name, FAQs by title,
 * and pages by slug (creates or replaces content).
 */
import {createHash, randomBytes} from 'node:crypto'
import {createReadStream, existsSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createClient, type SanityClient} from '@sanity/client'
import {
  HERO_SLIDES,
  INTRO_FACTS,
  LISTINGS,
  REVIEWS,
  SERVICES,
} from '../src/lib/home-content'
import {REGIONS, SITE} from '../src/lib/site'
import {
  VERKOOP_BENEFITS,
  VERKOOP_BENEFITS_IMAGE,
  VERKOOP_CROSSLINKS,
  VERKOOP_CTA,
  VERKOOP_FACTS,
  VERKOOP_FAQ,
  VERKOOP_HERO,
  VERKOOP_QUOTE,
  VERKOOP_REGIONS,
  VERKOOP_STEPS,
} from '../src/lib/verkoop-content'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, '../public')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_WRITE_TOKEN
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}
if (!token) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN. Create a token with Editor rights at https://www.sanity.io/manage and add it to app/.env',
  )
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2026-07-26',
  token,
  useCdn: false,
})

function key(seed?: string) {
  if (seed) {
    return createHash('sha1').update(seed).digest('hex').slice(0, 12)
  }
  return randomBytes(6).toString('hex')
}

function externalLink(href: string) {
  return {_type: 'link' as const, linkType: 'external' as const, href}
}

function cta(label: string, href: string) {
  return {_type: 'cta' as const, label, linkType: 'external' as const, href}
}

async function uploadImage(publicPath: string, alt: string) {
  const relative = publicPath.replace(/^\//, '')
  const absolute = path.join(PUBLIC_DIR, relative)
  if (!existsSync(absolute)) {
    throw new Error(`Image not found: ${absolute}`)
  }

  const filename = path.basename(absolute)
  const existingId = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    {filename},
  )

  const assetId =
    existingId ??
    (
      await client.assets.upload('image', createReadStream(absolute), {
        filename,
        contentType: 'image/jpeg',
      })
    )._id

  if (existingId) {
    console.log(`  ↻ image ${filename}`)
  } else {
    console.log(`  ↑ image ${filename}`)
  }

  return {
    _type: 'image' as const,
    asset: {_type: 'reference' as const, _ref: assetId},
    alt,
  }
}

async function upsertReview(review: (typeof REVIEWS)[number]) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "review" && name == $name][0]._id`,
    {name: review.name},
  )

  const doc = {
    _type: 'review' as const,
    quote: review.quote,
    initials: review.initials,
    name: review.name,
    place: review.place,
    source: review.source,
  }

  if (existingId) {
    await client.patch(existingId).set(doc).commit()
    console.log(`  ↻ review ${review.name}`)
    return existingId
  }

  const created = await client.create(doc)
  console.log(`  + review ${review.name}`)
  return created._id
}

async function upsertFaq(faq: (typeof VERKOOP_FAQ)[number]) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "faq" && title == $title][0]._id`,
    {title: faq.question},
  )

  const doc = {
    _type: 'faq' as const,
    title: faq.question,
    answer: faq.answer,
    ...(faq.link ? {link: cta(faq.link.label, faq.link.href)} : {}),
    ...(faq.afterLink ? {afterLink: faq.afterLink} : {}),
  }

  if (existingId) {
    const patch = client.patch(existingId).set({
      title: faq.question,
      answer: faq.answer,
      ...(faq.link ? {link: cta(faq.link.label, faq.link.href)} : {}),
      ...(faq.afterLink ? {afterLink: faq.afterLink} : {}),
    })
    if (!faq.link) patch.unset(['link'])
    if (!faq.afterLink) patch.unset(['afterLink'])
    await patch.commit()
    console.log(`  ↻ faq ${faq.question}`)
    return existingId
  }

  const created = await client.create(doc)
  console.log(`  + faq ${faq.question}`)
  return created._id
}

async function upsertPage(slug: string, title: string, content: unknown[]) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "page" && slug.current == $slug][0]._id`,
    {slug},
  )

  const doc = {
    _type: 'page' as const,
    title,
    slug: {_type: 'slug' as const, current: slug},
    content,
  }

  if (existingId) {
    await client.patch(existingId).set(doc).commit()
    console.log(`✓ page /${slug === 'home' ? '' : slug} updated (${existingId})`)
    return existingId
  }

  const created = await client.create(doc)
  console.log(`✓ page /${slug === 'home' ? '' : slug} created (${created._id})`)
  return created._id
}

async function buildHomeContent(reviewIds: string[]) {
  console.log('Building home blocks…')

  const heroSlides = await Promise.all(
    HERO_SLIDES.map(async (slide) => ({
      ...(await uploadImage(slide.src, slide.alt)),
      _key: key(slide.src),
    })),
  )

  const introImage = await uploadImage(
    '/images/intro-team.jpg',
    'Het team van Hart & Huis Makelaardij',
  )

  const serviceItems = await Promise.all(
    SERVICES.map(async (service) => ({
      _key: key(service.label),
      label: service.label,
      title: service.title,
      description: service.description,
      link: externalLink(service.href),
      image: await uploadImage(service.image, service.imageAlt),
    })),
  )

  const storyImage = await uploadImage(
    '/images/story-big.jpg',
    'Een straat in Haarlem bij zonsondergang',
  )
  const storySecondary = await uploadImage(
    '/images/story-small.jpg',
    'Gevels in het centrum van Haarlem',
  )

  const listingItems = await Promise.all(
    LISTINGS.map(async (listing) => ({
      _key: key(listing.title),
      status: listing.status,
      sold: Boolean(listing.sold),
      place: listing.place,
      title: listing.title,
      meta: listing.meta,
      price: listing.price,
      link: externalLink(listing.href),
      image: await uploadImage(listing.image, listing.imageAlt),
    })),
  )

  const ctaImage = await uploadImage(
    '/images/cta-office.jpg',
    'Het kantoor van Hart & Huis Makelaardij in Haarlem',
  )

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
      badgeValue: SITE.fundaScore,
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
      facts: INTRO_FACTS.map((fact) => ({...fact, _key: key(fact.label)})),
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
      reviews: reviewIds.map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: key(id),
      })),
      link: cta('Alle beoordelingen bekijken', '#'),
    },
    {
      _type: 'listings',
      _key: key('home-listings'),
      title: 'Actueel aanbod',
      cta: cta('Bekijk alle woningen', '#'),
      items: listingItems,
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
  ]
}

async function buildVerkoopContent(faqIds: string[]) {
  console.log('Building verkoop blocks…')

  const pageHeroImage = await uploadImage(VERKOOP_HERO.image, VERKOOP_HERO.imageAlt)
  const benefitsImage = await uploadImage(
    VERKOOP_BENEFITS_IMAGE.src,
    VERKOOP_BENEFITS_IMAGE.alt,
  )
  const stepItems = await Promise.all(
    VERKOOP_STEPS.map(async (step) => ({
      _key: key(step.number),
      number: step.number,
      title: step.title,
      body: step.body,
      image: await uploadImage(step.image, step.title),
    })),
  )
  const quoteImage = await uploadImage(VERKOOP_QUOTE.image, VERKOOP_QUOTE.imageAlt)
  const ctaImage = await uploadImage(VERKOOP_CTA.image, VERKOOP_CTA.imageAlt)

  return [
    {
      _type: 'pageHero',
      _key: key('verkoop-hero'),
      image: pageHeroImage,
      breadcrumbLabel: 'Verkoop',
      eyebrow: VERKOOP_HERO.eyebrow,
      title: VERKOOP_HERO.titleBefore,
      titleHighlight: VERKOOP_HERO.titleEm,
      lead: VERKOOP_HERO.lead,
      primaryCta: cta(VERKOOP_HERO.primary.label, VERKOOP_HERO.primary.href),
      secondaryCta: cta(VERKOOP_HERO.secondary.label, VERKOOP_HERO.secondary.href),
    },
    {
      _type: 'factBar',
      _key: key('verkoop-facts'),
      facts: VERKOOP_FACTS.map((fact) => ({...fact, _key: key(fact.label)})),
    },
    {
      _type: 'benefits',
      _key: key('verkoop-benefits'),
      eyebrow: 'Wat je van ons krijgt',
      title: 'Een makelaar die het hele traject uit handen neemt',
      lead: 'Je woning verkopen kun je zelf doen, maar er komt meer bij kijken dan een mooie foto en een prijs op Funda. Wij regelen het van begin tot eind — en je weet elke week waar je staat.',
      image: benefitsImage,
      items: VERKOOP_BENEFITS.map((item) => ({...item, _key: key(item.title)})),
    },
    {
      _type: 'steps',
      _key: key('verkoop-steps'),
      eyebrow: 'Het traject',
      title: 'Zo verkopen we jouw woning',
      lead: 'Vijf stappen, van de eerste kop koffie tot de overdracht bij de notaris. Je weet vooraf precies wat er gebeurt en wanneer.',
      cta: cta('Plan een kennismaking', '#'),
      items: stepItems,
    },
    {
      _type: 'quoteBand',
      _key: key('verkoop-quote'),
      image: quoteImage,
      eyebrow: 'Een verkoper vertelt',
      quote: VERKOOP_QUOTE.quote,
      initials: VERKOOP_QUOTE.initials,
      name: VERKOOP_QUOTE.name,
      place: VERKOOP_QUOTE.place,
    },
    {
      _type: 'faqs',
      _key: key('verkoop-faqs'),
      eyebrow: 'Veelgestelde vragen',
      title: 'Goed om te weten',
      intro:
        'Staat je vraag er niet bij? Bel of app ons gewoon — we denken graag even met je mee, ook als je nog niet zeker weet of je wilt verkopen.',
      link: cta('Stel je vraag', '#'),
      faqs: faqIds.map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: key(id),
      })),
    },
    {
      _type: 'regionBlock',
      _key: key('verkoop-regions'),
      eyebrow: 'Ons werkgebied',
      title: 'Jouw NVM-makelaar voor de hele regio',
      lead: 'We kennen niet alleen Haarlem, maar ook de straten eromheen — en wat een woning daar doet. Kies je plaats voor meer over verkopen in jouw buurt.',
      places: VERKOOP_REGIONS.map((label) => ({
        _key: key(label),
        label,
        link: externalLink('#'),
      })),
    },
    {
      _type: 'crossLinks',
      _key: key('verkoop-crosslinks'),
      items: VERKOOP_CROSSLINKS.map((item) => ({
        _key: key(item.title),
        title: item.title,
        body: item.body,
        link: externalLink(item.href),
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('verkoop-cta'),
      image: ctaImage,
      eyebrow: VERKOOP_CTA.eyebrow,
      title: VERKOOP_CTA.title,
      body: VERKOOP_CTA.body,
      primaryCta: cta(VERKOOP_CTA.primary.label, VERKOOP_CTA.primary.href),
      secondaryCta: cta(VERKOOP_CTA.secondary.label, VERKOOP_CTA.secondary.href),
    },
  ]
}

async function main() {
  console.log(`Seeding Sanity project ${projectId}/${dataset}…\n`)

  console.log('Reviews')
  const reviewIds: string[] = []
  for (const review of REVIEWS) {
    reviewIds.push(await upsertReview(review))
  }

  console.log('\nFAQs')
  const faqIds: string[] = []
  for (const faq of VERKOOP_FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nHome page')
  const homeContent = await buildHomeContent(reviewIds)
  await upsertPage('home', 'Home', homeContent)

  console.log('\nVerkoop page')
  const verkoopContent = await buildVerkoopContent(faqIds)
  await upsertPage('verkoop', 'Verkoop', verkoopContent)

  console.log('\nDone. Open / and /verkoop after a refresh.')
}

main().catch((error) => {
  console.error('\nSeed failed:', error.message || error)
  process.exit(1)
})
