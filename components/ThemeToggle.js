"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";

// The inline script in layout.js sets data-theme before first paint; this just reads and flips it.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-text transition-colors hover:border-rose hover:text-rose"
    >
      {theme === "light" ? <Moon width={17} height={17} /> : <Sun width={17} height={17} />}
    </button>
  );
}
