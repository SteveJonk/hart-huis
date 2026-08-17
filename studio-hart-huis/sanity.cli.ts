import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 's7u8d78o',
    dataset: 'production',
  },
  /**
   * Typegen draait vanuit de studio — de CLI heeft een studio-project-root
   * nodig — maar alles wat het leest en schrijft hoort bij de app: de GROQ
   * staat in `app/src/sanity/queries.ts` en de types worden ernaast gezet.
   * Zo krijgt elke `defineQuery` een `*_QUERY_RESULT`-type en typt
   * `client.fetch(QUERY)` zichzelf, zonder handgeschreven generic.
   */
  typegen: {
    path: '../app/src/**/*.{ts,tsx}',
    schema: '../app/src/sanity/schema.json',
    generates: '../app/src/sanity/sanity.types.ts',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
