import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import {
  WAARDEBEPALING_STAPPEN,
  WAARDEBEPALING_STAPPEN_INTRO,
  type WaardebepalingStep,
} from "@/lib/waardebepaling-content";

export type WaardebepalingStappenProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: WaardebepalingStep[];
};

const DEFAULTS: Required<WaardebepalingStappenProps> = {
  eyebrow: WAARDEBEPALING_STAPPEN_INTRO.eyebrow,
  title: WAARDEBEPALING_STAPPEN_INTRO.title,
  lead: WAARDEBEPALING_STAPPEN_INTRO.lead,
  items: WAARDEBEPALING_STAPPEN,
};

/** Sand band met drie genummerde kaarten — "hoe het werkt" op /waardebepaling. */
export function WaardebepalingStappen({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  items = DEFAULTS.items,
}: WaardebepalingStappenProps = {}) {
  return (
    <section className="relative overflow-hidden bg-sand py-[104px] max-sm:py-[76px]">
      <div
        className="pointer-events-none absolute -top-[200px] -right-[160px] size-[540px] rounded-full border border-burgundy/14"
        aria-hidden="true"
      />
      <Wrap className="relative z-[2]">
        <Reveal className="mb-[50px] max-w-[560px] max-sm:mb-9">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mb-3.5 text-[clamp(1.9rem,3.4vw,2.7rem)]">{title}</h2>
          <p className="leading-[1.72] text-[#4d3d37]">{lead}</p>
        </Reveal>

        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
          {items.map((item, index) => (
            <Reveal key={item.number} delay={index === 0 ? undefined : (index as 1 | 2)}>
              <span className="mb-3.5 block font-display text-[1.7rem] text-burgundy/70">
                {item.number}
              </span>
              <h3 className="mb-2 text-[1.3rem]">{item.title}</h3>
              <p className="text-[0.95rem] leading-[1.7] text-[#4d3d37]">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
