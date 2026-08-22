import type { Profile } from "./types";

export const mockProfile: Profile = {
  name: "Praise",
  role: "Full-Stack Developer",
  location: "Lagos, Nigeria",
  availability: null,
  intro:
    "Full-stack developer with a background in journalism and education.",
  journey: [],
  email: null,
  resumeUrl: null,
  socialLinks: [],
  skillGroups: [
    {
      title: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "HTML", "CSS", "JavaScript"],
    },
    {
      title: "Backend",
      skills: ["NestJS", "Python", "Django"],
    },
  ],
};
