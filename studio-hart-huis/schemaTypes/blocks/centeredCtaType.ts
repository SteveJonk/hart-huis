import {BellIcon} from '@sanity/icons/Bell'
import {defineField, defineType} from 'sanity'

export const centeredCtaType = defineType({
  name: 'centeredCta',
  title: 'Centered CTA',
  type: 'object',
  icon: BellIcon,
  description: 'Gecentreerde afsluiting met twee knoppen, geen foto.',
  fields: [
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'cta'}),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Centered CTA', subtitle: 'Centered CTA'}
    },
  },
})
