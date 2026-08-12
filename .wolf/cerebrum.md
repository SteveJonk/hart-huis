# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-08-12

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** hart-huis
- **Description:** Sanity-powered website for **Hart en Huis makelaars**.
- **Design pipeline:** each page starts as a standalone HTML file in `app/example-designs/`. Sections are abstracted into `src/components/blocks/*.tsx` (Tailwind), copy lands in `src/lib/<page>-content.ts` as component DEFAULTS, a matching Sanity object type goes in `studio-hart-huis/schemaTypes/blocks/`, registered in `schemaTypes/index.ts` + `pageBuilderType.ts`, mapped in `src/components/PageBuilder.tsx`, and seeded from `app/scripts/seed-sanity.ts`. Pages render through `src/app/[slug]/page.tsx`; no per-page route files.
- **Design images live inside the HTML** as base64 data URIs — extract them to `app/public/images/<page>/` before seeding (`uploadImage` reads from `app/public`).
- `src/lib/cn.ts` is a plain join, **not** tailwind-merge. Conflicting utility classes passed via `className` do not override — add an explicit prop to the ui component instead (e.g. `Eyebrow` has `light` / `sand`), or nest a child div.
- Topbar is transparent over photo heroes. Pages that open on a light background render `data-solid-header` on the first section; `useStickyTopbar` looks for it and stays solid from the top.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-08-12] Over ons got 6 new blocks instead of stretching existing ones. `Benefits` (text + icon list + photo) was the closest fit for the "buiten het werk" and "waar ik in geloof" sections, but both differ in layout (card grid, CTA button, other aspect ratio); bending Benefits would have added optional-field branching to a block used on Verkoop. New blocks: `pageOpener`, `duoPhotos`, `timeline`, `valueCards`, `mediaText`, `assurances`. Only `ctaBand` was reused as-is.
- [2026-08-12] The design's `.duo__stempel` sits inside an `overflow:hidden` container at `right:-40px`, so it is clipped in the HTML. The React version puts the stamp outside the clipping box (same as `Intro`), showing the full circle.
