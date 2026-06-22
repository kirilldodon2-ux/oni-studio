export type CaseEntry = {
  id: string;
  client: string;
  title: string;
  category: string;
  year: string;
  scope: string[];
  cover: string | null;
  /** Number of 100vh scroll-snap sections this case occupies. Defaults to 1. */
  sections?: number;
};

export const casesRegistry: CaseEntry[] = [
  {
    id: "01",
    client: "PUNCH · ПУНШ",
    title: "BRAND IDENTITY",
    category: "IDENTITY",
    year: "2026",
    scope: ["Event Branding", "Visual Identity", "Merch", "Posters"],
    cover: "/cases/punch/66233c76db34d637b5f0a2da5208a41b8cc8b3ff.png",
    sections: 2,
  },
];
