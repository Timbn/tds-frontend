// ZipSearchBar.jsx v2.0
// Author: Scott Bartlett
// Company: Timbernlight
// Updated: 2025-07-10
// Description: Unified IOU + ZIP dropdown search bar with callback to main app.

import React, { useEffect, useState } from "react";

export default function ZipSearchBar({ onZipSearch }) {
  const [iouZipMap, setIouZipMap] = useState({});
  const [selectedIOU, setSelectedIOU] = useState("");
  const [selectedZIP, setSelectedZIP] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/api/zip-index")
      .then((res) => res.json())
      .then((data) => setIouZipMap(data))
      .catch((err) => console.error("Failed to load ZIP index:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIOU) {
      setError("Please select a utility provider.");
      return;
    }
    if (!selectedZIP) {
      setError("Please select a ZIP code.");
      return;
    }
    setError("");
    onZipSearch({ zip: selectedZIP, iou: selectedIOU });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-4 left-4 z-[1000] bg-black bg-opacity-60 p-3 rounded-lg shadow flex space-x-2 items-center"
    >
      <select
        value={selectedIOU}
        onChange={(e) => {
          setSelectedIOU(e.target.value);
          setSelectedZIP("");
          setError("");
        }}
        className="px-2 py-1 bg-gray-800 text-white rounded"
      >
        <option value="">Select IOU</option>
        {Object.keys(iouZipMap).map((iou) => (
          <option key={iou} value={iou}>{iou}</option>
        ))}
      </select>

      <select
        value={selectedZIP}
        onChange={(e) => {
          setSelectedZIP(e.target.value);
          setError("");
        }}
        className="px-2 py-1 bg-gray-800 text-white rounded"
        disabled={!selectedIOU}
      >
        <option value="">Select ZIP</option>
        {(iouZipMap[selectedIOU] || []).map((zip) => (
          <option key={zip} value={zip}>{zip}</option>
        ))}
      </select>

      <button
        type="submit"
        className="px-3 py-1 bg-signal-cyan text-black font-semibold rounded hover:bg-cyan-300"
      >
        Go
      </button>

      {error && (
        <div className="text-red-400 text-xs pl-2">⚠️ {error}</div>
      )}
    </form>
  );
}
