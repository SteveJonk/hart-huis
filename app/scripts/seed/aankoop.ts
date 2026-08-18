/** Seeds the aankoop FAQs and the /aankoop page. */
import {
  AANKOOP_BENEFITS,
  AANKOOP_BENEFITS_IMAGE,
  AANKOOP_BENEFITS_INTRO,
  AANKOOP_CROSSLINKS,
  AANKOOP_CTA,
  AANKOOP_FACTS,
  AANKOOP_FAQ,
  AANKOOP_FAQ_INTRO,
  AANKOOP_HERO,
  AANKOOP_QUOTE,
  AANKOOP_REGION,
  AANKOOP_REGIONS,
  AANKOOP_STEPS,
  AANKOOP_STEPS_INTRO,
  AANKOOP_ZOEKOPDRACHT,
} from '../../src/lib/aankoop-content'
import {cta, externalLink, key, uploadImage, upsertFaq, upsertPage} from './shared'

async function buildAankoopContent(faqIds: string[]) {
  console.log('Building aankoop blocks…')

  const pageHeroImage = await uploadImage(AANKOOP_HERO.image, AANKOOP_HERO.imageAlt)
  const benefitsImage = await uploadImage(
    AANKOOP_BENEFITS_IMAGE.src,
    AANKOOP_BENEFITS_IMAGE.alt,
  )
  const stepItems = await Promise.all(
    AANKOOP_STEPS.map(async (step) => ({
      _key: key(`aankoop-${step.number}`),
      number: step.number,
      title: step.title,
      body: step.body,
      image: await uploadImage(step.image, step.title),
    })),
  )
  const quoteImage = await uploadImage(AANKOOP_QUOTE.image, AANKOOP_QUOTE.imageAlt)
  const ctaImage = await uploadImage(AANKOOP_CTA.image, AANKOOP_CTA.imageAlt)

  return [
    {
      _type: 'pageHero',
      _key: key('aankoop-hero'),
      image: pageHeroImage,
      breadcrumbLabel: 'Aankoop',
      eyebrow: AANKOOP_HERO.eyebrow,
      title: AANKOOP_HERO.titleBefore,
      titleHighlight: AANKOOP_HERO.titleEm,
      lead: AANKOOP_HERO.lead,
      primaryCta: cta(AANKOOP_HERO.primary.label, AANKOOP_HERO.primary.href),
      secondaryCta: cta(AANKOOP_HERO.secondary.label, AANKOOP_HERO.secondary.href),
    },
    {
      _type: 'factBar',
      _key: key('aankoop-facts'),
      facts: AANKOOP_FACTS.map((fact) => ({
        ...fact,
        _key: key(`aankoop-${fact.label}`),
      })),
    },
    {
      _type: 'benefits',
      _key: key('aankoop-benefits'),
      eyebrow: AANKOOP_BENEFITS_INTRO.eyebrow,
      title: AANKOOP_BENEFITS_INTRO.title,
      lead: AANKOOP_BENEFITS_INTRO.lead,
      image: benefitsImage,
      items: AANKOOP_BENEFITS.map((item) => ({...item, _key: key(item.title)})),
    },
    {
      _type: 'highlightStrip',
      _key: key('aankoop-zoekopdracht'),
      icon: AANKOOP_ZOEKOPDRACHT.icon,
      title: AANKOOP_ZOEKOPDRACHT.title,
      body: AANKOOP_ZOEKOPDRACHT.body,
      cta: cta(AANKOOP_ZOEKOPDRACHT.cta.label, AANKOOP_ZOEKOPDRACHT.cta.href),
    },
    {
      _type: 'steps',
      _key: key('aankoop-steps'),
      eyebrow: AANKOOP_STEPS_INTRO.eyebrow,
      title: AANKOOP_STEPS_INTRO.title,
      lead: AANKOOP_STEPS_INTRO.lead,
      cta: cta(AANKOOP_STEPS_INTRO.cta.label, AANKOOP_STEPS_INTRO.cta.href),
      items: stepItems,
    },
    {
      _type: 'quoteBand',
      _key: key('aankoop-quote'),
      image: quoteImage,
      eyebrow: AANKOOP_QUOTE.eyebrow,
      quote: AANKOOP_QUOTE.quote,
      initials: AANKOOP_QUOTE.initials,
      name: AANKOOP_QUOTE.name,
      place: AANKOOP_QUOTE.place,
    },
    {
      _type: 'faqs',
      _key: key('aankoop-faqs'),
      eyebrow: AANKOOP_FAQ_INTRO.eyebrow,
      title: AANKOOP_FAQ_INTRO.title,
      intro: AANKOOP_FAQ_INTRO.lead,
      link: cta(AANKOOP_FAQ_INTRO.link.label, AANKOOP_FAQ_INTRO.link.href),
      faqs: faqIds.map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: key(id),
      })),
    },
    {
      _type: 'regionBlock',
      _key: key('aankoop-regions'),
      eyebrow: AANKOOP_REGION.eyebrow,
      title: AANKOOP_REGION.title,
      lead: AANKOOP_REGION.lead,
      places: AANKOOP_REGIONS.map((label) => ({
        _key: key(`aankoop-${label}`),
        label,
        link: externalLink('#'),
      })),
    },
    {
      _type: 'crossLinks',
      _key: key('aankoop-crosslinks'),
      items: AANKOOP_CROSSLINKS.map((item) => ({
        _key: key(`aankoop-${item.title}`),
        title: item.title,
        body: item.body,
        link: externalLink(item.href),
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('aankoop-cta'),
      image: ctaImage,
      eyebrow: AANKOOP_CTA.eyebrow,
      title: AANKOOP_CTA.title,
      body: AANKOOP_CTA.body,
      primaryCta: cta(AANKOOP_CTA.primary.label, AANKOOP_CTA.primary.href),
      secondaryCta: cta(AANKOOP_CTA.secondary.label, AANKOOP_CTA.secondary.href),
    },
  ]
}

export async function seedAankoop() {
  console.log('Aankoop FAQs')
  const faqIds: string[] = []
  for (const faq of AANKOOP_FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nAankoop page')
  await upsertPage('aankoop', 'Aankoop', await buildAankoopContent(faqIds))
}
