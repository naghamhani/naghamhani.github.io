"use client";

interface SectionHeadProps {
  index: string;
  kicker: string;
  meta?: string;
  light?: boolean;
}

export default function SectionHead({ index, kicker, meta, light = false }: SectionHeadProps) {
  return (
    <div className={`mb-10 border-t pt-5 lg:mb-14 ${light ? "border-paper/20" : "border-ink/15"}`}>
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[15px] font-medium text-terracotta">{index}</span>
          <span className="font-mono text-[12px] uppercase tracking-[.24em] text-terracotta">/</span>
          <span className={`pixel-head text-[11px] ${light ? "text-paper/75" : "text-ink-2"}`}>{kicker}</span>
        </div>
        {meta && (
          <span className={`hidden text-end font-mono text-[11px] uppercase tracking-[.18em] sm:block ${light ? "text-paper/45" : "text-ink-3"}`}>{meta}</span>
        )}
      </div>
    </div>
  );
}
