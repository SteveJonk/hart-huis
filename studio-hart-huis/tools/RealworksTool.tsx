import {useCallback, useState} from 'react'
import {styles} from './panelStyles'

/**
 * Knop in de studio die de Realworks-import op de site aanroept. De route doet
 * het echte werk (feed ophalen + objecten wegschrijven); dit is de trigger.
 *
 * Hangt onder Tools in de linkerkolom — zie `structure.ts`.
 *
 * Twee env-variabelen, in te stellen in `studio-hart-huis/.env`:
 *   SANITY_STUDIO_REALWORKS_URL   https://<site>/api/import-realworks
 *   SANITY_STUDIO_SCRAPER_SECRET  hetzelfde als FUNDA_SCRAPER_SECRET op Vercel
 */
const IMPORT_URL = process.env.SANITY_STUDIO_REALWORKS_URL
const SECRET = process.env.SANITY_STUDIO_SCRAPER_SECRET

type Summary = {
  ok?: boolean
  error?: string
  dryRun?: boolean
  gevonden?: number
  verwerkt?: number
  geschreven?: number
  nieuw?: number
  fotosGeladen?: number
  fotosBehouden?: number
  fotosToegevoegd?: number
  gedepubliceerd?: number
  gedepubliceerdeObjecten?: string[]
  warnings?: string[]
}

function describe(summary: Summary): string {
  if (summary.error) return `Mislukt: ${summary.error}`

  const head = summary.dryRun
    ? `Testrun — er is niets opgeslagen. ${summary.gevonden ?? 0} objecten in de feed, ` +
      `${summary.verwerkt ?? 0} gemapt.`
    : `${summary.gevonden ?? 0} objecten opgehaald: ${summary.geschreven ?? 0} weggeschreven ` +
      `(waarvan ${summary.nieuw ?? 0} nieuw), ${summary.fotosGeladen ?? 0} foto's geladen, ` +
      `${summary.fotosBehouden ?? 0} bestaande foto's behouden, ` +
      `${summary.fotosToegevoegd ?? 0} aangevuld.`

  const offline = summary.gedepubliceerd
    ? `\n\n${summary.dryRun ? 'Zou offline gaan' : 'Offline gehaald'} (niet verkocht, ` +
      `twee maanden niet meer in de feed):\n- ${(summary.gedepubliceerdeObjecten ?? []).join('\n- ')}`
    : ''

  const warnings = summary.warnings?.length ? `\n\nLet op:\n- ${summary.warnings.join('\n- ')}` : ''

  return `${head}${offline}${warnings}`
}

export function RealworksObjecten() {
  const [busy, setBusy] = useState<'run' | 'dry' | null>(null)
  const [summary, setSummary] = useState<Summary | null>(null)

  const run = useCallback(async (dryRun: boolean) => {
    setBusy(dryRun ? 'dry' : 'run')
    setSummary(null)
    try {
      const url = new URL(IMPORT_URL as string)
      if (dryRun) url.searchParams.set('dryRun', '1')

      const response = await fetch(url, {
        method: 'POST',
        headers: {'x-scraper-secret': SECRET ?? ''},
      })
      // De route zet zelf een leesbare `error` in het antwoord — ook bij een
      // lege feed, waar de HTTP-status 200 is maar er niets te importeren valt.
      const body = (await response.json().catch(() => ({}))) as Summary
      setSummary(body.error ? {error: body.error} : response.ok ? body : {error: `HTTP ${response.status}`})
    } catch (error) {
      setSummary({error: error instanceof Error ? error.message : String(error)})
    } finally {
      setBusy(null)
    }
  }, [])

  if (!IMPORT_URL || !SECRET) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.notice}>
          Nog niet ingesteld. Zet <code>SANITY_STUDIO_REALWORKS_URL</code> en{' '}
          <code>SANITY_STUDIO_SCRAPER_SECRET</code> in <code>studio-hart-huis/.env</code> en start de
          studio opnieuw. De waarden staan beschreven in de README.
        </div>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>
      <p style={styles.intro}>
        Haalt het actieve aanbod op bij Realworks en zet het onder Objecten. De feed is de waarheid:
        een object dat er al staat wordt volledig overschreven, inclusief kenmerken en foto&apos;s.
        Dit gebeurt ook elke nacht automatisch.
      </p>

      <div style={styles.row}>
        <button type="button" style={styles.button} onClick={() => run(false)} disabled={!!busy}>
          {busy === 'run' ? 'Bezig…' : 'Objecten ophalen'}
        </button>
        <button type="button" style={styles.secondary} onClick={() => run(true)} disabled={!!busy}>
          {busy === 'dry' ? 'Bezig…' : 'Eerst testen'}
        </button>
      </div>

      {busy === 'run' && (
        <p style={styles.intro}>
          De eerste keer duurt dit een paar minuten — alle foto&apos;s worden dan naar Sanity
          geladen. Daarna gaat het snel, want bestaande foto&apos;s worden hergebruikt.
        </p>
      )}
      {summary && <pre style={styles.output}>{describe(summary)}</pre>}
    </div>
  )
}
