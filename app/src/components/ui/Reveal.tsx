"use client";

import type { ReactNode } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
};

export function Reveal({ children, className = "", delay }: RevealProps) {
  const ref = useRevealOnScroll<HTMLDivElement>();
  const classes = ["rv", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes} data-d={delay ? String(delay) : undefined}>
      {children}
    </div>
  );
}
