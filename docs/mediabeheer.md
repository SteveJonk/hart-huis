# Mediabeheer in de studio

Sanity's eigen assetbrowser opent alleen vanuit een afbeeldings- of bestandsveld
op een document. Daardoor is er standaard geen manier om te zien wát er in de
mediabibliotheek staat, en al helemaal niet om iets weg te gooien dat nergens
meer gebruikt wordt. Het paneel **Media** in de linkerkolom van de studio vult
dat gat.

## Waar het staat

`studio-hart-huis/structure.ts` hangt het als `S.component(MediaBeheer)` tussen
Reviews en Forms — een eigen ingang, geen documenttype. De code zit in:

| Bestand | Inhoud |
| --- | --- |
| `tools/MediaTool.tsx` | het paneel: raster, zoeken, detailkolom, uploaden, verwijderen |
| `tools/mediaData.ts` | de twee GROQ-queries, de types en de opmaakhulpjes |
| `tools/mediaStyles.ts` | inline stijlen, aanvullend op `tools/panelStyles.ts` |

## Wat het kan

- **Overzicht** — alle `sanity.imageAsset`- en `sanity.fileAsset`-documenten,
  nieuwste eerst, als miniaturen met naam en bestandsgrootte. Bestanden die
  nergens gebruikt worden krijgen het label *ongebruikt*. Het raster toont 60
  kaartjes tegelijk, met een *toon meer* eronder.
- **Zoeken** — op bestandsnaam, titel, alt-tekst, omschrijving, extensie en
  mimetype. Elk woord uit de zoekopdracht moet voorkomen, dus "tuin jpg" vindt
  `achtertuin.jpg` maar niet `tuin.png`. Daarnaast een filter op
  afbeeldingen / bestanden / ongebruikt.
- **Detail** — klik een bestand aan voor bestandsnaam, titel, alt-tekst,
  omschrijving, soort, mimetype, afmetingen, grootte, upload- en wijzigdatum,
  het document-id en een link naar het origineel. Daaronder staan de documenten
  die het bestand gebruiken, elk met een link die het document opent.
- **Toevoegen** — knop of slepen naar het vlak bovenaan. Meerdere bestanden
  tegelijk kan; afbeeldingen gaan als `image`-asset naar Sanity, de rest (pdf
  bijvoorbeeld) als `file`-asset.
- **Verwijderen** — alleen als geen enkel document naar het bestand verwijst.
  De knop staat er niet bij een bestand dat in gebruik is, en er zit een
  bevestigingsstap tussen. Verwijderen is definitief; Sanity kent geen
  prullenbak voor assets.

## Wat "in gebruik" betekent

Er verwijst minstens één document naar het bestand — `references($id)`. Dat
geldt **ook voor concepten**: een foto die alleen in een niet-gepubliceerd
concept staat is in gebruik, en dat is terecht, want Sanity weigert zo'n asset
zelf ook te verwijderen. In de detailkolom worden een concept en zijn
gepubliceerde versie als één document getoond (met de vermelding *concept* als
er alleen een concept is).

In het overzicht staat een ja/nee-label en geen aantal: `references()` telt het
conceptpaar dubbel, dus een getal daar zou niet kloppen met de lijst in de
detailkolom.

## Hoe het laadt: twee trappen

Uitzoeken waar een bestand gebruikt wordt is het dure deel — dat moet per
bestand door de hele dataset. Daarom staat het niet in de weg:

1. `ASSETS_QUERY` haalt de lijst op (alleen de velden die een kaartje en het
   zoekveld nodig hebben; niet `metadata`, want daar zit per afbeelding een
   base64-lqip en een kleurenpalet in). Het raster staat daarmee meteen op het
   scherm.
2. `USAGE_QUERY` draait daarnáást en levert alleen de *ids* van bestanden waar
   iets naar verwijst: `*[_type in $types && defined(*[references(^._id)][0])]._id`.
   `defined(…[0])` hoeft maar tot de eerste treffer te zoeken in plaats van alle
   verwijzingen te tellen, en het antwoord is een lijstje strings in plaats van
   een extra veld op elk bestand.

Zolang stap 2 loopt tonen de kaartjes geen label en staat het filter
*ongebruikt* uit. Mislukt stap 2, dan blijven de labels weg en werkt de rest
gewoon door — het detailpaneel doet bij het openen van een bestand zijn eigen
controle, en dát is de telling waar de verwijderknop op afgaat.

Zoeken en filteren gebeuren in de browser op de al opgehaalde lijst: geen ronde
naar Sanity per toetsaanslag.

## Let op

- De gebruikstelling blijft werk voor de server, ook in twee trappen. Bij
  duizenden assets kan het label *ongebruikt* dus een paar tellen later
  verschijnen dan het raster. Dat is de bedoeling; wachten hoeft niet.
- De Realworks-import laadt foto's opnieuw zodra een object er in de feed méér
  heeft dan in Sanity (zie `docs/realworks-import.md`). Een objectfoto hier
  weggooien terwijl de import hem nog levert, komt dus bij de volgende run
  terug.
- Rechten volgen de ingelogde redacteur: `useClient()` gebruikt diens sessie.
  Wie in Sanity geen assets mag verwijderen, krijgt hier de foutmelding van de
  API te zien.
