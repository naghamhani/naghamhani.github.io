"use client";
import { useEffect, useState } from "react";

const DURATION = 1500;

function announceDone() {
  try { window.dispatchEvent(new Event("preloader:done")); } catch (e) {}
}

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      announceDone();
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      setPct(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => { setDone(true); announceDone(); }, 350);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div id="pre" className={done ? "done" : ""} aria-hidden="true">
      <div className="mono">ن</div>
      <div className="cnt">LOADING {pct}%</div>
    </div>
  );
}
