/**
 * Copy voor /privacyverklaring.
 *
 * Twee bestaande blocks (`pageOpener`, `ctaBand`) met daartussen het nieuwe
 * `richText`-blok — het enige blok in dit project dat koppen, opsommingen en
 * links binnen een alinea aankan.
 *
 * LET OP — dit is een ingevulde concepttekst, geen juridisch advies. Loop hem
 * na met de eigen praktijk vóór publicatie, en vul in elk geval de plekken in
 * die letterlijk tussen [rechte haken] staan. De genoemde verwerkers komen uit
 * deze codebase (Vercel, Sanity, Mailjet, Google reCAPTCHA, Realworks, Funda);
 * gebruik je er meer of minder, pas dan artikel 5 aan.
 *
 * Na `npm run seed:privacy` is de studio de baas over deze tekst: een
 * volgende seed overschrijft wat de redactie daar heeft aangepast.
 */
import type { RichNode } from '@/lib/rich-text';
import { SITE } from '@/lib/site';

export const PRIVACY_OPENER = {
  eyebrow: 'Privacy',
  title: 'Zorgvuldig omgaan met ',
  titleEm: 'jouw gegevens',
  lead: 'Voor het verkopen, aankopen of taxeren van een woning hebben we persoonsgegevens van je nodig. Hieronder lees je precies welke dat zijn, waarom we ze gebruiken, met wie we ze delen en welke rechten je hebt.',
  // `motto` en `attribution` invullen is geen keuze: laat je ze leeg, dan valt
  // het pageOpener-component terug op de copy van /over-ons.
  motto: 'Je gegevens zijn van jou. Wij passen er alleen zorgvuldig op.',
  attribution: 'Laatst bijgewerkt: 29 augustus 2026',
} as const;

