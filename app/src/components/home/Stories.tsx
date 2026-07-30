import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Stories() {
  return (
    <section className="stories">
      <div className="wrap">
        <Reveal className="stories__media">
          <div className="big">
            <Image
              src="/images/story-big.jpg"
              alt="Een straat in Haarlem bij zonsondergang"
              width={900}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="small">
            <Image
              src="/images/story-small.jpg"
              alt="Gevels in het centrum van Haarlem"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal className="stories__copy" delay={1}>
          <span className="eyebrow">Klanten vertellen</span>
          <h2>Van Amsterdam naar de Kleverparkbuurt</h2>
          <blockquote className="stories__quote">
            &ldquo;We zochten al anderhalf jaar. Binnen zes weken stonden we met
            de sleutel in onze hand — in de straat waar we stiekem altijd al
            wilden wonen.&rdquo;
          </blockquote>
          <div className="stories__who">Sanne &amp; Joost — Haarlem</div>
          <Button href="#" variant="ink">
            Lees hun verhaal
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
