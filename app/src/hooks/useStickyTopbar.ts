"use client";

import { useEffect, useState } from "react";
import { TOPBAR_STUCK_OFFSET } from "@/lib/chrome";

export function useStickyTopbar() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > TOPBAR_STUCK_OFFSET);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return stuck;
}
