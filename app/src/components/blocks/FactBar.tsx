import { Reveal } from "@/components/ui/Reveal";
import { VERKOOP_FACTS, type Fact } from "@/lib/verkoop-content";

export type FactBarProps = {
  facts?: Fact[];
};

const DEFAULTS: Required<FactBarProps> = {
  facts: VERKOOP_FACTS,
};

export function FactBar({ facts = DEFAULTS.facts }: FactBarProps = {}) {
  return (
    <div className="relative z-20 mx-auto max-w-site px-wrap max-md:px-wrap-md max-xs:px-wrap-sm">
      <Reveal
        className={[
          "mt-[-52px] grid grid-cols-3 rounded bg-sand shadow-[0_26px_60px_-28px_rgba(36,31,28,0.4)]",
          "max-sm:mt-[-38px] max-sm:grid-cols-1",
        ].join(" ")}
      >
        {facts.map((fact, index) => (
          <div
            key={fact.value}
            className={[
              "relative px-[34px] py-8",
              "border-r border-burgundy/16 last:border-r-0",
              "max-md:px-6 max-md:py-[26px]",
              "max-sm:border-r-0 max-sm:border-b max-sm:border-burgundy/16 max-sm:px-6 max-sm:py-[22px] max-sm:last:border-b-0",
              index === 0 ? "" : "",
            ].join(" ")}
          >
            <b className="mb-2 block font-display text-[2.1rem] leading-none text-burgundy max-sm:mb-1.5 max-sm:text-[1.75rem]">
              {fact.value}
            </b>
            <span className="block text-[0.87rem] leading-[1.5] text-[#5d4a43]">
              {fact.label}
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
