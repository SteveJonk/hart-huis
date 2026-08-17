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

## Session: 2026-08-13 contact

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| — | Diffed contact.html vs !verkoop.html | example-designs/ | own template: split hero + ways + wie + form + route; only crossLinks reused | ~6k |
| — | Asked how the form should submit | — | user chose: wire the installed Sanity contact-form plugin | ~1k |
| — | Registered plugin + studio structure | sanity.config.ts, structure.ts | Forms list + Form settings singleton | ~1k |
| — | Extracted 3 jpegs | public/images/contact/*.jpg | kantoor, dorien, straat | ~0.5k |
| — | Copy constants | src/lib/contact-content.ts | incl. the seeded form field definitions | ~4k |
| — | Built 5 blocks + shared icon | blocks/{SplitHero,ContactWays,Person,ContactForm,RouteBlock}.tsx, ui/ContactIcon.tsx | ContactForm is the only client block | ~10k |
| — | Sanity schemas | schemaTypes/blocks/{splitHero,contactWays,person,contactFormSection,routeBlock}Type.ts | contactFormSection references the plugin's contactForm doc | ~4k |
| — | Submit endpoint | src/app/api/submit-form/route.ts | server-side settings + allow-list from the form doc + nodemailer | ~4k |
| — | Seed module | scripts/seed/contact.ts, seed.ts, package.json | seeds the form doc + page; npm run seed:contact | ~3k |
| — | Verified layout/DOM + API error paths | — | desktop + mobile OK, 400/404 paths OK (screenshots unavailable, pane stuck) | ~8k |
| — | Wired Google reCAPTCHA v2 | ContactForm.tsx, api/submit-form/route.ts, queries.ts, PageBuilder.tsx | site key via GROQ, secret server-side, fails closed | ~5k |

## Session: 2026-08-13 10:15

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-13 10:20

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 11:05 | Added the "Object" document type (`woning`) + studio structure entry | studio-hart-huis/schemaTypes/woningType.ts, index.ts, structure.ts | tsc clean; `object` is a reserved Sanity name so the type is `woning` | ~9k |
| 11:20 | Seeded 6 mock objects with library photos | app/scripts/seed/objecten.ts, seed.ts, package.json | `npm run seed:objecten` ran twice, 6 docs, idempotent | ~12k |

## Session: 2026-08-13 10:47

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 12:10 | Built /object/[slug] from example-designs/object.html | src/app/object/[slug]/page.tsx, src/components/object/*, src/lib/{aanbiedingstekst,format,object-content}.ts, sanity/queries.ts | tsc + eslint clean; verified in browser (gallery, lightbox, toggle, mobile) | ~40k |
| 12:15 | Reused ListingCard for "vergelijkbare woningen" | Listings.tsx, PageBuilder.tsx | `sold: boolean` → `tone: white/sand/burgundy`; home pills unchanged | ~4k |
| 12:20 | Moved imageSrc/toImage from PageBuilder to sanity/image.ts | PageBuilder.tsx, sanity/image.ts | shared by the object route, no duplication | ~2k |
| 13:05 | Built /aanbod overview from example-designs/aanbod.html | src/lib/aanbod-content.ts, blocks/AanbodHeader.tsx, blocks/ObjectGrid.tsx, studio blocks, PageBuilder.tsx, queries.ts, scripts/seed/aanbod.ts | page seeded, build clean, filters verified in browser | ~35k |
| 13:10 | Nav + footer "Actueel aanbod" now resolve to the /aanbod page | scripts/seed/navigation.ts | ran seed:nav; links render as /aanbod | ~2k |
| 13:12 | Fixed stale /object/<slug> links after the route rename | src/app/aanbod/[slug]/page.tsx | vergelijkbare woningen point at /aanbod/<slug> | ~1k |

## Session: 2026-08-13 12:53

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-13 13:00

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 14:10 | review-type uitgebreid: +grade/expertise/localMarketKnowledge/priceQuality (0-10, optioneel) + type enum Aankoop/Verkoop; -initials/place/source; description op name | studio/schemaTypes/reviewType.ts, src/lib/home-content.ts, src/components/blocks/Reviews.tsx, src/components/PageBuilder.tsx, scripts/seed/home.ts | tsc --noEmit schoon; dev-server niet gedraaid (gebruiker weigerde) | ~14k |
| 14:45 | review-aggregates afgeleid i.p.v. singleton: reviewStats-projectie in PAGE_QUERY (count aankoop/verkoop + math::avg cijfer), reviewScore/reviewCountLabel helpers met CMS-fallback | src/sanity/queries.ts, src/lib/reviews.ts, src/components/PageBuilder.tsx, scripts/check-reviews.ts | check:reviews + tsc groen; PAGE_QUERY live gedraaid: 4 reviews, cijfer null -> fallback "9,6" werkt | ~22k |
| 15:05 | hero-badge op home leest nu hetzelfde afgeleide cijfer: reviewStats ook in de `hero`-blokprojectie, badgeValue via reviewScore() met CMS-fallback | src/sanity/queries.ts, src/components/PageBuilder.tsx | live geverifieerd: hero + reviews krijgen beide de aggregates; cijfer nog null -> fallback "9,6", count -> "4 keer beoordeeld" | ~9k |
| 16:20 | /beoordelingen gebouwd uit beoordelingen.html: 4 nieuwe blocks (beoordelingenHero, uitgelichteReview, reviewGrid, werkwijze) + schema's + seed; ReviewCard uitgebreid met cijferrondje, type-tag, datum en deelcijfertabel achter `showGrades` | src/components/blocks/{BeoordelingenHero,UitgelichteReview,ReviewGrid,Werkwijze}.tsx, blocks/Reviews.tsx, PageBuilder.tsx, sanity/queries.ts, lib/{reviews,beoordelingen-content}.ts, studio schemaTypes, scripts/seed/beoordelingen.ts | tsc (app+studio) + lint + check:reviews groen; pagina geseed en in de browser geverifieerd: 8,8 / 4 beoordelingen, filters 4/2/2, 4 kaarten met tabel; home heeft 0 tabellen | ~78k |

## Session: 2026-08-15 20:29

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 20:35 | Verkenning voor de funda review-scraper: review-schema/queries/seed-patroon in kaart gebracht, funda-URL's van kantoor 10356 gevonden (2 tabs × 2 plaatsen, paginering via /pN/) | .wolf/cerebrum.md | geblokkeerd: funda.nl geeft 403 via de egress-proxy, dus geen DOM-inspectie; gewacht op het script van de gebruiker (paste kwam leeg binnen) | ~35k |
| 20:50 | Funda-review-scraper gebouwd: pure parser (`src/lib/funda-reviews.ts`) op de beoordelingenwidget, route `/api/scrape-funda-reviews` met dryRun/debug + dubbele auth (cron-bearer en studio-secret), schrijfclient, studioknop, dagelijkse Vercel-cron, fixture-test | src/lib/funda-reviews.ts, src/app/api/scrape-funda-reviews/route.ts, src/sanity/write-client.ts, studio tools/FundaReviewsTool.tsx, sanity.config.ts, vercel.json, scripts/check-funda-reviews.ts + fixtures/, docs/funda-review-scraper.md | tsc (app+studio) + lint (app+studio) + check:funda + check:reviews groen; next build compileert en typecheckt maar kan hier niet afronden (Sanity-API geblokkeerd door de egress-proxy) | ~95k |
| 20:52 | Deelcijfer `negotiationAndResult` → `serviceAndGuidance` ("Service en begeleiding") zodat het schema de vier criteria van Funda volgt; oude veld wordt door de route ge-unset | studio schemaTypes/reviewType.ts, src/lib/reviews.ts, src/sanity/queries.ts, scripts/check-reviews.ts | check:reviews groen; geen andere verwijzingen meer naar het oude veld | ~8k |
| 21:20 | Funda-scraperknop verhuisd van de bovenbalk (`tools:` in sanity.config) naar een eigen groep **Tools** in de linkerkolom (`structure.ts`, `S.component(FundaReviews)`); dubbele h1 weg en paneelkleuren op Sanity's card-variabelen gezet zodat het donkere thema klopt | studio-hart-huis/structure.ts, sanity.config.ts, tools/FundaReviewsTool.tsx, docs/funda-review-scraper.md | tsc + eslint studio groen | ~12k |

## Session: 2026-08-17 14:30

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-17 15:00

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-17 15:01

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-17 15:02

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 15:40 | Deelcijfers per reviewsoort: Aankoop krijgt bereikbaarheid+onderhandeling, Verkoop marktkennis+begeleiding | reviewType.ts, funda-reviews.ts, reviews.ts, queries.ts, route.ts, 2 checks, docs | check:reviews + check:funda + tsc + lint groen | ~14k |
| 16:55 | Paginering gefixt (URL is /live/{id}/1/{type}/pN/), reacties van de makelaar overgeslagen, entities gedecodeerd, cijfer in de dedup-sleutel | funda-reviews.ts, check-funda-reviews.ts, 3 echte fixtures, docs | live run: 42 verkoop + 12 aankoop = 54, geen warnings | ~40k |
| 17:30 | Lange beoordelingen op 250 tekens ingekort met 'Lees meer' in een native <dialog> | Reviews.tsx, reviews.ts, check-reviews.ts | in de browser getest: kaart 248 tekens, dialog 1241, Esc + backdrop + sticky Sluiten werken, mobiel 337px breed | ~12k |

## Session: 2026-08-17 19:54

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-17 19:54

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 20:10 | Contactformulier gefixt: generieke veld-projecties in PAGE_QUERY na de conditionele takken gezet (conditionele `...` clobberde `form->`), debug-log/`<pre>` weg, CONTACT_FORM_QUERY terug naar defineQuery | app/src/sanity/queries.ts, app/src/components/PageBuilder.tsx, app/src/components/blocks/ContactForm.tsx | Form rendert op /contact (6 velden), tsc schoon, groq-js-test bevestigt form-> + hero/aside cta | ~25k |
| 21:05 | Home: `listings` toont nu de 3 nieuwste woningen en `reviews` de 8 nieuwste reviews, handmatige selectie uit beide schema's gehaald; `toListing` naar Listings.tsx verhuisd (client boundary); seed opgeschoond | app/src/sanity/queries.ts, PageBuilder.tsx, Listings.tsx, ObjectGrid.tsx, scripts/seed/home.ts, studio: listingsType/reviewsType | 3 kaarten + 8 reviews live op /, /beoordelingen weer 9 kaarten, tsc + lint schoon | ~40k |
| 21:35 | Mobiel-zoom-bug in reviews-carousel gefixt: `[contain:layout]` op de track — zonder die regel lekte de scrollbare breedte naar de paginabreedte zodra er 8 i.p.v. ~4 kaarten stonden | app/src/components/blocks/Reviews.tsx | docSW 375 op mobiel / 1280 op desktop met 8 kaarten, carousel + dialog blijven werken | ~15k |

## Session: 2026-08-17 20:02

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 20:15 | Redirected typegen output to app/src/sanity, added query glob for app | studio-hart-huis/sanity-typegen.json (new), studio-hart-huis/sanity.types.ts → app/src/sanity/sanity.types.ts (git mv) | Config added; `openwolf` CLI unavailable here so anatomy.md not rescanned — run `openwolf scan` next session | ~2k |
