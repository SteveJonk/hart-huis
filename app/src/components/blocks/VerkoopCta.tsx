import { VERKOOP_CTA } from "@/lib/verkoop-content";
import { CtaBand, type CtaBandProps } from "@/components/blocks/CtaBand";

export type VerkoopCtaProps = CtaBandProps;

const DEFAULTS: Required<CtaBandProps> = {
  image: { src: VERKOOP_CTA.image, alt: VERKOOP_CTA.imageAlt },
  eyebrow: VERKOOP_CTA.eyebrow,
  title: VERKOOP_CTA.title,
  body: VERKOOP_CTA.body,
  primaryCta: VERKOOP_CTA.primary,
  secondaryCta: VERKOOP_CTA.secondary,
};

export function VerkoopCta({
  image = DEFAULTS.image,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  body = DEFAULTS.body,
  primaryCta = DEFAULTS.primaryCta,
  secondaryCta = DEFAULTS.secondaryCta,
}: VerkoopCtaProps = {}) {
  return (
    <CtaBand
      image={image}
      eyebrow={eyebrow}
      title={title}
      body={body}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
    />
  );
}
