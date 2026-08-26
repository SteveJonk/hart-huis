/**
 * Seeds het bezichtigingsformulier en het `objectSettings`-document dat de
 * knop op de prijskaart, de kop boven "Vergelijkbare woningen" en de CTA-band
 * onderaan elke objectpagina aanstuurt.
 *
 * Raakt de woningen zelf niet aan: `seed:objecten` doet dat. Draai dit één
 * keer, daarna beheert de redactie beide documenten in de studio. Let op:
 * `createOrReplace` wist wat hier niet staat — elk veld dat in het document
 * hoort te staan, hoort dus ook in dit bestand (zie bug-017).
 */
import {OBJECT_CTA, OBJECT_FORM, OBJECT_SETTINGS, OBJECT_SIMILAR} from '../../src/lib/object-content'
import {client, cta, uploadImage, upsertForm} from './shared'

export async function seedObjectpagina() {
  console.log('Bezichtigingsformulier')
  const formId = await upsertForm(OBJECT_FORM)

  console.log('\nObjectpagina-instellingen')
  const ctaImage = await uploadImage(OBJECT_CTA.image.src, OBJECT_CTA.image.alt)

  await client
    .createOrReplace({
      _id: 'objectSettings',
      _type: 'objectSettings',
      ctaLabel: OBJECT_SETTINGS.ctaLabel,
      dialogTitle: OBJECT_SETTINGS.dialogTitle,
      dialogLead: OBJECT_SETTINGS.dialogLead,
      fallbackHref: OBJECT_SETTINGS.fallbackHref,
      form: {_type: 'reference', _ref: formId},
      vergelijkbaar: {
        eyebrow: OBJECT_SIMILAR.eyebrow,
        title: OBJECT_SIMILAR.title,
        cta: cta(OBJECT_SIMILAR.cta.label, OBJECT_SIMILAR.cta.href),
      },
      ctaBand: {
        image: ctaImage,
        eyebrow: OBJECT_CTA.eyebrow,
        title: OBJECT_CTA.title,
        body: OBJECT_CTA.body,
        primaryCta: cta(OBJECT_CTA.primaryCta.label, OBJECT_CTA.primaryCta.href),
        secondaryCta: cta(OBJECT_CTA.secondaryCta.label, OBJECT_CTA.secondaryCta.href),
      },
    })
    .then(() => console.log('✓ objectSettings updated (objectSettings)'))
}
