# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-08-12

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** hart-huis
- **Description:** Sanity-powered website for **Hart en Huis makelaars**.
- **Design pipeline:** each page starts as a standalone HTML file in `app/example-designs/`. Sections are abstracted into `src/components/blocks/*.tsx` (Tailwind), copy lands in `src/lib/<page>-content.ts` as component DEFAULTS, a matching Sanity object type goes in `studio-hart-huis/schemaTypes/blocks/`, registered in `schemaTypes/index.ts` + `pageBuilderType.ts`, mapped in `src/components/PageBuilder.tsx`, and seeded from its own `app/scripts/seed/<page>.ts` (registered as a target in `app/scripts/seed.ts`; run one page with `npm run seed:<page>`). Pages render through `src/app/[slug]/page.tsx`; no per-page route files.
- **Implemented designs get a `!` prefix** in `app/example-designs/` (`!home.html`, `!verkoop.html`, `!over-ons.html`, `!taxatie.html`). Unprefixed files are still to do.
- **Service pages share one template.** Diff a new design's `<style>` block against `!verkoop.html` first — the "vervolgpagina" CSS (pagehero, factbar, krijgt, steps, qband, faq, regioblk, crosslinks, ctaband) is identical everywhere, so usually only the page-specific section at the bottom needs a new block.
- **Contact form runs on `@multidots/sanity-plugin-contact-form`.** Fields are authored in the studio under "Forms" (`contactForm` docs); the `contactFormSection` block references one. The frontend renders the fields with its own Tailwind markup — the plugin's own React component is not used. Mail goes out via `app/src/app/api/submit-form/route.ts`.
- **reCAPTCHA v2 (checkbox) is wired into the contact form.** It only appears once `formGeneralSettings` has `recaptchaEnabled` + a site key; the public site key rides along in PAGE_QUERY on the `contactFormSection` block, the secret is verified server-side in the submit route (env `RECAPTCHA_SECRET_KEY` wins over the studio value). Google's test pair (site `6LeIxAcT…`, secret `6LeIxAcT…`) always passes — handy for local checks, never in production.
- **Never take mail settings from the client.** The plugin's README posts SMTP credentials from the browser; our route fetches `formGeneralSettings` server-side instead, and prefers `SMTP_USER` / `SMTP_PASSWORD` / `CONTACT_ADMIN_EMAIL` env vars because a Sanity dataset is world-readable.
- **Design images live inside the HTML** as base64 data URIs — extract them to `app/public/images/<page>/` before seeding (`uploadImage` reads from `app/public`).
- `src/lib/cn.ts` is a plain join, **not** tailwind-merge. Conflicting utility classes passed via `className` do not override — add an explicit prop to the ui component instead (e.g. `Eyebrow` has `light` / `sand`), or nest a child div.
- **Page SEO:** the `seo` object (title, description, ogImage, noIndex) on the `page` document is selected in `PAGE_QUERY` and mapped to Next metadata by `pageMetadata()` in `app/src/sanity/metadata.ts`, called from `generateMetadata` in both `src/app/page.tsx` (home) and `src/app/[slug]/page.tsx`. Home strips the document title so an empty `seo.title` keeps the layout default instead of showing "Home".
- Topbar is transparent over photo heroes. Pages that open on a light background render `data-solid-header` on the first section; `useStickyTopbar` looks for it and stays solid from the top.

- **Objects (houses for sale) are the `woning` document type**, titled "Object" in the studio — `object` is a reserved Sanity type name and the schema fails to build if you use it. Seeded by `app/scripts/seed/objecten.ts` (`npm run seed:objecten`).
- **The `woning` schema mirrors the Realworks feed.** Fields the site filters/sorts on are flat and typed (status, plaats, prijs, woonoppervlak, kamers, aangebodenSinds); the rest of the kenmerkentabel is `kenmerkGroepen[] -> {titel, rijen[] -> {label, waarde[]}}` so the import can map any feed enum without a schema change. Almost nothing is `required()` — the feed returns null for most fields (woonoppervlakte, inhoud, perceel included). `realworksId` is the upsert key for the future import endpoint.
- **`aanbiedingsTekst` is not real HTML.** Realworks delivers one long string with `<br>` line breaks, `**vet**` for emphasis and `- ` prefixed lines as bullets, and often inlines the English version behind a `**English below**` marker even though `aanbiedingstekstEngels` exists separately. A renderer must handle those three, not a full HTML parser.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-08-13] Next 16 metadata merging is by **key presence**, not by value: returning `{ title: undefined }` from `generateMetadata` wipes the root layout's title/description instead of inheriting them. Build the Metadata object with conditional spreads (`...(x ? { x } : {})`) so unset CMS fields are simply absent.

## Decision Log

- [2026-08-13] `woning` keeps a hybrid shape (typed core fields + free-form `kenmerkGroepen`) instead of modelling all ~40 Realworks enum arrays as fields. The typed ones are exactly what aanbod.html filters and object.html's specs bar need; everything else is display-only table rows, so mapping enums to labels belongs in the import, not in the schema.
- [2026-08-13] Seed objects use `createOrReplace` with `_id: woning-<slug>` instead of the fetch-then-patch style of the page seeds — re-running is idempotent without a lookup query, and mock docs need no id stability beyond the slug.

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-08-12] Over ons got 6 new blocks instead of stretching existing ones. `Benefits` (text + icon list + photo) was the closest fit for the "buiten het werk" and "waar ik in geloof" sections, but both differ in layout (card grid, CTA button, other aspect ratio); bending Benefits would have added optional-field branching to a block used on Verkoop. New blocks: `pageOpener`, `duoPhotos`, `timeline`, `valueCards`, `mediaText`, `assurances`. Only `ctaBand` was reused as-is.
- [2026-08-13] Contact got its own opener (`splitHero`, copy beside a photo) instead of `pageHero`, because the design deliberately breaks the photo-hero template. It reuses only `crossLinks`.
- [2026-08-13] Taxatie needed exactly one new block (`compareCards`); the other 9 sections reuse verkoop's blocks with different props. Benefits' icon union was widened (house/renovate/scale) rather than forking the block.
- [2026-08-12] The design's `.duo__stempel` sits inside an `overflow:hidden` container at `right:-40px`, so it is clipped in the HTML. The React version puts the stamp outside the clipping box (same as `Intro`), showing the full circle.
