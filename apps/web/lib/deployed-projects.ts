export type DeployedProject = {
  name: string;
  url: string;
  description: { en: string; id: string };
  stack: string[];
};

export const deployedProjects: DeployedProject[] = [
  {
    name: "Thollabul Ilmi",
    url: "https://thollabul.jangkauin.site",
    description: {
      en: "Islamic knowledge platform for students — Quran, Hadith, worship tools, and structured learning paths.",
      id: "Platform ilmu Islam untuk penuntut ilmu — Al-Quran, Hadis, alat ibadah, dan jalur belajar terstruktur."
    },
    stack: ["Go / Fiber", "Next.js", "PostgreSQL"]
  },
  {
    name: "EduPlay",
    url: "https://games.jangkauin.site",
    description: {
      en: "PWA educational mini-game platform combining learning with gamification — XP/leveling, daily challenges, and real-time leaderboards.",
      id: "Platform PWA mini-game edukasi yang memadukan belajar dengan gamifikasi — XP/leveling, tantangan harian, dan leaderboard real-time."
    },
    stack: ["Go / Fiber", "Next.js", "PostgreSQL"]
  },
  {
    name: "Wedding Management",
    url: "https://wedding.jangkauin.site",
    description: {
      en: "Wedding invitation and event management platform for couples and organizers.",
      id: "Platform undangan dan manajemen acara pernikahan untuk pasangan dan penyelenggara."
    },
    stack: ["Go", "Next.js", "PostgreSQL"]
  }
];
