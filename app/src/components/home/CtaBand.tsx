import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
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
      <Wrap>
        <Reveal>
          <Eyebrow light>Even sparren?</Eyebrow>
          <h2>Loop binnen, bel of app ons</h2>
          <p>
            Geen verkooppraatje, gewoon een eerlijk gesprek over wat jouw huis
            waard is en wat er in deze markt slim is om te doen. Koffie staat
            klaar.
          </p>
          <div className="row">
            <Button
              href="#"
              variant="primary"
              className="max-sm:w-full max-sm:flex-1 max-sm:basis-full max-sm:justify-center"
            >
              Plan een kennismaking
            </Button>
            <Button
              href={SITE.phoneHref}
              variant="line"
              className="max-sm:w-full max-sm:flex-1 max-sm:basis-full max-sm:justify-center"
            >
              {SITE.phone}
            </Button>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
