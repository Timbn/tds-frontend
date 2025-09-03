// DemoRegionMap_v2_8_16.jsx
// Author: Scott Bartlett
// Company: Timbernlight
// Updated: 2025-07-22
// Version: 2.8.16
// Description: Removes visible debug logs from production. Retains error messages only.

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DEBUG = false;

let activeTooltipLayer = null;
let pinnedTooltipLayer = null;

const regionColors = [
  "#8dd3c7", "#ffffb3", "#bebada", "#fb8072",
  "#80b1d3", "#fdb462", "#b3de69", "#fccde5",
  "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"
];

const getRegionColor = (() => {
  const cache = {};
  let index = 0;
  return (regionKey) => {
    if (!cache[regionKey]) {
      cache[regionKey] = regionColors[index % regionColors.length];
      index++;
    }
    return cache[regionKey];
  };
})();

export default function DemoRegionMap({ selectedZip }) {
  const mapRef = useRef();
  const geoJsonRef = useRef();
  const [mapReady, setMapReady] = useState(false);
  const [highlightedZip, setHighlightedZip] = useState(null);
  const [zipGeoJson, setZipGeoJson] = useState(null);
  const [zipCountyMap, setZipCountyMap] = useState(null);
  const [zipIOUMap, setZipIOUMap] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    fetch("/assets/county_zip_colormap_TDS_V7_0.json")
      .then((res) => {
        if (!res.ok) throw new Error("County ZIP map failed to load");
        return res.json();
      })
      .then(setZipCountyMap)
      .catch((err) => {
        console.error("❌ Failed to load county ZIP map:", err);
        setLoadError("Failed to load county ZIP map.");
      });

    fetch("/assets/zip_index_light.json")
      .then((res) => {
        if (!res.ok) throw new Error("ZIP index failed to load");
        return res.json();
      })
      .then((data) => {
        const map = {};
        for (const z of data.ZipIndex || []) map[String(z.ZipCode)] = z;
        setZipIOUMap(map);
      })
      .catch((err) => {
        console.error("❌ Failed to load ZIP index:", err);
        setLoadError("Failed to load ZIP index data.");
      });
  }, []);

  useEffect(() => {
    fetch("/assets/ca_california_zip_codes_geo.min.json")
      .then((res) => {
        if (!res.ok) throw new Error("GeoJSON failed to load");
        return res.json();
      })
      .then(setZipGeoJson)
      .catch((err) => {
        console.error("❌ Failed to load ZIP geojson:", err);
        setLoadError("Failed to load ZIP boundaries (GeoJSON).");
      });
  }, []);

  const getCountyName = (zip) => {
    const zipStr = String(zip);
    for (const county in zipCountyMap) {
      if (zipCountyMap[county]?.includes(zipStr)) return county;
    }
    return "N/A";
  };

  const getIOUInfo = (zip) => zipIOUMap[String(zip)] || null;

  const getRegionKey = (zip) => {
    const zipStr = String(zip);
    const county = getCountyName(zipStr);
    return county !== "N/A" ? county : getIOUInfo(zipStr)?.ZipCode || "N/A";
  };

  const formatIOUTooltip = (iouInfo) => {
    if (!iouInfo) return "Data unavailable";
    let result = "";
    for (const fuelType of ["Electric", "Gas"]) {
      const entries = iouInfo[fuelType];
      if (entries?.length) {
        result += `<strong>${fuelType}:</strong><br/>`;
        for (const e of entries) {
          result += `&nbsp;&nbsp;IOU: ${e.IOU}<br/>`;
          result += `&nbsp;&nbsp;Classes: ${e.CustomerClasses.join(", ")}<br/>`;
          result += `&nbsp;&nbsp;Years: ${e.YearsCovered.join(", ")}<br/><br/>`;
        }
      }
    }
    return result || "Data unavailable";
  };

  const onEachFeature = (feature, layer) => {
    const zip = String(feature.properties.ZCTA5CE10);
    const county = getCountyName(zip);
    const iouInfo = getIOUInfo(zip);
    const content = `ZIP: ${zip}<br/>County: ${county}<br/>${formatIOUTooltip(iouInfo)}`;

    layer.on({
      mouseover: function () {
        if (!pinnedTooltipLayer) {
          if (activeTooltipLayer) {
            activeTooltipLayer.unbindTooltip();
            activeTooltipLayer = null;
          }
          layer.bindTooltip(content, {
            sticky: true,
            direction: "top",
            opacity: 0.9,
            offset: [0, -10],
            className: "leaflet-tooltip"
          }).openTooltip();
          activeTooltipLayer = layer;
        }
      },
      mouseout: function () {
        if (!pinnedTooltipLayer && activeTooltipLayer) {
          activeTooltipLayer.unbindTooltip();
          activeTooltipLayer = null;
        }
      },
      click: function () {
        if (pinnedTooltipLayer === layer) {
          layer.unbindTooltip();
          pinnedTooltipLayer = null;
        } else {
          if (pinnedTooltipLayer) pinnedTooltipLayer.unbindTooltip();
          pinnedTooltipLayer = layer;
          layer.bindTooltip(content, {
            sticky: true,
            direction: "top",
            opacity: 0.95,
            offset: [0, -10],
            className: "leaflet-tooltip pinned"
          }).openTooltip();
        }
      }
    });
  };

  const styleZip = (feature) => {
    const zip = String(feature.properties.ZCTA5CE10);
    const color = zipIOUMap?.[zip] ? getRegionColor(getRegionKey(zip)) : "#ccc";
    return {
      color: "#000",
      weight: 1,
      fillColor: zip === highlightedZip ? "yellow" : color,
      fillOpacity: 0.6
    };
  };

  useEffect(() => {
    const zipStr = String(selectedZip).padStart(5, "0");
    if (!mapReady || !selectedZip || !zipGeoJson || !geoJsonRef.current) return;

    const layerRef = geoJsonRef.current;
    let tries = 0;

    const waitForLayers = () => {
      const layers = layerRef.getLayers?.() || [];
      if (layers.length === 0) {
        if (tries++ < 10) {
          if (DEBUG) console.log(`⏳ Waiting for layers... (${tries})`);
          setTimeout(waitForLayers, 200);
        } else {
          if (DEBUG) console.warn("❌ ZIP search failed: layers never hydrated");
        }
        return;
      }

      let found = false;
      layerRef.eachLayer((layer) => {
        const props = layer.feature?.properties;
        if (String(props?.ZCTA5CE10) === zipStr) {
          if (DEBUG) console.log("✅ ZIP located:", zipStr);
          const bounds = layer.getBounds();
          mapRef.current?.fitBounds(bounds, { padding: [20, 20] });
          setHighlightedZip(zipStr);
          found = true;
        }
      });

      if (!found && DEBUG) {
        console.warn("❌ ZIP not found in active map layers:", zipStr);
      }
    };

    waitForLayers();
  }, [mapReady, selectedZip, zipGeoJson]);

  if (loadError) {
    return (
      <div className="text-red-500 bg-black p-4 text-sm border border-red-500">
        ⚠️ {loadError}
      </div>
    );
  }

  if (!zipGeoJson || !zipCountyMap || !zipIOUMap) {
    return (
      <div className="text-white text-sm p-4">
        Loading ZIP map data...
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-100px)] w-full">
      <MapContainer
        center={[37.5, -119.5]}
        zoom={6}
        scrollWheelZoom={true}
        whenReady={(e) => {
          mapRef.current = e.target;
          setMapReady(true);
          if (DEBUG) console.log("🟢 Map ready");
        }}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          ref={geoJsonRef}
          key={highlightedZip}
          data={zipGeoJson}
          style={styleZip}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}
