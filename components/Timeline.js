"use client";

import { useEffect, useRef, useState } from "react";

// A vertical rule that fills with rose as the reader scrolls down the list.
export default function Timeline({ children }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const update = () => {
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height)));
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="relative ml-2 pl-8 md:pl-12">
      <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line" />
      <span aria-hidden className="absolute left-0 top-0 w-px bg-rose" style={{ height: `${p * 100}%` }} />
      {children}
    </div>
  );
}
