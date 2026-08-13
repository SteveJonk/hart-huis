/** Seeds the /aanbod overview page. The woningen themselves come from `seed:objecten`. */
import {
  AANBOD_CTA,
  AANBOD_EMPTY,
  AANBOD_GRID_CTA,
  AANBOD_HEADER,
} from '../../src/lib/aanbod-content'
import {cta, key, uploadImage, upsertPage} from './shared'

async function buildAanbodContent() {
  console.log('Building aanbod blocks…')

  const ctaImage = await uploadImage(AANBOD_CTA.image.src, AANBOD_CTA.image.alt)

  return [
    {
      _type: 'aanbodHeader',
      _key: key('aanbod-header'),
      breadcrumbLabel: AANBOD_HEADER.breadcrumbLabel,
      eyebrow: AANBOD_HEADER.eyebrow,
      title: AANBOD_HEADER.titleBefore,
      titleHighlight: AANBOD_HEADER.titleEm,
      lead: AANBOD_HEADER.lead,
      aside: {
        title: AANBOD_HEADER.aside.title,
        body: AANBOD_HEADER.aside.body,
        cta: cta(AANBOD_HEADER.aside.cta.label, AANBOD_HEADER.aside.cta.href),
      },
    },
    {
      _type: 'objectGrid',
      _key: key('aanbod-grid'),
      ctaCard: {
        title: AANBOD_GRID_CTA.title,
        body: AANBOD_GRID_CTA.body,
        cta: cta(AANBOD_GRID_CTA.cta.label, AANBOD_GRID_CTA.cta.href),
      },
      emptyTitle: AANBOD_EMPTY.title,
      emptyBody: AANBOD_EMPTY.body,
    },
    {
      _type: 'ctaBand',
      _key: key('aanbod-cta'),
      image: ctaImage,
      eyebrow: AANBOD_CTA.eyebrow,
      title: AANBOD_CTA.title,
      body: AANBOD_CTA.body,
      primaryCta: cta(AANBOD_CTA.primaryCta.label, AANBOD_CTA.primaryCta.href),
      secondaryCta: cta(AANBOD_CTA.secondaryCta.label, AANBOD_CTA.secondaryCta.href),
    },
  ]
}

export async function seedAanbod() {
  console.log('Aanbod page')
  await upsertPage('aanbod', 'Actueel aanbod', await buildAanbodContent())
}
