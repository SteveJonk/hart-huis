import {SplitHorizontalIcon} from '@sanity/icons/SplitHorizontal'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const compareCardsType = defineType({
  name: 'compareCards',
  title: 'Compare cards',
  type: 'object',
  icon: SplitHorizontalIcon,
  description: 'Two option cards side by side; the second one can be rendered on ink.',
  fields: [
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'lead', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({
      name: 'spaceTop',
      title: 'Ruimte boven',
      type: 'boolean',
      description: 'Aanzetten als er een gekleurde band direct boven deze sectie staat.',
      initialValue: false,
    }),
    defineField({
      name: 'cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
            defineField({
              name: 'items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'text', type: 'string', validation: (rule) => rule.required()}),
                    defineField({
                      name: 'included',
                      type: 'boolean',
                      description: 'Off renders a cross in muted text instead of a checkmark.',
                      initialValue: true,
                    }),
                  ],
                  preview: {select: {title: 'text', subtitle: 'included'}},
                }),
              ],
              validation: (rule) => rule.min(1).required(),
            }),
            defineField({
              name: 'cta',
              type: 'cta',
              description: 'Optioneel — leeglaten laat de knop weg.',
            }),
            defineField({
              name: 'dark',
              title: 'Dark card',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
        }),
      ],
      validation: (rule) => rule.min(1).max(2).required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Compare cards', subtitle: 'Compare cards'}
    },
  },
})
