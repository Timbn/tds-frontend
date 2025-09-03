/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "signal-black": "#0f0f0f",
        "signal-cyan": "#22d3ee",
        "signal-slate": "#1e293b",
        "signal-gold": "#facc15",
        "signal-error": "#ef4444",
        "signal-gray": "#e5e7eb",
      },
    },
  },
  plugins: [],
};
