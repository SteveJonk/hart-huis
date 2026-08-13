import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * A house for sale. Named `woning` because `object` is a reserved Sanity
 * type name; the studio still shows it as "Object".
 *
 * Filled by the Realworks import, so:
 * - the fields the site filters, sorts and labels on (status, plaats, prijs,
 *   woonoppervlak, kamers, aangebodenSinds) are typed and flat;
 * - the rest of the kenmerken table is a free list of groups, so the importer
 *   can map whatever the feed carries (liggingen, isolatievormen, verwarming,
 *   tuin, parkeren…) without a schema change every time Realworks adds an enum;
 * - almost nothing is required — the feed returns null for most fields.
 */
export const woningType = defineType({
  name: 'woning',
  title: 'Object',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'algemeen', title: 'Algemeen', default: true},
    {name: 'kenmerken', title: 'Kenmerken'},
    {name: 'tekst', title: 'Aanbiedingstekst'},
    {name: 'media', title: "Foto's"},
  ],
  fields: [
    defineField({
      name: 'realworksId',
      title: 'Realworks ID',
      type: 'number',
      description: 'Feed-id (`id`). De import werkt hierop bij — niet handmatig wijzigen.',
      group: 'algemeen',
      readOnly: ({currentUser}) =>
        !currentUser?.roles.some((role) => role.name === 'administrator'),
    }),
    defineField({
      name: 'adres',
      title: 'Adres',
      type: 'string',
      description: 'Straat + huisnummer, bijv. "Kees \'t Hoenstraat 7"',
      group: 'algemeen',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: (doc) => `${doc.adres} ${doc.plaats}`, maxLength: 96},
      group: 'algemeen',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postcode',
      type: 'string',
      group: 'algemeen',
    }),
    defineField({
      name: 'plaats',
      title: 'Plaats',
      type: 'string',
      group: 'algemeen',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      description: 'Uit `financieel.overdracht.status`',
      group: 'algemeen',
      options: {
        list: [
          {title: 'Beschikbaar', value: 'beschikbaar'},
          {title: 'Verkocht onder voorbehoud', value: 'voorbehoud'},
          {title: 'Verkocht', value: 'verkocht'},
        ],
        layout: 'radio',
      },
      initialValue: 'beschikbaar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'prijs',
      title: 'Vraagprijs',
      type: 'number',
      description: 'Hele euro’s (`overdracht.koopprijs`) — de site formatteert zelf',
      group: 'algemeen',
    }),
    defineField({
      name: 'prijsConditie',
      title: 'Prijsconditie',
      type: 'string',
      description: 'Uit `overdracht.koopconditie`',
      group: 'algemeen',
      options: {
        list: [
          {title: 'k.k.', value: 'k.k.'},
          {title: 'v.o.n.', value: 'v.o.n.'},
        ],
        layout: 'radio',
      },
      initialValue: 'k.k.',
    }),
    defineField({
      name: 'aangebodenSinds',
      title: 'Aangeboden sinds',
      type: 'date',
      description: 'Uit `marketing.publicatiedatum`',
      options: {dateFormat: 'D MMMM YYYY'},
      group: 'algemeen',
    }),
    defineField({
      name: 'aanvaarding',
      type: 'string',
      description: 'Uit `overdracht.aanvaarding`, bijv. "In overleg"',
      group: 'algemeen',
    }),

    // ---- specs-balk boven de omschrijving ----
    defineField({
      name: 'soortWoning',
      title: 'Soort woning',
      type: 'string',
      description: 'Uit `algemeen.woonhuissoort`, bijv. "Eengezinswoning"',
      group: 'kenmerken',
    }),
    defineField({
      name: 'bouwjaar',
      type: 'number',
      group: 'kenmerken',
    }),
    defineField({
      name: 'woonoppervlak',
      title: 'Woonoppervlak (m²)',
      type: 'number',
      group: 'kenmerken',
    }),
    defineField({
      name: 'perceel',
      title: 'Perceeloppervlak (m²)',
      type: 'number',
      group: 'kenmerken',
    }),
    defineField({
      name: 'inhoud',
      title: 'Inhoud (m³)',
      type: 'number',
      group: 'kenmerken',
    }),
    defineField({
      name: 'kamers',
      title: 'Aantal kamers',
      type: 'number',
      group: 'kenmerken',
    }),
    defineField({
      name: 'slaapkamers',
      title: 'Aantal slaapkamers',
      type: 'number',
      description: 'Som van `detail.etages[].aantalSlaapkamers`',
      group: 'kenmerken',
    }),
    defineField({
      name: 'energielabel',
      type: 'string',
      group: 'kenmerken',
      options: {list: ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G']},
    }),

    // ---- kenmerkentabel op de objectpagina ----
    defineField({
      name: 'kenmerkGroepen',
      title: 'Kenmerkentabel',
      description: 'De blokken onder "Kenmerken". Wordt door de import overschreven.',
      type: 'array',
      group: 'kenmerken',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'kenmerkGroep',
          fields: [
            defineField({
              name: 'titel',
              type: 'string',
              description: 'Bijv. "Overdracht", "Bouw", "Energie"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'rijen',
              title: 'Rijen',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'kenmerk',
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'waarde',
                      title: 'Waarde',
                      type: 'array',
                      description:
                        'Eén regel, of meerdere bij een opsomming (badkamervoorzieningen)',
                      of: [defineArrayMember({type: 'string'})],
                      validation: (rule) => rule.min(1),
                    }),
                  ],
                  preview: {
                    select: {title: 'label', waarde: 'waarde'},
                    prepare({title, waarde}) {
                      return {title, subtitle: Array.isArray(waarde) ? waarde.join(', ') : ''}
                    },
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: {title: 'titel', rijen: 'rijen'},
            prepare({title, rijen}) {
              const count = Array.isArray(rijen) ? rijen.length : 0
              return {title, subtitle: `${count} kenmerk${count === 1 ? '' : 'en'}`}
            },
          },
        }),
      ],
    }),

    // ---- omschrijving ----
    defineField({
      name: 'aanbiedingsTekst',
      title: 'Aanbiedingstekst',
      type: 'text',
      rows: 20,
      description:
        'Ruwe tekst uit `teksten.aanbiedingstekst`: regeleindes als <br>, nadruk als **vet**, opsommingen als regels die met "- " beginnen. Realworks zet er vaak ook een "**English below**"-blok in.',
      group: 'tekst',
    }),
    defineField({
      name: 'aanbiedingsTekstEngels',
      title: 'Aanbiedingstekst (Engels)',
      type: 'text',
      rows: 20,
      description:
        'Zelfde opmaak, uit `teksten.aanbiedingstekstEngels` — leeg als de feed niets levert',
      group: 'tekst',
    }),

    // ---- media ----
    defineField({
      name: 'fotos',
      title: "Foto's",
      description: 'Hoofdfoto eerst; daarna op `volgnummer`',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'brochure',
      title: 'Brochure (PDF)',
      type: 'file',
      options: {accept: 'application/pdf'},
      group: 'media',
    }),
  ],
  orderings: [
    {
      title: 'Nieuwste eerst',
      name: 'aangebodenSindsDesc',
      by: [{field: 'aangebodenSinds', direction: 'desc'}],
    },
    {title: 'Prijs oplopend', name: 'prijsAsc', by: [{field: 'prijs', direction: 'asc'}]},
    {title: 'Prijs aflopend', name: 'prijsDesc', by: [{field: 'prijs', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'adres', plaats: 'plaats', prijs: 'prijs', status: 'status', media: 'fotos.0'},
    prepare({title, plaats, prijs, status, media}) {
      const price = typeof prijs === 'number' ? `€ ${prijs.toLocaleString('nl-NL')},-` : ''
      return {title, subtitle: [plaats, price, status].filter(Boolean).join(' · '), media}
    },
  },
})
