// SmartMap.jsx
// Author: Scott Bartlett
// Company: Timbernlight
// Created: 2025-06-04
// Version: 1.2
// Description: Wraps map display and passes selected ZIP for targeting and zoom.

import React, { useEffect, useState } from "react";
import DemoRegionMap from "./DemoRegionMap";
import PGEAggregationNotice from "./PGEAggregationNotice";

export default function SmartMap({ dataset, stateCode, view, selectedZip }) {
  const supported = dataset === "pge" && stateCode === "CA" && view === "zip";

  useEffect(() => {
    console.log("📍 SmartMap received ZIP:", selectedZip);
  }, [selectedZip]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full h-[80vh] bg-signal-black rounded-xl shadow-md overflow-hidden">
        {supported ? (
          <DemoRegionMap selectedZip={selectedZip} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-xl font-semibold">
            🔒 {dataset.toUpperCase()} for {stateCode} [{view}] — Coming Soon
          </div>
        )}
      </div>

      {dataset === "pge" && stateCode === "CA" && view === "zip" && (
        <PGEAggregationNotice />
      )}
    </div>
  );
}
