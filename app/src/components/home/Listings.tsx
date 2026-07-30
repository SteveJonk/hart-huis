import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLink } from "@/components/ui/RevealLink";
import { LISTINGS } from "@/lib/home-content";
import { REGIONS } from "@/lib/site";

export function Listings() {
  return (
    <section className="aanbod">
      <div className="wrap">
        <Reveal className="sechead">
          <h2>Actueel aanbod</h2>
          <Button href="#" variant="ink">
            Bekijk alle woningen
          </Button>
        </Reveal>
        <div className="agrid">
          {LISTINGS.map((listing) => (
            <RevealLink
              key={listing.title}
              href={listing.href}
              className="acard"
              delay={listing.delay}
            >
              <div className="acard__ph">
                <span
                  className={["pill", listing.sold ? "pill--sold" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {listing.status}
                </span>
                <Image
                  src={listing.image}
                  alt={listing.imageAlt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="acard__body">
                <div className="place">{listing.place}</div>
                <h3>{listing.title}</h3>
                <div className="acard__meta">
                  <span>{listing.meta}</span>
                  <b>{listing.price}</b>
                </div>
              </div>
            </RevealLink>
          ))}
        </div>
        <Reveal className="regio">
          <span style={{ marginRight: 6 }}>Ook actief in:</span>
          {REGIONS.map((region) => (
            <a key={region} href="#">
              {region}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
