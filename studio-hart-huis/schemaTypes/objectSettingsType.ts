import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'

/**
 * Settings shared by every object page. One singleton rather than a field per
 * object: the Realworks import writes the objects, so anything an editor sets
 * there would have to be set again on every new house.
 *
 * The knop op de prijskaart opens a dialog with the form this points at. Zonder
 * formulier valt de knop terug op de link die hier staat.
 */
export const objectSettingsType = defineType({
  name: 'objectSettings',
  title: 'Objectpagina',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'ctaLabel',
      title: 'Tekst op de knop',
      type: 'string',
      initialValue: 'Plan een bezichtiging',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'form',
      title: 'Formulier',
      type: 'reference',
      to: [{type: 'form'}],
      description:
        'Wordt getoond in een venster zodra iemand op de knop klikt. Zet in dat formulier een verborgen veld met waarde {{adres}} om te zien om welke woning het gaat.',
    }),
    defineField({
      name: 'dialogTitle',
      title: 'Kop boven het formulier',
      type: 'string',
      initialValue: 'Plan een bezichtiging',
    }),
    defineField({
      name: 'dialogLead',
      title: 'Tekst onder de kop',
      type: 'text',
      rows: 3,
      description: 'Hier mag {{adres}} in staan — dat wordt het adres van de woning.',
    }),
    defineField({
      name: 'fallbackHref',
      title: 'Link zonder formulier',
      type: 'string',
      initialValue: '/contact',
      description:
        'Waar de knop heen gaat zolang er geen formulier gekozen is.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Objectpagina'}),
  },
})
