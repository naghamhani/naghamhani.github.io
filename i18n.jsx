"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export const STR = {
  en: {
    dir: "ltr",
    nav: { hero: "Intro", manifesto: "Manifesto", about: "About", skills: "Skills", focus: "Focus", experience: "Experience", work: "Work", gallery: "Gallery", credentials: "Credentials", writing: "Writing", contact: "Contact", cta: "Let’s talk" },
    langName: "العربية",
    hero: {
      eyebrow: "Data scientist · AI engineer · 9XAI Fellow · Amman, Jordan",
      title: ["I bring a balanced tech approach to ", "completely uncharted territories", ""],
      lead: "Hey, I am Nagham. I am a data scientist and AI engineer, but my real passion is bringing tech solutions into spaces that aren’t traditionally technical. I focus on areas like women’s health, AI ethics, and industries that tech often leaves behind. I look at the data to find what is missing, and then build practical tools to bridge those gaps using the resources at hand. It’s a hands-on approach that has earned a few national awards, but for me, it’s really just about making a tangible impact where it’s needed most.",
      seeWork: "See the work", getInTouch: "Get in touch",
      proof: ["3× national winner", "Healthcare AI", "Data science & ML", "AI ethics", "9XAI Fellow"],
    },
    stats: [
      { n: "3.66", l: "GPA · Data Science & AI" },
      { n: "3×", l: "National competition wins · 2024–2026" },
      { n: "87", l: "Professional certifications" },
      { n: "18", l: "Published HeForShe articles" },
    ],
    manifesto: {
      line: ["I bring a balanced tech approach to ", "completely uncharted territory", ". I want to do more than just write code; my focus is on seeking out the persistent, lingering questions the data reveals, and translating them into solutions that actually shift reality."],
    },
    skills: {
      kicker: "Stack", index: "✦", title: ["The tools I reach for — ", "and what they’re for."],
      intro: "From wrangling raw data to deploying models, the working toolkit behind every project.",
      pillarsTitle: "Three things I’m good at",
      terminalTitle: "stack.sh",
      prompt: "$ stack ai --status",
    },
    about: {
      kicker: "About", index: "01",
      title: ["I go looking for the gaps ", "everyone else walks past."],
      p: [
        "My focus has always been on the industry’s blind spots: the critical intersections where good data meets real, unaddressed needs but the rest of the tech world talks right over them. Instead of waiting around, I went looking for them. I earned my Data Science & AI degree from Al Hussein Technical University with a 3.66 GPA, but my true focus was always outside the lecture hall. By completing 87 certificates across both technical and non-technical fields, I built a versatile toolkit designed to create things that actually land in the real world.",
        "My work spans healthcare AI, data science, and AI ethics, and it keeps circling back to the people most systems overlook. My capstone used big data and machine learning to predict postpartum depression in women across the SWANA region, something the systems around them routinely miss. Find the gap, gather the evidence, build the model, then hand people something they can act on.",
        "I have never treated the technical and the human as separate tracks. Leading the ACM student chapter, writing for HeForShe with UN Women, contributing to WikiGap, winning national competitions in healthcare and AI, to me it’s all one job: using what I know to make things measurably better for the people usually left out of the plan.",
      ],
      pills: ["Healthcare AI", "Data science & ML", "AI ethics", "Women in tech", "Human rights", "Bilingual · EN / AR"],
    },
    focus: {
      kicker: "What I do", index: "02", title: "Three things I’m good at, and where they overlap.",
      pillars: [
        { h: "Data science & machine learning", p: "The whole pipeline: wrangling messy real-world data, engineering the features that actually matter, training and stress-testing models, then translating the result into something a non-technical person can trust and use.", s: "python · pandas · numpy · scikit-learn · r · sql" },
        { h: "Applied AI & research", p: "Neural networks, decision trees, and the modern AI toolkit pointed at questions that count: healthcare diagnostics, AI ethics, and the women’s-health work I keep returning to.", s: "neural nets · nlp & llm concepts · ai ethics · big data · hadoop" },
        { h: "Impact & leadership", p: "Running a student chapter, publishing on human rights, organising events, teaching peers, turning technical skill into momentum a whole community can feel.", s: "acm president · heforshe · wikigap · mentoring · public speaking" },
      ],
    },
    experience: { kicker: "The journey", index: "03", title: ["From first-year rep to ", "three-time national winner."], intro: "The roles, the wins, and the rooms I talked my way into, one deliberate step at a time." },
    work: { kicker: "Selected work", index: "02", title: ["Projects where the data did something ", "real."], featuredKicker: "Big Data · Machine Learning · Women’s Health", featuredTitle: "Predicting Postpartum Depression in SWANA Women", featuredBadge: "Flagship · Research", featuredBody: "My capstone pointed big-data pipelines and machine-learning models at a question most systems stay quiet on: predicting postpartum depression in women across the SWANA region, where reliable data and timely screening barely exist. The goal was simple: give clinicians and families an early, evidence-based signal where there’d otherwise be silence." },
    gallery: { kicker: "In the field", index: "✦", title: ["Years of showing up, ", "in pictures."], intro: "Competitions, fellowships, leadership, community: the teams, stages and small wins behind the résumé. Tap any photo to open it.", filters: { all: "All", award: "Awards", experience: "Experience", impact: "Impact" } },
    credentials: { kicker: "Credentials", index: "✦", title: "The receipts.", intro: "88 certifications and recognitions, spanning data science, healthcare AI, AI ethics, human rights and language. Cards with a number open the full series. Tap any card to take a closer look.", filters: { all: "All", data: "Data & AI", award: "Awards", impact: "Impact" } },
    writing: { kicker: "Writing", index: "✦", title: "Words, outside the code.", intro: "Essays and personal writing — where I think out loud about the things that don’t fit in a notebook cell.", readDownload: "Read / Download" },
    contact: { kicker: "Get in touch", index: "04", title: ["Let’s build something ", "people actually need."], lead: "I’m open to roles and collaborations in data science, healthcare AI, applied AI, and AI ethics, especially anywhere technology meets human wellbeing and someone’s been left out of the picture. If that sounds like your work, say hi.", email: "Email me", linkedin: "LinkedIn", github: "GitHub", loc: "Based in Amman, Jordan · Working in English & Arabic" },
    footer: { tag: "Data scientist · AI engineer · 9XAI Fellow", credit: "Built by Nagham, on purpose." },
    ui: { close: "Close", prev: "Previous", next: "Next", viewAll: "view all", playVideo: "Play video" },
  },
  ar: {
    dir: "rtl",
    nav: { hero: "المقدّمة", manifesto: "الرؤية", about: "نبذة", skills: "الأدوات", focus: "تركيزي", experience: "المسيرة", work: "أعمالي", gallery: "معرض", credentials: "الشهادات", writing: "كتاباتي", contact: "تواصل", cta: "لنتحدّث" },
    langName: "English",
    hero: {
      eyebrow: "عالِمة بيانات · مهندسة ذكاء اصطناعي · زميلة 9XAI — عمّان، الأردن",
      title: ["أبني ", "ذكاءً اصطناعيًا قائمًا على الأدلّة", " لحلّ المشكلات التي يتجاهلها العالم."],
      lead: "أنا نغم — خرّيجة علم البيانات والذكاء الاصطناعي بمعدل 3.66، وفائزة بثلاث مسابقات وطنية. أمزج بين صرامة تقنية عالية وأبحاث في صحة المرأة وحقوق الإنسان. أرصد الفجوات التي تشير إليها البيانات، ثم أتقدّم وأبني الحل.",
      seeWork: "شاهد الأعمال", getInTouch: "تواصلي معي",
      proof: ["فائزة بثلاث مسابقات وطنية", "رئيسة ACM وبانية مجتمع", "علم البيانات والذكاء الاصطناعي", "ذكاء اصطناعي لصحة المرأة", "زميلة 9XAI"],
    },
    stats: [
      { n: "3.66", l: "المعدل · علم البيانات والذكاء الاصطناعي" },
      { n: "3×", l: "فوز بمسابقات وطنية · 2024–2026" },
      { n: "87", l: "شهادة مهنية" },
      { n: "18", l: "مقالًا منشورًا مع HeForShe" },
    ],
    manifesto: {
      line: ["آخذ العمل التقني على محمل الجدّ، وأوجّهه إلى حيث ", "لا ينظر أحد", ": صحة المرأة، والمجتمعات المهمّشة، والأسئلة التي تلمّح إليها البيانات ولا يجيب عنها أحد."],
    },
    skills: {
      kicker: "الأدوات", index: "✦", title: ["الأدوات التي أعتمد عليها، ", "وما تخدمه."],
      intro: "من تنظيف البيانات إلى نشر النماذج — عُدّة العمل خلف المشاريع.",
      pillarsTitle: "ثلاثة أشياء أُتقنها",
      terminalTitle: "stack.sh",
      prompt: "$ stack ai --status",
    },
    about: {
      kicker: "نبذة", index: "٠١",
      title: ["تقنيّة ترفض أن ", "تكون مجرّد مراقِبة."],
      p: [
        "كبرتُ وأنا مقتنعة بأن أكثر المشكلات إثارةً للاهتمام تعيش حيث تلتقي البيانات الدقيقة بمصائر بشرية حقيقية، فذهبتُ أبحث عنها. في جامعة الحسين التقنية حصلتُ على معدل 3.66 في علم البيانات والذكاء الاصطناعي، وقضيتُ كل فصل خارج القاعة أحوّل هذا التدريب إلى أثرٍ ملموس.",
        "تعود أبحاثي دائمًا إلى مكانٍ واحد: صحة النساء في منطقة سوانا، حيث تَندُر البيانات ولا تَندُر العواقب. استخدم مشروع التخرّج البياناتِ الضخمة وتعلّم الآلة للتنبؤ باكتئاب ما بعد الولادة لدى نساء المنطقة — وهو ما تتجاهله الأنظمة حولهنّ. أرصد الفجوة، أجمع الأدلّة، أبني النموذج، وأقدّم للناس شيئًا قابلًا للتطبيق.",
        "إلى جانب العمل التقني، قُدتُ — رئيسةً لنادي ACM الطلابي، وصانعةَ محتوى HeForShe مع هيئة الأمم المتحدة للمرأة، ومساهِمةً في WikiGap، وفائزةً بثلاث مسابقات وطنية في الصحة والذكاء الاصطناعي. لا أرى التقني والإنساني مسارَين منفصلَين، بل هما المهمة نفسها: توظيف ما أعرفه لجعل حياة الناس أفضل بشكلٍ قابل للقياس.",
      ],
      pills: ["قائم على الأدلّة", "صاحبة مبادرة", "المرأة في التقنية", "حقوق الإنسان", "ذكاء اصطناعي للصحة", "ثنائية اللغة · EN / AR (C2)"],
    },
    focus: {
      kicker: "ما أقوم به", index: "٠٢", title: "ثلاثة أشياء أُتقنها — وحيث تتقاطع.",
      pillars: [
        { h: "علم البيانات وتعلّم الآلة", p: "من البداية للنهاية: تنظيف البيانات الواقعية الفوضوية، وهندسة الخصائص، وتدريب النماذج وتقييمها، وتحويل النتيجة إلى شيء يثق به القارئ غير التقني ويستخدمه.", s: "python · pandas · numpy · scikit-learn · r · sql" },
        { h: "الذكاء الاصطناعي التطبيقي والبحث", p: "الشبكات العصبية وأشجار القرار وأدوات الذكاء الاصطناعي الحديثة موجّهة نحو أسئلة مهمة — اكتئاب ما بعد الولادة، وصحة المرأة، والتشخيص الطبي.", s: "neural nets · nlp & llm · ai ethics · big data · hadoop" },
        { h: "الأثر والقيادة", p: "إدارة نادٍ طلابي، والنشر في حقوق الإنسان، وتنظيم الفعاليات وتدريس الزملاء — ترجمة القدرة التقنية إلى تغييرٍ مجتمعي وزخمٍ مشترك.", s: "رئيسة ACM · heforshe · wikigap · إرشاد · خطابة" },
      ],
    },
    experience: { kicker: "المسيرة", index: "٠٣", title: ["من ممثلة السنة الأولى إلى ", "فائزة وطنية ثلاث مرّات."], intro: "نظرة زمنية على الأدوار والإنجازات والقاعات التي شققتُ طريقي إليها — خطوةً مدروسةً تلو الأخرى." },
    work: { kicker: "أعمال مختارة", index: "٠٢", title: ["مشاريع فعلت فيها البيانات شيئًا ", "حقيقيًا."], featuredKicker: "بيانات ضخمة · تعلّم آلة · صحة المرأة", featuredTitle: "التنبؤ باكتئاب ما بعد الولادة لدى نساء سوانا", featuredBadge: "المشروع الرئيسي · بحث", featuredBody: "طبّق مشروع تخرّجي خطوط معالجة البيانات الضخمة ونماذج تعلّم الآلة للتنبؤ باكتئاب ما بعد الولادة لدى النساء في منطقة سوانا — وهنّ فئة تَندُر لها البيانات الموثوقة والفحص المبكر. الهدف: منح الأطباء والأسر إشارةً مبكرة قائمة على الأدلّة حيث يصمت النظام القائم." },
    gallery: { kicker: "في الميدان", index: "✦", title: ["مسيرة، في ", "لحظات."], intro: "سنوات من المسابقات والزمالات والقيادة والمجتمع — الفرق والمنصّات والمحطات خلف السيرة الذاتية. انقري أي صورة لتكبيرها.", filters: { all: "الكل", award: "جوائز", experience: "خبرات", impact: "أثر" } },
    credentials: { kicker: "الشهادات", index: "✦", title: "الإثباتات.", intro: "٨٨ شهادة وتكريمًا، من علم البيانات والذكاء الاصطناعي إلى حقوق الإنسان واللغة. البطاقات التي تحمل رقمًا تُفتح لعرض كل شهادات السلسلة. انقري أي بطاقة لعرضها.", filters: { all: "الكل", data: "بيانات وذكاء", award: "جوائز", impact: "أثر" } },
    writing: { kicker: "كتاباتي", index: "✦", title: "كلمات، خارج الكود.", intro: "مقالات وكتابات شخصية أفكّر فيها بصوتٍ عالٍ في أمور لا تتّسع لها خلية برمجية.", readDownload: "قراءة / تحميل" },
    contact: { kicker: "تواصل", index: "٠٤", title: ["لنبنِ معًا شيئًا ", "ذا قيمة."], lead: "أرحّب بالفرص والتعاون في علم البيانات والذكاء الاصطناعي التطبيقي والتقنية لأجل الخير — خصوصًا عند تقاطع التقنية مع رفاه الإنسان. إن كان هذا أنت، فلنتحدّث.", email: "راسليني", linkedin: "لينكدإن", github: "غيت‑هَب", loc: "مقيمة في عمّان، الأردن · أعمل بالعربية والإنجليزية" },
    footer: { tag: "عالِمة بيانات · مهندسة ذكاء اصطناعي · زميلة 9XAI", credit: "بُني بنيّة وإصرار." },
    ui: { close: "إغلاق", prev: "السابق", next: "التالي", viewAll: "عرض الكل", playVideo: "تشغيل الفيديو" },
  },
};

const I18nCtx = createContext(null);

export function I18nProvider({ children }) {
  const lang = "en";
  const dir = "ltr";
  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.documentElement.classList.remove("font-arabic-root");
    try { localStorage.removeItem("lang"); } catch (e) {}
  }, []);
  const toggle = useCallback(() => {}, []);
  const t = STR.en;
  return <I18nCtx.Provider value={{ lang, dir, t, toggle, isAr: false }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);