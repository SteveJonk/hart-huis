import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const contactWaysType = defineType({
  name: 'contactWays',
  title: 'Contact ways',
  type: 'object',
  icon: EnvelopeIcon,
  description: 'Cards that overlap the hero above them.',
  fields: [
    defineField({
      name: 'items',
      title: 'Ways to get in touch',
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
                  {title: 'Phone', value: 'phone'},
                  {title: 'WhatsApp', value: 'whatsapp'},
                  {title: 'Mail', value: 'mail'},
                  {title: 'Map pin', value: 'pin'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 2, validation: (rule) => rule.required()}),
            defineField({
              name: 'value',
              type: 'string',
              description: 'The phone number, address or email shown in bold.',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'note', type: 'string'}),
            defineField({name: 'link', type: 'link'}),
          ],
          preview: {select: {title: 'title', subtitle: 'value'}},
        }),
      ],
      validation: (rule) => rule.min(1).max(4).required(),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contact ways', subtitle: 'Contact ways'}
    },
  },
})
