/**
 * Seed Sanity content. Runs every target, or only the ones you name.
 *
 * Usage (from app/):
 *   npm run seed:sanity              # everything
 *   npm run seed:taxatie             # one page
 *   npm run seed:sanity -- taxatie nav
 *
 * Each target is idempotent and only touches its own documents, so seeding
 * one page leaves the others alone. Page content is defined per page in
 * scripts/seed/<page>.ts.
 */
import {seedAanbod} from './seed/aanbod'
import {seedContact} from './seed/contact'
import {seedHome} from './seed/home'
import {seedNavigation} from './seed/navigation'
import {seedObjecten} from './seed/objecten'
import {seedOverOns} from './seed/over-ons'
import {projectRef} from './seed/shared'
import {seedTaxatie} from './seed/taxatie'
import {seedVerkoop} from './seed/verkoop'

const TARGETS = {
  home: seedHome,
  verkoop: seedVerkoop,
  'over-ons': seedOverOns,
  taxatie: seedTaxatie,
  contact: seedContact,
  objecten: seedObjecten,
  aanbod: seedAanbod,
  nav: seedNavigation,
} as const

type TargetName = keyof typeof TARGETS

function parseTargets(args: string[]): TargetName[] {
  if (args.length === 0) return Object.keys(TARGETS) as TargetName[]

  const unknown = args.filter((arg) => !(arg in TARGETS))
  if (unknown.length > 0) {
    throw new Error(
      `Unknown target(s): ${unknown.join(', ')}. Available: ${Object.keys(TARGETS).join(', ')}`,
    )
  }
  return args as TargetName[]
}

async function main() {
  const targets = parseTargets(process.argv.slice(2))
  console.log(`Seeding Sanity project ${projectRef} — ${targets.join(', ')}\n`)

  for (const target of targets) {
    await TARGETS[target]()
    console.log('')
  }

  console.log('Done. Refresh the site to see the changes.')
}

main().catch((error) => {
  console.error('\nSeed failed:', error.message || error)
  process.exit(1)
})
