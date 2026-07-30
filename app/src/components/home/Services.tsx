import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IconArrow } from "@/components/ui/IconArrow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLink } from "@/components/ui/RevealLink";
import { SERVICES } from "@/lib/home-content";

export function Services() {
  return (
    <section className="diensten">
      <div className="wrap">
        <Reveal className="sechead">
          <h2>Wat kunnen we voor je doen?</h2>
          <p className="lead" style={{ maxWidth: "38ch" }}>
            Van Haarlem-Noord tot Heemstede: verkoop, aankoop en taxaties onder
            één dak.
          </p>
        </Reveal>
        <div className="dgrid">
          {SERVICES.map((service) => (
            <RevealLink
              key={service.label}
              href={service.href}
              className="dcard"
              delay={service.delay}
            >
              <div className="dcard__ph">
                <span className="dcard__num">{service.label}</span>
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={640}
                  height={768}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="arrowlink">
                Meer over {service.label.toLowerCase()}{" "}
                <span className="circ">
                  <IconArrow size={12} />
                </span>
              </span>
            </RevealLink>
          ))}
        </div>
        <Reveal className="nvmstrip">
          <div className="nvmstrip__mark">NVM</div>
          <div className="nvmstrip__txt">
            <h3>Aangesloten bij de NVM</h3>
            <p>
              Vaste kwaliteitseisen, actuele marktdata uit de grootste
              woningdatabase van Nederland, en een geschillenregeling waar je op
              terug kunt vallen.
            </p>
          </div>
          <Button href="#" variant="primary" size="sm">
            Wat betekent dat voor jou?
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
