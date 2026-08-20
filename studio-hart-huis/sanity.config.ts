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

  plugins: [structureTool({structure}), visionTool()],

  schema: {types: schemaTypes},
})
