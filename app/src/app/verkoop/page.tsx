import type { Metadata } from 'next';
import { Benefits } from '@/components/blocks/Benefits';
import { CrossLinks } from '@/components/blocks/CrossLinks';
import { FactBar } from '@/components/blocks/FactBar';
import { Faq } from '@/components/blocks/Faq';
import { PageHero } from '@/components/blocks/PageHero';
import { QuoteBand } from '@/components/blocks/QuoteBand';
import { RegionBlock } from '@/components/blocks/RegionBlock';
import { Steps } from '@/components/blocks/Steps';
import { VerkoopCta } from '@/components/blocks/VerkoopCta';

export const metadata: Metadata = {
  title: 'Je woning verkopen in Haarlem — Hart & Huis Makelaardij',
  description:
    'Je woning verkopen in Haarlem en omstreken. Van gratis waardebepaling en styling tot de overdracht bij de notaris, met één vast aanspreekpunt.',
};

export default function VerkoopPage() {
  return (
    <main>
      <PageHero />
      <FactBar />
      <Benefits />
      <Steps />
      <QuoteBand />
      <Faq />
      <RegionBlock />
      <CrossLinks />
      <VerkoopCta />
    </main>
  );
}
