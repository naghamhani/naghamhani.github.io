"use client";
import { useState } from "react";
import { useI18n } from "../i18n";
import { asset } from "../asset";
import { useLightbox } from "../lightbox";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import gallery from "../data/gallery.json";

const CATS = ["all", "award", "experience", "impact"] as const;
type Cat = (typeof CATS)[number];

function fmtDate(d?: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${new Date(+y, +m - 1).toLocaleString("en", { month: "short" })} ${y}`;
}

export default function Gallery() {
  const { t, lang } = useI18n();
  const { open } = useLightbox();
  const [filter, setFilter] = useState<Cat>("all");
  const [pre, em] = t.gallery.title;
  const shown = gallery
    .filter((g) => filter === "all" || g.cat === filter)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const items = shown.map((g) => ({ src: g.src, cap: { en: g.en, ar: g.ar }, video: g.video, date: g.date }));
  return (
    <section id="gallery" className="mx-auto max-w-container px-5 py-20 sm:px-8 lg:px-[72px] lg:py-32">
      <SectionHead index={t.gallery.index} kicker={t.gallery.kicker} meta="56 photos since 2021" />
      <Reveal as="h2" className="font-display text-[clamp(30px,5vw,62px)] font-bold leading-[1.02] tracking-[-.025em]">{pre}<em className="italic text-terracotta">{em}</em></Reveal>
      <Reveal as="p" delay={0.08} className="mt-4 max-w-[60ch] text-[clamp(15px,1.3vw,18px)] text-ink-2">{t.gallery.intro}</Reveal>
      <div className="my-8 flex flex-wrap items-center gap-2.5">
        {CATS.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`rounded-full border px-4 py-2 font-mono text-[13px] transition ${filter === c ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper-2 text-ink-2 hover:border-ink"}`}>{t.gallery.filters[c]}</button>
        ))}
        <span className="ms-auto font-mono text-[12px] text-ink-3">{shown.length} moments</span>
      </div>
      <div className="masonry">
        {items.map((g, i) => (
          <figure key={g.src} className="group cursor-pointer" onClick={() => open(items, i)}>
            <div className="relative overflow-hidden rounded-xl bg-paper-2 shadow-[0_14px_30px_-24px_rgba(42,23,38,.7)]">
              <img src={asset(g.src)} alt={g.cap[lang]} loading="lazy" className="block w-full transition duration-700 group-hover:scale-[1.04]" />
              <span className="pointer-events-none absolute inset-0 bg-ink-bg/0 transition duration-500 group-hover:bg-ink-bg/15" />
              {g.video && (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink-bg/65 text-lg text-white backdrop-blur-sm">▶</span>
                </span>
              )}
            </div>
            <figcaption className="mt-2 flex items-start gap-2 px-0.5 font-mono text-[11px] uppercase tracking-[.08em] text-ink-3">
              <span className="mt-[3px] h-px w-4 flex-none bg-terracotta/60" aria-hidden="true" />
              <span className="leading-snug">{g.cap[lang]}{g.date ? <span className="text-terracotta"> · {fmtDate(g.date)}</span> : null}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
