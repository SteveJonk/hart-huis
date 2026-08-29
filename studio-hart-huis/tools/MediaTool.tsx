import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useClient} from 'sanity'
import {IntentLink} from 'sanity/router'
import {styles} from './panelStyles'
import {mediaStyles as m} from './mediaStyles'
import {
  ASSET_QUERY,
  ASSETS_QUERY,
  ASSET_TYPES,
  USAGE_QUERY,
  dedupeUsage,
  displayName,
  formatBytes,
  formatDate,
  formatDimensions,
  isImage,
  matchesFilter,
  matchesSearch,
  thumbnailUrl,
  typeLabel,
  uploadKind,
  type MediaAsset,
  type MediaAssetDetail,
  type MediaFilter,
  type MediaUsage,
} from './mediaData'

/**
 * Mediabeheer in de studio: alle uploads op één plek, doorzoekbaar, met per
 * bestand de gegevens en de documenten die het gebruiken, een uploadveld en een
 * verwijderknop.
 *
 * Hangt in de linkerkolom onder "Media" — zie `structure.ts`.
 *
 * Waarom zelfgebouwd: Sanity's eigen assetbrowser opent alleen vanuit een
 * afbeeldingsveld op een document, dus er is geen manier om te zien wát er in
 * de dataset staat, laat staan om iets weg te gooien dat nergens meer hangt.
 *
 * Verwijderen kan alleen als geen enkel document naar het bestand verwijst —
 * dat is niet alleen onze regel, Sanity weigert het zelf ook. Concepten tellen
 * mee: een foto die alleen in een niet-gepubliceerd concept staat is in gebruik.
 *
 * Het laden gaat in twee trappen. ASSETS_QUERY levert de lijst en die staat
 * meteen op het scherm; USAGE_QUERY zoekt daarnáást uit welke bestanden ergens
 * gebruikt worden en vult de labels later aan. Dat tweede deel is het dure werk
 * (het moet per bestand door de hele dataset), en het hoort niet tussen de
 * redacteur en zijn overzicht in te staan. Zolang het loopt tonen de kaartjes
 * geen label en staat het filter "ongebruikt" uit.
 *
 * Het raster rendert `PAGINA` kaartjes tegelijk. Zonder die grens hangt de
 * browser bij een grote bibliotheek duizenden <img>-elementen in de DOM, en
 * daar helpt `loading="lazy"` niet tegen — dat scheelt alleen downloads.
 */

/** Vast gezet, zodat een nieuwe API-versie deze queries niet stilletjes verandert. */
const API_VERSION = '2025-02-19'

/** Aantal kaartjes per keer, met een "toon meer" eronder. */
const PAGINA = 60

type Status = {toon: 'ok' | 'fout'; tekst: string}

