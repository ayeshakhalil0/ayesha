import { teaching } from "@/config/teaching";
import Reveal from "../Reveal";
import Label from "../Label";
import { Star } from "../Icons";

export default function Teaching() {
  const [t] = teaching.testimonials;
  return (
    <section id="teaching" className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <Label index="05">Teaching</Label>
        <h2 className="mt-6 font-display text-[1.7rem] font-normal leading-[1.2] text-text md:text-[2.5rem]">
          Empowering <em className="text-rose">future coders.</em>
        </h2>
        <p className="mt-8 max-w-xl text-base leading-[1.75] text-muted">{teaching.text}</p>
        {teaching.platform.href && (
          <a href={teaching.platform.href} target="_blank" rel="noreferrer" className="draw-underline mt-6 inline-block pb-1 text-sm text-rose">
            {teaching.platform.label}
          </a>
        )}
      </Reveal>

      {t && (
        <Reveal delay={100} className="relative mt-12 md:mt-16">
          <span aria-hidden className="absolute -top-8 -left-2 font-display text-[6rem] leading-none text-rose/25 md:-left-8 md:text-[8rem]">
            &ldquo;
          </span>
          <blockquote className="relative font-display text-xl italic leading-[1.4] text-text md:text-3xl md:leading-[1.35]">
            {t.quote}
          </blockquote>
          <p className="mt-8 flex items-center gap-4 text-sm text-muted">
            <span className="h-px w-10 bg-gold/50" />
            {t.author}
            <span className="flex gap-0.5 text-gold" aria-label={`${t.rating} out of 5`}>
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} />
              ))}
            </span>
          </p>
        </Reveal>
      )}
    </section>
  );
}
