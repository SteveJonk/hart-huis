import {MenuIcon} from '@sanity/icons/Menu'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {linkFields} from './objects/linkFields'

const navLinkMember = defineArrayMember({
  type: 'object',
  name: 'navLink',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    ...linkFields,
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      href: 'href',
      internalTitle: 'internalLink.title',
    },
    prepare({title, linkType, href, internalTitle}) {
      return {
        title: title || 'Link',
        subtitle:
          linkType === 'internal' ? internalTitle || 'Internal page' : href || 'External URL',
      }
    },
  },
})

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'Logo that shows in the navigation bar.',
      type: 'image',
      options: {accept: 'image/svg+xml,image/png,image/webp'},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'navLeft',
      title: 'Left links',
      type: 'array',
      of: [navLinkMember],
    }),
    defineField({
      name: 'navRight',
      title: 'Right links',
      type: 'array',
      of: [navLinkMember],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Navigation'}
    },
  },
})
