"use client";
import { useI18n } from "../i18n";
import { asset } from "../asset";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
export default function Contact() {
  const { t, isAr } = useI18n();
  const [pre, em] = t.contact.title;
  return (
    <section id="contact" className="bg-ink-bg text-paper">
      <div className="mx-auto max-w-container px-5 pt-20 sm:px-8 lg:px-[72px] lg:pt-32">
        <SectionHead index={t.contact.index} kicker={t.contact.kicker} meta="Open to work" light />
      </div>
      <div className="mx-auto max-w-container px-5 pb-20 text-center sm:px-8 lg:px-[72px] lg:pb-32">
        <Reveal as="h2" className="mx-auto max-w-[16ch] font-display text-[clamp(34px,6.5vw,82px)] font-bold leading-[1.02] tracking-[-.025em]">{pre}<em className="italic text-ochre">{em}</em></Reveal>
        <Reveal as="p" delay={0.08} className="mx-auto mt-7 max-w-[54ch] text-[clamp(15px,1.4vw,18px)] text-paper/75">{t.contact.lead}</Reveal>
        <Reveal delay={0.16} className="mt-10 flex flex-wrap justify-center gap-3.5">
          <a href="mailto:naghamhani20@gmail.com" className="rounded-full bg-terracotta px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-terracotta-dk">{t.contact.email}</a>
          <a href="https://www.linkedin.com/in/naghamalhoubani/" target="_blank" rel="noopener" className="rounded-full border-[1.5px] border-paper px-8 py-4 font-semibold text-paper transition hover:bg-paper hover:text-ink-bg">{t.contact.linkedin}</a>
          <a href="https://github.com/naghamalhoubani" target="_blank" rel="noopener" className="rounded-full border-[1.5px] border-paper px-8 py-4 font-semibold text-paper transition hover:bg-paper hover:text-ink-bg">{t.contact.github}</a>
          <a href={asset("/Nagham_Alhoubani_Resume_2026.pdf")} download className="rounded-full border-[1.5px] border-ochre px-8 py-4 font-semibold text-ochre transition hover:bg-ochre hover:text-ink-bg">{isAr ? "السيرة الذاتية ↓" : "Résumé ↓"}</a>
        </Reveal>
        <Reveal as="p" delay={0.24} className="mt-9 font-mono text-[12.5px] text-paper/50">{t.contact.loc}</Reveal>
      </div>
    </section>
  );
}