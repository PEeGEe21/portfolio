import { mockProfile } from "./mock-profile";
import { projectRecords } from "./mock-projects";
import type { Profile, Project, ProjectDraft } from "./types";

const isPublishedProject = (project: (typeof projectRecords)[number]): project is Project =>
  project.editorialStatus === "published";

export async function getProjects(): Promise<Project[]> {
  return projectRecords
    .filter(isPublishedProject)
    .sort((first, second) => Number(second.featured) - Number(first.featured));
}

export async function getProject(slug: string): Promise<Project | null> {
  return projectRecords.find(
    (project): project is Project =>
      project.slug === slug && project.editorialStatus === "published",
  ) ?? null;
}

export async function getProfile(): Promise<Profile> {
  return mockProfile;
}

export async function getProjectDrafts(): Promise<ProjectDraft[]> {
  return projectRecords.filter(
    (project): project is ProjectDraft => project.editorialStatus === "draft",
  );
}

export type { Profile, Project, ProjectDraft, SkillGroup } from "./types";
