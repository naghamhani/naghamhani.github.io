"use client";
import { useState, useEffect, useMemo } from "react";
import { useI18n } from "../i18n";
import { writings } from "../data";
import { asset } from "../asset";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import type { Writing as WritingItem } from "../types";

const URL_RE = /(https?:\/\/[^\s]+)/g;
const isUrl = (s: string) => /^https?:\/\//.test(s);

// Turn bare URLs (e.g. in the references) into clickable links.
function linkify(text: string) {
  return text.split(URL_RE).map((part, i) =>
    isUrl(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-words text-terracotta underline underline-offset-2 hover:text-terracotta-dk">{part}</a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// Render the essay body, preserving the original structure: "## " marks a
// section heading (bigger/bolder), "- " marks a list item with a bold lead-in
// label before its colon, everything else is a paragraph.
function EssayBody({ blocks }: { blocks: string[] }) {
  return (
    <div className="flex flex-col gap-4 text-[15.5px] leading-[1.75] text-ink-2">
      {blocks.map((raw, i) => {
        if (raw.startsWith("## ")) {
          return <h4 key={i} className="mt-5 first:mt-0 font-display text-[clamp(20px,2.2vw,27px)] font-bold leading-[1.2] tracking-[-.01em] text-ink">{raw.slice(3)}</h4>;
        }
        if (raw.startsWith("- ")) {
          const rest = raw.slice(2);
          const c = rest.indexOf(": ");
          const label = c > -1 ? rest.slice(0, c) : null;
          const desc = c > -1 ? rest.slice(c + 2) : rest;
          return (
            <p key={i} className="flex gap-2.5">
              <span aria-hidden className="mt-[3px] flex-none font-bold text-terracotta">—</span>
              <span>{label && <strong className="font-semibold text-ink">{label}: </strong>}{linkify(desc)}</span>
            </p>
          );
        }
        return <p key={i}>{linkify(raw)}</p>;
      })}
    </div>
  );
}

function ReadModal({ item, onClose }: { item: WritingItem | null; onClose: () => void }) {
  const { t, lang } = useI18n();
  useEffect(() => {
    // Only lock scroll while a piece is actually open. This effect runs even
    // when item is null (hooks must precede the early return below), so guard
    // it — otherwise the body stays overflow:hidden and the page can't scroll.
    if (!item) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [item, onClose]);
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(26,12,23,.93)] p-[4vw] backdrop-blur-md" onClick={onClose}>
      <button onClick={onClose} aria-label={t.ui.close} className="fixed top-5 end-6 z-10 grid h-12 w-12 place-items-center rounded-full text-3xl text-white transition hover:bg-white/10">×</button>
      <article className="relative mx-auto my-[4vh] flex w-full max-w-[900px] flex-col gap-5 rounded-2xl bg-paper p-8 shadow-2xl sm:p-12" onClick={(e) => e.stopPropagation()}>
        <header className="flex flex-col gap-2 border-b border-ink/10 pb-5">
          <h3 className="font-display text-[clamp(24px,3.2vw,36px)] font-bold tracking-[-.02em] text-ink">{item.title[lang]}</h3>
          <p className="text-[14px] text-ink-2">{item.blurb[lang]}</p>
          <a href={asset(item.href)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border-[1.5px] border-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[.14em] transition hover:bg-ink hover:text-paper">
            ↓ {t.writing.download} (.{item.doc})
          </a>
        </header>
        <EssayBody blocks={item.body || []} />
      </article>
    </div>
  );
}

export default function Writing() {
  const { t, lang } = useI18n();
  const [reading, setReading] = useState<WritingItem | null>(null);
  const shown = useMemo(
    () => [...writings].sort((a, b) => (b.sort || b.date * 100 || 0) - (a.sort || a.date * 100 || 0)),
    []
  );
  return (
    <section id="writing" className="mx-auto max-w-container px-5 py-20 sm:px-8 lg:px-[72px] lg:py-32">
      <SectionHead index={t.writing.index} kicker={t.writing.kicker} meta={`${writings.length} pieces`} />
      <Reveal as="h2" className="font-display text-[clamp(30px,5vw,62px)] font-bold leading-[1.02] tracking-[-.025em]">{t.writing.title}</Reveal>
      <Reveal as="p" delay={0.08} className="mt-4 max-w-[62ch] text-[clamp(15px,1.3vw,18px)] text-ink-2">{t.writing.intro}</Reveal>
      <div className="mt-10 flex flex-col gap-4">
        {shown.map((w, i) => (
          <Reveal key={w.title.en} delay={(i % 4) * 0.05}>
            <div className="flex flex-col gap-4 rounded-xl border border-ink/10 bg-paper-2 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_46px_-34px_rgba(42,23,38,.5)] sm:flex-row sm:items-center sm:justify-between">
              <span className="flex flex-col gap-1">
                <strong className="font-display text-[19px] font-medium tracking-[-.01em] text-ink">{w.title[lang]}</strong>
                <span className="text-[13.5px] text-ink-2">{w.blurb[lang]}</span>
              </span>
              <span className="flex flex-none items-center gap-2.5">
                {w.body && (
                  <button onClick={() => setReading(w)} className="rounded-full bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[.14em] text-paper transition hover:bg-terracotta">
                    {t.writing.read} →
                  </button>
                )}
                <a href={asset(w.href)} target="_blank" rel="noopener noreferrer" className="rounded-full border-[1.5px] border-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[.14em] transition hover:bg-ink hover:text-paper">
                  ↓ .{w.doc}
                </a>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <ReadModal item={reading} onClose={() => setReading(null)} />
    </section>
  );
}
