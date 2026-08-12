# STATUS — hart-huis

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-08-12

---

## ✅ Done

<!-- Move items here from "🚀 Next phase" when finished. Group by area. -->

**Pages implemented from `app/example-designs/`**
- `home.html` → home page (hero, intro, services, story, reviews, listings, ctaBand)
- `verkoop.html` → /verkoop (pageHero, factBar, benefits, steps, quoteBand, faqs, regionBlock, crossLinks, ctaBand)
- `over-ons.html` → /over-ons (pageOpener, duoPhotos, timeline, valueCards, mediaText, assurances, ctaBand)
  - images extracted to `app/public/images/over-ons/`
  - 6 new blocks + 6 new Sanity object types + PageBuilder cases + seed builder
  - `useStickyTopbar` now honours `data-solid-header` so the nav stays readable over the light opener
- `taxatie.html` → /taxatie (pageHero, factBar, benefits, compareCards, steps, quoteBand, faqs, regionBlock, crossLinks, ctaBand)
  - images extracted to `app/public/images/taxatie/`
  - only `compareCards` is new; Benefits gained house/renovate/scale icons
  - **not yet run:** `cd app && npm run seed:sanity` (needs SANITY_API_WRITE_TOKEN) — /over-ons and /taxatie do not exist in Sanity until then

---

## 🚀 Next phase

**Goal:** Implement the remaining designs (`aanbod.html`, `beoordelingen.html`, `contact.html`, `object.html`) the same way.

### Acceptance criteria
1. Run `npm run seed:sanity` so /over-ons exists in Sanity.
2. Each remaining design gets blocks + schema + seed, reusing existing blocks where they fit.

### Files to create / edit
| Type | File | Content |
|---|---|---|
| new | `src/components/blocks/*.tsx` | per-design sections not yet covered |
| new | `studio-hart-huis/schemaTypes/blocks/*.ts` | matching object types |
| new | `app/scripts/seed/<page>.ts` | one seed module per design, registered in `scripts/seed.ts` |

### Closed decisions
- Copy lives in `src/lib/<page>-content.ts` and doubles as component DEFAULTS.
- Internal nav/footer links resolve via `pageLink(label, slug)` in `scripts/seed/navigation.ts`; run `npm run seed:nav` after adding a page.
- Seeding is per target: `npm run seed:<home|verkoop|over-ons|taxatie|nav>`, or `npm run seed:sanity` for all.

### Open decisions
- `aanbod.html` / `object.html` probably need a listings-detail block; check the CSS diff against `!verkoop.html` first.

---

## 📁 Active architecture

- **Stack:** _<frameworks, libraries, runtime>_
- **Key tables / modules:** _<list>_
- **Patterns:** _<conventions enforced project-wide>_

---

## ⚠️ External blockers (don't block coding)

- _<env vars, secrets, external accounts, manual steps>_

---

## 🔧 Useful commands

```bash
# add the most-used commands here so the next session has them ready
```

---

## 📚 References (read IF needed)

- `.wolf/cerebrum.md` — User Preferences + Do-Not-Repeat + Decision Log
- `.wolf/anatomy.md` — token-efficient file index
- `.wolf/buglog.json` — known bugs + fixes
