"use client";
import { useState } from "react";
import { useI18n } from "../i18n.jsx";
import { credentials } from "../data.js";
import { asset } from "../asset.js";
import { useLightbox } from "../lightbox.jsx";
import SectionHead from "./SectionHead.jsx";
import Reveal from "./Reveal.jsx";

const CATS = ["all", "data", "award", "impact"];

export default function Credentials() {
  const { t, lang } = useI18n();
  const { open } = useLightbox();
  const [filter, setFilter] = useState("all");
  const shown = credentials
    .filter((c) => filter === "all" || c.cat === filter)
    .sort((a, b) => (b.sort || b.date * 100 || 0) - (a.sort || a.date * 100 || 0));
  return (
    <section id="credentials" className="mx-auto max-w-container px-5 py-20 sm:px-8 lg:px-[72px] lg:py-32">
      <SectionHead index={t.credentials.index} kicker={t.credentials.kicker} meta="88 credentials" />
      <Reveal as="h2" className="font-display text-[clamp(30px,5vw,62px)] font-bold leading-[1.02] tracking-[-.025em]">{t.credentials.title}</Reveal>
      <Reveal as="p" delay={0.08} className="mt-4 max-w-[62ch] text-[clamp(15px,1.3vw,18px)] text-ink-2">{t.credentials.intro}</Reveal>
      <div className="my-8 flex flex-wrap gap-2.5">
        {CATS.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`rounded-full border px-4 py-2 font-mono text-[13px] transition ${filter === c ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper-2 text-ink-2 hover:border-ink"}`}>{t.credentials.filters[c]}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((c, i) => {
          const cover = c.cover || c.img;
          const items = c.set ? c.set : [{ src: c.img, cap: { en: `${c.title.en} — ${c.issuer.en}`, ar: `${c.title.ar} — ${c.issuer.ar}` } }];
          const cardCls = "group relative flex w-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-paper-2 text-start transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_46px_-34px_rgba(42,23,38,.5)]";
          const body = (
            <>
              {c.badge && <span className="absolute end-2.5 top-2.5 z-10 grid h-7 min-w-7 place-items-center rounded-full bg-terracotta px-2 font-mono text-[13px] text-white shadow-[0_6px_16px_-6px_rgba(199,41,94,.8)]">{c.badge}</span>}
              {c.date && <span className="absolute start-2.5 top-2.5 z-10 rounded-full bg-ink-bg/70 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">{c.date}</span>}
              {c.doc
                ? <span className="flex aspect-[4/3] w-full items-center justify-center bg-white font-mono text-[13px] uppercase tracking-wide text-ink-2 transition duration-500 group-hover:scale-105">.{c.doc}</span>
                : <img src={asset(cover)} alt={c.title[lang]} loading="lazy" className="aspect-[4/3] w-full bg-white object-contain transition duration-500 group-hover:scale-105" />}
              <span className="flex flex-col gap-1 p-4 text-[12.5px] text-ink-2">
                <strong className="font-display text-[15.5px] font-medium tracking-[-.01em] text-ink">{c.title[lang]}</strong>
                {c.issuer[lang]}{c.set ? ` · ${t.ui.viewAll} →` : ""}
              </span>
            </>
          );
          return (
            <Reveal key={c.title.en} delay={(i % 4) * 0.05}>
              {c.href
                ? <a href={asset(c.href)} target="_blank" rel="noopener noreferrer" className={cardCls}>{body}</a>
                : <button onClick={() => open(items, 0)} className={cardCls}>{body}</button>}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}