"use client";
import { useI18n } from "../i18n";
import { experience } from "../lib/data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const EDUCATION = [
  {
    h: "BSc — Data Science & Artificial Intelligence",
    org: "Al Hussein Technical University (HTU)",
    date: "2021 — 2025",
    p: "Graduated with a 3.66 GPA. Capstone: predicting postpartum depression in SWANA women using big data and machine learning.",
    chips: ["GPA 3.66", "Capstone: Health ML"],
  },
];

const SCHOLARSHIPS = [
  { h: "9XAI Fellowship", org: "9XAI Program", date: "2026", p: "Selected Fellow leading technical initiatives for public-sector digital transformation and content-generation tools.", chips: ["Fellowship", "Applied AI"] },
  { h: "Advanced Data Analytics Fellowship — Honors", org: "Correlation One", date: "2025 — 2026", p: "Completed the intensive data-analytics fellowship, graduating with Honors.", chips: ["Honors", "Data Analytics"] },
  { h: "Rania Nimr Abd al-Aal Scholarship", org: "Al Hussein Technical University (HTU)", date: "2023 — 2024", p: "Merit-based scholarship awarded during the Bachelor’s in Data Science & AI.", chips: ["Merit scholarship"] },
  { h: "Women in Tech Mentorship Program", org: "Zain Jordan", date: "2025 — 2026", p: "Selected for Zain’s specialized professional development and mentorship program.", chips: ["Mentorship"] },
];

const HONORS = [
  { h: "1st Place — Reproductive Health Solutions", org: "Royal Health Awareness Society", date: "May 2026", p: "1st place for an innovative reproductive-healthcare app tracking patient metrics, predicting physiological patterns, and anonymously aggregating crowdsourced data to close research gaps.", chips: ["1st Place", "HealthTech"] },
  { h: "3rd Place — The Nur Project · 9th Hakeem Academy Competition", org: "Electronic Health Solutions (EHS)", date: "Oct 2024", p: "3rd place (solo) for an independently developed ML concept predicting and addressing postpartum depression.", chips: ["3rd Place", "Machine Learning"] },
  { h: "2nd Place — Generative AI Hackathon", org: "Tahaluf Al Emarat Technical Solutions", date: "Jan 2024", p: "2nd place in a high-intensity hackathon hosted at the InterContinental Amman.", chips: ["2nd Place", "Generative AI"] },
  { h: "2nd Place — HTU AI Hackathon", org: "HTU & KBW", date: "Oct 2024", p: "2nd place developing functional AI-driven traffic solutions.", chips: ["2nd Place", "AI"] },
  { h: "Two-Time National Math Finalist", org: "HTU Math Marathon", date: "2022 · 2023", p: "Top finalist two years running — Top 20 of 70+ students in the 2022 Spring Math Marathon.", chips: ["Finalist"] },
  { h: "National Competition Excellence & University Representation", org: "Al Hussein Technical University (HTU)", date: "2024 — 2025", p: "Recognized for back-to-back national victories representing the university across major technical competitions.", chips: ["Excellence Award"] },
  { h: "Club Admission & Leadership Recognition", org: "Al Hussein Technical University (HTU)", date: "2022", p: "Recognized for active contribution and leadership across ACM and GDVC.", chips: ["Leadership"] },
  { h: "WikiGap Certificate & UN Women Recognition", org: "UN Women × Swedish Ministry for Foreign Affairs", date: "2021 — 2022", p: "Recognized for technical translation contributions to Wikipedia.", chips: ["Impact"] },
];

function Slashes() {
  return (
    <div className="my-7 flex items-center justify-center" aria-hidden="true">
      <span className="slashes text-[15px]">/////////////////////////</span>
    </div>
  );
}

interface ChronoEntry {
  h: string;
  org: string;
  date: string;
  p?: string;
  chips?: string[];
}

function Entry({ item, accent }: { item: ChronoEntry; accent: boolean }) {
  return (
    <Reveal>
      <div className="text-center">
        <span
          className={`pixel-head inline-block rounded px-2.5 py-1 text-[10px] ${
            accent ? "bg-terracotta/12 text-terracotta" : "bg-ochre/15 text-ochre"
          }`}
          style={accent ? {} : { color: "#E5A23A" }}
        >
          {item.date}
        </span>
        <h3 className="mx-auto mt-4 max-w-[34ch] font-display text-[clamp(20px,2.6vw,30px)] font-bold leading-[1.12] tracking-[-.015em]">
          {item.h}
        </h3>
        <p className="mt-2 font-mono text-[12.5px] uppercase tracking-[.08em] text-ink-3">{item.org}</p>
        {item.p && <p className="mx-auto mt-4 max-w-[58ch] text-[15px] text-ink-2">{item.p}</p>}
        {item.chips && item.chips.length > 0 && (
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {item.chips.map((c: string, i: number) => (
              <li key={i} className="rounded-full border border-ink/15 bg-paper-2 px-3 py-1 font-mono text-[11.5px] text-ink-2">{c}</li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

export default function Chronology() {
  const { t } = useI18n();
  const [pre, em] = t.experience.title;
  return (
    <section id="experience" className="bg-paper">
      <div className="mx-auto max-w-container px-5 py-20 sm:px-8 lg:px-[72px] lg:py-32">
        <SectionHead index={t.experience.index} kicker="Chronology" meta="active since 2021" />
      </div>
      <div className="mx-auto w-full max-w-[700px] px-5 pb-20 sm:px-6 lg:pb-32">
        <Reveal as="h2" className="mb-3 text-center font-display text-[clamp(28px,5vw,56px)] font-bold leading-[1.04] tracking-[-.025em]">
          {pre}<em className="italic text-terracotta">{em}</em>
        </Reveal>
        <Reveal as="p" delay={0.06} className="mx-auto mb-4 max-w-[56ch] text-center text-[15px] text-ink-2">{t.experience.intro}</Reveal>

        <div className="pixel-head mt-12 text-center text-[12px] text-terracotta">— Education —</div>
        {EDUCATION.map((e, i) => (
          <div key={i}>
            <div className="mt-7" />
            <Entry item={e} accent />
          </div>
        ))}

        <Slashes />

        <div className="pixel-head text-center text-[12px] text-terracotta">— Experience —</div>
        {experience.map((e, i) => (
          <div key={i}>
            {i === 0 ? <div className="mt-7" /> : <Slashes />}
            <Entry item={e} accent={false} />
          </div>
        ))}

        <Slashes />

        <div className="pixel-head text-center text-[12px] text-terracotta">— Honors &amp; Awards —</div>
        {HONORS.map((e, i) => (
          <div key={i}>
            {i === 0 ? <div className="mt-7" /> : <Slashes />}
            <Entry item={e} accent />
          </div>
        ))}

        <Slashes />

        <div className="pixel-head text-center text-[12px] text-terracotta">— Scholarships &amp; Fellowships —</div>
        {SCHOLARSHIPS.map((e, i) => (
          <div key={i}>
            {i === 0 ? <div className="mt-7" /> : <Slashes />}
            <Entry item={e} accent={false} />
          </div>
        ))}
      </div>
    </section>
  );
}
