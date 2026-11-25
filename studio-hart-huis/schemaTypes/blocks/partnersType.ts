import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const partnersType = defineType({
  name: 'partners',
  title: 'Partners',
  type: 'object',
  icon: UsersIcon,
  description: 'Centred heading with a row of partner logos on white tiles.',
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', type: 'text', rows: 3}),
    defineField({
      name: 'logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Company name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.assetRequired(),
          preview: {select: {title: 'alt', media: 'asset'}},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'logos.0'},
    prepare({title, media}) {
      return {title: 'Partners', subtitle: title, media}
    },
  },
})
