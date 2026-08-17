# Funda-review-scraper

Haalt de beoordelingen van het Funda-profiel op en zet ze als `review`-documenten
in Sanity. Beide tabbladen (Aankoop en Verkoop) en alle pagina's.

## Hoe het werkt

De scraper gebruikt niet de gewone funda.nl-pagina's — die zitten achter een
bot-challenge — maar de **beoordelingenwidget** die makelaars op hun eigen site
embedden:

```
https://www.funda.nl/beoordelingenwidget/{makelaarId}/{page}/{colors}/{type}
```

`type` is `Aankoop` of `Verkoop`, `makelaarId` is `10356` voor Hart & Huis.

| Onderdeel | Bestand |
| --- | --- |
| Parser (puur, zonder netwerk) | `app/src/lib/funda-reviews.ts` |
| Route | `app/src/app/api/scrape-funda-reviews/route.ts` |
| Schrijfclient | `app/src/sanity/write-client.ts` |
| Knop in de studio | `studio-hart-huis/tools/FundaReviewsTool.tsx`, ingehangen in `structure.ts` |
| Cron | `app/vercel.json` |
| Test | `app/scripts/check-funda-reviews.ts` (`npm run check:funda`) |

Elke review krijgt een `_id` van `funda-review-<hash>`, waarbij de hash over
type + naam + adres + datum gaat. Een tweede run raakt dus dezelfde documenten
aan in plaats van kopieën te maken, en verwijzingen (zoals de uitgelichte
review op /beoordelingen) blijven heel. Funda is de bron: bij een wijziging
overschrijft de scraper de tekst en de cijfers in Sanity.

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
`id=<makelaarId>`, `colors=<widgetkleuren>`.

## Wat nog niet geverifieerd is

funda.nl was niet bereikbaar vanuit de omgeving waarin dit gebouwd is (de
egress-proxy blokkeert de host), dus:

1. **De HTML-structuur is afgeleid uit het scrape-script, niet uit funda.nl.**
   `app/scripts/fixtures/funda-widget.html` is een nagebouwde pagina. De test
   bewijst dat de parser doet wat hij belooft op die structuur — niet dat die
   structuur klopt. Sla een echte pagina op over de fixture heen en draai
   `npm run check:funda` opnieuw:

   ```bash
   curl -s 'https://www.funda.nl/beoordelingenwidget/10356/1/3=D7C3B9;6=61/Verkoop' \
     > app/scripts/fixtures/funda-widget.html
   ```

2. **Of het paginanummer in de widget-URL werkt, is onbevestigd.** De scraper
   vertrouwt er niet op: zodra een pagina alleen reviews oplevert die hij al
   heeft, stopt hij en zet er een waarschuwing bij in het antwoord. Blijkt de
   paginering niet te werken, dan zie je dat terug als "pagina 2 herhaalde
   pagina 1" plus een verdacht laag aantal reviews.

3. **De vier deelcijfers heten nu zoals Funda ze uitvraagt.** Het schema had
   `negotiationAndResult` ("Onderhandeling en resultaat"), maar de widget levert
   *Deskundigheid, Lokale marktkennis, Prijs / kwaliteit, Service en
   begeleiding*. Het veld heet daarom nu `serviceAndGuidance`; de route ruimt
   het oude veld op bij het wegschrijven.

4. **De vier mock-reviews uit `npm run seed:home` staan er nog.** Die hebben
   geen cijfers en tellen wel mee in `reviewStats`. Verwijder ze in de studio
   zodra de eerste echte run geslaagd is.
