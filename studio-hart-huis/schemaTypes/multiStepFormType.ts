import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * A form split over one or more steps, submitted in one go to
 * /api/submit-form (same route and mail settings as the contact-form plugin).
 * Everything the front end needs lives here — the block that renders it only
 * supplies the surrounding chrome, so the same form fits any page.
 */
export const multiStepFormType = defineType({
  name: 'multiStepForm',
  title: 'Multi-step form',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'content', title: 'Steps', default: true},
    {name: 'labels', title: 'Buttons & confirmation'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Internal name, shown in the studio only.',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Form ID',
      type: 'string',
      description: 'Stable key used by the seed scripts. Letters, digits and dashes.',
      group: 'content',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9-]+$/, {name: 'form id'})
          .error('Use lower-case letters, digits and dashes.'),
    }),
    defineField({
      name: 'steps',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'formStep',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              description: 'Optional heading above this step.',
            }),
            defineField({
              name: 'fields',
              type: 'array',
              of: [defineArrayMember({type: 'formField'})],
              validation: (rule) => rule.min(1).required(),
            }),
          ],
          preview: {
            select: {title: 'title', fields: 'fields'},
            prepare({title, fields}) {
              const count = Array.isArray(fields) ? fields.length : 0
              return {
                title: title || 'Step',
                subtitle: `${count} ${count === 1 ? 'field' : 'fields'}`,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: 'nextButtonText',
      type: 'string',
      initialValue: 'Verder',
      group: 'labels',
      description: 'Only shown when the form has more than one step.',
    }),
    defineField({
      name: 'backButtonText',
      type: 'string',
      initialValue: 'Terug',
      group: 'labels',
    }),
    defineField({
      name: 'submitButtonText',
      type: 'string',
      initialValue: 'Verstuur',
      group: 'labels',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'successTitle',
      type: 'string',
      description: 'Shown instead of the form after a successful submission.',
      group: 'labels',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'successBody',
      type: 'text',
      rows: 3,
      group: 'labels',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', steps: 'steps'},
    prepare({title, steps}) {
      const count = Array.isArray(steps) ? steps.length : 0
      return {
        title: title || 'Multi-step form',
        subtitle: `${count} ${count === 1 ? 'step' : 'steps'}`,
      }
    },
  },
})
