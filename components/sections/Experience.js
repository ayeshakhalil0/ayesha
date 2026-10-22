import { experience, experienceIntro } from "@/config/experience";
import Reveal from "../Reveal";
import Label from "../Label";
import Duration from "../Duration";
import Timeline from "../Timeline";

const sinceYear = Math.min(...experience.map((j) => Number(j.start.split(" ")[1])));
const current = experience.filter((j) => j.end === null);

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Label index="02">Experience</Label>
            <h2 className="mt-6 font-display text-[1.7rem] font-normal leading-[1.2] text-text md:text-[2.5rem]">
              Where I&apos;ve been <em className="text-rose">building.</em>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-[1.75] text-muted">{experienceIntro}</p>

            <dl className="mt-10 flex gap-10 border-t border-line pt-6">
              <div>
                <dd className="font-display text-3xl text-text">{sinceYear}</dd>
                <dt className="mt-1 text-xs text-muted">Building since</dt>
              </div>
              <div>
                <dd className="font-display text-3xl text-text">{experience.length}</dd>
                <dt className="mt-1 text-xs text-muted">Roles so far</dt>
              </div>
              <div>
                <dd className="font-display text-3xl text-text">{current.length}</dd>
                <dt className="mt-1 text-xs text-muted">Right now</dt>
              </div>
            </dl>

            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-rose opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
              </span>
              <span>Now at</span>
              <span className="text-text">{current.map((j) => j.company).join("  ·  ")}</span>
            </p>
          </Reveal>
        </div>

        <Timeline>
          <ol>
            {experience.map((job, i) => {
              const live = job.end === null;
              return (
                <Reveal as="li" key={`${job.company}-${job.start}`} delay={i * 60} className="group relative pb-14 last:pb-0">
                  <span
                    className={`absolute -left-[37px] top-2 h-[9px] w-[9px] rounded-full transition-all duration-300 md:-left-[53px] ${
                      live ? "bg-rose" : "bg-line group-hover:scale-150 group-hover:bg-gold"
                    }`}
                  />
                  {live && (
                    <span className="absolute -left-[41px] top-[4px] h-[17px] w-[17px] rounded-full border border-rose/50 md:-left-[57px] motion-safe:animate-ping" />
                  )}

                  <div className="transition-transform duration-500 group-hover:translate-x-1.5">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-gold">
                      <span>
                        {job.start} — {job.end ?? "Present"}
                      </span>
                      <span className="normal-case tracking-normal text-muted">
                        <Duration start={job.start} end={job.end} />
                      </span>
                      {job.type && <span className="normal-case tracking-normal text-sage">· {job.type}</span>}
                    </p>

                    <h3 className="mt-3 font-display text-2xl leading-tight text-text transition-colors group-hover:text-rose md:text-3xl">
                      {job.href ? (
                        <a href={job.href} target="_blank" rel="noreferrer" className="draw-underline pb-0.5">
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </h3>
                    <p className="mt-1 font-display text-base italic text-muted md:text-lg">{job.role}</p>
                    <p className="mt-4 max-w-lg leading-relaxed text-muted">{job.summary}</p>

                    {job.highlights?.length > 0 && (
                      <ul className="mt-4 max-w-lg space-y-2 text-[15px] leading-relaxed text-muted">
                        {job.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-rose" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-4 text-xs tracking-wide text-sage">{job.tags.join("  ·  ")}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </Timeline>
      </div>
    </section>
  );
}
