import {ImagesIcon} from '@sanity/icons/Images'
import {defineField, defineType} from 'sanity'

const imageAlt = defineField({
  name: 'alt',
  type: 'string',
  title: 'Alternative text',
  validation: (rule) => rule.required(),
})

export const duoPhotosType = defineType({
  name: 'duoPhotos',
  title: 'Duo photos',
  type: 'object',
  icon: ImagesIcon,
  description: 'Large portrait with stamp, plus a smaller photo with a caption.',
  fields: [
    defineField({
      name: 'image',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
      fields: [imageAlt],
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'stampValue', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'stampLabel', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary image',
      type: 'image',
      options: {hotspot: true},
      fields: [imageAlt],
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'caption', type: 'text', rows: 3}),
  ],
  preview: {
    select: {media: 'image', subtitle: 'caption'},
    prepare({media, subtitle}) {
      return {title: 'Duo photos', subtitle, media}
    },
  },
})
