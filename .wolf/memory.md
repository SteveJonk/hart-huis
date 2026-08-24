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
| 20:40 | Typegen-config verplaatst naar `typegen` in sanity.cli.ts (los bestand is deprecated); schema.json + types nu in app/src/sanity; `--force` en `--enforce-required-fields` toegevoegd; `npm run typegen` werkt vanuit beide mappen | studio-hart-huis/{sanity.cli.ts,package.json}, app/package.json, app/src/sanity/{schema.json,sanity.types.ts} | Werkt, herhaalbaar, 6 queries + 70 schematypes | ~12k |
| 20:55 | Gegenereerde queryresultaat-types overgenomen op de fetch-grens; ~87 regels handgeschreven types weg | app/src/app/layout.tsx, app/src/app/api/submit-form/route.ts, app/src/app/aanbod/[slug]/page.tsx | tsc + eslint schoon | ~10k |
| 21:10 | PageBuilder getypt vanuit PAGE_QUERY_RESULT i.p.v. `[key: string]: unknown`; 143 van de 159 casts weg, default-tak is nu `never` | app/src/components/PageBuilder.tsx | tsc + eslint schoon; 2 latente bugs gevonden (bug-013 seo, bug-014 badgeValue) | ~18k |

## Session: 2026-08-18 09:54

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 10:14

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 11:47

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 11:48

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 aankoop

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| — | CSS-diff aankoop.html tegen !verkoop.html | example-designs/ | alleen `.zoekblok` (= nvmstrip) is nieuw; rest is de bestaande template | ~4k |
| — | 9 jpegs uitgepakt | public/images/aankoop/*.jpg | pagehero, waarom, step-1..5, quote, cta | ~1k |
| — | Copy-constanten | src/lib/aankoop-content.ts | nieuw | ~4k |
| — | Icoonset gedeeld gemaakt | ui/BlockIcon.tsx, Benefits.tsx, verkoop-content.ts | + search/eye/clock; Benefit.icon = BlockIconName | ~3k |
| — | Strip uit Services getrokken | ui/Strip.tsx, Services.tsx | home rendert identiek (mt-70px, NVM-badge gecheckt) | ~3k |
| — | Nieuw blok | blocks/HighlightStrip.tsx + highlightStripType.ts | icoon- of tekstmerk, los inzetbaar | ~3k |
| — | Schema + typegen | schemaTypes/index.ts, pageBuilderType.ts, sanity.types.ts | typegen faalde eerst: type niet in de export-array | ~2k |
| — | Seed-target | scripts/seed/aankoop.ts, seed.ts, package.json | npm run seed:aankoop; Aankoop in nav/footer nu intern | ~3k |
| — | Preview gecontroleerd via DOM | — | 11 secties, iconen en strip kloppen; screenshots bleven leeg | ~7k |

## Session: 2026-08-18 14:03

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 14:06

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 20:26

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 20:28

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 20:30

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-18 20:31

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 20:35 | Added CMS-manageable certificationLogos field to footerType, rendered footer cert logos (NVM/Funda/NWWI/VGC/RegTax) from app/example-designs/logos, copied to public/images/logos as default fallback | footerType.ts, queries.ts, SiteFooter.tsx, layout.tsx, site.ts | done, tsc clean | ~15k |
| 21:00 | Added CMS logo override for header LogoMark (navigation.logo, SVG/PNG); fixed pre-existing footer certificationLogos bug (imageSrc was passed the whole object instead of .asset, and nullable types mismatched) | navigationType.ts, LogoMark.tsx, SiteHeader.tsx, layout.tsx, queries.ts, SiteFooter.tsx | done, tsc clean | ~12k |
| 22:03 | Rendered footer socialLinks (existing schema) as icon buttons next to logo/paragraph, using new inline-SVG SocialIcon (facebook/instagram/linkedin) | SocialIcon.tsx, SiteFooter.tsx, layout.tsx | done, tsc clean, verified via DOM inspection + temp Sanity patch/revert | ~8k |

## Session: 2026-08-20 17:06

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 17:16 | Extended form-plugin settings with Mailjet API key/secret, wired into submit-form | studio-hart-huis/schemaTypes/formGeneralSettingsType.ts, sanity.config.ts, app/src/app/api/submit-form/route.ts, queries.ts, schema.json, sanity.types.ts | typegen + tsc clean | ~9000 |

## Session: 2026-08-20 17:47

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-20 waardebepaling

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 18:10 | Abstracted example-designs/hart-en-huis-lp-waardebepaling_1.html into /waardebepaling: 6 new blocks (WaardebepalingHero client wizard-form + Krijgt/Stappen/Wie/Reviews/Slot), 6 new Sanity block types, heart icon added to BlockIcon, wizard form reuses /api/submit-form via a contactForm doc, dedicated seed:waardebepaling script, not linked in nav per instructions | studio-hart-huis/schemaTypes/{index.ts,pageBuilderType.ts,blocks/waardebepaling*.ts}, app/src/components/{PageBuilder.tsx,blocks/Waardebepaling*.tsx,ui/BlockIcon.tsx}, app/src/lib/waardebepaling-content.ts, app/scripts/seed/waardebepaling.ts, app/scripts/seed.ts, app/package.json, app/public/images/waardebepaling/hero.jpg | typegen + tsc + eslint clean; next build compiles (fails only at page-data collection for lack of Sanity env, unrelated to change) | ~140k |
| 18:25 | Renamed the 6 new blocks + Sanity types from Waardebepaling-prefixed to generic names per user request (FormHero, IconCards, NumberedSteps, PersonQuote, QuoteStrip, CenteredCta / formHero, iconCards, numberedSteps, personQuote, quoteStrip, centeredCta); content module + seed script keep the page name | app/src/components/blocks/{CenteredCta,FormHero,IconCards,NumberedSteps,PersonQuote,QuoteStrip}.tsx (renamed), app/src/components/PageBuilder.tsx, app/src/lib/waardebepaling-content.ts, app/scripts/seed/waardebepaling.ts, studio-hart-huis/schemaTypes/{index.ts,pageBuilderType.ts,blocks/*Type.ts} (renamed) | typegen + tsc (app & studio) + eslint clean | ~35k |
| 18:55 | Generic CMS-managed multi-step forms: new `multiStepForm` document + reusable `formField` object in Sanity, `MultiStepForm` React component (progress, per-step validation, submit, success), FormHero refactored to pure chrome, ContactForm moved onto the same shared field renderer, one FORM_QUERY serving both form types, new check:form + docs/formulieren.md | studio-hart-huis/{multiStepFormType.ts,objects/formFieldType.ts,blocks/formHeroType.ts,index.ts,structure.ts}, app/src/{lib/form-fields.ts,components/form/{fields.tsx,MultiStepForm.tsx},components/blocks/{FormHero,ContactForm}.tsx,components/PageBuilder.tsx,sanity/queries.ts,app/api/submit-form/route.ts,lib/waardebepaling-content.ts}, app/scripts/{check-form.ts,seed/waardebepaling.ts}, docs/formulieren.md | typegen 6 queries/80 types, tsc (app+studio) + eslint clean, all 4 check:* scripts pass, GROQ coalesce/flatten verified with groq-js against a fake dataset | ~120k |
| 20:40 | Unified forms into one Sanity type: removed @multidots/sanity-plugin-contact-form, new `form` document with mode simple/steps (simple default), FormRenderer handles both modes + recaptcha + submit + success, ContactForm & FormHero reduced to chrome, Mailjet-only route (nodemailer removed), in-place migration script, check:form now proves FORM_QUERY matches the renderer via groq-js | studio-hart-huis/{formType.ts,formGeneralSettingsType.ts,sanity.config.ts,structure.ts,schemaTypes/index.ts,blocks/{formHeroType,contactFormSectionType}.ts}, app/src/{lib/{form-fields,contact-content,waardebepaling-content}.ts,components/form/{FormRenderer.tsx,fields.tsx},components/blocks/{ContactForm,FormHero}.tsx,components/PageBuilder.tsx,sanity/queries.ts,app/api/submit-form/route.ts}, app/scripts/{check-form.ts,migrate-forms.ts,seed/{shared,contact,waardebepaling}.ts}, docs/formulieren.md | found + fixed a real bug: coalesce() allow-list disagreed with the renderer after a mode switch, which would reject every submission; now select(mode) and covered by check:form. typegen 6 queries/78 types, tsc app+studio clean, eslint clean, 4 check:* pass, studio npm install no longer needs --legacy-peer-deps | ~155k |

## Session: 2026-08-21 10:05

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-21 10:06

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 10:12 | pnpm.overrides pinned @sanity/sdk-react to 2.19.0 to fix `sanity deploy` manifest-extract JSX parse crash (2.20.0 ships untranspiled JSX in dist/index.js) | studio-hart-huis/package.json, pnpm-lock.yaml | fixed, verified via manifest extract + dry-run deploy | ~15k |

## Session: 2026-08-21 14:47

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## 2026-08-21 — NVM-pagina geabstraheerd
| 14:45 | design gelezen + bestaande blocks vergeleken | app/example-designs/hart-en-huis-nvm.html | 8 van de 9 secties bleken bestaande blocks | ~35k |
| 14:50 | 3 afbeeldingen uit base64 gehaald | app/public/images/nvm/{pagehero,kantoor,cta}.jpg | ok | ~1k |
| 15:00 | copy in één content-bestand | app/src/lib/nvm-content.ts | nieuw | ~6k |
| 15:05 | 3 line-icons toegevoegd | app/src/components/ui/BlockIcon.tsx | diploma/shield/mail | ~1k |
| 15:10 | Werkwijze kreeg optionele cta, CompareCards optionele cta + spaceTop, IconCards 2-koloms tablet bij >3 kaarten | src/components/blocks/*, studio schemaTypes/blocks/* | geen nieuwe blocks nodig | ~4k |
| 15:20 | seed voor de pagina + NVM in nav/footer | app/scripts/seed/nvm.ts, seed.ts, navigation.ts, package.json | `npm run seed:nvm` | ~3k |
| 15:30 | typegen + tsc + build | app/src/sanity/{schema.json,sanity.types.ts} | groen | ~2k |

## Session: 2026-08-21 15:01

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## 2026-08-21 — Zoekopdracht-LP geabstraheerd
| 15:00 | CSS van beide LP-designs gediffed | example-designs/{!waardebepaling,hart-en-huis-lp-zoekopdracht}.html | byte-identiek (1190 regels) — dezelfde 7 blocks, alleen andere copy | ~4k |
| 15:04 | hero-afbeelding uit base64; Dorien-foto is dezelfde als /waardebepaling | app/public/images/zoekopdracht/hero.jpg | dorien.jpg hergebruikt uit /images/contact/ | ~1k |
| 15:10 | copy + formulierdefinitie | app/src/lib/zoekopdracht-content.ts | tweestaps: plaats/budget/kamers → naam/mail/tel/termijn/akkoord | ~6k |
| 15:15 | seed afgeleid van waardebepaling.ts | app/scripts/seed/zoekopdracht.ts, seed.ts, package.json | `npm run seed:zoekopdracht` | ~2k |
| 15:20 | bug-018: `titleAfter` was een dode prop op FormHero | formHeroType.ts, PageBuilder.tsx, beide seeds | /waardebepaling verloor ' waard?' — opnieuw seeden | ~2k |
| 15:25 | typegen + tsc + check:form + build | app/src/sanity/* | groen | ~2k |

## Session: 2026-08-21 15:13

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-21 15:19

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 15:22 | per-form mail (ontvangers/onderwerp/bericht + bevestiging naar invuller) | formType.ts, queries.ts, submit-form/route.ts, docs/formulieren.md | typegen + check:form + lint groen | ~25k |

## Session: 2026-08-21 15:28

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-21 15:49

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-21 15:50

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-21 19:14

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 19:30 | Added `isLandingPage` Boolean to `page` schema; minimal-nav toggle | `pageType.ts`, `queries.ts`, `SiteHeader.tsx`, new `SiteChrome.tsx`, `layout.tsx`, `page.tsx`, `[slug]/page.tsx`, `aanbod/[slug]/page.tsx`, `not-found.tsx` | typegen + tsc + eslint clean; build reaches prerender, fails only on sandboxed Sanity egress (pre-existing) | ~55k |
| 19:52 | Renamed `SiteChrome` → `PageWrapper` (user preferred name) | `SiteChrome.tsx` → `PageWrapper.tsx`, 4 leaf-route imports, `.wolf/cerebrum.md`, `.wolf/STATUS.md` | tsc + eslint clean | ~6k |

## Session: 2026-08-21 19:31

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 19:45 | Added GitHub Action to build+deploy Sanity Studio on push to main (paths: studio-hart-huis/**), using SANITY_AUTH_TOKEN secret | .github/workflows/deploy-sanity-studio.yml | Created, not yet tested (needs SANITY_AUTH_TOKEN secret set in repo settings) | ~1500 |
| 20:30 | Diagnosed why the action never fired: `paths: studio-hart-huis/**` filter — no commit on main since the workflow landed touched that folder. Removed the filter, added `concurrency`, bumped checkout/setup-node to v5, replaced invalid `--no-bust-cache` with `--yes` | .github/workflows/deploy-sanity-studio.yml, .wolf/buglog.json | Fixed; bug-019 + bug-020 logged. SANITY_AUTH_TOKEN secret does exist (manual run got past auth into a flag error) | ~4000 |
| 20:45 | Re-added the `paths: studio-hart-huis/**` filter at user's request — the scoping was intentional and wanted. Added the workflow file itself to `paths` so changes to it are self-testing. Corrected bug-019: the filter was never the bug | .github/workflows/deploy-sanity-studio.yml, .wolf/buglog.json | Done. Merging this PR will NOT trigger a run (touches only .github/ + .wolf/) — use workflow_dispatch to verify | ~2000 |
| 20:55 | Pinned the studio hostname via GitHub repository variable `vars.SANITY_STUDIO_HOSTNAME` -> `sanity deploy --url`, using `${VAR:+--url "$VAR"}` so an unset variable adds no flag. Verified the expansion for set/empty/unset | .github/workflows/deploy-sanity-studio.yml, .wolf/cerebrum.md | Done. User must create the variable under Settings > Secrets and variables > Actions > Variables | ~2500 |
| 21:20 | Fixed the deployed Funda-tool showing "Nog niet ingesteld": SANITY_STUDIO_* are inlined by Vite at build time, and the runner has no .env. Set both at job level in the workflow (URL as a repo variable, secret as a GitHub secret) + added a guard step that fails the run when either is empty | .github/workflows/deploy-sanity-studio.yml, docs/funda-review-scraper.md, .wolf/buglog.json, .wolf/cerebrum.md | Done, guard tested for both/one/none set. User must add the two values in GitHub | ~5000 |

## Session: 2026-08-21 21:27

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 21:40 | Bezichtigingsknop op de objectpagina opent nu een `<dialog>` met een CMS-formulier. Nieuw verborgen veldtype in `formField` (waarde met `{{adres}}`-tokens), nieuw singleton `objectSettings` (knoptekst + formulierkeuze + venstertekst), WONING_QUERY haalt beide op, `toFormDefinition` verhuisd van PageBuilder naar form-fields zodat de objectpagina hem ook gebruikt | studio-hart-huis/schemaTypes/{objects/formFieldType.ts,objectSettingsType.ts,index.ts}, structure.ts, app/src/{sanity/queries.ts,lib/{form-fields.ts,object-content.ts,site.ts},components/{form/{FormRenderer,fields},object/{ObjectContactDialog,ObjectSidebar},PageBuilder}.tsx,app/aanbod/[slug]/page.tsx}, scripts/{check-form.ts,seed.ts,seed/{shared,objectpagina}.ts} | typegen + tsc + lint + check:form groen; build compileert (export faalt alleen omdat deze container niet bij api.sanity.io kan). Nog te seeden: `npm run seed:objectpagina` | ~40000 |
| 21:45 | `SITE.baseUrl` toegevoegd en hergebruikt in sitemap.ts + robots.ts — de objectpagina heeft een absolute URL nodig voor het `{{url}}`-token | app/src/lib/site.ts, app/src/app/{sitemap,robots}.ts | Done, één plek voor het domein | ~1000 |

## Session: 2026-08-24 11:22

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-24 11:25

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-24 11:28

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|

## Session: 2026-08-24 11:52

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 12:40 | Realworks-mapping geschreven (feed -> `woning`), puur en getest tegen een echte feed | app/src/lib/realworks.ts, app/scripts/check-realworks.ts, app/scripts/fixtures/realworks-objecten.json | `npm run check:realworks` groen, 10 objecten | ~9k |
| 12:55 | Import-route + gedeelde auth/CORS uit de Funda-route getrokken | app/src/app/api/import-realworks/route.ts, app/src/lib/route-auth.ts, app/src/app/api/scrape-funda-reviews/route.ts | dryRun lokaal 200, 11 objecten uit de live feed | ~6k |
| 13:05 | Studioknop "Realworks-objecten" + gedeelde panelstijlen, cron 04:30, docs | studio-hart-huis/tools/{RealworksTool.tsx,panelStyles.ts}, structure.ts, app/vercel.json, docs/realworks-import.md | tsc + eslint schoon | ~5k |
