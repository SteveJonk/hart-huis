import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const waardebepalingWieType = defineType({
  name: 'waardebepalingWie',
  title: 'Waardebepaling — wie er langskomt',
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
      return {title: title || 'Wie er langskomt', subtitle: 'Waardebepaling — wie er langskomt', media}
    },
  },
})
