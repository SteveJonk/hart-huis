import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  light?: boolean;
  /** Warm sand tone on dark backgrounds where white reads too cold. */
  sand?: boolean;
  className?: string;
};

export function Eyebrow({
  children,
  light = false,
  sand = false,
  className,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "mb-[18px] block text-eyebrow font-semibold uppercase",
        light ? "text-white/80" : sand ? "text-sand" : "text-sage-deep",
        "max-sm:mb-[13px] max-sm:tracking-[0.16em]",
        className,
      )}
    >
      {children}
    </span>
  );
}
