// PGEAggregationNotice.jsx
import React from "react";

export default function PGEAggregationNotice() {
  return (
    <div className="bg-signal-slate text-white p-4 rounded-xl mt-6 shadow-lg max-w-3xl mx-auto">
      <details className="text-sm">
        <summary className="cursor-pointer font-semibold text-signal-cyan">
          ℹ️ How PG&E Aggregates ZIP-Level Data
        </summary>
        <div className="mt-3 space-y-2 text-gray-300">
          <p>
            PG&E provides gas and electric usage data by ZIP code in accordance with the California Public Utilities Commission Decision <strong>14-05-016</strong>. To protect customer privacy:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Residential usage is only shown for ZIPs with <strong>at least 100 customers</strong>.</li>
            <li>Non-residential usage (commercial, industrial, ag) is shown if there are <strong>at least 15 customers</strong> and no one customer accounts for more than <strong>15%</strong> of the total consumption.</li>
            <li>If these conditions aren't met, the data is <strong>combined with a neighboring ZIP</strong>.</li>
          </ul>
          <p>
            Timbernlight does not alter PG&E’s aggregation. We analyze the data as provided and flag any anomalies for investigation.
          </p>
        </div>
      </details>
    </div>
  );
}
