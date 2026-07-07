"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";

// Average adult reading pace ≈ 210 wpm ≈ 3.5 words per second.
const WORDS_PER_SEC = 3.5;

export default function Manifesto() {
  const { t } = useI18n();
  const [pre, em, post] = t.manifesto.line;
  const ref = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const [lit, setLit] = useState(0);

  const words = `${pre}${em}${post}`.split(" ");
  const emStart = pre.split(" ").length - 1;
  const emEnd = (pre + em).split(" ").length - 1;
  const total = words.length;

  const run = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(total + 2);
      return;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    let start = 0;
    setLit(0);
    const tick = (now: number) => {
      if (!start) start = now;
      const value = ((now - start) / 1000) * WORDS_PER_SEC;
      setLit(value);
      if (value < total + 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [total]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } },
      { threshold: 0.5 }
    );
    io.observe(el);
    const onReplay = () => run();
    window.addEventListener("manifesto:replay", onReplay);
    return () => {
      io.disconnect();
      window.removeEventListener("manifesto:replay", onReplay);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [run]);

  return (
    <section
      ref={ref}
      id="manifesto"
      aria-label="Manifesto"
      className="flex items-center bg-ink-bg text-paper"
    >
      <div className="mx-auto w-full max-w-[1700px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <p className="font-sans text-[clamp(28px,5.4vw,72px)] font-[300] leading-[1.07] tracking-[-.03em]">
          {words.map((w, i) => {
            const accent = i >= emStart && i <= emEnd;
            const amt = Math.min(Math.max(lit - i, 0), 1);
            const opacity = 0.16 + 0.84 * amt;
            return (
              <span
                key={i}
                style={{ opacity, transition: "opacity .18s ease-out", display: "inline-block" }}
                className={accent ? "italic text-terracotta" : ""}
              >
                {w}&nbsp;
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
