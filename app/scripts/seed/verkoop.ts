/** Seeds the verkoop FAQs and the /verkoop page. */
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
} from '../../src/lib/verkoop-content'
import {cta, externalLink, key, uploadImage, upsertFaq, upsertPage} from './shared'

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

export async function seedVerkoop() {
  console.log('Verkoop FAQs')
  const faqIds: string[] = []
  for (const faq of VERKOOP_FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nVerkoop page')
  await upsertPage('verkoop', 'Verkoop', await buildVerkoopContent(faqIds))
}
