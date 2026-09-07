import {ClockIcon} from '@sanity/icons/Clock'
import {defineField, defineType} from 'sanity'

/**
 * Eén regel geschiedenis van een cron-run (Funda-reviews of Realworks). Wordt
 * uitsluitend geschreven door `app/src/lib/cron-log.ts` — nooit met de hand
 * aangemaakt of bewerkt, vandaar `readOnly` op elk veld.
 *
 * Zit expres niet in de linkerkolom als gewoon documenttype: `structure.ts`
 * sluit het uit van de automatische lijst en toont in plaats daarvan een eigen
 * paneel (`tools/LogsTool.tsx`) dat leest, niet bewerkt.
 */
export const cronLogType = defineType({
  name: 'cronLog',
  title: 'Cron-log',
  type: 'document',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'task',
      title: 'Taak',
      type: 'string',
      options: {list: ['funda-reviews', 'import-realworks']},
      readOnly: true,
    }),
    defineField({
      name: 'trigger',
      title: 'Gestart door',
      type: 'string',
      options: {list: ['cron', 'studio', 'onbekend']},
      readOnly: true,
    }),
    defineField({name: 'ok', title: 'Geslaagd', type: 'boolean', readOnly: true}),
    defineField({name: 'dryRun', title: 'Testrun', type: 'boolean', readOnly: true}),
    defineField({name: 'startedAt', title: 'Gestart om', type: 'datetime', readOnly: true}),
    defineField({name: 'durationMs', title: 'Duur (ms)', type: 'number', readOnly: true}),
    defineField({name: 'message', title: 'Samenvatting', type: 'string', readOnly: true}),
    defineField({
      name: 'warnings',
      title: 'Waarschuwingen',
      type: 'array',
      of: [{type: 'string'}],
      readOnly: true,
    }),
    defineField({name: 'error', title: 'Foutmelding', type: 'text', readOnly: true}),
  ],
  preview: {
    select: {task: 'task', ok: 'ok', startedAt: 'startedAt', message: 'message'},
    prepare({task, ok, startedAt, message}) {
      const datum = startedAt ? new Date(startedAt).toLocaleString('nl-NL') : '—'
      return {
        title: `${ok ? '✓' : '✗'} ${task} — ${datum}`,
        subtitle: message,
      }
    },
  },
})
