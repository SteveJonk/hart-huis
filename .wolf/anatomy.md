# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-08-18T10:01:55.541Z
> Files: 224 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.DS_Store` (~2732 tok)
- `.gitignore` — Git ignore rules (~3 tok)
- `AGENTS.md` — OpenWolf (~68 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `README.md` — Project documentation (~118 tok)

## .claude/

- `launch.json` (~72 tok)
- `settings.json` (~514 tok)

## .claude/commands/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .claude/rules/

- `openwolf.md` (~328 tok)

## .cursor/rules/

- `openwolf.mdc` (~87 tok)

## .opencode/command/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .opencode/plugin/

- `openwolf.ts` — OpenWolf plugin entry — installed by `openwolf init --agent opencode`. (~74 tok)

## .opencode/plugin/openwolf/

- `anatomy.ts` — Exports parseAnatomy, serializeAnatomy, extractDescription, STORE_FILE + 12 more (~2922 tok)
  - fn `parseAnatomy` L5-28 (~207 tok)
  - fn `serializeAnatomy` L29-53 (~240 tok)
  - fn `extractDescription` L54-106 (~577 tok)
  - fn `sha256` L107-110 (~33 tok)
  - section `StoreFileEntry` L111-121 (~83 tok)
  - section `AnatomyStoreData` L122-127 (~63 tok)
  - fn `newStore` L128-132 (~64 tok)
  - fn `loadStore` L133-142 (~92 tok)
  - fn `saveStore` L143-157 (~162 tok)
  - fn `renderStore` L158-188 (~380 tok)
  - fn `renderToFile` L189-202 (~146 tok)
  - fn `importFromMarkdown` L203-227 (~305 tok)
  - fn `loadStoreReconciled` L228-240 (~137 tok)
  - fn `lockSleep` L241-244 (~31 tok)
  - fn `withAnatomyLock` L245-276 (~373 tok)
- `fs.ts` — Exports getWolfDir, wolfDirExists, readJSON, writeJSON + 6 more (~538 tok)
  - fn `getWolfDir` L5-8 (~28 tok)
  - fn `wolfDirExists` L9-12 (~31 tok)
  - fn `readJSON` L13-20 (~50 tok)
  - fn `writeJSON` L21-33 (~144 tok)
  - fn `readMarkdown` L34-41 (~41 tok)
  - fn `appendMarkdown` L42-47 (~64 tok)
  - fn `timeShort` L48-52 (~46 tok)
  - fn `timestamp` L53-56 (~22 tok)
  - fn `normalizePath` L57-60 (~24 tok)
  - fn `estimateTokens` L61-64 (~60 tok)
- `index.ts` — Exports OpenWolf (~1081 tok)
- `post-read.ts` — Exports handlePostRead (~629 tok)
  - fn `handlePostRead` L7-57 (~553 tok)
- `post-write.ts` — Exports handlePostWrite, summarizeEdit, autoDetectBugFix, detectFixPattern (~3226 tok)
  - fn `handlePostWrite` L8-39 (~302 tok)
  - fn `updateAnatomy` L40-86 (~473 tok)
  - fn `appendToMemory` L87-114 (~302 tok)
  - fn `trackSession` L115-150 (~338 tok)
  - fn `summarizeEdit` L151-184 (~471 tok)
  - fn `autoDetectBugFix` L185-228 (~523 tok)
  - fn `detectFixPattern` L229-265 (~610 tok)
  - fn `extractChangedLines` L266-270 (~88 tok)
- `pre-read.ts` — Exports handlePreRead (~685 tok)
  - fn `handlePreRead` L7-63 (~613 tok)
- `pre-write.ts` — Exports handlePreWrite (~1167 tok)
  - fn `tokenize` L14-21 (~63 tok)
  - fn `handlePreWrite` L22-35 (~132 tok)
  - fn `checkCerebrum` L36-65 (~369 tok)
  - section `BugEntry` L66-74 (~37 tok)
  - fn `checkBugLog` L75-105 (~399 tok)
- `session.ts` — Exports getSessionState, setSessionState, deleteSession, handleSessionStart (~952 tok)
  - fn `getSessionState` L8-11 (~33 tok)
  - fn `setSessionState` L12-15 (~33 tok)
  - fn `deleteSession` L16-19 (~26 tok)
  - fn `handleSessionStart` L20-89 (~783 tok)
- `stop.ts` — Exports handleStop (~1444 tok)
  - fn `handleStop` L6-35 (~262 tok)
  - fn `checkForMissingBugLogs` L36-50 (~165 tok)
  - fn `buildLedgerEntry` L51-114 (~743 tok)
  - fn `appendSessionSummary` L115-126 (~218 tok)
- `types.ts` — Exports FileRead, FileWrite, SessionState, PartialSessionState + 2 more (~217 tok)

## app/

- `.DS_Store` (~3824 tok)
- `.gitignore` — Git ignore rules (~128 tok)
- `AGENTS.md` — This is NOT the Next.js you know (~82 tok)
- `CLAUDE.md` (~3 tok)
- `eslint.config.mjs` — ESLint flat configuration (~124 tok)
- `next-env.d.ts` — / <reference types="next" /> (~72 tok)
- `next.config.ts` — Next.js configuration (~141 tok)
- `package-lock.json` — npm lock file (~192873 tok)
- `package.json` — Node.js package manifest (~503 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `tailwind.config.ts` — Tailwind CSS configuration (~946 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)
- `tsconfig.tsbuildinfo` (~45204 tok)
- `vercel.json` — Dagelijkse cron die de Funda-review-scraper aanroept (04:00 UTC). (~46 tok)

## app/example-designs/

- `!aanbod.html` — Actueel aanbod — Hart &amp; Huis Makelaardij Haarlem (~245118 tok)
- `!contact.html` — Contact — Hart &amp; Huis Makelaardij Haarlem (~115609 tok)
- `!over-ons.html` — Over ons — Dorien Hollemans, Hart &amp; Huis Makelaardij Haarlem (~205364 tok)
- `.DS_Store` (~1640 tok)
- `beoordelingen.html` — Beoordelingen — Hart &amp; Huis Makelaardij Haarlem (~106755 tok)

## app/public/

- `.DS_Store` (~1640 tok)

## app/scripts/

- `check-aanbiedingstekst.ts` — assert-based check of the Realworks text parser (`npm run check:tekst`). (~359 tok)
- `check-funda-reviews.ts` — Smallest thing that fails if de Funda-parser breekt. Draait tegen een fixture. (~2840 tok)
  - fn `fixture` L32-171 (~1834 tok)
  - fn `run` L172-188 (~120 tok)
  - fn `checkPagination` L189-238 (~609 tok)
- `check-reviews.ts` — Smallest thing that fails if de afgeleide review-cijfers breken. (~1194 tok)
- `seed.ts` — Seed Sanity content. Runs every target, or only the ones you name. (~575 tok)
  - fn `parseTargets` L40-51 (~106 tok)
  - fn `main` L52-68 (~119 tok)

## app/scripts/fixtures/

- `funda-widget-aankoop-p1.html` — Funda (~9945 tok)
- `funda-widget-verkoop-p1.html` — Funda (~10415 tok)
- `funda-widget-verkoop-p9.html` — Funda (~8196 tok)

## app/scripts/seed/

- `aanbod.ts` — Seeds the /aanbod page (aanbodHeader + objectGrid + ctaBand). (~494 tok)
- `aankoop.ts` — Seeds the aankoop FAQs and the /aankoop page. (~1327 tok)
  - fn `buildAankoopContent` L21-145 (~1108 tok)
  - fn `seedAankoop` L146-156 (~82 tok)
- `beoordelingen.ts` — Seeds the /beoordelingen page. De beoordelingen zelf komen uit `seed:home` (~902 tok)
  - fn `buildBeoordelingenContent` L14-90 (~739 tok)
  - fn `seedBeoordelingen` L91-95 (~49 tok)
- `contact.ts` — Seeds the /contact page, plus the form document it points at. (~1490 tok)
  - fn `upsertContactForm` L24-59 (~310 tok)
  - fn `buildContactContent` L60-162 (~912 tok)
  - fn `seedContact` L163-170 (~64 tok)
- `home.ts` — Seeds the reviews and the home page. (~1622 tok)
  - fn `upsertReview` L11-38 (~198 tok)
  - fn `buildHomeContent` L39-166 (~1279 tok)
  - fn `seedHome` L167-176 (~65 tok)
- `navigation.ts` — Seeds the navigation and footer singletons. (~884 tok)
  - fn `navLinkExternal` L9-17 (~47 tok)
  - fn `navLinkInternal` L18-26 (~66 tok)
  - fn `pageIdBySlug` L27-34 (~70 tok)
  - fn `pageLink` L35-39 (~50 tok)
  - fn `upsertNavigation` L40-68 (~229 tok)
  - fn `upsertFooter` L69-109 (~321 tok)
  - fn `seedNavigation` L110-115 (~38 tok)
- `objecten.ts` — Seeds 6 mock `woning` documents (houses for sale) in the Realworks text format; reuses photos already in the Sanity library, deterministic `_id` per slug. (~8403 tok)
  - fn `euro` L277-277 (~20 tok)
  - fn `datum` L278-280 (~36 tok)
  - fn `slugify` L281-290 (~91 tok)
  - fn `rij` L291-296 (~73 tok)
  - fn `kenmerkGroepen` L297-364 (~533 tok)
  - fn `photoAssets` L365-380 (~168 tok)
  - fn `seedObjecten` L381-425 (~418 tok)
- `over-ons.ts` — Seeds the /over-ons page. (~958 tok)
  - fn `buildOverOnsContent` L16-106 (~816 tok)
  - fn `seedOverOns` L107-111 (~41 tok)
- `shared.ts` — Shared Sanity write helpers for the per-page seed scripts in this folder. (~1241 tok)
  - fn `key` L43-49 (~48 tok)
  - fn `externalLink` L50-53 (~34 tok)
  - fn `cta` L54-57 (~38 tok)
  - fn `uploadImage` L58-92 (~250 tok)
  - fn `upsertFaq` L93-125 (~276 tok)
  - fn `upsertPage` L126-149 (~191 tok)
- `taxatie.ts` — Seeds the taxatie FAQs and the /taxatie page. (~1417 tok)
  - fn `buildTaxatieContent` L22-155 (~1192 tok)
  - fn `seedTaxatie` L156-166 (~82 tok)
- `verkoop.ts` — Seeds the verkoop FAQs and the /verkoop page. (~1320 tok)
  - fn `buildVerkoopContent` L16-130 (~1133 tok)
  - fn `seedVerkoop` L131-141 (~82 tok)

## app/src/

- `.DS_Store` (~2186 tok)

## app/src/app/

- `globals.css` — Styles: 4 rules, 1 media queries, 1 layers (~140 tok)
- `layout.tsx` — display (~666 tok)
  - fn `asNavLinks` L26-31 (~58 tok)
  - fn `RootLayout` L32-70 (~360 tok)
- `manifest.json` (~125 tok)
- `not-found.tsx` — NotFound (~239 tok)
- `page.tsx` — options (~215 tok)

## app/src/app/[slug]/

- `page.tsx` — options (~283 tok)

## app/src/app/aanbod/[slug]/

- `page.tsx` — Precies wat WONING_QUERY teruggeeft — afgeleid, niet nagetypt. (~1266 tok)
  - fn `getWoning` L30-33 (~27 tok)
  - fn `toCard` L34-54 (~159 tok)
  - fn `generateMetadata` L55-68 (~91 tok)
  - fn `ObjectPage` L69-134 (~612 tok)

## app/src/app/api/scrape-funda-reviews/

- `route.ts` — Haalt beide Funda-tabbladen op en zet ze als reviews in Sanity. Auth via cron-bearer of studio-secret; dryRun/debug. (~2571 tok)
  - fn `equalSecret` L63-74 (~150 tok)
  - fn `isAuthorized` L75-90 (~173 tok)
  - fn `corsHeaders` L91-109 (~169 tok)
  - fn `fetchPage` L110-115 (~71 tok)
  - fn `toDocument` L116-140 (~212 tok)
  - fn `upsertReviews` L141-190 (~489 tok)
  - fn `handle` L191-273 (~707 tok)
  - fn `GET` L274-277 (~22 tok)
  - fn `POST` L278-281 (~22 tok)
  - fn `OPTIONS` L282-285 (~38 tok)

## app/src/app/api/submit-form/

- `route.ts` — Bigger uploads are rejected rather than silently dropped from the mail. (~1645 tok)
  - fn `verifyRecaptcha` L15-32 (~163 tok)
  - fn `fail` L33-36 (~35 tok)
  - fn `escapeHtml` L37-44 (~48 tok)
  - fn `POST` L45-167 (~1270 tok)

## app/src/components/

- `PageBuilder.tsx` — Reviews zonder quote of naam zijn onbruikbaar op een kaart en vallen af. (~6904 tok)
  - fn `toCta` L63-68 (~49 tok)
  - fn `toLabeledLink` L69-77 (~99 tok)
  - fn `toReviews` L78-84 (~84 tok)
  - fn `renderBlock` L85-790 (~5798 tok)
  - fn `PageBuilder` L791-796 (~60 tok)

## app/src/components/blocks/

- `AanbodHeader.tsx` — Opener for /aanbod: breadcrumb, eyebrow, title with burgundy highlight, lead, and the sand "gratis zoekopdracht" card. Carries `data-solid-header`. (~1000 tok)
  - fn `AanbodHeader` L36-109 (~716 tok)
- `Assurances.tsx` — Dark band with credentials, checked off two by two. (~867 tok)
  - fn `IconCheck` L24-32 (~79 tok)
  - fn `Assurances` L33-90 (~622 tok)
- `Benefits.tsx` — DEFAULTS (~780 tok)
  - fn `Benefits` L35-82 (~499 tok)
- `BeoordelingenHero.tsx` — Opener van /beoordelingen: copy naast de zandkleurige scorekaart. (~1805 tok)
  - fn `BeoordelingenHero` L43-183 (~1421 tok)
- `CompareCards.tsx` — Two side-by-side option cards, the second one on ink. (~1670 tok)
  - fn `IconCheck` L26-33 (~62 tok)
  - fn `IconCross` L34-42 (~80 tok)
  - fn `CompareCards` L43-153 (~1345 tok)
- `ContactForm.tsx` — Field shape as authored in the Sanity contact-form plugin. (~3819 tok)
  - fn `linkify` L111-132 (~150 tok)
  - fn `Field` L133-227 (~825 tok)
  - fn `toRows` L228-245 (~116 tok)
  - fn `ContactForm` L246-421 (~1852 tok)
- `ContactWays.tsx` — Four ways to get in touch, pulled up over the hero. (~688 tok)
  - fn `ContactWays` L16-66 (~560 tok)
- `CrossLinks.tsx` — DEFAULTS (~634 tok)
  - fn `CrossLinks` L21-63 (~500 tok)
- `CtaBand.tsx` — DEFAULTS (~790 tok)
  - fn `CtaBand` L40-93 (~478 tok)
- `DuoPhotos.tsx` — DEFAULTS (~882 tok)
  - fn `DuoPhotos` L27-96 (~697 tok)
- `FactBar.tsx` — DEFAULTS (~418 tok)
- `Faq.tsx` — DEFAULTS (~1125 tok)
  - fn `Faq` L33-107 (~880 tok)
- `Hero.tsx` — DEFAULTS (~1815 tok)
  - fn `Hero` L51-196 (~1422 tok)
- `HighlightStrip.tsx` — Text in the round mark. Ignored when an icon is picked. (~326 tok)
- `Intro.tsx` — DEFAULTS (~1518 tok)
  - fn `renderHighlightedTitle` L56-79 (~136 tok)
  - fn `Intro` L80-174 (~921 tok)
- `Listings.tsx` — Pill tone: available (white), sold subject to conditions (sand), sold (burgundy). (~2005 tok)
  - fn `IconArea` L97-108 (~74 tok)
  - fn `IconRooms` L109-125 (~127 tok)
  - fn `toListing` L126-155 (~224 tok)
  - fn `ListingCard` L156-201 (~472 tok)
  - fn `Listings` L202-248 (~400 tok)
- `MediaText.tsx` — Text column with a supporting photo on the right. (~652 tok)
  - fn `MediaText` L35-85 (~412 tok)
- `ObjectGrid.tsx` — Filter bar + listing grid, filtered and sorted in the browser over all objects. (~2703 tok)
  - fn `ObjectGrid` L51-267 (~2267 tok)
- `PageHero.tsx` — DEFAULTS (~1142 tok)
  - fn `PageHero` L40-134 (~864 tok)
- `PageOpener.tsx` — Centred opener for pages without a photo hero (Over ons). (~656 tok)
  - fn `PageOpener` L24-76 (~471 tok)
- `Person.tsx` — Photo beside a short intro and the one person you'll actually speak to. (~1079 tok)
  - fn `Person` L40-122 (~813 tok)
- `QuoteBand.tsx` — DEFAULTS (~650 tok)
  - fn `QuoteBand` L30-71 (~441 tok)
- `RegionBlock.tsx` — DEFAULTS (~637 tok)
  - fn `RegionBlock` L26-62 (~416 tok)
- `ReviewGrid.tsx` — Alle beoordelingen, in de browser gefilterd op soort en per 9 getoond. (~1136 tok)
  - fn `ReviewGrid` L23-130 (~957 tok)
- `Reviews.tsx` — Deelcijfertabel per review. Uit op de homepage, aan op /beoordelingen. (~3084 tok)
  - fn `ReviewMeta` L50-78 (~318 tok)
  - fn `ReviewGrades` L79-105 (~277 tok)
  - fn `ReviewCard` L106-195 (~911 tok)
  - fn `Reviews` L196-306 (~1180 tok)
- `RouteBlock.tsx` — Dark band with opening hours, directions and a photo. (~888 tok)
  - fn `RouteBlock` L37-107 (~632 tok)
- `Services.tsx` — DEFAULT_ITEMS (~1203 tok)
  - fn `ServiceCardItem` L66-111 (~445 tok)
  - fn `Services` L112-149 (~270 tok)
- `SplitHero.tsx` — Copy on cream next to a full-bleed photo — the contact page's opener. (~1240 tok)
  - fn `SplitHero` L40-139 (~958 tok)
- `Steps.tsx` — DEFAULTS (~1722 tok)
  - fn `stepImageSrc` L40-43 (~34 tok)
  - fn `Steps` L44-165 (~1399 tok)
- `Stories.tsx` — DEFAULTS (~1018 tok)
  - fn `Stories` L46-120 (~665 tok)
- `Timeline.tsx` — DEFAULTS (~888 tok)
  - fn `Timeline` L25-89 (~716 tok)
- `UitgelichteReview.tsx` — Eén uitgelichte beoordeling, groot uitgelicht naast een foto. (~751 tok)
  - fn `UitgelichteReview` L21-81 (~552 tok)
- `ValueCards.tsx` — DEFAULTS (~925 tok)
  - fn `ValueIcon` L24-60 (~273 tok)
  - fn `ValueCards` L61-105 (~493 tok)
- `VerkoopCta.tsx` — DEFAULTS (~248 tok)
- `Werkwijze.tsx` — Donkere uitlegsectie met genummerde punten. (~811 tok)
  - fn `Werkwijze` L28-79 (~605 tok)

## app/src/components/layout/

- `SiteFooter.tsx` — FooterLinkList (~1124 tok)
  - fn `FooterLinkList` L7-29 (~183 tok)
  - fn `SiteFooter` L30-112 (~872 tok)
- `SiteHeader.tsx` — isActivePath (~1467 tok)
  - fn `isActivePath` L11-15 (~53 tok)
  - fn `DesktopNav` L16-57 (~350 tok)
  - fn `Burger` L58-106 (~321 tok)
  - fn `SiteHeader` L107-166 (~646 tok)
- `WhatsAppButton.tsx` — WhatsAppButton (~445 tok)

## app/src/components/object/

- `ObjectDescription.tsx` — Client. Omschrijving clamped behind a fade with a "lees de volledige omschrijving" toggle; renders parsed Realworks text. (~813 tok)
  - fn `Inline` L12-28 (~121 tok)
  - fn `ObjectDescription` L29-91 (~616 tok)
- `ObjectFeatures.tsx` — Kenmerkentabel: one white card per `kenmerkGroep`, label/value rows, multi-value rows as a list. (~703 tok)
  - fn `ObjectFeatures` L16-74 (~608 tok)
- `ObjectGallery.tsx` — Client. Three-photo header grid + "Alle foto's" lightbox (arrow keys, Escape, focus return). Carries `data-solid-header`. (~2206 tok)
  - fn `IconBack` L19-26 (~62 tok)
  - fn `IconPhotos` L27-47 (~192 tok)
  - fn `ObjectGallery` L48-239 (~1839 tok)
- `ObjectHeader.tsx` — Adres/prijs kop + the specs bar; skips specs the feed did not fill, colours the energielabel chip by tier. (~1063 tok)
  - fn `labelClass` L21-28 (~78 tok)
  - fn `Spec` L29-41 (~118 tok)
  - fn `ObjectHeader` L42-124 (~713 tok)
- `ObjectSidebar.tsx` — Sticky price card (status pill, CTAs, feiten, brochure/delen) + makelaar card. (~1621 tok)
  - fn `IconDownload` L34-46 (~84 tok)
  - fn `IconShare` L47-57 (~133 tok)
  - fn `Feit` L58-67 (~112 tok)
  - fn `ObjectSidebar` L68-177 (~988 tok)
- `ShareButton.tsx` — Client. navigator.share with a clipboard fallback. (~254 tok)
- `SimilarObjects.tsx` — "Vergelijkbare woningen" band on sand, reusing `ListingCard`. (~417 tok)

## app/src/components/ui/

- `ArrowLink.tsx` — Standalone text link with circular arrow (renders as `<a>`). (~541 tok)
  - fn `ArrowLink` L34-57 (~154 tok)
  - fn `ArrowLinkLabel` L58-73 (~93 tok)
- `BlockIcon.tsx` — Line icons shared by the blocks that offer an icon picker (Benefits, the (~923 tok)
  - fn `BlockIcon` L22-132 (~813 tok)
- `Button.tsx` — baseClass (~444 tok)
- `ContactIcon.tsx` — Phone / WhatsApp / mail / map-pin, shared by the contact cards and the form aside. (~571 tok)
  - fn `ContactIcon` L9-60 (~507 tok)
- `Eyebrow.tsx` — Warm sand tone on dark backgrounds where white reads too cold. (~188 tok)
- `IconArrow.tsx` — IconArrow (~203 tok)
- `Lead.tsx` — Lead (~92 tok)
- `LogoMark.tsx` — Header mark responds to sticky/mobile; footer is a fixed 90px mark. (~638 tok)
  - fn `LogoMark` L11-74 (~556 tok)
- `Reveal.tsx` — delayClass (~252 tok)
- `RevealLink.tsx` — delayClass (~277 tok)
- `SectionHead.tsx` — SectionHead (~160 tok)
- `Strip.tsx` — Text in the round mark, e.g. "NVM". Ignored when `icon` is set. (~670 tok)
  - fn `Strip` L24-64 (~480 tok)
- `Wrap.tsx` — Site content width shell. (~119 tok)

## app/src/hooks/

- `useActiveStep.ts` — Tracks which step list item is closest to ~42% viewport height. (~316 tok)
- `useMobileNav.ts` — Exports useMobileNav (~282 tok)
- `useRevealOnScroll.ts` — Exports useRevealOnScroll (~259 tok)
- `useReviewsCarousel.ts` — Exports useReviewsCarousel (~382 tok)
- `useStickyTopbar.ts` — Exports useStickyTopbar (~236 tok)

## app/src/lib/

- `aanbiedingstekst.ts` — Parses the Realworks text format (`<br>`, `**vet**`, `- ` bullets) into blocks and drops the English half; `splitBold` for inline emphasis. (~588 tok)
  - fn `stripMarkers` L21-22 (~21 tok)
  - fn `parseAanbiedingstekst` L23-57 (~252 tok)
  - fn `splitBold` L58-64 (~66 tok)
- `aanbod-content.ts` — Copy + filter options (status, price ranges, sortings), page size and CTA-card position for /aanbod. (~839 tok)
- `aankoop-content.ts` — Exports AANKOOP_HERO, AANKOOP_FACTS, AANKOOP_BENEFITS_IMAGE, AANKOOP_BENEFITS_INTRO + 11 more (~2776 tok)
- `beoordelingen-content.ts` — Copy voor /beoordelingen. Doet dubbel dienst als component-DEFAULTS en seed-bron. (~925 tok)
- `chrome.ts` — Scroll threshold (px) before the topbar gets the stuck state. (~62 tok)
- `cn.ts` — Exports cn (~37 tok)
- `contact-content.ts` — Icons shared by the contact cards and the form aside. (~1741 tok)
- `format.ts` — `euro()`, `longDate()`, `shortDate()` for object data. (~228 tok)
- `funda-reviews.ts` — Pure parser voor de Funda-beoordelingenwidget: HTML -> reviews, paginering, stabiele sleutels. Geen fetch, geen Sanity. (~4510 tok)
  - fn `buildWidgetUrl` L72-93 (~168 tok)
  - fn `decodeEntity` L94-104 (~144 tok)
  - fn `stripTags` L105-145 (~219 tok)
  - fn `parseDutchDate` L146-162 (~145 tok)
  - fn `toIsoDate` L163-168 (~94 tok)
  - fn `parseGrade` L169-185 (~213 tok)
  - fn `reviewKey` L186-199 (~132 tok)
  - fn `reviewDocumentId` L200-205 (~42 tok)
  - fn `escapeForRegExp` L206-210 (~54 tok)
  - fn `labelPattern` L211-219 (~106 tok)
  - fn `subscoreStart` L220-229 (~75 tok)
  - fn `lines` L230-242 (~113 tok)
  - fn `parseReviews` L243-295 (~510 tok)
  - fn `isReply` L296-305 (~98 tok)
  - fn `parseNameAndAddress` L306-315 (~120 tok)
  - fn `parseScores` L316-347 (~341 tok)
  - fn `parseQuote` L348-371 (~203 tok)
  - fn `isEmptyPage` L372-393 (~138 tok)
  - fn `defaultSleep` L394-406 (~160 tok)
  - fn `scrapeFundaReviews` L407-465 (~566 tok)
- `home-content.ts` — Exports HeroSlide, IntroFact, ServiceCard, Review + 6 more (~1046 tok)
- `links.ts` — Resolve a Sanity link/cta object to a usable href. (~258 tok)
- `object-content.ts` — Status labels/tones, back link, makelaar card, CTA copy for the object page. (~518 tok)
  - fn `statusOf` L12-53 (~407 tok)
- `over-ons-content.ts` — Exports Image, OVER_ONS_OPENER, OVER_ONS_DUO, TimelineItem + 10 more (~1949 tok)
- `reviews.ts` — Aggregates die PAGE_QUERY over alle reviews afleidt. Alles kan ontbreken. (~1780 tok)
  - fn `subjectGrades` L63-83 (~210 tok)
  - fn `truncateQuote` L84-109 (~268 tok)
  - fn `gradeDistribution` L110-122 (~124 tok)
  - fn `formatReviewDate` L123-134 (~111 tok)
  - fn `formatGrade` L135-143 (~99 tok)
  - fn `reviewScore` L144-148 (~64 tok)
  - fn `reviewCountLabel` L149-156 (~77 tok)
  - fn `reviewCountNoun` L157-165 (~93 tok)
  - fn `getReviewScrollStep` L166-169 (~30 tok)
  - fn `getReviewProgressWidth` L170-179 (~69 tok)
- `site.ts` — Exports SITE, NavLink, FooterLinkGroup, FOOTER_CERTS, REGIONS (~190 tok)
- `taxatie-content.ts` — Exports TAXATIE_HERO, TAXATIE_FACTS, TAXATIE_BENEFITS_IMAGE, TAXATIE_BENEFITS_INTRO + 14 more (~3127 tok)
- `verkoop-content.ts` — Plain answer text. Optional `link` is inserted before `afterLink`. (~2201 tok)

## app/src/sanity/

- `client.ts` — Exports client (~61 tok)
- `image.ts` — Exports SanityImage, urlFor, imageSrc, toImage (~293 tok)
- `metadata.ts` — Map a page document's `seo` object onto Next metadata. Unset fields fall back to the root layout. (~511 tok)
  - fn `pageMetadata` L23-57 (~353 tok)
- `queries.ts` — Resolve internal page references on link/cta objects. (~1682 tok)
- `sanity.types.ts` — --------------------------------------------------------------------------------- (~19959 tok)
- `schema.json` (~45913 tok)
- `write-client.ts` — Sanity-client met schrijftoken voor server-side routes. Los van client.ts, dat tokenloos blijft. (~268 tok)

## docs/

- `funda-review-scraper.md` — Hoe de scraper werkt, welke env-variabelen hij nodig heeft en wat er nog niet geverifieerd is. (~1621 tok)

## studio-hart-huis/

- `.gitignore` — Git ignore rules (~118 tok)
- `environment.d.ts` — Declareert de SANITY_STUDIO_* env-variabelen; de studio heeft geen @types/node. (~161 tok)
- `eslint.config.mjs` — ESLint flat configuration (~21 tok)
- `package-lock.json` — npm lock file (~171292 tok)
- `package.json` — Node.js package manifest (~306 tok)
- `pnpm-lock.yaml` — pnpm lock file (~109821 tok)
- `README.md` — Project documentation (~131 tok)
- `sanity.cli.ts` — Typegen draait vanuit de studio — de CLI heeft een studio-project-root (~249 tok)
- `sanity.config.ts` (~150 tok)
- `structure.ts` — Exports structure (~675 tok)
- `tsconfig.json` — TypeScript configuration (~120 tok)
- `tsconfig.tsbuildinfo` (~33583 tok)

## studio-hart-huis/.sanity/runtime/

- `app.js` — This file is auto-generated on 'sanity dev' (~88 tok)
- `index.html` — Sanity Studio (~2316 tok)

## studio-hart-huis/schemaTypes/

- `faqType.ts` — Exports faqType (~238 tok)
- `footerType.ts` — Exports footerType (~879 tok)
- `index.ts` — Exports schemaTypes (~870 tok)
- `navigationType.ts` — Exports navigationType (~363 tok)
- `pageBuilderType.ts` — Exports pageBuilderType (~476 tok)
- `pageType.ts` — Exports pageType (~213 tok)
- `reviewType.ts` — Cijfers komen straks uit de scraper; daarom optioneel. (~697 tok)
  - fn `scoreField` L5-79 (~652 tok)
- `woningType.ts` — The "Object" document (house for sale). Flat typed fields for filters/cards + free-form `kenmerkGroepen` table; mirrors the Realworks feed, almost everything optional. (~2608 tok)

## studio-hart-huis/schemaTypes/blocks/

- `aanbodHeaderType.ts` — Exports aanbodHeaderType (~358 tok)
- `assurancesType.ts` — Exports assurancesType (~368 tok)
- `benefitsType.ts` — Exports benefitsType (~682 tok)
- `beoordelingenHeroType.ts` — Opener van /beoordelingen. Het cijfer, het aantal en de staafjes worden (~455 tok)
- `compareCardsType.ts` — Exports compareCardsType (~707 tok)
- `contactFormSectionType.ts` — Exports contactFormSectionType (~846 tok)
- `contactWaysType.ts` — Exports contactWaysType (~530 tok)
- `crossLinksType.ts` — Exports crossLinksType (~319 tok)
- `ctaBandType.ts` — Exports ctaBandType (~334 tok)
- `duoPhotosType.ts` — Exports duoPhotosType (~366 tok)
- `factBarType.ts` — Exports factBarType (~289 tok)
- `faqsType.ts` — Exports faqsType (~264 tok)
- `heroType.ts` — Exports heroType (~626 tok)
- `highlightStripType.ts` — Exports highlightStripType (~409 tok)
- `introType.ts` — Exports introType (~686 tok)
- `listingsType.ts` — Exports listingsType (~320 tok)
- `mediaTextType.ts` — Exports mediaTextType (~341 tok)
- `objectGridType.ts` — Exports objectGridType — CTA-kaart + lege-staat teksten; de woningen komen uit PAGE_QUERY (~315 tok)
- `pageHeroType.ts` — Exports pageHeroType (~479 tok)
- `pageOpenerType.ts` — Exports pageOpenerType (~288 tok)
- `personType.ts` — Exports personType (~561 tok)
- `quoteBandType.ts` — Exports quoteBandType (~363 tok)
- `regionBlockType.ts` — Exports regionBlockType (~342 tok)
- `reviewGridType.ts` — Alle beoordelingen met filters. De reviews worden hier niet geselecteerd: (~268 tok)
- `reviewsType.ts` — Exports reviewsType (~380 tok)
- `routeBlockType.ts` — Exports routeBlockType (~520 tok)
- `servicesType.ts` — Exports servicesType (~685 tok)
- `splitHeroType.ts` — Exports splitHeroType (~429 tok)
- `stepsType.ts` — Exports stepsType (~452 tok)
- `storyType.ts` — Exports storyType (~456 tok)
- `timelineType.ts` — Exports timelineType (~492 tok)
- `uitgelichteReviewType.ts` — Eén beoordeling groot uitgelicht naast een foto. (~288 tok)
- `valueCardsType.ts` — Exports valueCardsType (~469 tok)
- `werkwijzeType.ts` — Donkere uitlegsectie met genummerde punten. (~345 tok)

## studio-hart-huis/schemaTypes/objects/

- `ctaType.ts` — Exports ctaType (~94 tok)
- `linkFields.ts` — Shared internal/external link fields for `link` and `cta` objects. (~407 tok)
- `linkType.ts` — Exports linkType (~54 tok)
- `seoType.ts` — Exports seoType (~231 tok)

## studio-hart-huis/static/

- `.gitkeep` (~22 tok)

## studio-hart-huis/tools/

- `FundaReviewsTool.tsx` — Paneel onder Tools in de linkerkolom dat de scraper-route aanroept, met een testknop die niets wegschrijft. (~1568 tok)
  - fn `describe` L84-101 (~215 tok)
  - fn `FundaReviews` L102-165 (~632 tok)

## template/

- `.DS_Store` (~2186 tok)
