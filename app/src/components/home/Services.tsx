import Image from "next/image";
import { ArrowLinkLabel } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Lead } from "@/components/ui/Lead";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLink } from "@/components/ui/RevealLink";
import { SectionHead } from "@/components/ui/SectionHead";
import { Wrap } from "@/components/ui/Wrap";
import { cn } from "@/lib/cn";
import { SERVICES, type ServiceCard } from "@/lib/home-content";

function ServiceCardItem({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  return (
    <RevealLink
      href={service.href}
      delay={service.delay}
      className={cn(
        "group relative block transition-transform duration-500 ease-brand hover:-translate-y-2",
        index === 1 && "mt-14 max-md:mt-0",
        index === 2 && "mt-[22px] max-md:mt-0",
      )}
    >
      <div
        className={cn(
          "relative aspect-[5/6] overflow-hidden rounded-arch max-sm:aspect-[4/5]",
          "after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:z-[1] after:h-[150px]",
          "after:bg-[linear-gradient(180deg,rgba(30,23,20,0.3),rgba(30,23,20,0))]",
        )}
      >
        <span className="absolute bottom-[22px] left-[22px] z-[3] rounded-pill bg-ink px-[15px] py-2 text-[0.66rem] font-semibold tracking-[0.18em] text-cream uppercase">
          {service.label}
        </span>
        <Image
          src={service.image}
          alt={service.imageAlt}
          width={640}
          height={768}
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-brand group-hover:scale-105"
        />
      </div>
      <h3 className="mt-6 mb-2.5 text-[1.75rem] max-sm:mt-5 max-sm:text-[1.5rem]">
        {service.title}
      </h3>
      <p className="mb-4 text-[0.93rem] leading-[1.62] text-ink-70">
        {service.description}
      </p>
      <ArrowLinkLabel>Meer over {service.label.toLowerCase()}</ArrowLinkLabel>
    </RevealLink>
  );
}

export function Services() {
  return (
    <section className="pt-5 pb-[130px] max-sm:py-[82px]">
      <Wrap>
        <Reveal>
          <SectionHead>
            <h2>Wat kunnen we voor je doen?</h2>
            <Lead className="max-w-[38ch]">
              Van Haarlem-Noord tot Heemstede: verkoop, aankoop en taxaties onder
              één dak.
            </Lead>
          </SectionHead>
        </Reveal>

        <div className="grid grid-cols-3 gap-[30px] max-md:grid-cols-2 max-md:gap-[22px] max-sm:grid-cols-1">
          {SERVICES.map((service, index) => (
            <ServiceCardItem
              key={service.label}
              service={service}
              index={index}
            />
          ))}
        </div>

        <Reveal
          className={cn(
            "relative mt-[70px] flex flex-wrap items-center gap-9 overflow-hidden rounded bg-ink px-[46px] py-10 text-cream",
            "max-md:gap-[26px] max-md:px-7 max-md:py-8",
            "max-sm:mt-[52px] max-sm:gap-5 max-sm:px-6 max-sm:py-[30px]",
            "before:pointer-events-none before:absolute before:right-[60px] before:bottom-[-150px] before:size-[230px] before:rounded-full before:bg-cream/4",
            "after:pointer-events-none after:absolute after:top-[-110px] after:right-[-80px] after:size-[300px] after:rounded-full after:border after:border-cream/13",
            "max-sm:before:hidden max-sm:after:hidden",
          )}
        >
          <div className="relative z-[2] grid size-[82px] shrink-0 place-items-center rounded-full bg-sand font-display text-[1.32rem] tracking-[0.08em] text-ink max-sm:size-[66px] max-sm:text-[1.08rem]">
            NVM
          </div>
          <div className="relative z-[2] min-w-[270px] flex-1 max-sm:min-w-0 max-sm:basis-full">
            <h3 className="mb-[9px] text-[1.55rem] text-white max-sm:text-[1.32rem]">
              Aangesloten bij de NVM
            </h3>
            <p className="max-w-[54ch] text-[0.95rem] leading-[1.65] text-clay max-sm:text-[0.92rem]">
              Vaste kwaliteitseisen, actuele marktdata uit de grootste
              woningdatabase van Nederland, en een geschillenregeling waar je op
              terug kunt vallen.
            </p>
          </div>
          <Button
            href="#"
            variant="primary"
            size="sm"
            className="relative z-[2] max-sm:w-full max-sm:justify-center"
          >
            Wat betekent dat voor jou?
          </Button>
        </Reveal>
      </Wrap>
    </section>
  );
}
