import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    { url: siteUrl.href, changeFrequency: "monthly", priority: 1 },
    { url: new URL("/work", siteUrl).href, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((project) => ({
      url: new URL(`/work/${project.slug}`, siteUrl).href,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}
