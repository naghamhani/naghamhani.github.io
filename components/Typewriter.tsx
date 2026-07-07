"use client";
import { useEffect, useRef, useState } from "react";

// Remember once the preloader has finished so later re-types (e.g. on a
// language toggle) start immediately instead of waiting for an event that
// has already fired.
let preloaderDone = false;
if (typeof window !== "undefined") {
  window.addEventListener("preloader:done", () => { preloaderDone = true; }, { once: true });
}

interface TypewriterPart {
  text: string;
  className?: string;
}

interface TypewriterProps {
  parts: TypewriterPart[];
  speed?: number;
  startDelay?: number;
  className?: string;
  replayEvent?: string;
}

/**
 * Retro typewriter for the hero title.
 * `parts` is an array of { text, className } segments; the whole thing is
 * typed out character-by-character while the accent styling is preserved.
 */
export default function Typewriter({ parts, speed = 32, startDelay = 250, className = "", replayEvent }: TypewriterProps) {
  const full = parts.map((p) => p.text).join("");
  const total = full.length;
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [replay, setReplay] = useState(0);
  const key = `${full}|${replay}`; // restart typing on text change or a replay signal
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Allow an external trigger (e.g. clicking the "Intro" nav link) to re-type.
  useEffect(() => {
    if (!replayEvent || typeof window === "undefined") return;
    const onReplay = () => setReplay((r) => r + 1);
    window.addEventListener(replayEvent, onReplay);
    return () => window.removeEventListener(replayEvent, onReplay);
  }, [replayEvent]);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setCount(total); setDone(true); return; }

    // Always begin from an empty title, then start typing only once the
    // preloader signals it has finished (with a fallback in case we missed it).
    setCount(0); setDone(false);
    let start: ReturnType<typeof setTimeout> | undefined;
    const begin = () => {
      let i = 0;
      start = setTimeout(function tick() {
        i += 1;
        setCount(i);
        if (i >= total) { setDone(true); return; }
        // Tiny humanizing jitter + a longer beat after sentence punctuation.
        const ch = full[i - 1];
        const extra = ".!?,—".includes(ch) ? 150 : 0;
        timer.current = setTimeout(tick, speed + extra + Math.random() * 30);
      }, startDelay);
    };

    let begun = false;
    const onReady = () => { if (begun) return; begun = true; begin(); };

    let fallback: ReturnType<typeof setTimeout> | undefined;
    if (preloaderDone) {
      onReady(); // preloader already finished — start right away
    } else {
      window.addEventListener("preloader:done", onReady, { once: true });
      // Fallback: if the preloader isn't present, start after its max runtime.
      fallback = setTimeout(onReady, 2600);
    }

    return () => {
      window.removeEventListener("preloader:done", onReady);
      clearTimeout(fallback);
      clearTimeout(start);
      clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Render each styled segment with only its currently-typed slice visible.
  let consumed = 0;
  return (
    <span className={`relative ${className}`} aria-label={full}>
      {/* Invisible spacer: reserves the title's full size so layout never jumps. */}
      <span aria-hidden="true" className="invisible">
        {parts.map((p, idx) => (
          <span key={idx} className={p.className || ""}>{p.text}</span>
        ))}
      </span>
      {/* Visible typed text + caret, overlaid on the reserved space. */}
      <span aria-hidden="true" className="absolute inset-0">
        {parts.map((p, idx) => {
          const segStart = consumed;
          consumed += p.text.length;
          const shown = Math.max(0, Math.min(p.text.length, count - segStart));
          if (shown <= 0) return null;
          return (
            <span key={idx} className={p.className || ""}>
              {p.text.slice(0, shown)}
            </span>
          );
        })}
        <span
          className="tw-caret inline-block w-[0.06em] self-stretch bg-terracotta align-[-0.08em]"
          style={{ height: "0.92em" }}
          data-done={done ? "1" : "0"}
        />
      </span>
    </span>
  );
}
