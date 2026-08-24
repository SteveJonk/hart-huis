import {useCallback, useState} from 'react'
import {styles} from './panelStyles'

/**
 * Knop in de studio die de scraper-route op de site aanroept. De route doet het
 * echte werk (Funda ophalen + reviews wegschrijven); dit is alleen de trigger.
 *
 * Hangt onder Tools in de linkerkolom — zie `structure.ts`.
 *
 * Twee env-variabelen, in te stellen in `studio-hart-huis/.env`:
 *   SANITY_STUDIO_SCRAPER_URL     https://<site>/api/scrape-funda-reviews
 *   SANITY_STUDIO_SCRAPER_SECRET  hetzelfde als FUNDA_SCRAPER_SECRET op Vercel
 *
 * Let op: een gedeployde studio is een publieke JS-bundle, dus dit secret is
 * leesbaar voor wie ernaar zoekt. Houd het daarom los van Vercels CRON_SECRET —
 * het ergste wat ermee kan is dat iemand een scrape start.
 */
const SCRAPER_URL = process.env.SANITY_STUDIO_SCRAPER_URL
const SCRAPER_SECRET = process.env.SANITY_STUDIO_SCRAPER_SECRET

type Summary = {
  ok?: boolean
  error?: string
  dryRun?: boolean
  found?: number
  perType?: Record<string, number>
  pagesFetched?: number
  created?: number
  updated?: number
  unchanged?: number
  warnings?: string[]
}

function describe(summary: Summary): string {
  if (summary.error) return `Mislukt: ${summary.error}`

  const counts = Object.entries(summary.perType ?? {})
    .map(([type, count]) => `${count}× ${type.toLowerCase()}`)
    .join(', ')

  const head = summary.dryRun
    ? `Testrun — er is niets opgeslagen. ${summary.found ?? 0} beoordelingen gevonden (${counts}).`
    : `${summary.found ?? 0} beoordelingen opgehaald (${counts}): ` +
      `${summary.created ?? 0} nieuw, ${summary.updated ?? 0} bijgewerkt, ` +
      `${summary.unchanged ?? 0} ongewijzigd.`

  const warnings = summary.warnings?.length ? `\n\nLet op:\n- ${summary.warnings.join('\n- ')}` : ''

  return `${head}\nOpgehaalde pagina's: ${summary.pagesFetched ?? 0}.${warnings}`
}

export function FundaReviews() {
  const [busy, setBusy] = useState<'run' | 'dry' | null>(null)
  const [summary, setSummary] = useState<Summary | null>(null)

  const run = useCallback(async (dryRun: boolean) => {
    setBusy(dryRun ? 'dry' : 'run')
    setSummary(null)
    try {
      const url = new URL(SCRAPER_URL as string)
      if (dryRun) url.searchParams.set('dryRun', '1')

      const response = await fetch(url, {
        method: 'POST',
        headers: {'x-scraper-secret': SCRAPER_SECRET ?? ''},
      })
      const body = (await response.json()) as Summary
      setSummary(response.ok ? body : {error: body.error ?? `HTTP ${response.status}`})
    } catch (error) {
      setSummary({error: error instanceof Error ? error.message : String(error)})
    } finally {
      setBusy(null)
    }
  }, [])

  if (!SCRAPER_URL || !SCRAPER_SECRET) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.notice}>
          Nog niet ingesteld. Zet <code>SANITY_STUDIO_SCRAPER_URL</code> en{' '}
          <code>SANITY_STUDIO_SCRAPER_SECRET</code> in <code>studio-hart-huis/.env</code> en start
          de studio opnieuw. De waarden staan beschreven in de README.
        </div>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>
      <p style={styles.intro}>
        Haalt alle beoordelingen op van het Funda-profiel — zowel aankoop als verkoop, alle
        pagina&apos;s — en zet ze onder Reviews. Beoordelingen die er al staan worden bijgewerkt,
        niet gedupliceerd. Dit gebeurt ook elke nacht automatisch.
      </p>

      <div style={styles.row}>
        <button type="button" style={styles.button} onClick={() => run(false)} disabled={!!busy}>
          {busy === 'run' ? 'Bezig…' : 'Reviews ophalen'}
        </button>
        <button
          type="button"
          style={styles.secondary}
          onClick={() => run(true)}
          disabled={!!busy}
        >
          {busy === 'dry' ? 'Bezig…' : 'Eerst testen'}
        </button>
      </div>

      {busy && <p style={styles.intro}>Dit duurt een halve minuut — Funda wordt rustig bevraagd.</p>}
      {summary && <pre style={styles.output}>{describe(summary)}</pre>}
    </div>
  )
}
