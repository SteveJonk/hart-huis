/**
 * Pure half of `migrate-forms.ts`: turning a plugin `contactForm` into a
 * `form`, and repointing references at the new id. No Sanity client here, so
 * `npm run check:form` can exercise it.
 */
export type SanityDocument = Record<string, unknown> & {_id: string; _type: string}

export type PluginField = {
  _key?: string
  label?: string
  name?: string
  type?: string
  isRequired?: boolean
  showPlaceholder?: boolean
  placeholder?: string
  helpText?: string
  selectOptions?: string[]
  radioOptions?: string[]
  checkboxOptions?: string[]
}

export const isDraft = (id: string) => id.startsWith('drafts.')
export const publishedId = (id: string) => id.replace(/^drafts\./, '')

/** The types the old front end paired two-per-row. */
const NARROW = new Set(['text', 'email', 'tel', 'url', 'select'])

/**
 * Reproduces the old guess as explicit widths: a narrow field directly after
 * another narrow one shared its row, so both are half width.
 */
export function withWidths(fields: PluginField[]) {
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

export function toFormDoc(source: SanityDocument, newId: string) {
  const sourceFields = (source.fields as PluginField[] | undefined) ?? []

  const fields = withWidths(sourceFields).map((field, index) => ({
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
    _id: newId,
    _type: 'form' as const,
    title: (source.title as string) || 'Formulier',
    id: (source.id as string) || publishedId(source._id),
    mode: 'simple' as const,
    showTitle: Boolean(source.showtitle),
    // The plugin had no per-form submit label or confirmation copy; the seeds
    // set the real text, these are only so the document validates meanwhile.
    submitButtonText: (source.submitButtonText as string) || 'Verstuur',
    successTitle: 'Bedankt voor je bericht',
    successBody: 'We nemen zo snel mogelijk contact met je op.',
    fields,
  }
}

/** Rewrites every `_ref` that points at a migrated form, at any depth. */
export function repoint(value: unknown, mapping: Map<string, string>): unknown {
  if (Array.isArray(value)) return value.map((item) => repoint(item, mapping))
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([field, item]) => {
        if (field === '_ref' && typeof item === 'string' && mapping.has(item)) {
          return [field, mapping.get(item)!]
        }
        return [field, repoint(item, mapping)]
      }),
    )
  }
  return value
}

