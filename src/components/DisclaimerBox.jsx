import React, { useState } from "react";

export default function DisclaimerBox() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-4 text-sm text-gray-800">
      <div className="flex justify-between items-center">
        <span className="font-bold text-yellow-800">
          ⚠️ ZIP-Level Data Aggregation Notice
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-yellow-700 underline text-xs"
        >
          {expanded ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {expanded && (
        <div className="mt-3 space-y-2">
          <p>
            PG&E usage data is released under California Public Utilities
            Commission <strong>Decision 14-05-016</strong>. ZIP-level reports follow strict aggregation rules:
          </p>
          <ul className="list-disc ml-5">
            <li>Residential: at least <strong>100 customers</strong></li>
            <li>
              Non-residential (commercial, industrial, agricultural): at least{" "}
              <strong>15 customers</strong> and no single customer using more
              than <strong>15%</strong> of the total
            </li>
          </ul>
          <p>
            If these rules are not met, PG&E <em>combines</em> the usage data
            with a neighboring ZIP code. This may result in:
          </p>
          <ul className="list-disc ml-5">
            <li>Missing ZIP codes</li>
            <li>Inflated totals in nearby ZIPs</li>
            <li>Inaccurate ZIP-level energy trends</li>
          </ul>
          <p>
            Timbernlight does not modify this logic but flags possible
            reallocations for premium users. See each ZIP's Provenance section
            for audit details.
          </p>
        </div>
      )}
    </div>
  );
}
