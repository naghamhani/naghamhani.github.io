"use client";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { TECH } from "../data";
import { skills, pillars } from "../lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

// Two marquee rows split from the combined tech list.
const ALL = Array.from(new Set([...TECH, ...skills.map((s) => s.replace("*", ""))]));
const rowA = ALL.filter((_, i) => i % 2 === 0);
const rowB = ALL.filter((_, i) => i % 2 === 1);

function Row({ items, reverse }: { items: string[]; reverse: boolean }) {
  return (
    <div className="marquee py-2">
      <div className={`marquee-track gap-3 ${reverse ? "rev" : ""}`}>
        {[...items, ...items].map((s, i) => (
          <span
            key={i}
            className="flex-none rounded-full border border-ink/15 bg-paper-2 px-5 py-2.5 font-mono text-[14px] text-ink-2"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// Stylized CLI output typed out once the terminal scrolls into view.
type LineKind = "cmd" | "dim" | "ok" | "out";
interface Line { txt: string; kind: LineKind; sub?: string; }

function Terminal() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [n, setN] = useState(0);

  const lines: Line[] = [
    { txt: t.skills.prompt, kind: "cmd" },
    { txt: "› booting profile … ok", kind: "dim" },
    ...pillars.map((p) => ({ txt: `[${p.n}] ${p.h}`, kind: "ok" as const, sub: p.p })),
    { txt: "", kind: "dim" },
    { txt: `core      ${skills.slice(0, 8).join("  ")}`, kind: "out" },
    { txt: `applied   ${skills.slice(8).join("  ")}`, kind: "out" },
    { txt: "", kind: "dim" },
    { txt: "status    3× national winner · 9XAI Fellow · open to work", kind: "ok" },
    { txt: "$ _", kind: "cmd" },
  ];

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(lines.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (n >= lines.length) return;
    const id = setTimeout(() => setN((x) => x + 1), 230);
    return () => clearTimeout(id);
  }, [started, n]);

  const color: Record<LineKind, string> = { cmd: "text-ochre", ok: "text-paper", out: "text-paper/80", dim: "text-paper/45" };

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-ink/30 bg-ink shadow-[0_40px_70px_-44px_rgba(0,0,0,.7)]">
      <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-terracotta" />
        <span className="h-3 w-3 rounded-full bg-ochre" />
        <span className="h-3 w-3 rounded-full bg-paper/40" />
        <span className="ms-3 font-mono text-[12px] text-paper/50">{t.skills.terminalTitle}</span>
      </div>
      <div className="space-y-1.5 px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-[14px]">
        {lines.slice(0, n).map((l, i) => (
          <div key={i}>
            <p className={`${color[l.kind]} ${l.kind === "ok" ? "font-medium" : ""} break-words`}>
              {l.kind === "ok" && l.sub ? <span className="text-terracotta">✓ </span> : null}
              {l.txt || " "}
            </p>
            {l.sub && <p className="ps-4 text-paper/45">{l.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useI18n();
  const [pre, em] = t.skills.title;
  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8 lg:px-[72px]">
        <SectionHead index={t.skills.index} kicker={t.skills.kicker} meta="tools · methods · stack" />
        <Reveal as="h2" className="mb-3 font-display text-[clamp(28px,4.6vw,56px)] font-bold leading-[1.04] tracking-[-.025em]">
          {pre}<em className="italic text-terracotta">{em}</em>
        </Reveal>
        <Reveal as="p" delay={0.06} className="mb-12 max-w-[58ch] text-[clamp(15px,1.3vw,18px)] text-ink-2">{t.skills.intro}</Reveal>
      </div>

      <div className="space-y-2">
        <Row items={rowA} reverse={false} />
        <Row items={rowB} reverse={true} />
      </div>

      {/* Three pillars — what I'm good at and where they overlap */}
      <div className="mx-auto mt-14 max-w-container px-5 sm:px-8 lg:px-[72px]">
        <div className="grid gap-6 md:grid-cols-3">
          {t.focus.pillars.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-paper-2 p-8 transition duration-300 hover:-translate-y-1.5 hover:bg-paper-3 hover:shadow-[0_30px_50px_-34px_rgba(42,23,38,.45)]">
              <span className="absolute inset-x-0 top-0 h-[3px] w-0 bg-terracotta transition-all duration-500 group-hover:w-full" />
              <span className="font-pixel text-[12px] text-terracotta">P{i + 1}</span>
              <h3 className="my-3 font-display text-[23px] font-medium tracking-[-.01em]">{p.h}</h3>
              <p className="mb-3.5 text-[15px] text-ink-2">{p.p}</p>
              <p className="font-mono text-[11.5px] text-ink-3">{p.s}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-container px-5 sm:px-8 lg:px-[72px] lg:mt-14">
        <Reveal><Terminal /></Reveal>
      </div>
    </section>
  );
}
