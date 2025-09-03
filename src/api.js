// api.js
// Author: Scott Bartlett
// Company: Timbernlight
// Created: 2025-06-06
// Version: 1.1
// Description: Centralized API functions for calling FastAPI backend

/**
 * Fetch ZIP-level index grouped by IOU/fuel from backend
 * @returns {Promise<Object>} ZIP index object (e.g., { "pge_electric": ["95134", "94128"], ... })
 */
export async function fetchZipIndex() {
  const res = await fetch("/api/zip-index");
  if (!res.ok) {
    const msg = `Server error ${res.status}: ${res.statusText}`;
    throw new Error(msg);
  }
  return await res.json();
}

/**
 * Fetch data for a given ZIP code from legacy PG&E endpoint.
 * @param {string} zip - The ZIP code to query (e.g., "95134")
 * @returns {Promise<Object>} JSON object with ZIP data
 */
export async function fetchZipInfo(zip) {
  const res = await fetch(`/api/zip/${zip}`);
  if (!res.ok) {
    const msg = `Server error ${res.status}: ${res.statusText}`;
    throw new Error(msg);
  }
  return await res.json();
}

/**
 * Request multi-IOU ZIP insights by ZIP, IOU, and fuel type.
 * @param {string} zip - ZIP code (e.g., "95134")
 * @param {string} iou - Utility provider (e.g., "pge", "sce")
 * @param {string} fuel - Fuel type ("electric" or "gas")
 * @returns {Promise<Object>} JSON insight object
 */
export async function getZipInsights(zip, iou, fuel) {
  const payload = { zip, iou, fuel };

  const res = await fetch("/api/zip_insights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = `Failed to get ZIP insights: ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return await res.json();
}
