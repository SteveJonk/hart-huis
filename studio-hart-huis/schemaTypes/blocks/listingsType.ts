import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const listingsType = defineType({
  name: 'listings',
  title: 'Listings',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
    }),
    defineField({
      name: 'regionsLabel',
      title: 'Regions label',
      type: 'string',
    }),
    defineField({
      name: 'regions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'link', type: 'link', title: 'Link', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Listings', subtitle: 'Listings'}
    },
  },
})
