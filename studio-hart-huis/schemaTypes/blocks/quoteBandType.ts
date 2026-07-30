import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineField, defineType} from 'sanity'

export const quoteBandType = defineType({
  name: 'quoteBand',
  title: 'Quote band',
  type: 'object',
  icon: BlockquoteIcon,
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
    defineField({name: 'quote', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'initials', type: 'string', validation: (rule) => rule.required().max(3)}),
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'place', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'place', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title: title || 'Quote band', subtitle: subtitle || 'Quote band', media}
    },
  },
})
