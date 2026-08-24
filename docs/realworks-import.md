# Realworks-objecten-import

Haalt het actieve aanbod op bij Realworks en zet het als `woning`-documenten in
Sanity. De feed is de waarheid: een object dat er al staat wordt volledig
overschreven, niet gedupliceerd.

## Hoe het werkt

Eén request:

```
GET https://api.realworks.nl/wonen/v3/objecten?actief=true
Authorization: <REALWORKS_AUTH_HEADER>   # begint met "rwauth "
```

Het antwoord is `{resultaten: [...], paginering: {totaalAantal}}`. Meldt de
paginering meer objecten dan er in `resultaten` staan, dan zegt het antwoord van
de route dat erbij als waarschuwing — er is dan een pagina gemist.

| Onderdeel | Bestand |
| --- | --- |
| Mapping (puur, zonder netwerk) | `app/src/lib/realworks.ts` |
| Route | `app/src/app/api/import-realworks/route.ts` |
| Toegang (cron + studioknop) | `app/src/lib/route-auth.ts` — gedeeld met de Funda-scraper |
| Knop in de studio | `studio-hart-huis/tools/RealworksTool.tsx`, ingehangen in `structure.ts` |
| Cron | `app/vercel.json` |
| Test | `app/scripts/check-realworks.ts` (`npm run check:realworks`) |

### Van feed naar document

De feed levert vrijwel alles als `ENUM_IN_HOOFDLETTERS` of als `null`. `label()`
maakt daar leesbare tekst van (`AAN_RUSTIGE_WEG` → "Aan rustige weg"), met een
handjevol uitzonderingen (`CV_KETEL` → "CV-ketel", `KOSTEN_KOPER` → "k.k.").
Wat `null` of `0` is valt weg, zodat er geen lege regels in de kenmerkentabel
belanden. De groepen van die tabel zijn dezelfde zes als in de mock-seed:
Overdracht, Bouw, Oppervlakten en inhoud, Indeling, Energie, Buitenruimte en
parkeren.

Een paar keuzes die niet uit de veldnamen te raden zijn:

- **`_id`** — bestaande objecten worden gezocht op `realworksId`, niet op slug.
  Verandert het adres, dan werkt de import hetzelfde document bij. Bestaat het
  nog niet, dan wordt het `woning-<slug>` (dezelfde vorm als de seed gebruikte).
- **status** — `ONDER_BOD` telt als `beschikbaar`; het huis is immers nog te
  koop. De kenmerkentabel toont wél "Onder bod". `VERKOCHT_ONDER_VOORBEHOUD`
  wordt `voorbehoud`, `VERKOCHT` en `VERHUURD` worden `verkocht`.
- **foto's** — alleen `HOOFDFOTO` en `FOTO`, hoofdfoto voorop. Plattegronden
  blijven eruit: de objectpagina heeft er geen plek voor. Een `application/pdf`
  in de media wordt de brochure.
- **formaat** — de media-link geeft standaard een **thumbnail van 150×100**.
  Groter kan met `width` én `height` samen; één van de twee alleen doet niets
  (`width=1600` in z'n eentje levert 225×150). De foto wordt binnen dat kader
  geschaald met behoud van verhouding en nooit verder opgeblazen dan het
  origineel — in de praktijk 3000×2000. De import vraagt `width=2000&height=2000`
  (`FOTO_KADER` in `realworks.ts`); Sanity maakt daar zelf de kleinere varianten
  van. De handtekening in `check=api_sha256:…` blijft gewoon geldig, die dekt de
  extra parameters niet af.
- **assets** — foto's worden herkend aan de bestandsnaam uit de link plus het
  kader (`287669985-w2000.jpg`). Staat die al in de Sanity-bibliotheek, dan
  wordt hij hergebruikt en niet opnieuw geladen. Alleen de eerste run is dus
  traag. Verander je `FOTO_KADER`, dan verandert de naam mee en laadt de
  volgende import alles opnieuw in het nieuwe formaat — de oude bestanden
  blijven als ongebruikte assets in de Media-bibliotheek achter en kun je daar
  weggooien.
- **plaatsnaam** — de feed schrijft in kapitalen (`SPAARNDAM`); de import maakt
  er "Spaarndam" van.

## Instellen

### Vercel (app)

| Variabele | Waarvoor |
| --- | --- |
| `REALWORKS_AUTH_HEADER` | de volledige Authorization-header, inclusief `rwauth ` |
| `SANITY_API_WRITE_TOKEN` | schrijven naar Sanity (Editor-rechten) |
| `CRON_SECRET` | Vercel stuurt dit als `Authorization: Bearer …` mee bij de cron |
| `FUNDA_SCRAPER_SECRET` | waarmee de studioknoppen mogen aankloppen (beide tools delen hem) |
| `STUDIO_ORIGIN` | komma-gescheiden origins voor CORS; `*.sanity.studio` is al toegestaan |

De cron staat in `app/vercel.json` op `30 4 * * *` (04:30 UTC, dagelijks) —
een half uur na de Funda-scraper.

> Realworks werkt met een **IP-whitelist**. Draait de import ergens anders
> (Vercel, Coolify, lokaal), dan moet dát IP-adres erop staan, anders komt er
> een 401/403 of een leeg antwoord terug. De route benoemt allebei de gevallen
> in de foutmelding.

> Op het Hobby-plan is een functie na 60 seconden afgekapt. De route zet
> `maxDuration = 300`. De eerste run laadt honderden foto's van elk bijna een
> megabyte en haalt dat vrijwel zeker niet; hij is dan gewoon opnieuw te
> draaien — per object wordt direct weggeschreven en al geladen foto's worden
> hergebruikt. Met `?limit=n` doe je het in porties.

### Studio

In `studio-hart-huis/.env`:

```
SANITY_STUDIO_REALWORKS_URL=https://<site>/api/import-realworks
SANITY_STUDIO_SCRAPER_SECRET=<zelfde waarde als FUNDA_SCRAPER_SECRET>
```

De knop staat in de studio onder **Tools → Realworks-objecten**, met een
"Eerst testen"-knop die niets wegschrijft.

## Handmatig aanroepen

```bash
# kijken wat eruit komt, zonder iets op te slaan
curl -H "x-scraper-secret: $FUNDA_SCRAPER_SECRET" \
  'https://<site>/api/import-realworks?dryRun=1'

# één object importeren
curl -X POST -H "x-scraper-secret: $FUNDA_SCRAPER_SECRET" \
  'https://<site>/api/import-realworks?limit=1'
```

## Wat de import (nog) niet doet

- **Opruimen.** Een object dat uit de feed verdwijnt (verkocht en afgemeld)
  blijft in Sanity staan. Dat is bewust: de site toont verkochte woningen. Wil
  je ze wél laten verdwijnen, dan moet er een stap bij die de woningen zonder
  feed-match op `verkocht` zet of weggooit.
- **Pagineren.** Er wordt één pagina opgehaald. Groeit het aanbod voorbij wat
  Realworks in één antwoord kwijt kan, dan waarschuwt de route erover.
- **De zes mock-objecten uit `npm run seed:objecten`** hebben verzonnen
  `realworksId`s en blijven dus naast het echte aanbod staan. Gooi ze in de
  studio weg zodra de eerste echte import gedraaid heeft.
