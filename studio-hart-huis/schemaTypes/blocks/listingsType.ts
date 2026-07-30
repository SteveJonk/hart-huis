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
      name: 'items',
      title: 'Listings',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'status', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'sold', type: 'boolean', initialValue: false}),
            defineField({name: 'place', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'meta', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'price', type: 'string', validation: (rule) => rule.required()}),
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
            defineField({name: 'link', type: 'link', title: 'Link', validation: (rule) => rule.required()}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'place', media: 'image'},
          },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
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
