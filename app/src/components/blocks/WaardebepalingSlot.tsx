import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { WAARDEBEPALING_SLOT } from "@/lib/waardebepaling-content";

export type WaardebepalingSlotCta = { label: string; href: string };

export type WaardebepalingSlotProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryCta?: WaardebepalingSlotCta;
  secondaryCta?: WaardebepalingSlotCta;
};

const DEFAULTS: Required<WaardebepalingSlotProps> = {
  eyebrow: WAARDEBEPALING_SLOT.eyebrow,
  title: WAARDEBEPALING_SLOT.title,
  body: WAARDEBEPALING_SLOT.body,
  primaryCta: WAARDEBEPALING_SLOT.primary,
  secondaryCta: WAARDEBEPALING_SLOT.secondary,
};

/** Gecentreerde afsluiting op sandkleurige achtergrond, geen foto. */
export function WaardebepalingSlot({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  body = DEFAULTS.body,
  primaryCta = DEFAULTS.primaryCta,
  secondaryCta = DEFAULTS.secondaryCta,
}: WaardebepalingSlotProps = {}) {
  return (
    <section className="relative overflow-hidden bg-sand py-[104px] text-center max-sm:py-[76px]">
      <div
        className="pointer-events-none absolute top-[-260px] left-1/2 size-[620px] -translate-x-1/2 rounded-full border border-burgundy/14"
        aria-hidden="true"
      />
      <Wrap className="relative z-[2]">
        <Reveal>
          <Eyebrow className="mx-auto">{eyebrow}</Eyebrow>
          <h2 className="mx-auto mb-[18px] max-w-[18ch] text-[clamp(2rem,3.8vw,3rem)]">
            {title}
          </h2>
          <p className="mx-auto mb-8 max-w-[48ch] leading-[1.72] text-[#4d3d37]">{body}</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {primaryCta ? (
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="ink">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
