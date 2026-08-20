import {contactFormPlugin} from '@multidots/sanity-plugin-contact-form'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Hart en Huis',

  projectId: 's7u8d78o',
  dataset: 'production',

  plugins: [structureTool({structure}), contactFormPlugin(), visionTool()],

  schema: {
    // contactFormPlugin() registers its own `formGeneralSettings` type with a
    // fixed field set and no way to configure it. Drop the plugin's copy and
    // use ours (studio-hart-huis/schemaTypes/formGeneralSettingsType.ts),
    // which reproduces its fields and adds mailjetApiKey.
    types: (prev) => [
      ...prev.filter((type) => type.name !== 'formGeneralSettings'),
      ...schemaTypes,
    ],
  },
})
