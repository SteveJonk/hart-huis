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
      description: 'The email address where submissions should be sent.',
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
      name: 'confirmationSubject',
      title: 'Email Subject',
      type: 'string',
      description: 'Subject line of the mail sent to the admin.',
      initialValue: 'Nieuw bericht via de website',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'confirmationMessage',
      title: 'Email Message',
      type: 'text',
      rows: 4,
      description: 'Intro above the table of answers in the mail to the admin.',
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
