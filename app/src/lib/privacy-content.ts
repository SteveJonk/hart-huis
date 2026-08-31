/**
 * Copy voor /privacyverklaring.
 *
 * Twee bestaande blocks (`pageOpener`, `ctaBand`) met daartussen het
 * `richText`-blok — het enige blok in dit project dat koppen, opsommingen,
 * tabellen en links binnen een alinea aankan.
 *
 * De tekst is de NVM-modelprivacyverklaring, aangeleverd door de opdrachtgever
 * en hier alleen omgezet naar de schrijfvorm van `rich-text.ts`. Twee dingen
 * zijn bewust anders dan in de aangeleverde HTML:
 *   - de spronglinks ("Zie 1.") zijn platte tekst — koppen krijgen geen anchor;
 *   - het adres bij "Verwerkingsverantwoordelijke" is dat uit de aangeleverde
 *     tekst (Spaarndam) en wijkt af van `SITE.address` (Haarlem). Controleer
 *     welk van de twee klopt vóór publicatie.
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

/**
 * Vaste koprij van de gegevenstabellen, plus twee helpers zodat de zestien
 * tabellen hieronder alleen hun eigen rijen tonen.
 */
const GEGEVENS_KOP = ['Gegevens', 'Verstrekking mogelijk aan', 'Bewaartermijn bij NVM-makelaar'];

const gegevens = (...rijen: [string, string, string][]): RichNode => ({
  table: [GEGEVENS_KOP, ...rijen],
});

const ontvangers = (...rijen: [string, string][]): RichNode => ({
  table: [['', 'Ontvangers van gegevens'], ...rijen],
});

