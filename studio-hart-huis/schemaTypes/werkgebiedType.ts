import {PinIcon} from '@sanity/icons/Pin'
import {defineField, defineType} from 'sanity'

/**
 * Landingspagina per plaats in het werkgebied, op /werkgebied/<slug>.
 * Zelfde page builder als `page`; de seed vult hem met het stad-template.
 */
export const werkgebiedType = defineType({
  name: 'werkgebied',
  title: 'Werkgebied',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Plaats',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'De pagina staat op /werkgebied/<slug>.',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
    defineField({name: 'content', type: 'pageBuilder'}),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current'},
    prepare: ({title, slug}) => ({title, subtitle: slug ? `/werkgebied/${slug}` : undefined}),
  },
})
