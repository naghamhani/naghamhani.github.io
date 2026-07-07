"use client";
import { useI18n } from "../i18n";
import { asset } from "../asset";
import Reveal from "./Reveal";
import Typewriter from "./Typewriter";
import gallery from "../data/gallery.json";

const strip = gallery.filter((g) => ["award", "experience"].includes(g.cat)).slice(0, 14);

function fmtDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  const month = new Date(+y, +m - 1).toLocaleString("en", { month: "short" });
  return `${month} ${y}`;
}

export default function Hero() {
  const { t, lang } = useI18n();
  const [pre, em, post] = t.hero.title;
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28">
      <div className="pointer-events-none absolute -inset-[10%] z-0 animate-drift" aria-hidden="true"
        style={{ background: "radial-gradient(60% 50% at 85% 8%,rgba(229,162,58,.22),transparent 70%),radial-gradient(55% 55% at 8% 95%,rgba(199,41,94,.16),transparent 70%)" }} />
      <div className="relative z-10 mx-auto w-full max-w-container px-5 sm:px-6 lg:px-10">
          <Reveal as="p" className="mb-7 inline-flex items-center gap-2.5 font-mono text-[15px] uppercase tracking-[.14em] text-ink-2">
            <span className="h-2 w-2 animate-pulse2 rounded-full bg-terracotta" /> {t.hero.eyebrow}
          </Reveal>
          <h1 className="font-display text-[clamp(48px,8vw,112px)] font-bold leading-[.95] tracking-[-.03em]">
            <Typewriter
              className="block"
              replayEvent="hero:replay"
              parts={[
                { text: pre },
                { text: em, className: "italic text-terracotta" },
                { text: post },
              ]}
            />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[60ch] text-[clamp(16px,1.6vw,21px)] text-ink-2">{t.hero.lead}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-3">
            <a href="#work" className="inline-flex items-center gap-2.5 rounded-full bg-terracotta px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-terracotta-dk">{t.hero.seeWork} <span aria-hidden="true">↓</span></a>
            <a href="#contact" className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-ink px-6 py-3 font-semibold transition hover:bg-ink hover:text-paper">{t.hero.getInTouch}</a>
          </Reveal>
          <Reveal delay={0.2} as="ul" className="mt-8 flex max-w-[80ch] flex-wrap gap-2.5">
            {t.hero.proof.map((p, i) => (
              <li key={i} className={`rounded-full border px-3.5 py-2 font-mono text-[11.5px] transition hover:-translate-y-0.5 ${i === 0 ? "border-terracotta bg-terracotta font-medium text-white shadow-[0_10px_24px_-12px_rgba(199,41,94,.7)]" : "border-ink/15 bg-paper-2 text-ink-2"}`}>{i === 0 ? "🏆 " : ""}{p}</li>
            ))}
          </Reveal>
      </div>
      <Reveal delay={0.3} className="mt-10 flex items-center gap-3 px-5 sm:px-6 lg:mt-14 lg:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[.35em] text-ink-3">Scroll</span>
        <span className="h-px w-16 animate-pulse bg-terracotta/60" />
        <span className="text-terracotta">↓</span>
      </Reveal>
      <Reveal delay={0.25} className="mt-8 lg:mt-10">
        <div className="marquee overflow-hidden">
          <div className="marquee-track gap-[18px]">
            {[...strip, ...strip].map((g, i) => (
              <figure key={i} className="relative aspect-[4/3] w-[clamp(190px,22vw,260px)] flex-none overflow-hidden rounded-2xl shadow-[0_14px_34px_-22px_rgba(42,23,38,.6)]">
                <img src={asset(g.src)} alt={g[lang]} loading={i < 6 ? "eager" : "lazy"} className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-bg/80 to-transparent px-3.5 pb-2.5 pt-5 font-mono text-[11px] text-white">
                  {g[lang]}{g.date ? <span className="ml-1.5 opacity-70">· {fmtDate(g.date)}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}