import {CheckmarkIcon} from '@sanity/icons/Checkmark'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const assurancesType = defineType({
  name: 'assurances',
  title: 'Assurances',
  type: 'object',
  icon: CheckmarkIcon,
  description: 'Dark band with credentials and specialisms.',
  fields: [
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'items',
      title: 'Assurances',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Assurances', subtitle: 'Assurances'}
    },
  },
})
