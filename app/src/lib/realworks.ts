/**
 * Vertaalt een object uit de Realworks-feed (`/wonen/v3/objecten`) naar een
 * `woning`-document zoals de studio en de site dat verwachten.
 *
 * Alleen mappen — geen netwerk, geen Sanity. Daardoor te testen tegen de
 * opgeslagen feed: `npm run check:realworks`.
 *
 * De feed levert vrijwel alles als ENUM_IN_HOOFDLETTERS of als null. `label()`
 * maakt daar leesbare tekst van; wat null is valt weg, zodat er geen lege
 * regels in de kenmerkentabel belanden.
 */
import { createHash } from 'node:crypto';

export const REALWORKS_URL = 'https://api.realworks.nl/wonen/v3/objecten?actief=true';

/** Alleen de takken die we echt gebruiken; de feed bevat veel meer. */
export type RealworksMedia = {
  soort?: string | null;
  mimetype?: string | null;
  volgnummer?: number | null;
  vrijgave?: boolean | null;
  link?: string | null;
  omschrijving?: string | null;
};

export type RealworksObject = {
  id: number;
  actief?: boolean | null;
  media?: RealworksMedia[] | null;
  marketing?: { publicatiedatum?: string | null } | null;
  object?: { type?: { objecttype?: string | null } | null } | null;
  adres?: {
    straat?: string | null;
    huisnummer?: { hoofdnummer?: string | null; toevoeging?: string | null } | null;
    postcode?: string | null;
    plaats?: string | null;
  } | null;
  teksten?: {
    aanbiedingstekst?: string | null;
    aanbiedingstekstEngels?: string | null;
  } | null;
  financieel?: {
    overdracht?: {
      status?: string | null;
      koopprijs?: number | null;
      koopconditie?: string | null;
      aanvaarding?: string | null;
    } | null;
  } | null;
  algemeen?: {
    woonhuissoort?: string | null;
    woonhuistype?: string | null;
    appartementsoort?: string | null;
    bouwvorm?: string | null;
    bouwjaar?: string | null;
    aantalKamers?: string | null;
    woonoppervlakte?: number | null;
    inhoud?: number | null;
    gebruiksoppervlakteOverig?: number | null;
    totaleKadestraleOppervlakte?: number | null;
    energieklasse?: string | null;
    isolatievormen?: string[] | null;
    verwarmingsoorten?: string[] | null;
    voorzieningenWonen?: string[] | null;
    liggingen?: string[] | null;
    cvKetelBouwjaar?: string | null;
  } | null;
  detail?: {
    etages?: Array<{
      aantalSlaapkamers?: number | null;
      badkamers?: Array<{ voorzieningen?: string[] | null }> | null;
    }> | null;
    buitenruimte?: {
      tuintypes?: string[] | null;
      hoofdtuinlocatie?: string | null;
      schuurBergingSoort?: string | null;
      parkeerfaciliteiten?: string[] | null;
      oppervlakteExterneBergruimte?: number | null;
    } | null;
  } | null;
};

/** Uitzonderingen waar het generieke recept lelijk uitpakt. */
const LABELS: Record<string, string> = {
  CV_KETEL: 'CV-ketel',
  WARMTE_TERUGWININSTALLATIE: 'Warmteterugwinning',
  GLASVEZEL_KABEL: 'Glasvezelkabel',
  TWEE_ONDER_EEN_KAPWONING: '2-onder-1-kapwoning',
  KOSTEN_KOPER: 'k.k.',
  VRIJ_OP_NAAM: 'v.o.n.',
  BESCHIKBAAR: 'Beschikbaar',
  ONDER_BOD: 'Onder bod',
  VERKOCHT_ONDER_VOORBEHOUD: 'Verkocht onder voorbehoud',
  VERKOCHT: 'Verkocht',
};

/** ENUM_WAARDE → "Enum waarde". */
export function label(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  if (LABELS[value]) return LABELS[value];
  const words = value.toLowerCase().replace(/_/g, ' ').trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : undefined;
}

/** Lijst als één zin: "Dakisolatie, vloerisolatie, dubbel glas". */
export function sentence(values: string[] | null | undefined): string | undefined {
  const labels = (values ?? []).map(label).filter(Boolean) as string[];
  if (labels.length === 0) return undefined;
  return labels
    .map((text, index) =>
      index === 0 ? text : text.charAt(0).toLowerCase() + text.slice(1),
    )
    .join(', ');
}

