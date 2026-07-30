import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { VERKOOP_REGIONS } from "@/lib/verkoop-content";

export type RegionPlace = {
  label: string;
  href: string;
};

export type RegionBlockProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  places?: RegionPlace[];
};

const DEFAULTS: Required<RegionBlockProps> = {
  eyebrow: "Ons werkgebied",
  title: "Jouw NVM-makelaar voor de hele regio",
  lead:
    "We kennen niet alleen Haarlem, maar ook de straten eromheen — en wat een woning daar doet. Kies je plaats voor meer over verkopen in jouw buurt.",
  places: VERKOOP_REGIONS.map((place) => ({ label: place, href: "#" })),
};

export function RegionBlock({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  lead = DEFAULTS.lead,
  places = DEFAULTS.places,
}: RegionBlockProps = {}) {
  return (
    <section className="py-[120px] max-sm:py-[84px]">
      <Wrap>
        <Reveal className="mb-11 max-w-[640px] max-sm:mb-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mb-4 text-[clamp(1.9rem,3.3vw,2.7rem)]">{title}</h2>
          <p className="leading-[1.7] text-ink-70">{lead}</p>
        </Reveal>
        <Reveal className="grid grid-cols-5 gap-3 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-2.5 max-xs:grid-cols-1">
          {places.map((place) => (
            <a
              key={place.label}
              href={place.href}
              className={[
                "flex items-center gap-2.5 rounded bg-white px-[18px] py-4 text-[0.93rem]",
                "transition duration-300 ease-brand",
                "before:size-1.5 before:shrink-0 before:rounded-full before:bg-sand before:content-['']",
                "before:transition-[background] before:duration-300 before:ease-brand",
                "hover:-translate-y-[3px] hover:bg-ink hover:text-cream hover:before:bg-sage",
                "max-sm:px-[15px] max-sm:py-3.5 max-sm:text-[0.88rem]",
              ].join(" ")}
            >
              {place.label}
            </a>
          ))}
        </Reveal>
      </Wrap>
    </section>
  );
}
