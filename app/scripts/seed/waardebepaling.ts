/**
 * Seeds the /waardebepaling FAQs, the multi-step `form` document for its
 * wizard, and the /waardebepaling page. Not linked from navigation —
 * seed:nav does not need to run for this page.
 */
import {
  WAARDEBEPALING_FAQ,
  WAARDEBEPALING_FAQ_INTRO,
  WAARDEBEPALING_FORM,
  WAARDEBEPALING_HERO,
  WAARDEBEPALING_KRIJGT,
  WAARDEBEPALING_KRIJGT_INTRO,
  WAARDEBEPALING_REVIEWS,
  WAARDEBEPALING_REVIEWS_INTRO,
  WAARDEBEPALING_SLOT,
  WAARDEBEPALING_STAPPEN,
  WAARDEBEPALING_STAPPEN_INTRO,
  WAARDEBEPALING_WIE,
} from '../../src/lib/waardebepaling-content'
import {cta, key, uploadImage, upsertFaq, upsertForm, upsertPage} from './shared'

async function buildWaardebepalingContent(formId: string, faqIds: string[]) {
  console.log('Building waardebepaling blocks…')

  const heroImage = await uploadImage(WAARDEBEPALING_HERO.image, WAARDEBEPALING_HERO.imageAlt)
  const wieImage = await uploadImage(WAARDEBEPALING_WIE.image, WAARDEBEPALING_WIE.imageAlt)

  return [
    {
      _type: 'formHero',
      _key: key('waardebepaling-hero'),
      image: heroImage,
      eyebrow: WAARDEBEPALING_HERO.eyebrow,
      title: WAARDEBEPALING_HERO.titleBefore,
      titleHighlight: WAARDEBEPALING_HERO.titleEm,
      titleAfter: WAARDEBEPALING_HERO.titleAfter,
      lead: WAARDEBEPALING_HERO.lead,
      usps: [...WAARDEBEPALING_HERO.usps],
      score: WAARDEBEPALING_HERO.score,
      scoreLabel: WAARDEBEPALING_HERO.scoreLabel,
      reviewCount: WAARDEBEPALING_HERO.reviewCount,
      reviewNote: WAARDEBEPALING_HERO.reviewNote,
      formTitle: WAARDEBEPALING_HERO.formTitle,
      formLead: WAARDEBEPALING_HERO.formLead,
      form: {_type: 'reference' as const, _ref: formId},
      privacyNote: WAARDEBEPALING_HERO.privacyNote,
    },
    {
      _type: 'iconCards',
      _key: key('waardebepaling-krijgt'),
      eyebrow: WAARDEBEPALING_KRIJGT_INTRO.eyebrow,
      title: WAARDEBEPALING_KRIJGT_INTRO.title,
      lead: WAARDEBEPALING_KRIJGT_INTRO.lead,
      items: WAARDEBEPALING_KRIJGT.map((item) => ({...item, _key: key(item.title)})),
    },
    {
      _type: 'numberedSteps',
      _key: key('waardebepaling-stappen'),
      eyebrow: WAARDEBEPALING_STAPPEN_INTRO.eyebrow,
      title: WAARDEBEPALING_STAPPEN_INTRO.title,
      lead: WAARDEBEPALING_STAPPEN_INTRO.lead,
      items: WAARDEBEPALING_STAPPEN.map((item) => ({...item, _key: key(item.number)})),
    },
    {
      _type: 'personQuote',
      _key: key('waardebepaling-wie'),
      image: wieImage,
      eyebrow: WAARDEBEPALING_WIE.eyebrow,
      title: WAARDEBEPALING_WIE.title,
      paragraphs: [...WAARDEBEPALING_WIE.paragraphs],
      quote: WAARDEBEPALING_WIE.quote,
      name: WAARDEBEPALING_WIE.name,
    },
    {
      _type: 'quoteStrip',
      _key: key('waardebepaling-reviews'),
      score: WAARDEBEPALING_REVIEWS_INTRO.score,
      scoreLabel: WAARDEBEPALING_REVIEWS_INTRO.scoreLabel,
      title: WAARDEBEPALING_REVIEWS_INTRO.title,
      lead: WAARDEBEPALING_REVIEWS_INTRO.lead,
      link: cta(WAARDEBEPALING_REVIEWS_INTRO.link.label, WAARDEBEPALING_REVIEWS_INTRO.link.href),
      items: WAARDEBEPALING_REVIEWS.map((item) => ({...item, _key: key(item.meta)})),
    },
    {
      _type: 'faqs',
      _key: key('waardebepaling-faqs'),
      eyebrow: WAARDEBEPALING_FAQ_INTRO.eyebrow,
      title: WAARDEBEPALING_FAQ_INTRO.title,
      intro: WAARDEBEPALING_FAQ_INTRO.lead,
      link: cta(WAARDEBEPALING_FAQ_INTRO.link.label, WAARDEBEPALING_FAQ_INTRO.link.href),
      faqs: faqIds.map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: key(id),
      })),
    },
    {
      _type: 'centeredCta',
      _key: key('waardebepaling-slot'),
      eyebrow: WAARDEBEPALING_SLOT.eyebrow,
      title: WAARDEBEPALING_SLOT.title,
      body: WAARDEBEPALING_SLOT.body,
      primaryCta: cta(WAARDEBEPALING_SLOT.primary.label, WAARDEBEPALING_SLOT.primary.href),
      secondaryCta: cta(WAARDEBEPALING_SLOT.secondary.label, WAARDEBEPALING_SLOT.secondary.href),
    },
  ]
}

export async function seedWaardebepaling() {
  console.log('Waardebepaling form')
  const formId = await upsertForm(WAARDEBEPALING_FORM)

  console.log('\nWaardebepaling FAQs')
  const faqIds: string[] = []
  for (const faq of WAARDEBEPALING_FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nWaardebepaling page')
  await upsertPage('waardebepaling', 'Waardebepaling', await buildWaardebepalingContent(formId, faqIds))
}
