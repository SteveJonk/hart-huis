/**
 * One-off: converts `contactForm` documents (from the removed
 * @multidots/sanity-plugin-contact-form) into the unified `form` type.
 *
 *   npm run migrate:forms -- --dry-run   # show what would change
 *   npm run migrate:forms
 *
 * `_type` is immutable and Sanity treats a delete+create of the same `_id`
 * inside one transaction as modifying it, so the id cannot be kept. Instead
 * each form is recreated under a new id and every reference to it is
 * repointed before the old document is deleted — so no page ever points at a
 * document that is not there.
 *
 * Safe to re-run: a form is matched on its `id` field, so a second run updates
 * the document the first run made instead of adding another one.
 *
 * Field widths did not exist in the plugin's schema; the layout came from a
 * guess in the front end. That guess is applied once here and written down, so
 * the rendered layout stays the same while becoming editable.
 */
import {writeFileSync} from 'node:fs'
import path from 'node:path'
import {
  isDraft,
  publishedId,
  repoint,
  toFormDoc,
  type SanityDocument,
} from './form-migration'
import {client} from './seed/shared'

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  // Whole documents, drafts included — a draft carries unpublished edits we
  // must not throw away.
  const forms = await client.fetch<SanityDocument[]>(`*[_type == "contactForm"]`)

  if (forms.length === 0) {
    console.log('Geen contactForm-documenten gevonden — niets te migreren.')
    return
  }

  const published = forms.filter((form) => !isDraft(form._id))
  const drafts = forms.filter((form) => isDraft(form._id))

  console.log(
    `${forms.length} contactForm-document(en): ${published.length} gepubliceerd, ${drafts.length} concept.\n`,
  )

  if (!dryRun) {
    const backup = path.join(process.cwd(), `form-migration-backup-${Date.now()}.json`)
    writeFileSync(backup, JSON.stringify(forms, null, 2))
    console.log(`Back-up van de originelen: ${backup}\n`)
  }

  // Old published id -> new published id, used to repoint every reference.
  const mapping = new Map<string, string>()
  const writes: SanityDocument[] = []

  for (const form of published) {
    const key = (form.id as string) || publishedId(form._id)

    // If the seeds already created a form with this id, migrate onto that one
    // instead of adding a second document with the same id.
    const existing = await client.fetch<string | null>(
      `*[_type == "form" && id == $key][0]._id`,
      {key},
    )
    const newId = existing || `form-${key}`

    mapping.set(form._id, newId)

    const migrated = toFormDoc(form, newId)
    writes.push(migrated)

    const draft = drafts.find((item) => publishedId(item._id) === form._id)
    if (draft) writes.push(toFormDoc(draft, `drafts.${newId}`))

    console.log(`${dryRun ? '·' : '→'} ${migrated.title}`)
    console.log(`    ${form._id}  ->  ${newId}${existing ? ' (bestaand form-document)' : ''}`)
    if (draft) console.log(`    concept meeverhuisd: ${draft._id} -> drafts.${newId}`)
    for (const field of migrated.fields) {
      console.log(`    - ${field.name} (${field.type}, ${field.width})`)
    }
  }

  const orphanDrafts = drafts.filter((draft) => !mapping.has(publishedId(draft._id)))
  for (const draft of orphanDrafts) {
    console.log(`! concept zonder gepubliceerde versie, overgeslagen: ${draft._id}`)
  }

  // Documents pointing at a form: pages, and their drafts.
  const referencing = await client.fetch<SanityDocument[]>(
    `*[references($ids)]`,
    {ids: [...mapping.keys()]},
  )
  console.log(`\n${referencing.length} document(en) verwijzen naar een formulier.`)
  for (const document of referencing) {
    console.log(`    ${document._type} ${document._id}`)
  }

  if (dryRun) {
    console.log('\nDry run — er is niets gewijzigd.')
    return
  }

  // Order matters: create the new forms, repoint everything at them, and only
  // then remove the originals. At no point does a page reference a gap.
  const transaction = client.transaction()
  for (const document of writes) transaction.createOrReplace(document)
  for (const document of referencing) {
    transaction.createOrReplace(repoint(document, mapping) as SanityDocument)
  }
  await transaction.commit()
  console.log('\n✓ formulieren aangemaakt en verwijzingen omgezet')

  const cleanup = client.transaction()
  for (const form of [...published, ...drafts]) {
    if (mapping.has(publishedId(form._id))) cleanup.delete(form._id)
  }
  await cleanup.commit()
  console.log('✓ oude contactForm-documenten verwijderd')

  console.log(
    [
      '\nKlaar. Loop daarna nog even na:',
      '  1. vul "Sender address" in onder Form settings (Mailjet accepteert alleen een gevalideerde afzender)',
      '  2. de knoptekst en de bevestiging per formulier staan nu op het formulier zelf —',
      '     `npm run seed:contact` zet de echte teksten terug',
    ].join('\n'),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
