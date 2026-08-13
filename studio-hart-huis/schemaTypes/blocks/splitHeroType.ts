import {SplitVerticalIcon} from '@sanity/icons/SplitVertical'
import {defineField, defineType} from 'sanity'

export const splitHeroType = defineType({
  name: 'splitHero',
  title: 'Split hero',
  type: 'object',
  icon: SplitVerticalIcon,
  description: 'Copy on a light background next to a full-height photo.',
  fields: [
    defineField({name: 'breadcrumbLabel', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'titleHighlight',
      title: 'Title highlight',
      type: 'string',
      description: 'Rendered in italics after the title.',
    }),
    defineField({name: 'lead', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'primaryCta', type: 'cta'}),
    defineField({name: 'secondaryCta', type: 'cta'}),
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
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Split hero', subtitle: 'Split hero', media}
    },
  },
})
