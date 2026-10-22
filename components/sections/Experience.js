import { experience } from "@/config/experience";
import Reveal from "../Reveal";
import Label from "../Label";

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
          </Reveal>
        </div>

        {/* vertical line with a marker per role */}
        <ol className="relative ml-2 border-l border-line pl-8 md:pl-12">
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.company}-${job.start}`} delay={i * 60} className="group relative pb-10 last:pb-0">
              <span
                className={`absolute -left-[37px] top-3 h-[9px] w-[9px] rounded-full md:-left-[53px] ${
                  job.end === null ? "bg-rose" : "bg-line group-hover:bg-gold"
                } transition-colors`}
              />
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {job.start} — {job.end ?? "Present"}
              </p>
              <h3 className="mt-3 font-display text-xl leading-tight text-text transition-colors group-hover:text-rose md:text-2xl">
                {job.company}
              </h3>
              <p className="mt-1 font-display text-lg italic text-muted">{job.role}</p>
              <p className="mt-3 max-w-lg leading-relaxed text-muted">{job.summary}</p>
              <p className="mt-4 text-xs tracking-wide text-sage">{job.tags.join("  ·  ")}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
