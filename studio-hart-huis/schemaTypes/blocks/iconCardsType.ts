import {SparklesIcon} from '@sanity/icons/Sparkles'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const iconCardsType = defineType({
  name: 'iconCards',
  title: 'Icon cards',
  type: 'object',
  icon: SparklesIcon,
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
                  {title: 'Person', value: 'person'},
                  {title: 'Camera', value: 'camera'},
                  {title: 'Chart', value: 'chart'},
                  {title: 'Document', value: 'doc'},
                  {title: 'House', value: 'house'},
                  {title: 'Renovate', value: 'renovate'},
                  {title: 'Scale', value: 'scale'},
                  {title: 'Search', value: 'search'},
                  {title: 'Eye', value: 'eye'},
                  {title: 'Clock', value: 'clock'},
                  {title: 'Heart', value: 'heart'},
                  {title: 'Diploma', value: 'diploma'},
                  {title: 'Shield', value: 'shield'},
                  {title: 'Mail', value: 'mail'},
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
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
      return {title: title || 'Icon cards', subtitle: 'Icon cards'}
    },
  },
})
