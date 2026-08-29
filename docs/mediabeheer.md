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
  nergens gebruikt worden krijgen het label *ongebruikt*.
- **Zoeken** — op bestandsnaam, titel, alt-tekst, omschrijving, extensie en
  mimetype. Elk woord uit de zoekopdracht moet voorkomen, dus "tuin jpg" vindt
  `achtertuin.jpg` maar niet `tuin.png`. Daarnaast een filter op
  afbeeldingen / bestanden / ongebruikt. Beide filteren in de browser: de lijst
  is er al, dus dat scheelt een ronde naar Sanity per toetsaanslag.
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

`count(*[references($id)])`. Dat telt **ook concepten**: een foto die alleen in
een niet-gepubliceerd concept staat geldt als in gebruik, en dat is terecht —
Sanity weigert zo'n asset zelf ook te verwijderen. In de detailkolom worden een
concept en zijn gepubliceerde versie als één document getoond (met de
vermelding *concept* als er alleen een concept is).

In het overzicht staat daarom een ja/nee-label en geen aantal: `references()`
telt het conceptpaar dubbel, dus een getal daar zou niet kloppen met de lijst
in de detailkolom.

## Let op

- Het overzicht doet per bestand een `count(*[references(^._id)])`. Dat is
  precies, maar het is werk voor de server; bij duizenden assets wordt de eerste
  laadtijd merkbaar. Dan is een tweetrapsaanpak (eerst de lijst, daarna de
  gebruikstelling) de volgende stap.
- De Realworks-import laadt foto's opnieuw zodra een object er in de feed méér
  heeft dan in Sanity (zie `docs/realworks-import.md`). Een objectfoto hier
  weggooien terwijl de import hem nog levert, komt dus bij de volgende run
  terug.
- Rechten volgen de ingelogde redacteur: `useClient()` gebruikt diens sessie.
  Wie in Sanity geen assets mag verwijderen, krijgt hier de foutmelding van de
  API te zien.
