import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const personQuoteType = defineType({
  name: 'personQuote',
  title: 'Person quote',
  type: 'object',
  icon: BlockquoteIcon,
  description: 'Foto naast een korte intro en een citaat van één persoon.',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({name: 'quote', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'name',
      title: 'Naam / functie',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Person quote', subtitle: 'Person quote', media}
    },
  },
})
