import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Wrap } from "@/components/ui/Wrap";
import { VERKOOP_REGIONS } from "@/lib/verkoop-content";

export function RegionBlock() {
  return (
    <section className="py-[120px] max-sm:py-[84px]">
      <Wrap>
        <Reveal className="mb-11 max-w-[640px] max-sm:mb-8">
          <Eyebrow>Ons werkgebied</Eyebrow>
          <h2 className="mb-4 text-[clamp(1.9rem,3.3vw,2.7rem)]">
            Jouw NVM-makelaar voor de hele regio
          </h2>
          <p className="leading-[1.7] text-ink-70">
            We kennen niet alleen Haarlem, maar ook de straten eromheen — en wat
            een woning daar doet. Kies je plaats voor meer over verkopen in jouw
            buurt.
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-5 gap-3 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-2.5 max-xs:grid-cols-1">
          {VERKOOP_REGIONS.map((place) => (
            <a
              key={place}
              href="#"
              className={[
                "flex items-center gap-2.5 rounded bg-white px-[18px] py-4 text-[0.93rem]",
                "transition duration-300 ease-brand",
                "before:size-1.5 before:shrink-0 before:rounded-full before:bg-sand before:content-['']",
                "before:transition-[background] before:duration-300 before:ease-brand",
                "hover:-translate-y-[3px] hover:bg-ink hover:text-cream hover:before:bg-sage",
                "max-sm:px-[15px] max-sm:py-3.5 max-sm:text-[0.88rem]",
              ].join(" ")}
            >
              {place}
            </a>
          ))}
        </Reveal>
      </Wrap>
    </section>
  );
}
