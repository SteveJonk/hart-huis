import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {defineField, defineType} from 'sanity'

/** Eén beoordeling groot uitgelicht naast een foto. */
export const uitgelichteReviewType = defineType({
  name: 'uitgelichteReview',
  title: 'Uitgelichte beoordeling',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'review',
      title: 'Beoordeling',
      type: 'reference',
      to: [{type: 'review'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'review.name', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Uitgelichte beoordeling', subtitle: 'Uitgelicht', media}
    },
  },
})
