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
    {name: 'mail', title: 'Mail'},
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
      name: 'redirectAfterSubmit',
      title: 'Doorsturen na versturen',
      type: 'boolean',
      initialValue: false,
      group: 'labels',
      description:
        'Aan: de invuller gaat na een geslaagde inzending naar een andere pagina (bijvoorbeeld een bedankpagina) in plaats van de bevestiging hieronder te zien.',
    }),
    defineField({
      name: 'redirectLink',
      title: 'Doorstuurpagina',
      type: 'link',
      group: 'labels',
      hidden: ({document}) => !document?.redirectAfterSubmit,
      description: 'Een pagina op deze site of een externe URL.',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!context.document?.redirectAfterSubmit) return true
          const link = value as {linkType?: string; href?: string; internalLink?: unknown} | undefined
          if (!link?.linkType) return 'Kies een pagina of vul een URL in.'
          // The link object validates its own halves; this only catches an
          // empty object, which those rules never see.
          return true
        }),
    }),
    defineField({
      name: 'successTitle',
      type: 'string',
      description: 'Shown instead of the form after a successful submission.',
      group: 'labels',
      hidden: ({document}) => Boolean(document?.redirectAfterSubmit),
      // Not required while redirecting: the confirmation is never rendered,
      // and a hidden required field would block publishing with no visible
      // explanation.
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.redirectAfterSubmit || value ? true : 'Vul een bevestigingstitel in.',
        ),
    }),
    defineField({
      name: 'successBody',
      type: 'text',
      rows: 3,
      group: 'labels',
      hidden: ({document}) => Boolean(document?.redirectAfterSubmit),
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.redirectAfterSubmit || value ? true : 'Vul een bevestigingstekst in.',
        ),
    }),
    defineField({
      name: 'mailRecipients',
      title: 'Ontvangers',
      type: 'string',
      group: 'mail',
      description:
        'Waar deze inzending heen gaat. Meerdere adressen mogen, gescheiden door een komma. Leeg = het Admin Email uit Form settings.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          const bad = value
            .split(',')
            .map((address) => address.trim())
            .filter((address) => address && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address))
          return bad.length ? `Geen geldig e-mailadres: ${bad.join(', ')}` : true
        }),
    }),
    defineField({
      name: 'mailSubject',
      title: 'Onderwerp',
      type: 'string',
      group: 'mail',
      description: 'Onderwerp van de mail naar de ontvangers. Leeg = de tekst uit Form settings.',
    }),
    defineField({
      name: 'mailMessage',
      title: 'Bericht',
      type: 'text',
      rows: 4,
      group: 'mail',
      description: 'Introtekst boven de tabel met antwoorden. Leeg = de tekst uit Form settings.',
    }),
    defineField({
      name: 'sendCopyToSubmitter',
      title: 'Stuur ook een mail naar de invuller',
      type: 'boolean',
      initialValue: false,
      group: 'mail',
      description:
        'Gebruikt het eerste veld van het type E-mail in dit formulier als ontvanger. Zonder zo\'n veld gebeurt er niets.',
    }),
    defineField({
      name: 'copySubject',
      title: 'Onderwerp (mail naar invuller)',
      type: 'string',
      group: 'mail',
      hidden: ({document}) => !document?.sendCopyToSubmitter,
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.sendCopyToSubmitter && !value
            ? 'Vul een onderwerp in voor de mail naar de invuller.'
            : true,
        ),
    }),
    defineField({
      name: 'copyMessage',
      title: 'Bericht (mail naar invuller)',
      type: 'text',
      rows: 4,
      group: 'mail',
      hidden: ({document}) => !document?.sendCopyToSubmitter,
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.sendCopyToSubmitter && !value
            ? 'Vul een bericht in voor de mail naar de invuller.'
            : true,
        ),
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
