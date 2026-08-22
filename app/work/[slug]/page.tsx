import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";

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
  const project = await getProject(slug);
  if (!project) notFound();

  const sections = [
    { title: "The problem", paragraphs: project.problem },
    { title: "Constraints", paragraphs: project.constraints },
    { title: "Key decisions", paragraphs: project.decisions },
    { title: "Outcome", paragraphs: project.outcome },
  ];

  return (
    <>
      <header className="border-b border-border">
        <nav aria-label="Case study navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="font-display text-lg font-semibold">Praise<span className="text-accent">.</span></Link>
          <Link href="/work" className="text-sm text-text-muted transition-colors hover:text-text-primary"><span aria-hidden="true">←</span> All work</Link>
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
              {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground">Visit live product <span aria-hidden="true">↗</span></a> : null}
              {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noreferrer" className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-text-primary">View repository <span aria-hidden="true">↗</span></a> : null}
            </div> : null}
          </header>

          <section aria-label="Project preview" className="mx-auto max-w-6xl px-5 sm:px-8">
            {project.screenshots[0] ? (
              <Image src={project.screenshots[0].src} alt={project.screenshots[0].alt} width={project.screenshots[0].width} height={project.screenshots[0].height} className="h-auto w-full rounded-lg border border-border bg-bg-surface" priority />
            ) : (
              <div className="grid aspect-[16/8] place-items-center overflow-hidden rounded-lg border border-border bg-bg-surface p-8 text-center">
                <div><p className="font-display text-2xl font-semibold">{project.title}</p><p className="mt-2 font-mono text-xs tracking-[0.16em] text-text-muted uppercase">Case study · visual preview pending</p></div>
              </div>
            )}
          </section>

          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
            {sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`section-${index}`} className="grid gap-6 border-t border-border py-12 first:border-t-0 first:pt-0 md:grid-cols-[0.55fr_1.45fr]">
                <h2 id={`section-${index}`} className="font-display text-2xl font-semibold tracking-tight">{section.title}</h2>
                <div className="space-y-5 text-lg leading-8 text-text-muted">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <footer className="border-t border-border"><div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-8 text-sm text-text-muted sm:px-8"><p>Built by Udeh Praise C.</p><Link href="/work" className="hover:text-text-primary">More work ↑</Link></div></footer>
    </>
  );
}
