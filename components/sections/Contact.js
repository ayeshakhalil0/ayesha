import Image from "next/image";
import { contact, hero, site } from "@/config/site";
import Reveal from "../Reveal";
import Label from "../Label";
import { Arrow, socialIcons } from "../Icons";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_60%)]">
        <Image
          src={hero.image.src}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-[75%_35%] opacity-45"
        />
        <div className="absolute inset-0 bg-bg/55" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-20 md:px-10 md:pt-28">
        <Reveal>
          <Label index="06">Contact</Label>
          <h2 className="mt-6 max-w-5xl font-display text-[1.9rem] font-normal leading-[1.15] text-text md:text-[3rem]">
            Let&apos;s build something <em className="text-rose">meaningful.</em>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{contact.text}</p>

          <a
            href={`mailto:${contact.email}`}
            className="draw-underline mt-8 inline-flex items-center gap-3 pb-1.5 font-display text-xl text-text md:text-3xl"
          >
            {contact.email} <Arrow width={26} height={26} className="shrink-0 text-rose" />
          </a>

          <div className="mt-10 flex gap-6 text-sm text-muted">
            {contact.socials.map(({ label, icon, href }) => {
              const Icon = socialIcons[icon];
              return (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-rose">
                  <Icon width={18} height={18} /> {label}
                </a>
              );
            })}
          </div>
        </Reveal>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted">
          <span>
            © {site.copyrightYear} {site.name} · {site.location}
          </span>
          <a href="#home" className="inline-flex items-center gap-1 hover:text-text">
            Back to top <Arrow className="-rotate-90" width={14} height={14} />
          </a>
        </footer>
      </div>
    </section>
  );
}
