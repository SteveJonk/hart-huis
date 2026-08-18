import Image from "next/image";
import { ArrowLinkLabel } from "@/components/ui/ArrowLink";
import { Lead } from "@/components/ui/Lead";
import { Reveal } from "@/components/ui/Reveal";
import { RevealLink } from "@/components/ui/RevealLink";
import { SectionHead } from "@/components/ui/SectionHead";
import { Strip } from "@/components/ui/Strip";
import { Wrap } from "@/components/ui/Wrap";
import { cn } from "@/lib/cn";
import { SERVICES } from "@/lib/home-content";

export type ServiceImage = {
  src: string;
  alt: string;
};

export type ServiceItem = {
  label: string;
  title: string;
  description: string;
  image: ServiceImage;
  href: string;
  delay?: 1 | 2 | 3;
};

export type ServiceCta = {
  label: string;
  href: string;
};

export type ServicesNvm = {
  badge: string;
  title: string;
  body: string;
  cta?: ServiceCta;
};

export type ServicesProps = {
  title?: string;
  lead?: string;
  items?: ServiceItem[];
  nvm?: ServicesNvm;
};

const DEFAULT_ITEMS: ServiceItem[] = SERVICES.map((service) => ({
  label: service.label,
  title: service.title,
  description: service.description,
  image: { src: service.image, alt: service.imageAlt },
  href: service.href,
  delay: service.delay,
}));

const DEFAULTS: Required<ServicesProps> = {
  title: "Wat kunnen we voor je doen?",
  lead: "Van Haarlem-Noord tot Heemstede: verkoop, aankoop en taxaties onder één dak.",
  items: DEFAULT_ITEMS,
  nvm: {
    badge: "NVM",
    title: "Aangesloten bij de NVM",
    body: "Vaste kwaliteitseisen, actuele marktdata uit de grootste woningdatabase van Nederland, en een geschillenregeling waar je op terug kunt vallen.",
    cta: { label: "Wat betekent dat voor jou?", href: "#" },
  },
};

function ServiceCardItem({
  service,
  index,
}: {
  service: ServiceItem;
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
          src={service.image.src}
          alt={service.image.alt}
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

export function Services({
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  items = DEFAULTS.items,
  nvm = DEFAULTS.nvm,
}: ServicesProps = {}) {
  return (
    <section className="pt-5 pb-[130px] max-sm:py-[82px]">
      <Wrap>
        <Reveal>
          <SectionHead>
            <h2>{title}</h2>
            <Lead className="max-w-[38ch]">{lead}</Lead>
          </SectionHead>
        </Reveal>

        <div className="grid grid-cols-3 gap-[30px] max-md:grid-cols-2 max-md:gap-[22px] max-sm:grid-cols-1">
          {items.map((service, index) => (
            <ServiceCardItem
              key={service.label}
              service={service}
              index={index}
            />
          ))}
        </div>

        <Strip
          badge={nvm.badge}
          title={nvm.title}
          body={nvm.body}
          cta={nvm.cta}
          className="mt-[70px] max-sm:mt-[52px]"
        />
      </Wrap>
    </section>
  );
}
