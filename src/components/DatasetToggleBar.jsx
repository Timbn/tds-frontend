// DatasetToggleBar.jsx
// Author: Scott Bartlett
// Company: Timbernlight
// Created: 2025-06-04
// Version: 1.3
// Description: Simplifies to ZIP-only input. IOU removed. All other buttons unchanged.

import React, { useState } from "react";

export default function DatasetToggleBar({ onZipSubmit }) {
  const [zipInput, setZipInput] = useState("");

  const dataButtons = [
    { label: "EIA 923", working: false },
    { label: "EIA 860", working: false },
    { label: "Utility Rates", working: false },
  ];

  const handleClick = (label, working) => {
    if (!working) {
      alert(`${label} – Coming Soon`);
    } else {
      console.log(`${label} activated`);
    }
  };

  const handleZipSubmit = () => {
    const cleaned = zipInput.trim();
    if (!/^\d{5}$/.test(cleaned)) {
      alert("ZIP not applicable");
    } else {
      onZipSubmit(cleaned); // Pass ZIP only
    }
    setZipInput("");
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 mb-6 relative">
      {dataButtons.map(({ label, working }) => (
        <div key={label} className="relative">
          <button
            onClick={() => handleClick(label, working)}
            className={`px-4 py-2 rounded text-sm font-semibold border border-signal-cyan bg-signal-slate text-white hover:bg-signal-cyan hover:text-black`}
          >
            {label}
          </button>
          {!working && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] px-1 rounded shadow">
              Coming Soon
            </span>
          )}
        </div>
      ))}

      {/* ZIP Input + Go Button */}
      <input
        type="text"
        placeholder="Enter ZIP"
        value={zipInput}
        onChange={(e) => setZipInput(e.target.value)}
        className="px-2 py-1 text-sm rounded border border-signal-cyan bg-signal-slate text-white placeholder-gray-400"
      />
      <button
        onClick={handleZipSubmit}
        className="px-3 py-1 text-sm font-semibold rounded bg-signal-cyan text-black hover:bg-cyan-300 border border-signal-cyan"
      >
        Go
      </button>

      {/* State Selector — intentionally disabled 
      <span className="mx-2 text-white text-sm">State:</span>
      <select className="bg-signal-slate text-white text-sm rounded px-2 py-1 border border-signal-cyan">
        <option>California</option>
      </select>
      */}
    </div>
  );
}
