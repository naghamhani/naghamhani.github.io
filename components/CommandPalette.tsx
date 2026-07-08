"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { asset } from "../asset";

const LINKS = {
  email: "mailto:naghamhani20@gmail.com",
  linkedin: "https://www.linkedin.com/in/naghamalhoubani/",
  github: "https://github.com/naghamhani",
  resume: asset("/Nagham_Alhoubani_Resume_2026.pdf"),
};

interface Command {
  group: string;
  label: string;
  hint: string;
  kw: string;
  run: () => void;
}

export default function CommandPalette() {
  const { t, toggle: toggleLang, isAr } = useI18n();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const commands: Command[] = useMemo(() => {
    const navIds = ["about", "skills", "work", "experience", "gallery", "credentials", "contact"];
    const navCmds: Command[] = navIds.map((id) => ({
      group: isAr ? "تنقّل" : "Navigate",
      label: (isAr ? "اذهب إلى " : "Go to ") + ((t.nav as Record<string, string>)[id] || id),
      hint: `#${id}`,
      kw: id + " " + ((t.nav as Record<string, string>)[id] || ""),
      run: () => go(id),
    }));
    const actions: Command[] = [
      { group: isAr ? "إجراءات" : "Actions", label: isAr ? "أعلى الصفحة" : "Back to top", hint: "↑", kw: "top home hero", run: () => go("top") },
    ];
    const links: Command[] = [
      { group: isAr ? "روابط" : "Links", label: isAr ? "تنزيل السيرة الذاتية" : "Download résumé", hint: "PDF", kw: "resume cv download سيرة", run: () => { window.open(LINKS.resume, "_blank"); } },
      { group: isAr ? "روابط" : "Links", label: "Email", hint: "✉", kw: "email mail contact بريد", run: () => { window.location.href = LINKS.email; } },
      { group: isAr ? "روابط" : "Links", label: "LinkedIn", hint: "↗", kw: "linkedin", run: () => window.open(LINKS.linkedin, "_blank") },
      { group: isAr ? "روابط" : "Links", label: "GitHub", hint: "↗", kw: "github code", run: () => window.open(LINKS.github, "_blank") },
    ];
    return [...navCmds, ...actions, ...links];
  }, [t, isAr, toggleLang]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => (c.label + " " + c.kw).toLowerCase().includes(s));
  }, [q, commands]);

  // Global ⌘K / Ctrl+K listener + open-event for the nav button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("cmdk:open", onOpen); };
  }, []);

  useEffect(() => {
    if (open) { setQ(""); setSel(0); setTimeout(() => inputRef.current?.focus(), 20); }
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => { setSel(0); }, [q]);

  const choose = (c?: Command) => { if (!c) return; setOpen(false); setTimeout(() => c.run(), 60); };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); choose(filtered[sel]); }
  };

  if (!open) return null;

  let lastGroup: string | null = null;
  return (
    <div id="cmdk-overlay" onMouseDown={(e) => { if ((e.target as HTMLElement).id === "cmdk-overlay") setOpen(false); }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? "لوحة الأوامر" : "Command palette"}
        className="w-full max-w-[600px] overflow-hidden rounded-2xl border border-paper/15 bg-ink-bg2 text-paper shadow-[0_50px_90px_-30px_rgba(0,0,0,.8)]"
        style={{ animation: "cmdkPop .2s var(--ease)" }}
        onKeyDown={onListKey}
      >
        <div className="flex items-center gap-3 border-b border-paper/10 px-5 py-4">
          <span className="text-terracotta">⌘</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={isAr ? "اكتب أمرًا أو ابحث…" : "Type a command or search…"}
            className="w-full bg-transparent font-sans text-[16px] text-paper placeholder:text-paper/40 focus:outline-none"
          />
          <kbd className="rounded border border-paper/20 px-2 py-0.5 font-mono text-[11px] text-paper/50">ESC</kbd>
        </div>
        <ul className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center font-mono text-[13px] text-paper/45">{isAr ? "لا نتائج" : "No results"}</li>
          )}
          {filtered.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={i}>
                {header && (
                  <div className="pixel-head px-3 pb-1 pt-3 text-[9px] text-paper/40">{header}</div>
                )}
                <button
                  onMouseEnter={() => setSel(i)}
                  onClick={() => choose(c)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start text-[14.5px] transition ${
                    sel === i ? "bg-terracotta text-white" : "text-paper/85 hover:bg-paper/5"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className={`font-mono text-[12px] ${sel === i ? "text-white/80" : "text-paper/40"}`}>{c.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-paper/10 px-5 py-3 font-mono text-[11px] text-paper/40">
          <span>↑↓ {isAr ? "تنقّل" : "navigate"}</span>
          <span>↵ {isAr ? "تنفيذ" : "select"}</span>
          <span>⌘K {isAr ? "تبديل" : "toggle"}</span>
        </div>
      </div>
    </div>
  );
}
