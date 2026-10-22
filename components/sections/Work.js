import { projects } from "@/config/projects";
import Reveal from "../Reveal";
import Label from "../Label";
import { Arrow } from "../Icons";

export default function Work() {
  return (
    <section id="work" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="mb-8 md:mb-12">
          <Label index="03">Selected work</Label>
        </Reveal>

        <ul className="border-b border-line">
          {projects.map((p, i) => {
            const Row = p.href ? "a" : "div";
            return (
              <Reveal as="li" key={p.title} delay={i * 70}>
                <Row
                  {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
                  className="group grid items-baseline gap-x-10 gap-y-4 border-t border-line py-7 md:grid-cols-[60px_1.2fr_1fr_30px] md:py-9"
                >
                  <span className="font-display text-xl italic text-gold">0{i + 1}</span>
                  <h3 className="font-display text-2xl leading-tight text-text transition-all duration-500 group-hover:translate-x-2 group-hover:italic group-hover:text-rose md:text-3xl">
                    {p.title}
                  </h3>
                  <div>
                    <p className="leading-relaxed text-muted">{p.description}</p>
                    <p className="mt-3 text-xs tracking-wide text-sage">
                      {p.badge && (
                        <span className="mr-3 inline-flex items-center gap-2 text-rose">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                          {p.badge}
                        </span>
                      )}
                      {p.tags.join("  ·  ")}
                    </p>
                  </div>
                  <span className="hidden justify-self-end text-muted transition-colors group-hover:text-rose md:block">
                    {p.href && <Arrow />}
                  </span>
                </Row>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
