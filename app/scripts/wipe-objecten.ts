/**
 * Gooit álle `woning`-documenten weg plus de foto's en brochures die eraan
 * hangen. Bedoeld om schoon opnieuw te kunnen importeren.
 *
 *   npm run wipe:objecten          # laat zien wat er weg zou gaan, verandert niets
 *   npm run wipe:objecten -- --yes # doet het echt
 *
 * Volgorde is niet vrijblijvend: Sanity weigert een asset te verwijderen zolang
 * er nog een document naar verwijst. Eerst de woningen, dan pas de bestanden.
 *
 * Assets die óók ergens anders gebruikt worden — de mock-objecten uit
 * `seed:objecten` delen hun foto's met de home- en over-ons-pagina — laat
 * Sanity staan. Die worden hier gemeld en overgeslagen, niet geforceerd.
 */
import {client, projectRef} from './seed/shared'

const confirmed = process.argv.includes('--yes')

type Woning = {
  _id: string
  adres?: string
  plaats?: string
  fotoAssets?: (string | null)[]
  brochureAsset?: string | null
}

async function main() {
  const woningen = await client.fetch<Woning[]>(`*[_type == "woning"]{
    _id,
    adres,
    plaats,
    "fotoAssets": fotos[].asset._ref,
    "brochureAsset": brochure.asset._ref
  }`)

  if (woningen.length === 0) {
    console.log(`Geen objecten gevonden in ${projectRef}. Niets te doen.`)
    return
  }

  const assetIds = [
    ...new Set(
      woningen.flatMap((woning) => [...(woning.fotoAssets ?? []), woning.brochureAsset]),
    ),
  ].filter((id): id is string => Boolean(id))

  console.log(`Project: ${projectRef}`)
  console.log(`\n${woningen.length} object${woningen.length === 1 ? '' : 'en'}:`)
  for (const woning of woningen) {
    const naam = [woning.adres, woning.plaats].filter(Boolean).join(', ') || woning._id
    console.log(`  - ${naam} (${woning._id}, ${woning.fotoAssets?.length ?? 0} foto's)`)
  }
  console.log(`\n${assetIds.length} bestand(en) die daaraan hangen.`)

  if (!confirmed) {
    console.log('\nDroogloop — er is niets verwijderd. Draai opnieuw met --yes om het echt te doen.')
    return
  }

  // Ook het concept, als de redactie er een openstaan heeft.
  const documentIds = woningen.flatMap((woning) =>
    woning._id.startsWith('drafts.') ? [woning._id] : [woning._id, `drafts.${woning._id}`],
  )

  const transaction = client.transaction()
  for (const id of documentIds) transaction.delete(id)
  await transaction.commit({visibility: 'async'})
  console.log(`\n✓ ${woningen.length} object(en) verwijderd`)

  let verwijderd = 0
  let overgeslagen = 0
  for (const id of assetIds) {
    try {
      await client.delete(id)
      verwijderd += 1
    } catch (error) {
      // Vrijwel altijd: het bestand wordt elders nog gebruikt.
      overgeslagen += 1
      console.log(`  · ${id} overgeslagen — ${error instanceof Error ? error.message : error}`)
    }
  }
  console.log(`✓ ${verwijderd} bestand(en) verwijderd, ${overgeslagen} overgeslagen`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
