import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {defineField, defineType} from 'sanity'

/**
 * The filter bar + listing grid. The woningen themselves are not selected here:
 * the page query pulls every `woning` document, the browser filters and sorts.
 */
export const objectGridType = defineType({
  name: 'objectGrid',
  title: 'Objecten (aanbod)',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'ctaCard',
      title: 'CTA-kaart tussen de woningen',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'body', type: 'text', rows: 3}),
        defineField({name: 'cta', type: 'cta'}),
      ],
    }),
    defineField({
      name: 'emptyTitle',
      title: 'Titel als er niets gevonden is',
      type: 'string',
    }),
    defineField({
      name: 'emptyBody',
      title: 'Tekst als er niets gevonden is',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Objecten (aanbod)', subtitle: 'Alle woningen, met filters'}
    },
  },
})
