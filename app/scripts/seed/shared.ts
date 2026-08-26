/**
 * Shared Sanity write helpers for the per-page seed scripts in this folder.
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor or Admin) in app/.env
 * Create one at: https://www.sanity.io/manage/project/s7u8d78o/api#tokens
 *
 * Every upsert is idempotent: assets are reused by filename, reviews by name,
 * FAQs by title, pages by slug, navigation/footer by fixed singleton IDs.
 */
import {createHash, randomBytes} from 'node:crypto'
import {createReadStream, existsSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createClient, type SanityClient} from '@sanity/client'
import type {FormDefinition, FormFieldDefinition} from '../../src/lib/form-fields'
import type {FaqItem} from '../../src/lib/verkoop-content'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, '../../public')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_WRITE_TOKEN
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}
if (!token) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN. Create a token with Editor rights at https://www.sanity.io/manage and add it to app/.env',
  )
}

export const projectRef = `${projectId}/${dataset}`

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2026-07-26',
  token,
  useCdn: false,
})

export function key(seed?: string) {
  if (seed) {
    return createHash('sha1').update(seed).digest('hex').slice(0, 12)
  }
  return randomBytes(6).toString('hex')
}

export function externalLink(href: string) {
  return {_type: 'link' as const, linkType: 'external' as const, href}
}

export function cta(label: string, href: string) {
  return {_type: 'cta' as const, label, linkType: 'external' as const, href}
}

export async function uploadImage(publicPath: string, alt: string) {
  const relative = publicPath.replace(/^\//, '')
  const absolute = path.join(PUBLIC_DIR, relative)
  if (!existsSync(absolute)) {
    throw new Error(`Image not found: ${absolute}`)
  }

  const filename = path.basename(absolute)
  const existingId = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    {filename},
  )

  const assetId =
    existingId ??
    (
      await client.assets.upload('image', createReadStream(absolute), {
        filename,
        contentType: 'image/jpeg',
      })
    )._id

  if (existingId) {
    console.log(`  ↻ image ${filename}`)
  } else {
    console.log(`  ↑ image ${filename}`)
  }

  return {
    _type: 'image' as const,
    asset: {_type: 'reference' as const, _ref: assetId},
    alt,
  }
}

export async function upsertFaq(faq: FaqItem) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "faq" && title == $title][0]._id`,
    {title: faq.question},
  )

  const doc = {
    _type: 'faq' as const,
    title: faq.question,
    answer: faq.answer,
    ...(faq.link ? {link: cta(faq.link.label, faq.link.href)} : {}),
    ...(faq.afterLink ? {afterLink: faq.afterLink} : {}),
  }

  if (existingId) {
    const patch = client.patch(existingId).set({
      title: faq.question,
      answer: faq.answer,
      ...(faq.link ? {link: cta(faq.link.label, faq.link.href)} : {}),
      ...(faq.afterLink ? {afterLink: faq.afterLink} : {}),
    })
    if (!faq.link) patch.unset(['link'])
    if (!faq.afterLink) patch.unset(['afterLink'])
    await patch.commit()
    console.log(`  ↻ faq ${faq.question}`)
    return existingId
  }

  const created = await client.create(doc)
  console.log(`  + faq ${faq.question}`)
  return created._id
}

/** The `seo` fields a seed can set. Left alone when the seed passes nothing. */
export type PageSeo = {
  title?: string
  description?: string
  noIndex?: boolean
}

export async function upsertPage(
  slug: string,
  title: string,
  content: unknown[],
  seo?: PageSeo,
) {
  const existingId = await client.fetch<string | null>(
    `*[_type == "page" && slug.current == $slug][0]._id`,
    {slug},
  )

  const doc = {
    _type: 'page' as const,
    title,
    slug: {_type: 'slug' as const, current: slug},
    content,
    // Only written when the seed asks for it, so the SEO an editor filled in
    // on a page the seed does not care about survives a re-seed.
    ...(seo ? {seo: {_type: 'seo' as const, ...seo}} : {}),
  }

  if (existingId) {
    await client.patch(existingId).set(doc).commit()
    console.log(`✓ page /${slug === 'home' ? '' : slug} updated (${existingId})`)
    return existingId
  }

  const created = await client.create(doc)
  console.log(`✓ page /${slug === 'home' ? '' : slug} created (${created._id})`)
  return created._id
}

/**
 * Writes one `form` document, keyed on its `id` so re-seeding updates the same
 * document and every page reference to it keeps working. Returns the `_id` the
 * blocks should point at.
 *
 * Only the container the mode uses is written: a simple form gets `fields`, a
 * multi-step one `steps`. Writing both would leave the unused one lying around
 * to confuse the next editor.
 */
export async function upsertForm(form: FormDefinition & {title: string}) {
  const mode = form.mode ?? 'simple'

  const fieldDoc = (field: FormFieldDefinition) => ({
    _key: key(field.name),
    _type: 'formField' as const,
    label: field.label,
    name: field.name,
    type: field.type,
    width: field.width ?? 'full',
    isRequired: Boolean(field.isRequired),
    ...(field.placeholder ? {placeholder: field.placeholder} : {}),
    ...(field.defaultValue ? {defaultValue: field.defaultValue} : {}),
    ...(field.helpText ? {helpText: field.helpText} : {}),
    ...(field.selectOptions ? {selectOptions: [...field.selectOptions]} : {}),
    ...(field.radioOptions ? {radioOptions: [...field.radioOptions]} : {}),
    ...(field.checkboxOptions ? {checkboxOptions: [...field.checkboxOptions]} : {}),
  })

  const doc: {_type: 'form'; [field: string]: unknown} = {
    _type: 'form',
    title: form.title,
    id: form.id,
    mode,
    showTitle: Boolean(form.showTitle),
    submitButtonText: form.submitButtonText ?? 'Verstuur',
    successTitle: form.successTitle,
    successBody: form.successBody,
  }

  if (mode === 'steps') {
    doc.nextButtonText = form.nextButtonText ?? 'Verder'
    doc.backButtonText = form.backButtonText ?? 'Terug'
    doc.steps = (form.steps ?? []).map((step, index) => ({
      _key: key(`step-${index}`),
      _type: 'formStep' as const,
      ...(step.title ? {title: step.title} : {}),
      fields: step.fields.map(fieldDoc),
    }))
  } else {
    doc.fields = (form.fields ?? []).map(fieldDoc)
  }

  const existingId = await client.fetch<string | null>(
    `*[_type == "form" && id == $id][0]._id`,
    {id: form.id},
  )

  if (existingId) {
    await client.patch(existingId).set(doc).commit()
    console.log(`  ↻ form ${form.title}`)
    return existingId
  }

  const created = await client.create(doc)
  console.log(`  + form ${form.title}`)
  return created._id
}
