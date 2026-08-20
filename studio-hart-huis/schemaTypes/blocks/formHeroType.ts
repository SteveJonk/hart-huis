import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const formHeroType = defineType({
  name: 'formHero',
  title: 'Form hero',
  type: 'object',
  icon: HomeIcon,
  description: 'Hero met achtergrondfoto en een aanvraagformulier (bv. voor een waardebepaling).',
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
    defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'titleHighlight', type: 'string'}),
    defineField({name: 'lead', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'usps',
      title: "USP's",
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({name: 'score', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'scoreLabel', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'reviewCount',
      title: 'Review count text',
      type: 'string',
      description: 'Bijvoorbeeld "56 beoordelingen"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewNote',
      title: 'Review note',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'formTitle', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'formLead', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{type: 'contactForm'}],
      description: 'Het formulier dat verstuurd wordt. Velden staan onder Forms.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'successTitle',
      type: 'string',
      description: 'Getoond na een geslaagde aanvraag.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'successBody', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({
      name: 'privacyNote',
      type: 'string',
      description: 'Kleine tekst onder het formulier.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Form hero', subtitle: 'Form hero', media}
    },
  },
})
