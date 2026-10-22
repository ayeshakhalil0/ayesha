import { teaching } from "@/config/teaching";
import Reveal from "../Reveal";
import Label from "../Label";
import Italic from "../Italic";
import { Arrow } from "../Icons";

export default function Teaching() {
  const t = teaching;
  return (
    <section id="teaching" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <Label index="05">Teaching</Label>
          <h2 className="mt-6 font-display text-[1.7rem] font-normal leading-[1.2] text-text md:text-[2.5rem]">
            <Italic text={t.heading} />
          </h2>

          <div className="mt-7 max-w-lg space-y-4 text-base leading-[1.75] text-muted">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 flex gap-10 border-t border-line pt-6">
            {t.facts.map((f) => (
              <div key={f.label}>
                <dd className="font-display text-3xl text-text">{f.value}</dd>
                <dt className="mt-1 text-xs text-muted">{f.label}</dt>
              </div>
            ))}
          </dl>

          {t.platform.href && (
            <a
              href={t.platform.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-medium text-[#1a1014] transition-transform hover:-translate-y-0.5"
            >
              {t.platform.label} <Arrow width={16} height={16} />
            </a>
          )}
        </Reveal>

        <ol>
          {t.points.map((pt, i) => (
            <Reveal as="li" key={pt.title} delay={i * 80} className="group border-t border-line py-8 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-8">
              <div className="flex gap-6 transition-transform duration-500 group-hover:translate-x-1.5">
                <span className="font-display text-lg italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-text transition-colors group-hover:text-rose md:text-3xl">
                    {pt.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{pt.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
