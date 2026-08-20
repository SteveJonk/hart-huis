/**
 * One-off: converts `contactForm` documents (from the removed
 * @multidots/sanity-plugin-contact-form) into the unified `form` type.
 *
 *   npm run migrate:forms -- --dry-run   # show what would change
 *   npm run migrate:forms
 *
 * Each document is replaced **in place**, keeping its `_id`, so every page that
 * references a form keeps working. `_type` cannot be patched, so this deletes
 * and recreates in a single transaction — atomic, and the id never frees up.
 *
 * Field widths did not exist in the plugin's schema; the layout came from a
 * guess in the front end. That guess is applied once here and written down, so
 * the rendered layout stays the same while becoming editable.
 */
import {client} from './seed/shared'

type PluginField = {
  _key?: string
  label?: string
  name?: string
  type?: string
  isRequired?: boolean
  showPlaceholder?: boolean
  placeholder?: string
  helpText?: string
  note?: string
  selectOptions?: string[]
  radioOptions?: string[]
  checkboxOptions?: string[]
}

type PluginForm = {
  _id: string
  title?: string
  showtitle?: boolean
  id?: string
  fields?: PluginField[]
}

/** The types the old front end paired two-per-row. */
const NARROW = new Set(['text', 'email', 'tel', 'url', 'select'])

/**
 * Reproduces the old guess as explicit widths: a narrow field directly after
 * another narrow one shared its row, so both are half width.
 */
function withWidths(fields: PluginField[]) {
  const widths: ('full' | 'half')[] = fields.map(() => 'full')

  fields.forEach((field, index) => {
    if (widths[index] === 'half') return
    const next = fields[index + 1]
    if (NARROW.has(field.type ?? '') && next && NARROW.has(next.type ?? '')) {
      widths[index] = 'half'
      widths[index + 1] = 'half'
    }
  })

  return fields.map((field, index) => ({...field, width: widths[index]}))
}

function toFormDoc(form: PluginForm) {
  const fields = withWidths(form.fields ?? []).map((field, index) => ({
    _key: field._key || `field-${index}`,
    _type: 'formField' as const,
    label: field.label ?? field.name ?? `Veld ${index + 1}`,
    name: field.name ?? `veld${index + 1}`,
    type: field.type ?? 'text',
    width: field.width,
    isRequired: Boolean(field.isRequired),
    // The plugin could use the label as the placeholder; write that out so the
    // rendered form keeps the same placeholders without the extra flag.
    ...(field.showPlaceholder && field.label
      ? {placeholder: field.label}
      : field.placeholder
        ? {placeholder: field.placeholder}
        : {}),
    ...(field.helpText ? {helpText: field.helpText} : {}),
    ...(field.selectOptions?.length ? {selectOptions: field.selectOptions} : {}),
    ...(field.radioOptions?.length ? {radioOptions: field.radioOptions} : {}),
    ...(field.checkboxOptions?.length ? {checkboxOptions: field.checkboxOptions} : {}),
  }))

  return {
    _id: form._id,
    _type: 'form' as const,
    title: form.title || 'Formulier',
    id: form.id || form._id,
    mode: 'simple' as const,
    showTitle: Boolean(form.showtitle),
    // The plugin had no per-form submit label or confirmation copy; the seeds
    // set the real text, these are only so the document validates meanwhile.
    submitButtonText: 'Verstuur',
    successTitle: 'Bedankt voor je bericht',
    successBody: 'We nemen zo snel mogelijk contact met je op.',
    fields,
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  const forms = await client.fetch<PluginForm[]>(
    `*[_type == "contactForm"]{_id, title, showtitle, id, fields}`,
  )

  if (forms.length === 0) {
    console.log('Geen contactForm-documenten gevonden — niets te migreren.')
    return
  }

  console.log(`${forms.length} contactForm-document(en) gevonden.\n`)

  for (const form of forms) {
    const doc = toFormDoc(form)
    const referencedBy = await client.fetch<number>(
      `count(*[references($id)])`,
      {id: form._id},
    )

    console.log(`${dryRun ? '·' : '→'} ${doc.title} (${doc._id})`)
    console.log(`    id: ${doc.id} · ${doc.fields.length} velden · ${referencedBy} verwijzing(en)`)
    for (const field of doc.fields) {
      console.log(`    - ${field.name} (${field.type}, ${field.width})`)
    }

    if (dryRun) continue

    // Delete + create in one transaction: the _id survives, so references hold.
    await client.transaction().delete(form._id).create(doc).commit()
    console.log('    ✓ omgezet naar type "form"')
  }

  if (dryRun) {
    console.log('\nDry run — er is niets gewijzigd.')
    return
  }

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
