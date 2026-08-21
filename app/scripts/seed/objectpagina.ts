/**
 * Seeds het bezichtigingsformulier en het `objectSettings`-document dat de
 * knop op de prijskaart van elke objectpagina aanstuurt.
 *
 * Raakt de woningen zelf niet aan: `seed:objecten` doet dat. Draai dit één
 * keer, daarna beheert de redactie beide documenten in de studio.
 */
import {OBJECT_FORM, OBJECT_SETTINGS} from '../../src/lib/object-content'
import {client, upsertForm} from './shared'

export async function seedObjectpagina() {
  console.log('Bezichtigingsformulier')
  const formId = await upsertForm(OBJECT_FORM)

  console.log('\nObjectpagina-instellingen')
  await client
    .createOrReplace({
      _id: 'objectSettings',
      _type: 'objectSettings',
      ctaLabel: OBJECT_SETTINGS.ctaLabel,
      dialogTitle: OBJECT_SETTINGS.dialogTitle,
      dialogLead: OBJECT_SETTINGS.dialogLead,
      fallbackHref: OBJECT_SETTINGS.fallbackHref,
      form: {_type: 'reference', _ref: formId},
    })
    .then(() => console.log('✓ objectSettings updated (objectSettings)'))
}
