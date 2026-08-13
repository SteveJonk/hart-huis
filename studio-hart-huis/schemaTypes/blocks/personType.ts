import {UserIcon} from '@sanity/icons/User'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const personType = defineType({
  name: 'personBlock',
  title: 'Person',
  type: 'object',
  icon: UserIcon,
  description: 'Photo, intro and the person you actually speak to.',
  fields: [
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
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({
      name: 'person',
      type: 'object',
      fields: [
        defineField({name: 'initials', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
                defineField({name: 'link', type: 'link'}),
              ],
              preview: {select: {title: 'label'}},
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Person', subtitle: 'Person', media}
    },
  },
})
