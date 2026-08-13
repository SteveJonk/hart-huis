import {CommentIcon} from '@sanity/icons/Comment'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const contactFormSectionType = defineType({
  name: 'contactFormSection',
  title: 'Contact form',
  type: 'object',
  icon: CommentIcon,
  description: 'Renders a form from Forms, with the contact panel beside it.',
  fields: [
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{type: 'contactForm'}],
      description: 'The form to display. Fields are managed under Forms.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      type: 'string',
      description: 'Small print under the submit button.',
    }),
    defineField({
      name: 'successTitle',
      type: 'string',
      description: 'Shown instead of the form after a successful submission.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'successBody',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aside',
      title: 'Contact panel',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
        defineField({
          name: 'items',
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
                defineField({name: 'subtitle', type: 'string'}),
              ],
              preview: {select: {title: 'title', subtitle: 'subtitle'}},
            }),
          ],
        }),
        defineField({name: 'cta', type: 'cta'}),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'form.title'},
    prepare({title, subtitle}) {
      return {title: title || 'Contact form', subtitle: subtitle || 'Contact form'}
    },
  },
})
