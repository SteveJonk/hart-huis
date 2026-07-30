import type { Metadata } from "next";
import { Benefits } from "@/components/verkoop/Benefits";
import { CrossLinks } from "@/components/verkoop/CrossLinks";
import { FactBar } from "@/components/verkoop/FactBar";
import { Faq } from "@/components/verkoop/Faq";
import { PageHero } from "@/components/verkoop/PageHero";
import { QuoteBand } from "@/components/verkoop/QuoteBand";
import { RegionBlock } from "@/components/verkoop/RegionBlock";
import { Steps } from "@/components/verkoop/Steps";
import { VerkoopCta } from "@/components/verkoop/VerkoopCta";

export const metadata: Metadata = {
  title: "Je woning verkopen in Haarlem — Hart & Huis Makelaardij",
  description:
    "Je woning verkopen in Haarlem en omstreken. Van gratis waardebepaling en styling tot de overdracht bij de notaris, met één vast aanspreekpunt.",
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
