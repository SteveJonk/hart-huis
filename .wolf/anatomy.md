# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-08-06T10:00:00.158Z
> Files: 129 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.DS_Store` (~2186 tok)
- `.gitignore` — Git ignore rules (~3 tok)
- `AGENTS.md` — OpenWolf (~68 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `README.md` — Project documentation (~72 tok)

## .claude/

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
- `package-lock.json` — npm lock file (~191822 tok)
- `package.json` — Node.js package manifest (~204 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `tailwind.config.ts` — Tailwind CSS configuration (~946 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)
- `tsconfig.tsbuildinfo` (~40428 tok)

## app/public/

- `.DS_Store` (~1640 tok)

## app/scripts/

- `seed-sanity.ts` — Seed Sanity with home + verkoop page builder content, (~5056 tok)
  - fn `key` L64-70 (~46 tok)
  - fn `externalLink` L71-74 (~32 tok)
  - fn `cta` L75-78 (~36 tok)
  - fn `uploadImage` L79-113 (~248 tok)
  - fn `upsertReview` L114-139 (~183 tok)
  - fn `upsertFaq` L140-172 (~280 tok)
  - fn `upsertPage` L173-196 (~189 tok)
  - fn `navLinkExternal` L197-205 (~47 tok)
  - fn `navLinkInternal` L206-214 (~66 tok)
  - fn `pageIdBySlug` L215-221 (~46 tok)
  - fn `upsertNavigation` L222-252 (~248 tok)
  - fn `upsertFooter` L253-291 (~298 tok)
  - fn `buildHomeContent` L292-440 (~1452 tok)
  - fn `buildVerkoopContent` L441-555 (~1133 tok)
  - fn `main` L556-590 (~261 tok)

## app/src/

- `.DS_Store` (~2186 tok)

## app/src/app/

- `globals.css` — Styles: 4 rules, 1 media queries, 1 layers (~140 tok)
- `layout.tsx` — display (~789 tok)
  - fn `asNavLinks` L48-53 (~58 tok)
  - fn `RootLayout` L54-95 (~342 tok)
- `manifest.json` (~125 tok)
- `not-found.tsx` — NotFound (~239 tok)
- `page.tsx` — options (~137 tok)

## app/src/app/[slug]/

- `page.tsx` — options (~298 tok)

## app/src/app/verkoop/

- `page.tsx` — options (~227 tok)

## app/src/components/

- `PageBuilder.tsx` — imageSrc — renders chart (~3810 tok)
  - fn `imageSrc` L37-47 (~82 tok)
  - fn `toImage` L48-57 (~76 tok)
  - fn `toCta` L58-63 (~49 tok)
  - fn `toLabeledLink` L64-71 (~76 tok)
  - fn `renderBlock` L72-411 (~3119 tok)
  - fn `PageBuilder` L412-417 (~60 tok)

## app/src/components/blocks/

- `Benefits.tsx` — DEFAULTS — renders chart (~1106 tok)
  - fn `BenefitIcon` L34-86 (~342 tok)
  - fn `Benefits` L87-134 (~500 tok)
- `CrossLinks.tsx` — DEFAULTS (~634 tok)
  - fn `CrossLinks` L21-63 (~500 tok)
- `CtaBand.tsx` — DEFAULTS (~790 tok)
  - fn `CtaBand` L40-93 (~478 tok)
- `FactBar.tsx` — DEFAULTS (~418 tok)
- `Faq.tsx` — DEFAULTS (~1125 tok)
  - fn `Faq` L33-107 (~880 tok)
- `Hero.tsx` — DEFAULTS (~1815 tok)
  - fn `Hero` L51-196 (~1422 tok)
- `Intro.tsx` — DEFAULTS (~1518 tok)
  - fn `renderHighlightedTitle` L56-79 (~136 tok)
  - fn `Intro` L80-174 (~921 tok)
- `Listings.tsx` — DEFAULT_ITEMS (~1340 tok)
  - fn `ListingCard` L72-117 (~466 tok)
  - fn `Listings` L118-164 (~400 tok)
- `PageHero.tsx` — DEFAULTS (~1142 tok)
  - fn `PageHero` L40-134 (~864 tok)
- `QuoteBand.tsx` — DEFAULTS (~650 tok)
  - fn `QuoteBand` L30-71 (~441 tok)
- `RegionBlock.tsx` — DEFAULTS (~637 tok)
  - fn `RegionBlock` L26-62 (~416 tok)
- `Reviews.tsx` — DEFAULTS (~1781 tok)
  - fn `ReviewCard` L44-75 (~433 tok)
  - fn `Reviews` L76-174 (~1023 tok)
- `Services.tsx` — DEFAULT_ITEMS (~1624 tok)
  - fn `ServiceCardItem` L66-111 (~445 tok)
  - fn `Services` L112-174 (~690 tok)
- `Steps.tsx` — DEFAULTS (~1722 tok)
  - fn `stepImageSrc` L40-43 (~34 tok)
  - fn `Steps` L44-165 (~1399 tok)
- `Stories.tsx` — DEFAULTS (~1018 tok)
  - fn `Stories` L46-120 (~665 tok)
- `VerkoopCta.tsx` — DEFAULTS (~248 tok)

## app/src/components/layout/

- `SiteFooter.tsx` — FooterLinkList (~1120 tok)
  - fn `FooterLinkList` L12-33 (~174 tok)
  - fn `SiteFooter` L34-119 (~873 tok)
- `SiteHeader.tsx` — isActivePath (~1467 tok)
  - fn `isActivePath` L11-15 (~53 tok)
  - fn `DesktopNav` L16-57 (~350 tok)
  - fn `Burger` L58-106 (~321 tok)
  - fn `SiteHeader` L107-166 (~646 tok)
- `WhatsAppButton.tsx` — WhatsAppButton (~445 tok)

## app/src/components/ui/

- `ArrowLink.tsx` — Standalone text link with circular arrow (renders as `<a>`). (~541 tok)
  - fn `ArrowLink` L34-57 (~154 tok)
  - fn `ArrowLinkLabel` L58-73 (~93 tok)
- `Button.tsx` — baseClass (~444 tok)
- `Eyebrow.tsx` — Eyebrow (~150 tok)
- `IconArrow.tsx` — IconArrow (~203 tok)
- `Lead.tsx` — Lead (~92 tok)
- `LogoMark.tsx` — Header mark responds to sticky/mobile; footer is a fixed 90px mark. (~638 tok)
  - fn `LogoMark` L11-74 (~556 tok)
- `Reveal.tsx` — delayClass (~252 tok)
- `RevealLink.tsx` — delayClass (~277 tok)
- `SectionHead.tsx` — SectionHead (~160 tok)
- `Wrap.tsx` — Site content width shell. (~119 tok)

## app/src/hooks/

- `useActiveStep.ts` — Tracks which step list item is closest to ~42% viewport height. (~316 tok)
- `useMobileNav.ts` — Exports useMobileNav (~282 tok)
- `useRevealOnScroll.ts` — Exports useRevealOnScroll (~259 tok)
- `useReviewsCarousel.ts` — Exports useReviewsCarousel (~382 tok)
- `useStickyTopbar.ts` — Exports useStickyTopbar (~138 tok)

## app/src/lib/

- `chrome.ts` — Scroll threshold (px) before the topbar gets the stuck state. (~62 tok)
- `cn.ts` — Exports cn (~37 tok)
- `home-content.ts` — Exports HeroSlide, IntroFact, ServiceCard, Review + 6 more (~1136 tok)
- `links.ts` — Resolve a Sanity link/cta object to a usable href. (~258 tok)
- `reviews.ts` — Gap between review cards in the carousel (matches CSS `gap: 24px`). (~131 tok)
- `site.ts` — Exports SITE, NavLink, FooterLinkGroup, FOOTER_CERTS, REGIONS (~191 tok)
- `verkoop-content.ts` — Plain answer text. Optional `link` is inserted before `afterLink`. (~2190 tok)

## app/src/sanity/

- `client.ts` — Exports client (~61 tok)
- `image.ts` — Exports urlFor (~107 tok)
- `queries.ts` — Resolve internal page references on link/cta objects. (~392 tok)

## studio-hart-huis/

- `.gitignore` — Git ignore rules (~112 tok)
- `eslint.config.mjs` — ESLint flat configuration (~21 tok)
- `package.json` — Node.js package manifest (~238 tok)
- `pnpm-lock.yaml` — pnpm lock file (~109203 tok)
- `README.md` — Project documentation (~131 tok)
- `sanity.cli.ts` — Enable auto-updates for studios. (~98 tok)
- `sanity.config.ts` (~124 tok)
- `structure.ts` — Exports structure (~305 tok)
- `tsconfig.json` — TypeScript configuration (~120 tok)
- `tsconfig.tsbuildinfo` (~36718 tok)

## studio-hart-huis/.sanity/runtime/

- `app.js` — This file is auto-generated on 'sanity dev' (~87 tok)
- `index.html` — Sanity Studio (~2316 tok)

## studio-hart-huis/schemaTypes/

- `faqType.ts` — Exports faqType (~238 tok)
- `footerType.ts` — Exports footerType (~779 tok)
- `index.ts` — Exports schemaTypes (~425 tok)
- `navigationType.ts` — Exports navigationType (~363 tok)
- `pageBuilderType.ts` — Exports pageBuilderType (~225 tok)
- `pageType.ts` — Exports pageType (~189 tok)
- `reviewType.ts` — Exports reviewType (~256 tok)

## studio-hart-huis/schemaTypes/blocks/

- `benefitsType.ts` — Exports benefitsType (~592 tok)
- `crossLinksType.ts` — Exports crossLinksType (~319 tok)
- `ctaBandType.ts` — Exports ctaBandType (~334 tok)
- `factBarType.ts` — Exports factBarType (~289 tok)
- `faqsType.ts` — Exports faqsType (~264 tok)
- `heroType.ts` — Exports heroType (~687 tok)
- `introType.ts` — Exports introType (~686 tok)
- `listingsType.ts` — Exports listingsType (~747 tok)
- `pageHeroType.ts` — Exports pageHeroType (~479 tok)
- `quoteBandType.ts` — Exports quoteBandType (~363 tok)
- `regionBlockType.ts` — Exports regionBlockType (~342 tok)
- `reviewsType.ts` — Exports reviewsType (~374 tok)
- `servicesType.ts` — Exports servicesType (~685 tok)
- `stepsType.ts` — Exports stepsType (~452 tok)
- `storyType.ts` — Exports storyType (~456 tok)

## studio-hart-huis/schemaTypes/objects/

- `ctaType.ts` — Exports ctaType (~94 tok)
- `linkFields.ts` — Shared internal/external link fields for `link` and `cta` objects. (~407 tok)
- `linkType.ts` — Exports linkType (~54 tok)

## studio-hart-huis/static/

- `.gitkeep` (~22 tok)
