export type ProjectStatus = "shipped" | "in-progress" | "archived";

export type EditorialStatus = "draft" | "published";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ProjectDraft = {
  editorialStatus: "draft";
  slug: string;
  title: string;
  featured: boolean;
  summary: string;
  stack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  status: ProjectStatus | null;
  role: string | null;
  problem: string[];
  constraints: string[];
  decisions: string[];
  outcome: string[];
  useVideo?: boolean;
  videoUrl?: string | null;
  screenshots: ProjectImage[];
};

export type Project = Omit<ProjectDraft, "editorialStatus" | "status" | "role"> & {
  editorialStatus: "published";
  status: ProjectStatus;
  role: string;
};

export type ProjectRecord = ProjectDraft | Project;

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  availability: string | null;
  intro: string;
  journey: string[];
  email: string | null;
  resumeUrl: string | null;
  socialLinks: SocialLink[];
  skillGroups: SkillGroup[];
};