export function MediaBeheer() {
  const client = useClient({apiVersion: API_VERSION})

  const [assets, setAssets] = useState<MediaAsset[] | null>(null)
  const [gebruikt, setGebruikt] = useState<Set<string> | null>(null)
  const [laadfout, setLaadfout] = useState<string | null>(null)
  const [versie, setVersie] = useState(0)

  const [zoek, setZoek] = useState('')
  const [filter, setFilter] = useState<MediaFilter>('alle')
  const [limiet, setLimiet] = useState(PAGINA)
  const [geopend, setGeopend] = useState<string | null>(null)

  const [uploadt, setUploadt] = useState(false)
  const [sleept, setSleept] = useState(false)
  const [status, setStatus] = useState<Status | null>(null)
  const invoer = useRef<HTMLInputElement>(null)

  const herlaad = useCallback(() => setVersie((v) => v + 1), [])

  // Trap 1: de lijst. Klein en snel, en genoeg om het raster te tekenen.
  useEffect(() => {
    let actueel = true
    setLaadfout(null)

    client
      .fetch<MediaAsset[]>(ASSETS_QUERY, {types: [...ASSET_TYPES]})
      .then((resultaat) => {
        if (actueel) setAssets(resultaat)
      })
      .catch((error: unknown) => {
        if (actueel) setLaadfout(error instanceof Error ? error.message : String(error))
      })

    return () => {
      actueel = false
    }
  }, [client, versie])

  // Trap 2: welke bestanden ergens gebruikt worden. Loopt los van trap 1 en mag
  // dus duren; mislukt hij, dan blijven de labels weg maar werkt de rest gewoon.
  useEffect(() => {
    let actueel = true
    // Bij een herlaadronde blijft de vorige uitslag staan in plaats van eerst
    // naar null te gaan: dat scheelt een flikkering, en na een upload of een
    // verwijdering klopt hij nog — een net geüpload bestand staat er niet in en
    // heet dus terecht ongebruikt.
    client
      .fetch<string[]>(USAGE_QUERY, {types: [...ASSET_TYPES]})
      .then((ids) => {
        if (actueel) setGebruikt(new Set(ids))
      })
      .catch(() => {
        // Bewust stil: het overzicht is zonder deze telling nog steeds bruikbaar
        // en het detailpaneel doet zijn eigen, gezaghebbende controle.
      })

    return () => {
      actueel = false
    }
  }, [client, versie])

  const zichtbaar = useMemo(
    () =>
      (assets ?? []).filter(
        (a) =>
          matchesFilter(a, filter, gebruikt ? gebruikt.has(a._id) : null) && matchesSearch(a, zoek),
      ),
    [assets, filter, gebruikt, zoek],
  )

  // Een nieuwe zoekopdracht begint weer bovenaan.
  useEffect(() => setLimiet(PAGINA), [zoek, filter])

  const upload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return
      setUploadt(true)
      setStatus(null)

      const mislukt: string[] = []
      let laatste: string | null = null

      for (const file of files) {
        try {
          const asset = await client.assets.upload(uploadKind(file), file, {filename: file.name})
          laatste = asset._id
        } catch (error) {
          mislukt.push(`${file.name}: ${error instanceof Error ? error.message : String(error)}`)
        }
      }

      const gelukt = files.length - mislukt.length
      setStatus(
        mislukt.length
          ? {toon: 'fout', tekst: `${gelukt} van ${files.length} geüpload.\n${mislukt.join('\n')}`}
          : {toon: 'ok', tekst: `${gelukt} bestand${gelukt === 1 ? '' : 'en'} toegevoegd.`},
      )
      // Eén upload openen we meteen, zodat de redacteur ziet dat het gelukt is.
      if (laatste && files.length === 1) setGeopend(laatste)
      setUploadt(false)
      herlaad()
    },
    [client, herlaad],
  )

  const verwijderd = useCallback(
    (naam: string) => {
      setGeopend(null)
      setStatus({toon: 'ok', tekst: `“${naam}” is verwijderd.`})
      herlaad()
    },
    [herlaad],
  )

  const totaal = assets?.length ?? 0
  const ongebruikt = gebruikt ? (assets ?? []).filter((a) => !gebruikt.has(a._id)).length : null

  return (
    <div style={m.wrapper}>
      <p style={styles.intro}>
        Alle bestanden die ooit naar Sanity zijn geüpload — ook die welke nergens meer gebruikt
        worden. Klik een bestand aan voor de gegevens en de documenten die het gebruiken.
      </p>

      <div
        style={{...m.dropzone, ...(sleept ? m.dropzoneActive : null), marginTop: 16}}
        onDragOver={(event) => {
          event.preventDefault()
          setSleept(true)
        }}
        onDragLeave={() => setSleept(false)}
        onDrop={(event) => {
          event.preventDefault()
          setSleept(false)
          void upload([...event.dataTransfer.files])
        }}
      >
        <input
          ref={invoer}
          type="file"
          multiple
          style={{display: 'none'}}
          onChange={(event) => {
            void upload([...(event.target.files ?? [])])
            event.target.value = ''
          }}
        />
        <button
          type="button"
          style={styles.button}
          onClick={() => invoer.current?.click()}
          disabled={uploadt}
        >
          {uploadt ? 'Bezig met uploaden…' : 'Bestanden toevoegen'}
        </button>{' '}
        of sleep ze hierheen. Afbeeldingen en documenten (pdf) kunnen allebei.
      </div>

      {status && (
        <div
          style={{
            ...m.message,
            borderColor: status.toon === 'fout' ? 'var(--card-border-color, #f0c000)' : undefined,
          }}
        >
          {status.tekst}
        </div>
      )}

      <div style={m.toolbar}>
        <input
          type="search"
          value={zoek}
          onChange={(event) => setZoek(event.target.value)}
          placeholder="Zoek op bestandsnaam, titel, alt-tekst of type…"
          style={m.search}
        />
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as MediaFilter)}
          style={m.select}
        >
          <option value="alle">Alles</option>
          <option value="afbeeldingen">Alleen afbeeldingen</option>
          <option value="bestanden">Alleen bestanden</option>
          <option value="ongebruikt" disabled={gebruikt === null}>
            Alleen ongebruikt
          </option>
        </select>
        <span style={styles.intro}>
          {assets === null
            ? 'Laden…'
            : `${zichtbaar.length} van ${totaal}` +
              (ongebruikt === null ? ' — gebruik wordt geteld…' : ` — ${ongebruikt} ongebruikt`)}
        </span>
      </div>

      {laadfout && <div style={styles.notice}>Ophalen mislukt: {laadfout}</div>}

      <div style={m.columns}>
        <div style={m.gridColumn}>
          {assets !== null && zichtbaar.length === 0 && !laadfout && (
            <p style={styles.intro}>
              {totaal === 0
                ? 'Er staat nog niets in de mediabibliotheek.'
                : 'Geen bestanden gevonden. Pas de zoekopdracht of het filter aan.'}
            </p>
          )}

          <div style={m.grid}>
            {zichtbaar.slice(0, limiet).map((asset) => (
              <MediaKaart
                key={asset._id}
                asset={asset}
                inGebruik={gebruikt ? gebruikt.has(asset._id) : null}
                actief={asset._id === geopend}
                onOpen={() => setGeopend(asset._id === geopend ? null : asset._id)}
              />
            ))}
          </div>

          {zichtbaar.length > limiet && (
            <div style={{...styles.row, marginBottom: 0}}>
              <button
                type="button"
                style={styles.secondary}
                onClick={() => setLimiet((huidig) => huidig + PAGINA)}
              >
                Toon meer ({zichtbaar.length - limiet} te gaan)
              </button>
            </div>
          )}
        </div>

        {geopend && (
          <MediaDetail
            key={geopend}
            assetId={geopend}
            apiVersion={API_VERSION}
            onClose={() => setGeopend(null)}
            onDeleted={verwijderd}
          />
        )}
      </div>
    </div>
  )
}

