/**
 * Seeds the navigation and footer singletons.
 *
 * Menu items point at pages by slug, so run this after seeding a new page —
 * until then the link falls back to a plain path.
 */
import {client, key} from './shared'

function navLinkExternal(label: string, href: string) {
  return {
    _key: key(`${label}:${href}`),
    label,
    linkType: 'external' as const,
    href,
  }
}

function navLinkInternal(label: string, pageId: string) {
  return {
    _key: key(`internal:${label}:${pageId}`),
    label,
    linkType: 'internal' as const,
    internalLink: {_type: 'reference' as const, _ref: pageId},
  }
}

async function pageIdBySlug(slug: string) {
  return client.fetch<string | null>(
    `*[_type == "page" && slug.current == $slug][0]._id`,
    {slug},
  )
}

/** Link to a seeded page by slug, falling back to a plain path if it is missing. */
async function pageLink(label: string, slug: string) {
  const id = await pageIdBySlug(slug)
  return id ? navLinkInternal(label, id) : navLinkExternal(label, `/${slug}`)
}

async function upsertNavigation() {
  const aanbodLink = await pageLink('Actueel aanbod', 'aanbod')
  const verkoopLink = await pageLink('Verkoop', 'verkoop')
  const taxatieLink = await pageLink('Taxatie', 'taxatie')
  const overOnsLink = await pageLink('Over ons', 'over-ons')
  const contactLink = await pageLink('Contact', 'contact')

  const doc = {
    _id: 'navigation',
    _type: 'navigation' as const,
    navLeft: [
      verkoopLink,
      navLinkExternal('Aankoop', '#'),
      taxatieLink,
      navLinkExternal('NVM', '#'),
    ],
    navRight: [
      aanbodLink,
      navLinkExternal('Beoordelingen', '#'),
      overOnsLink,
      contactLink,
    ],
  }

  await client.createOrReplace(doc)
  console.log('✓ navigation singleton upserted')
}

async function upsertFooter() {
  const aanbodLink = await pageLink('Actueel aanbod', 'aanbod')
  const verkoopLink = await pageLink('Verkoop', 'verkoop')
  const taxatieLink = await pageLink('Taxatie', 'taxatie')
  const overOnsLink = await pageLink('Over ons', 'over-ons')
  const contactLink = await pageLink('Contact', 'contact')

  const doc = {
    _id: 'footer',
    _type: 'footer' as const,
    linkGroups: [
      {
        _key: key('footer-diensten'),
        title: 'Diensten',
        links: [
          verkoopLink,
          navLinkExternal('Aankoop', '#'),
          taxatieLink,
          navLinkExternal('NVM', '#'),
        ],
      },
      {
        _key: key('footer-snel-naar'),
        title: 'Snel naar',
        links: [
          aanbodLink,
          navLinkExternal('Beoordelingen', '#'),
          overOnsLink,
          contactLink,
        ],
      },
    ],
    socialLinks: [],
    copyright: '© 2026 Hart & Huis Makelaardij — Algemene voorwaarden · Privacy',
  }

  await client.createOrReplace(doc)
  console.log('✓ footer singleton upserted')
}

export async function seedNavigation() {
  console.log('Navigation & footer')
  await upsertNavigation()
  await upsertFooter()
}
