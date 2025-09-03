// ZipDataPanel_v1_0.jsx
// Author: Scott Bartlett
// Company: Timbernlight
// Created: 2025-07-22
// Version: 1.0
// Description: Displays basic ZIP data using zip_index_light.json only.

import React from "react";

export default function ZipDataPanel({ zip, zipIOUMap, getCountyName }) {
  if (!zip || !zipIOUMap || !getCountyName) return null;

  const zipStr = String(zip);
  const county = getCountyName(zipStr);
  const iouInfo = zipIOUMap[zipStr];

  if (!iouInfo) {
    return (
      <div className="p-4 border rounded bg-white shadow text-sm">
        <p><strong>ZIP Code:</strong> {zipStr}</p>
        <p><strong>County:</strong> {county}</p>
        <p>⚠️ No data available for this ZIP.</p>
      </div>
    );
  }

  const renderFuelBlock = (fuelType) => {
    const entries = iouInfo[fuelType];
    if (!entries || !entries.length) return null;
    return (
      <div className="mt-2">
        <strong>{fuelType}</strong>
        {entries.map((e, idx) => (
          <div key={idx} className="ml-2">
            <div>IOU: {e.IOU}</div>
            <div>Classes: {e.CustomerClasses.join(", ")}</div>
            <div>Years: {e.YearsCovered.join(", ")}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 border rounded bg-white shadow text-sm w-full">
      <p><strong>ZIP Code:</strong> {zipStr}</p>
      <p><strong>County:</strong> {county}</p>
      {renderFuelBlock("Electric")}
      {renderFuelBlock("Gas")}
    </div>
  );
}
