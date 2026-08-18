import {StarIcon} from '@sanity/icons/Star'
import {defineField, defineType} from 'sanity'

export const highlightStripType = defineType({
  name: 'highlightStrip',
  title: 'Highlight strip',
  type: 'object',
  icon: StarIcon,
  description: 'Dark strip with a round mark, a short pitch and one button.',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      description: 'Shown in the round mark. Leave empty to use the badge text instead.',
      options: {
        list: [
          {title: 'Search', value: 'search'},
          {title: 'Eye', value: 'eye'},
          {title: 'Clock', value: 'clock'},
          {title: 'House', value: 'house'},
          {title: 'Chart', value: 'chart'},
          {title: 'Document', value: 'doc'},
          {title: 'Person', value: 'person'},
        ],
      },
    }),
    defineField({
      name: 'badge',
      type: 'string',
      description: 'Short text in the round mark, e.g. NVM. Only used without an icon.',
    }),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'cta', type: 'cta'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'badge'},
    prepare({title, subtitle}) {
      return {title: title || 'Highlight strip', subtitle: subtitle || 'Highlight strip'}
    },
  },
})
