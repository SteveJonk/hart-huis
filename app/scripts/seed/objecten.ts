/**
 * Seeds 6 mock objects (`woning` documents) so the aanbod- and objectpagina
 * have something to render before the Realworks import exists.
 *
 * Photos are reused from images already in the Sanity library — nothing is
 * uploaded. Documents get a deterministic `_id`, so re-running replaces them
 * instead of piling up duplicates.
 */
import {client, key} from './shared'

type Woning = {
  realworksId: number
  adres: string
  plaats: string
  postcode: string
  status: 'beschikbaar' | 'voorbehoud' | 'verkocht'
  prijs: number
  prijsConditie: 'k.k.' | 'v.o.n.'
  aangebodenSinds: string
  aanvaarding: string
  soortWoning: string
  soortBouw: string
  bouwjaar: number
  woonoppervlak: number
  buitenruimte?: number
  bergruimte?: number
  perceel?: number
  inhoud: number
  kamers: number
  slaapkamers: number
  badkamers: number
  badkamervoorzieningen: string[]
  voorzieningen: string[]
  energielabel: string
  isolatie: string
  verwarming: string
  ligging: string
  tuin?: string
  liggingTuin?: string
  berging?: string
  parkeren: string
  fotos: string[]
  tekst: string
  tekstEngels: string
}

