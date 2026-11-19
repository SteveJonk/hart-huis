import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const teamType = defineType({
  name: 'team',
  title: 'Team',
  type: 'object',
  icon: UsersIcon,
  description: 'Teamleden met foto, naam, rol en een kort tekstje.',
  fields: [
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 3}),
    defineField({
      name: 'members',
      title: 'Teamleden',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 4, validation: (rule) => rule.required()}),
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
              validation: (rule) => rule.required().assetRequired(),
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'role', media: 'image'}},
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Team', subtitle: 'Team'}
    },
  },
})
