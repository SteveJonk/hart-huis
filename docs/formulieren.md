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
   het versturen in de plaats van het formulier komt. Wil je liever
   doorsturen naar een aparte pagina, zie **Doorsturen na versturen**
   hieronder.
6. Hang het formulier ergens op. Twee blokken hebben een `form`-referentie:
   **Contact form section** (/contact) en **Form hero** (landingspagina's).

Velden toevoegen, herordenen of over een extra stap verdelen kan volledig in de
Studio; daar is geen codewijziging voor nodig.

## Doorsturen na versturen

Standaard blijft de bezoeker staan waar hij is en komt de bevestiging
(**Success title** / **Success body**) in de plaats van het formulier.

Zet je op het tabblad **Buttons & confirmation** de schakelaar **Doorsturen na
versturen** aan, dan verschijnt daaronder **Doorstuurpagina**: dezelfde
link-keuze als overal op de site — een pagina op deze site (*Internal page*) of
een externe URL. De bevestigingsvelden verdwijnen dan uit beeld en zijn ook niet
meer verplicht: ze worden immers nooit getoond.

Het doorsturen gebeurt pas ná een geslaagde inzending. Mislukt het versturen,
dan blijft de bezoeker met zijn ingevulde antwoorden op het formulier staan en
verschijnt de foutmelding. Een interne pagina gaat via de Next-router (geen
volledige herlaadbeurt); alles wat daar niet in past — een volledige URL,
`mailto:` of `tel:` — gaat via de browser.

Staat de schakelaar aan maar is er nog geen pagina gekozen, dan valt het
formulier terug op de bevestiging. Een bezoeker blijft zo nooit op een
verstuurd formulier hangen. `check:form` bewaakt die regel.

De bijbehorende bedankpagina zit als seed in de repo:
`npm run seed:bedankt` maakt `/bedankt` aan (pageHero, numberedSteps,
iconCards, crossLinks, ctaBand — allemaal bestaande blocks, en `noIndex` aan).
Koppelen doe je daarna in de studio.

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

#### Per formulier: tabblad **Mail**

Ontvanger, onderwerp en bericht kunnen per formulier anders. Staat het veld leeg,
dan geldt de instelling uit Form settings.

| Veld | Wat het doet |
| --- | --- |
| **Ontvangers** | waar déze inzending heen gaat; meerdere adressen gescheiden door een komma (of puntkomma). Leeg = Admin Email |
| **Onderwerp** / **Bericht** | onderwerp en introtekst boven de antwoordtabel. Leeg = de teksten uit Form settings |
| **Stuur ook een mail naar de invuller** | zet de bevestigingsmail aan |
| **Onderwerp / Bericht (mail naar invuller)** | de teksten van díé mail; verplicht zodra de schakelaar aan staat |

De bevestigingsmail gaat naar het **eerste veld van het type E-mail** in het
formulier. Heeft het formulier zo'n veld niet, of vulde de bezoeker het niet in,
dan gebeurt er niets. Hij bevat dezelfde antwoordtabel, maar geen bijlagen. Gaat
hij mis, dan wordt dat gelogd en niet aan de bezoeker gemeld — de inzending zelf
is dan immers al gelukt.

## Waar het in de code zit

| Bestand | Rol |
| --- | --- |
| `app/src/lib/form-fields.ts` | veldvorm, `toSteps()` (modus → één vorm), `toFieldRows()` (rij-indeling) en `toRedirect()` (doorsturen). Geen React, dus testbaar |
| `app/src/components/form/fields.tsx` | rendert één veld, alle negen types, in twee varianten |
| `app/src/components/form/FormRenderer.tsx` | stappen, voortgang, validatie, reCAPTCHA, verzenden, bevestiging of doorsturen |
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

`_type` is onveranderlijk, en Sanity ziet een delete + create van hetzelfde
`_id` binnen één transactie als een wijziging daarvan ("immutable attribute
`_type` may not be modified"). Het `_id` kan dus niet blijven. Het script maakt
daarom eerst het nieuwe `form`-document aan (`form-<id>`, bv. `form-contact`),
zet dan **elke verwijzing** ernaartoe om, en verwijdert het oude document pas
daarna — zo wijst geen enkele pagina ooit naar iets dat er niet is.

Verder:

- **opnieuw draaien mag.** Een formulier wordt gematcht op zijn `id`-veld, dus
  een tweede run werkt hetzelfde document bij in plaats van er nog één te maken.
  Draaide je `seed:contact` al vóór de migratie, dan wordt dát document
  gebruikt en komt er geen dubbele bij.
- **concepten verhuizen mee.** Onpublished bewerkingen (`drafts.…`) worden mee
  omgezet, zodat niemand werk kwijtraakt.
- er wordt eerst een back-up van de originelen weggeschreven naar
  `app/form-migration-backup-<tijd>.json` (staat in `.gitignore`).
- de kolombreedtes die de oude front-end gokte worden één keer uitgerekend en
  opgeschreven, zodat de weergave gelijk blijft maar wél redactioneel wordt.

De omzetting zelf (`scripts/form-migration.ts`) bevat geen Sanity-client en
wordt door `npm run check:form` getest: de rij-indeling moet identiek blijven en
verwijzingen moeten allemaal meeverhuizen.

Daarna:

1. vul **Sender address** in onder Form settings;
2. draai `npm run seed:contact` en `npm run seed:waardebepaling` om de echte
   knopteksten en bevestigingen terug te zetten — die stonden vroeger op het
   blok en horen nu bij het formulier.