function MediaKaart({
  asset,
  inGebruik,
  actief,
  onOpen,
}: {
  asset: MediaAsset
  /** `null` zolang USAGE_QUERY loopt — dan nog geen label tonen. */
  inGebruik: boolean | null
  actief: boolean
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{...m.card, ...(actief ? m.cardSelected : null)}}
      title={displayName(asset)}
    >
      {isImage(asset) ? (
        <img src={thumbnailUrl(asset.url)} alt="" style={m.thumb} loading="lazy" />
      ) : (
        <span style={m.thumbFallback}>{asset.extension ?? 'bestand'}</span>
      )}
      <span style={m.cardBody}>
        <span style={{...m.cardName, display: 'block'}}>{displayName(asset)}</span>
        <span style={{...m.cardMeta, display: 'block'}}>
          {formatBytes(asset.size)}
          {isImage(asset) && asset.breedte ? ` · ${asset.breedte}×${asset.hoogte}` : ''}
        </span>
        {inGebruik === false && <span style={m.badge}>ongebruikt</span>}
      </span>
    </button>
  )
}

function MediaDetail({
  assetId,
  apiVersion,
  onClose,
  onDeleted,
}: {
  assetId: string
  apiVersion: string
  onClose: () => void
  onDeleted: (naam: string) => void
}) {
  const client = useClient({apiVersion})

  const [asset, setAsset] = useState<MediaAssetDetail | null>(null)
  const [gebruik, setGebruik] = useState<MediaUsage[]>([])
  const [fout, setFout] = useState<string | null>(null)
  const [bevestig, setBevestig] = useState(false)
  const [bezig, setBezig] = useState(false)

  useEffect(() => {
    let actueel = true
    setFout(null)

    client
      .fetch<{asset: MediaAssetDetail | null; gebruik: MediaUsage[]}>(ASSET_QUERY, {id: assetId})
      .then((resultaat) => {
        if (!actueel) return
        setAsset(resultaat.asset)
        setGebruik(resultaat.gebruik ?? [])
      })
      .catch((error: unknown) => {
        if (actueel) setFout(error instanceof Error ? error.message : String(error))
      })

    return () => {
      actueel = false
    }
  }, [client, assetId])

  const documenten = useMemo(() => dedupeUsage(gebruik), [gebruik])

  const verwijder = useCallback(async () => {
    if (!asset) return
    setBezig(true)
    setFout(null)
    try {
      await client.delete(asset._id)
      onDeleted(displayName(asset))
    } catch (error) {
      // Sanity weigert zelf ook een asset waar nog naar verwezen wordt; als dat
      // hier gebeurt is de lijst hierboven verouderd.
      setFout(error instanceof Error ? error.message : String(error))
      setBezig(false)
      setBevestig(false)
    }
  }, [asset, client, onDeleted])

  if (fout && !asset) {
    return (
      <aside style={m.detail}>
        <div style={styles.notice}>Ophalen mislukt: {fout}</div>
      </aside>
    )
  }

  if (!asset) {
    return (
      <aside style={m.detail}>
        <p style={styles.intro}>Laden…</p>
      </aside>
    )
  }

  const rijen: [string, string][] = [
    ['Bestandsnaam', asset.originalFilename ?? '—'],
    ['Titel', asset.title || '—'],
    ['Alt-tekst', asset.altText || '—'],
    ['Omschrijving', asset.description || '—'],
    ['Soort', isImage(asset) ? 'Afbeelding' : 'Bestand'],
    ['Bestandstype', asset.mimeType ?? '—'],
    ...(isImage(asset) ? ([['Afmetingen', formatDimensions(asset)]] as [string, string][]) : []),
    ['Grootte', formatBytes(asset.size)],
    ['Geüpload', formatDate(asset._createdAt)],
    ['Bijgewerkt', formatDate(asset._updatedAt)],
    ['Document-id', asset._id],
  ]

  return (
    <aside style={m.detail}>
      {isImage(asset) ? (
        <img src={thumbnailUrl(asset.url, 640)} alt="" style={m.detailPreview} />
      ) : (
        <div style={{...m.thumbFallback, aspectRatio: '3 / 1', borderRadius: 4}}>
          {asset.extension ?? 'bestand'}
        </div>
      )}

      <h2 style={m.detailTitle}>{displayName(asset)}</h2>

      <table style={m.table}>
        <tbody>
          {rijen.map(([label, waarde]) => (
            <tr key={label}>
              <th scope="row" style={m.th}>
                {label}
              </th>
              <td style={m.td}>{waarde}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{...m.cardMeta, marginTop: 12}}>
        <a href={asset.url} target="_blank" rel="noreferrer">
          Origineel openen
        </a>
      </p>

      <h3 style={m.sectionTitle}>
        {documenten.length === 0
          ? 'Nergens gebruikt'
          : `Gebruikt in ${documenten.length} document${documenten.length === 1 ? '' : 'en'}`}
      </h3>

      {documenten.length > 0 && (
        <ul style={m.list}>
          {documenten.map((doc) => (
            <li key={doc._id}>
              <IntentLink intent="edit" params={{id: doc._id, type: doc._type}}>
                {doc.titel || doc._id}
              </IntentLink>{' '}
              <span style={{color: 'var(--card-muted-fg-color, #6b7280)'}}>
                ({typeLabel(doc._type)}
                {doc.concept ? ', concept' : ''})
              </span>
            </li>
          ))}
        </ul>
      )}

      <div style={{...styles.row, marginBottom: 0}}>
        {documenten.length === 0 ? (
          bevestig ? (
            <>
              <button
                type="button"
                style={m.danger}
                onClick={() => void verwijder()}
                disabled={bezig}
              >
                {bezig ? 'Bezig…' : 'Ja, definitief verwijderen'}
              </button>
              <button type="button" style={styles.secondary} onClick={() => setBevestig(false)}>
                Annuleren
              </button>
            </>
          ) : (
            <button type="button" style={m.danger} onClick={() => setBevestig(true)}>
              Verwijderen
            </button>
          )
        ) : (
          <p style={{...styles.intro, margin: 0}}>
            Dit bestand kan niet verwijderd worden zolang het ergens gebruikt wordt. Haal het eerst
            uit de documenten hierboven.
          </p>
        )}
        <button type="button" style={styles.secondary} onClick={onClose}>
          Sluiten
        </button>
      </div>

      {fout && <div style={m.message}>Verwijderen mislukt: {fout}</div>}
    </aside>
  )
}