export const PRIVACY_BODY: RichNode[] = [
  {
    style: 'normal',
    text: `${SITE.name} verwerkt persoonsgegevens van klanten, geïnteresseerden en bezoekers van deze website. In deze privacyverklaring leggen we uit wat we verwerken en waarom. We houden ons daarbij aan de Algemene verordening gegevensbescherming (AVG).`,
  },

  { style: 'h2', text: '1. Wie is verantwoordelijk voor je gegevens?' },
  {
    style: 'normal',
    text: `Verwerkingsverantwoordelijke is ${SITE.name}, gevestigd aan ${SITE.address.join(', ')}. Je bereikt ons op [${SITE.email}](${SITE.emailHref}) of ${SITE.phone}. We zijn ingeschreven bij de Kamer van Koophandel onder nummer [KvK-nummer invullen] en aangesloten bij de NVM.`,
  },
  {
    style: 'normal',
    text: 'We hebben geen functionaris voor gegevensbescherming; vragen over privacy komen rechtstreeks bij ons binnen en worden door onszelf beantwoord.',
  },

  { style: 'h2', text: '2. Welke gegevens verwerken we?' },
  {
    style: 'normal',
    text: 'Welke gegevens we van je verwerken hangt af van wat je bij ons doet.',
  },
  { style: 'h3', text: 'Als je contact met ons opneemt' },
  {
    list: 'bullet',
    items: [
      'Naam, e-mailadres en telefoonnummer',
      'De inhoud van je bericht en eventuele bijlagen',
      'De pagina van waaraf je het formulier invulde, zodat we weten waar je vraag over gaat',
    ],
  },
  { style: 'h3', text: 'Als je je woning door ons laat verkopen of taxeren' },
  {
    list: 'bullet',
    items: [
      'Naam, adres, woonplaats, e-mailadres en telefoonnummer',
      'Gegevens over de woning: kadastrale gegevens, oppervlakten, bouwjaar, energielabel, foto’s en plattegronden',
      'Gegevens die nodig zijn voor de opdracht: burgerlijke staat als die voor de eigendomssituatie uitmaakt, en gegevens van de notaris',
      'Een kopie van je identiteitsbewijs wanneer de Wwft of de opdracht dat vereist — we noteren daarbij niet meer dan wettelijk is toegestaan',
    ],
  },
  { style: 'h3', text: 'Als je een woning bij ons bezichtigt of koopt' },
  {
    list: 'bullet',
    items: [
      'Naam, e-mailadres en telefoonnummer',
      'Je zoekwensen, als je een zoekopdracht bij ons hebt lopen',
      'Gegevens over je bod en de voortgang van de onderhandeling',
      'Gegevens die nodig zijn om de koopakte op te maken en aan de notaris door te geven',
    ],
  },
  { style: 'h3', text: 'Als je onze website bezoekt' },
  {
    list: 'bullet',
    items: [
      'Technische gegevens die je browser meestuurt, zoals je IP-adres, browsertype en de opgevraagde pagina — deze staan in de logbestanden van onze hostingpartij',
      'Gegevens die Google reCAPTCHA verzamelt om te bepalen of een formulierinzending van een mens komt',
    ],
  },

  { style: 'h2', text: '3. Waarvoor gebruiken we je gegevens?' },
  {
    style: 'normal',
    text: 'We verwerken je gegevens alleen voor een van de volgende doelen, en telkens op een van de grondslagen die de AVG noemt.',
  },
  {
    list: 'bullet',
    items: [
      '**Het uitvoeren van onze opdracht** — verkoop, aankoop, taxatie of verhuur. Grondslag: de uitvoering van de overeenkomst die we met je sluiten.',
      '**Het beantwoorden van je vraag** — je bericht via het contactformulier, per mail of telefonisch. Grondslag: je toestemming, of stappen die vooraf gaan aan een overeenkomst.',
      '**Het toesturen van woningen die bij je zoekopdracht passen.** Grondslag: je toestemming, die je op elk moment weer kunt intrekken.',
      '**Het voldoen aan wettelijke verplichtingen** — onder meer de fiscale bewaarplicht en de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft). Grondslag: een wettelijke plicht.',
      '**Het beveiligen en verbeteren van deze website.** Grondslag: ons gerechtvaardigd belang bij een werkende, niet-misbruikte website.',
    ],
  },
  {
    style: 'normal',
    text: 'We nemen geen besluiten over je op basis van geautomatiseerde verwerking, en we gebruiken je gegevens niet voor profilering.',
  },

  { style: 'h2', text: '4. Hoe komen we aan je gegevens?' },
  {
    style: 'normal',
    text: 'Meestal van jou: je vult een formulier in, belt ons, mailt ons of geeft ons opdracht. Daarnaast kunnen we gegevens ontvangen van het Kadaster, van de gemeente, van een collega-makelaar die je vertegenwoordigt, of van Funda wanneer je daar op een van onze woningen reageert.',
  },

  { style: 'h2', text: '5. Met wie delen we je gegevens?' },
  {
    style: 'normal',
    text: 'We verkopen je gegevens nooit en delen ze alleen als dat nodig is voor de opdracht of omdat de wet ons daartoe verplicht. Met partijen die namens ons gegevens verwerken sluiten we een verwerkersovereenkomst.',
  },
  {
    list: 'bullet',
    items: [
      '**Funda en de NVM** — voor het aanbieden van je woning en voor het uitwisselen van gegevens die bij een NVM-lidmaatschap horen, waaronder de vastgoedgegevens in de NVM-uitwisseling.',
      '**Realworks** — het makelaarssysteem waarin we dossiers en woninggegevens bijhouden.',
      '**De notaris, en waar nodig een taxateur, bouwkundig keurder of hypotheekadviseur** — alleen met de gegevens die zij voor hun opdracht nodig hebben.',
      '**Het NWWI** — bij een gevalideerde taxatie, voor de validatie van het taxatierapport.',
      '**Onze IT-leveranciers** — Vercel (hosting van deze website), Sanity (het systeem waarin de teksten en het aanbod staan), Mailjet (het versturen van formuliermail) en Google reCAPTCHA (spambescherming van onze formulieren).',
      '**De Belastingdienst, toezichthouders of opsporingsdiensten** — uitsluitend wanneer wij daartoe wettelijk verplicht zijn.',
    ],
  },
  {
    style: 'normal',
    text: 'Onze leveranciers verwerken je gegevens binnen de Europese Economische Ruimte. Waar dat niet zo is — Google reCAPTCHA kan gegevens buiten de EER verwerken — gebeurt dat op basis van de modelcontractbepalingen van de Europese Commissie.',
  },

  { style: 'h2', text: '6. Hoe lang bewaren we je gegevens?' },
  {
    style: 'normal',
    text: 'Niet langer dan nodig voor het doel waarvoor we ze kregen.',
  },
  {
    list: 'bullet',
    items: [
      'Een vraag via het contactformulier: tot twaalf maanden nadat je vraag is afgehandeld.',
      'Een zoekopdracht: zolang die loopt, en daarna nog twaalf maanden, tenzij je hem eerder intrekt.',
      'Een verkoop-, aankoop- of taxatiedossier: zeven jaar na afronding, omdat de fiscale bewaarplicht dat voorschrijft.',
      'Gegevens die we op grond van de Wwft moeten vastleggen: vijf jaar na het einde van de zakelijke relatie.',
      'Logbestanden van de website: maximaal dertig dagen.',
    ],
  },

  { style: 'h2', text: '7. Cookies' },
  {
    style: 'normal',
    text: 'Deze website gebruikt geen trackingcookies en geen advertentiecookies. Wel plaatst Google reCAPTCHA een cookie op de pagina’s met een formulier; die is nodig om te bepalen of een inzending van een mens komt en wordt niet gebruikt om je over websites heen te volgen. Cookies verwijder je op elk moment via de instellingen van je browser.',
  },

  { style: 'h2', text: '8. Hoe beveiligen we je gegevens?' },
  {
    style: 'normal',
    text: 'Onze website en formulieren gaan over een beveiligde verbinding (https). Toegang tot dossiers is beperkt tot de medewerkers die eraan werken en is beveiligd met persoonlijke accounts. Vermoed je dat er iets niet klopt met de beveiliging van je gegevens? Neem dan meteen contact met ons op.',
  },

  { style: 'h2', text: '9. Welke rechten heb je?' },
  {
    style: 'normal',
    text: 'Je hebt op grond van de AVG een aantal rechten. Je kunt ze uitoefenen door ons te mailen op [' + SITE.email + '](' + SITE.emailHref + '). We reageren binnen een maand en kunnen je vragen je te legitimeren, zodat we zeker weten dat we de gegevens aan de juiste persoon geven.',
  },
  {
    list: 'bullet',
    items: [
      '**Inzage** — je mag opvragen welke gegevens we van je verwerken.',
      '**Rectificatie** — kloppen je gegevens niet, dan passen we ze aan.',
      '**Verwijdering** — je mag ons vragen je gegevens te wissen, tenzij we ze wettelijk moeten bewaren.',
      '**Beperking** — je mag ons vragen de verwerking tijdelijk stil te leggen, bijvoorbeeld terwijl we een correctie beoordelen.',
      '**Bezwaar** — tegen verwerking op grond van ons gerechtvaardigd belang mag je bezwaar maken.',
      '**Overdraagbaarheid** — je mag de gegevens die je zelf aanleverde in een gangbaar bestandsformaat ontvangen.',
      '**Intrekken van toestemming** — heb je toestemming gegeven, dan mag je die op elk moment intrekken. Dat raakt niet aan wat we daarvóór al verwerkt hebben.',
    ],
  },
  {
    style: 'normal',
    text: 'Kom je er met ons niet uit, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens via [autoriteitpersoonsgegevens.nl](https://www.autoriteitpersoonsgegevens.nl/nl/zelf-doen/privacyrechten/klacht-indienen-bij-de-ap).',
  },

  { style: 'h2', text: '10. Wijzigingen in deze verklaring' },
  {
    style: 'normal',
    text: 'Verandert onze dienstverlening of de wet, dan passen we deze verklaring aan. Bovenaan de pagina staat wanneer we dat voor het laatst deden. Bij ingrijpende wijzigingen laten we het weten aan de klanten die het aangaat.',
  },

  { style: 'h2', text: '11. Vragen?' },
  {
    style: 'normal',
    text: `Bel ons op ${SITE.phone} of mail naar [${SITE.email}](${SITE.emailHref}). Je krijgt gewoon een van ons aan de lijn.`,
  },
];

export const PRIVACY_CTA = {
  image: '/images/contact/kantoor.jpg',
  imageAlt: 'Ons kantoor aan de Vergierdeweg in Haarlem',
  eyebrow: 'Vragen over je gegevens',
  title: 'Liever even iemand spreken?',
  body: 'Wil je weten wat we van je bewaren, of wil je iets laten aanpassen? Eén telefoontje is genoeg — we zoeken het meteen voor je op.',
  primary: { label: 'Neem contact op', href: '/contact' },
  secondary: { label: `Bel ${SITE.phone}`, href: SITE.phoneHref },
} as const;
