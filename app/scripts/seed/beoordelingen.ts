/**
 * Seeds the /beoordelingen page. De beoordelingen zelf komen uit `seed:home`
 * (dat de review-documenten aanmaakt); deze pagina toont ze allemaal.
 */
import {
  BEOORDELINGEN_CTA,
  BEOORDELINGEN_GRID,
  BEOORDELINGEN_HERO,
  BEOORDELINGEN_UITGELICHT,
  BEOORDELINGEN_WERKWIJZE,
} from '../../src/lib/beoordelingen-content'
import { client, cta, key, uploadImage, upsertPage } from './shared'

async function buildBeoordelingenContent() {
  console.log('Building beoordelingen blocks…')

  const uitgelichtImage = await uploadImage(
    BEOORDELINGEN_UITGELICHT.image.src,
    BEOORDELINGEN_UITGELICHT.image.alt,
  )
  const ctaImage = await uploadImage(BEOORDELINGEN_CTA.image.src, BEOORDELINGEN_CTA.image.alt)

  // Het hoogste cijfer als uitgelichte beoordeling; zonder cijfers gewoon de eerste.
  const featuredId = await client.fetch<string | null>(
    `*[_type == "review"] | order(coalesce(grade, 0) desc, _createdAt asc)[0]._id`,
  )
  if (!featuredId) {
    throw new Error('Geen review-documenten gevonden — draai eerst `npm run seed:home`.')
  }

  return [
    {
      _type: 'beoordelingenHero',
      _key: key('beoordelingen-hero'),
      breadcrumbLabel: BEOORDELINGEN_HERO.breadcrumbLabel,
      eyebrow: BEOORDELINGEN_HERO.eyebrow,
      title: BEOORDELINGEN_HERO.titleBefore,
      titleHighlight: BEOORDELINGEN_HERO.titleEm,
      lead: BEOORDELINGEN_HERO.lead,
      primaryCta: cta(BEOORDELINGEN_HERO.primaryCta.label, BEOORDELINGEN_HERO.primaryCta.href),
      secondaryCta: cta(
        BEOORDELINGEN_HERO.secondaryCta.label,
        BEOORDELINGEN_HERO.secondaryCta.href,
      ),
      scoreLabel: BEOORDELINGEN_HERO.scoreLabel,
      scoreNote: BEOORDELINGEN_HERO.scoreNote,
    },
    {
      _type: 'uitgelichteReview',
      _key: key('beoordelingen-uitgelicht'),
      eyebrow: BEOORDELINGEN_UITGELICHT.eyebrow,
      image: uitgelichtImage,
      review: { _type: 'reference' as const, _ref: featuredId },
    },
    {
      _type: 'reviewGrid',
      _key: key('beoordelingen-grid'),
      title: BEOORDELINGEN_GRID.title,
      more: BEOORDELINGEN_GRID.more,
      empty: BEOORDELINGEN_GRID.empty,
    },
    {
      _type: 'werkwijze',
      _key: key('beoordelingen-werkwijze'),
      eyebrow: BEOORDELINGEN_WERKWIJZE.eyebrow,
      title: BEOORDELINGEN_WERKWIJZE.title,
      lead: BEOORDELINGEN_WERKWIJZE.lead,
      items: BEOORDELINGEN_WERKWIJZE.items.map((item) => ({
        _key: key(item.number),
        number: item.number,
        title: item.title,
        body: item.body,
      })),
    },
    {
      _type: 'ctaBand',
      _key: key('beoordelingen-cta'),
      image: ctaImage,
      eyebrow: BEOORDELINGEN_CTA.eyebrow,
      title: BEOORDELINGEN_CTA.title,
      body: BEOORDELINGEN_CTA.body,
      primaryCta: cta(BEOORDELINGEN_CTA.primaryCta.label, BEOORDELINGEN_CTA.primaryCta.href),
      secondaryCta: cta(
        BEOORDELINGEN_CTA.secondaryCta.label,
        BEOORDELINGEN_CTA.secondaryCta.href,
      ),
    },
  ]
}

export async function seedBeoordelingen() {
  console.log('Beoordelingen page')
  await upsertPage('beoordelingen', 'Beoordelingen', await buildBeoordelingenContent())
}
