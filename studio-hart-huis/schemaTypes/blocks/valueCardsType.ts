import {HeartIcon} from '@sanity/icons/Heart'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const valueCardsType = defineType({
  name: 'valueCards',
  title: 'Value cards',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Heart', value: 'heart'},
                  {title: 'Two rings', value: 'rings'},
                  {title: 'Lines', value: 'lines'},
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 4, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'icon'}},
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Value cards', subtitle: 'Value cards'}
    },
  },
})
