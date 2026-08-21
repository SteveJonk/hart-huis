import {OlistIcon} from '@sanity/icons/Olist'
import {defineArrayMember, defineField, defineType} from 'sanity'

/** Donkere uitlegsectie met genummerde punten. */
export const werkwijzeType = defineType({
  name: 'werkwijze',
  title: 'Werkwijze (donker)',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'lead', type: 'text', rows: 3}),
    defineField({name: 'cta', title: 'Knop', type: 'cta', description: 'Optioneel.'}),
    defineField({
      name: 'items',
      title: 'Punten',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'number', title: 'Nummer', type: 'string'}),
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'body', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'number'}},
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Werkwijze', subtitle: 'Werkwijze (donker)'}
    },
  },
})
