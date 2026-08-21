/**
 * Seeds the /zoekopdracht FAQs, the multi-step `form` document for its
 * wizard, and the /zoekopdracht page. Not linked from navigation —
 * seed:nav does not need to run for this page.
 */
import {
  ZOEKOPDRACHT_FAQ,
  ZOEKOPDRACHT_FAQ_INTRO,
  ZOEKOPDRACHT_FORM,
  ZOEKOPDRACHT_HERO,
  ZOEKOPDRACHT_KRIJGT,
  ZOEKOPDRACHT_KRIJGT_INTRO,
  ZOEKOPDRACHT_REVIEWS,
  ZOEKOPDRACHT_REVIEWS_INTRO,
  ZOEKOPDRACHT_SLOT,
  ZOEKOPDRACHT_STAPPEN,
  ZOEKOPDRACHT_STAPPEN_INTRO,
  ZOEKOPDRACHT_WIE,
} from '../../src/lib/zoekopdracht-content'
import {cta, key, uploadImage, upsertFaq, upsertForm, upsertPage} from './shared'

async function buildZoekopdrachtContent(formId: string, faqIds: string[]) {
  console.log('Building zoekopdracht blocks…')

  const heroImage = await uploadImage(ZOEKOPDRACHT_HERO.image, ZOEKOPDRACHT_HERO.imageAlt)
  const wieImage = await uploadImage(ZOEKOPDRACHT_WIE.image, ZOEKOPDRACHT_WIE.imageAlt)

  return [
    {
      _type: 'formHero',
      _key: key('zoekopdracht-hero'),
      image: heroImage,
      eyebrow: ZOEKOPDRACHT_HERO.eyebrow,
      title: ZOEKOPDRACHT_HERO.titleBefore,
      titleHighlight: ZOEKOPDRACHT_HERO.titleEm,
      titleAfter: ZOEKOPDRACHT_HERO.titleAfter,
      lead: ZOEKOPDRACHT_HERO.lead,
      usps: [...ZOEKOPDRACHT_HERO.usps],
      score: ZOEKOPDRACHT_HERO.score,
      scoreLabel: ZOEKOPDRACHT_HERO.scoreLabel,
      reviewCount: ZOEKOPDRACHT_HERO.reviewCount,
      reviewNote: ZOEKOPDRACHT_HERO.reviewNote,
      formTitle: ZOEKOPDRACHT_HERO.formTitle,
      formLead: ZOEKOPDRACHT_HERO.formLead,
      form: {_type: 'reference' as const, _ref: formId},
      privacyNote: ZOEKOPDRACHT_HERO.privacyNote,
    },
    {
      _type: 'iconCards',
      _key: key('zoekopdracht-krijgt'),
      eyebrow: ZOEKOPDRACHT_KRIJGT_INTRO.eyebrow,
      title: ZOEKOPDRACHT_KRIJGT_INTRO.title,
      lead: ZOEKOPDRACHT_KRIJGT_INTRO.lead,
      items: ZOEKOPDRACHT_KRIJGT.map((item) => ({...item, _key: key(item.title)})),
    },
    {
      _type: 'numberedSteps',
      _key: key('zoekopdracht-stappen'),
      eyebrow: ZOEKOPDRACHT_STAPPEN_INTRO.eyebrow,
      title: ZOEKOPDRACHT_STAPPEN_INTRO.title,
      lead: ZOEKOPDRACHT_STAPPEN_INTRO.lead,
      items: ZOEKOPDRACHT_STAPPEN.map((item) => ({...item, _key: key(item.number)})),
    },
    {
      _type: 'personQuote',
      _key: key('zoekopdracht-wie'),
      image: wieImage,
      eyebrow: ZOEKOPDRACHT_WIE.eyebrow,
      title: ZOEKOPDRACHT_WIE.title,
      paragraphs: [...ZOEKOPDRACHT_WIE.paragraphs],
      quote: ZOEKOPDRACHT_WIE.quote,
      name: ZOEKOPDRACHT_WIE.name,
    },
    {
      _type: 'quoteStrip',
      _key: key('zoekopdracht-reviews'),
      score: ZOEKOPDRACHT_REVIEWS_INTRO.score,
      scoreLabel: ZOEKOPDRACHT_REVIEWS_INTRO.scoreLabel,
      title: ZOEKOPDRACHT_REVIEWS_INTRO.title,
      lead: ZOEKOPDRACHT_REVIEWS_INTRO.lead,
      link: cta(ZOEKOPDRACHT_REVIEWS_INTRO.link.label, ZOEKOPDRACHT_REVIEWS_INTRO.link.href),
      items: ZOEKOPDRACHT_REVIEWS.map((item) => ({...item, _key: key(item.meta)})),
    },
    {
      _type: 'faqs',
      _key: key('zoekopdracht-faqs'),
      eyebrow: ZOEKOPDRACHT_FAQ_INTRO.eyebrow,
      title: ZOEKOPDRACHT_FAQ_INTRO.title,
      intro: ZOEKOPDRACHT_FAQ_INTRO.lead,
      link: cta(ZOEKOPDRACHT_FAQ_INTRO.link.label, ZOEKOPDRACHT_FAQ_INTRO.link.href),
      faqs: faqIds.map((id) => ({
        _type: 'reference' as const,
        _ref: id,
        _key: key(id),
      })),
    },
    {
      _type: 'centeredCta',
      _key: key('zoekopdracht-slot'),
      eyebrow: ZOEKOPDRACHT_SLOT.eyebrow,
      title: ZOEKOPDRACHT_SLOT.title,
      body: ZOEKOPDRACHT_SLOT.body,
      primaryCta: cta(ZOEKOPDRACHT_SLOT.primary.label, ZOEKOPDRACHT_SLOT.primary.href),
      secondaryCta: cta(ZOEKOPDRACHT_SLOT.secondary.label, ZOEKOPDRACHT_SLOT.secondary.href),
    },
  ]
}

export async function seedZoekopdracht() {
  console.log('Zoekopdracht form')
  const formId = await upsertForm(ZOEKOPDRACHT_FORM)

  console.log('\nZoekopdracht FAQs')
  const faqIds: string[] = []
  for (const faq of ZOEKOPDRACHT_FAQ) {
    faqIds.push(await upsertFaq(faq))
  }

  console.log('\nZoekopdracht page')
  await upsertPage('zoekopdracht', 'Zoekopdracht', await buildZoekopdrachtContent(formId, faqIds))
}
