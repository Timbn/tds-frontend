// TypewriterText.jsx
import React, { useState, useEffect } from "react";

const phrases = [
  "Data that can't be denied.",
  "Structured. Trusted. Elite.",
  "ZIP-level truth."
];

export default function TypewriterText() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => prev + phrases[phraseIndex][charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 80);

    if (charIndex === phrases[phraseIndex].length) {
      clearInterval(interval);
      setTimeout(() => {
        setText("");
        setCharIndex(0);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [charIndex, phraseIndex]);

  return <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative z-10">{text}|</h2>;
}
