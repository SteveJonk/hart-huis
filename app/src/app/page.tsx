import { CtaBand } from "@/components/home/CtaBand";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Listings } from "@/components/home/Listings";
import { Reviews } from "@/components/home/Reviews";
import { Services } from "@/components/home/Services";
import { Stories } from "@/components/home/Stories";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <Stories />
      <Reviews />
      <Listings />
      <CtaBand />
    </main>
  );
}
