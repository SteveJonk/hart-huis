# Funda-review-scraper

Haalt de beoordelingen van het Funda-profiel op en zet ze als `review`-documenten
in Sanity. Beide tabbladen (Aankoop en Verkoop) en alle pagina's.

## Hoe het werkt

De scraper gebruikt niet de gewone funda.nl-pagina's — die zitten achter een
bot-challenge — maar de **beoordelingenwidget** die makelaars op hun eigen site
embedden:

```
https://www.funda.nl/beoordelingenwidget/live/{makelaarId}/1/{type}/p{page}/
```

`type` is `aankoop` of `verkoop` (kleine letters), `makelaarId` is `10356` voor
Hart & Huis. Het segment tussen het id en het type is een vaste `1` — het
paginanummer staat achteraan als `p1`, `p2`, … De slash op het eind hoort erbij:
zonder slash antwoordt Funda met een 301. Voorbij de laatste pagina komt er een
gewone 200 terug met "Er zijn geen beoordelingen om te tonen" — dát is het
stopsignaal van de lus, niet de paginering onderaan de widget (die toont maar
een venster van paginanummers).

| Onderdeel | Bestand |
| --- | --- |
| Parser (puur, zonder netwerk) | `app/src/lib/funda-reviews.ts` |
| Route | `app/src/app/api/scrape-funda-reviews/route.ts` |
| Schrijfclient | `app/src/sanity/write-client.ts` |
| Knop in de studio | `studio-hart-huis/tools/FundaReviewsTool.tsx`, ingehangen in `structure.ts` |
| Cron | `app/vercel.json` |
| Test | `app/scripts/check-funda-reviews.ts` (`npm run check:funda`) |

Elke review krijgt een `_id` van `funda-review-<hash>`, waarbij de hash over
type + naam + adres + datum + cijfer gaat. Het cijfer zit erin omdat de rest
niet uniek is: twee bewoners van hetzelfde huis schrijven allebei als "Een funda
gebruiker" op dezelfde dag (Surinamestraat 24, 1 juni 2025). Vallen er ooit tóch
twee op dezelfde sleutel, dan zegt het antwoord dat erbij.

Een tweede run raakt dus dezelfde documenten aan in plaats van kopieën te maken,
en verwijzingen (zoals de uitgelichte review op /beoordelingen) blijven heel.
Funda is de bron: bij een wijziging overschrijft de scraper de tekst en de
cijfers in Sanity.

## Instellen

### Vercel (app)

| Variabele | Waarvoor |
| --- | --- |
| `SANITY_API_WRITE_TOKEN` | schrijven naar Sanity (Editor-rechten) — dezelfde token als de seed-scripts |
| `CRON_SECRET` | Vercel stuurt dit als `Authorization: Bearer …` mee bij de cron |
| `FUNDA_SCRAPER_SECRET` | waarmee de studioknop mag aankloppen |
| `STUDIO_ORIGIN` | komma-gescheiden origins voor CORS; `*.sanity.studio` is al toegestaan |
| `FUNDA_MAKELAAR_ID` | optioneel, standaard `10356` |

De cron staat in `app/vercel.json` op `0 4 * * *` (04:00 UTC, dagelijks).
Zonder `CRON_SECRET` wordt de cron met 401 afgewezen — zet hem dus.

> Op het Hobby-plan is een functie na 60 seconden afgekapt en zijn alleen
> dagelijkse crons toegestaan. De route zet `maxDuration = 300`; dat werkt pas
> vanaf Pro. Loopt hij op Hobby uit de tijd, verlaag dan `delayMs` of draai de
> tabbladen apart met `?type=Verkoop` en `?type=Aankoop`.

### Studio

In `studio-hart-huis/.env`:

```
SANITY_STUDIO_SCRAPER_URL=https://<site>/api/scrape-funda-reviews
SANITY_STUDIO_SCRAPER_SECRET=<zelfde waarde als FUNDA_SCRAPER_SECRET>
```

Daarna staat het in de linkerkolom van de studio onder **Tools → Funda-reviews**,
met een knop "Reviews ophalen" en een knop "Eerst testen" (die schrijft niets weg).

