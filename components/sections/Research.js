import { research } from "@/config/research";
import Reveal from "../Reveal";
import Label from "../Label";
import Italic from "../Italic";
import SwarmArena from "../SwarmArena";
import { Arrow } from "../Icons";

export default function Research() {
  const r = research;
  return (
    <section id="research" className="bg-deep">
      <div className="mx-auto max-w-7xl px-5 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <Label index="04">Research</Label>
          <h2 className="mt-6 max-w-3xl font-display text-[1.7rem] font-normal leading-[1.2] text-text md:text-[2.5rem]">
            <Italic text={r.heading} />
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.75] text-muted">{r.lead}</p>
        </Reveal>
      </div>

      {/* the arena runs the full width of the page */}
      <div className="mt-12 border-y border-line [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]">
        <SwarmArena />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-[11px] tracking-wide text-muted">
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <svg width="26" height="4" aria-hidden><line x1="0" y1="2" x2="26" y2="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" /></svg>
              Target assignment
            </span>
            <span className="inline-flex items-center gap-2 text-rose">
              <svg width="26" height="4" aria-hidden><line x1="0" y1="2" x2="26" y2="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" /></svg>
              Conflict edge
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-gold">α</span> Priority weight
            </span>
          </p>
          <p className="italic">{r.caption}</p>
        </div>

        <Reveal className="mt-16 md:mt-20">
          <p className="max-w-3xl font-display text-xl italic leading-snug text-text/90 md:text-2xl">{r.title}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sage">{r.status}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {r.columns.map((c, i) => (
            <Reveal key={c.label} delay={i * 80} className="border-t border-line pt-5">
              <p className="flex gap-3 text-[11px] uppercase tracking-[0.24em] text-gold">
                <span>0{i + 1}</span>
                <span>{c.label}</span>
              </p>
              <p className="mt-4 text-[15px] leading-[1.75] text-muted">{c.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <dl className="flex flex-wrap gap-x-14 gap-y-6">
            {r.metrics.map((m) => (
              <div key={m.label}>
                <dd className="text-3xl font-light tracking-tight text-text tabular-nums md:text-4xl">{m.value}</dd>
                <dt className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{m.label}</dt>
              </div>
            ))}
          </dl>
          {r.href && (
            <a href={r.href} className="mt-10 inline-flex items-center gap-2 text-sm text-rose">
              Read the paper <Arrow width={16} height={16} />
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
