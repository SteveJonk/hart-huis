import Image from "next/image";
import { BlockIcon } from "@/components/ui/BlockIcon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lead } from "@/components/ui/Lead";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import {
  VERKOOP_BENEFITS,
  VERKOOP_BENEFITS_IMAGE,
  type Benefit,
} from "@/lib/verkoop-content";

export type BenefitsImage = {
  src: string;
  alt: string;
};

export type BenefitsProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  image?: BenefitsImage;
  items?: Benefit[];
};

const DEFAULTS: Required<BenefitsProps> = {
  eyebrow: "Wat je van ons krijgt",
  title: "Een makelaar die het hele traject uit handen neemt",
  lead:
    "Je woning verkopen kun je zelf doen, maar er komt meer bij kijken dan een mooie foto en een prijs op Funda. Wij regelen het van begin tot eind — en je weet elke week waar je staat.",
  image: VERKOOP_BENEFITS_IMAGE,
  items: VERKOOP_BENEFITS,
};

export function Benefits({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  image = DEFAULTS.image,
  items = DEFAULTS.items,
}: BenefitsProps = {}) {
  return (
    <section className="py-[92px] pb-[124px] max-sm:py-[66px] max-sm:pb-[84px]">
      <Wrap className="grid grid-cols-[1.12fr_0.88fr] items-center gap-[78px] max-lg:gap-[52px] max-md:grid-cols-1">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mb-[22px] max-w-[18ch] text-[clamp(2rem,3.6vw,3.1rem)] max-sm:max-w-none">
            {title}
          </h2>
          <Lead>{lead}</Lead>
          <ul className="mt-[34px] grid list-none gap-6 max-sm:mt-7 max-sm:gap-5">
            {items.map((item) => (
              <li key={item.title} className="flex items-start gap-[18px]">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-burgundy max-sm:size-10">
                  <BlockIcon icon={item.icon} />
                </span>
                <div>
                  <b className="mb-1.5 block text-[1.02rem]">{item.title}</b>
                  <p className="text-[0.94rem] leading-[1.6] text-ink-70">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={1} className="overflow-hidden rounded-arch">
          <div className="relative aspect-[4/5] max-md:aspect-[3/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 960px) 100vw, 44vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
