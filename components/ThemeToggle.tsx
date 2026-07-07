"use client";
import { useTheme } from "../theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/30 text-ink transition hover:bg-ink hover:text-paper ${className}`}
    >
      <span aria-hidden="true" className="text-[15px] leading-none">{isDark ? "☀" : "☾"}</span>
    </button>
  );
}