export const PRIVACY_BODY: RichNode[] = [
  {
    style: 'normal',
    text: `U heeft te maken met **${SITE.name}**. **${SITE.name}** is lid van de NVM. In deze privacyverklaring wordt uitgelegd hoe er met uw gegevens wordt omgegaan. Overal waar in deze verklaring ‘NVM-makelaar’ staat, wordt **${SITE.name}** bedoeld. In deze verklaring wordt ook uitgelegd welke gegevens aan NVM en aan brainbay B.V., een dochteronderneming van de NVM, worden verstrekt en wat NVM/brainbay met deze gegevens doet.`,
  },
  {
    style: 'normal',
    text: 'Brainbay is door de NVM opgericht om ten behoeve van de leden van de NVM producten en diensten te ontwikkelen gebaseerd op aangeleverde data van de leden en van niet NVM-leden alsmede voor het doen van onderzoek naar de onroerend goed markt.',
  },

  { style: 'h2', text: 'Van welke diensten van de NVM-makelaar/taxateur maakt u gebruik?' },
  {
    style: 'normal',
    text: 'U kunt op één of meerdere manieren in contact staan met de NVM-makelaar/taxateur.',
  },

  { style: 'h3', text: 'Bij woningen' },
  {
    style: 'normal',
    text: 'U wilt uw woning verkopen of verhuren en geeft daarbij opdracht aan de NVM-makelaar:',
  },
  {
    list: 'bullet',
    items: ['U wilt uw woning verkopen — zie 1.', 'U wilt uw woning verhuren — zie 2.'],
  },
  {
    style: 'normal',
    text: 'U wilt een woning kopen of huren en geeft daarbij een opdracht aan de NVM-makelaar:',
  },
  {
    list: 'bullet',
    items: ['U wilt een woning kopen — zie 3.', 'U wilt een woning huren — zie 4.'],
  },
  {
    style: 'normal',
    text: 'U wilt een woning laten taxeren en geeft daarbij opdracht aan de NVM-taxateur:',
  },
  { list: 'bullet', items: ['U wilt een woning laten taxeren — zie 9.'] },
  {
    style: 'normal',
    text: 'Als u op zoek bent naar een woning en u heeft hiervoor niet de NVM-makelaar ingeschakeld, dan zijn de volgende situaties mogelijk:',
  },
  {
    list: 'bullet',
    items: [
      'U wilt vrijblijvend op de hoogte gehouden worden van het aanbod van de NVM-makelaar — zie 8.',
      'U wilt een koop- of huurwoning bezichtigen die via de NVM-makelaar wordt aangeboden — zie 5.',
      'U wilt een woning kopen die via de NVM-makelaar wordt aangeboden — zie 6.',
      'U wilt een woning huren die via de NVM-makelaar wordt aangeboden — zie 7.',
    ],
  },

  { style: 'h3', text: 'Bij bedrijfspanden of agrarisch vastgoed' },
  {
    style: 'normal',
    text: 'U wilt uw bedrijfspand of agrarisch vastgoed verkopen of verhuren en geeft daarbij opdracht aan de NVM-makelaar:',
  },
  {
    list: 'bullet',
    items: [
      'U wilt uw bedrijfspand of agrarisch vastgoed verkopen — zie 10.',
      'U wilt uw bedrijfspand of agrarisch vastgoed verhuren — zie 11.',
    ],
  },
  {
    style: 'normal',
    text: 'U wilt een bedrijfspand of agrarisch vastgoed laten taxeren en geeft daarbij opdracht aan de NVM-taxateur:',
  },
  {
    list: 'bullet',
    items: ['U wilt een bedrijfspand of agrarisch vastgoed laten taxeren — zie 9.'],
  },
  {
    style: 'normal',
    text: 'U wilt een bedrijfspand of agrarisch vastgoed kopen of huren en geeft daarbij opdracht aan de NVM-makelaar:',
  },
  {
    list: 'bullet',
    items: [
      'U wilt een bedrijfspand of agrarisch vastgoed kopen — zie 12.',
      'U wilt een bedrijfspand of agrarisch vastgoed huren — zie 13.',
    ],
  },
  {
    style: 'normal',
    text: 'Als u op zoek bent naar een bedrijfspand of agrarisch vastgoed en u heeft hiervoor niet een NVM-makelaar ingeschakeld, dan zijn de volgende situaties mogelijk:',
  },
  {
    list: 'bullet',
    items: [
      'U wilt vrijblijvend op de hoogte gehouden worden van het aanbod van de NVM-makelaar — zie 8.',
      'U wilt een bedrijfspand of agrarisch vastgoed voor koop of huur bezichtigen welke via de NVM-makelaar wordt aangeboden — zie 5.',
      'U wilt een bedrijfspand of agrarisch vastgoed kopen dat via de NVM-makelaar wordt aangeboden — zie 14.',
      'U wilt een bedrijfspand of agrarisch vastgoed huren dat via de NVM-makelaar wordt aangeboden — zie 15.',
    ],
  },

  { style: 'h3', text: 'Overige dienstverlening' },
  {
    style: 'normal',
    text: 'U wilt u laten bijstaan door een NVM-makelaar in het kader van overige dienstverlening: u schakelt een NVM-makelaar in om u te kunnen bijstaan op het gebied van het beheer van vastgoed, ruimtelijke ordening zoals omgevingsvergunningen, wijzigen bestemmingsplan, ontwerpen en/of aanbesteden van nieuw- en verbouwplannen, pachtzaken, onteigening e.d. — zie 16.',
  },

  { style: 'h2', text: 'Verwerkingsverantwoordelijke' },
  {
    style: 'normal',
    text: `Voor al deze verwerkingen is ${SITE.name} de verwerkingsverantwoordelijke. De contactgegevens zijn:`,
  },
  {
    style: 'normal',
    text: `${SITE.name}\nKvK: 82427585\nJan van Geemstraat 19, 2064 LP Spaarndam\n[${SITE.email}](${SITE.emailHref})`,
  },

  { style: 'h2', text: 'Gegevensverstrekking aan NVM/brainbay' },
  {
    style: 'normal',
    text: 'Bij een aantal diensten worden ook gegevens verstrekt aan NVM/brainbay. De NVM/brainbay doet het volgende met deze gegevens:',
  },
  {
    list: 'bullet',
    items: [
      'Zorgen dat alle NVM-makelaars een actueel aanbod hebben van woningen, bedrijfspanden en agrarisch vastgoed die c.q. dat via NVM-makelaars worden c.q. wordt aangeboden.',
      'Zorgen dat het actuele aanbod geplaatst wordt op funda en andere (huizen)websites.',
      'Zorgen voor een database waardoor taxaties en andere waardebepalingen mogelijk zijn en inzichten opgebouwd kunnen worden over de ontwikkelingen in de woningmarkt, bedrijfsonroerendgoed markt en agrarische vastgoedmarkt. De gegevens in deze database worden voor onbepaalde tijd bewaard.',
    ],
  },
  {
    style: 'normal',
    text: 'Verderop in deze verklaring, onder “Gegevensgebruik door de NVM/brainbay”, staat wat NVM/brainbay met de verstrekte gegevens doet.',
  },
  {
    style: 'normal',
    text: 'NVM/brainbay is een verwerkingsverantwoordelijke voor deze gegevens. De contactgegevens zijn:',
  },
  {
    table: [
      ['NVM', 'brainbay B.V.'],
      ['KvK 30102683', 'KvK 71551034'],
      ['Postbus 2222\n3430 DC Nieuwegein', 'Fakkelstede 1\n3431 HZ Nieuwegein'],
      ['privacyhelpdesk@nvm.nl', 'support@brainbay.nl'],
    ],
  },
  {
    style: 'normal',
    text: 'NVM/brainbay heeft een functionaris voor de gegevensverwerking. Deze is bereikbaar via [fg@nvm.nl](mailto:fg@nvm.nl).',
  },

  { style: 'h2', text: 'Wij nemen uw privacy serieus' },
  {
    style: 'normal',
    text: 'De NVM-makelaar en NVM/brainbay nemen uw privacy erg serieus en zien de regels rondom gegevensbescherming als logische fatsoensnormen. De NVM-makelaar verwerkt uw gegevens zorgvuldig en volgens de wettelijke voorschriften. De NVM-makelaar besteedt veel aandacht aan een adequate beveiliging zodat uw gegevens worden beschermd tegen ongeautoriseerd gebruik, ongeautoriseerde toegang, wijziging en onrechtmatige vernietiging. Alle NVM-makelaars investeren continu in het bieden van goede dienstverlening. Een onderdeel hiervan is het NVM-brede privacyprogramma. Heeft u vragen, aarzel dan niet om contact op te nemen met de NVM-makelaar.',
  },

  { style: 'h2', text: 'Inkijken, wijzigen of verwijderen van gegevens' },
  {
    style: 'normal',
    text: 'Wilt u weten welke gegevens de NVM-makelaar van u heeft, stuur dan per brief of e-mail uw verzoek naar de makelaar.',
  },
  {
    style: 'normal',
    text: 'NVM/brainbay verwerkt geen namen of andere direct identificerende gegevens. Als u wilt weten welke gegevens NVM/brainbay verwerkt, neem dan ook contact op met de NVM-makelaar die vervolgens zorgt dat u geïnformeerd wordt.',
  },
  {
    style: 'normal',
    text: 'Ook als u de gegevens wilt wijzigen of verwijderen, stuur dan een gemotiveerde brief of e-mail naar de NVM-makelaar. Uw verzoek zal zo snel mogelijk worden ingewilligd, tenzij de wet verplicht om de gegevens te bewaren of als er (andere) dringende redenen zijn die zich tegen wijziging of verwijdering verzetten.',
  },

  { style: 'h2', text: 'Hoe kunt u een klacht indienen?' },
  {
    style: 'normal',
    text: 'Als u vragen heeft of als u een klacht heeft over het gegevensgebruik van de NVM-makelaar, neem dan eerst contact op met de NVM-makelaar. Mocht u er met de NVM-makelaar niet uitkomen, dan kunt u contact opnemen met de klachtencoördinator van de NVM via [klachtencoordinator@nvm.nl](mailto:klachtencoordinator@nvm.nl). In die situatie zal ook de NVM Functionaris voor de Gegevensverwerking zich mogelijk over de klacht buigen. U heeft daarnaast het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.',
  },

  { style: 'h2', text: 'Hoe lang bewaart de NVM-makelaar de gegevens?' },
  {
    style: 'normal',
    text: 'De NVM-makelaar bewaart de gegevens niet langer dan noodzakelijk. Een aantal gegevens bewaart de NVM-makelaar echter langdurig:',
  },
  {
    list: 'bullet',
    items: [
      'Een aantal gegevens van de dienstverlening bewaart de NVM-makelaar 20 jaar, omdat de NVM-makelaar gedurende deze periode aansprakelijk kan worden gesteld voor beroepsfouten.',
      'De bewijslast dat de NVM-makelaar de verplichte toets in het kader van de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft) heeft uitgevoerd, bewaart de NVM-makelaar 5 jaar.',
    ],
  },

  {
    style: 'h2',
    text: '1. U verkoopt uw woning en u heeft hiervoor de NVM-makelaar ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om in opdracht van u promotie te maken voor uw woning, inzicht te krijgen in de waarde van en belangstelling voor uw woning, bezichtigingen te verzorgen en namens u te onderhandelen en de transactie te begeleiden. Daarbij stelt de NVM-makelaar ook uw identiteit vast. Ook wordt u mogelijk benaderd voor een makelaarsbeoordeling en ontvangt u verkoopstatistieken vanuit funda. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en overige contactgegevens zoals uw telefoonnummer en e-mailadres.', 'b', '20 jaar'],
    ['De reden van verkoop, bijvoorbeeld groter wonen of verandering van werk.', 'a', '3 jaar'],
    ['De datum van aanmelding van de woning en de periode dat de woning te koop staat of heeft gestaan.', 'a', '20 jaar'],
    [
      'De omschrijving en kenmerken van de woning zoals de vraagprijs, het bouwjaar, de oppervlaktes en indeling, kadastrale gegevens, WOZ-waarde en foto’s en video’s van de woning.\n\nIndien dat met de NVM-makelaar is afgesproken, worden bovenstaande gegevens bekend gemaakt op funda, andere huizenwebsites en op de website van de NVM-makelaar. Dit gebeurt voor promotie van uw woning en worden daar tot maximaal 1 jaar na de transactie getoond.',
      'a, d, e',
      '20 jaar',
    ],
    ['De reden van een eventuele intrekking van de bemiddelingsopdracht.', 'a', '3 jaar'],
    ['Gegevens die nodig zijn als een wettelijke toets moet worden uitgevoerd in het kader van de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft).', 'c', '5 jaar'],
    ['Gegevens die nodig zijn om de koopovereenkomst op te stellen.', 'b', '20 jaar'],
    ['Wanneer de woning is verkocht: de transactiegegevens zoals de verkoopprijs en de transactiedatum.', 'a', '20 jaar'],
    ['In het kader van klanttevredenheid en marketingdoeleinden worden uw naam en e-mailadres doorgegeven aan funda om een makelaarsbeoordeling mogelijk te maken. Tevens ontvangt u van funda de verkoopstatistieken van uw woning.', 'e', '2 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'geen', '3 jaar'],
  ),
  ontvangers(
    ['a', 'NVM/brainbay (gegevens worden voor onbepaalde tijd bewaard)'],
    ['b', 'Notaris, taxateur, meetbureau, fotograaf, verkoopstylist, koper, aankoopmakelaar'],
    ['c', 'FIU (Financial Intelligence Unit – Nederland)'],
    ['d', 'Bezichtiger, bieder, koper, aankoopmakelaar'],
    ['e', 'funda'],
  ),

  {
    style: 'h2',
    text: '2. U verhuurt uw woning en u heeft hiervoor de NVM-makelaar ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om in opdracht van u promotie te maken voor uw woning, bezichtigingen te verzorgen, inzicht te krijgen in de betrouwbaarheid van de potentiële huurder en een huurovereenkomst op te stellen. Daarbij stelt de NVM-makelaar ook uw identiteit vast. Ook wordt u mogelijk benaderd voor een makelaarsbeoordeling en ontvangt u verhuurstatistieken vanuit funda. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'b', '20 jaar'],
    ['De reden van verhuur.', 'a', '3 jaar'],
    [
      'De omschrijving en kenmerken van de woning zoals de huurprijs, het bouwjaar, de oppervlaktes en indeling, kadastrale gegevens en foto’s en video’s van de woning.\n\nIndien met de NVM-makelaar is afgesproken, worden bovenstaande gegevens bekend gemaakt op funda, andere huizenwebsites en op de website van de NVM-makelaar. Dit gebeurt voor promotie van uw woning en worden daar tot maximaal 1 jaar na de transactie getoond.',
      'a, c, d',
      '20 jaar',
    ],
    ['De reden van een eventuele intrekking van de bemiddelingsopdracht.', 'a', '3 jaar'],
    ['De eisen die u stelt aan de huurder.', 'c', '20 jaar'],
    ['Gegevens die nodig zijn om de huurovereenkomst op te stellen, waaronder uw identiteitsvaststelling.', 'c', '20 jaar'],
    ['Wanneer de woning is verhuurd, de huurprijs en huurcondities.', 'a', '3 jaar'],
    ['In het kader van klanttevredenheid en marketingdoeleinden worden uw naam en e-mailadres doorgegeven aan funda om een makelaarsbeoordeling mogelijk te maken. Tevens ontvangt u van funda de verhuurstatistieken van uw woning.', 'd', '2 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'geen', '3 jaar'],
  ),
  ontvangers(
    ['a', 'NVM/brainbay (gegevens worden voor onbepaalde tijd bewaard)'],
    ['b', 'Huurder, meetbureau, fotograaf'],
    ['c', 'Bezichtiger, huurder, aanhuurmakelaar'],
    ['d', 'funda'],
  ),

  {
    style: 'h2',
    text: '3. U bent op zoek naar een koopwoning en u heeft hiervoor de NVM-makelaar ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om in opdracht van u een voor u passende woning te vinden, namens u de onderhandelingen te voeren en de transactie te begeleiden. Daarbij stelt de NVM-makelaar ook uw identiteit vast. Ook wordt u mogelijk benaderd voor een makelaarsbeoordeling vanuit funda. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'a', '20 jaar'],
    ['Het zoekprofiel waarin uw woonwensen zijn opgenomen.', 'geen', '3 jaar'],
    ['Gegevens over uw huidige woning zoals de koop- en huurprijs. De reden van koop, bijvoorbeeld groter wonen of verandering van werk.', 'geen', '3 jaar'],
    ['Uw leeftijds- en inkomenscategorie en gezinssamenstelling.', 'geen', '3 jaar'],
    ['Indien met u afgesproken, gegevens ter vaststelling van uw financieringsmogelijkheden.', 'geen', '3 jaar'],
    ['Gegevens die nodig zijn als een wettelijke toets moet worden uitgevoerd in het kader van de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft).', 'b', '5 jaar'],
    ['Gegevens die nodig zijn om de koopovereenkomst op te stellen.', 'c', '20 jaar'],
    ['Wanneer de woning is verkocht: de transactiegegevens zoals de verkoopprijs en de transactiedatum.', 'geen', '20 jaar'],
    ['In het kader van klanttevredenheid en marketingdoeleinden worden uw naam en e-mailadres doorgegeven aan funda om een makelaarsbeoordeling mogelijk te maken.', 'd', '2 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'geen', '3 jaar'],
  ),
  ontvangers(
    ['a', 'Verkoper, verkoopmakelaar'],
    ['b', 'FIU (Financial Intelligence Unit – Nederland), verkoopmakelaar'],
    ['c', 'Notaris, verkoper, verkoopmakelaar'],
    ['d', 'funda'],
  ),

  {
    style: 'h2',
    text: '4. U bent op zoek naar een huurwoning en u heeft hiervoor de NVM-makelaar ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om in opdracht van u een geschikte huurwoning te vinden, namens u de onderhandelingen te voeren en de begeleiding bij de totstandkoming van de huurovereenkomst en de verdere afwikkeling daarvan te verzorgen. Daarbij stelt de NVM-makelaar ook uw identiteit vast. Ook wordt u mogelijk benaderd voor een makelaarsbeoordeling vanuit funda. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'a', '20 jaar'],
    ['Het zoekprofiel waarin uw woonwensen zijn opgenomen.', 'geen', '3 jaar'],
    ['Gegevens over uw huidige woning zoals de koop- en huurprijs. De reden van huur, bijvoorbeeld groter wonen of verandering van werk.', 'geen', '3 jaar'],
    ['Uw leeftijds- en inkomenscategorie en gezinssamenstelling.', 'geen', '3 jaar'],
    ['Indien met u afgesproken, gegevens ter vaststelling van uw mogelijkheden om een huurprijs te betalen.', 'geen', '3 jaar'],
    ['Gegevens die nodig zijn als de verhuurder een huurderstoets eist (bijvoorbeeld NVM Woontoets). Deze toets is een gerechtvaardigd belang van de verhuurder.', 'a', '3 jaar'],
    ['Gegevens die nodig zijn om de huurovereenkomst op te stellen, waaronder uw identiteitsvaststelling.', 'a', '20 jaar'],
    ['In het kader van klanttevredenheid en marketingdoeleinden worden uw naam en e-mailadres doorgegeven aan funda om een makelaarsbeoordeling mogelijk te maken.', 'b', '2 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'geen', '3 jaar'],
  ),
  ontvangers(['a', 'Verhuurder, verhuurmakelaar'], ['b', 'funda']),

  {
    style: 'h2',
    text: '5. U wilt een koop- of huurwoning, een bedrijfspand of agrarisch vastgoed bezichtigen die c.q. dat via de NVM-makelaar wordt aangeboden',
  },
  {
    style: 'normal',
    text: 'In dit contact maakt de NVM-makelaar bezichtigingsafspraken, geeft de NVM-makelaar u een goed beeld van de woning, het bedrijfspand of het agrarisch vastgoed en legt de NVM-makelaar vast wat uw mening is van dit pand. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'a', '1 jaar'],
    ['Datum van bezichtiging en uw mening over de woning, het bedrijfspand of het agrarisch vastgoed.', 'a', '1 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'a', '1 jaar'],
  ),
  ontvangers(['a', 'Verkoper of verhuurder van pand']),

  { style: 'h2', text: '6. U wilt een woning kopen die via de NVM-makelaar wordt aangeboden' },
  {
    style: 'normal',
    text: 'Voor dit contact staat de NVM-makelaar met u en eventueel uw makelaar in contact in verband met het biedingsproces. Daarna voert de NVM-makelaar de voorbereidende activiteiten uit voor de koopovereenkomst en de overdracht. In dit contact stelt de NVM-makelaar ook uw identiteit vast. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'b', '20 jaar'],
    ['Uw mening over de woning.', 'b', '3 jaar'],
    ['Gegevens over de biedingen.', 'b', '3 jaar'],
    ['Gegevens die nodig zijn als een wettelijke toets moet worden uitgevoerd in het kader van de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft).', 'd', '5 jaar'],
    ['Indien met de verkoper afgesproken, gegevens ter vaststelling van uw mogelijkheden om een koopprijs te betalen of aan andere eisen van de verkoper te voldoen. Dit is een gerechtvaardigd belang van de verkoper.', 'b', '3 jaar'],
    ['Gegevens die nodig zijn om de koopovereenkomst op te stellen.', 'c', '20 jaar'],
    ['Wanneer de woning is verkocht: de transactiegegevens zoals de verkoopprijs en de transactiedatum.', 'a', '20 jaar'],
    ['De postcode (1234AB) en huisnummer van het vorige woonadres van de koper, koop- of huurwoning.', 'a', '3 jaar'],
    ['Uw leeftijds- en inkomenscategorie en gezinssamenstelling, type koper en verhuisreden.', 'a', '3 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'b', '3 jaar'],
  ),
  ontvangers(
    ['a', 'NVM/brainbay (de gegevens worden voor onbepaalde tijd bewaard)'],
    ['b', 'Verkoper'],
    ['c', 'Notaris, aankoopmakelaar'],
    ['d', 'FIU (Financial Intelligence Unit – Nederland)'],
  ),

  { style: 'h2', text: '7. U wilt een woning huren die via de NVM-makelaar wordt aangeboden' },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om vast te stellen of u aan de eisen van de verhuurder voldoet en om namens de verhuurder de huurovereenkomst voor te bereiden. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'a', '20 jaar'],
    ['Uw leeftijds- en inkomenscategorie en gezinssamenstelling.', 'a', '3 jaar'],
    ['Gegevens om vast te stellen dat u aan de eisen van de verhuurder voldoet. Dit is een gerechtvaardigd belang van de verhuurder. Deze vaststelling kan bijvoorbeeld door de NVM Woontoets.', 'a', '5 jaar'],
    ['Gegevens die nodig zijn om de huurovereenkomst op te stellen, waaronder uw identiteitsvaststelling.', 'a', '20 jaar'],
    ['Overige informatie die u aan uw NVM-makelaar verstrekt.', 'a', '3 jaar'],
  ),
  ontvangers(['a', 'Verhuurder']),

  {
    style: 'h2',
    text: '8. U wilt vrijblijvend op de hoogte gehouden worden van het aanbod door de NVM-makelaar',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is dat de NVM-makelaar u op de hoogte brengt van mogelijk voor u interessante woningen, bedrijfspanden of agrarisch vastgoed. Dit gebeurt tot het moment dat u aangeeft geen behoefte meer te hebben aan deze service. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'geen', 'Tot intrekking van toestemming'],
    ['Het zoekprofiel waarin uw woonwensen zijn opgenomen. Op basis van het zoekprofiel kan een aanbod worden samengesteld.', 'geen', 'Tot intrekking van toestemming'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'geen', 'Tot intrekking van toestemming'],
  ),

  {
    style: 'h2',
    text: '9. U wilt een taxatie van een woning, bedrijfspand of agrarisch vastgoed laten uitvoeren en u heeft hiervoor de NVM-makelaar/taxateur ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is dat de NVM-makelaar/taxateur voor uw woning, bedrijfspand of agrarisch vastgoed een taxatie uitvoert. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'a', '20 jaar'],
    ['Gegevens van uw woning, bedrijfspand of agrarisch vastgoed om de waarde te bepalen.', 'a', '20 jaar'],
    ['Gegevens die nodig zijn als de taxateur in het kader van de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft) een ongebruikelijke transactie moet melden.', 'b', '5 jaar'],
    ['Overige informatie die u aan uw NVM-makelaar/taxateur verstrekt.', 'geen', '20 jaar'],
  ),
  ontvangers(
    ['a', 'Validatie instituut op taxaties'],
    ['b', 'FIU (Financial Intelligence Unit – Nederland)'],
  ),

  {
    style: 'h2',
    text: '10. U verkoopt uw bedrijfspand of agrarisch vastgoed en u heeft hiervoor de NVM-makelaar ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om in opdracht van u promotie te maken voor uw bedrijfspand of agrarisch vastgoed, inzicht te krijgen in de waarde van en belangstelling voor uw pand, belangstellenden rond te leiden en namens u te onderhandelen en de transactie te begeleiden. Daarbij stelt de NVM-makelaar ook uw identiteit vast. Ook wordt u mogelijk benaderd voor een makelaarsbeoordeling en ontvangt u verkoopstatistieken vanuit funda. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, bedrijfsnaam, adres en overige contactgegevens zoals uw telefoonnummer en e-mailadres.', 'b', '20 jaar'],
    ['De reden van verkoop.', 'a', '3 jaar'],
    ['De datum van aanmelding van het pand en de periode dat het pand te koop staat of heeft gestaan.', 'a', '20 jaar'],
    [
      'De omschrijving en kenmerken van het pand zoals de vraagprijs, het bouwjaar, de oppervlaktes en indeling, kadastrale gegevens, foto’s en video’s van het pand.\n\nIndien met de NVM-makelaar is afgesproken worden bovenstaande gegevens bekend gemaakt op funda, andere vastgoedwebsites en op de website van de NVM-makelaar. Dit gebeurt voor promotie van uw bedrijfspand en worden daar tot maximaal 1 jaar na de transactie getoond.',
      'a, d',
      '20 jaar',
    ],
    ['De reden van een eventuele intrekking van de bemiddelingsopdracht.', 'a', '3 jaar'],
    ['Gegevens die nodig zijn als een wettelijke toets moet worden uitgevoerd in het kader van de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft). Hierbij worden ook de identiteiten van de uiteindelijk belanghebbenden (Ultimate Beneficial Owners) vastgesteld en vastgelegd.', 'c', '5 jaar'],
    ['Gegevens die nodig zijn om de koopovereenkomst op te stellen.', 'b', '20 jaar'],
    ['Wanneer het pand is verkocht: de transactiegegevens zoals de verkoopprijs en de transactiedatum.', 'a', '20 jaar'],
    ['In het kader van klanttevredenheid en marketingdoeleinden worden uw naam en e-mailadres doorgegeven aan funda om een makelaarsbeoordeling mogelijk te maken. Tevens ontvangt u van funda de verkoopstatistieken van het pand.', 'e', '2 jaar'],
    ['Overige informatie die u aan uw NVM-makelaar verstrekt.', 'geen', '3 jaar'],
  ),
  ontvangers(
    ['a', 'NVM/brainbay (de gegevens worden voor onbepaalde tijd bewaard)'],
    ['b', 'Notaris, taxateur, meetbureau, fotograaf, verkoopstylist, koper, aankoopmakelaar'],
    ['c', 'FIU (Financial Intelligence Unit – Nederland), aankoopmakelaar'],
    ['d', 'Bezichtiger, bieder, koper, aankoopmakelaar'],
    ['e', 'funda'],
  ),

  {
    style: 'h2',
    text: '11. U verhuurt uw bedrijfspand of agrarisch vastgoed en u heeft hiervoor de NVM-makelaar ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om in opdracht van u promotie te maken voor uw bedrijfspand of agrarisch vastgoed, belangstellenden rond te leiden, inzicht te krijgen in de betrouwbaarheid van de potentiële huurder en voor u een goede huurovereenkomst op te stellen. Daarbij stelt de NVM-makelaar ook uw identiteit vast. Ook wordt u mogelijk benaderd voor een makelaarsbeoordeling en ontvangt u verhuurstatistieken vanuit funda. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, organisatienaam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'b', '20 jaar'],
    ['De reden van verhuur.', 'a', '3 jaar'],
    ['De datum van aanmelding van het pand en de periode dat het pand te huur staat of heeft gestaan.', 'a', '3 jaar'],
    [
      'De omschrijving en kenmerken van het pand zoals de huurprijs, het bouwjaar, de oppervlaktes en indeling, kadastrale gegevens en foto’s en video’s van het pand.\n\nIn overleg met u worden deze gegevens ook op geselecteerde websites geplaatst voor promotie van het pand.',
      'a, c',
      '20 jaar',
    ],
    ['De reden van een eventuele intrekking van de bemiddelingsopdracht.', 'a', '3 jaar'],
    ['De eisen die u stelt aan de huurder.', 'c', '20 jaar'],
    ['Gegevens die nodig zijn om de huurovereenkomst op te stellen, waaronder de identiteitsvaststelling van de tekenbevoegde.', 'c', '20 jaar'],
    ['Wanneer het pand is verhuurd: de huurprijs en de huurcondities.', 'a', '3 jaar'],
    ['In het kader van klanttevredenheid en marketingdoeleinden worden uw naam en e-mailadres doorgegeven aan funda om een makelaarsbeoordeling mogelijk te maken. Tevens ontvangt u van funda de verhuurstatistieken van uw pand.', 'd', '2 jaar'],
    ['Overige informatie die u aan uw NVM-makelaar verstrekt.', 'geen', '3 jaar'],
  ),
  ontvangers(
    ['a', 'NVM/brainbay (de gegevens worden voor onbepaalde tijd bewaard)'],
    ['b', 'Huurder, meetbureau, fotograaf'],
    ['c', 'Bezichtiger, huurder, aanhuurmakelaar'],
    ['d', 'funda'],
  ),

  {
    style: 'h2',
    text: '12. U bent op zoek naar een bedrijfspand of agrarisch vastgoed om aan te kopen en u heeft hiervoor de NVM-makelaar ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om in opdracht van u een voor u passend bedrijfspand of agrarisch vastgoed te vinden, namens u de onderhandelingen uit te voeren en de transactie te begeleiden. Daarbij stelt de NVM-makelaar ook uw identiteit vast. Ook wordt u mogelijk benaderd voor een makelaarsbeoordeling vanuit funda. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, organisatienaam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'c', '20 jaar'],
    ['Het zoekprofiel waarin uw huisvestingswensen zijn opgenomen.', 'geen', '3 jaar'],
    ['Gegevens over uw huidige huisvesting zoals de koop- en huurprijs. De reden van koop.', 'geen', '3 jaar'],
    ['Uw eisen aan de huisvesting.', 'c', '3 jaar'],
    ['Indien met u afgesproken, gegevens ter vaststelling van uw financieringsmogelijkheden.', 'geen', '3 jaar'],
    ['Gegevens die nodig zijn als een wettelijke toets moet worden uitgevoerd in het kader van de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft). Hierbij worden de identiteiten van de uiteindelijk belanghebbenden (Ultimate Beneficial Owners) vastgesteld en vastgelegd.', 'b', '5 jaar'],
    ['Gegevens die nodig zijn om de koopovereenkomst op te stellen. Deze gegevens worden ook aan de verkopende makelaar en de notaris verstrekt.', 'd', '20 jaar'],
    ['Wanneer het bedrijfspand of agrarisch vastgoed is verkocht: de transactiegegevens zoals de verkoopprijs en de transactiedatum.', 'geen', '20 jaar'],
    ['In het kader van klanttevredenheid en marketingdoeleinden worden uw naam en e-mailadres doorgegeven aan funda om een makelaarsbeoordeling mogelijk te maken.', 'e', '2 jaar'],
    ['Overige informatie die u aan uw NVM-makelaar verstrekt.', 'geen', '3 jaar'],
  ),
  ontvangers(
    ['a', 'NVM/brainbay (de gegevens worden voor onbepaalde tijd bewaard)'],
    ['b', 'FIU (Financial Intelligence Unit – Nederland), verkoopmakelaar'],
    ['c', 'Verkoper, verkoopmakelaar'],
    ['d', 'Notaris, verkoper, verkoopmakelaar'],
    ['e', 'funda'],
  ),

  {
    style: 'h2',
    text: '13. U bent op zoek naar een huurpand (bedrijfspand of agrarisch vastgoed) en u heeft hiervoor de NVM-makelaar ingeschakeld',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om in opdracht van u een geschikt bedrijfspand of agrarisch vastgoed te vinden, namens u de onderhandelingen te voeren en de begeleiding bij het opstellen van de huurovereenkomst en verdere afwikkeling daarvan te verzorgen. Daarbij stelt de NVM-makelaar ook uw identiteit vast. Ook wordt u mogelijk benaderd voor een makelaarsbeoordeling vanuit funda. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, organisatienaam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'a', '20 jaar'],
    ['Het zoekprofiel waarin uw huisvestingswensen zijn opgenomen.', 'geen', '3 jaar'],
    ['Gegevens over uw huidige huisvesting zoals de koop- en huurprijs.', 'geen', '3 jaar'],
    ['Uw eisen aan de huisvesting.', 'a', '3 jaar'],
    ['Indien met u afgesproken, gegevens ter vaststelling van uw mogelijkheden om een huurprijs te betalen.', 'geen', '3 jaar'],
    ['Gegevens die nodig zijn als de verhuurder een huurderstoets (NVM Businesstoets) eist. Deze toets is een gerechtvaardigd belang van de verhuurder.', 'a', '3 jaar'],
    ['Gegevens die nodig zijn om de huurovereenkomst op te stellen, waaronder de identiteitsvaststelling van de tekenbevoegde.', 'a', '20 jaar'],
    ['In het kader van klanttevredenheid en marketingdoeleinden worden uw naam en e-mailadres doorgegeven aan funda om een makelaarsbeoordeling mogelijk te maken.', 'b', '2 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'geen', '3 jaar'],
  ),
  ontvangers(['a', 'Verhuurder, verhuurmakelaar'], ['b', 'funda']),

  {
    style: 'h2',
    text: '14. U wilt een bedrijfspand of agrarisch vastgoed kopen dat via de NVM-makelaar wordt aangeboden',
  },
  {
    style: 'normal',
    text: 'Voor dit contact staat de NVM-makelaar met u en eventueel uw makelaar in contact in verband met het biedingsproces. Daarna voert de NVM-makelaar de voorbereidende activiteiten uit voor de koopovereenkomst en de overdracht. In dit contact stelt de NVM-makelaar ook uw identiteit vast. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, organisatienaam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'b', '20 jaar'],
    ['Uw mening over het aangeboden pand.', 'b', '3 jaar'],
    ['Gegevens over de biedingen.', 'b', '3 jaar'],
    ['Gegevens die nodig zijn als een wettelijke toets moet worden uitgevoerd in het kader van de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft). Hierbij worden de identiteiten van de uiteindelijk belanghebbenden (Ultimate Beneficial Owners) vastgesteld en vastgelegd.', 'd', '5 jaar'],
    ['Indien met de verkoper afgesproken, gegevens ter vaststelling van uw mogelijkheden om een koopprijs te betalen of aan andere eisen van de verkoper te voldoen. Dit is een gerechtvaardigd belang van de verkoper.', 'b', '3 jaar'],
    ['Gegevens die nodig zijn om de koopovereenkomst op te stellen.', 'c', '20 jaar'],
    ['Wanneer het pand is verkocht: de transactiegegevens zoals de verkoopprijs en de transactiedatum en ook de postcode (1234AB) van het vorige huisvestingsadres van de koper.', 'a', '3 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'b', '3 jaar'],
  ),
  ontvangers(
    ['a', 'NVM/brainbay (de gegevens worden voor onbepaalde tijd bewaard)'],
    ['b', 'Verkoper'],
    ['c', 'Notaris, koper, aankoopmakelaar'],
    ['d', 'FIU (Financial Intelligence Unit – Nederland)'],
  ),

  {
    style: 'h2',
    text: '15. U wilt een bedrijfspand of agrarisch vastgoed huren dat via de NVM-makelaar wordt aangeboden',
  },
  {
    style: 'normal',
    text: 'Het doel van dit contact is om vast te stellen of u aan de eisen van de verhuurder voldoet en om namens de verhuurder de huurovereenkomst voor te bereiden. De volgende gegevens kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'a', '20 jaar'],
    ['Uw eisen aan de huisvesting.', 'a', '3 jaar'],
    ['Gegevens om vast te stellen dat u aan de eisen van de verhuurder voldoet. Dit is een gerechtvaardigd belang van de verhuurder. Deze vaststelling kan bijvoorbeeld door de NVM Businesstoets.', 'a', '5 jaar'],
    ['Gegevens die nodig zijn om de huurovereenkomst op te stellen, waaronder de identiteitsvaststelling van de tekenbevoegde.', 'a', '20 jaar'],
    ['Overige informatie die u aan de NVM-makelaar verstrekt.', 'a', '3 jaar'],
  ),
  ontvangers(['a', 'Verhuurder, verhuurmakelaar']),

  {
    style: 'h2',
    text: '16. U schakelt een NVM-makelaar in voor beheer van vastgoed, ruimtelijke ordening en aanverwante dienstverlening',
  },
  {
    style: 'normal',
    text: 'U schakelt een NVM-makelaar in om u te kunnen bijstaan op het gebied van het beheer van vastgoed, ruimtelijke ordening zoals omgevingsvergunningen, wijzigen bestemmingsplan, ontwerpen en/of aanbesteden van nieuw- en verbouwplannen, pachtzaken, onteigening e.d.',
  },
  {
    style: 'normal',
    text: 'Het doel dat de NVM-makelaar voor ogen heeft is u advies geven op bovengenoemde gebieden. Uw persoonsgegevens worden gebruikt om contact met u op te nemen en om u deskundig (schriftelijk en/of telefonisch) advies te geven op grond van de opdracht tot dienstverlening. Hieronder vindt u in hoofdlijnen gegevens die kunnen worden verwerkt:',
  },
  gegevens(
    ['Uw naam, adres en contactgegevens zoals uw telefoonnummer en e-mailadres.', 'a', '20 jaar'],
    ['Adviezen, overeenkomsten, inkomensgegevens, jaarrekeningen, pachtovereenkomsten, vergunningen, zoals bijvoorbeeld omgevingsvergunningen, onteigeningscontracten, bouwplannen en alle andere gegevens die noodzakelijk zijn voor de dienstverlening.', 'a', '20 jaar'],
  ),
  ontvangers([
    'a',
    'Vereniging van Eigenaren, terreinbeherende organisaties, zoals particuliere grondeigenaren, staatsbosbeheer, natuurmonumenten, gemeenten, provincies, waterschappen en Rijkswaterstaat, Pro-rail en dergelijke bedrijven.',
  ]),

  { style: 'h2', text: 'Gegevensgebruik door de NVM/brainbay' },
  {
    style: 'normal',
    text: 'De NVM-makelaar verstrekt via een koppeling bepaalde gegevens aan de NVM/brainbay.',
  },
  {
    style: 'normal',
    text: 'NVM/brainbay is voor de ontvangen gegevens de verwerkingsverantwoordelijke. De NVM/brainbay doet het volgende met deze gegevens:',
  },
  {
    list: 'number',
    items: [
      'Zorgen dat alle NVM-makelaars een actueel aanbod hebben van woningen, bedrijfspanden en agrarisch vastgoed die c.q. dat via NVM-makelaars worden c.q. wordt aangeboden.',
      'Zorgen dat het actuele aanbod geplaatst wordt op funda en andere (huizen)websites.',
      'Zorgen voor een database waardoor taxaties en andere waardebepalingen mogelijk zijn en inzichten opgebouwd kunnen worden over de ontwikkelingen in de woningmarkt, bedrijfsonroerendgoed markt en de agrarische vastgoedmarkt.',
    ],
  },

  {
    style: 'h3',
    text: 'A. Actueel aanbod woningen, bedrijfspanden en agrarisch vastgoed bij NVM-makelaars',
  },
  {
    style: 'normal',
    text: 'Als u een woning, bedrijfspand of agrarisch vastgoed via een NVM-makelaar wilt verkopen of verhuren, worden de volgende gegevens bekend gemaakt bij andere NVM-makelaars:',
  },
  {
    list: 'bullet',
    items: [
      'Het adres van de woning, het bedrijfspand of het agrarisch vastgoed, de omschrijving en kenmerken van het object zoals de vraagprijs, het bouwjaar, de oppervlaktes en indeling, kadastrale gegevens, WOZ-waarde en foto’s van het object.',
      'Datum dat het object op de markt komt, datum dat het object van de markt wordt gehaald. Verkoop onder voorbehoud, verkoopdatum en transactieprijs.',
    ],
  },
  {
    style: 'normal',
    text: 'Deze gegevens worden door NVM-makelaars gebruikt voor de dienstverlening aan hun klanten (zoekers naar een woning, bedrijfspand of agrarisch vastgoed).',
  },
  {
    style: 'normal',
    text: 'Deze gegevens worden onbeperkt bewaard in verband met de database met historisch aanbod, zie onder C.',
  },

  {
    style: 'h3',
    text: 'B. Actueel aanbod woningen, bedrijfspanden en agrarisch vastgoed op (huizen)websites, waaronder funda',
  },
  {
    style: 'normal',
    text: 'Als u een woning, een bedrijfspand of agrarisch vastgoed via een NVM-makelaar wilt verkopen of verhuren, kunnen in overleg met u ook gegevens bekend gemaakt worden bij funda en andere (huizen)websites. Het gaat dan om de volgende gegevens:',
  },
  {
    list: 'bullet',
    items: [
      'Het adres van de woning, het bedrijfspand of het agrarisch vastgoed, de omschrijving en kenmerken van het object zoals de vraagprijs, het bouwjaar, de oppervlaktes en indeling, kadastrale gegevens, WOZ-waarde en foto’s van het object.',
      'Datum dat het object op de markt komt, verkoopdatum.',
    ],
  },
  {
    style: 'normal',
    text: 'Met deze gegevens wordt uw object onder de aandacht gebracht bij consumenten, professionele partijen en/of derden die zelf zoeken via (woning)websites.',
  },
  {
    style: 'normal',
    text: 'Deze gegevens kunnen maximaal één jaar na de verkoopdatum c.q. de datum dat een woning, bedrijfspand of agrarisch vastgoed van de markt wordt gehaald nog zichtbaar zijn op deze websites.',
  },

  { style: 'h3', text: 'C. Database met historisch aanbod' },
  {
    style: 'normal',
    text: 'Van alle woningen, bedrijfspanden en agrarisch vastgoed die via een NVM-makelaar te koop of te huur worden aangeboden, worden de volgende gegevens in de NVM-database vastgelegd:',
  },
  {
    list: 'bullet',
    items: [
      'Het adres van de woning, het bedrijfspand of het agrarisch vastgoed, de omschrijving en kenmerken van het object zoals de vraagprijs, het bouwjaar, de oppervlaktes en indeling, kadastrale gegevens, WOZ-waarde en foto’s van het object.',
      'Datum dat het object op de markt komt, datum dat het object van de markt wordt gehaald. Verkoop onder voorbehoud, transactiedatum en transactieprijs.',
      'De postcode (1234AB) en huisnummer van het vorige (woon)adres van de koper.',
    ],
  },
  { style: 'normal', text: 'De hiervoor genoemde gegevens worden voor onbepaalde tijd bewaard.' },
  {
    style: 'normal',
    text: 'Met de hiervoor genoemde gegevens maakt brainbay in opdracht van de NVM analyses van de onroerendgoedmarkt mogelijk.',
  },
  {
    style: 'normal',
    text: 'De NVM/brainbay verstrekt deze gegevens voorts aan geselecteerde derden, namelijk:',
  },
  {
    list: 'bullet',
    items: [
      'NVM-taxateurs, voor het doen van taxaties en andere waardebepalingen.',
      'Validatie-instituten, na expliciete opdracht daartoe van een NVM-taxateur, voor het controleren van taxatierapporten.',
      'Gemeenten, voor het vaststellen van WOZ-waardes.',
      'Het Ministerie van Infrastructuur en Waterstaat, voor onderzoek naar de woningmarkt.',
      'Universiteiten, voor onderzoeksdoeleinden.',
      'NVM-makelaars in het kader van dienstverlening aan hun klanten.',
      'Niet NVM-makelaars, banken, projectontwikkelaars en woningbouwcorporaties, voor onderzoeksdoeleinden (bijvoorbeeld de woningbehoefte in een bepaalde regio).',
    ],
  },
  {
    style: 'normal',
    text: 'Deze partijen hebben uitsluitend toegang tot gegevens voor de genoemde doelen en waar mogelijk worden gegevens alleen op geaggregeerd niveau verstrekt.',
  },
  {
    style: 'normal',
    text: '**Interne audits en onderzoeken.** De NVM ziet uw gegevens mogelijk in wanneer zij onderzoek doet onder haar leden of de regels worden nageleefd en wanneer er vanuit de NVM een audit bij een NVM-lid plaatsvindt. Na inzage zullen deze gegevens niet langer worden verwerkt door de NVM.',
  },

  { style: 'h2', text: 'Inkijken, wijzigen of verwijderen van gegevens bij NVM/brainbay' },
  {
    style: 'normal',
    text: 'Wilt u de bij NVM/brainbay verwerkte gegevens inkijken, wijzigen of verwijderen, neem dan contact op met de NVM via [privacyhelpdesk@nvm.nl](mailto:privacyhelpdesk@nvm.nl). De NVM beoordeelt of u gerechtigd bent om het verzoek in te dienen en vervolgens of uw verzoek wordt ingewilligd.',
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
