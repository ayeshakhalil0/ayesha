"use client";

import { useEffect, useState } from "react";
import { formatDuration } from "@/lib/duration";

// Finished roles render straight away; running roles wait for the browser clock.
export default function Duration({ start, end }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    if (end) return;
    const raf = requestAnimationFrame(() => {
      const d = new Date();
      setNow(d.getFullYear() * 12 + d.getMonth());
    });
    return () => cancelAnimationFrame(raf);
  }, [end]);

  if (!end && now === null) return null;
  return <>{formatDuration(start, end, now)}</>;
}
