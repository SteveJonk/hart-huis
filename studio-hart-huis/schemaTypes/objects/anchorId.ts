import {defineField} from 'sanity'

/**
 * Optioneel anker-ID op elk page-builder-blok. Gevuld wordt het het `id` van
 * de sectie, zodat je ernaartoe kunt linken met /pagina#<id>.
 */
const anchorIdField = defineField({
  name: 'anchorId',
  title: 'Anker-ID',
  type: 'string',
  description:
    'Optioneel. Maakt deze sectie bereikbaar via een link als /pagina#klantverhalen. Kleine letters, cijfers en streepjes.',
  validation: (rule) =>
    rule.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {name: 'kleine letters, cijfers en streepjes'}),
})

/** Voegt het anker-ID-veld toe aan een blok-objecttype (onderaan de velden). */
export function withAnchorId<T extends {fields?: unknown[]}>(type: T): T {
  return {...type, fields: [...(type.fields ?? []), anchorIdField]}
}
