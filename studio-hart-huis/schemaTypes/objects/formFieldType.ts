import {defineArrayMember, defineField, defineType} from 'sanity'

/** Hide a field unless the surrounding field is one of these input types. */
const alleenVoor =
  (...types: string[]) =>
  ({parent}: {parent?: {type?: string}}) =>
    !types.includes(parent?.type ?? '')

/** The opposite: hide a field *for* these input types. */
const nietVoor =
  (...types: string[]) =>
  ({parent}: {parent?: {type?: string}}) =>
    types.includes(parent?.type ?? '')

/**
 * One input in a form. Mirrors the field shape of the contact-form plugin so
 * both kinds of form render through the same React field renderer; `width` is
 * the one addition — the plugin pairs fields by guessing, here the editor says.
 */
export const formFieldType = defineType({
  name: 'formField',
  title: 'Field',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'name',
      type: 'string',
      description:
        'Key this answer is submitted and mailed under. Letters, digits, - and _; no spaces.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, {name: 'field name'})
          .error('Start with a letter and use only letters, digits, - or _.'),
    }),
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'text',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'E-mail', value: 'email'},
          {title: 'Phone', value: 'tel'},
          {title: 'URL', value: 'url'},
          {title: 'Text area', value: 'textarea'},
          {title: 'Dropdown', value: 'select'},
          {title: 'Radio buttons', value: 'radio'},
          {title: 'Checkboxes', value: 'checkbox'},
          {title: 'File upload', value: 'file'},
          {title: 'Verborgen veld', value: 'hidden'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'defaultValue',
      title: 'Waarde',
      type: 'string',
      description:
        'De waarde die wordt meegestuurd. Tussen dubbele accolades vult de pagina zelf iets in: ' +
        '{{adres}}, {{postcode}}, {{plaats}}, {{prijs}} en {{url}} op een objectpagina. ' +
        'Een token dat de pagina niet kent blijft leeg.',
      hidden: alleenVoor('hidden'),
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.parent as {type?: string} | undefined)?.type === 'hidden' && !value
            ? 'Een verborgen veld zonder waarde stuurt niets mee.'
            : true,
        ),
    }),
    defineField({
      name: 'width',
      type: 'string',
      initialValue: 'full',
      description: 'Two consecutive half-width fields share one row on desktop.',
      options: {
        list: [
          {title: 'Full width', value: 'full'},
          {title: 'Half width', value: 'half'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      hidden: nietVoor('hidden'),
    }),
    defineField({
      name: 'isRequired',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
      hidden: nietVoor('hidden'),
    }),
    defineField({
      name: 'placeholder',
      type: 'string',
      description:
        'On a dropdown this becomes the empty first choice (e.g. "Maak een keuze"). Leave it empty to preselect the first option instead.',
      hidden: alleenVoor('text', 'email', 'tel', 'url', 'textarea', 'select'),
    }),
    defineField({
      name: 'helpText',
      type: 'string',
      description: 'Small print under the field. Supports [label](https://link).',
      hidden: nietVoor('hidden'),
    }),
    defineField({
      name: 'selectOptions',
      title: 'Dropdown options',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      hidden: alleenVoor('select'),
    }),
    defineField({
      name: 'radioOptions',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      hidden: alleenVoor('radio'),
    }),
    defineField({
      name: 'checkboxOptions',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
      description: 'One checkbox per option. Supports [label](https://link).',
      hidden: alleenVoor('checkbox'),
    }),
  ],
  preview: {
    select: {title: 'label', type: 'type', isRequired: 'isRequired'},
    prepare({title, type, isRequired}) {
      return {
        title: title || 'Field',
        subtitle: [type, isRequired ? 'required' : null].filter(Boolean).join(' · '),
      }
    },
  },
})
