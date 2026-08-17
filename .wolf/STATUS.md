# STATUS — hart-huis

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-08-17

---

## ✅ Done

<!-- Move items here from "🚀 Next phase" when finished. Group by area. -->

**Sanity TypeGen (17-08-2026)**
- Config staat als `typegen`-sleutel in `studio-hart-huis/sanity.cli.ts`; `schema.json` én `sanity.types.ts` staan nu in `app/src/sanity/`. `npm run typegen` werkt vanuit de app én de studio (de app delegeert). Draaien moet vanuit de studio: de CLI eist een studio-project-root.
- Extract draait met `--force` (script faalde eerder op elke tweede run) en `--enforce-required-fields`.
- `client.fetch(QUERY)` typt zichzelf via de module-augmentatie — de handgeschreven queryvormen in `layout.tsx`, `api/submit-form/route.ts` en `aanbod/[slug]/page.tsx` zijn weg (~87 regels).
- `PageBuilder.tsx` is getypt vanuit `PAGE_QUERY_RESULT`: 143 van de 159 casts weg, `default`-tak is `never`, dus een niet-afgehandeld blok is voortaan een build-fout.

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
- beoordelingen langer dan 250 tekens worden ingekort met "Lees meer" → hele tekst in een native `<dialog>` (top layer, dus de carousel knipt hem niet af); `ReviewMeta` en `ReviewGrades` zijn daarvoor uit de kaart getrokken en staan ook in de dialog
- sizing van de carousel is naar een wrapper-div verhuisd zodat dezelfde kaart in een grid past

**Review-aggregates**
- afgeleid in GROQ (`reviewStats` + `reviewDistribution` in PAGE_QUERY), geen singleton — zie Decision Log in cerebrum
- `review` heeft nu grade/expertise/localMarketKnowledge/negotiationAndResult/priceQuality (0-10), `type` (Aankoop/Verkoop) en `date`; initials/place/source zijn verwijderd
- home hero-badge en reviews-blok lezen hetzelfde afgeleide cijfer, met de CMS-waarde als fallback
- `npm run check:reviews` dekt formatting, fallback, deelcijfers en de verdeling

**Funda-review-scraper**
- scrapet de **beoordelingenwidget** (`funda.nl/beoordelingenwidget/live/{id}/1/{type}/p{page}/`), niet de gewone pagina's — die zitten achter een bot-challenge
- `app/src/lib/funda-reviews.ts` is de pure parser (geen fetch, geen Sanity), `app/src/app/api/scrape-funda-reviews/route.ts` de route, `app/src/sanity/write-client.ts` de schrijfclient
- beide tabbladen + paginering; `_id` = `funda-review-<hash van type+naam+adres+datum>`, dus idempotent en verwijzingen blijven heel
- aan te roepen via **Tools → Funda-reviews** in de linkerkolom van de studio (`tools/FundaReviewsTool.tsx`, ingehangen in `structure.ts`) en dagelijks via de cron in `app/vercel.json`
- `?dryRun=1` schrijft niets weg, `?debug=1` geeft de ruwe tekst terug
- **deelcijfers per soort** (2026-08-17): Aankoop = bereikbaarheid en communicatie / deskundigheid / onderhandeling en resultaat / prijs / kwaliteit, Verkoop = deskundigheid / lokale marktkennis / prijs / kwaliteit / service en begeleiding. `SUBSCORES` is één platte lijst van alle zes (parser), `GRADE_SUBJECTS.types` bepaalt de kaart, `alleenBij()` verbergt ze in de studio. De **Aankoop-labels zijn nog niet tegen een echte pagina gecontroleerd**
- `npm run check:funda` draait tegen **echte opgeslagen pagina's** (verkoop p1, verkoop p9 mét reacties van de makelaar, aankoop p1) en dekt de parser, de reactie-overslag, de ontdubbeling en de paginering
- alles staat beschreven in `docs/funda-review-scraper.md`

