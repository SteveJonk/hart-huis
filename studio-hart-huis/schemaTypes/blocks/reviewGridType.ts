import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {defineField, defineType} from 'sanity'

/**
 * Alle beoordelingen met filters. De reviews worden hier niet geselecteerd:
 * de page query haalt elk `review`-document op, de browser filtert en pagineert.
 */
export const reviewGridType = defineType({
  name: 'reviewGrid',
  title: 'Beoordelingen (alle)',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'more',
      title: 'Tekst op de "toon meer"-knop',
      type: 'string',
    }),
    defineField({
      name: 'empty',
      title: 'Tekst als er niets gevonden is',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'Beoordelingen (alle)',
        subtitle: 'Alle beoordelingen, met filters',
      }
    },
  },
})
