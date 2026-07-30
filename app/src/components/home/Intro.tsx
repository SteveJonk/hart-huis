import Image from "next/image";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { INTRO_FACTS } from "@/lib/home-content";

export function Intro() {
  return (
    <section className="intro">
      <div className="wrap">
        <Reveal className="intro__figure">
          <div className="ph">
            <Image
              src="/images/intro-team.jpg"
              alt="Het team van Hart & Huis Makelaardij"
              width={800}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="intro__stamp">
            <div>
              <b>20</b>
              <small>JAAR ERVARING</small>
            </div>
          </div>
        </Reveal>
        <Reveal className="intro__body" delay={1}>
          <span className="eyebrow">Over Hart &amp; Huis</span>
          <h2>
            Makelaardij met <em>hart</em> voor jouw huis
          </h2>
          <p className="lead">
            Een huis verkopen of kopen is zelden alleen een transactie. Het is
            verhuizen naar een nieuwe fase, afscheid nemen van een plek vol
            herinneringen, of eindelijk die ene straat in kunnen.
          </p>
          <p className="lead">
            Daarom werken wij klein en persoonlijk. Je hebt één vast
            aanspreekpunt, je krijgt eerlijk advies — ook als dat even tegen je
            zin ingaat — en je weet altijd waar je staat.
          </p>
          <div className="intro__facts">
            {INTRO_FACTS.map((fact) => (
              <div key={fact.value}>
                <b>{fact.value}</b>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
          <ArrowLink href="#">Maak kennis met ons</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
