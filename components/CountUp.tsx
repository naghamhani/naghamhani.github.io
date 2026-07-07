"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const m = String(value).match(/^([\d.]+)(.*)$/);
  const target = m ? parseFloat(m[1]) : 0;
  const dec = m && m[1].includes(".") ? m[1].split(".")[1].length : 0;
  const suffix = m ? m[2] : "";
  const [txt, setTxt] = useState(m ? `0${suffix}` : value);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setTxt(value); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.unobserve(el);
      const dur = 1400, t0 = performance.now();
      const step = (now: number) => { const p = Math.min((now - t0) / dur, 1); const eased = 1 - Math.pow(1 - p, 3);
        setTxt((target * eased).toFixed(dec) + suffix); if (p < 1) requestAnimationFrame(step); else setTxt(target.toFixed(dec) + suffix); };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el); return () => io.disconnect();
  }, [value, target, dec, suffix]);
  return <span ref={ref}>{txt}</span>;
}
