/** Seeds the taxatie FAQs and the /taxatie page. */
import {
  TAXATIE_BENEFITS,
  TAXATIE_BENEFITS_IMAGE,
  TAXATIE_BENEFITS_INTRO,
  TAXATIE_COMPARE,
  TAXATIE_COMPARE_INTRO,
  TAXATIE_CROSSLINKS,
  TAXATIE_CTA,
  TAXATIE_FACTS,
  TAXATIE_FAQ,
  TAXATIE_FAQ_INTRO,
  TAXATIE_HERO,
  TAXATIE_QUOTE,
  TAXATIE_REGION,
  TAXATIE_REGIONS,
  TAXATIE_STEPS,
  TAXATIE_STEPS_INTRO,
} from '../../src/lib/taxatie-content'
import {cta, externalLink, key, uploadImage, upsertFaq, upsertPage} from './shared'

async function buildTaxatieContent(faqIds: string[]) {
  console.log('Building taxatie blocks…')

  const pageHeroImage = await uploadImage(TAXATIE_HERO.image, TAXATIE_HERO.imageAlt)
  const benefitsImage = await uploadImage(
    TAXATIE_BENEFITS_IMAGE.src,
    TAXATIE_BENEFITS_IMAGE.alt,
  )
  const stepItems = await Promise.all(
    TAXATIE_STEPS.map(async (step) => ({
      _key: key(`taxatie-${step.number}`),
      number: step.number,
      title: step.title,
      body: step.body,
      image: await uploadImage(step.image, step.title),
    })),
  )
  const quoteImage = await uploadImage(TAXATIE_QUOTE.image, TAXATIE_QUOTE.imageAlt)
  const ctaImage = await uploadImage(TAXATIE_CTA.image, TAXATIE_CTA.imageAlt)

  return [
    {
      _type: 'pageHero',
      _key: key('taxatie-hero'),
      image: pageHeroImage,
      breadcrumbLabel: 'Taxatie',
      eyebrow: TAXATIE_HERO.eyebrow,
      title: TAXATIE_HERO.titleBefore,
      titleHighlight: TAXATIE_HERO.titleEm,
      lead: TAXATIE_HERO.lead,
      primaryCta: cta(TAXATIE_HERO.primary.label, TAXATIE_HERO.primary.href),
      secondaryCta: cta(TAXATIE_HERO.secondary.label, TAXATIE_HERO.secondary.href),
    },
    {
      _type: 'factBar',
      _key: key('taxatie-facts'),
      facts: TAXATIE_FACTS.map((fact) => ({...fact, _key: key(`taxatie-${fact.label}`)})),
    },
    {
      _type: 'benefits',
      _key: key('taxatie-benefits'),
      eyebrow: TAXATIE_BENEFITS_INTRO.eyebrow,
      title: TAXATIE_BENEFITS_INTRO.title,
      lead: TAXATIE_BENEFITS_INTRO.lead,
      image: benefitsImage,
      items: TAXATIE_BENEFITS.map((item) => ({...item, _key: key(item.title)})),
    },
    {
      _type: 'compareCards',
      _key: key('taxatie-compare'),
      eyebrow: TAXATIE_COMPARE_INTRO.eyebrow,
      title: TAXATIE_COMPARE_INTRO.title,
      lead: TAXATIE_COMPARE_INTRO.lead,
      cards: TAXATIE_COMPARE.map((card) => ({
        _key: key(card.title),
        label: card.label,
        title: card.title,
        body: card.body,
        items: card.items.map((item) => ({
          _key: key(item.text),
          text: item.text,
          included: item.included !== false,
        })),
        cta: cta(card.cta.label, card.cta.href),
        dark: Boolean(card.dark),
      })),
    },
    {
      _type: 'steps',
      _key: key('taxatie-steps'),
      eyebrow: TAXATIE_STEPS_INTRO.eyebrow,
      title: TAXATIE_STEPS_INTRO.title,
      lead: TAXATIE_STEPS_INTRO.lead,
      cta: cta(TAXATIE_STEPS_INTRO.cta.label, TAXATIE_STEPS_INTRO.cta.href),
      items: stepItems,
    },
    {
      _type: 'quoteBand',
      _key: key('taxatie-quote'),
      image: quoteImage,
      eyebrow: TAXATIE_QUOTE.eyebrow,
      quote: TAXATIE_QUOTE.quote,
      initials: TAXATIE_QUOTE.initials,
      name: TAXATIE_QUOTE.name,
      place: TAXATIE_QUOTE.place,
    },
    {
      _type: 'faqs',
      _key: key('taxatie-faqs'),
      eyebrow: TAXATIE_FAQ_INTRO.eyebrow,
      title: TAXATIE_FAQ_INTRO.title,
      intro: TAXATIE_FAQ_INTRO.lead,
      link: cta(TAXATIE_FAQ_INTRO.link.label, TAXATIE_FAQ_INTRO.link.href),
      faqs: faqIds.map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: key(id),
      })),
    },
    {
      _type: 'regionBlock',
      _key: key('taxatie-regions'),
      eyebrow: TAXATIE_REGION.eyebrow,
      title: TAXATIE_REGION.title,
      lead: TAXATIE_REGION.lead,
      places: TAXATIE_REGIONS.map((label) => ({
        _key: key(`taxatie-${label}`),
        label,
        link: externalLink('#'),
      })),
    },
    {
      _type: 'crossLinks',
      _key: key('taxatie-crosslinks'),
      items: TAXATIE_CROSSLINKS.map((item) => ({
        _key: key(item.title),
        title: item.title,
        body: item.body,
        link: externalLink(item.href),
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('taxatie-cta'),
      image: ctaImage,
      eyebrow: TAXATIE_CTA.eyebrow,
      title: TAXATIE_CTA.title,
      body: TAXATIE_CTA.body,
      primaryCta: cta(TAXATIE_CTA.primary.label, TAXATIE_CTA.primary.href),
      secondaryCta: cta(TAXATIE_CTA.secondary.label, TAXATIE_CTA.secondary.href),
    },
  ]
}

export async function seedTaxatie() {
  console.log('Taxatie FAQs')
  const faqIds: string[] = []
  for (const faq of TAXATIE_FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nTaxatie page')
  await upsertPage('taxatie', 'Taxatie', await buildTaxatieContent(faqIds))
}
