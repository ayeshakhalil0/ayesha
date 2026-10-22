// Newest first. `end: null` shows "Present".
// Optional per role: `href` (links the company name), `type` (e.g. "Freelance") and `highlights` (a short list of bullet points).
export const experienceIntro =
  "From freelance client work to a UK research company, and now a full-stack product, with teaching alongside. This is the path so far.";

export const experience = [
  {
    company: "RightSteps.App",
    role: "Full-stack Developer",
    start: "Aug 2025",
    end: null,
    summary:
      "Building a homeschooling platform that gives parents and children personalised, AI-assisted learning.",
    highlights: [
      "Builds the product end to end, from the interface to the database.",
      "Adds AI-assisted learning to the platform with OpenAI.",
      "Works across Next.js and Node.js, with PostgreSQL and MongoDB for data.",
    ],
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "MongoDB", "OpenAI", "Tailwind", "LLM", "Generative AI"],
  },
  {
    company: "Preply",
    href: "https://preply.in/AYESHA6EN20534010102?ts=17926788",
    role: "JavaScript & Web Development Mentor",
    start: "May 2024",
    end: null,
    summary:
      "Teaching JavaScript and web development one-to-one, with lessons built around each student's goals.",
    highlights: [
      "Teaches JavaScript and web development to students one-to-one.",
      "Plans each lesson around the student's own goals and pace.",
    ],
    tags: ["JavaScript", "Web development", "Mentoring"],
  },
  {
    company: "Dowell Research UK Limited",
    role: "Frontend Web Developer",
    start: "Feb 2023",
    end: "Aug 2025",
    summary:
      "Built responsive web interfaces for a UK research-focused company.",
    highlights: [
      "Built responsive interfaces with React, Next.js and TypeScript.",
      "Worked on products for a research-focused company in the UK.",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    company: "Upwork",
    role: "Freelance Developer",
    type: "Freelance",
    start: "Apr 2021",
    end: "Aug 2025",
    summary:
      "Delivered websites and web apps for clients, from first design to working product.",
    highlights: [
      "Built client websites and web apps with React and Next.js.",
      "Freelance work includes Arxio, an LLM-powered research workspace.",
    ],
    tags: ["React", "Next.js", "Node.js", "Freelance"],
  },
];
