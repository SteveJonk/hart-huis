import {TextIcon} from '@sanity/icons/Text'
import {defineField, defineType} from 'sanity'

export const pageOpenerType = defineType({
  name: 'pageOpener',
  title: 'Page opener',
  type: 'object',
  icon: TextIcon,
  description: 'Centred opener for pages without a photo hero.',
  fields: [
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'titleHighlight',
      title: 'Title highlight',
      type: 'string',
      description: 'Rendered in italics after the title.',
    }),
    defineField({name: 'lead', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'motto', type: 'text', rows: 2}),
    defineField({name: 'attribution', type: 'string'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Page opener', subtitle: 'Page opener'}
    },
  },
})
