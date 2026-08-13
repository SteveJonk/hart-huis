import {SearchIcon} from '@sanity/icons/Search'
import {defineField, defineType} from 'sanity'

export const aanbodHeaderType = defineType({
  name: 'aanbodHeader',
  title: 'Aanbod header',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'breadcrumbLabel',
      title: 'Breadcrumb label',
      type: 'string',
    }),
    defineField({
      name: 'eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title highlight',
      description: 'Laatste woorden van de titel, in bordeaux cursief',
      type: 'string',
    }),
    defineField({
      name: 'lead',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aside',
      title: 'Zoekopdracht-kaart',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'body', type: 'text', rows: 3}),
        defineField({name: 'cta', type: 'cta'}),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Aanbod header', subtitle: 'Aanbod header'}
    },
  },
})
