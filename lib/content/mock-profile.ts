import type { Profile } from "./types";

export const mockProfile: Profile = {
  name: "Udeh Praise C.",
  role: "Full-Stack Software Engineer",
  location: "Lagos, Nigeria · UTC+1",
  availability: null,
  intro:
    "I build dependable web and mobile products from interface to infrastructure, turning complex workflows into clear experiences for the people who use them. Over the past six years, I have worked across EdTech, Web3, e-commerce, and operations platforms with TypeScript, Next.js, NestJS, Laravel, and relational databases.",
  journey: [
    "My interest in computers began when I entered school. I was curious about how they worked and what I could create with them, and that curiosity grew into a clear direction: study computer science and learn how to build useful software.",
    "As I moved from learning the fundamentals to working on real products, I became drawn to the full picture of an application. I did not want to stop at making an interface look right; I wanted to understand the APIs, data, permissions, infrastructure, and product decisions that make the experience dependable from end to end.",
    "Over the past six years, I have built products across education, blockchain, e-commerce, hospitality, and team operations. Projects such as Tailpoint and HotelOS have pushed me to think beyond individual screens: tenant isolation, background jobs, automation, data modelling, and responsive interfaces all have to work as one system. On Tailpoint, for example, I kept authorization and workflow rules in the backend so every client follows the same security boundaries, even though that required more deliberate API design and testing.",
    "Today, I enjoy owning complex full-stack problems from discovery through delivery. I care about understanding the real constraint, communicating trade-offs clearly, and building software that people can trust and use.",
  ],
  email: "mailpraiseudeh@gmail.com",
  resumeUrl: "/docs/udeh-praise-resume.pdf",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/PEeGEe21",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/udeh-praisegod/",
    },
  ],
  skillGroups: [
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "HTML", "CSS", "PHP", "Python", "SQL", "Bash"],
    },
    {
      title: "Frameworks & libraries",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "NestJS",
        "Django",
        "Laravel",
        "React Native",
        "shadcn/ui",
        "Tailwind CSS",
        "Material UI",
        "SvelteKit",
        "AngularJs",
        "Wordpress"
      ],
    },
    {
      title: "Databases & ORMs",
      skills: [
        "MySQL",
        "PostgreSQL",
        "Prisma",
        "Supabase",
        "Firebase Firestore",
        "MongoDB",
      ],
    },
    {
      title: "Tools & platforms",
      skills: [
        "Git",
        "GitHub",
        "Vercel",
        "n8n",
        "BullMQ",
        "CI/CD",
        "Framer",
        "Figma",
        "Canva",
        "Responsive Design",
        "Automation Workflows",
      ],
    },
    {
      title: "Authentication",
      skills: ["Firebase Auth", "NextAuth.js", "Google OAuth"],
    },
    {
      title: "APIs & integrations",
      skills: [
        "REST APIs",
        "GraphQL",
        "Apollo Client",
        "Ethers.js",
        "Wagmi",
        "RainbowKit",
      ],
    },
  ],
};
