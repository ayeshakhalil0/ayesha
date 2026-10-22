import { hero, stats } from "@/config/site";
import HeroImage from "../HeroImage";
import Italic from "../Italic";
import { Arrow } from "../Icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="theme-dark relative overflow-hidden"
      // dark hero that dissolves into whatever the page background is (dark or light theme)
      style={{ background: "linear-gradient(to bottom, #0d1117 calc(100% - 64px), transparent)" }}
    >
      {/* Image: stacked on mobile, right-aligned and faded on desktop */}
      <div className="hero-fade relative aspect-[1586/992] w-full lg:absolute lg:right-0 lg:top-0 lg:w-[80%]">
        <HeroImage />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col px-5 pb-24 pt-6 md:px-10 lg:min-h-[calc(80vw*992/1586)] lg:justify-center lg:pb-28 lg:pt-28">
        <div className="max-w-xl">
          <p className="mb-6 flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.26em] text-muted">
            {hero.eyebrow.map((item, i) => (
              <span key={item}>
                {i > 0 && <span className="mr-3 text-gold">·</span>}
                {item}
              </span>
            ))}
          </p>

          <h1 className="font-display text-[2.2rem] font-normal leading-[1.12] text-text sm:text-5xl lg:text-[3.6rem]">
            <Italic text={hero.headline} />
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-muted">{hero.intro}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-medium text-[#1a1014] transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta.label} <Arrow width={16} height={16} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm text-text transition-colors hover:border-text"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <dl className="mt-14 grid max-w-xl grid-cols-2 gap-y-8 sm:grid-cols-4 lg:mt-20">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-line pl-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-light tracking-tight text-text tabular-nums sm:text-[2rem]">{s.value}</dd>
              <p className="mt-1.5 text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>

      <p className="absolute bottom-8 right-10 z-10 hidden font-script text-3xl text-text/90 [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] [[data-theme=light]_&]:text-[#3a2a30] [[data-theme=light]_&]:[text-shadow:none] lg:block">
        {hero.tagline}
      </p>
    </section>
  );
}
