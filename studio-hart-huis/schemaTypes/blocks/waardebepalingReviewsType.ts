import {StarIcon} from '@sanity/icons/Star'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const waardebepalingReviewsType = defineType({
  name: 'waardebepalingReviews',
  title: 'Waardebepaling — reviews',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({name: 'score', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'scoreLabel', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 2, validation: (rule) => rule.required()}),
    defineField({name: 'link', type: 'cta'}),
    defineField({
      name: 'items',
      title: 'Reviews',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'quote', type: 'text', rows: 3, validation: (rule) => rule.required()}),
            defineField({name: 'score', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'meta',
              type: 'string',
              description: 'Bijvoorbeeld "Een verkoper · juli 2026"',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'meta', subtitle: 'score'}},
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Reviews', subtitle: 'Waardebepaling — reviews'}
    },
  },
})
