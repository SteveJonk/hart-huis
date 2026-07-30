"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getReviewProgressWidth, getReviewScrollStep } from "@/lib/reviews";

export function useReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(34);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setProgress(
      getReviewProgressWidth(
        track.scrollLeft,
        track.scrollWidth,
        track.clientWidth,
      ),
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const step = getReviewScrollStep(card?.offsetWidth ?? 400);
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return {
    trackRef,
    progress,
    prev: () => scrollByCard(-1),
    next: () => scrollByCard(1),
  };
}
