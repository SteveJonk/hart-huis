import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'

/**
 * Settings shared by every object page. One singleton rather than a field per
 * object: the Realworks import writes the objects, so anything an editor sets
 * there would have to be set again on every new house.
 *
 * The knop op de prijskaart opens a dialog with the form this points at. Zonder
 * formulier valt de knop terug op de link die hier staat.
 *
 * Hetzelfde geldt voor de twee secties onderaan elke objectpagina (de kop boven
 * "Vergelijkbare woningen" en de CTA-band): copy die op elk object hetzelfde is,
 * dus één document in plaats van een veld per woning. Blijft een veld leeg, dan
 * valt de pagina terug op de waarden in `src/lib/object-content.ts`.
 */
export const objectSettingsType = defineType({
  name: 'objectSettings',
  title: 'Objectpagina',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'knop', title: 'Bezichtigingsknop', default: true},
    {name: 'onderaan', title: 'Onderaan de pagina'},
  ],
  fields: [
    defineField({
      name: 'ctaLabel',
      title: 'Tekst op de knop',
      type: 'string',
      group: 'knop',
      initialValue: 'Plan een bezichtiging',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'form',
      title: 'Formulier',
      group: 'knop',
      type: 'reference',
      to: [{type: 'form'}],
      description:
        'Wordt getoond in een venster zodra iemand op de knop klikt. Zet in dat formulier een verborgen veld met waarde {{adres}} om te zien om welke woning het gaat.',
    }),
    defineField({
      name: 'dialogTitle',
      title: 'Kop boven het formulier',
      type: 'string',
      group: 'knop',
      initialValue: 'Plan een bezichtiging',
    }),
    defineField({
      name: 'dialogLead',
      title: 'Tekst onder de kop',
      type: 'text',
      rows: 3,
      group: 'knop',
      description: 'Hier mag {{adres}} in staan — dat wordt het adres van de woning.',
    }),
    defineField({
      name: 'fallbackHref',
      title: 'Link zonder formulier',
      type: 'string',
      group: 'knop',
      initialValue: '/contact',
      description:
        'Waar de knop heen gaat zolang er geen formulier gekozen is.',
      validation: (rule) => rule.required(),
    }),

    // ---- de twee secties onder de woning ----
    defineField({
      name: 'vergelijkbaar',
      title: 'Vergelijkbare woningen',
      type: 'object',
      group: 'onderaan',
      description:
        'De kop boven de drie woningen onderaan. Welke woningen dat zijn kiest de site zelf (zelfde plaats eerst, daarna nieuwste).',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Bovenkopje',
          type: 'string',
          initialValue: 'Misschien ook iets',
        }),
        defineField({
          name: 'title',
          title: 'Kop',
          type: 'string',
          initialValue: 'Vergelijkbare woningen',
        }),
        defineField({
          name: 'cta',
          title: 'Knop',
          type: 'cta',
          initialValue: {
            label: 'Bekijk het hele aanbod',
            linkType: 'external',
            href: '/aanbod',
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaBand',
      title: 'CTA-band',
      type: 'ctaBand',
      group: 'onderaan',
      description: 'De band met foto helemaal onderaan elke objectpagina.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Objectpagina'}),
  },
})
