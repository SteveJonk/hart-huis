import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { VERKOOP_FACTS, type Fact } from "@/lib/verkoop-content";

export type FactBarProps = {
  facts?: Fact[];
  /** Kleine regel onder de balk, bv. de bron van de cijfers. */
  note?: string;
};

const DEFAULTS: Required<FactBarProps> = {
  facts: VERKOOP_FACTS,
  note: "",
};

export function FactBar({
  facts = DEFAULTS.facts,
  note = DEFAULTS.note,
}: FactBarProps = {}) {
  // Vier cijfers passen op tablet niet naast elkaar: daar twee rijen van twee.
  const four = facts.length === 4;
  return (
    <div className="relative z-20 mx-auto max-w-site px-wrap max-md:px-wrap-md max-xs:px-wrap-sm">
      <Reveal
        className={cn(
          "mt-[-52px] grid rounded bg-sand shadow-[0_26px_60px_-28px_rgba(36,31,28,0.4)]",
          four ? "grid-cols-4 max-md:grid-cols-2" : "grid-cols-3",
          "max-sm:mt-[-38px] max-sm:grid-cols-1",
        )}
      >
        {facts.map((fact) => (
          <div
            key={fact.value}
            className={cn(
              "relative px-[34px] py-8",
              "border-r border-burgundy/16 last:border-r-0",
              four ? "max-md:even:border-r-0 max-md:[&:nth-child(-n+2)]:border-b" : "",
              "max-md:px-6 max-md:py-[26px]",
              "max-sm:border-r-0 max-sm:border-b max-sm:border-burgundy/16 max-sm:px-6 max-sm:py-[22px] max-sm:last:border-b-0",
            )}
          >
            <b
              className={cn(
                "mb-2 block font-display leading-none text-burgundy max-sm:mb-1.5 max-sm:text-[1.75rem]",
                four ? "text-[1.85rem]" : "text-[2.1rem]",
              )}
            >
              {fact.value}
            </b>
            <span className="block text-[0.87rem] leading-[1.5] text-[#5d4a43]">
              {fact.label}
            </span>
          </div>
        ))}
      </Reveal>
      {note ? (
        <p className="mt-3.5 text-[0.74rem] text-ink-45">{note}</p>
      ) : null}
    </div>
  );
}
