import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { WAARDEBEPALING_WIE } from "@/lib/waardebepaling-content";

export type WaardebepalingWieImage = {
  src: string;
  alt: string;
};

export type WaardebepalingWieProps = {
  image?: WaardebepalingWieImage;
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  quote?: string;
  name?: string;
};

const DEFAULTS: Required<WaardebepalingWieProps> = {
  image: { src: WAARDEBEPALING_WIE.image, alt: WAARDEBEPALING_WIE.imageAlt },
  eyebrow: WAARDEBEPALING_WIE.eyebrow,
  title: WAARDEBEPALING_WIE.title,
  paragraphs: [...WAARDEBEPALING_WIE.paragraphs],
  quote: WAARDEBEPALING_WIE.quote,
  name: WAARDEBEPALING_WIE.name,
};

/** Foto naast intro + citaat van de makelaar — "wie er langskomt" op /waardebepaling. */
export function WaardebepalingWie({
  image = DEFAULTS.image,
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  paragraphs = DEFAULTS.paragraphs,
  quote = DEFAULTS.quote,
  name = DEFAULTS.name,
}: WaardebepalingWieProps = {}) {
  return (
    <section className="py-[110px] max-sm:py-[76px]">
      <Wrap className="grid grid-cols-[0.72fr_1.28fr] items-center gap-[66px] max-lg:gap-11 max-md:grid-cols-1">
        <Reveal className="overflow-hidden rounded-arch">
          <div className="relative aspect-[4/5] max-md:aspect-[3/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 960px) 100vw, 34vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mb-[18px] max-w-[16ch] text-[clamp(1.9rem,3.4vw,2.6rem)] max-sm:max-w-none">
            {title}
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-4 max-w-[48ch] leading-[1.75] text-ink-70 max-sm:max-w-none"
            >
              {paragraph}
            </p>
          ))}
          <blockquote className="mt-6 max-w-[46ch] border-l-[3px] border-sand pl-6 font-display text-[1.2rem] leading-[1.55] italic">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="mt-4 text-[0.85rem] font-semibold tracking-[0.06em] text-ink-45 uppercase">
            {name}
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
