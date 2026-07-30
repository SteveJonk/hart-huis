import {BarChartIcon} from '@sanity/icons/BarChart'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const factBarType = defineType({
  name: 'factBar',
  title: 'Fact bar',
  type: 'object',
  icon: BarChartIcon,
  fields: [
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
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (rule) => rule.min(1).max(4).required(),
    }),
  ],
  preview: {
    select: {fact0: 'facts.0.value', fact1: 'facts.1.value'},
    prepare({fact0, fact1}) {
      return {
        title: [fact0, fact1].filter(Boolean).join(' · ') || 'Fact bar',
        subtitle: 'Fact bar',
      }
    },
  },
})
