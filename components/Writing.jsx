"use client";
import { useI18n } from "../i18n.jsx";
import { writings } from "../data.js";
import { asset } from "../asset.js";
import SectionHead from "./SectionHead.jsx";
import Reveal from "./Reveal.jsx";

export default function Writing() {
  const { t, lang } = useI18n();
  const shown = [...writings].sort((a, b) => (b.sort || b.date * 100 || 0) - (a.sort || a.date * 100 || 0));
  return (
    <section id="writing" className="mx-auto max-w-container px-5 py-20 sm:px-8 lg:px-[72px] lg:py-32">
      <SectionHead index={t.writing.index} kicker={t.writing.kicker} meta={`${writings.length} pieces`} />
      <Reveal as="h2" className="font-display text-[clamp(30px,5vw,62px)] font-bold leading-[1.02] tracking-[-.025em]">{t.writing.title}</Reveal>
      <Reveal as="p" delay={0.08} className="mt-4 max-w-[62ch] text-[clamp(15px,1.3vw,18px)] text-ink-2">{t.writing.intro}</Reveal>
      <div className="mt-10 flex flex-col gap-4">
        {shown.map((w, i) => (
          <Reveal key={w.title.en} delay={(i % 4) * 0.05}>
            <a href={asset(w.href)} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2 rounded-xl border border-ink/10 bg-paper-2 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_46px_-34px_rgba(42,23,38,.5)] sm:flex-row sm:items-center sm:justify-between">
              <span className="flex flex-col gap-1">
                <strong className="font-display text-[19px] font-medium tracking-[-.01em] text-ink">{w.title[lang]}</strong>
                <span className="text-[13.5px] text-ink-2">{w.blurb[lang]}</span>
              </span>
              <span className="flex flex-none items-center gap-2 font-mono text-[12px] uppercase tracking-[.14em] text-terracotta">
                .{w.doc} · {t.writing.readDownload} →
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
