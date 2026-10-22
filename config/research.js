export const research = {
  heading: "Teaching drone swarms to reach their targets — *without colliding.*",
  lead: "My MS thesis looks at multi-drone missions such as search and rescue, where every drone must reach its own target while staying clear of the others. Today those two decisions are usually optimised separately, and that is where conflicts begin.",
  title:
    "Multi-Agent Proximal Policy Optimization for Joint Dynamic Target Assignment and Collision Avoidance in UAV Systems",
  status: "MS thesis · COMSATS University Islamabad · In progress",
  caption: "",
  columns: [
    {
      label: "The gap",
      text: "Target assignment and collision avoidance depend on each other, yet existing work handles one and leaves the other out. Fixed reward weights also cannot adapt as a mission unfolds.",
    },
    {
      label: "The approach",
      text: "One MAPPO policy sees both. A Hungarian assignment and a conflict graph of nearby drones sit inside each drone's observation, and a small Priority Arbitration Head learns a weight α between 0 and 1 at every step.",
    },
    {
      label: "The evaluation",
      text: "A four-stage curriculum from 3 to 8 drones in a 2D PyBullet simulation, compared against MAPPO, DA-MAPPO and IGAT-MARL on mission success, collisions and reassignments.",
    },
  ],
  metrics: [
    { value: "3–8", label: "Drones in training" },
    { value: "4", label: "Curriculum stages" },
    { value: "1", label: "Unified policy" },
  ],
  href: null,
};
