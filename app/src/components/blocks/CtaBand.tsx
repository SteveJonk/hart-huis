import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

export type CtaBandImage = {
  src: string;
  alt: string;
};

export type CtaBandCta = {
  label: string;
  href: string;
};

export type CtaBandProps = {
  image?: CtaBandImage;
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryCta?: CtaBandCta;
  secondaryCta?: CtaBandCta;
};

const DEFAULTS: Required<CtaBandProps> = {
  image: {
    src: "/images/cta-office.jpg",
    alt: "Het kantoor van Hart & Huis Makelaardij in Haarlem",
  },
  eyebrow: "Even sparren?",
  title: "Loop binnen, bel of app ons",
  body: "Geen verkooppraatje, gewoon een eerlijk gesprek over wat jouw huis waard is en wat er in deze markt slim is om te doen. Koffie staat klaar.",
  primaryCta: { label: "Plan een kennismaking", href: "#" },
  secondaryCta: { label: SITE.phone, href: SITE.phoneHref },
};

export function CtaBand({
  image = DEFAULTS.image,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  body = DEFAULTS.body,
  primaryCta = DEFAULTS.primaryCta,
  secondaryCta = DEFAULTS.secondaryCta,
}: CtaBandProps = {}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(30,23,20,0.82),rgba(30,23,20,0.35))]",
        "max-sm:after:bg-[linear-gradient(180deg,rgba(30,23,20,0.5),rgba(30,23,20,0.86))]",
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <Wrap className="relative z-[2] py-[130px] max-sm:py-[88px]">
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h2 className="mb-[22px] max-w-[15ch] text-[clamp(2.1rem,4vw,3.5rem)] text-white">
            {title}
          </h2>
          <p className="mb-[34px] max-w-[46ch] leading-[1.7] text-white/85">
            {body}
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <Button
              href={primaryCta.href}
              variant="primary"
              className="max-sm:w-full max-sm:flex-1 max-sm:basis-full max-sm:justify-center"
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="line"
              className="max-sm:w-full max-sm:flex-1 max-sm:basis-full max-sm:justify-center"
            >
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
