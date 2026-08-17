import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/blocks/CtaBand';
import type { ListingItem } from '@/components/blocks/Listings';
import { ObjectDescription } from '@/components/object/ObjectDescription';
import { ObjectFeatures } from '@/components/object/ObjectFeatures';
import { ObjectGallery, type GalleryPhoto } from '@/components/object/ObjectGallery';
import { ObjectHeader } from '@/components/object/ObjectHeader';
import { ObjectSidebar } from '@/components/object/ObjectSidebar';
import { SimilarObjects } from '@/components/object/SimilarObjects';
import { Wrap } from '@/components/ui/Wrap';
import { client } from '@/sanity/client';
import { imageSrc, toImage } from '@/sanity/image';
import { pageMetadata } from '@/sanity/metadata';
import { WONING_QUERY } from '@/sanity/queries';
import type { WONING_QUERY_RESULT } from '@/sanity/sanity.types';
import { euro } from '@/lib/format';
import { OBJECT_CTA, statusOf } from '@/lib/object-content';

const options = { next: { revalidate: 30 } };

/** Precies wat WONING_QUERY teruggeeft — afgeleid, niet nagetypt. */
type Woning = NonNullable<WONING_QUERY_RESULT>;
type WoningCard = Woning['vergelijkbaar'][number];

type ObjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getWoning(slug: string) {
  return client.fetch(WONING_QUERY, { slug }, options);
}

function toCard(woning: WoningCard): ListingItem {
  const { label, tone } = statusOf(woning.status);
  const meta = [
    woning.woonoppervlak ? `${woning.woonoppervlak} m²` : null,
    woning.kamers ? `${woning.kamers} kamers` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return {
    href: `/aanbod/${woning.slug}`,
    status: label,
    tone,
    place: woning.plaats,
    title: woning.adres,
    meta,
    price: euro(woning.prijs) ?? 'Prijs op aanvraag',
    image: toImage(woning.foto, 800, 600) ?? { src: '', alt: woning.adres },
  };
}

export async function generateMetadata({ params }: ObjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const woning = await getWoning(slug);

  if (!woning) {
    return pageMetadata(null);
  }

  return pageMetadata({
    title: `${woning.adres}, ${woning.plaats}`,
    seo: woning.seo,
  });
}

export default async function ObjectPage({ params }: ObjectPageProps) {
  const { slug } = await params;
  const woning = await getWoning(slug);

  if (!woning) {
    notFound();
  }

  const photos: GalleryPhoto[] = (woning.fotos ?? [])
    .map((foto, index) => {
      const src = imageSrc(foto, 1800);
      if (!src) return null;
      return {
        src,
        alt: foto.alt || `${woning.adres} in ${woning.plaats} — foto ${index + 1}`,
      };
    })
    .filter((photo): photo is GalleryPhoto => Boolean(photo));

  return (
    <main>
      <ObjectGallery photos={photos} />

      <section className='pt-[52px] pb-[118px] max-md:pt-[38px] max-md:pb-[82px]'>
        <Wrap className='grid grid-cols-[1.5fr_0.5fr] items-start gap-16 max-lg:grid-cols-[1.4fr_0.6fr] max-lg:gap-10 max-md:grid-cols-1'>
          <div>
            <ObjectHeader
              adres={woning.adres}
              postcode={woning.postcode}
              plaats={woning.plaats}
              prijs={woning.prijs}
              prijsConditie={woning.prijsConditie}
              soortWoning={woning.soortWoning}
              bouwjaar={woning.bouwjaar}
              woonoppervlak={woning.woonoppervlak}
              perceel={woning.perceel}
              inhoud={woning.inhoud}
              kamers={woning.kamers}
              slaapkamers={woning.slaapkamers}
              energielabel={woning.energielabel}
            />
            <ObjectDescription tekst={woning.aanbiedingsTekst} />
            <ObjectFeatures groepen={woning.kenmerkGroepen} />
          </div>

          <ObjectSidebar
            adres={woning.adres}
            status={woning.status}
            prijs={woning.prijs}
            prijsConditie={woning.prijsConditie}
            aanvaarding={woning.aanvaarding}
            aangebodenSinds={woning.aangebodenSinds}
            woonoppervlak={woning.woonoppervlak}
            perceel={woning.perceel}
            brochureUrl={woning.brochureUrl}
          />
        </Wrap>
      </section>

      <SimilarObjects items={(woning.vergelijkbaar ?? []).map(toCard)} />

      <CtaBand {...OBJECT_CTA} />
    </main>
  );
}
