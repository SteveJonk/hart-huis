import type { ReactNode } from "react";
import { BlockIcon, type BlockIconName } from "@/components/ui/BlockIcon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export type StripCta = {
  label: string;
  href: string;
};

type StripProps = {
  /** Text in the round mark, e.g. "NVM". Ignored when `icon` is set. */
  badge?: string;
  icon?: BlockIconName;
  title: string;
  body: string;
  cta?: StripCta;
  /** Extra classes on the strip itself — used for the top margin. */
  className?: string;
};

/** Dark full-width strip with a round mark, used on home and aankoop. */
export function Strip({ badge, icon, title, body, cta, className }: StripProps) {
  let mark: ReactNode = badge;
  if (icon) mark = <BlockIcon icon={icon} size={30} />;

  return (
    <Reveal
      className={cn(
        "relative flex flex-wrap items-center gap-9 overflow-hidden rounded bg-ink px-[46px] py-10 text-cream",
        "max-md:gap-[26px] max-md:px-7 max-md:py-8",
        "max-sm:gap-5 max-sm:px-6 max-sm:py-[30px]",
        "before:pointer-events-none before:absolute before:right-[60px] before:bottom-[-150px] before:size-[230px] before:rounded-full before:bg-cream/4",
        "after:pointer-events-none after:absolute after:top-[-110px] after:right-[-80px] after:size-[300px] after:rounded-full after:border after:border-cream/13",
        "max-sm:before:hidden max-sm:after:hidden",
        className,
      )}
    >
      <div className="relative z-[2] grid size-[82px] shrink-0 place-items-center rounded-full bg-sand font-display text-[1.32rem] tracking-[0.08em] text-ink max-sm:size-[66px] max-sm:text-[1.08rem]">
        {mark}
      </div>
      <div className="relative z-[2] min-w-[270px] flex-1 max-sm:min-w-0 max-sm:basis-full">
        <h3 className="mb-[9px] text-[1.55rem] text-white max-sm:text-[1.32rem]">
          {title}
        </h3>
        <p className="max-w-[54ch] text-[0.95rem] leading-[1.65] text-clay max-sm:text-[0.92rem]">
          {body}
        </p>
      </div>
      {cta ? (
        <Button
          href={cta.href}
          variant="primary"
          size="sm"
          className="relative z-[2] max-sm:w-full max-sm:justify-center"
        >
          {cta.label}
        </Button>
      ) : null}
    </Reveal>
  );
}
