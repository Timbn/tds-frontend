// DataMapPage.jsx
// Author: Scott Bartlett
// Company: Timbernlight
// Created: 2025-07-21
// Version: 1.0
// Description: Main container for data map view. Controls dataset, state, view toggle, and ZIP search input. Passes parameters to SmartMap for rendering.

import React, { useState } from "react";
import DatasetToggleBar from "./DatasetToggleBar";
import SmartMap from "./SmartMap";

const datasetLabelMap = {
  pge: "PG&E Electric",
  eia923: "EIA 923 – Generation",
  eia860: "EIA 860 – Capacity",
  rates: "Utility Rates",
};

const viewLabelMap = {
  zip: "ZIP View",
  county: "County View",
  plant: "Plant View",
};

export default function DataMapPage() {
  const [dataset, setDataset] = useState("pge");
  const [stateCode, setStateCode] = useState("CA");
  const [view, setView] = useState("zip");
  const [selectedZip, setSelectedZip] = useState(null);

  const handleZipSubmit = (zip) => {
    setSelectedZip(zip);
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <DatasetToggleBar
        dataset={dataset}
        onChange={setDataset}
        view={view}
        onViewChange={setView}
        stateCode={stateCode}
        onStateChange={setStateCode}
        onZipSubmit={handleZipSubmit}
      />

      <div className="text-center mt-2 mb-2">
        <h3 className="text-2xl font-bold text-white mb-1">
          {datasetLabelMap[dataset]} – {stateCode} {viewLabelMap[view]}
        </h3>
        <p className="text-gray-400 text-sm">
          Real-time map with interactive overlays
        </p>
      </div>

      <SmartMap
        dataset={dataset}
        stateCode={stateCode}
        view={view}
        selectedZip={selectedZip}
      />
    </div>
  );
}
