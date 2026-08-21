import { BlockIcon } from "@/components/ui/BlockIcon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { cn } from "@/lib/cn";
import {
  WAARDEBEPALING_KRIJGT,
  WAARDEBEPALING_KRIJGT_INTRO,
  type IconCardItem,
} from "@/lib/waardebepaling-content";

export type IconCardsProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: IconCardItem[];
};

const DEFAULTS: Required<IconCardsProps> = {
  eyebrow: WAARDEBEPALING_KRIJGT_INTRO.eyebrow,
  title: WAARDEBEPALING_KRIJGT_INTRO.title,
  lead: WAARDEBEPALING_KRIJGT_INTRO.lead,
  items: WAARDEBEPALING_KRIJGT,
};

/** Drie iconkaarten, geen foto. */
export function IconCards({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  items = DEFAULTS.items,
}: IconCardsProps = {}) {
  return (
    <section className="py-[110px] max-sm:py-[76px]">
      <Wrap>
        <Reveal className="mb-[52px] max-w-[620px] max-sm:mb-9">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mb-4 text-[clamp(2rem,3.6vw,2.9rem)]">{title}</h2>
          <p className="leading-[1.72] text-ink-70">{lead}</p>
        </Reveal>

        <div
          className={cn(
            "grid grid-cols-3 gap-[26px] max-sm:grid-cols-1 max-sm:gap-4",
            // Meer dan drie kaarten stapelen op tablet naar twee kolommen; drie
            // kaarten gaan daar direct naar één, zoals op /waardebepaling.
            items.length > 3 ? "max-md:grid-cols-2" : "max-md:grid-cols-1",
          )}
        >
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 3 || undefined) as 1 | 2 | undefined}
              className="rounded-[4px] bg-white px-8 pt-9 pb-8 transition-[transform,box-shadow] duration-[450ms] ease-brand hover:-translate-y-1.5 hover:shadow-[0_30px_58px_-34px_rgba(36,31,28,0.4)]"
            >
              <span className="mb-[22px] grid size-[52px] place-items-center rounded-full bg-sand text-burgundy">
                <BlockIcon icon={item.icon} size={21} />
              </span>
              <h3 className="mb-2.5 text-[1.32rem]">{item.title}</h3>
              <p className="text-[0.94rem] leading-[1.7] text-ink-70">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
