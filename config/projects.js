// Add as many projects as you like. The grid picks a layout that fills every row
// (2, 3, 4 or 5 tiles per block, repeated), and anything past `workInitialCount`
// sits behind "Show all". Whole blocks are shown first, so there are never gaps.
// `accent` is optional ("sage" | "rose" | "gold"); if left out the colours rotate.
// `href` makes a tile a link.
export const workInitialCount = 7;

export const projects = [
  {
    title: "RightSteps.App",
    kind: "Full-stack web app",
    badge: "Current",
    description:
      "A homeschooling platform that gives parents and children personalised, AI-assisted learning. Built end to end, from the interface to the database.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind", "OpenAI", "MongoDB"],
    href: null,
    accent: "sage",
  },
  {
    title: "Colabrix",
    kind: "Mobile app",
    badge: "In progress",
    description:
      "A project management app that starts every project as one board of issues. Stories, sprints and milestones can be switched on when a team is ready, and every view keeps working from the same issues.",
    tags: ["React Native", "Mobile"],
    href: null,
    accent: "rose",
  },
  {
    title: "Arxio",
    kind: "Freelance project",
    description:
      "Upload a research paper and Arxio builds a full workspace: overview, methodology and results breakdowns, a 15-slide presentation with script, Q&A prep and a cheat sheet. It can also research any topic and produce cited documents as PowerPoint, Word, PDF or Excel.",
    tags: ["Next.js", "React Native", "Node.js", "OpenAI", "LLM", "Generative AI"],
    href: null,
    accent: "gold",
  },
  {
    title: "Dowell Portal",
    kind: "Frontend",
    description:
      "Responsive web interfaces for Dowell Research UK, a research-focused company, built with React, Next.js and TypeScript.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    href: null,
    accent: "rose",
  },
  {
    title: "ISSB Smart Study",
    kind: "Web platform",
    description:
      "Website and student platform for a defence-test academy. Visitors explore Army, Navy and PAF courses, send an enquiry through a form connected to an API, and students sign in securely.",
    tags: ["React", "Vite", "Framer Motion", "React Router", "REST API"],
    href: null,
    accent: "sage",
  },
  {
    title: "One1App",
    kind: "Mobile app",
    description:
      "A mobile app for creators that makes the path from passion to profit effortless, with tools for growth and creativity, and a user-friendly, mobile-optimised experience that builds trust within communities.",
    tags: ["Flutter", "Dart", "Mobile"],
    href: null,
    accent: "rose",
  },
  {
    title: "WoodLog",
    kind: "Final year project",
    description:
      "My university final year project. It checks the logs on a truck at a checkpost before the truck is allowed to pass. A model trained on a Python dataset runs behind a FastAPI backend, with a Flutter mobile app as the frontend.",
    tags: ["Python", "Machine Learning", "FastAPI", "Flutter"],
    href: null,
    accent: "gold",
  },
];

export const workCta = {
  text: "Have a project in mind?",
  label: "Let's talk",
  href: "#contact",
};
