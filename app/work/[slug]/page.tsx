import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia } from "@/components/project-media";
import { getProject, getProjects } from "@/lib/content";
import { MoveLeft, MoveRight, MoveUp, MoveUpRight } from "lucide-react";

type CaseStudyProps = {
  params: Promise<{ slug: string }>;
};

const statusLabels = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
} as const;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} · Praise`,
      description: project.summary,
      type: "article",
      url: `/work/${project.slug}`,
      images: project.screenshots[0]
        ? [{ url: project.screenshots[0].src, alt: project.screenshots[0].alt }]
        : [{ url: "/opengraph-image", alt: `${project.title} case study by Udeh Praise C.` }],
    },
  };
}

export default async function CaseStudy({ params }: CaseStudyProps) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects.at(projectIndex - 1) ?? projects.at(-1);
  const nextProject = projects.at((projectIndex + 1) % projects.length);

  const sections = [
    { title: "The problem", paragraphs: project.problem },
    { title: "Constraints", paragraphs: project.constraints },
    { title: "Key decisions", paragraphs: project.decisions },
    { title: "Outcome", paragraphs: project.outcome },
  ];

  return (
    <>
      <header className="border-b border-border">
        <nav aria-label="Case study navigation" className="mx-auto flex max-w-site items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="font-display text-lg font-semibold">Praise<span className="text-accent">.</span></Link>
          <Link href="/work" className="text-sm text-text-muted transition-colors hover:text-text-primary flex items-center gap-1">
            <MoveLeft size={12} /> All work
          </Link>
        </nav>
      </header>
      <main id="main-content" className="relative z-10">
        <article>
          <header className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.14em] text-text-muted uppercase">
              <span>{statusLabels[project.status]}</span><span aria-hidden="true">·</span><span>{project.role}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight font-semibold tracking-[-0.045em] sm:text-7xl">{project.title}</h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-text-muted">{project.summary}</p>
            <ul aria-label="Technologies used" className="mt-8 flex flex-wrap gap-2">{project.stack.map((item) => <li key={item} className="rounded border border-border px-3 py-2 font-mono text-xs text-text-muted">{item}</li>)}</ul>
            {(project.liveUrl || project.repoUrl) ? <div className="mt-10 flex flex-wrap gap-4">
              {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground flex items-center gap-2">Visit live product <MoveUpRight size={12} /></a> : null}
              {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noreferrer" className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-text-primary flex items-center gap-2">View repository <MoveUpRight size={12} /></a> : null}
            </div> : null}
          </header>

          <section aria-label="Project preview" className="mx-auto max-w-site px-5 sm:px-8">
            <ProjectMedia project={project} />
          </section>

          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
            {sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`section-${index}`} className="grid gap-6 border-t border-border py-12 first:border-t-0 first:pt-0 md:grid-cols-[0.55fr_1.45fr]">
                <h2 id={`section-${index}`} className="font-display text-2xl font-semibold tracking-tight">{section.title}</h2>
                <div className="space-y-5 text-lg leading-8 text-text-muted">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </section>
            ))}
          </div>

          {projects.length > 1 && previousProject && nextProject ? (
            <nav aria-label="Browse case studies" className="mx-auto grid max-w-site gap-4 border-t border-border px-5 py-10 sm:grid-cols-2 sm:px-8">
              <Link
                href={`/work/${previousProject.slug}`}
                rel="prev"
                className="group flex min-h-32 items-center gap-4 rounded-md border border-border bg-bg-surface px-5 py-6 transition-colors hover:border-accent sm:px-7"
              >
                <MoveLeft aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:-translate-x-1" size={20} />
                <span>
                  <span className="block font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Previous project</span>
                  <span className="mt-2 block font-display text-xl font-semibold tracking-tight text-text-primary">{previousProject.title}</span>
                </span>
              </Link>
              <Link
                href={`/work/${nextProject.slug}`}
                rel="next"
                className="group flex min-h-32 items-center justify-between gap-4 rounded-md border border-border bg-bg-surface px-5 py-6 text-right transition-colors hover:border-accent sm:px-7"
              >
                <span className="ml-auto">
                  <span className="block font-mono text-xs tracking-[0.14em] text-text-muted uppercase">Next project</span>
                  <span className="mt-2 block font-display text-xl font-semibold tracking-tight text-text-primary">{nextProject.title}</span>
                </span>
                <MoveRight aria-hidden="true" className="shrink-0 text-accent transition-transform group-hover:translate-x-1" size={20} />
              </Link>
            </nav>
          ) : null}
        </article>
      </main>
      <footer className="border-t border-border"><div className="mx-auto flex max-w-site items-center justify-between gap-6 px-5 py-8 text-sm text-text-muted sm:px-8"><p>Built by Udeh Praise C.</p><Link href="/work" className="hover:text-text-primary flex items-center gap-2">More work <MoveUp size={12}/></Link></div></footer>
    </>
  );
}
