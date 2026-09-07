/**
 * Query, types en formatteerhulpjes voor het Logs-paneel (`LogsTool.tsx`).
 * Staat los van het component, net als `mediaData.ts`.
 */

/**
 * Hoeveel runs er in één keer worden opgehaald — ruim boven wat het paneel
 * toont, zodat filteren op taak geen nieuwe ronde naar Sanity nodig heeft.
 * Staat als getal ín de query: een slice-grens (`[0...n]`) mag in GROQ geen
 * parameter zijn.
 */
export const OPGEHAALD = 300

export const LOGS_QUERY = `*[_type == "cronLog"] | order(startedAt desc) [0...${OPGEHAALD}] {
  _id,
  task,
  trigger,
  ok,
  dryRun,
  startedAt,
  durationMs,
  message,
  warnings,
  error
}`

export type CronTask = 'funda-reviews' | 'import-realworks'
export type CronTrigger = 'cron' | 'studio' | 'onbekend'

export type CronLog = {
  _id: string
  task: CronTask
  trigger: CronTrigger
  ok: boolean
  dryRun: boolean
  startedAt: string
  durationMs?: number | null
  message?: string | null
  warnings?: string[] | null
  error?: string | null
}

export type TaskFilter = 'alle' | CronTask

const TASK_LABELS: Record<CronTask, string> = {
  'funda-reviews': 'Funda-reviews',
  'import-realworks': 'Realworks-objecten',
}

export function taskLabel(task: CronTask): string {
  return TASK_LABELS[task] ?? task
}

const TRIGGER_LABELS: Record<CronTrigger, string> = {
  cron: 'automatisch (nacht)',
  studio: 'knop in de studio',
  onbekend: 'onbekend',
}

export function triggerLabel(trigger: CronTrigger): string {
  return TRIGGER_LABELS[trigger] ?? trigger
}

export function matchesTask(log: CronLog, filter: TaskFilter): boolean {
  return filter === 'alle' || log.task === filter
}

export function formatWhen(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDuration(ms?: number | null): string {
  if (typeof ms !== 'number' || Number.isNaN(ms)) return '—'
  if (ms < 1000) return `${ms} ms`
  return `${(ms / 1000).toFixed(1)} s`
}
