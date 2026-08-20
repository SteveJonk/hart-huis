# Formulieren

Er zijn twee formuliersoorten in Sanity. Ze delen de render- en verzendlaag, dus
een veld gedraagt zich in beide hetzelfde.

| Soort | Sanity-type | Waar te vinden | Voor |
| --- | --- | --- | --- |
| Eén pagina | `contactForm` (plugin) | Studio → **Forms** | het contactformulier op /contact |
| Meerdere stappen | `multiStepForm` (eigen) | Studio → **Multi-step forms** | landingspagina's, bv. /waardebepaling |

Een `multiStepForm` met één stap is een gewoon formulier — de voortgangsbalk en
de knop "Verder" verschijnen pas vanaf twee stappen.

## Een multi-step formulier maken

1. Studio → **Multi-step forms** → nieuw document.
2. Vul **Title** (interne naam) en **Form ID** (stabiele sleutel, bv.
   `waardebepaling`) in.
3. Voeg onder **Steps** per stap velden toe. Per veld:
   - **Width** — twee opeenvolgende halve velden delen op desktop één rij.
   - **Placeholder** — bij een dropdown is dit de lege eerste keuze
     ("Maak een keuze"). Laat je hem leeg, dan staat de eerste échte optie
     voorgeselecteerd, en heeft "verplicht" dus geen effect.
   - **Help text** en de tekst van een checkbox mogen `[label](/pad)` bevatten;
     dat wordt een echte link.
4. Zet onder **Buttons & confirmation** de knopteksten en de bevestiging die na
   het versturen in de plaats van het formulier komt.
5. Hang het formulier ergens op: het blok **Form hero** heeft een
   `form`-referentie. Andere blokken kunnen dezelfde referentie krijgen — de
   `MultiStepForm`-component is niet aan dat ene blok gebonden.

Velden toevoegen, herordenen of over een extra stap verdelen kan volledig in de
Studio; daar is geen codewijziging voor nodig.

## Hoe het verstuurd wordt

Beide soorten posten naar `POST /api/submit-form` met een `formId` (het
document-`_id`). De route haalt het formulier daarna zelf op met `FORM_QUERY`:

```groq
*[_id == $formId && (_type == "contactForm" || _type == "multiStepForm")][0]{
  _id, title,
  "fields": coalesce(fields[]{...}, steps[].fields[]{...})
}
```

`coalesce` maakt de twee soorten één platte lijst: `contactForm` heeft `fields`
in de root, `multiStepForm` verdeelt ze over `steps`. **Die lijst is de
allow-list**: alleen velden die in het document staan komen in de mail, in
document-volgorde. Een `formId` dat naar iets anders wijst geeft een 404.

Mailinstellingen (afzender, Mailjet/SMTP, reCAPTCHA) staan los in
**Form settings** en gelden voor beide soorten. Zie
`app/src/app/api/submit-form/route.ts`.

## Waar het in de code zit

| Bestand | Rol |
| --- | --- |
| `app/src/lib/form-fields.ts` | veldvorm + `toFieldRows()` (rij-indeling). Geen React, dus testbaar |
| `app/src/components/form/fields.tsx` | rendert één veld; `stacked` (contactpagina) en `compact` (kaart) |
| `app/src/components/form/MultiStepForm.tsx` | stappen, voortgang, validatie, verzenden, bevestiging |
| `app/src/components/blocks/FormHero.tsx` | alleen de omlijsting: foto, kop, USP's, scorekaart |
| `app/src/components/blocks/ContactForm.tsx` | de contactpagina-variant, met reCAPTCHA en de zijkaart |

`npm run check:form` dekt de rij-indeling van beide soorten en controleert dat
veldnamen binnen een formulier uniek zijn.

### Twee details die makkelijk terugkomen als bug

- **Alle stappen blijven gemonteerd**, ook de verborgen. Dat moet, anders
  verdwijnen ingevulde antwoorden uit de `FormData`. Daarom staat er
  `noValidate` op het `<form>`: de browser weigert anders te versturen vanwege
  een verplicht veld dat hij niet kan focussen. De validatie gebeurt per stap
  met `reportValidity()`.
- **Veldnamen zijn de sleutels** waaronder een antwoord gemaild wordt. Twee
  velden met dezelfde naam overschrijven elkaar, ook als ze in verschillende
  stappen staan. `check:form` valt daarover.
