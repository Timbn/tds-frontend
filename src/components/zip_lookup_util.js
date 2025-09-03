// zip_lookup_util.js
// Author: Scott Bartlett
// Company: Timbernlight
// Created: 2025-07-22
// Version: 1.0
// Description: Utility functions to load ZIP metadata from zip_index_light.json via fetch.

export async function fetchZipIndex() {
  const response = await fetch('/assets/zip_index_light.json');
  if (!response.ok) {
    throw new Error(`Failed to load ZIP index: ${response.statusText}`);
  }
  return await response.json();
}

export async function getCountyName(zip) {
  const zipIndex = await fetchZipIndex();
  const match = zipIndex.find(entry => entry.ZipCode === zip);
  return match ? match.County || 'N/A' : 'N/A';
}

export async function getZipMetadata(zip) {
  const zipIndex = await fetchZipIndex();
  return zipIndex.find(entry => entry.ZipCode === zip) || null;
}
