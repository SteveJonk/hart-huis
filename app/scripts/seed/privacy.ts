/**
 * Seeds /privacyverklaring: `pageOpener` + het nieuwe `richText`-blok + een
 * `ctaBand`. De tekst staat in `src/lib/privacy-content.ts` en wordt hier met
 * `toPortableText()` omgezet naar het Portable Text dat `richText.body`
 * verwacht.
 *
 * Niet aan de navigatie gekoppeld — de link staat onderaan in de footer, dus
 * draai hierna ook `npm run seed:nav`.
 *
 * Let op: een tweede `seed:privacy` overschrijft wat de redactie in de studio
 * aan de tekst heeft veranderd. Draai hem één keer en beheer de tekst daarna
 * in de studio.
 */
import { PRIVACY_BODY, PRIVACY_CTA, PRIVACY_OPENER } from '../../src/lib/privacy-content'
import { toPortableText } from '../../src/lib/rich-text'
import { cta, key, uploadImage, upsertPage } from './shared'

export const PRIVACY_SLUG = 'privacyverklaring'

async function buildPrivacyContent() {
  console.log('Building privacy blocks…')

  const ctaImage = await uploadImage(PRIVACY_CTA.image, PRIVACY_CTA.imageAlt)

  return [
    {
      _type: 'pageOpener',
      _key: key('privacy-opener'),
      eyebrow: PRIVACY_OPENER.eyebrow,
      title: PRIVACY_OPENER.title,
      titleHighlight: PRIVACY_OPENER.titleEm,
      lead: PRIVACY_OPENER.lead,
      motto: PRIVACY_OPENER.motto,
      attribution: PRIVACY_OPENER.attribution,
    },
    {
      _type: 'richText',
      _key: key('privacy-tekst'),
      body: toPortableText(PRIVACY_BODY, (seed) => key(`privacy:${seed}`)),
    },
    {
      _type: 'ctaBand',
      _key: key('privacy-cta'),
      image: ctaImage,
      eyebrow: PRIVACY_CTA.eyebrow,
      title: PRIVACY_CTA.title,
      body: PRIVACY_CTA.body,
      primaryCta: cta(PRIVACY_CTA.primary.label, PRIVACY_CTA.primary.href),
      secondaryCta: cta(PRIVACY_CTA.secondary.label, PRIVACY_CTA.secondary.href),
    },
  ]
}

export async function seedPrivacy() {
  console.log('Privacy page')
  await upsertPage(PRIVACY_SLUG, 'Privacyverklaring', await buildPrivacyContent(), {
    title: 'Privacyverklaring',
    description:
      'Welke persoonsgegevens Hart & Huis Makelaardij verwerkt, waarvoor, met wie we ze delen en welke rechten je hebt.',
  })
}
