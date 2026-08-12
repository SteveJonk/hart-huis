/** Seeds the /over-ons page. */
import {
  OVER_ONS_ASSURANCES,
  OVER_ONS_ASSURANCES_INTRO,
  OVER_ONS_BUITEN,
  OVER_ONS_CTA,
  OVER_ONS_DUO,
  OVER_ONS_OPENER,
  OVER_ONS_TIMELINE,
  OVER_ONS_TIMELINE_INTRO,
  OVER_ONS_VALUES,
  OVER_ONS_VALUES_INTRO,
} from '../../src/lib/over-ons-content'
import {cta, key, uploadImage, upsertPage} from './shared'

async function buildOverOnsContent() {
  console.log('Building over-ons blocks…')

  const duoImage = await uploadImage(OVER_ONS_DUO.image.src, OVER_ONS_DUO.image.alt)
  const duoSecondary = await uploadImage(
    OVER_ONS_DUO.secondaryImage.src,
    OVER_ONS_DUO.secondaryImage.alt,
  )
  const timelineItems = await Promise.all(
    OVER_ONS_TIMELINE.map(async (item) => ({
      _key: key(item.year),
      year: item.year,
      title: item.title,
      body: item.body,
      ...(item.image
        ? {image: await uploadImage(item.image.src, item.image.alt)}
        : {}),
    })),
  )
  const buitenImage = await uploadImage(
    OVER_ONS_BUITEN.image.src,
    OVER_ONS_BUITEN.image.alt,
  )
  const ctaImage = await uploadImage(OVER_ONS_CTA.image.src, OVER_ONS_CTA.image.alt)

  return [
    {
      _type: 'pageOpener',
      _key: key('over-ons-opener'),
      eyebrow: OVER_ONS_OPENER.eyebrow,
      title: OVER_ONS_OPENER.title,
      titleHighlight: OVER_ONS_OPENER.titleEm,
      lead: OVER_ONS_OPENER.lead,
      motto: OVER_ONS_OPENER.motto,
      attribution: OVER_ONS_OPENER.attribution,
    },
    {
      _type: 'duoPhotos',
      _key: key('over-ons-duo'),
      image: duoImage,
      stampValue: OVER_ONS_DUO.stampValue,
      stampLabel: OVER_ONS_DUO.stampLabel,
      secondaryImage: duoSecondary,
      caption: OVER_ONS_DUO.caption,
    },
    {
      _type: 'timeline',
      _key: key('over-ons-timeline'),
      eyebrow: OVER_ONS_TIMELINE_INTRO.eyebrow,
      title: OVER_ONS_TIMELINE_INTRO.title,
      lead: OVER_ONS_TIMELINE_INTRO.lead,
      items: timelineItems,
    },
    {
      _type: 'valueCards',
      _key: key('over-ons-values'),
      eyebrow: OVER_ONS_VALUES_INTRO.eyebrow,
      title: OVER_ONS_VALUES_INTRO.title,
      lead: OVER_ONS_VALUES_INTRO.lead,
      items: OVER_ONS_VALUES.map((item) => ({...item, _key: key(item.title)})),
    },
    {
      _type: 'mediaText',
      _key: key('over-ons-buiten'),
      eyebrow: OVER_ONS_BUITEN.eyebrow,
      title: OVER_ONS_BUITEN.title,
      paragraphs: [...OVER_ONS_BUITEN.paragraphs],
      cta: cta(OVER_ONS_BUITEN.cta.label, OVER_ONS_BUITEN.cta.href),
      image: buitenImage,
    },
    {
      _type: 'assurances',
      _key: key('over-ons-assurances'),
      eyebrow: OVER_ONS_ASSURANCES_INTRO.eyebrow,
      title: OVER_ONS_ASSURANCES_INTRO.title,
      lead: OVER_ONS_ASSURANCES_INTRO.lead,
      items: OVER_ONS_ASSURANCES.map((item) => ({...item, _key: key(item.title)})),
    },
    {
      _type: 'ctaBand',
      _key: key('over-ons-cta'),
      image: ctaImage,
      eyebrow: OVER_ONS_CTA.eyebrow,
      title: OVER_ONS_CTA.title,
      body: OVER_ONS_CTA.body,
      primaryCta: cta(OVER_ONS_CTA.primary.label, OVER_ONS_CTA.primary.href),
      secondaryCta: cta(OVER_ONS_CTA.secondary.label, OVER_ONS_CTA.secondary.href),
    },
  ]
}

export async function seedOverOns() {
  console.log('Over ons page')
  await upsertPage('over-ons', 'Over ons', await buildOverOnsContent())
}
