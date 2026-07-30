"use client";

import type { ReactNode } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type RevealLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
};

export function RevealLink({
  href,
  children,
  className = "",
  delay,
}: RevealLinkProps) {
  const ref = useRevealOnScroll<HTMLAnchorElement>();
  const classes = ["rv", className].filter(Boolean).join(" ");

  return (
    <a
      ref={ref}
      href={href}
      className={classes}
      data-d={delay ? String(delay) : undefined}
    >
      {children}
    </a>
  );
}
