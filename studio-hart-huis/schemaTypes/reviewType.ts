import {CommentIcon} from '@sanity/icons/Comment'
import {defineField, defineType} from 'sanity'

/** Cijfers komen straks uit de scraper; daarom optioneel. */
const scoreField = (name: string, title: string, hidden?: (parent: any) => boolean) =>
  defineField({
    name,
    title,
    type: 'number',
    validation: (rule) => rule.min(0).max(10),
    hidden,
  })

/**
 * Funda vraagt per soort andere criteria uit, dus die cijfers horen alleen bij
 * het bijbehorende type. Zolang er nog geen soort gekozen is blijft alles
 * zichtbaar — anders lijkt een half ingevuld formulier kapot.
 */
const alleenBij = (type: 'Aankoop' | 'Verkoop') => ({parent}: any) =>
  Boolean(parent?.type) && parent.type !== type

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
    defineField({
      name: 'date',
      title: 'Datum',
      description: 'Wanneer de beoordeling geplaatst is; wordt op de kaart getoond.',
      type: 'date',
    }),
    scoreField('grade', 'Cijfer'),
    scoreField(
      'accessibilityAndCommunication',
      'Bereikbaarheid en communicatie',
      alleenBij('Aankoop'),
    ),
    scoreField('expertise', 'Deskundigheid'),
    scoreField('localMarketKnowledge', 'Lokale marktkennis', alleenBij('Verkoop')),
    scoreField('negotiationAndResult', 'Onderhandeling en resultaat', alleenBij('Aankoop')),
    scoreField('priceQuality', 'Prijs / kwaliteit'),
    scoreField('serviceAndGuidance', 'Service en begeleiding', alleenBij('Verkoop')),
    defineField({
      name: 'fundaKey',
      title: 'Funda-sleutel',
      description:
        'Vingerafdruk van de beoordeling op Funda. Wordt door de scraper gezet — niet aanpassen, anders komt de review er bij de volgende run dubbel in.',
      type: 'string',
      readOnly: true,
      hidden: ({value}) => !value,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'type'},
  },
})
