import {StarIcon} from '@sanity/icons/Star'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const reviewsType = defineType({
  name: 'reviews',
  title: 'Reviews',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'score',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scoreLabel',
      title: 'Score label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewCountLabel',
      title: 'Review count label',
      type: 'string',
      description: 'e.g. "84 keer beoordeeld"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'showGrades',
      title: 'Deelcijfers tonen',
      description: 'Zet de tabel met deelcijfers per beoordeling aan op de kaarten.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      type: 'cta',
    }),
  ],
  preview: {
    select: {title: 'reviewCountLabel', score: 'score'},
    prepare({title, score}) {
      return {title: title || 'Reviews', subtitle: score ? `Score ${score}` : 'Reviews'}
    },
  },
})
