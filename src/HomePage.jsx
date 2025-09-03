// HomePage.jsx
import React from "react";
import TypewriterText from "./components/TypewriterText";
import ImageCarousel from "./components/ImageCarousel";

export default function HomePage() {
  return (
    <div className="text-white bg-signal-black min-h-screen flex flex-col">
      <section className="relative flex flex-col items-center justify-center min-h-[100vh] text-center px-6 py-24 overflow-hidden">
        <img
          src="/logo.png"
          alt="Timbernlight Watermark"
          className="absolute opacity-10 w-[900px] mx-auto inset-0 m-auto pointer-events-none filter grayscale blur-sm"
        />
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">
          Data that can't be denied.
        </h2>
        <div className="relative z-10">
          <TypewriterText />
        </div>
        <button className="mt-6 bg-signal-cyan hover:bg-cyan-300 text-black font-semibold py-2 px-6 rounded shadow relative z-10">
          See ZIP-level truth
        </button>
      </section>

      <section className="bg-signal-black py-12">
        <ImageCarousel />
      </section>
    </div>
  );
}
