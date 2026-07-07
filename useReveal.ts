"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

export function useReveal(threshold = 0.12): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } }, { threshold, rootMargin: "0px 0px -8% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return [ref, shown];
}
