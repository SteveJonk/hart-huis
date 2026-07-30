import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type WrapProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Site content width shell.
 * Keeps a `wrap` class temporarily so section CSS (intro/stories/cta) can still target it.
 */
export function Wrap({ children, className }: WrapProps) {
  return (
    <div
      className={cn(
        "wrap mx-auto max-w-site px-wrap max-md:px-wrap-md max-xs:px-wrap-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
