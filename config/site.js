// Everything shown in the header, hero, about and contact sections lives here.
export const site = {
  name: "Ayesha",
  title: "Ayesha — Software Engineer, MS Researcher & Educator",
  description:
    "Full-stack developer, multi-agent RL researcher and JavaScript mentor from Pakistan.",
  location: "Islamabad, Pakistan",
  copyrightYear: 2026,
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Teaching", href: "#teaching" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: ["Software Engineer", "MS Researcher", "Educator"],
  // Text in *asterisks* is rendered in italic rose.
  headline: "Building intelligent systems for a *kinder tomorrow.*",
  intro:
    "I build scalable web applications, explore intelligent systems through research, and love helping others grow in tech.",
  tagline: "A curious mind from Pakistan.",
  image: { src: "/images/ayesha.png", alt: "Ayesha working on her laptop at sunset" },
  primaryCta: { label: "View my work", href: "#work" },
  secondaryCta: { label: "Explore research", href: "#research" },
};

export const stats = [
  { value: "4+", label: "Years experience" },
  { value: "20+", label: "Projects delivered" },
  { value: "2+", label: "Years teaching" },
  { value: "3.8/4.0", label: "MS CGPA" },
];

export const manifesto =
  "I build web products people actually enjoy using, research how swarms of drones can *think together*, and teach the next generation of developers to *build with confidence.*";

export const about = {
  image: { src: "/images/ayesha-about.png", alt: "Ayesha sketching drone paths in a notebook at her desk, with code on her laptop and a lesson on her tablet" },
  heading: "Rooted in culture, always *reaching for more.*",
  paragraphs: [
    "I'm a software engineer who moves between three worlds: shipping production web apps, researching how groups of autonomous agents can cooperate safely, and teaching the next batch of developers.",
    "Whether it's a homeschooling platform or a reinforcement learning paper, I care about the same thing — systems that are clear, dependable and genuinely useful to the people on the other side of the screen.",
  ],
  skills: [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Python",
    "Reinforcement Learning",
    "UAV Systems",
  ],
};

export const education = [
  {
    degree: "MS Computer Science",
    school: "COMSATS University Islamabad",
    campus: "Abbottabad Campus",
    period: "Jan 2025 – Dec 2026",
    note: "CGPA 3.8 / 4.0",
  },
];

export const contact = {
  heading: "Let's build something meaningful.",
  text: "Open to full-stack roles, research collaborations and mentoring. The fastest way to reach me is email.",
  email: "hello@example.com",
  socials: [
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/ayesha-khalil-435b87265/" },
    { label: "GitHub", icon: "github", href: "https://github.com/your-handle" },
  ],
};
