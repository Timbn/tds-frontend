// App.jsx 
// Author: Scott Bartlett
// Company: Timbernlight
// Created: 2025-06-04
// Version: 2.2
// Description: Full layout preserved. Adds ZipDataPanel_v1_0 to show ZIP-level info based on zip_index_light.json.

import React, { useState } from "react";
import DemoRegionMap from "./components/DemoRegionMap";
import ImageCarousel from "./components/ImageCarousel";
import DatasetToggleBar from "./components/DatasetToggleBar";
import TypewriterText from "./components/TypewriterText";
import ZipDataPanel from "./components/ZipDataPanel_v1_0";
import { getZipMetadata, getCountyName } from "./components/zip_lookup_util";
import 'leaflet/dist/leaflet.css';

export default function App() {
  const [targetZip, setTargetZip] = useState(null);
  const [zipMetadata, setZipMetadata] = useState(null);

  const handleZipSubmit = async (zip) => {
    console.log("Received ZIP from DatasetToggleBar:", zip);
    setTargetZip(zip);
    try {
      const metadata = await getZipMetadata(zip);
      setZipMetadata(metadata);
    } catch (error) {
      console.error("Error loading ZIP metadata:", error);
      setZipMetadata(null);
    }
  };

  return (
    <div className="min-h-screen bg-signal-black text-gray-300 flex flex-col">
      {/* Top Navigation */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-signal-cyan via-signal-slate to-signal-black">
        <h1 className="text-lg font-bold text-white">Timbernlight</h1>
        <nav className="flex space-x-4 text-sm text-white">
          <a href="#features" className="hover:text-signal-cyan">Features</a>
          <a href="#pricing" className="hover:text-signal-cyan">Pricing</a>
          <a href="#contact" className="hover:text-signal-cyan">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[100vh] text-center px-6 py-24 overflow-hidden">
        <img
          src="/logo.png"
          alt="Timbernlight Watermark"
          className="absolute opacity-20 w-[900px] mx-auto inset-0 m-auto pointer-events-none filter grayscale"
        />
        <div className="relative z-10 mb-4">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="absolute w-48 h-48 rounded-full border-4 border-cyan-400 animate-ping opacity-20" style={{ animationDuration: "2.5s" }}></span>
            <span className="absolute w-32 h-32 rounded-full border-2 border-cyan-300 animate-ping opacity-30 delay-200" style={{ animationDuration: "3.5s" }}></span>
            <span className="absolute w-24 h-24 rounded-full border border-cyan-200 animate-ping opacity-40 delay-400" style={{ animationDuration: "4.5s" }}></span>
          </div>
        </div>
        <div className="relative z-10 mb-6">
          <TypewriterText />
        </div>
        <button className="bg-signal-cyan hover:bg-cyan-300 text-black font-semibold py-2 px-6 rounded shadow relative z-10">
          See ZIP-level truth
        </button>
      </section>

      {/* Image Carousel Section */}
      <section className="bg-signal-black py-12">
        <ImageCarousel />
      </section>

      {/* Proof of Work Section */}
      <section id="features" className="px-6 py-20 bg-signal-black text-white text-center">
        <h3 className="text-2xl font-bold mb-6">Proof of Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-signal-slate p-6 rounded-lg shadow">
            <p className="text-sm">Scroll-reveal: PG&E ZIP Graphs</p>
          </div>
          <div className="bg-signal-slate p-6 rounded-lg shadow">
            <p className="text-sm">“95135 lost 30% of its power. Where did it go?”</p>
          </div>
          <div className="bg-signal-slate p-6 rounded-lg shadow">
            <p className="text-sm">Multiple graphs visible on scroll</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-signal-slate text-white text-center">
        <h3 className="text-2xl font-bold mb-6">How It Works</h3>
        <p className="text-sm text-gray-300 mb-4">Raw → Cleaned → Audit Log → Insight</p>
        <p className="text-sm text-gray-300">YAML visual for credibility</p>
      </section>

      {/* Demo Region Section */}
      <section className="py-12 px-6 bg-signal-black text-white">
        <h3 className="text-2xl font-bold text-center mb-4">
          Explore California Energy Regions
        </h3>
        <p className="text-center text-gray-300 mb-6">
          Select a data source and region below to load real-time ZIP-level overlays.
          <br />
          <span className="text-xs italic text-gray-400">
            PG&E – Available | EIA 860, EIA 923, State, County, Utility Rates – Coming Soon
          </span>
        </p>
        <div className="max-w-6xl mx-auto">
          <DatasetToggleBar onZipSubmit={handleZipSubmit} />
          <DemoRegionMap selectedZip={targetZip} />
          <ZipDataPanel zip={targetZip} zipIOUMap={zipMetadata} getCountyName={getCountyName} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 bg-signal-slate text-white text-center">
        <h3 className="text-2xl font-bold mb-6">Simple Pricing, Elite Results</h3>
        <p className="text-gray-400 mb-6">Download what they don’t want you to see.</p>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-signal-black p-6 rounded-lg shadow w-72">
            <h4 className="text-lg font-bold text-signal-cyan mb-2">Casual</h4>
            <span className="text-2xl font-bold text-white">$29</span>
          </div>
          <div className="bg-signal-black p-6 rounded-lg shadow w-72">
            <h4 className="text-lg font-bold text-signal-cyan mb-2">Analyst</h4>
            <span className="text-2xl font-bold text-white">$99</span>
          </div>
          <div className="bg-signal-black p-6 rounded-lg shadow w-72">
            <h4 className="text-lg font-bold text-signal-cyan mb-2">Elite</h4>
            <span className="text-2xl font-bold text-white">$249</span>
          </div>
        </div>
      </section>

      {/* About / Trust Section */}
      <section id="contact" className="px-6 py-20 bg-signal-black text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Trust Timbernlight</h3>
        <blockquote className="italic text-gray-400 mb-4">“Every file is hashed. Every transform is logged.”</blockquote>
        <p className="text-signal-cyan font-semibold">contact@timbernlight.com</p>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Timbernlight. Engineered in California. Built on Signal.
      </footer>
    </div>
  );
}
