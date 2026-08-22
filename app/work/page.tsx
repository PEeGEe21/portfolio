import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { getProfile, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Full-stack product case studies by Udeh Praise C., spanning Web3, education, hospitality, investment, publishing, and team operations.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Praise",
    description: "Full-stack product case studies by Udeh Praise C.",
    url: "/work",
  },
};

export default async function WorkPage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <>
      <header className="border-b border-border">
        <nav aria-label="Work navigation" className="mx-auto flex max-w-site items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link href="/" className="font-display text-lg font-semibold">Praise<span className="text-accent">.</span></Link>
          <Link href="/" className="text-sm text-text-muted transition-colors hover:text-text-primary"><span aria-hidden="true">←</span> Home</Link>
        </nav>
      </header>
      <main id="main-content" className="relative z-10 mx-auto max-w-site px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <p className="font-mono text-xs tracking-[0.18em] text-text-muted uppercase">Complete archive</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">Work built across the stack.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted">Explore the problems, constraints, technical decisions, and outcomes behind each published project.</p>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </main>
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-site flex-col gap-5 px-5 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <ul className="flex flex-wrap gap-5">
            {profile.socialLinks.map((link) => (
              <li key={link.href}>
                <a className="transition-colors hover:text-text-primary" href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
