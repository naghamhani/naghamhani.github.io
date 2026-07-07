"use client";
import Preloader from "../components/Preloader.jsx";
import Constellation from "../components/Constellation.jsx";
import Nav from "../components/Nav.jsx";
import CommandPalette from "../components/CommandPalette.jsx";
import Hero from "../components/Hero.jsx";
import Manifesto from "../components/Manifesto.jsx";
import Stats from "../components/Stats.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Work from "../components/Work.jsx";
import Chronology from "../components/Chronology.jsx";
import Gallery from "../components/Gallery.jsx";
import Credentials from "../components/Credentials.jsx";
import Writing from "../components/Writing.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

function Hatch() {
  return (
    <div className="mx-auto max-w-container px-5 sm:px-8 lg:px-[72px]">
      <div className="hatch" aria-hidden="true" />
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Preloader />
      <Constellation />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <CommandPalette />
      <main id="top" className="relative z-10">
        {/* 2 · Hero */}
        <Hero />
        {/* 3 · Transition manifesto */}
        <Manifesto />
        <Stats />
        {/* 4 · About (01) */}
        <About />
        <Hatch />
        {/* 5 · Skills & tech stack */}
        <Skills />
        {/* 6 · Selected work (02) */}
        <Work />
        {/* 7 · Experience & education (03 / chronology) */}
        <Chronology />
        <Hatch />
        {/* extras — gallery & credentials archive */}
        <Gallery />
        <Hatch />
        <Credentials />
        <Hatch />
        <Writing />
        {/* 8 · Contact (04) */}
        <Contact />
      </main>
      {/* 9 · Footer */}
      <Footer />
    </>
  );
}
