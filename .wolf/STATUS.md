# STATUS — hart-huis

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-08-29

---

## ✅ Done

<!-- Move items here from "🚀 Next phase" when finished. Group by area. -->

**Mediabeheer in de studio (29-08-2026)**
- Nieuw paneel **Media** in de linkerkolom (`structure.ts`, tussen Reviews en Forms): overzicht van álle uploads, zoeken en filteren, detailkolom per bestand, uploaden en verwijderen. Sanity's eigen assetbrowser opent alleen vanuit een veld op een document, dus hiervóór was de bibliotheek als geheel onzichtbaar.
- Drie bestanden: `tools/MediaTool.tsx` (de UI), `tools/mediaData.ts` (de twee GROQ-queries, types en opmaakhulpjes) en `tools/mediaStyles.ts` (inline stijlen naast het bestaande `panelStyles.ts`). Geen plugin, geen nieuwe dependency.
- Zoeken en filteren (alles / afbeeldingen / bestanden / ongebruikt) gebeuren in de browser op de al opgehaalde lijst — geen ronde naar Sanity per toetsaanslag.
- **Verwijderen kan alleen bij nul verwijzingen**, met een bevestigingsstap. Concepten tellen mee als gebruik; het detailpaneel klapt een concept en zijn gepubliceerde versie samen tot één regel met een link (`IntentLink`) naar het document.
- Uploaden via knop of slepen, meerdere tegelijk; afbeeldingen worden een `image`-asset, de rest (pdf) een `file`-asset.
- Documentatie: `docs/mediabeheer.md`, met een verwijzing in de README.
- **Laden gaat in twee trappen.** `ASSETS_QUERY` levert de lijst en het raster staat er meteen; `USAGE_QUERY` (`*[_type in $types && defined(*[references(^._id)][0])]._id`) zoekt daarnáást uit welke bestanden gebruikt worden en vult de labels aan. `defined(…[0])` stopt bij de eerste treffer in plaats van alles te tellen, en levert een lijstje ids in plaats van een veld op elk bestand. Zolang trap 2 loopt: geen labels en het filter "ongebruikt" staat uit; mislukt hij, dan werkt de rest gewoon (het detailpaneel doet zijn eigen, gezaghebbende controle). Het raster rendert 60 kaartjes per keer met een "toon meer".

**`richText`-blok + /privacyverklaring (29-08-2026)**
- Nieuw blok `richText` (`studio-hart-huis/schemaTypes/blocks/richTextType.ts`): Portable Text met H2/H3/citaat, opsommingen, vet/cursief en een linkannotatie die het bestaande `link`-object hergebruikt. Het enige blok in dit project met Portable Text — elk ander tekstblok bewaart prose als `text` en kan geen kop, lijst of link binnen een alinea aan.
- `PAGE_QUERY` klapt de annotaties uit: `_type == "richText" => { body[]{..., markDefs[]${linkExpansion}} }`. `RichText.tsx` levert eigen Tailwind-componenten aan `<PortableText>` (geen `prose`), en zet interne links op next/link, externe op `target="_blank"`, mailto/tel in hetzelfde venster.
- `@portabletext/react` + `@portabletext/types` als directe dependency; ze stonden al in de lockfile via next-sanity, dus alleen twee regels in `package.json`/`package-lock.json`.
- `src/lib/rich-text.ts` is de schrijfvorm voor lange tekst in de repo (`{style}`/`{list}` met `[label](href)` en `**vet**`) plus `toPortableText()`; getest door `npm run check:richtext`.
- `src/lib/privacy-content.ts` bevat een volledige concept-privacyverklaring (AVG) met de verwerkers die echt in deze codebase zitten. **Nog invullen: het KvK-nummer** — het staat letterlijk als `[KvK-nummer invullen]` in de tekst. Laat de tekst juridisch nalopen vóór publicatie.
- Footer: nieuw veld `legalLinks` (array van cta) naast de copyrightregel; die regel was platte tekst met "Algemene voorwaarden · Privacy" erin, nu echte links. `seed:nav` schrijft de privacylink mee.
- **Nog te doen:** `npm run seed:privacy && npm run seed:nav` draaien (in die volgorde — de footerlink zoekt de pagina op slug).

