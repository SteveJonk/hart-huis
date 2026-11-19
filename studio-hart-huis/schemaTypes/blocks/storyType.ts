import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Slider met klantverhalen. De verhalen zelf zijn `klantverhaal`-documenten;
 * dit blok kiest er (optioneel) een paar uit.
 */
export const storyType = defineType({
  name: 'story',
  title: 'Klantverhalen (slider)',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({name: 'eyebrow', type: 'string', initialValue: 'Klanten vertellen'}),
    defineField({
      name: 'klantverhalen',
      title: 'Klantverhalen',
      type: 'array',
      description: 'Optioneel. Leeg = alle klantverhalen, nieuwste eerst.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'klantverhaal'}]})],
    }),
    defineField({name: 'ctaLabel', title: 'Knoptekst', type: 'string', initialValue: 'Lees hun verhaal'}),
  ],
  preview: {
    select: {eyebrow: 'eyebrow', count: 'klantverhalen.length'},
    prepare: ({eyebrow, count}) => ({
      title: eyebrow || 'Klantverhalen',
      subtitle: count ? `Klantverhalen (slider) · ${count} gekozen` : 'Klantverhalen (slider) · alle',
    }),
  },
})
