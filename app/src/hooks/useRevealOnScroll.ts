"use client";

import { useEffect, useRef } from "react";

const REVEAL_OPTIONS: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px",
};

export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      }
    }, REVEAL_OPTIONS);

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
