import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

/**
 * Overrides @multidots/sanity-plugin-contact-form's `formGeneralSettings`
 * document (same name, so it replaces the plugin's version — see
 * sanity.config.ts). The plugin doesn't export its field list or let you
 * configure the type, so the original fields are reproduced here from its
 * dist bundle and must be kept in sync by hand on plugin upgrades.
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
      name: 'smtpUsername',
      title: 'Gmail SMTP Username',
      type: 'string',
      description: 'Use full Gmail address since we use Gmail SMTP.',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'smtpPassword',
      title: 'Gmail SMTP Password',
      type: 'string',
      description: 'Use Gmail App Password since we use Gmail SMTP.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mailjetApiKey',
      title: 'Mailjet API Key',
      type: 'string',
      description:
        'Public API key for Mailjet, used together with the secret key below. Fallback only — prefer MAILJET_API_KEY in the app environment, since a Sanity dataset is world-readable.',
    }),
    defineField({
      name: 'mailjetApiSecret',
      title: 'Mailjet API Secret',
      type: 'string',
      description:
        'Secret key for Mailjet. Fallback only — prefer MAILJET_API_SECRET in the app environment, since a Sanity dataset is world-readable.',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
      description: 'Message displayed to the user after successful submission.',
      initialValue: 'Thank you for your submission! We will get back to you soon.',
    }),
    defineField({
      name: 'confirmationSubject',
      title: 'Email Subject',
      type: 'string',
      description: 'Subject line for the confirmation email sent to the admin.',
      initialValue: 'New Submission',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'confirmationMessage',
      title: 'Email Message',
      type: 'text',
      rows: 4,
      description: 'Message body for the confirmation email sent to the admin.',
      initialValue: 'Hi Admin,\n\nA new submission has been made to your form. Please check below details.',
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