const WONINGEN: Woning[] = [
  {
    realworksId: 4746641,
    adres: "Kees 't Hoenstraat 7",
    plaats: 'Spaarndam',
    postcode: '2064 XJ',
    status: 'beschikbaar',
    prijs: 800000,
    prijsConditie: 'k.k.',
    aangebodenSinds: '2026-08-01',
    aanvaarding: 'In overleg',
    soortWoning: 'Eengezinswoning, 2-onder-1-kapwoning',
    soortBouw: 'Bestaande bouw',
    bouwjaar: 1973,
    woonoppervlak: 168,
    buitenruimte: 9,
    bergruimte: 11,
    perceel: 256,
    inhoud: 604,
    kamers: 5,
    slaapkamers: 4,
    badkamers: 1,
    badkamervoorzieningen: ['Ligbad', 'Douche', 'Toilet'],
    voorzieningen: ['Mechanische ventilatie', 'Rookkanaal'],
    energielabel: 'A',
    isolatie: 'Dakisolatie, vloerisolatie, dubbel glas',
    verwarming: 'Warmtepomp (2025), vloerverwarming gedeeltelijk',
    ligging: 'Aan rustige weg, in woonwijk, vrij uitzicht, landelijk gelegen',
    tuin: 'Achtertuin, voortuin, zijtuin',
    liggingTuin: 'West',
    berging: 'Vrijstaand hout',
    parkeren: 'Openbaar parkeren',
    fotos: ['listing-1.jpg', 'story-big.jpg', 'hero-1.jpg', 'story-small.jpg', 'quote.jpg'],
    tekst:
      "**English below**<br><br>Wonen op een plek waar de natuur onderdeel is van je dagelijks leven!<br><br>Ben je een natuurliefhebber, zoek je rust en groen, maar wil je niet afgelegen wonen? Dan is dit zo'n plek die je vooral zelf moet komen ervaren.<br><br>Aan de groene rand van Spaarndam ligt deze verrassend ruime 2-onder-1-kapwoning van circa 168 m² met vier slaapkamers, op een plek waar rust, ruimte en natuur samenkomen. De woning ligt landelijk en rustig, met vrij uitzicht en recreatiegebied Spaarnwoude in de directe omgeving.<br><br>Wat deze plek bijzonder maakt, ervaar je al zodra je aankomt. Het vele volwassen groen rondom de woning zorgt voor een beschutte, natuurlijke sfeer. Geen strak aangelegde stadstuin, maar een tuin waarin bomen, planten en groene hoekjes samen een bijna bosachtig geheel vormen.<br><br>Binnen en buiten lopen op de begane grond in elkaar over. De ruime woonkamer staat dankzij de grote glazen puien volop in verbinding met het groen, en de aangebouwde serre is misschien wel de fijnste plek van het huis.<br><br>Goed om te weten:<br>- ruime 2-onder-1-kapwoning met ca. 168 m² woonoppervlakte<br>- gelegen op een perceel van 256 m² eigen grond<br>- energielabel A<br>- verwarming en warm water via warmtepomp (2025)<br>- begane grond voorzien van vloerverwarming<br>- aangebouwde serre uit 2019<br>- mogelijkheid om op de tweede verdieping twee slaapkamers te realiseren<br>- platte daken grotendeels vernieuwd in 2020<br>- twee houten bergingen in de tuin<br>- centraal gelegen tussen Haarlem en Amsterdam<br><br>**English**<br><br>Living in a place where nature is part of your daily life!<br><br>Are you a nature lover looking for peace and greenery without living in the middle of nowhere? This is one of those places you really have to experience for yourself.<br><br>On the green edge of Spaarndam you will find this surprisingly spacious semi-detached house of approximately 168 m² with four bedrooms. The house is quiet and rural, with open views and the Spaarnwoude recreational area right around the corner.<br><br>Inside and outside flow into one another on the ground floor. Thanks to the large glass doors the living room is fully connected to the greenery, and the conservatory may well be the nicest spot in the house.<br><br>Good to know:<br>- spacious semi-detached house with approximately 168 m² of living space<br>- situated on 256 m² of freehold land<br>- energy label A<br>- heating and hot water by heat pump (2025)<br>- underfloor heating on the ground floor<br>- conservatory added in 2019<br>- two wooden sheds in the garden<br>- centrally located between Haarlem and Amsterdam",
    tekstEngels:
      'Living in a place where nature is part of your daily life!<br><br>Are you a nature lover looking for peace and greenery without living in the middle of nowhere? This is one of those places you really have to experience for yourself.<br><br>On the green edge of Spaarndam you will find this surprisingly spacious semi-detached house of approximately 168 m² with four bedrooms. The house is quiet and rural, with open views and the Spaarnwoude recreational area right around the corner.<br><br>Inside and outside flow into one another on the ground floor. Thanks to the large glass doors the living room is fully connected to the greenery, and the conservatory may well be the nicest spot in the house.<br><br>Good to know:<br>- spacious semi-detached house with approximately 168 m² of living space<br>- situated on 256 m² of freehold land<br>- energy label A<br>- heating and hot water by heat pump (2025)<br>- underfloor heating on the ground floor<br>- conservatory added in 2019<br>- two wooden sheds in the garden<br>- centrally located between Haarlem and Amsterdam',
  },
  {
    realworksId: 4746642,
    adres: 'Dokter De Liefdestraat 9',
    plaats: 'Haarlem',
    postcode: '2033 CV',
    status: 'beschikbaar',
    prijs: 415000,
    prijsConditie: 'k.k.',
    aangebodenSinds: '2026-07-20',
    aanvaarding: 'In overleg',
    soortWoning: 'Bovenwoning',
    soortBouw: 'Bestaande bouw',
    bouwjaar: 1931,
    woonoppervlak: 74,
    buitenruimte: 6,
    perceel: undefined,
    inhoud: 248,
    kamers: 3,
    slaapkamers: 2,
    badkamers: 1,
    badkamervoorzieningen: ['Inloopdouche', 'Wastafelmeubel', 'Wasmachineaansluiting'],
    voorzieningen: ['Mechanische ventilatie', 'Dakraam'],
    energielabel: 'C',
    isolatie: 'Dakisolatie, dubbel glas',
    verwarming: 'CV-ketel (2021, eigendom)',
    ligging: 'In woonwijk, aan rustige weg',
    tuin: 'Geen tuin, wel balkon op het zuiden',
    liggingTuin: 'Zuid',
    berging: 'Berging op de begane grond',
    parkeren: 'Betaald parkeren, parkeervergunningen',
    fotos: ['listing-2.jpg', 'haarlem-straat.jpg', 'step-2.jpg', 'kantoor.jpg'],
    tekst:
      "Lichte bovenwoning op loopafstand van het centrum van Haarlem!<br><br>Een lichte bovenwoning in de geliefde Amsterdamse buurt, op loopafstand van het centrum van Haarlem en het Spaarne. Klaar om zo in te trekken.<br><br>Vanuit de gemeenschappelijke entree loop je via een eigen trapopgang naar de woonverdieping. De woonkamer aan de voorzijde is dankzij de brede erker en de hoge plafonds opvallend licht. De keuken aan de achterzijde grenst aan het balkon op het zuiden, waar je 's middags de zon hebt tot ver in de avond.<br><br>De buurt is rustig maar allesbehalve saai: de Zomerkade, de Amsterdamstraat en het Spaarne liggen om de hoek, en station Haarlem bereik je in tien minuten met de fiets.<br><br>Goed om te weten:<br>- circa 74 m² woonoppervlakte<br>- bouwjaar 1931, energielabel C<br>- actieve VvE, bijdrage € 78,- per maand<br>- cv-ketel uit 2021 (eigendom)<br>- volledig voorzien van dubbel glas<br>- balkon op het zuiden<br>- eigen berging op de begane grond<br>- centrum van Haarlem op loopafstand",
    tekstEngels:
      "A bright upstairs apartment within walking distance of Haarlem city centre!<br><br>This bright upstairs apartment sits in the popular Amsterdamse buurt, within walking distance of Haarlem city centre and the river Spaarne.<br><br>The living room at the front is remarkably light thanks to the wide bay window and the high ceilings. The kitchen at the back opens onto a south-facing balcony where you can enjoy the sun well into the evening.<br><br>Good to know:<br>- approximately 74 m² of living space<br>- built in 1931, energy label C<br>- active owners' association, € 78 per month<br>- boiler from 2021 (owned)<br>- double glazing throughout<br>- south-facing balcony<br>- private storage room on the ground floor",
  },
  {
    realworksId: 4746643,
    adres: 'Kempenlaan 31',
    plaats: 'Amsterdam',
    postcode: '1060 TH',
    status: 'beschikbaar',
    prijs: 575000,
    prijsConditie: 'k.k.',
    aangebodenSinds: '2026-06-18',
    aanvaarding: 'Per 1 december 2026',
    soortWoning: 'Eengezinswoning, tussenwoning',
    soortBouw: 'Bestaande bouw',
    bouwjaar: 1968,
    woonoppervlak: 110,
    buitenruimte: 8,
    bergruimte: 7,
    perceel: 142,
    inhoud: 392,
    kamers: 3,
    slaapkamers: 2,
    badkamers: 1,
    badkamervoorzieningen: ['Ligbad', 'Douche', 'Dubbele wastafel'],
    voorzieningen: ['Mechanische ventilatie', 'Zonnepanelen', 'Schuifpui'],
    energielabel: 'B',
    isolatie: 'Volledig geïsoleerd',
    verwarming: 'CV-ketel (2019), vloerverwarming gedeeltelijk',
    ligging: 'In woonwijk, aan park',
    tuin: 'Achtertuin, voortuin',
    liggingTuin: 'Oost',
    berging: 'Aangebouwd steen',
    parkeren: 'Parkeervergunningen, op eigen terrein',
    fotos: ['listing-3.jpg', 'hero-2.jpg', 'step-3.jpg', 'benefits.jpg'],
    tekst:
      'Ruime tussenwoning met het park voor de deur!<br><br>Een verrassend ruime tussenwoning aan de rand van Nieuw-West, met de speeltuin en het park letterlijk voor de deur.<br><br>De begane grond is een aantal jaar geleden opengebroken: woonkamer, eetkamer en keuken lopen in elkaar over en de schuifpui brengt de tuin naar binnen. Op de eerste verdieping liggen twee royale slaapkamers en de badkamer met ligbad en dubbele wastafel.<br><br>De vaste trap naar de tweede verdieping geeft toegang tot een grote, lichte zolderruimte. Deze wordt nu gebruikt als werkkamer en is eenvoudig te splitsen in twee extra kamers.<br><br>Goed om te weten:<br>- circa 110 m² woonoppervlakte op 142 m² eigen grond<br>- bouwjaar 1968, energielabel B<br>- twaalf zonnepanelen uit 2022 (eigendom)<br>- volledig geïsoleerd<br>- gedeeltelijk vloerverwarming<br>- eigen parkeerplaats op het achterterrein<br>- erfpacht eeuwigdurend afgekocht<br>- aanvaarding per 1 december 2026',
    tekstEngels:
      'A spacious terraced house with the park right across the street!<br><br>This surprisingly spacious terraced house sits on the edge of Nieuw-West, with the playground and the park right in front of the door.<br><br>The ground floor was opened up a few years ago: living room, dining area and kitchen flow into one another, and the sliding doors bring the garden inside. The first floor holds two generous bedrooms and the bathroom with a bathtub and double washbasin.<br><br>Good to know:<br>- approximately 110 m² of living space on 142 m² of freehold land<br>- built in 1968, energy label B<br>- twelve solar panels (2022), owned<br>- fully insulated<br>- private parking space at the rear<br>- ground lease bought off in perpetuity<br>- available from 1 December 2026',
  },
  {
    realworksId: 4746644,
    adres: 'Maluslaan 6',
    plaats: 'Amstelveen',
    postcode: '1185 KT',
    status: 'beschikbaar',
    prijs: 650000,
    prijsConditie: 'k.k.',
    aangebodenSinds: '2026-06-12',
    aanvaarding: 'In overleg',
    soortWoning: 'Eengezinswoning, hoekwoning',
    soortBouw: 'Bestaande bouw',
    bouwjaar: 1985,
    woonoppervlak: 126,
    buitenruimte: 12,
    bergruimte: 9,
    perceel: 214,
    inhoud: 455,
    kamers: 5,
    slaapkamers: 4,
    badkamers: 2,
    badkamervoorzieningen: ['Inloopdouche', 'Toilet', 'Wastafelmeubel', 'Vloerverwarming'],
    voorzieningen: ['Balansventilatie', 'Zonnepanelen', 'Glasvezel'],
    energielabel: 'A',
    isolatie: 'Volledig geïsoleerd',
    verwarming: 'Warmtepomp (2023), vloerverwarming geheel',
    ligging: 'In woonwijk, beschutte ligging, aan rustige weg',
    tuin: 'Achtertuin, zijtuin',
    liggingTuin: 'Zuidwest',
    berging: 'Aangebouwd steen, voorzien van elektra',
    parkeren: 'Op eigen terrein, openbaar parkeren',
    fotos: ['hero-3.jpg', 'step-4.jpg', 'wanneer.jpg', 'story-small.jpg', 'cta.jpg'],
    tekst:
      'Royale, volledig verduurzaamde hoekwoning in het groene Westwijk!<br><br>Een royale hoekwoning met vier slaapkamers, twee badkamers en een zonnige tuin op het zuidwesten.<br><br>De vorige eigenaren hebben de woning in 2023 grondig verduurzaamd: warmtepomp, vloerverwarming door het hele huis, balansventilatie en zestien zonnepanelen. Het resultaat is energielabel A en een verrassend lage energierekening voor een huis van dit formaat.<br><br>Door de hoekligging heeft de woning extra ramen aan de zijkant, waardoor de woonkamer de hele dag licht is. De zijtuin biedt bovendien ruimte voor een carport of een extra berging.<br><br>Goed om te weten:<br>- circa 126 m² woonoppervlakte op 214 m² eigen grond<br>- bouwjaar 1985, energielabel A<br>- warmtepomp en vloerverwarming door het hele huis (2023)<br>- zestien zonnepanelen (eigendom)<br>- balansventilatie en volledig geïsoleerd<br>- tweede badkamer op de begane grond<br>- aangebouwde stenen berging met elektra<br>- winkelcentrum Westwijk en de Amstelveenlijn op fietsafstand',
    tekstEngels:
      'A generous, fully upgraded corner house in leafy Westwijk!<br><br>This spacious corner house offers four bedrooms, two bathrooms and a sunny south-west facing garden.<br><br>The previous owners thoroughly upgraded the house in 2023: heat pump, underfloor heating throughout, balanced ventilation and sixteen solar panels. The result is energy label A and a surprisingly low energy bill for a house this size.<br><br>Good to know:<br>- approximately 126 m² of living space on 214 m² of freehold land<br>- built in 1985, energy label A<br>- heat pump and underfloor heating throughout (2023)<br>- sixteen solar panels, owned<br>- second bathroom on the ground floor<br>- brick shed with electricity<br>- shopping centre and tram line within cycling distance',
  },
  {
    realworksId: 4746645,
    adres: 'Engelandlaan 175',
    plaats: 'Haarlem',
    postcode: '2034 NA',
    status: 'voorbehoud',
    prijs: 550000,
    prijsConditie: 'k.k.',
    aangebodenSinds: '2026-06-04',
    aanvaarding: 'In overleg',
    soortWoning: 'Eengezinswoning, hoekwoning',
    soortBouw: 'Bestaande bouw',
    bouwjaar: 1962,
    woonoppervlak: 106,
    buitenruimte: 7,
    bergruimte: 6,
    perceel: 170,
    inhoud: 371,
    kamers: 5,
    slaapkamers: 4,
    badkamers: 1,
    badkamervoorzieningen: ['Ligbad', 'Douche', 'Toilet'],
    voorzieningen: ['Mechanische ventilatie', 'Wasruimte', 'TV-kabel'],
    energielabel: 'C',
    isolatie: 'Vloerisolatie, dubbel glas',
    verwarming: 'Remeha cv-ketel (2023, eigendom)',
    ligging: 'In woonwijk, aan rustige weg, vrij uitzicht',
    tuin: 'Achtertuin, voortuin',
    liggingTuin: 'Zuidoost',
    berging: 'Vrijstaand steen',
    parkeren: 'Openbaar parkeren',
    fotos: ['listing-1.jpg', 'step-5.jpg', 'spaarne.jpg', 'pagehero.jpg'],
    // Verbatim from the Realworks feed — keeps the "**English below**" pattern in the seed.
    tekst:
      '**English below**<br><br>Licht, ruim en verrassend compleet wonen op een fijne plek in Haarlem!<br><br>Ben je op zoek naar een ruime gezinswoning met een zonnige tuin, vrij uitzicht op een centrale locatie in Haarlem? Kom dan kijken bij deze fijne eengezinswoning aan de Engelandlaan 175!<br><br>Met een woonoppervlakte van circa 106 m² biedt deze woning verrassend veel leefruimte. De ligging op de hoek zorgt voor extra lichtinval en een prettig gevoel van ruimte, terwijl je aan de voorzijde geniet van vrij uitzicht.<br><br>De woonkamer is heerlijk licht dankzij de grote raampartijen en staat in directe verbinding met de achtertuin. De verzorgde achtertuin ligt gunstig op het zuidoosten, waardoor je hier vrijwel de hele dag van de zon kunt genieten. Met een achterom en een vrijstaande stenen berging is de tuin bovendien praktisch ingericht.<br><br>Op de eerste verdieping bevinden zich 2 slaapkamers, een wasruimte en de badkamer met douche, ligbad en 2e toilet. <br><br>De tweede verdieping biedt 2 slaapkamers welke ook gebruikt kunnen worden als thuiswerkplek, logeerkamer of hobbyruimte. Hierdoor groeit de woning moeiteloos mee met jouw woonwensen.<br><br>De woning is gebouwd in 1962 en beschikt over een energielabel C. Dankzij vloerisolatie, dubbel glas en een in 2023 geplaatste Remeha cv-ketel woon je hier comfortabel en energiezuiniger dan je wellicht zou verwachten.<br><br>De ligging is bijzonder prettig. In de directe omgeving vind je scholen, winkels, sportvoorzieningen en openbaar vervoer. Bovendien ben je binnen enkele minuten in het gezellige centrum van Haarlem, terwijl ook uitvalswegen richting Amsterdam, Schiphol en de kust eenvoudig bereikbaar zijn.<br><br>Kortom: een ruime hoekwoning met veel licht, een zonnige tuin, vrij uitzicht op een fijne locatie in Haarlem. <br><br>Goed om te weten:<br>- ruime hoekwoning met ca. 106 m² woonoppervlakte<br>- gelegen op een perceel van 170 m² eigen grond<br>- keuken vernieuwd in 2022<br>- vrij uitzicht aan de voorzijde<br>- lichte woonkamer met grote raampartijen<br>- zonnige achtertuin met achterom<br>- royale voortuin<br>- 4 slaapkamers<br>- energielabel C<br>- voorzien van vloerisolatie en dubbel glas<br>- Remeha cv-ketel uit 2023 (eigendom)<br>- centrum van Haarlem op korte afstand<br><br>**English**<br><br>Bright, spacious and surprisingly complete family home in a great location in Haarlem!<br><br>Are you looking for a spacious family home with a sunny garden, open views and a convenient location in Haarlem? Then be sure to visit this lovely family home at Engelandlaan 175!<br><br>With approximately 106 m² of living space, this property offers an impressive amount of room. Its corner position provides extra natural light and a pleasant sense of space, while the front of the house enjoys unobstructed views.<br><br>The living room is wonderfully bright thanks to the large windows and has direct access to the rear garden. The well-maintained garden is ideally positioned facing southeast, allowing you to enjoy the sun for most of the day. The garden also features a rear entrance and a detached brick storage shed, making it both practical and enjoyable.<br><br>The first floor offers two bedrooms, a laundry room, and a bathroom equipped with a shower, bathtub, and second toilet.<br><br>The second floor provides two additional bedrooms, which can also be used as a home office, guest room, or hobby space. This flexibility allows the home to adapt easily to your changing lifestyle and needs.<br><br>Built in 1962, the property has an energy label C. Thanks to floor insulation, double glazing, and a Remeha central heating boiler installed in 2023, the home offers a comfortable and energy-efficient living environment.<br><br>The location is particularly attractive. Schools, shops, sports facilities, and public transport are all within easy reach. The vibrant city centre of Haarlem can be reached within minutes, while major roads to Amsterdam, Schiphol Airport, and the coast are easily accessible as well.<br><br>In short: a spacious corner house with plenty of natural light, a sunny garden, open views, and an excellent location in Haarlem.<br><br>Good to know:<br>- Spacious corner house with approximately 106 m² of living space<br>- Situated on 170 m² of freehold land<br>- Kitchen renovated in 2022<br>- Open views at the front<br>- Bright living room with large windows<br>- Sunny rear garden with rear access<br>- large front garden offering additional outdoor space and privacy<br>- 4 bedrooms<br>- Energy label C<br>- Equipped with floor insulation and double glazing<br>- Remeha central heating boiler (owned), installed in 2023<br>- Haarlem city centre within short distance<br>- Conveniently located near shops, schools, public transport, Amsterdam, Schiphol Airport and the coast',
    tekstEngels:
      'Bright, spacious and surprisingly complete family home in a great location in Haarlem!<br><br>Are you looking for a spacious family home with a sunny garden, open views and a convenient location in Haarlem? Then be sure to visit this lovely family home at Engelandlaan 175!<br><br>With approximately 106 m² of living space, this property offers an impressive amount of room. Its corner position provides extra natural light and a pleasant sense of space, while the front of the house enjoys unobstructed views.<br><br>The living room is wonderfully bright thanks to the large windows and has direct access to the rear garden. The well-maintained garden is ideally positioned facing southeast, allowing you to enjoy the sun for most of the day.<br><br>The first floor offers two bedrooms, a laundry room, and a bathroom equipped with a shower, bathtub, and second toilet. The second floor provides two additional bedrooms, which can also be used as a home office, guest room, or hobby space.<br><br>Good to know:<br>- Spacious corner house with approximately 106 m² of living space<br>- Situated on 170 m² of freehold land<br>- Kitchen renovated in 2022<br>- Sunny rear garden with rear access<br>- 4 bedrooms<br>- Energy label C<br>- Remeha central heating boiler (owned), installed in 2023<br>- Haarlem city centre within short distance',
  },
  {
    realworksId: 4746646,
    adres: 'Van Zeggelenstraat 120',
    plaats: 'Haarlem',
    postcode: '2032 AS',
    status: 'verkocht',
    prijs: 450000,
    prijsConditie: 'k.k.',
    aangebodenSinds: '2026-05-22',
    aanvaarding: 'In overleg',
    soortWoning: 'Benedenwoning',
    soortBouw: 'Bestaande bouw',
    bouwjaar: 1928,
    woonoppervlak: 89,
    bergruimte: 5,
    perceel: 96,
    inhoud: 289,
    kamers: 4,
    slaapkamers: 2,
    badkamers: 1,
    badkamervoorzieningen: ['Douche', 'Toilet', 'Wastafel'],
    voorzieningen: ['Rookkanaal', 'Natuurlijke ventilatie'],
    energielabel: 'D',
    isolatie: 'Gedeeltelijk dubbel glas, vloerisolatie',
    verwarming: 'CV-ketel (2017), open haard',
    ligging: 'In woonwijk, in centrum',
    tuin: 'Achtertuin',
    liggingTuin: 'Zuidwest',
    berging: 'Vrijstaand hout',
    parkeren: 'Parkeervergunningen, betaald parkeren',
    fotos: ['listing-2.jpg', 'story-big.jpg', 'intro-team.jpg', 'cta-office.jpg'],
    tekst:
      'Karakteristieke benedenwoning met en-suite en een diepe zonnige tuin!<br><br>Een karakteristieke benedenwoning uit 1928 in de Transvaalbuurt, met en-suite deuren, een originele schouw en een diepe tuin op het zuidwesten.<br><br>De jarendertigdetails zijn bewaard gebleven: paneeldeuren, glas-in-lood in het voorportaal en een schouw met open haard in de voorkamer. Tegelijk is de woning praktisch bij de tijd gebracht met een moderne keuken en een badkamer uit 2016.<br><br>De tuin is met bijna twaalf meter uitzonderlijk diep voor deze buurt en heeft een houten berging en een achterom.<br><br>Goed om te weten:<br>- circa 89 m² woonoppervlakte<br>- bouwjaar 1928, energielabel D<br>- originele en-suite deuren en schouw met open haard<br>- keuken en badkamer vernieuwd in 2016<br>- diepe achtertuin op het zuidwesten met achterom<br>- houten berging in de tuin<br>- cv-ketel uit 2017<br>- op loopafstand van de Zijlweg en het centrum',
    tekstEngels:
      'A characterful ground-floor apartment with en-suite doors and a deep sunny garden!<br><br>This characterful 1928 ground-floor apartment in the Transvaalbuurt features en-suite doors, an original fireplace and a deep south-west facing garden.<br><br>The 1930s details have been preserved: panelled doors, stained glass in the entrance hall and a fireplace in the front room. At the same time the kitchen and the 2016 bathroom bring the house up to date.<br><br>Good to know:<br>- approximately 89 m² of living space<br>- built in 1928, energy label D<br>- original en-suite doors and open fireplace<br>- unusually deep garden with rear access<br>- wooden shed in the garden<br>- within walking distance of the Zijlweg and the city centre',
  },
]

