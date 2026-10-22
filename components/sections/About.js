import Image from "next/image";
import { about, education } from "@/config/site";
import Reveal from "../Reveal";
import Label from "../Label";
import Italic from "../Italic";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal className="mx-auto w-full max-w-sm lg:max-w-[26rem]">
          <div className="relative about-fade aspect-[1161/1355]">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Label index="01">About</Label>
          <h2 className="mt-6 font-display text-[1.7rem] font-normal leading-[1.2] text-text md:text-[2.5rem]">
            <Italic text={about.heading} />
          </h2>
          <div className="mt-7 max-w-xl space-y-4 text-base leading-[1.75] text-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <p className="mt-10 max-w-xl text-[13px] uppercase leading-loose tracking-[0.2em] text-gold/90">
            {about.skills.join("  /  ")}
          </p>

          {education.map((e) => (
            <p key={e.degree} className="mt-10 border-t border-line pt-6 text-sm text-muted">
              <span className="font-display text-xl text-text">{e.degree}</span>
              <br />
              {e.school}, {e.campus} · {e.period} · {e.note}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
