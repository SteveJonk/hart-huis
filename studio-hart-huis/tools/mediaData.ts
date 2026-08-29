/**
 * Queries, types en formatteerhulpjes voor het Media-paneel (`MediaTool.tsx`).
 *
 * Staat los van het component zodat de GROQ en de tekstopmaak op zichzelf te
 * lezen en te hergebruiken zijn — het paneel zelf gaat alleen over de UI.
 */

/** De twee documenttypes die Sanity zelf aanmaakt bij een upload. */
export const ASSET_TYPES = ['sanity.imageAsset', 'sanity.fileAsset'] as const

/**
 * De overzichtslijst. Alleen de velden die een kaartje of het zoekveld nodig
 * heeft — `metadata` bevat per afbeelding een base64-lqip en een palet, en dat
 * bij honderden bestanden ophalen is zonde van de bandbreedte. De rest komt bij
 * het openen van één bestand via ASSET_QUERY.
 *
 * `inGebruik` is bewust een ja/nee en geen aantal: `references()` telt een
 * concept en zijn gepubliceerde versie als twee documenten, dus een getal hier
 * zou niet kloppen met de lijst in het detailpaneel (die ontdubbelt).
 */
export const ASSETS_QUERY = `*[_type in $types] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  originalFilename,
  title,
  description,
  altText,
  url,
  size,
  mimeType,
  extension,
  "breedte": metadata.dimensions.width,
  "hoogte": metadata.dimensions.height,
  "inGebruik": count(*[references(^._id)]) > 0
}`

/** Eén bestand met alles erop en eraan, plus waar het gebruikt wordt. */
export const ASSET_QUERY = `{
  "asset": *[_id == $id][0],
  "gebruik": *[references($id)] | order(_type asc) {
    _id,
    _type,
    "titel": coalesce(title, adres, name, naam, label, _id)
  }
}`

export type MediaAsset = {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  originalFilename?: string | null
  title?: string | null
  description?: string | null
  altText?: string | null
  url: string
  size?: number | null
  mimeType?: string | null
  extension?: string | null
  breedte?: number | null
  hoogte?: number | null
  inGebruik: boolean
}

/** Het volledige assetdocument; welke velden erop staan verschilt per upload. */
export type MediaAssetDetail = MediaAsset & {
  assetId?: string | null
  sha1hash?: string | null
  path?: string | null
  creditLine?: string | null
  metadata?: {
    dimensions?: {width?: number; height?: number; aspectRatio?: number}
    hasAlpha?: boolean
    isOpaque?: boolean
    palette?: {dominant?: {background?: string; foreground?: string}}
    exif?: Record<string, unknown>
  } | null
}

export type MediaUsage = {
  _id: string
  _type: string
  titel?: string | null
}

/** Wat een redacteur in de studio als naam van zo'n documenttype kent. */
const TYPE_LABELS: Record<string, string> = {
  page: 'Pagina',
  woning: 'Object',
  review: 'Review',
  faq: 'FAQ',
  form: 'Formulier',
  navigation: 'Navigatie',
  footer: 'Footer',
  objectSettings: 'Objectpagina',
  formGeneralSettings: 'Formulierinstellingen',
}

export function typeLabel(type: string): string {
  return TYPE_LABELS[type] ?? type
}

export function isImage(asset: {_type: string; mimeType?: string | null}): boolean {
  return asset._type === 'sanity.imageAsset' || Boolean(asset.mimeType?.startsWith('image/'))
}

/** Wat `client.assets.upload()` als eerste argument wil. */
export function uploadKind(file: {type: string}): 'image' | 'file' {
  return file.type.startsWith('image/') ? 'image' : 'file'
}

export function formatBytes(bytes?: number | null): string {
  if (typeof bytes !== 'number' || Number.isNaN(bytes)) return '—'
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)} kB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export function formatDate(value?: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'})
}

export function formatDimensions(asset: {breedte?: number | null; hoogte?: number | null}): string {
  if (!asset.breedte || !asset.hoogte) return '—'
  return `${asset.breedte} × ${asset.hoogte} px`
}

/** De naam waaronder een bestand in het overzicht staat. */
export function displayName(asset: {
  originalFilename?: string | null
  title?: string | null
  _id: string
}): string {
  return asset.title || asset.originalFilename || asset._id
}

/**
 * Elk woord uit de zoekopdracht moet ergens in de tekstvelden voorkomen —
 * "tuin jpg" vindt dus `achtertuin.jpg` maar niet `tuin.png`.
 */
export function matchesSearch(asset: MediaAsset, search: string): boolean {
  const terms = search.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return true

  const haystack = [
    asset.originalFilename,
    asset.title,
    asset.description,
    asset.altText,
    asset.extension,
    asset.mimeType,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return terms.every((term) => haystack.includes(term))
}

export type MediaFilter = 'alle' | 'afbeeldingen' | 'bestanden' | 'ongebruikt'

export function matchesFilter(asset: MediaAsset, filter: MediaFilter): boolean {
  if (filter === 'afbeeldingen') return isImage(asset)
  if (filter === 'bestanden') return !isImage(asset)
  if (filter === 'ongebruikt') return !asset.inGebruik
  return true
}

/**
 * `references()` levert een concept en zijn gepubliceerde versie als twee
 * documenten op. Voor de redacteur is dat één document, dus tel ze samen; de
 * gepubliceerde versie wint als beide er staan.
 */
export function dedupeUsage(usage: MediaUsage[]): (MediaUsage & {concept: boolean})[] {
  const byBaseId = new Map<string, MediaUsage & {concept: boolean}>()

  for (const doc of usage) {
    const concept = doc._id.startsWith('drafts.')
    const baseId = concept ? doc._id.slice('drafts.'.length) : doc._id
    const bestaand = byBaseId.get(baseId)
    if (!bestaand || (bestaand.concept && !concept)) {
      byBaseId.set(baseId, {...doc, _id: baseId, concept})
    }
  }

  return [...byBaseId.values()]
}

/** Een miniatuur op maat; Sanity's CDN schaalt de originele upload zelf. */
export function thumbnailUrl(url: string, size = 320): string {
  return `${url}?w=${size}&h=${size}&fit=crop&auto=format`
}
