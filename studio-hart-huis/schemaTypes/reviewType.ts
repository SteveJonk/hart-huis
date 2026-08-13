import {CommentIcon} from '@sanity/icons/Comment'
import {defineField, defineType} from 'sanity'

/** Cijfers komen straks uit de scraper; daarom optioneel. */
const scoreField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'number',
    validation: (rule) => rule.min(0).max(10),
  })

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      description: 'Naam van de reviewer zoals die op de bron staat, bijv. "Marloes B."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {list: ['Aankoop', 'Verkoop'], layout: 'radio'},
    }),
    scoreField('grade', 'Cijfer'),
    scoreField('expertise', 'Deskundigheid'),
    scoreField('localMarketKnowledge', 'Lokale marktkennis'),
    scoreField('priceQuality', 'Prijs-kwaliteit'),
  ],
  preview: {
    select: {title: 'name', subtitle: 'type'},
  },
})
