/** Seeds the Haarlem FAQs and the /haarlem page (stad-template, only existing blocks). */
import {
  HAARLEM_CTA,
  HAARLEM_DIENSTEN,
  HAARLEM_DIENSTEN_INTRO,
  HAARLEM_FACTS,
  HAARLEM_FACTS_NOTE,
  HAARLEM_FAQ,
  HAARLEM_FAQ_INTRO,
  HAARLEM_HERO,
  HAARLEM_INTRO,
  HAARLEM_OMGEVING,
  HAARLEM_OMGEVING_INTRO,
  HAARLEM_QUOTE,
  HAARLEM_SEO,
  HAARLEM_WIJKEN,
  HAARLEM_WIJKEN_INTRO,
} from '../../src/lib/haarlem-content'
import {cta, externalLink, key, uploadImage, upsertFaq, upsertPage} from './shared'

async function buildHaarlemContent(faqIds: string[]) {
  console.log('Building haarlem blocks…')

  const heroImage = await uploadImage(HAARLEM_HERO.image, HAARLEM_HERO.imageAlt)
  const introImage = await uploadImage(HAARLEM_INTRO.image.src, HAARLEM_INTRO.image.alt)
  const quoteImage = await uploadImage(HAARLEM_QUOTE.image, HAARLEM_QUOTE.imageAlt)
  const ctaImage = await uploadImage(HAARLEM_CTA.image, HAARLEM_CTA.imageAlt)

  return [
    {
      _type: 'pageHero',
      _key: key('haarlem-hero'),
      image: heroImage,
      breadcrumbLabel: 'Haarlem',
      eyebrow: HAARLEM_HERO.eyebrow,
      title: HAARLEM_HERO.titleBefore,
      titleHighlight: HAARLEM_HERO.titleEm,
      titleAfter: HAARLEM_HERO.titleAfter,
      lead: HAARLEM_HERO.lead,
      primaryCta: cta(HAARLEM_HERO.primary.label, HAARLEM_HERO.primary.href),
      secondaryCta: cta(HAARLEM_HERO.secondary.label, HAARLEM_HERO.secondary.href),
    },
    {
      _type: 'factBar',
      _key: key('haarlem-facts'),
      facts: HAARLEM_FACTS.map((fact) => ({...fact, _key: key(`haarlem-${fact.label}`)})),
      note: HAARLEM_FACTS_NOTE,
    },
    {
      // Geen cta: mediaText toont dan geen knop (de design heeft er hier geen).
      _type: 'mediaText',
      _key: key('haarlem-intro'),
      eyebrow: HAARLEM_INTRO.eyebrow,
      title: HAARLEM_INTRO.title,
      paragraphs: [...HAARLEM_INTRO.paragraphs],
      image: introImage,
    },
    {
      _type: 'iconCards',
      _key: key('haarlem-diensten'),
      eyebrow: HAARLEM_DIENSTEN_INTRO.eyebrow,
      title: HAARLEM_DIENSTEN_INTRO.title,
      lead: HAARLEM_DIENSTEN_INTRO.lead,
      items: HAARLEM_DIENSTEN.map((item) => ({
        _key: key(`haarlem-${item.title}`),
        icon: item.icon,
        title: item.title,
        body: item.body,
        cta: cta(item.cta.label, item.cta.href),
      })),
    },
    {
      // Wijken zonder link: RegionBlock toont ze als tekst.
      _type: 'regionBlock',
      _key: key('haarlem-wijken'),
      eyebrow: HAARLEM_WIJKEN_INTRO.eyebrow,
      title: HAARLEM_WIJKEN_INTRO.title,
      lead: HAARLEM_WIJKEN_INTRO.lead,
      places: HAARLEM_WIJKEN.map((label) => ({_key: key(`haarlem-wijk-${label}`), label})),
    },
    {
      _type: 'quoteBand',
      _key: key('haarlem-quote'),
      image: quoteImage,
      eyebrow: HAARLEM_QUOTE.eyebrow,
      quote: HAARLEM_QUOTE.quote,
      initials: HAARLEM_QUOTE.initials,
      name: HAARLEM_QUOTE.name,
      place: HAARLEM_QUOTE.place,
    },
    {
      _type: 'faqs',
      _key: key('haarlem-faqs'),
      eyebrow: HAARLEM_FAQ_INTRO.eyebrow,
      title: HAARLEM_FAQ_INTRO.title,
      intro: HAARLEM_FAQ_INTRO.lead,
      link: cta(HAARLEM_FAQ_INTRO.link.label, HAARLEM_FAQ_INTRO.link.href),
      faqs: faqIds.map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: key(id),
      })),
    },
    {
      _type: 'regionBlock',
      _key: key('haarlem-omgeving'),
      eyebrow: HAARLEM_OMGEVING_INTRO.eyebrow,
      title: HAARLEM_OMGEVING_INTRO.title,
      lead: HAARLEM_OMGEVING_INTRO.lead,
      places: HAARLEM_OMGEVING.map((label) => ({
        _key: key(`haarlem-omgeving-${label}`),
        label,
        link: externalLink('#'),
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('haarlem-cta'),
      image: ctaImage,
      eyebrow: HAARLEM_CTA.eyebrow,
      title: HAARLEM_CTA.title,
      body: HAARLEM_CTA.body,
      primaryCta: cta(HAARLEM_CTA.primary.label, HAARLEM_CTA.primary.href),
      secondaryCta: cta(HAARLEM_CTA.secondary.label, HAARLEM_CTA.secondary.href),
    },
  ]
}

export async function seedHaarlem() {
  console.log('Haarlem FAQs')
  const faqIds: string[] = []
  for (const faq of HAARLEM_FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nHaarlem page')
  await upsertPage('haarlem', 'Haarlem', await buildHaarlemContent(faqIds), HAARLEM_SEO)
}
