# Timbernlight Frontend – Map Component Changelog
**File:** `DemoRegionMap.jsx`  
**Component:** California ZIP Map with Zoom + Tooltip

---

## v2.4 – 2025-06-05
- ✅ Added yellow highlight for the selected ZIP polygon after zoom.
- ✅ Highlight persists visually until a new ZIP is selected.
- 🔄 Triggered map style update after selection change using `setStyle`.
- 🔖 Git tag: `v2.4-demoregionmap`

---

## v2.3 – 2025-06-05
- 🔧 Replaced `whenCreated` with `ref` callback for `MapContainer` to ensure `mapRef` initializes reliably.
- 🟢 Added `console.log("🟢 Map is ready (ref)")` when the map is fully mounted.
- 🧪 Solved root cause of zoom never firing.

---

## v2.2 – 2025-06-05
- 🧠 Introduced `mapReady` state to defer zoom logic until map is mounted.
- ✅ Ensured `targetZip` doesn’t trigger premature zoom calls.
- 📌 Improved conditional flow for zoom behavior.

---

## v2.1 – 2025-06-05
- 🐞 Added console logging at every conditional gate of the `useEffect`.
- ✅ Diagnosed failure cause as `mapRef` being null at zoom time.

---

## v2.0 – 2025-06-05
- ✅ Refactored map zoom logic using `fitBounds` and string comparisons.
- ✅ Ensured zoom executes only after full GeoJSON layer load.
- 📍 Set up full `useEffect` for `targetZip` tracking.
