import {ClockIcon} from '@sanity/icons/Clock'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const timelineType = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'object',
  icon: ClockIcon,
  fields: [
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'items',
      title: 'Milestones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'year', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 4, validation: (rule) => rule.required()}),
            defineField({
              name: 'image',
              type: 'image',
              options: {hotspot: true},
              description: 'Optional photo above this milestone.',
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                }),
              ],
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'year', media: 'image'}},
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Timeline', subtitle: 'Timeline'}
    },
  },
})
