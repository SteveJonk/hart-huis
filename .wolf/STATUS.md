# STATUS — hart-huis

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-08-13

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
- `contact.html` → /contact (splitHero, contactWays, personBlock, contactFormSection, routeBlock, crossLinks)
  - images in `app/public/images/contact/`; form runs on the Sanity contact-form plugin
  - `POST /api/submit-form` mails submissions via nodemailer
  - reCAPTCHA v2 checkbox is wired: enable it + set the site key under "Form settings"; put the secret in `RECAPTCHA_SECRET_KEY`
  - **before it can send mail:** fill "Form settings" in the studio, or set SMTP_USER / SMTP_PASSWORD / CONTACT_ADMIN_EMAIL in `app/.env`
  - **not yet run:** `cd app && npm run seed:sanity` (needs SANITY_API_WRITE_TOKEN) — /over-ons and /taxatie do not exist in Sanity until then

**SEO**
- `seo` object type on the `page` document is now rendered: `PAGE_QUERY` selects it, `app/src/sanity/metadata.ts` maps it to Next Metadata, `generateMetadata` added to `/` and `/[slug]`
- ogImage → og:image 1200×630 + `twitter:card=summary_large_image`; noIndex → `robots: {index:false, follow:false}`
- editors have not filled any `seo` fields yet, so pages currently fall back to title + layout description

**Objecten (woningen te koop)**
- `woning` document type = "Object" in the studio (`object` is a reserved Sanity name), listed under Pages in `structure.ts`
- shape follows the Realworks feed: typed core fields + free-form `kenmerkGroepen` table, nearly all optional, `realworksId` as import key
- `aanbiedingsTekst` / `aanbiedingsTekstEngels` hold the raw feed format: `<br>` breaks, `**vet**`, `- ` bullets, often with `**English below**` inline
- 6 mock objects seeded with `npm run seed:objecten` (photos reused from the Sanity library, no uploads)
- **`object.html` → `/aanbod/[slug]`** — gallery + lightbox, kop/specs, collapsible omschrijving, kenmerkentabel, sticky zijkaart, vergelijkbare woningen, ctaBand
  - new sections in `src/components/object/`; reuses `ListingCard` (now `tone` instead of `sold`) and `CtaBand`
  - Realworks text renders through `src/lib/aanbiedingstekst.ts` (`npm run check:tekst` covers the parser)
  - `imageSrc`/`toImage` moved from `PageBuilder.tsx` to `src/sanity/image.ts`
- **`aanbod.html` → `/aanbod`** — a normal `page` document (blocks: `aanbodHeader`, `objectGrid`, `ctaBand`), seeded with `npm run seed:aanbod`
  - `objectGrid` is a client block: PAGE_QUERY hands it every `woning`, the browser filters (status/plaats/prijs), sorts and pages (9 per keer)
  - nav + footer "Actueel aanbod" now resolve to the page (`npm run seed:nav` is done)


**`beoordelingen.html` → /beoordelingen**
- 4 nieuwe blocks: `beoordelingenHero` (scorekaart + cijferverdeling), `uitgelichteReview` (referentie naar één review), `reviewGrid` (client: filter Alle/Verkopers/Kopers + 9 per keer), `werkwijze` (donker, genummerd); `ctaBand` hergebruikt
- images in `app/public/images/beoordelingen/`; geseed met `npm run seed:beoordelingen` + `seed:nav`
- `ReviewCard` is nu gedeeld: cijferrondje, naam, datum, type-tag, en de deelcijfertabel achter `showGrades` (uit op home, aan op /beoordelingen)
- sizing van de carousel is naar een wrapper-div verhuisd zodat dezelfde kaart in een grid past

**Review-aggregates**
- afgeleid in GROQ (`reviewStats` + `reviewDistribution` in PAGE_QUERY), geen singleton — zie Decision Log in cerebrum
- `review` heeft nu grade/expertise/localMarketKnowledge/negotiationAndResult/priceQuality (0-10), `type` (Aankoop/Verkoop) en `date`; initials/place/source zijn verwijderd
- home hero-badge en reviews-blok lezen hetzelfde afgeleide cijfer, met de CMS-waarde als fallback
- `npm run check:reviews` dekt formatting, fallback, deelcijfers en de verdeling

---

## 🚀 Next phase

**Goal:** Alle designs uit `app/example-designs/` zijn nu geïmplementeerd. Wat resteert is afmaken en aanscherpen.

### Open punten
1. De scraper die `review`-documenten vult (grade, deelcijfers, type, date) moet nog gebouwd worden — schema en front-end staan klaar.
2. Met 4 reviews is de "toon meer" van `reviewGrid` (>9) nog niet met echte data uitgeprobeerd.
3. De makelaarskaart op de objectpagina is nog hardcoded in `src/lib/object-content.ts` — naar het `woning`-schema (of een gedeeld makelaar-document) zodra er een tweede makelaar is.
4. `aanbiedingsTekstEngels` wordt opgeslagen en geseed maar nergens gerenderd — er is nog geen taalwissel op de objectpagina.
5. Met 6 objecten is de aanbod-grid "toon meer" (>9) en de CTA-kaart-na-6 nog niet met echte data uitgeprobeerd.
6. `SITE.fundaScore` / `SITE.reviewCount` zijn nu alleen nog fallback; de factBar op /verkoop gebruikt `SITE.fundaScore` nog hardcoded.

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
