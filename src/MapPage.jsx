// MapPage.jsx v1.2
// Author: Scott Bartlett
// Company: Timbernlight
// Updated: 2025-07-09
// Description: Map page layout with IOU + ZIP search bar connected to DemoRegionMap

import React, { useState } from 'react';
import DemoRegionMap from './DemoRegionMap';
import IOUZipSearchBar from './components/IOUZipSearchBar';

const MapPage = () => {
  const [selectedTarget, setSelectedTarget] = useState({ zip: null, iou: 'PGE' });

  return (
    <div className="min-h-screen bg-signal-black text-gray-300 flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-signal-cyan via-signal-slate to-signal-black">
        <h1 className="text-lg font-bold text-white">Timbernlight</h1>
        <nav className="flex space-x-4 text-sm text-white">
          <a href="#features" className="hover:text-signal-cyan">Features</a>
          <a href="#pricing" className="hover:text-signal-cyan">Pricing</a>
          <a href="#contact" className="hover:text-signal-cyan">Contact</a>
        </nav>
      </header>

      {/* Search Bar */}
      <div className="p-4 bg-gray-900 border-b border-gray-700">
        <IOUZipSearchBar onZipSelect={setSelectedTarget} />
      </div>

      {/* Map Section */}
      <main className="flex-grow">
        <DemoRegionMap target={selectedTarget} />
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Timbernlight. Engineered in California. Built on Signal.
      </footer>
    </div>
  );
};

export default MapPage;
