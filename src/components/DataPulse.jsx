// DataPulse.jsx
import React from "react";

export default function DataPulse() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="relative w-[300px] h-[300px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full border border-cyan-400 opacity-20 animate-ping"
            style={{
              animationDelay: `${i * 0.8}s`,
              animationDuration: "2.4s"
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
