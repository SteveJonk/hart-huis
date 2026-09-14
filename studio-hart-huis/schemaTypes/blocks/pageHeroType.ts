import {ImagesIcon} from '@sanity/icons/Images'
import {defineField, defineType} from 'sanity'

export const pageHeroType = defineType({
  name: 'pageHero',
  title: 'Page hero',
  type: 'object',
  icon: ImagesIcon,
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
      name: 'breadcrumbLabel',
      title: 'Breadcrumb label',
      type: 'string',
      description: 'Current page label in the breadcrumb (e.g. Verkoop)',
    }),
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Headline text before the highlighted phrase',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title highlight',
      type: 'string',
    }),
    defineField({
      name: 'titleAfter',
      title: 'Title after highlight',
      type: 'string',
      description: 'Optional text after the highlighted phrase (e.g. " en elke buurt eromheen")',
    }),
    defineField({name: 'lead', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'cta'}),
  ],
  preview: {
    select: {title: 'title', titleHighlight: 'titleHighlight', titleAfter: 'titleAfter', media: 'image'},
    prepare({title, titleHighlight, titleAfter, media}) {
      return {
        title: [title, titleHighlight, titleAfter].filter(Boolean).join(' '),
        subtitle: 'Page hero',
        media,
      }
    },
  },
})