**Makelaarskaart naar Sanity (26-08-2026)** — open punt 3 hieronder is hiermee weg
- `woning` heeft een veld `makelaar` (objecttype, eigen tabblad "Makelaar"): `naam`, `initialen`, `functie`, `tekst`, `telefoon`. De waarden die in `OBJECT_MAKELAAR` stonden zijn de `initialValue`s.
- `WONING_QUERY` selecteert `makelaar`; `toMakelaar()` in `src/lib/object-content.ts` valt **per veld** terug op `OBJECT_MAKELAAR` (die constante blijft dus bestaan als vangnet — de import vult het veld niet). De `tel:`-link wordt afgeleid met `parsePhoneNumber()`, zoals de footer al deed; `phoneHref` staat niet meer in de constante.
- `ObjectSidebar` krijgt de kaart als prop (`makelaar`) in plaats van de constante te importeren.
- **De Realworks-import bewaart het veld** (`bestaand`-projectie + de `createOrReplace` in `/api/import-realworks`), net als foto's en brochure — zonder dat was het na één import-run weg. `docs/realworks-import.md` heeft er een kopje "Makelaar" bij.
- `OBJECT_VIEWING_CTA` is bewust **niet** verhuisd: die staat al in het `objectSettings`-singleton en de gebruiker wilde dat zo houden (zie Decision Log 21-08-2026).

**Rest van de objectpagina-copy naar Sanity (26-08-2026)**
- `objectSettings` heeft nu twee tabbladen: **Bezichtigingsknop** (was er al) en **Onderaan de pagina** met `vergelijkbaar` (bovenkopje, kop, knop) en `ctaBand` — dat laatste hergebruikt het bestaande `ctaBand`-objecttype, dus dezelfde velden als het blok op een gewone pagina.
- `WONING_QUERY` haalt beide op; `similarHeader()` en `ctaBand()` in `aanbod/[slug]/page.tsx` vallen per veld terug op `OBJECT_SIMILAR` / `OBJECT_CTA`. `SimilarObjects` kreeg optionele props met die constanten als defaults, net als elk blok-component.
- Het kantoornummer op de prijskaart komt uit het footerdocument (`"telefoon": *[_id == "footer"][0].contactInfo.phone`), met `SITE.phone` als terugval en de `tel:`-link afgeleid. `SITE` is daarmee ook hier alleen nog vangnet.
- `OBJECT_BACK_LINK` is weg — de "Terug naar het aanbod"-link staat nu gewoon in `ObjectGallery`. /aanbod bestaat, dus de indirectie ("de ene plek om het doel te wijzigen") had geen doel meer.
- **Nog te doen:** `npm run seed:objectpagina` draaien — het document bestaat nog niet, dus tot dan rendert de pagina op de code-defaults. Let bij het nalopen op de primaire knop van de CTA-band: die staat op `#` (zie open punt hieronder).

**JSON-LD: dubbele aggregateRating opgelost (27-08-2026)**
- Google's Rich Results Test gaf "Review heeft meerdere samengestelde beoordelingen". Oorzaak: een validator vult elke `{"@id": …}` in met de knoop zelf, en de organisatie (die de rating draagt) was vanuit één knoop langs twee paden bereikbaar — `WebPage.about` én `WebPage.isPartOf` -> `WebSite.publisher`. Op objectpagina's kwam `Offer.seller` er als derde pad bij, waardoor de rating van het kantoor bínnen de woning (een `Product`) belandde.
- Nu: `about` staat niet meer standaard op de WebPage (het kantoor hangt eraan via `isPartOf` -> `publisher`), de `Offer` heeft geen `seller` meer, en een objectpagina zet `about` op de woning — waar die pagina ook echt over gaat.
- `check:jsonld` bootst het invullen van verwijzingen na en eist per knoop hoogstens één `aggregateRating`, en nul binnen een `Product` of `Offer`. Zie bug-025.
- **Let op — nog een open vraag:** Google beschouwt reviews die een bedrijf over zichzelf publiceert als "self-serving" en toont daar geen reviewfragment voor. Onze cijfers komen van Funda (derde partij), maar dat kan Google niet zien. De `aggregateRating` op de organisatie is dus mogelijk sowieso niet bruikbaar; hem helemaal weglaten is één regel in `organizationJsonLd`.

