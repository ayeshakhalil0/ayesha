"use client";

import { useEffect, useRef, useState } from "react";
import { manifesto } from "@/config/site";

// "plain *emphasis* plain" -> [{ word, em }]
function tokenize(text) {
  return text.split(/(\*[^*]+\*)/g).flatMap((part) => {
    const em = part.startsWith("*");
    return part
      .replace(/\*/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, em }));
  });
}

const words = tokenize(manifesto);

export default function Manifesto() {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      if (reduced) return setLit(words.length + 1);
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
      setLit(p * (words.length + 2));
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-28">
      <p ref={ref} className="font-display text-xl leading-[1.4] sm:text-2xl md:text-[2.1rem]">
        {words.map(({ word, em }, i) => (
          <span
            key={i}
            className={em ? "italic text-rose" : "text-text"}
            style={{ opacity: Math.min(1, Math.max(0.16, lit - i + 0.16)), transition: "opacity 0.25s" }}
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
