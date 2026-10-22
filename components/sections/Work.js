import { projects, workCta, workInitialCount } from "@/config/projects";
import Reveal from "../Reveal";
import Label from "../Label";
import ShowMore from "../ShowMore";
import { Arrow } from "../Icons";

// accent -> tile colours (all mixed from the site tokens)
const TONES = {
  sage: { bg: "var(--green-deep)", fg: "var(--green-soft)", line: "color-mix(in srgb, var(--green-soft) 28%, transparent)" },
  rose: { bg: "color-mix(in srgb, var(--rose) 9%, var(--surface))", fg: "var(--rose)", line: "color-mix(in srgb, var(--rose) 28%, transparent)" },
  gold: { bg: "color-mix(in srgb, var(--gold) 9%, var(--surface))", fg: "var(--gold)", line: "color-mix(in srgb, var(--gold) 28%, transparent)" },
};

const ACCENTS = ["sage", "rose", "gold"];

// Every group of projects fills its rows exactly, so there are never gaps.
// s = typographic size: "big" | "mid" | "small"
const GROUPS = {
  1: [{ c: "lg:col-span-12", h: "min-h-[11rem]", s: "mid" }],
  2: [
    { c: "lg:col-span-7", h: "min-h-[12rem]", s: "mid" },
    { c: "lg:col-span-5", h: "min-h-[12rem]", s: "small" },
  ],
  3: [
    { c: "lg:col-span-7 lg:row-span-2", h: "min-h-[9.5rem] lg:min-h-[20rem]", s: "big" },
    { c: "lg:col-span-5", h: "min-h-[9.5rem]", s: "small" },
    { c: "lg:col-span-5", h: "min-h-[9.5rem]", s: "small" },
  ],
  4: [
    { c: "lg:col-span-7", h: "min-h-[11rem]", s: "mid" },
    { c: "lg:col-span-5", h: "min-h-[11rem]", s: "small" },
    { c: "lg:col-span-5", h: "min-h-[11rem]", s: "small" },
    { c: "lg:col-span-7", h: "min-h-[11rem]", s: "mid" },
  ],
  5: [
    { c: "lg:col-span-7 lg:row-span-2", h: "min-h-[9.5rem] lg:min-h-[20rem]", s: "big" },
    { c: "lg:col-span-5", h: "min-h-[9.5rem]", s: "small" },
    { c: "lg:col-span-5", h: "min-h-[9.5rem]", s: "small" },
    { c: "lg:col-span-4", h: "min-h-[10rem]", s: "small" },
    { c: "lg:col-span-8", h: "min-h-[10rem]", s: "mid" },
  ],
};

// 5 per group, but never leave a lone project behind (6 -> 4 + 2, 11 -> 5 + 4 + 2)
function groupSizes(n) {
  const sizes = [];
  for (let r = n; r > 0; ) {
    const s = r <= 5 ? r : r - 5 === 1 ? 4 : 5;
    sizes.push(s);
    r -= s;
  }
  return sizes;
}

const sizes = groupSizes(projects.length);
const PLAN = sizes.flatMap((size) => GROUPS[size].map((v, k) => ({ ...v, k })));

// reveal whole groups first, so the first view is always a finished grid
let shown = 0;
for (const size of sizes) {
  if (shown && shown + size > workInitialCount) break;
  shown += size;
}

// one small eight-point star, faded out from the top-right corner
function Star({ color }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(circle_at_100%_0%,#000,transparent_62%)]" style={{ color }}>
      <defs>
        <pattern id="star" width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.28">
            <rect x="16" y="16" width="32" height="32" />
            <rect x="16" y="16" width="32" height="32" transform="rotate(45 32 32)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#star)" />
    </svg>
  );
}

function Tile({ p, i, v }) {
  const t = TONES[p.accent ?? ACCENTS[i % 3]];
  const big = v.s === "big";
  const mid = v.s === "mid";
  const Tag = p.href ? "a" : "div";
  return (
    <Tag
      {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-5 transition-transform duration-500 hover:-translate-y-1 md:p-7 ${v.h}`}
      style={{ background: t.bg, borderColor: t.line }}
    >
      {v.k === 0 && <Star color={t.fg} />}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-4 select-none font-display text-[6rem] leading-none text-text/[0.04] md:text-[8rem]"
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-start justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.22em]" style={{ color: t.fg }}>
          {String(i + 1).padStart(2, "0")} <span className="mx-2 opacity-50">/</span> {p.kind}
        </p>
        {p.badge ? (
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-text" style={{ background: t.line }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-70 motion-safe:animate-ping" style={{ background: t.fg }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: t.fg }} />
            </span>
            {p.badge}
          </span>
        ) : (
          p.href && (
            <span className="grid h-10 w-10 place-items-center rounded-full border transition-colors group-hover:bg-text group-hover:text-bg" style={{ borderColor: t.line }}>
              <Arrow className="-rotate-45" width={18} height={18} />
            </span>
          )
        )}
      </div>

      <div className="relative mt-6">
        <h3 className={`font-display font-normal leading-[1.05] text-text ${big ? "text-3xl md:text-4xl" : mid ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
          {p.title}
        </h3>
        <p className={`mt-3 max-w-md leading-relaxed text-muted ${big || mid ? "text-[15px]" : "text-sm"}`}>{p.description}</p>
        <p className="mt-4 text-xs tracking-wide" style={{ color: t.fg }}>
          {p.tags.join("  ·  ")}
        </p>
      </div>
    </Tag>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mb-10 md:mb-12">
        <Label index="03">Selected work</Label>
        <h2 className="mt-6 max-w-2xl font-display text-[1.7rem] font-normal leading-[1.2] text-text md:text-[2.5rem]">
          Projects that solve <em className="text-rose">real problems.</em>
        </h2>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-12">
        <ShowMore initial={shown}>
          {projects.map((p, i) => (
            <Reveal key={`${p.title}-${i}`} delay={(i % 5) * 80} className={`flex ${PLAN[i].c}`}>
              <div className="flex w-full [&>*]:w-full">
                <Tile p={p} i={i} v={PLAN[i]} />
              </div>
            </Reveal>
          ))}
        </ShowMore>

        <Reveal delay={240} className="lg:col-span-12">
          <a
            href={workCta.href}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-line px-6 py-4 transition-colors hover:border-rose/50 md:px-7"
          >
            <span className="font-display text-lg text-text md:text-xl">{workCta.text}</span>
            <span className="inline-flex items-center gap-2 text-sm text-rose">
              {workCta.label} <Arrow width={16} height={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