### Home-blokken automatisch gevuld (2026-08-17)
- `listings` toont de **3 nieuwste woningen** en `reviews` de **8 nieuwste reviews**, beide rechtstreeks uit de dataset — de handmatige selectie is uit `listingsType`/`reviewsType` gehaald
- de kaarten komen via `toListing()` uit `Listings.tsx` (staat daar en niet in `ObjectGrid.tsx`, want die is een client component)
- `seed:home` schrijft de oude `items`/`reviews`-velden niet meer weg; draai hem één keer om ze uit het bestaande home-document te halen
- **regel:** geen `...` in een `_type == "x" => { ... }`-tak van `PAGE_QUERY` — die overschrijft de projecties eromheen

---

## 🚀 Next phase

**Goal:** Alle designs uit `app/example-designs/` zijn nu geïmplementeerd. Wat resteert is afmaken en aanscherpen.

### Open punten
1. **De scraper is lokaal tegen de echte Funda gedraaid (17-08-2026) en klopt: 42 verkoop + 12 aankoop = 54, zonder waarschuwingen** — precies wat de widget zelf noemt. De fixtures zijn nu echte pagina's. Wat resteert vóór de eerste échte run:
   a. `?dryRun=1` draaien op de gedeployde site en de uitkomst nalopen
   b. daarna de 4 mock-reviews uit `seed:home` weggooien — die hebben geen cijfers maar tellen wel mee in `reviewStats`
   c. env zetten: `SANITY_API_WRITE_TOKEN`, `CRON_SECRET`, `FUNDA_SCRAPER_SECRET`, `STUDIO_ORIGIN` op Vercel; `SANITY_STUDIO_SCRAPER_URL` + `SANITY_STUDIO_SCRAPER_SECRET` in de studio
   d. op Hobby is een functie na 60s afgekapt — 14 pagina's × 1,2s wachttijd is ~20s, dus dat past, maar houd het in de gaten als het aantal reviews groeit
2. Met 4 reviews is de "toon meer" van `reviewGrid` (>9) nog niet met echte data uitgeprobeerd.
3. De makelaarskaart op de objectpagina is nog hardcoded in `src/lib/object-content.ts` — naar het `woning`-schema (of een gedeeld makelaar-document) zodra er een tweede makelaar is.
4. `aanbiedingsTekstEngels` wordt opgeslagen en geseed maar nergens gerenderd — er is nog geen taalwissel op de objectpagina.
5. Met 6 objecten is de aanbod-grid "toon meer" (>9) en de CTA-kaart-na-6 nog niet met echte data uitgeprobeerd.
6. `SITE.fundaScore` / `SITE.reviewCount` zijn nu alleen nog fallback; de factBar op /verkoop gebruikt `SITE.fundaScore` nog hardcoded.
7. **`woning` heeft geen `seo`-veld** terwijl `WONING_QUERY` het wél selecteert (`seo: null` in de gegenereerde types) — objectpagina's krijgen dus nooit CMS-SEO. Keuze: veld toevoegen aan het schema zoals `page` dat heeft, of de dode selectie uit de query halen. Zie bug-013.
8. Na elke schemawijziging `npm run typegen` draaien en `app/src/sanity/{schema.json,sanity.types.ts}` meecommitten — beide staan in git en zijn nu de bron van de types.

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
cd app
npm run check:funda      # parser van de Funda-scraper tegen de fixture
npm run check:reviews    # afgeleide review-cijfers
npm run check:tekst      # Realworks-aanbiedingstekst
npm run seed:sanity      # alle pagina's seeden (vereist SANITY_API_WRITE_TOKEN)

# de scraper uitproberen zonder iets op te slaan
curl -H "x-scraper-secret: $FUNDA_SCRAPER_SECRET" \
  'https://<site>/api/scrape-funda-reviews?dryRun=1'
```

---

## 📚 References (read IF needed)

- `.wolf/cerebrum.md` — User Preferences + Do-Not-Repeat + Decision Log
- `.wolf/anatomy.md` — token-efficient file index
- `.wolf/buglog.json` — known bugs + fixes