const STATUS_LABEL = {
  beschikbaar: 'Beschikbaar',
  voorbehoud: 'Verkocht onder voorbehoud',
  verkocht: 'Verkocht',
} as const

const euro = (value: number) => `€ ${value.toLocaleString('nl-NL')},-`
const datum = (iso: string) =>
  new Date(iso).toLocaleDateString('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'})

function slugify(woning: Woning) {
  return `${woning.adres} ${woning.plaats}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** One row; dropped when the value is missing, so nulls from the feed stay out of the table. */
function rij(label: string, waarde: string | number | string[] | undefined) {
  if (waarde === undefined || waarde === '') return null
  const values = Array.isArray(waarde) ? waarde : [String(waarde)]
  return {_key: key(label), label, waarde: values}
}

function kenmerkGroepen(w: Woning) {
  const groepen = [
    [
      'Overdracht',
      [
        rij('Vraagprijs', `${euro(w.prijs)} ${w.prijsConditie}`),
        rij('Aangeboden sinds', datum(w.aangebodenSinds)),
        rij('Status', STATUS_LABEL[w.status]),
        rij('Aanvaarding', w.aanvaarding),
      ],
    ],
    [
      'Bouw',
      [
        rij('Soort woonhuis', w.soortWoning),
        rij('Soort bouw', w.soortBouw),
        rij('Bouwjaar', w.bouwjaar),
      ],
    ],
    [
      'Oppervlakten en inhoud',
      [
        rij('Wonen', `${w.woonoppervlak} m²`),
        rij('Gebouwgebonden buitenruimte', w.buitenruimte && `${w.buitenruimte} m²`),
        rij('Externe bergruimte', w.bergruimte && `${w.bergruimte} m²`),
        rij('Perceel', w.perceel && `${w.perceel} m²`),
        rij('Inhoud', `${w.inhoud} m³`),
      ],
    ],
    [
      'Indeling',
      [
        rij('Aantal kamers', w.kamers),
        rij('Aantal slaapkamers', w.slaapkamers),
        rij('Aantal badkamers', w.badkamers),
        rij('Badkamervoorzieningen', w.badkamervoorzieningen),
        rij('Voorzieningen', w.voorzieningen),
      ],
    ],
    [
      'Energie',
      [
        rij('Energielabel', w.energielabel),
        rij('Isolatie', w.isolatie),
        rij('Verwarming', w.verwarming),
      ],
    ],
    [
      'Buitenruimte en parkeren',
      [
        rij('Ligging', w.ligging),
        rij('Tuin', w.tuin),
        rij('Ligging tuin', w.liggingTuin),
        rij('Schuur / berging', w.berging),
        rij('Parkeergelegenheid', w.parkeren),
      ],
    ],
  ] as const

  return groepen.map(([titel, rijen]) => ({
    _type: 'kenmerkGroep',
    _key: key(`${w.realworksId}-${titel}`),
    titel,
    rijen: rijen.filter((row) => row !== null),
  }))
}

/** Resolve every photo filename to an asset already in the library, in one query. */
async function photoAssets(filenames: string[]) {
  const assets = await client.fetch<{_id: string; originalFilename: string}[]>(
    `*[_type == "sanity.imageAsset" && originalFilename in $filenames]{_id, originalFilename}`,
    {filenames},
  )
  const byName = new Map(assets.map((asset) => [asset.originalFilename, asset._id]))

  const missing = filenames.filter((name) => !byName.has(name))
  if (missing.length > 0) {
    throw new Error(
      `These images are not in the Sanity library yet: ${missing.join(', ')}. Run another seed target first.`,
    )
  }
  return byName
}

export async function seedObjecten() {
  console.log('Seeding objecten…')

  const filenames = [...new Set(WONINGEN.flatMap((w) => w.fotos))]
  const assetsByName = await photoAssets(filenames)

  for (const w of WONINGEN) {
    const slug = slugify(w)
    await client.createOrReplace({
      _id: `woning-${slug}`,
      _type: 'woning',
      realworksId: w.realworksId,
      adres: w.adres,
      slug: {_type: 'slug', current: slug},
      postcode: w.postcode,
      plaats: w.plaats,
      status: w.status,
      prijs: w.prijs,
      prijsConditie: w.prijsConditie,
      aangebodenSinds: w.aangebodenSinds,
      aanvaarding: w.aanvaarding,
      soortWoning: w.soortWoning,
      bouwjaar: w.bouwjaar,
      woonoppervlak: w.woonoppervlak,
      ...(w.perceel ? {perceel: w.perceel} : {}),
      inhoud: w.inhoud,
      kamers: w.kamers,
      slaapkamers: w.slaapkamers,
      energielabel: w.energielabel,
      kenmerkGroepen: kenmerkGroepen(w),
      aanbiedingsTekst: w.tekst,
      aanbiedingsTekstEngels: w.tekstEngels,
      fotos: w.fotos.map((filename, index) => ({
        _type: 'image',
        _key: key(`${w.realworksId}-${filename}-${index}`),
        asset: {_type: 'reference', _ref: assetsByName.get(filename)!},
        alt: `${w.adres} in ${w.plaats} — foto ${index + 1}`,
      })),
    })
    console.log(`  ✓ ${w.adres}, ${w.plaats} (${STATUS_LABEL[w.status]})`)
  }

  console.log(`✓ ${WONINGEN.length} objecten geseed`)
}
