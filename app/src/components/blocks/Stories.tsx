import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { cn } from "@/lib/cn";

export type StoriesImage = {
  src: string;
  alt: string;
};

export type StoriesCta = {
  label: string;
  href: string;
};

export type StoriesProps = {
  image?: StoriesImage;
  secondaryImage?: StoriesImage;
  eyebrow?: string;
  title?: string;
  quote?: string;
  attribution?: string;
  cta?: StoriesCta;
};

const DEFAULTS: Required<Omit<StoriesProps, "cta">> & Pick<StoriesProps, "cta"> =
  {
    image: {
      src: "/images/story-big.jpg",
      alt: "Een straat in Haarlem bij zonsondergang",
    },
    secondaryImage: {
      src: "/images/story-small.jpg",
      alt: "Gevels in het centrum van Haarlem",
    },
    eyebrow: "Klanten vertellen",
    title: "Van Amsterdam naar de Kleverparkbuurt",
    quote:
      "We zochten al anderhalf jaar. Binnen zes weken stonden we met de sleutel in onze hand — in de straat waar we stiekem altijd al wilden wonen.",
    attribution: "Sanne & Joost — Haarlem",
    cta: { label: "Lees hun verhaal", href: "#" },
  };

export function Stories({
  image = DEFAULTS.image,
  secondaryImage = DEFAULTS.secondaryImage,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  quote = DEFAULTS.quote,
  attribution = DEFAULTS.attribution,
  cta = DEFAULTS.cta,
}: StoriesProps = {}) {
  return (
    <section className="relative bg-sand py-[130px] max-sm:py-[82px]">
      <Wrap
        className={cn(
          "grid grid-cols-[1.05fr_0.95fr] items-center gap-20",
          "max-md:grid-cols-1 max-md:gap-14",
        )}
      >
        <Reveal
          className={cn(
            "relative -mt-[190px] h-[600px]",
            "max-md:mt-0 max-md:h-[430px] max-sm:h-[380px] max-xs:h-[330px]",
          )}
        >
          <div className="absolute top-0 left-0 h-full w-[70%] overflow-hidden rounded-arch max-sm:w-[74%]">
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className={cn(
              "absolute right-0 bottom-10 h-[42%] w-[46%] overflow-hidden rounded shadow-story",
              "max-sm:bottom-0 max-sm:h-[38%] max-sm:w-[52%]",
            )}
          >
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mb-6 max-w-[14ch] text-[clamp(2.1rem,4vw,3.5rem)]">
            {title}
          </h2>
          <blockquote
            className={cn(
              "mb-[26px] border-l border-ink/25 pl-[26px] font-display text-[1.32rem] leading-normal italic",
              "max-sm:pl-[18px] max-sm:text-[1.12rem]",
            )}
          >
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="mb-[34px] text-[0.82rem] font-semibold tracking-[0.14em] text-ink-70 uppercase">
            {attribution}
          </div>
          {cta ? (
            <Button href={cta.href} variant="ink">
              {cta.label}
            </Button>
          ) : null}
        </Reveal>
      </Wrap>
    </section>
  );
}
