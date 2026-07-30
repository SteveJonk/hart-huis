import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const introType = defineType({
  name: 'intro',
  title: 'Intro',
  type: 'object',
  icon: UsersIcon,
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
    defineField({
      name: 'stampValue',
      title: 'Stamp value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stampLabel',
      title: 'Stamp label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Full headline (e.g. Makelaardij met hart voor jouw huis)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title highlight',
      type: 'string',
      description: 'Word/phrase within the title to italicize (e.g. hart)',
    }),
    defineField({
      name: 'leads',
      title: 'Lead paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: 'facts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'value', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        }),
      ],
    }),
    defineField({
      name: 'link',
      type: 'cta',
    }),
  ],
  preview: {
    select: {title: 'title', titleHighlight: 'titleHighlight', media: 'image'},
    prepare({title, titleHighlight, media}) {
      return {
        title: [title, titleHighlight].filter(Boolean).join(' '),
        subtitle: 'Intro',
        media,
      }
    },
  },
})
