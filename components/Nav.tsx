"use client";
import { useEffect, useState } from "react";
import { useI18n } from "../i18n";
import { NAV } from "../data";

export default function Nav() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const secs = NAV.map((id) => document.getElementById(id)).filter((s): s is HTMLElement => Boolean(s));
    if (!secs.length) return;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  // Re-trigger section animations when their nav link is clicked.
  const replay = (id: string) => {
    const evt = id === "hero" ? "hero:replay" : id === "manifesto" ? "manifesto:replay" : null;
    if (evt) setTimeout(() => window.dispatchEvent(new Event(evt)), 120);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-paper/85 py-5 shadow-[0_1px_0_rgba(42,23,38,.14)] backdrop-blur-md" : "py-8"}`}>
      <div className="mx-auto flex max-w-container items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8 lg:px-[72px]">
        <a href="#top" className="flex min-w-0 items-center gap-2.5 font-semibold sm:gap-4" aria-label="Nagham Alhoubani — home">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-terracotta pb-0.5 font-display text-lg text-white sm:h-12 sm:w-12 sm:text-2xl">ن</span>
          <span className="min-w-0 truncate text-[15px] sm:whitespace-nowrap sm:text-[19px]">Nagham&nbsp;Alhoubani</span>
        </a>
        <nav className="hidden items-center gap-7 text-[16px] font-medium lg:flex" aria-label="Primary">
          {NAV.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => replay(id)} className={`relative transition-colors after:absolute after:-bottom-1.5 after:start-0 after:h-[1.5px] after:bg-terracotta after:transition-all ${active === id ? "text-ink after:w-full" : "text-ink-2 after:w-0 hover:text-ink hover:after:w-full"}`}>{(t.nav as Record<string, string>)[id]}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden rounded-full border-[1.5px] border-ink px-5 py-2.5 text-[16px] font-semibold transition hover:bg-ink hover:text-paper sm:inline-block">{t.nav.cta}</a>
          <button className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 p-2 lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span className={`block h-0.5 w-6 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-ink transition ${open ? "-translate-y-0 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      <div className={`fixed inset-0 -z-10 flex flex-col justify-center gap-1.5 overflow-y-auto bg-paper px-8 py-24 transition-transform duration-500 lg:hidden ${open ? "translate-y-0" : "-translate-y-full"}`}>
        {NAV.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => { setOpen(false); replay(id); }} className="flex-none border-b border-ink/10 py-1.5 font-display text-[28px] hover:text-terracotta sm:py-2 sm:text-4xl">{(t.nav as Record<string, string>)[id]}</a>
        ))}
      </div>
    </header>
  );
}
