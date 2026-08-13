# Memory

> Chronological action log. Hooks and AI append to this file automatically.
> Old sessions are consolidated by the daemon weekly.

## Session: 2026-08-04 11:03

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-04 11:03

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-04 11:04

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-04 11:04

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-04 11:05

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-12 16:32

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-12 20:35

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-12 20:36

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-12 20:45

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-12 over-ons

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| — | Audited over-ons.html vs existing blocks | example-designs/over-ons.html | 1 of 7 sections reusable (ctaBand) | ~35k |
| — | Extracted 5 embedded jpegs from the design | public/images/over-ons/*.jpg | portret, kantoor, haarlem-straat, spaarne, cta | ~1k |
| — | Added copy constants | src/lib/over-ons-content.ts | new | ~3k |
| — | Built 6 blocks | blocks/{PageOpener,DuoPhotos,Timeline,ValueCards,MediaText,Assurances}.tsx | tailwind migration of opener/duo/verhaal/geloof/buiten/rekenen | ~8k |
| — | Solid topbar on light-opening pages | hooks/useStickyTopbar.ts, PageOpener.tsx | data-solid-header marker | ~1k |
| — | Wired blocks | components/PageBuilder.tsx | 6 new cases | ~2k |
| — | Sanity schemas | studio-hart-huis/schemaTypes/blocks/*.ts + index + pageBuilderType | 6 new object types | ~3k |
| — | Seed over-ons page | app/scripts/seed-sanity.ts | upsertPage('over-ons'), nav/footer link now internal | ~3k |
| — | Verified render on temp route, then removed it | — | all 7 sections OK desktop + mobile | ~12k |

## Session: 2026-08-12 taxatie

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| — | Diffed taxatie.html CSS against verkoop.html | example-designs/ | only `.vergelijk` is new; rest is the shared vervolgpagina-template | ~4k |
| — | Extracted 9 embedded jpegs | public/images/taxatie/*.jpg | pagehero, wanneer, step-1..5, quote, cta | ~1k |
| — | Added copy constants | src/lib/taxatie-content.ts | new | ~4k |
| — | Built CompareCards block | blocks/CompareCards.tsx + compareCardsType.ts | light/ink option cards with check-cross list | ~4k |
| — | Extended Benefits icons | blocks/Benefits.tsx, lib/verkoop-content.ts, benefitsType.ts | added house / renovate / scale | ~1k |
| — | Query: expand cards[].cta | src/sanity/queries.ts | internal links inside compareCards resolve | ~0.3k |
| — | Seed taxatie page | scripts/seed-sanity.ts | taxatie FAQs + buildTaxatieContent + nav/footer Taxatie internal | ~3k |
| — | Verified render on temp route, then removed it | — | 10 blocks OK desktop + mobile | ~8k |
| — | Marked design done | example-designs/!taxatie.html | follows the `!` prefix convention | ~0.1k |
| — | Split the seed script per page | scripts/seed.ts + scripts/seed/{shared,home,verkoop,over-ons,taxatie,navigation}.ts | per-target npm scripts, old seed-sanity.ts removed | ~6k |

## Session: 2026-08-13 09:23

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-13 09:23

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 09:40 | Rendered Sanity `seo` object in Next metadata: added `seo` to PAGE_QUERY, new `pageMetadata()` mapper, wired into `/` + `/[slug]` | app/src/sanity/queries.ts, app/src/sanity/metadata.ts, app/src/app/page.tsx, app/src/app/[slug]/page.tsx | done — verified live head tags on /, /verkoop, /taxatie + assert check on ogImage/noIndex branches | ~14k |

## Session: 2026-08-13 09:46

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