/** De feed schrijft plaatsnamen in kapitalen. */
function plaatsnaam(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  return value
    .toLowerCase()
    .replace(
      /(^|[\s'-])([a-z])/g,
      (_, prefix: string, char: string) => prefix + char.toUpperCase(),
    );
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const STATUS: Record<string, 'beschikbaar' | 'voorbehoud' | 'verkocht'> = {
  BESCHIKBAAR: 'beschikbaar',
  ONDER_BOD: 'beschikbaar',
  ONDER_OPTIE: 'beschikbaar',
  VERKOCHT_ONDER_VOORBEHOUD: 'voorbehoud',
  VERKOCHT: 'verkocht',
  VERHUURD: 'verkocht',
};

const ENERGIELABELS = ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

const euro = (value: number) => `€ ${value.toLocaleString('nl-NL')},-`;
const datum = (iso: string) =>
  new Date(iso).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

/** Eén rij; valt weg zodra de feed niets levert. */
function rij(naam: string, waarde: string | number | string[] | undefined | null) {
  if (waarde === undefined || waarde === null || waarde === '') return null;
  const values = (Array.isArray(waarde) ? waarde : [String(waarde)]).filter(Boolean);
  if (values.length === 0) return null;
  return {
    _key: createHash('sha1').update(naam).digest('hex').slice(0, 12),
    _type: 'kenmerk' as const,
    label: naam,
    waarde: values,
  };
}

export type WoningFoto = { url: string; filename: string; alt: string };

export type MappedWoning = {
  realworksId: number;
  slug: string;
  fotos: WoningFoto[];
  brochure?: { url: string; filename: string };
  /** Alles wat rechtstreeks in het `woning`-document gaat, behalve fotos/brochure. */
  fields: Record<string, unknown>;
};

/**
 * Realworks levert standaard een **thumbnail van 150×100**. Groter kan met
 * `width` én `height` samen — één van de twee alleen doet niets (`width=1600`
 * in z'n eentje geeft 225×150). De afbeelding wordt binnen dat kader geschaald
 * met behoud van verhouding, en nooit verder opgeblazen dan het origineel
 * (in de praktijk 3000×2000). 1200 px is ruim genoeg voor de site; Sanity
 * maakt daar zelf de kleinere varianten van.
 */
export const FOTO_KADER = 1200;

export function fotoUrl(link: string): string {
  return `${link}${link.includes('?') ? '&' : '?'}width=${FOTO_KADER}&height=${FOTO_KADER}`;
}

/**
 * Bestandsnaam uit de media-link, zonder de query met de handtekening. Het
 * kader zit in de naam: verandert `FOTO_KADER`, dan is het een ander bestand en
 * laadt de import hem opnieuw in plaats van de oude maat te hergebruiken.
 */
export function mediaFilename(link: string, kader?: number): string {
  const path = link.split('?')[0];
  const naam = path.slice(path.lastIndexOf('/') + 1);
  if (!kader) return naam;
  const punt = naam.lastIndexOf('.');
  return punt < 0
    ? `${naam}-w${kader}`
    : `${naam.slice(0, punt)}-w${kader}${naam.slice(punt)}`;
}

export function toWoning(object: RealworksObject): MappedWoning {
  const algemeen = object.algemeen ?? {};
  const buiten = object.detail?.buitenruimte ?? {};
  const overdracht = object.financieel?.overdracht ?? {};
  const etages = object.detail?.etages ?? [];

  const straat = object.adres?.straat?.trim() ?? '';
  const nummer = [
    object.adres?.huisnummer?.hoofdnummer,
    object.adres?.huisnummer?.toevoeging,
  ]
    .filter(Boolean)
    .join('');
  const adres = [straat, nummer].filter(Boolean).join(' ') || `Object ${object.id}`;
  const plaats = plaatsnaam(object.adres?.plaats) ?? '';
  const slug = slugify(`${adres} ${plaats}`);

  const publicatie = object.marketing?.publicatiedatum ?? undefined;
  const aangebodenSinds = publicatie ? publicatie.slice(0, 10) : undefined;

  const soortWoning =
    [label(algemeen.woonhuissoort), label(algemeen.woonhuistype)]
      .filter(Boolean)
      .join(', ') ||
    label(algemeen.appartementsoort) ||
    label(object.object?.type?.objecttype);

  const slaapkamers = etages.reduce(
    (total, etage) => total + (etage.aantalSlaapkamers ?? 0),
    0,
  );
  const badkamerLijst = etages.flatMap((etage) => etage.badkamers ?? []);
  const badkamervoorzieningen = [
    ...new Set(badkamerLijst.flatMap((badkamer) => badkamer.voorzieningen ?? [])),
  ]
    .map(label)
    .filter(Boolean) as string[];

  const energielabel = algemeen.energieklasse ?? undefined;
  const kamers = Number(algemeen.aantalKamers) || undefined;
  const bouwjaar = Number(algemeen.bouwjaar) || undefined;
  const prijs = overdracht.koopprijs ?? undefined;
  const prijsConditie = label(overdracht.koopconditie);

  const verwarming = sentence(algemeen.verwarmingsoorten)?.replace(
    /CV-ketel/,
    algemeen.cvKetelBouwjaar && Number(algemeen.cvKetelBouwjaar)
      ? `CV-ketel (${algemeen.cvKetelBouwjaar})`
      : 'CV-ketel',
  );

  const groepen: Array<[string, ReturnType<typeof rij>[]]> = [
    [
      'Overdracht',
      [
        rij(
          'Vraagprijs',
          prijs ? `${euro(prijs)} ${prijsConditie ?? ''}`.trim() : undefined,
        ),
        rij('Aangeboden sinds', aangebodenSinds ? datum(aangebodenSinds) : undefined),
        rij('Status', label(overdracht.status)),
        rij('Aanvaarding', label(overdracht.aanvaarding)),
      ],
    ],
    [
      'Bouw',
      [
        rij('Soort woonhuis', soortWoning),
        rij('Soort bouw', label(algemeen.bouwvorm)),
        rij('Bouwjaar', bouwjaar),
      ],
    ],
    [
      'Oppervlakten en inhoud',
      [
        rij(
          'Wonen',
          algemeen.woonoppervlakte ? `${algemeen.woonoppervlakte} m²` : undefined,
        ),
        rij(
          'Gebouwgebonden buitenruimte',
          algemeen.gebruiksoppervlakteOverig
            ? `${algemeen.gebruiksoppervlakteOverig} m²`
            : undefined,
        ),
        rij(
          'Externe bergruimte',
          buiten.oppervlakteExterneBergruimte
            ? `${buiten.oppervlakteExterneBergruimte} m²`
            : undefined,
        ),
        rij(
          'Perceel',
          algemeen.totaleKadestraleOppervlakte
            ? `${algemeen.totaleKadestraleOppervlakte} m²`
            : undefined,
        ),
        rij('Inhoud', algemeen.inhoud ? `${algemeen.inhoud} m³` : undefined),
      ],
    ],
    [
      'Indeling',
      [
        rij('Aantal kamers', kamers),
        rij('Aantal slaapkamers', slaapkamers || undefined),
        rij('Aantal badkamers', badkamerLijst.length || undefined),
        rij('Badkamervoorzieningen', badkamervoorzieningen),
        rij('Voorzieningen', sentence(algemeen.voorzieningenWonen)),
      ],
    ],
    [
      'Energie',
      [
        rij('Energielabel', energielabel),
        rij('Isolatie', sentence(algemeen.isolatievormen)),
        rij('Verwarming', verwarming),
      ],
    ],
    [
      'Buitenruimte en parkeren',
      [
        rij('Ligging', sentence(algemeen.liggingen)),
        rij('Tuin', sentence(buiten.tuintypes)),
        rij('Ligging tuin', label(buiten.hoofdtuinlocatie)),
        rij('Schuur / berging', label(buiten.schuurBergingSoort)),
        rij('Parkeergelegenheid', sentence(buiten.parkeerfaciliteiten)),
      ],
    ],
  ];

  const kenmerkGroepen = groepen
    .map(([titel, rijen]) => ({
      _type: 'kenmerkGroep' as const,
      _key: createHash('sha1')
        .update(`${object.id}-${titel}`)
        .digest('hex')
        .slice(0, 12),
      titel,
      rijen: rijen.filter((row) => row !== null),
    }))
    .filter((groep) => groep.rijen.length > 0);

  // Hoofdfoto eerst, daarna op volgnummer. Plattegronden blijven buiten de
  // galerij; de site heeft er geen plek voor.
  const media = (object.media ?? []).filter(
    (item) => item.vrijgave !== false && item.link,
  );
  const fotos = media
    .filter(
      (item) =>
        item.mimetype?.startsWith('image/') &&
        (item.soort === 'HOOFDFOTO' || item.soort === 'FOTO'),
    )
    .sort(
      (a, b) =>
        (a.soort === 'HOOFDFOTO' ? 0 : 1) - (b.soort === 'HOOFDFOTO' ? 0 : 1) ||
        (a.volgnummer ?? 0) - (b.volgnummer ?? 0),
    )
    .map((item, index) => ({
      url: fotoUrl(item.link as string),
      filename: mediaFilename(item.link as string, FOTO_KADER),
      alt: `${adres} in ${plaats} — foto ${index + 1}`,
    }));

  const document = media.find((item) => item.mimetype === 'application/pdf');

  return {
    realworksId: object.id,
    slug,
    fotos,
    brochure: document
      ? {
          url: document.link as string,
          filename: mediaFilename(document.link as string),
        }
      : undefined,
    fields: {
      realworksId: object.id,
      adres,
      slug: { _type: 'slug', current: slug },
      postcode: object.adres?.postcode ?? undefined,
      plaats,
      status: STATUS[overdracht.status ?? ''] ?? 'beschikbaar',
      prijs,
      // Het schema kent alleen k.k. en v.o.n.; iets anders laten we leeg.
      prijsConditie:
        prijsConditie === 'k.k.' || prijsConditie === 'v.o.n.'
          ? prijsConditie
          : undefined,
      aangebodenSinds,
      aanvaarding: label(overdracht.aanvaarding),
      soortWoning,
      bouwjaar,
      woonoppervlak: algemeen.woonoppervlakte || undefined,
      // 0 betekent in deze feed "niet ingevuld" (een appartement heeft geen perceel).
      perceel: algemeen.totaleKadestraleOppervlakte || undefined,
      inhoud: algemeen.inhoud || undefined,
      kamers,
      slaapkamers: slaapkamers || undefined,
      energielabel:
        energielabel && ENERGIELABELS.includes(energielabel) ? energielabel : undefined,
      kenmerkGroepen,
      aanbiedingsTekst: object.teksten?.aanbiedingstekst || undefined,
      aanbiedingsTekstEngels: object.teksten?.aanbiedingstekstEngels || undefined,
    },
  };
}

/** Foto zoals hij in Sanity staat, met de bestandsnaam van de asset erbij. */
export type BestaandeFoto = Record<string, unknown> & { bestandsnaam?: string | null };

export type BestaandeWoning = {
  _id: string;
  realworksId: number | null;
  fotos?: BestaandeFoto[] | null;
  brochure?: Record<string, unknown> | null;
};

/** De projectie hierboven zet `bestandsnaam` erbij; die hoort niet in het document. */
export function zonderBestandsnaam(foto: BestaandeFoto) {
  const rest = { ...foto };
  delete rest.bestandsnaam;
  return rest;
}

/**
 * Wat er voor één object aan media gedaan moet worden. `behouden` staat al in
 * Sanity en blijft ongemoeid; `laden` moet nog opgehaald worden en komt erachter.
 */
export type MediaPlan = {
  object: MappedWoning;
  bestaandDoc?: BestaandeWoning;
  behouden: BestaandeFoto[];
  laden: MappedWoning['fotos'];
  brochureLaden: boolean;
};

/**
 * Bepaalt per object welke foto's er nog bij moeten. Staan er al foto's op het
 * document, dan blijven die staan; alleen als de feed er méér heeft dan het
 * document worden de ontbrekende (op bestandsnaam) toegevoegd. Zo blijven
 * volgorde en alt-teksten uit de studio intact en groeit de galerij toch mee
 * met Realworks.
 */
export function planMedia(object: MappedWoning, bestaandDoc?: BestaandeWoning): MediaPlan {
  const behouden = Array.isArray(bestaandDoc?.fotos) ? bestaandDoc.fotos : [];
  const brochureLaden = Boolean(object.brochure) && !bestaandDoc?.brochure;

  if (behouden.length === 0) {
    return { object, bestaandDoc, behouden, laden: object.fotos, brochureLaden };
  }

  if (object.fotos.length <= behouden.length) {
    return { object, bestaandDoc, behouden, laden: [], brochureLaden };
  }

  const aanwezig = new Set(
    behouden.map((foto) => foto.bestandsnaam).filter((naam): naam is string => Boolean(naam)),
  );
  return {
    object,
    bestaandDoc,
    behouden,
    laden: object.fotos.filter((foto) => !aanwezig.has(foto.filename)),
    brochureLaden,
  };
}

/** `_key` die niet botst met de sleutels die al op het document staan. */
export function vrijeKey(basis: string, gebruikt: Set<string>) {
  let key = basis;
  let n = 2;
  while (gebruikt.has(key)) key = `${basis}-${n++}`;
  gebruikt.add(key);
  return key;
}
