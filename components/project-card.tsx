import Link from "next/link";
import type { Project } from "@/lib/content";

const statusLabels = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
} as const;

type ProjectCardProps = {
  index: number;
  project: Project;
};

export function ProjectCard({ index, project }: ProjectCardProps) {
  return (
    <article className="group relative flex min-h-80 flex-col overflow-hidden rounded-lg border border-border bg-bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_70px_-30px_rgba(218,89,33,0.4)] sm:p-8">
      <div className="flex items-center justify-between gap-4 font-mono text-xs tracking-wide text-text-muted uppercase">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{statusLabels[project.status]}</span>
      </div>
      <h3 className="mt-12 font-display text-3xl font-semibold tracking-tight text-text-primary">
        {project.title}
      </h3>
      <p className="mt-4 flex-1 leading-7 text-text-muted">{project.summary}</p>
      <div className="mt-8 flex items-end justify-between gap-6">
        <ul
          aria-label={`${project.title} technologies`}
          className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-text-muted"
        >
          {project.stack.slice(0, 4).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="text-xl text-text-primary transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </div>
      <Link
        href={`/work/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
        className="absolute inset-0 rounded-lg"
      />
    </article>
  );
}
