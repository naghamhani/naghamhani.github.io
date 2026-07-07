"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useI18n } from "./i18n";
import { asset } from "./asset";
import type { LightboxItem } from "./types";

interface LightboxState {
  open: boolean;
  items: LightboxItem[];
  i: number;
}

interface LightboxContextValue {
  open: (items: LightboxItem[], i?: number) => void;
}

const Ctx = createContext<LightboxContextValue | null>(null);

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState>({ open: false, items: [], i: 0 });
  const open = useCallback((items: LightboxItem[], i = 0) => setState({ open: true, items, i }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const move = useCallback((d: number) => setState((s) => ({ ...s, i: (s.i + d + s.items.length) % s.items.length })), []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <Modal state={state} close={close} move={move} />
    </Ctx.Provider>
  );
}

interface ModalProps {
  state: LightboxState;
  close: () => void;
  move: (d: number) => void;
}

function Modal({ state, close, move }: ModalProps) {
  const { lang, t } = useI18n();
  useEffect(() => {
    if (!state.open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowLeft") move(-1); if (e.key === "ArrowRight") move(1); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [state.open, close, move]);
  if (!state.open) return null;
  const item: LightboxItem = state.items[state.i] || {};
  const cap = typeof item.cap === "object" ? item.cap[lang] : item.cap;
  const fmtDate = (d?: string) => { if (!d) return ""; const [y, m] = d.split("-"); return new Date(+y, +m - 1).toLocaleString("en", { month: "long", year: "numeric" }); };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-[5vw] bg-[rgba(26,12,23,.93)] backdrop-blur-md" onClick={close}>
      <button onClick={close} aria-label={t.ui.close} className="absolute top-5 end-6 grid h-12 w-12 place-items-center rounded-full text-3xl text-white transition hover:bg-white/10">×</button>
      {state.items.length > 1 && (<>
        <button onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label={t.ui.prev} className="absolute start-[3vw] top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full text-4xl text-white/80 transition hover:bg-white/10 hover:text-white">‹</button>
        <button onClick={(e) => { e.stopPropagation(); move(1); }} aria-label={t.ui.next} className="absolute end-[3vw] top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full text-4xl text-white/80 transition hover:bg-white/10 hover:text-white">›</button>
      </>)}
      <figure className="flex max-h-[88vh] max-w-[min(1000px,92vw)] flex-col gap-3" onClick={(e) => e.stopPropagation()}>
        {item.video
          ? <video src={asset(item.video)} poster={item.src ? asset(item.src) : undefined} controls autoPlay playsInline className="mx-auto max-h-[78vh] w-auto rounded-lg shadow-2xl" />
          : <img src={item.src ? asset(item.src) : undefined} alt={cap || ""} className="mx-auto max-h-[78vh] w-auto rounded-lg shadow-2xl" />}
        <figcaption className="text-center font-mono text-[13px] text-paper/80">
          {cap}{item.date ? <span className="ml-2 opacity-60">· {fmtDate(item.date)}</span> : null}
          {state.items.length > 1 ? <span className="ml-2 opacity-50">· {state.i + 1} / {state.items.length}</span> : null}
        </figcaption>
      </figure>
    </div>
  );
}
