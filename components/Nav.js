"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/config/site";
import { Arrow } from "./Icons";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "theme-dark border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#home" className="font-script text-4xl leading-none text-text">
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative text-[13px] tracking-wide transition-colors ${
                active === item.href ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {item.label}
              {active === item.href && (
                <span className="absolute -bottom-2 left-1/2 h-px w-4 -translate-x-1/2 bg-rose" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-line px-5 py-2 text-[13px] text-text transition-colors hover:border-rose hover:text-rose lg:inline-flex"
        >
          Let&apos;s connect <Arrow width={15} height={15} />
        </a>

        <button
          type="button"
          className="-mr-2 p-2 text-text lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-5 pb-6 pt-3 lg:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3.5 font-display text-2xl text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
