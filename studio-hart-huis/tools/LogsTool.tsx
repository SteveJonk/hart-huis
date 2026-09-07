import {useCallback, useEffect, useMemo, useState} from 'react'
import {useClient} from 'sanity'
import {styles} from './panelStyles'
import {logsStyles as l} from './logsStyles'
import {
  formatDuration,
  formatWhen,
  LOGS_QUERY,
  matchesTask,
  taskLabel,
  triggerLabel,
  type CronLog,
  type TaskFilter,
} from './logsData'

/**
 * Overzicht van elke run van de twee cron-taken (Funda-reviews, Realworks-
 * import) — zowel de nachtelijke cron als de knoppen hierboven onder Tools.
 *
 * Vercel houdt zijn eigen functielogs bij, maar die zijn niet vanuit de studio
 * te zien en verdwijnen na een tijdje. Elke run schrijft daarom een `cronLog`-
 * document (`app/src/lib/cron-log.ts`); dit paneel leest ze alleen, en toont
 * geen "aanmaken"-knop — dat hoort hier niet, dus staat het buiten de gewone
 * documentenlijst (zie `structure.ts`).
 *
 * Hangt in de linkerkolom onder "Logs".
 */
const API_VERSION = '2025-02-19'

/** Aantal regels per keer, met een "toon meer" eronder. */
const PAGINA = 50

export function Logs() {
  const client = useClient({apiVersion: API_VERSION})

  const [logs, setLogs] = useState<CronLog[] | null>(null)
  const [laadfout, setLaadfout] = useState<string | null>(null)
  const [versie, setVersie] = useState(0)
  const [filter, setFilter] = useState<TaskFilter>('alle')
  const [limiet, setLimiet] = useState(PAGINA)

  useEffect(() => {
    let actueel = true
    setLaadfout(null)

    client
      .fetch<CronLog[]>(LOGS_QUERY)
      .then((resultaat) => {
        if (actueel) setLogs(resultaat)
      })
      .catch((error: unknown) => {
        if (actueel) setLaadfout(error instanceof Error ? error.message : String(error))
      })

    return () => {
      actueel = false
    }
  }, [client, versie])

  const zichtbaar = useMemo(() => (logs ?? []).filter((log) => matchesTask(log, filter)), [
    logs,
    filter,
  ])

  useEffect(() => setLimiet(PAGINA), [filter])

  const herlaad = useCallback(() => setVersie((v) => v + 1), [])

  return (
    <div style={styles.wrapper}>
      <p style={styles.intro}>
        Geschiedenis van elke run — automatisch elke nacht of via de knoppen onder Tools. Nieuwste
        eerst; per taak blijven de laatste 200 runs bewaard.
      </p>

      <div style={l.toolbar}>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as TaskFilter)}
          style={l.select}
        >
          <option value="alle">Alle taken</option>
          <option value="funda-reviews">Funda-reviews</option>
          <option value="import-realworks">Realworks-objecten</option>
        </select>
        <button type="button" style={styles.secondary} onClick={herlaad}>
          Vernieuwen
        </button>
        <span style={styles.intro}>
          {logs === null ? 'Laden…' : `${zichtbaar.length} van ${logs.length}`}
        </span>
      </div>

      {laadfout && <div style={styles.notice}>Ophalen mislukt: {laadfout}</div>}

      {logs !== null && zichtbaar.length === 0 && !laadfout && (
        <p style={styles.intro}>
          {logs.length === 0
            ? 'Nog geen enkele run gelogd.'
            : 'Geen runs voor deze taak.'}
        </p>
      )}

      <div style={l.list}>
        {zichtbaar.slice(0, limiet).map((log) => (
          <LogRow key={log._id} log={log} />
        ))}
      </div>

      {zichtbaar.length > limiet && (
        <div style={{...styles.row, marginBottom: 0}}>
          <button type="button" style={styles.secondary} onClick={() => setLimiet((n) => n + PAGINA)}>
            Toon meer ({zichtbaar.length - limiet} te gaan)
          </button>
        </div>
      )}
    </div>
  )
}

function LogRow({log}: {log: CronLog}) {
  return (
    <article style={l.row}>
      <div style={l.rowHead}>
        <span style={l.badge(log.ok ? 'ok' : 'fout')}>{log.ok ? 'geslaagd' : 'mislukt'}</span>
        {log.dryRun && <span style={l.badge('muted')}>testrun</span>}
        <strong>{taskLabel(log.task)}</strong>
        <span style={l.time}>{formatWhen(log.startedAt)}</span>
      </div>

      <p style={l.meta}>
        {triggerLabel(log.trigger)}
        {typeof log.durationMs === 'number' ? ` · ${formatDuration(log.durationMs)}` : ''}
      </p>

      {log.message && <p style={l.message}>{log.message}</p>}

      {!!log.warnings?.length && (
        <ul style={l.warnings}>
          {log.warnings.map((warning, index) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      )}

      {log.error && <pre style={l.error}>{log.error}</pre>}
    </article>
  )
}
