import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {CommentIcon} from '@sanity/icons/Comment'
import {defineArrayMember, defineField, defineType} from 'sanity'

const altField = defineField({
  name: 'alt',
  type: 'string',
  title: 'Alternatieve tekst',
  validation: (rule) => rule.required(),
})

/**
 * Een klantverhaal, op /klantverhaal/<slug>. Vaste template (geen page
 * builder); de homepage toont ze als slider via het `story`-blok.
 */
export const klantverhaalType = defineType({
  name: 'klantverhaal',
  title: 'Klantverhaal',
  type: 'document',
  icon: CommentIcon,
  groups: [
    {name: 'verhaal', title: 'Verhaal', default: true},
    {name: 'details', title: 'Details'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'verhaal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Cursief deel van de titel',
      type: 'string',
      group: 'verhaal',
      description: 'Optioneel. Een stuk tekst uit de titel dat cursief en in bordeaux verschijnt.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const title = (context.document?.title as string | undefined) ?? ''
          return !value || title.includes(value) ? true : 'Moet letterlijk in de titel staan'
        }),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Korte titel',
      type: 'string',
      group: 'verhaal',
      description: 'Voor de homepage-slider en de kaartjes onder "Nog meer verhalen". Leeg = de titel.',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'verhaal',
      description: 'De pagina staat op /klantverhaal/<slug>.',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 3,
      group: 'verhaal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hoofdfoto',
      type: 'image',
      group: 'verhaal',
      options: {hotspot: true},
      fields: [altField, defineField({name: 'caption', title: 'Onderschrift', type: 'string'})],
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Tweede foto (homepage)',
      type: 'image',
      group: 'verhaal',
      description: 'Optioneel. Het kleine fotootje naast de hoofdfoto in de homepage-slider.',
      options: {hotspot: true},
      fields: [altField],
      validation: (rule) => rule.assetRequired(),
    }),
    defineField({
      name: 'body',
      title: 'Verhaal',
      type: 'array',
      group: 'verhaal',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Alinea', value: 'normal'},
            {title: 'Kop', value: 'h2'},
          ],
          lists: [],
          marks: {
            decorators: [
              {title: 'Vet', value: 'strong'},
              {title: 'Cursief', value: 'em'},
            ],
            annotations: [defineArrayMember({name: 'link', title: 'Link', type: 'link'})],
          },
        }),
        defineArrayMember({
          name: 'pullQuote',
          title: 'Uitgelicht citaat',
          type: 'object',
          icon: BlockquoteIcon,
          fields: [defineField({name: 'text', type: 'text', rows: 3, validation: (rule) => rule.required()})],
          preview: {select: {title: 'text'}, prepare: ({title}) => ({title, subtitle: 'Citaat'})},
        }),
        defineArrayMember({
          type: 'image',
          title: 'Foto',
          options: {hotspot: true},
          fields: [altField],
          validation: (rule) => rule.assetRequired(),
        }),
        defineArrayMember({
          name: 'resultaat',
          title: 'Resultaat (cijfers)',
          type: 'object',
          fields: [
            defineField({
              name: 'items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'value', title: 'Cijfer', type: 'string', validation: (rule) => rule.required()}),
                    defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
                  ],
                  preview: {select: {title: 'value', subtitle: 'label'}},
                }),
              ],
              validation: (rule) => rule.min(1).max(3),
            }),
          ],
          preview: {
            select: {first: 'items.0.value'},
            prepare: ({first}) => ({title: first || 'Resultaat', subtitle: 'Resultaat'}),
          },
        }),
      ],
    }),
    defineField({
      name: 'dienst',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Aankoop', value: 'Aankoop'},
          {title: 'Verkoop', value: 'Verkoop'},
          {title: 'Taxatie', value: 'Taxatie'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'wie',
      title: 'Wie',
      type: 'string',
      group: 'details',
      description: 'Bijvoorbeeld "Sanne & Joost".',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'plaats', type: 'string', group: 'details', validation: (rule) => rule.required()}),
    defineField({name: 'buurt', type: 'string', group: 'details'}),
    defineField({
      name: 'feiten',
      title: 'Extra feiten',
      type: 'array',
      group: 'details',
      description: 'Onder Dienst, Wie, Plaats en Buurt in de zijkaart, bijvoorbeeld "Doorlooptijd: 6 weken".',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Waarde', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({
      name: 'grade',
      title: 'Hun beoordeling',
      type: 'number',
      group: 'details',
      description: 'Optioneel. Het cijfer dat ze op Funda gaven.',
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: 'quote',
      title: 'Quote van de klant',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'Optioneel. Staat op de homepage-slider; zonder quote toont de slider de intro.',
    }),
    defineField({
      name: 'makelaarQuote',
      title: 'Afsluitende quote van de makelaar',
      type: 'text',
      rows: 3,
      group: 'details',
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      group: 'details',
      description: 'Bepaalt de volgorde: nieuwste eerst.',
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  orderings: [{title: 'Nieuwste eerst', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', wie: 'wie', plaats: 'plaats', media: 'mainImage'},
    prepare: ({title, wie, plaats, media}) => ({
      title,
      subtitle: [wie, plaats].filter(Boolean).join(' — '),
      media,
    }),
  },
})
