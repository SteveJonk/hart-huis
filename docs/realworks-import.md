# Realworks-objecten-import

Haalt het actieve aanbod op bij Realworks en zet het als `woning`-documenten in
Sanity. De feed is de waarheid voor de tekstvelden: een object dat er al staat
wordt overschreven, niet gedupliceerd. De media en de makelaarskaart zijn de
uitzondering — zie "Foto's en brochure" en "Makelaar" hieronder.

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
| Planner (Coolify/Vercel) | zie [Geplande taken](geplande-taken.md) |
| Logboek van de runs | `app/src/lib/cron-log.ts` → **Logs** in de studio |
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
  origineel — in de praktijk 3000×2000. De import vraagt `width=1200&height=1200`
  (`FOTO_KADER` in `realworks.ts`); Sanity maakt daar zelf de kleinere varianten
  van. De handtekening in `check=api_sha256:…` blijft gewoon geldig, die dekt de
  extra parameters niet af.
- **assets** — foto's worden herkend aan de bestandsnaam uit de link plus het
  kader (`287669985-w1200.jpg`). Staat die al in de Sanity-bibliotheek, dan
  wordt hij hergebruikt en niet opnieuw geladen.
### Foto's en brochure

Anders dan de tekstvelden worden de media **niet** elke run opnieuw gezet:

- Staan er al foto's op het document, dan blijven die staan zoals ze zijn —
  inclusief de volgorde en de alt-teksten die de redactie in de studio heeft
  aangepast. Er wordt voor dat object niets gedownload.
- Heeft de feed **méér** foto's dan het document, dan worden alleen de
  ontbrekende (herkend aan de bestandsnaam) achteraan toegevoegd. Zo groeit de
  galerij mee als Realworks er foto's bij zet.
- Een document zonder foto's wordt gewoon gevuld — dat is het geval bij een
  nieuw object en bij de allereerste run.
- De brochure werkt hetzelfde: staat er al een, dan blijft die staan.

Twee gevolgen om te weten. Verwijdert de redactie een foto uit een object en
heeft de feed er daardoor meer dan het document, dan komt die foto er bij de
volgende run weer bij; verwijder in dat geval liever de hele galerij (dan wordt
hij opnieuw uit de feed gevuld) of accepteer het. En vervangt Realworks een
foto zonder het aantal te wijzigen, dan ziet de import dat niet — leeg de
galerij van dat object in de studio om hem opnieuw te laten vullen.

De samenvatting van een run noemt daarom drie getallen: hoeveel foto's er zijn
geladen, hoeveel er behouden zijn, en hoeveel er aangevuld zijn.

### Makelaar

Het veld `makelaar` op een object (tabblad "Makelaar" in de studio) vult de
kaart onder de prijskaart op de objectpagina: naam, initialen, functie, tekst en
telefoonnummer. Realworks levert het niet, dus de redactie zet het zelf — en de
import laat het daarom staan, net als de media. Blijft een veld leeg, dan valt
de kaart voor dat veld terug op `OBJECT_MAKELAAR` in
`src/lib/object-content.ts`; objecten waar niets is ingevuld zien er dus uit
zoals altijd.

### Oud aanbod gaat offline

De feed bevat alleen het actieve aanbod (`actief=true`). Een object dat eruit
verdwijnt wordt dus niet meer bijgewerkt, maar bleef tot nu toe eeuwig op de
site staan. Aan het eind van elke volledige run gaat daarom offline wat aan
beide voorwaarden voldoet:

- **niet verkocht:** twee weken niet meer in de feed;
- **verkocht** (`verkocht` of `voorbehoud`): een maand niet meer in de feed.

Elke run raakt ieder object uit de feed aan, dus een oude `_updatedAt` betekent:
dit object zat al die tijd niet meer in de feed.

Offline halen is in Sanity hetzelfde als "Unpublish" in de studio: het
gepubliceerde document wordt verwijderd, de inhoud blijft als **concept**
bestaan. De redactie kan het dus nakijken of terugzetten, en niets gaat
verloren. De drempels staan in `MAX_STILSTAND_DAGEN` en
`MAX_STILSTAND_VERKOCHT_MAANDEN`, de statuslijst in `VERKOCHT_STATUSSEN`, alles
in `src/lib/realworks.ts`.

### Oude concepten en hun bestanden worden definitief weggegooid

Een concept dat hierna nog **zes maanden** blijft liggen (`MAX_CONCEPT_MAANDEN`
in `src/lib/realworks.ts`) gaat met de volgende volledige run echt weg, dus
ongeveer zes en een halve maand (niet verkocht) of zeven maanden (verkocht)
nadat het object uit Realworks verdween. Het gaat alleen om concepten die:

- een `realworksId` hebben (door de import aangemaakt — handmatig aangemaakte
  woningen blijven altijd staan);
- geen gepubliceerd broertje hebben en niet meer in de feed zitten.

Verkocht of niet maakt hier geen verschil.

De klok loopt vanaf het moment dat het concept is aangemaakt, dus vanaf het
offline halen; opent de redactie het concept en slaat hij het op, dan begint de
termijn opnieuw.

**Foto's en brochure gaan mee, maar alleen als niets anders ze gebruikt.** De
import hergebruikt assets op bestandsnaam, dus een foto kan door meerdere
documenten worden gedeeld. Per asset wordt nagekeken of er buiten de te
verwijderen documenten nog een verwijzing naar bestaat; zo ja, dan blijft hij
staan. De documenten worden eerst weggegooid, daarna de assets (Sanity weigert
een asset zolang er nog naar verwezen wordt). Lukt een asset niet, dan komt er
een waarschuwing in het antwoord en in de cron-log.

Komt een object dat offline was weer terug in de feed, dan wordt het concept
onder het gepubliceerde id teruggezet en het concept weggegooid, zodat het
object ook weer online staat.

Drie dingen om te weten:

- Met `?dryRun=1` krijg je te zien wát er offline zou gaan, wat er definitief
  zou verdwijnen (`verwijderd`, `verwijderdeObjecten`) en hoeveel bestanden
  (`assetsVerwijderd`), zonder dat het gebeurt.
- Met `?limit=` wordt er niets offline gehaald of verwijderd: er is dan maar een
  deel van de feed bijgewerkt, dus `_updatedAt` zegt niets meer.
- Weggooien kan niet ongedaan worden gemaakt. Draai na het uitrollen eerst een
  `?dryRun=1` en loop de lijst na.

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

- **Pagineren.** Er wordt één pagina opgehaald. Groeit het aanbod voorbij wat
  Realworks in één antwoord kwijt kan, dan waarschuwt de route erover.
- **De zes mock-objecten uit `npm run seed:objecten`** hebben verzonnen
  `realworksId`s en blijven dus naast het echte aanbod staan. Gooi ze in de
  studio weg zodra de eerste echte import gedraaid heeft.
