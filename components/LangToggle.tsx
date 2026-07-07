"use client";
import { useI18n } from "../i18n";
export default function LangToggle({ className = "" }: { className?: string }) {
  const { t, toggle, isAr } = useI18n();
  return (
    <button onClick={toggle} aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
      className={`inline-flex items-center gap-2 rounded-full border border-ink/30 px-3.5 py-2 font-mono text-[13px] font-medium text-ink transition hover:bg-ink hover:text-paper ${className}`}>
      <span aria-hidden="true" className="text-[15px] leading-none">⇄</span>
      <span className={isAr ? "font-sans" : "font-arabic"}>{t.langName}</span>
    </button>
  );
}