# Geplande taken (cron)

Twee importroutes horen elke nacht te draaien:

| Taak | Route | Wanneer |
| --- | --- | --- |
| Funda-reviews | `/api/scrape-funda-reviews` | 04:00 UTC |
| Realworks-objecten | `/api/import-realworks` | 04:30 UTC |

De routes doen het werk; de planner is niets meer dan iets dat ze op tijd
aanroept met de juiste header. Dat kan op drie manieren, en ze sluiten elkaar
uit — **zet er precies één aan**, anders draait elke import dubbel.

## Toegang

Beide routes accepteren twee sleutels (zie `app/src/lib/route-auth.ts`):

| Header | Variabele | Voor wie |
| --- | --- | --- |
| `Authorization: Bearer …` | `CRON_SECRET` | de planner |
| `x-scraper-secret: …` | `FUNDA_SCRAPER_SECRET` | de knoppen in de studio |

Ze staan los van elkaar omdat een gedeployde studio een publieke JS-bundle is:
die tweede sleutel is leesbaar voor wie zoekt, en mag dus niet dezelfde zijn.

## Optie 1 — Coolify (self-hosted)

Coolify voert een geplande taak uit *in* de container. Het `node:22-alpine`-image
bevat **geen `curl`** — maar node zit er natuurlijk wel in, en die heeft sinds
v18 een ingebouwde `fetch`. Daarvoor is `app/cron.mjs` er: geen dependencies,
leesbare uitvoer in het takenlogboek van Coolify, en exitcode 1 als de run
mislukt zodat Coolify hem rood kleurt.

Instellen onder **Application → Scheduled Tasks**:

| Veld | Reviews | Realworks |
| --- | --- | --- |
| Name | `funda-reviews` | `realworks-objecten` |
| Command | `node cron.mjs reviews` | `node cron.mjs realworks` |
| Frequency | `0 4 * * *` | `30 4 * * *` |
| Container | de app-container | de app-container |

Zet in de omgevingsvariabelen van de app: `CRON_SECRET` (verzin een lange
waarde), naast de bestaande `SANITY_API_WRITE_TOKEN` en
`REALWORKS_AUTH_HEADER`.

Het verzoek gaat standaard naar `http://127.0.0.1:3000` — binnen de container,
dus het hoeft het internet niet op en er is geen CORS in het spel. Luistert de
app elders, zet dan `CRON_TARGET_URL`.

Uitproberen zonder iets weg te schrijven:

```bash
docker exec <container> node cron.mjs realworks --dry-run
```

> Op een eigen server geldt de time-out van 60s van Vercels Hobby-plan niet. De
> `maxDuration = 300` in de routes is een Vercel-instelling en doet hier niets;
> de eerste Realworks-import (honderden foto's) mag dus gewoon zolang duren als
> nodig. `cron.mjs` breekt zelf pas na 15 minuten af (`CRON_TIMEOUT_MS`).

### Zonder het script

Kan ook, als je liever niets aan het image toevoegt — busybox in alpine heeft
een uitgeklede `wget` (niet geverifieerd in dit project, even nakijken met
`docker exec <container> wget --version`):

```bash
node -e "fetch('http://127.0.0.1:3000/api/import-realworks',{method:'POST',headers:{authorization:'Bearer '+process.env.CRON_SECRET}}).then(r=>r.text()).then(console.log)"
```

Let op: allebei deze varianten melden een lege Realworks-feed **niet** als fout.
De route antwoordt dan met HTTP 200 én `ok: false`, en daar kijkt `cron.mjs`
wél naar.

## Optie 2 — Vercel

`app/vercel.json` bevat de twee crons. Vercel stuurt automatisch
`Authorization: Bearer $CRON_SECRET` mee; er is verder niets in te stellen
behalve de omgevingsvariabelen. Verhuist het project naar Coolify, haal de
`crons`-sleutel dan uit `vercel.json` weg.

## Optie 3 — Sanity Scheduled Functions

Sanity heeft dit sinds kort zelf (`defineScheduledFunction` in
`@sanity/blueprints`), en een functie die niets anders doet dan deze routes
aanroepen zou prima kunnen. **Nog niet gebruiken:** de typedefinities van het
pakket zelf zeggen er nog bij dat het experimenteel is —

> `@alpha Deploying Scheduled Functions via Blueprints is experimental. This
> feature is not available publicly yet.`

Bovendien vereist een scheduled function een blueprint die op **organisatie**-
niveau staat, niet op projectniveau. Zodra het uit alpha is, is het een kleine
stap: een `sanity.blueprint.ts` met twee `defineScheduledFunction`-resources,
elk met een handler van drie regels die `fetch` doet.

## Wat er is gedraaid, nakijken

Elke run — via de planner én via de knoppen in de studio — schrijft een
`cronLog`-document. In de studio staat dat onder **Logs** in de linkerkolom:
per run het tijdstip, wie hem startte, hoe lang hij duurde, de samenvatting,
de waarschuwingen en de eventuele foutmelding. Per taak blijven de laatste 200
runs bewaard, daarna ruimt de route de oudste zelf op.

Dat is er expres bij gebouwd: Vercel en Coolify houden allebei hun eigen logs
bij, maar die zijn niet vanuit de studio te zien — en juist de redactie merkt
als eerste dat er iets niet is bijgewerkt.

| Onderdeel | Bestand |
| --- | --- |
| Wegschrijven + opruimen | `app/src/lib/cron-log.ts` |
| Documenttype | `studio-hart-huis/schemaTypes/cronLogType.ts` |
| Paneel in de studio | `studio-hart-huis/tools/LogsTool.tsx` + `logsData.ts` |
| Aanroeper voor een planner | `app/cron.mjs` |
