# Formulieren

Alle formulieren op de site zijn één Sanity-documenttype: **`form`**, te vinden
onder **Forms** in de studio. Het veld **Type** bepaalt hoe het getoond wordt:

| Type | Wat je krijgt | Gebruikt door |
| --- | --- | --- |
| **Eén pagina** (standaard) | alle velden onder elkaar | het contactformulier op /contact |
| **In stappen** | voortgangsbalk, "Verder"/"Terug", controle per stap | /waardebepaling |

Wisselen kan altijd: de velden van de andere modus blijven bewaard maar worden
genegeerd, dus je kunt terug zonder je werk kwijt te zijn.

> Hiervoor deed `@multidots/sanity-plugin-contact-form` het simpele geval. Die
> plugin is verwijderd: we gebruikten alleen zijn schema (zijn React-component
> en zijn `formGeneralSettings` waren al vervangen), en zijn veldvorm kende geen
> stappen en geen kolombreedte. Zie "Migratie" onderaan.

## Een formulier maken

1. Studio → **Forms** → nieuw document.
2. Vul **Title** (interne naam) en **Form ID** (stabiele sleutel, bv. `contact`)
   in. Zet **Show title** aan als de titel ook op de site moet staan.
3. Kies **Type**. Bij "In stappen" verschijnt **Steps** in plaats van **Fields**.
4. Voeg velden toe. Per veld:
   - **Width** — twee opeenvolgende halve velden delen op desktop één rij.
   - **Placeholder** — bij een dropdown is dit de lege eerste keuze
     ("Maak een keuze"). Laat je hem leeg, dan staat de eerste échte optie
     voorgeselecteerd en heeft "verplicht" dus geen effect.
   - **Help text** en de tekst van een checkbox mogen `[label](/pad)` bevatten;
     dat wordt een echte link.
5. Zet onder **Buttons & confirmation** de knopteksten en de bevestiging die na
   het versturen in de plaats van het formulier komt.
6. Hang het formulier ergens op. Twee blokken hebben een `form`-referentie:
   **Contact form section** (/contact) en **Form hero** (landingspagina's).

Velden toevoegen, herordenen of over een extra stap verdelen kan volledig in de
Studio; daar is geen codewijziging voor nodig.

## Hoe het verstuurd wordt

De browser post het hele formulier — ook bij meerdere stappen, in één keer —
naar `POST /api/submit-form` met het document-`_id` als `formId`. De route haalt
het formulier daarna zelf op met `FORM_QUERY`:

```groq
*[_id == $formId && _type == "form"][0]{
  _id, title,
  "fields": select(
    mode == "steps" => steps[].fields[]{...},
    fields[]{...}
  )
}
```

**Die veldenlijst is de allow-list**: alleen velden die in het document staan
komen in de mail, in document-volgorde. Een `formId` dat naar iets anders wijst
geeft een 404.

Let op dat die query op `mode` splitst en niet simpelweg de eerst gevulde
container pakt. Wisselt iemand de modus, dan blijft de andere container staan;
een allow-list uit de container die de bezoeker níét invulde zou elke inzending
weigeren. `npm run check:form` controleert dat de query en de renderer het eens
blijven.

### Mail

Versturen gaat via de HTTP-API van Mailjet (v3.1); er is geen SMTP/nodemailer
meer. Instellen onder **Form settings**, of — beter voor de sleutels — in de
omgeving van de app, die voorgaat:

| Studio | Env | Nodig |
| --- | --- | --- |
| Admin Email | `CONTACT_ADMIN_EMAIL` | ja, hier komt de mail aan |
| Sender address | `MAILJET_FROM_EMAIL` | valt terug op Admin Email |
| Mailjet API Key | `MAILJET_API_KEY` | ja |
| Mailjet API Secret | `MAILJET_API_SECRET` | ja |
| reCAPTCHA Secret Key | `RECAPTCHA_SECRET_KEY` | alleen als reCAPTCHA aan staat |

De afzender moet een door Mailjet **gevalideerde** afzender zijn, anders weigert
Mailjet de mail. Een dataset is leesbaar voor iedereen die het project-id kent,
dus zet de sleutels in productie in de omgeving en niet in de Studio.

## Waar het in de code zit

| Bestand | Rol |
| --- | --- |
| `app/src/lib/form-fields.ts` | veldvorm, `toSteps()` (modus → één vorm) en `toFieldRows()` (rij-indeling). Geen React, dus testbaar |
| `app/src/components/form/fields.tsx` | rendert één veld, alle negen types, in twee varianten |
| `app/src/components/form/FormRenderer.tsx` | stappen, voortgang, validatie, reCAPTCHA, verzenden, bevestiging |
| `app/src/components/blocks/ContactForm.tsx` | /contact: kop, notitie en de zijkaart rondom de renderer |
| `app/src/components/blocks/FormHero.tsx` | landingspagina: foto, kop, USP's en scorekaart rondom de renderer |

De twee varianten (`stacked` voor de contactpagina, `compact` voor de kaart in
een hero) verschillen alleen in opmaak — veldtypes, validatie en verzenden zijn
voor beide gelijk.

### Drie details die makkelijk terugkomen als bug

- **Alle stappen blijven gemonteerd**, ook de verborgen. Dat moet, anders
  verdwijnen ingevulde antwoorden uit de `FormData`. Daarom staat er
  `noValidate` op het `<form>`: de browser weigert anders te versturen vanwege
  een verplicht veld dat hij niet kan focussen. De validatie gebeurt per stap
  met `reportValidity()`.
- **Veldnamen zijn de sleutels** waaronder een antwoord gemaild wordt. Twee
  velden met dezelfde naam overschrijven elkaar, ook als ze in verschillende
  stappen staan. `check:form` valt daarover.
- **Kolombreedte is redactioneel** (`width`). Documenten van vóór de migratie
  hebben geen breedte; daarvoor valt `toFieldRows()` terug op de oude gok
  (opeenvolgende smalle types naast elkaar), zodat een niet-gemigreerd
  formulier niet ineens één lange kolom wordt.

## Migratie

Eenmalig, voor datasets met nog `contactForm`-documenten:

```bash
npm run migrate:forms -- --dry-run   # laat zien wat er zou veranderen
npm run migrate:forms
```

Elk document wordt **op zijn plek** vervangen: hetzelfde `_id`, dus alle
paginaverwijzingen blijven werken. `_type` is niet te patchen, dus het script
verwijdert en maakt opnieuw aan in één transactie. De kolombreedtes die de oude
front-end gokte worden daarbij één keer uitgerekend en opgeschreven, zodat de
weergave gelijk blijft maar wél redactioneel wordt.

Daarna:

1. vul **Sender address** in onder Form settings;
2. draai `npm run seed:contact` en `npm run seed:waardebepaling` om de echte
   knopteksten en bevestigingen terug te zetten — die stonden vroeger op het
   blok en horen nu bij het formulier.
