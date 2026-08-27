import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

/**
 * Mail and spam settings shared by every `form`. Sending goes through
 * Mailjet's HTTP API; see app/src/app/api/submit-form/route.ts.
 *
 * The API credentials here are a fallback only. A Sanity dataset is readable
 * by anyone who knows the project id, so in production these belong in the
 * app environment (MAILJET_API_KEY / MAILJET_API_SECRET), which wins.
 */
export const formGeneralSettingsType = defineType({
  name: 'formGeneralSettings',
  title: 'Form: General Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'adminEmail',
      title: 'Admin Email',
      type: 'string',
      description:
        'Default recipient. A form with its own "Ontvangers" under Mail overrides this.',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'fromEmail',
      title: 'Sender address',
      type: 'string',
      description:
        'Address the mail is sent from. Must be a sender Mailjet has validated, otherwise it is rejected. Falls back to the admin address.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'fromName',
      title: 'Sender name',
      type: 'string',
      initialValue: 'Hart & Huis website',
    }),
    defineField({
      name: 'mailjetApiKey',
      title: 'Mailjet API Key',
      type: 'string',
      description: 'Fallback only — prefer MAILJET_API_KEY in the app environment.',
    }),
    defineField({
      name: 'mailjetApiSecret',
      title: 'Mailjet API Secret',
      type: 'string',
      description: 'Fallback only — prefer MAILJET_API_SECRET in the app environment.',
    }),
    defineField({
      // Niet 'logo': dat veld bestaat ook op navigation/footer, en de queries
      // die die singletons op _id ophalen krijgen er dan een extra tak bij.
      name: 'mailLogo',
      title: 'Logo in de mail',
      type: 'image',
      description:
        'Staat bovenaan elke formuliermail. Laat leeg om alleen de afzendernaam te tonen.',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primaire kleur',
      type: 'string',
      description: 'Hexcode, bv. #5f7057. Gebruikt voor de balk en de accenten in de mail.',
      initialValue: '#5f7057',
      validation: (rule) => rule.regex(/^#[0-9a-fA-F]{6}$/, {name: 'hexkleur'}),
    }),
    defineField({
      name: 'textColor',
      title: 'Tekstkleur',
      type: 'string',
      description: 'Hexcode, bv. #241f1c. De kleur van de tekst in de mail.',
      initialValue: '#241f1c',
      validation: (rule) => rule.regex(/^#[0-9a-fA-F]{6}$/, {name: 'hexkleur'}),
    }),
    defineField({
      name: 'confirmationSubject',
      title: 'Email Subject',
      type: 'string',
      description:
        'Default subject of the mail to the admin. A form can override it under Mail.',
      initialValue: 'Nieuw bericht via de website',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'confirmationMessage',
      title: 'Email Message',
      type: 'text',
      rows: 4,
      description:
        'Default intro above the table of answers. A form can override it under Mail.',
      initialValue: 'Er is een nieuw bericht binnengekomen via de website.',
    }),
    defineField({
      name: 'recaptchaEnabled',
      title: 'Enable reCAPTCHA',
      type: 'boolean',
      description: 'Enable Google reCAPTCHA for spam protection.',
      initialValue: false,
    }),
    defineField({
      name: 'recaptchaSiteKey',
      title: 'reCAPTCHA Site Key',
      type: 'string',
      description: 'Google reCAPTCHA site key for spam protection.',
      hidden: ({document}) => !document?.recaptchaEnabled,
      validation: (rule) =>
        rule.custom((field, context) =>
          context.document?.recaptchaEnabled && !field
            ? 'Site key is required when reCAPTCHA is enabled'
            : true,
        ),
    }),
    defineField({
      name: 'recaptchaSecretKey',
      title: 'reCAPTCHA Secret Key',
      type: 'string',
      description: 'Google reCAPTCHA secret key for server-side validation.',
      hidden: ({document}) => !document?.recaptchaEnabled,
      validation: (rule) =>
        rule.custom((field, context) =>
          context.document?.recaptchaEnabled && !field
            ? 'Secret key is required when reCAPTCHA is enabled'
            : true,
        ),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Form: General Settings'}
    },
  },
})
