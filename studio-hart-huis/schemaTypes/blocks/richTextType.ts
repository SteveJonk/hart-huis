import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Lopende tekst met koppen, lijsten en links — voor pagina's die géén
 * marketingsecties zijn maar één lang document: privacyverklaring, algemene
 * voorwaarden, cookieverklaring, disclaimer.
 *
 * Elk ander tekstblok in dit project bewaart tekst als `text` of een array van
 * `text` en kan dus geen kop, opsomming of link binnen een alinea aan. Dit is
 * het enige blok met Portable Text.
 */
export const richTextType = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Optioneel — laat leeg als de kop al in een blok erboven staat.',
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          // Alleen wat een juridische tekst nodig heeft: H2 voor een artikel,
          // H3 voor een onderdeel daarvan, en een citaat voor een uitgelichte
          // passage. H1 hoort bij de paginakop, niet in de body.
          styles: [
            {title: 'Alinea', value: 'normal'},
            {title: 'Kop 2', value: 'h2'},
            {title: 'Kop 3', value: 'h3'},
            {title: 'Citaat', value: 'blockquote'},
          ],
          lists: [
            {title: 'Opsomming', value: 'bullet'},
            {title: 'Genummerd', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Vet', value: 'strong'},
              {title: 'Cursief', value: 'em'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                // Hetzelfde link-object als elke cta: intern (paginakeuze) of
                // extern (URL, mailto:, tel:).
                type: 'link',
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {title: 'title', body: 'body'},
    prepare({title, body}) {
      const first = Array.isArray(body)
        ? body.find((block) => block?._type === 'block')?.children?.[0]?.text
        : undefined
      return {title: title || first || 'Rich text', subtitle: 'Rich text'}
    },
  },
})
