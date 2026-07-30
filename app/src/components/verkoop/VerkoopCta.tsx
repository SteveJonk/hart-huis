import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { cn } from "@/lib/cn";
import { VERKOOP_CTA } from "@/lib/verkoop-content";

export function VerkoopCta() {
  const cta = VERKOOP_CTA;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(30,23,20,0.82),rgba(30,23,20,0.35))]",
        "max-sm:after:bg-[linear-gradient(180deg,rgba(30,23,20,0.5),rgba(30,23,20,0.86))]",
      )}
    >
      <Image
        src={cta.image}
        alt={cta.imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <Wrap className="relative z-[2] py-[130px] max-sm:py-[88px]">
        <Reveal>
          <Eyebrow light>{cta.eyebrow}</Eyebrow>
          <h2 className="mb-[22px] max-w-[15ch] text-[clamp(2.1rem,4vw,3.5rem)] text-white">
            {cta.title}
          </h2>
          <p className="mb-[34px] max-w-[46ch] leading-[1.7] text-white/85">
            {cta.body}
          </p>
          <div className="flex flex-wrap gap-[14px]">
            <Button
              href={cta.primary.href}
              variant="primary"
              className="max-sm:w-full max-sm:flex-1 max-sm:basis-full max-sm:justify-center"
            >
              {cta.primary.label}
            </Button>
            <Button
              href={cta.secondary.href}
              variant="line"
              className="max-sm:w-full max-sm:flex-1 max-sm:basis-full max-sm:justify-center"
            >
              {cta.secondary.label}
            </Button>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
