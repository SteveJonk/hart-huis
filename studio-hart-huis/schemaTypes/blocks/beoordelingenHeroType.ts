import {StarIcon} from '@sanity/icons/Star'
import {defineField, defineType} from 'sanity'

/**
 * Opener van /beoordelingen. Het cijfer, het aantal en de staafjes worden
 * afgeleid uit alle `review`-documenten — hier staat alleen de omringende copy.
 */
export const beoordelingenHeroType = defineType({
  name: 'beoordelingenHero',
  title: 'Beoordelingen header',
  type: 'object',
  icon: StarIcon,
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
      rows: 4,
    }),
    defineField({name: 'primaryCta', title: 'Primaire knop', type: 'cta'}),
    defineField({name: 'secondaryCta', title: 'Secundaire knop', type: 'cta'}),
    defineField({
      name: 'scoreLabel',
      title: 'Label onder het cijfer',
      description: 'Bijv. "GEMIDDELD"',
      type: 'string',
    }),
    defineField({
      name: 'scoreNote',
      title: 'Toelichting naast het cijfer',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Beoordelingen header', subtitle: 'Beoordelingen header'}
    },
  },
})