`Tools` is een gewone `S.listItem()` in `structure.ts` met een
`S.component(FundaReviews)` als kind — geen documenttype, dus er hoort geen
schema bij. Komt er later nog zo'n actie bij, dan gaat die in dezelfde lijst.

> Een gedeployde studio is een publieke JS-bundle, dus dit secret is leesbaar
> voor wie ernaar zoekt. Houd het daarom los van `CRON_SECRET`. Het ergste wat
> iemand ermee kan is een scrape starten.

## Uitproberen

```bash
# wat wordt er gevonden, zonder iets op te slaan
curl -H "x-scraper-secret: $FUNDA_SCRAPER_SECRET" \
  'https://<site>/api/scrape-funda-reviews?dryRun=1'

# de ruwe tekst van pagina 1, om de parser te controleren als er 0 uitkomt
curl -H "x-scraper-secret: $FUNDA_SCRAPER_SECRET" \
  'https://<site>/api/scrape-funda-reviews?debug=1'
```

Parameters: `dryRun=1`, `debug=1`, `type=Aankoop|Verkoop`, `maxPages=N`,
`id=<makelaarId>`.

## Wat wel en niet geverifieerd is

Op 17 augustus 2026 is de scraper voor het eerst tegen de echte funda.nl
gedraaid (lokaal, zonder wegschrijven): **42 verkoop- en 12 aankoopreviews over
10 respectievelijk 4 pagina's, zonder waarschuwingen** — precies de aantallen
die de widget zelf bovenaan noemt. Alle 54 hadden een cijfer, een datum en vier
deelcijfers.

De fixtures onder `app/scripts/fixtures/` zijn sindsdien **echte opgeslagen
pagina's** (verkoop p1, verkoop p9 en aankoop p1), dus `npm run check:funda`
draait tegen de HTML zoals Funda die die dag teruggaf. Ververs ze zo:

```bash
curl -s -A 'Mozilla/5.0' \
  'https://www.funda.nl/beoordelingenwidget/live/10356/1/verkoop/p1/' \
  > app/scripts/fixtures/funda-widget-verkoop-p1.html
```

Wat nog aandacht vraagt:

1. **Het sjabloon kan wijzigen.** Levert een pagina 0 reviews op zonder te
   zeggen dat hij leeg is, dan zegt het antwoord "sjabloon gewijzigd?" — draai
   dan `?debug=1` en vergelijk de labels. Twee dingen waar de parser op steunt:
   "Geschreven op" markeert het begin van een blok, en "Reactie van …" markeert
   een reactie van de makelaar (die is géén beoordeling en wordt overgeslagen).

2. **De deelcijfers verschillen per tabblad.** Funda vraagt kopers en verkopers
   andere criteria:

   | Aankoop | Verkoop |
   | --- | --- |
   | Bereikbaarheid en communicatie (`accessibilityAndCommunication`) | |
   | Deskundigheid (`expertise`) | Deskundigheid (`expertise`) |
   | | Lokale marktkennis (`localMarketKnowledge`) |
   | Onderhandeling en resultaat (`negotiationAndResult`) | |
   | Prijs / kwaliteit (`priceQuality`) | Prijs / kwaliteit (`priceQuality`) |
   | | Service en begeleiding (`serviceAndGuidance`) |

   `SUBSCORES` in `app/src/lib/funda-reviews.ts` is één platte lijst van alle
   zes: de parser zoekt gewoon alle labels en wat niet op de pagina staat blijft
   leeg. Bij het wegschrijven wist de route de cijfers van het andere tabblad,
   zodat er geen oude waarde blijft hangen. Welke rijen op de kaart komen
   bepaalt `GRADE_SUBJECTS` in `app/src/lib/reviews.ts`, op `type`. In de studio
   verbergt het schema de velden van het andere type.

3. **De vier mock-reviews uit `npm run seed:home` staan er nog.** Die hebben
   geen cijfers en tellen wel mee in `reviewStats`. Verwijder ze in de studio
   zodra de eerste echte run geslaagd is.
