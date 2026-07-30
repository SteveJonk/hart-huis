import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="ctaband">
      <Image
        src="/images/cta-office.jpg"
        alt="Het kantoor van Hart & Huis Makelaardij in Haarlem"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="wrap">
        <Reveal>
          <span className="eyebrow eyebrow--light">Even sparren?</span>
          <h2>Loop binnen, bel of app ons</h2>
          <p>
            Geen verkooppraatje, gewoon een eerlijk gesprek over wat jouw huis
            waard is en wat er in deze markt slim is om te doen. Koffie staat
            klaar.
          </p>
          <div className="row">
            <Button href="#" variant="primary">
              Plan een kennismaking
            </Button>
            <Button href={SITE.phoneHref} variant="line">
              {SITE.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
