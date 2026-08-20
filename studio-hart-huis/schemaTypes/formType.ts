import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {defineArrayMember, defineField, defineType} from 'sanity'

/** Multi-step forms keep their fields under `steps`, simple ones under `fields`. */
const isSteps = (document?: Record<string, unknown>) => document?.mode === 'steps'

/**
 * Every form on the site. One page of fields by default; switch **Type** to
 * "In stappen" to spread the same fields over steps with a progress bar.
 *
 * Replaces @multidots/sanity-plugin-contact-form, which only did the simple
 * case. Submitting is handled by our own /api/submit-form, and the mail
 * settings live in `formGeneralSettings`.
 */
export const formType = defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'content', title: 'Fields', default: true},
    {name: 'labels', title: 'Buttons & confirmation'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Name of the form. Only shown on the site if "Show title" is on.',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'showTitle',
      title: 'Show title',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'id',
      title: 'Form ID',
      type: 'string',
      description: 'Stable key used by the seed scripts. Lower-case letters, digits and dashes.',
      group: 'content',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9-]+$/, {name: 'form id'})
          .error('Use lower-case letters, digits and dashes.'),
    }),
    defineField({
      name: 'mode',
      title: 'Type',
      type: 'string',
      initialValue: 'simple',
      group: 'content',
      description:
        'In stappen toont een voortgangsbalk en een knop "Verder"; per stap wordt gecontroleerd of alles is ingevuld.',
      options: {
        list: [
          {title: 'Eén pagina', value: 'simple'},
          {title: 'In stappen', value: 'steps'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'formField'})],
      hidden: ({document}) => isSteps(document),
      // Only required in the mode that uses it — a hidden required field would
      // otherwise block publishing with no visible explanation.
      validation: (rule) =>
        rule.custom((value, context) =>
          isSteps(context.document) || (Array.isArray(value) && value.length > 0)
            ? true
            : 'Add at least one field.',
        ),
    }),
    defineField({
      name: 'steps',
      type: 'array',
      group: 'content',
      hidden: ({document}) => !isSteps(document),
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
      validation: (rule) =>
        rule.custom((value, context) =>
          !isSteps(context.document) || (Array.isArray(value) && value.length > 0)
            ? true
            : 'Add at least one step.',
        ),
    }),
    defineField({
      name: 'submitButtonText',
      type: 'string',
      initialValue: 'Verstuur',
      group: 'labels',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nextButtonText',
      type: 'string',
      initialValue: 'Verder',
      group: 'labels',
      hidden: ({document}) => !isSteps(document),
    }),
    defineField({
      name: 'backButtonText',
      type: 'string',
      initialValue: 'Terug',
      group: 'labels',
      hidden: ({document}) => !isSteps(document),
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
    select: {title: 'title', mode: 'mode', fields: 'fields', steps: 'steps'},
    prepare({title, mode, fields, steps}) {
      const count = Array.isArray(mode === 'steps' ? steps : fields)
        ? (mode === 'steps' ? steps : fields).length
        : 0
      return {
        title: title || 'Form',
        subtitle:
          mode === 'steps'
            ? `In stappen · ${count} ${count === 1 ? 'stap' : 'stappen'}`
            : `Eén pagina · ${count} ${count === 1 ? 'veld' : 'velden'}`,
      }
    },
  },
})