**JSON-LD uit Sanity (26-08-2026)**
- `src/lib/json-ld.ts` bouwt per pagina één schema.org-graaf met `@id`-verwijzingen; `src/components/JsonLd.tsx` zet hem in de pagina (escapet `<`, zodat een adres het script niet kan afbreken).
- `PageWrapper` rendert de twee knopen die op élke pagina staan: `RealEstateAgent` (#organisatie) en `WebSite` (#website). Adres, telefoon, e-mail, omschrijving, logo en socials komen uit het footer- en navigatiedocument dat de wrapper toch al ophaalt; `site.ts` is alleen nog terugval. De `aggregateRating` komt uit de nieuwe `REVIEW_STATS_QUERY` — dezelfde projectie als /beoordelingen.
- Home en `[slug]` voegen een `WebPage` toe (titel/omschrijving/og:image uit `seo`). Staat er een `faqs`-blok op de pagina, dan is diezelfde knoop óók een `FAQPage` met de vragen erin; `[slug]` krijgt bovendien een kruimelpad Home › pagina.
- De objectpagina levert een `RealEstateListing` (met `datePosted`), een kruimelpad Home › Aanbod › adres en de woning zelf: `[SingleFamilyResidence|Apartment|Residence, Product]` met adres, foto's, oppervlak, kamers, slaapkamers, bouwjaar, perceel/inhoud/energielabel als `additionalProperty`, en een `Offer` met prijs, `k.k.`/`v.o.n.`, `validFrom` en beschikbaarheid uit de status. Geen prijs = geen `Offer`.
- Lege velden vallen weg (`prune`), dus een half ingevuld document geeft geen `"telephone": null`.
- `npm run check:jsonld` (nieuw, `scripts/check-jsonld.ts`) controleert alle vormen zonder Sanity of browser, inclusief `REVIEW_STATS_QUERY` via groq-js.
- **Nog te doen:** de output een keer door de Rich Results Test halen zodra de site staat, en `woning.seo` (zie open punt 7) — de beschrijving valt nu terug op de aanbiedingstekst omdat dat veld nog niet bestaat.

**Realworks-import: media niet meer overschrijven (25-08-2026)**
- De import deed per object een `createOrReplace` met een vers opgebouwde `fotos`-array: alles wat de redactie aan de galerij veranderde (volgorde, alt-teksten) was elke run weg.
- Nu geldt: staan er al foto's op het document, dan blijven die staan en wordt er niets gedownload; heeft de feed er **méér**, dan worden de ontbrekende (op bestandsnaam) achteraan aangevuld met een niet-botsende `_key`. Brochure werkt hetzelfde. De overige velden komen nog volledig uit de feed.
- De mediaplanning (`planMedia`, `vrijeKey`, `zonderBestandsnaam`) staat in `src/lib/realworks.ts` — route-bestanden mogen alleen route-exports hebben — en wordt getest door `npm run check:realworks`.
- Samenvatting en de studio-knop noemen nu ook `fotosBehouden` en `fotosToegevoegd`.
- `check:realworks` was al rood sinds 56b2fc6 (`FOTO_KADER` 1200 tegenover docs/asserts op 2000); 1200 blijft, de rest is gelijkgetrokken. Zie bug-023.
- **Oud aanbod gaat offline (25-08-2026):** aan het eind van elke volledige run worden objecten die *niet* `verkocht`/`voorbehoud` zijn én langer dan twee maanden niet meer zijn bijgewerkt gedepubliceerd (gepubliceerd document weg, concept blijft — net als "Unpublish" in de studio). Drempel: `MAX_STILSTAND_MAANDEN` + `BLIJFT_ONLINE` in `src/lib/realworks.ts`; query `VEROUDERD_QUERY` wordt met groq-js getest in `check:realworks`. `?dryRun=1` toont wat er offline zou gaan; bij `?limit=` gebeurt er niets.
- **Twee gevolgen om te weten:** verwijdert de redactie één foto, dan komt die bij de volgende run terug (feed heeft er dan meer); en vervangt Realworks een foto zonder het aantal te wijzigen, dan ziet de import dat niet — galerij leegmaken in de studio laat hem opnieuw vullen.

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
  - images in `app/public/images/contact/`; het formulier is een `form`-document (zie "Formulieren in Sanity")
  - `POST /api/submit-form` mailt inzendingen via Mailjet
  - reCAPTCHA v2 checkbox is wired: enable it + set the site key under "Form settings"; put the secret in `RECAPTCHA_SECRET_KEY`
  - **before it can send mail:** fill "Form settings" in the studio, or set MAILJET_API_KEY / MAILJET_API_SECRET / CONTACT_ADMIN_EMAIL in `app/.env`
  - **not yet run:** `cd app && npm run seed:sanity` (needs SANITY_API_WRITE_TOKEN) — /over-ons and /taxatie do not exist in Sanity until then

**`hart-en-huis-nvm.html` → /nvm (21-08-2026)**
- **Geen nieuwe blocks.** Alle negen secties komen uit bestaande blocks: `pageHero`, `factBar`, `benefits`, `iconCards`, `werkwijze`, `compareCards`, `faqs`, `crossLinks`, `ctaBand`
- Wat er wél bij kwam: drie line-icons (`diploma`, `shield`, `mail`) in `BlockIcon` + de iconlijsten van `benefits`/`iconCards`; een optionele `cta` op `werkwijze` (de erecode-band heeft een knop); een optionele `cta` op een `compareCards`-kaart (de kaart "makelaar zonder keurmerk" hoort er geen te hebben) plus een `spaceTop`-schakelaar omdat de sectie hier onder een donkere band staat; `iconCards` gaat op tablet naar twee kolommen zodra er meer dan drie kaarten zijn
- images in `app/public/images/nvm/`; copy in `src/lib/nvm-content.ts`
- **nog te seeden:** `npm run seed:nvm && npm run seed:nav`
- `seed:nav` schreef `navLeft` helemaal niet weg (bug-017) — de linkerhelft van de topbar was daardoor leeg. Nu staat er `Verkoop / Aankoop / Taxatie / NVM`, en NVM staat ook in de footer onder Diensten


**`hart-en-huis-lp-zoekopdracht.html` → /zoekopdracht (21-08-2026)**
- **Geen nieuwe blocks, geen nieuwe componenten.** Het `<style>`-blok is byte-identiek aan dat van `!waardebepaling.html`, dus dezelfde zeven blocks: `formHero`, `iconCards`, `numberedSteps`, `personQuote`, `quoteStrip`, `faqs`, `centeredCta`
- copy + formulierdefinitie in `src/lib/zoekopdracht-content.ts`; tweestaps `form`-document `zoekopdracht` (plaats/budget/slaapkamers → naam/mail/tel/termijn/akkoord)
- hero in `app/public/images/zoekopdracht/`; de Dorien-foto is dezelfde als op /waardebepaling en komt uit `/images/contact/dorien.jpg`
- niet aan navigatie gekoppeld, net als /waardebepaling — `seed:nav` hoeft niet
- **nog te seeden:** `npm run seed:zoekopdracht`
- bug-018 meegenomen: `titleAfter` op `formHero` was een dode prop (geen schemaveld, niet doorgegeven in PageBuilder). /waardebepaling miste daardoor ' waard?' in de kop — **`npm run seed:waardebepaling` opnieuw draaien** om dat te herstellen


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

**Mailjet als mailtransport (20-08-2026)**
- `formGeneralSettings` ("Form settings") staat in `studio-hart-huis/schemaTypes/formGeneralSettingsType.ts` en is nu Mailjet-only: `adminEmail`, `fromEmail`, `fromName`, `mailjetApiKey`, `mailjetApiSecret`, de mailteksten en de reCAPTCHA-velden. De Gmail-SMTP-velden en het dode `successMessage` zijn eruit
- `app/src/app/api/submit-form/route.ts` verstuurt via Mailjet's HTTP API (`https://api.mailjet.com/v3.1/send`); nodemailer is verwijderd. Env gaat vóór de Studio-waarden. De afzender moet een door Mailjet gevalideerde afzender zijn, anders weigert Mailjet de mail
- `npm run typegen` gedraaid, `schema.json` + `sanity.types.ts` meegecommit

**`hart-en-huis-lp-waardebepaling_1.html` → /waardebepaling (20-08-2026)**
- Landing page met een tweestaps-aanvraagformulier, niet aan navigatie gekoppeld (per opdracht — `seed:nav` hoeft niet te draaien)
- 6 nieuwe blocks in `src/components/blocks/`, bewust generiek genoemd (herbruikbaar voor andere LP's, niet naar deze pagina vernoemd): `FormHero` (client, wizard-formulier), `IconCards`, `NumberedSteps`, `PersonQuote`, `QuoteStrip`, `CenteredCta`; `faqs` hergebruikt. Zelfde voor de Sanity-typenamen (`formHero`, `iconCards`, `numberedSteps`, `personQuote`, `quoteStrip`, `centeredCta`)

**Formulieren in Sanity (20-08-2026)**
- **één documenttype `form`** (Studio → Forms) met een veld **mode**: `simple` (standaard, platte `fields[]`) of `steps` (`steps[] → fields[]`). Wisselen mag: de andere container blijft staan maar wordt genegeerd
- `@multidots/sanity-plugin-contact-form` is **verwijderd**. We gebruikten alleen zijn schema — zijn React-component en zijn `formGeneralSettings` waren al vervangen — en zijn veldvorm kende geen stappen of kolombreedte. Daarmee zijn ook nodemailer en de `types: (prev) => filter`-hack in sanity.config.ts weg
- versturen gaat **alleen nog via Mailjet** (HTTP API v3.1). `formGeneralSettings` heeft nu `fromEmail`/`fromName` in plaats van de Gmail-SMTP-velden; `successMessage` was dood en is weg
- `FormRenderer` (`src/components/form/`) rendert beide modi én doet reCAPTCHA, verzenden en de bevestiging. `ContactForm` en `FormHero` zijn nu allebei alleen omlijsting — ContactForm is daardoor geen client component meer
- `FORM_QUERY` splitst op `mode` (niet `coalesce`!) omdat een gewisselde modus de andere container laat staan; een allow-list uit de verkeerde container weigert élke inzending. `check:form` bewijst met groq-js dat query en renderer het eens zijn
- **migratie:** `npm run migrate:forms -- --dry-run`, dan zonder vlag. Vervangt elk `contactForm` op zijn plek (zelfde `_id`, dus verwijzingen blijven heel) en schrijft de gegokte kolombreedtes één keer uit. Daarna `seed:contact` + `seed:waardebepaling` voor de knopteksten/bevestigingen, en **Sender address** invullen
- uitleg voor later: `docs/formulieren.md`

**Landingspagina-Boolean → minimale nav (21-08-2026)**
- `page` heeft een nieuw veld `isLandingPage` (studio: "Landingspagina"); elke pagina kan er zo een worden, geen aparte routing nodig
- `SiteHeader` kreeg een `minimal`-prop: verbergt beide `DesktopNav`s en de burger, logo blijft gecentreerd en linkt naar `/`
- `SiteHeader`/`SiteFooter`/`WhatsAppButton` verhuisden uit `layout.tsx` naar een nieuwe `PageWrapper.tsx` (async server component; heette eerst `SiteChrome`, op verzoek hernoemd), omdat de root layout `isLandingPage` niet kon zien — dat komt alleen mee waar `PAGE_QUERY` al gefetcht wordt. `layout.tsx` is nu kaal (html/body/fonts); elke leaf-route wrapt zelf in `<PageWrapper minimal={...}>`: home, `[slug]`, `aanbod/[slug]` (altijd volledige nav) en `not-found.tsx` (altijd volledige nav)
- `npm run typegen` gedraaid, `schema.json` + `sanity.types.ts` meegecommit
- **nog niet geseed op een pagina** — zet `isLandingPage` aan op /waardebepaling en/of /zoekopdracht in de studio om te verifiëren (die twee draaiden al zonder nav-links, dus het zichtbare verschil is klein; test liever eerst op een pagina mét navigatie-items)
- lokale `npm run build` komt niet verder dan het prerenderen omdat `api.sanity.io` niet in de sandbox-egress-allowlist zit — geen regressie, zie cerebrum Do-Not-Repeat 21-08-2026

### Home-blokken automatisch gevuld (2026-08-17)
- `listings` toont de **3 nieuwste woningen** en `reviews` de **8 nieuwste reviews**, beide rechtstreeks uit de dataset — de handmatige selectie is uit `listingsType`/`reviewsType` gehaald
- de kaarten komen via `toListing()` uit `Listings.tsx` (staat daar en niet in `ObjectGrid.tsx`, want die is een client component)
- `seed:home` schrijft de oude `items`/`reviews`-velden niet meer weg; draai hem één keer om ze uit het bestaande home-document te halen
- **regel:** geen `...` in een `_type == "x" => { ... }`-tak van `PAGE_QUERY` — die overschrijft de projecties eromheen

---

**Bezichtigingsformulier op de objectpagina (21-08-2026)**
- De knop op de prijskaart opent een native `<dialog>` met een CMS-formulier: `ObjectContactDialog` (client) + `FormRenderer`
- Nieuw veldtype **Verborgen veld** op `formField`: een `defaultValue` met `{{adres}}`, `{{straat}}`, `{{postcode}}`, `{{plaats}}`, `{{prijs}}` of `{{url}}`. De objectpagina vult die in, zodat in de mail staat om welke woning het gaat. `fillTokens()` staat in `form-fields.ts`, de renderer krijgt er een `context`-prop voor
- Nieuw singleton **Objectpagina** (`objectSettings`): knoptekst, het formulier achter de knop, kop + tekst boven het formulier, en een terugvallink voor als er (nog) geen formulier gekozen is
- `WONING_QUERY` haalt dat document + de reCAPTCHA-instellingen op; de `form->`-projectie is uit PAGE_QUERY gehaald en gedeeld (`formProjection`), en `toFormDefinition()` is van PageBuilder naar `form-fields.ts` verhuisd
- `SITE.baseUrl` toegevoegd (nodig voor `{{url}}`) en meteen hergebruikt in `sitemap.ts` en `robots.ts`
- `check:form` dekt nu ook verborgen velden (rij-indeling, tokens, allow-list)
- **nog te seeden:** `npm run seed:objectpagina`

**Realworks-objecten-import (24-08-2026)**
- `GET /api/import-realworks` haalt `https://api.realworks.nl/wonen/v3/objecten?actief=true` op (header uit `REALWORKS_AUTH_HEADER`) en schrijft `woning`-documenten weg — bijwerken op `realworksId`, `createOrReplace`, dus de feed is de waarheid
- Mapping staat puur in `app/src/lib/realworks.ts`; `npm run check:realworks` draait hem tegen een echte opgeslagen feed (`scripts/fixtures/realworks-objecten.json`, 10 objecten)
- Foto's worden op bestandsnaam hergebruikt uit de Sanity-bibliotheek en anders zes tegelijk geladen; plattegronden blijven eruit, een PDF in de media wordt de brochure
- **24-08-2026:** de media-links geven standaard een thumbnail van 150×100 — er gaat nu `width=2000&height=2000` achter (`FOTO_KADER`), en dat kader zit in de bestandsnaam (`287669985-w2000.jpg`). Wie al geïmporteerd had, moet de import één keer opnieuw draaien; de oude thumbnails blijven als ongebruikte assets in de Media-bibliotheek achter
- Knop **Tools → Realworks-objecten** in de studio (met "Eerst testen"), cron in `vercel.json` op `30 4 * * *`
- `isAuthorized`/`corsHeaders` zijn uit de Funda-route getrokken naar `src/lib/route-auth.ts`; de studioknoppen delen `FUNDA_SCRAPER_SECRET`, de studio-URL staat in `SANITY_STUDIO_REALWORKS_URL`
- Uitleg: `docs/realworks-import.md`
- **nog niet gedraaid tegen productie:** de eerste echte import (11 objecten, ~490 foto's) moet nog. Daarna de zes mock-objecten uit `seed:objecten` weggooien

**Doorsturen na formulierinzending + /bedankt (26-08-2026)**
- `form` heeft op het tabblad **Buttons & confirmation** een schakelaar **Doorsturen na versturen** en, zodra die aanstaat, een **Doorstuurpagina** van het type `link` (interne pagina of externe URL). Success title/body zijn dan verborgen én niet meer verplicht.
- `formProjection` in `PAGE_QUERY`/`WONING_QUERY` levert de velden mee; `toRedirect()` in `src/lib/form-fields.ts` maakt er `{href, internal}` van en `toFormDefinition` hangt dat als `redirect` aan de `FormDefinition`. De `FormRenderer` stuurt pas ná een geslaagde POST door — intern via de Next-router, extern via `window.location.assign` — en blijft ondertussen op `sending` staan zodat er niet twee keer verstuurd kan worden.
- Schakelaar aan maar nog geen pagina gekozen = geen redirect, gewoon de bevestiging. `check:form` (regel 6) bewaakt dat.
- `npm run seed:bedankt` maakt `/bedankt` aan met **alleen bestaande blocks**: pageHero, numberedSteps, iconCards, crossLinks, ctaBand. Copy staat in `src/lib/bedankt-content.ts`, foto's zijn hergebruikt (`/images/contact/kantoor.jpg`, `/images/cta-office.jpg`). Niet aan de navigatie gekoppeld, `seed:nav` hoeft niet.
- `upsertPage()` kan nu een vierde argument `seo` meekrijgen; /bedankt staat daarmee op `noIndex`.
- **nog te seeden:** `npm run seed:bedankt`, daarna in de studio per formulier de schakelaar aanzetten en /bedankt kiezen.

## 🚀 Next phase

**Goal:** Alle designs uit `app/example-designs/` zijn geïmplementeerd (aankoop toegevoegd 18-08-2026, waardebepaling 20-08-2026; nog te seeden: `npm run seed:aankoop && npm run seed:nav`, `npm run seed:waardebepaling`). Wat resteert is afmaken en aanscherpen. **Alle designs uit `app/example-designs/` zijn nu geïmplementeerd** (nvm en zoekopdracht toegevoegd 21-08-2026). Wat resteert is seeden en aanscherpen: `npm run seed:nvm && npm run seed:nav`, `npm run seed:zoekopdracht`, en `npm run seed:waardebepaling` opnieuw vanwege bug-018.

### Open punten
1. **De scraper is lokaal tegen de echte Funda gedraaid (17-08-2026) en klopt: 42 verkoop + 12 aankoop = 54, zonder waarschuwingen** — precies wat de widget zelf noemt. De fixtures zijn nu echte pagina's. Wat resteert vóór de eerste échte run:
   a. `?dryRun=1` draaien op de gedeployde site en de uitkomst nalopen
   b. daarna de 4 mock-reviews uit `seed:home` weggooien — die hebben geen cijfers maar tellen wel mee in `reviewStats`
   c. env zetten: `SANITY_API_WRITE_TOKEN`, `CRON_SECRET`, `FUNDA_SCRAPER_SECRET`, `STUDIO_ORIGIN` op Vercel; `SANITY_STUDIO_SCRAPER_URL` + `SANITY_STUDIO_SCRAPER_SECRET` in de studio
   d. op Hobby is een functie na 60s afgekapt — 14 pagina's × 1,2s wachttijd is ~20s, dus dat past, maar houd het in de gaten als het aantal reviews groeit
2. Met 4 reviews is de "toon meer" van `reviewGrid` (>9) nog niet met echte data uitgeprobeerd.
3. ~~De makelaarskaart op de objectpagina is nog hardcoded~~ — **opgelost 26-08-2026**: veld `makelaar` op `woning`. Een gedeeld makelaar-document (referentie in plaats van vijf losse velden) is pas de moeite zodra er echt meerdere makelaars zijn.
4. `aanbiedingsTekstEngels` wordt opgeslagen en geseed maar nergens gerenderd — er is nog geen taalwissel op de objectpagina.
5. Met 6 objecten is de aanbod-grid "toon meer" (>9) en de CTA-kaart-na-6 nog niet met echte data uitgeprobeerd.
6. `SITE.fundaScore` / `SITE.reviewCount` zijn nu alleen nog fallback; de factBar op /verkoop gebruikt `SITE.fundaScore` nog hardcoded.
7. **`woning` heeft geen `seo`-veld** terwijl `WONING_QUERY` het wél selecteert (`seo: null` in de gegenereerde types) — objectpagina's krijgen dus nooit CMS-SEO. Keuze: veld toevoegen aan het schema zoals `page` dat heeft, of de dode selectie uit de query halen. Zie bug-013.
8. `npm run typegen` faalt op de default node (v17) van deze machine; draai hem met `export PATH="$HOME/.nvm/versions/node/v22.18.0/bin:$PATH"` ervoor.
9. Het bezichtigingsformulier staat nog niet in Sanity: `npm run seed:objectpagina`. Daarna beheert de redactie het formulier, de knop, de kop boven "Vergelijkbare woningen" én de CTA-band zelf (Forms + Objectpagina in de studio). De primaire knop van die CTA-band staat op `#` (was al zo in `OBJECT_CTA`) — na het seeden in de studio naar de zoekopdracht-LP wijzen, of hem hier alvast goedzetten.
11. `npm run check:jsonld` en `npm run check:tekst` zijn rood — al op HEAD, los van het richText-werk. `check:tekst`/`check:jsonld` verwachten een aanbiedingstekst zonder het Engelse deel ("Mooi huis ruime tuin, garage" tegenover "… English Nice house"); de parser of de assertie loopt uit de pas.
10. Na elke schemawijziging `npm run typegen` draaien en `app/src/sanity/{schema.json,sanity.types.ts}` meecommitten — beide staan in git en zijn nu de bron van de types.

## 📁 Active architecture

- **Stack:** _<frameworks, libraries, runtime>_
- **Key tables / modules:** _<list>_
- **Patterns:** _<conventions enforced project-wide>_

---

## ⚠️ External blockers (don't block coding)

- _<env vars, secrets, external accounts, manual steps>_
- **Realworks whitelist't op IP.** Vanaf deze machine werkt de feed (24-08-2026, 11 objecten). Het IP van Vercel — en later van Coolify — moet er nog op, anders komt er een 401/403 of een leeg antwoord terug.
- Op Vercel zetten: `REALWORKS_AUTH_HEADER` (mét het `rwauth `-voorvoegsel), naast de al genoemde `SANITY_API_WRITE_TOKEN`, `CRON_SECRET`, `FUNDA_SCRAPER_SECRET`, `STUDIO_ORIGIN`. In de studio: `SANITY_STUDIO_REALWORKS_URL`.

---

## 🔧 Useful commands

```bash
cd app
npm run check:funda      # parser van de Funda-scraper tegen de fixture
npm run check:reviews    # afgeleide review-cijfers
npm run check:tekst      # Realworks-aanbiedingstekst
npm run check:realworks  # mapping van de Realworks-feed naar `woning`
npm run check:form       # rij-indeling, verborgen velden en de allow-list van CMS-formulieren
npm run seed:sanity      # alle pagina's seeden (vereist SANITY_API_WRITE_TOKEN)
npm run seed:objectpagina # bezichtigingsformulier + de knop op de objectpagina
npm run seed:bedankt     # /bedankt — landingsplek voor "Doorsturen na versturen"

# de scraper uitproberen zonder iets op te slaan
curl -H "x-scraper-secret: $FUNDA_SCRAPER_SECRET" \
  'https://<site>/api/scrape-funda-reviews?dryRun=1'

# de objecten-import uitproberen zonder iets op te slaan
curl -H "x-scraper-secret: $FUNDA_SCRAPER_SECRET" \
  'https://<site>/api/import-realworks?dryRun=1'
```

---

## 📚 References (read IF needed)

- `.wolf/cerebrum.md` — User Preferences + Do-Not-Repeat + Decision Log
- `.wolf/anatomy.md` — token-efficient file index
- `.wolf/buglog.json` — known bugs + fixes
