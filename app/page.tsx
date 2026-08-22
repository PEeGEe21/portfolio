import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { ScrollLink } from "@/components/scroll-link";
import { getProfile, getProjects } from "@/lib/content";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 8);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      sameAs: profile.socialLinks.map((link) => link.href),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <header className="sticky top-0 z-40 border-b border-border/80 bg-bg-main/90 backdrop-blur-md">
        <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
          <ScrollLink targetId="intro" className="font-display text-lg font-semibold tracking-tight text-text-primary">Praise<span className="text-accent">.</span></ScrollLink>
          <div className="hidden items-center gap-6 text-sm text-text-muted sm:flex">
            <ScrollLink className="transition-colors hover:text-text-primary" targetId="work">Work</ScrollLink>
            <ScrollLink className="transition-colors hover:text-text-primary" targetId="journey">Journey</ScrollLink>
            <ScrollLink className="transition-colors hover:text-text-primary" targetId="skills">Skills</ScrollLink>
            <ScrollLink className="transition-colors hover:text-text-primary" targetId="contact">Contact</ScrollLink>
          </div>
          {profile.resumeUrl ? <a className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90" href={profile.resumeUrl}>Résumé <span aria-hidden="true">↗</span></a> : null}
        </nav>
      </header>

      <main id="main-content" className="relative z-10">
        <section id="intro" aria-labelledby="intro-title" className="mx-auto flex min-h-[78vh] max-w-7xl scroll-mt-24 flex-col justify-center px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <Reveal><p className="font-mono text-xs tracking-[0.18em] text-text-muted uppercase">{profile.role} · {profile.location}</p>
          <h1 id="intro-title" className="mt-6 max-w-5xl font-display text-5xl leading-[1.02] font-semibold tracking-[-0.045em] text-text-primary sm:text-7xl lg:text-[5.75rem]">Building dependable products, from interface to infrastructure.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-text-muted sm:text-xl sm:leading-9">{profile.intro}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ScrollLink targetId="work" className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90">View selected work</ScrollLink>
            {profile.email ? <a href={`mailto:${profile.email}`} className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted hover:bg-bg-surface">Get in touch</a> : null}
          </div></Reveal>
        </section>

        <section id="work" aria-labelledby="work-title" className="scroll-mt-24 border-t border-border">
          <Reveal className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.18em] text-text-muted uppercase">01 · Selected work</p>
              <h2 id="work-title" className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Products shaped by real constraints.</h2>
              <p className="mt-5 text-lg leading-8 text-text-muted">A selection of systems I have designed and built across product, frontend, backend, and infrastructure.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
            </div>
            <div className="mt-10 flex justify-center">
              <Link href="/work" className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted hover:bg-bg-surface">View all work <span aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
        </section>

        <section id="journey" aria-labelledby="journey-title" className="scroll-mt-24 border-t border-border">
          <Reveal className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-28">
            <div><p className="font-mono text-xs tracking-[0.18em] text-text-muted uppercase">02 · Journey</p><h2 id="journey-title" className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Curiosity became craft.</h2></div>
            <div className="space-y-6 text-lg leading-8 text-text-muted">{profile.journey.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </Reveal>
        </section>

        <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 border-t border-border">
          <Reveal className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <p className="font-mono text-xs tracking-[0.18em] text-text-muted uppercase">03 · Capabilities</p>
            <h2 id="skills-title" className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Tools chosen for the problem.</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {profile.skillGroups.map((group) => <article key={group.title} className="bg-bg-surface p-6 sm:p-8"><h3 className="font-display text-xl font-semibold">{group.title}</h3><ul className="mt-6 flex flex-wrap gap-2">{group.skills.map((skill) => <li key={skill} className="rounded border border-border px-3 py-2 font-mono text-xs text-text-muted">{skill}</li>)}</ul></article>)}
            </div>
          </Reveal>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 border-y border-border bg-bg-surface">
          <Reveal className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-text-muted uppercase">04 · Contact</p>
              <h2 id="contact-title" className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Have a difficult product problem? Let&apos;s talk.</h2>
              <p className="mt-6 max-w-md leading-7 text-text-muted">Share a little about what you are building, where you need help, and the best way to reach you.</p>
              {profile.email ? <a href={`mailto:${profile.email}`} className="mt-8 inline-block break-all font-semibold text-text-primary underline decoration-accent decoration-2 underline-offset-8">{profile.email}</a> : null}
            </div>

            <form action="https://formspree.io/f/xgedownq" method="POST" className="rounded-lg border border-border bg-bg-main p-5 sm:p-8">
              <input type="hidden" name="_subject" value="New portfolio enquiry" />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-text-primary">Full name</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Your name" className="contact-field min-h-12 w-full rounded-md border border-border bg-bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-[border-color,box-shadow] hover:border-text-muted" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-text-primary">Email address</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="contact-field min-h-12 w-full rounded-md border border-border bg-bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-[border-color,box-shadow] hover:border-text-muted" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-text-primary">Phone number</label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+234 000 000 0000" className="contact-field min-h-12 w-full rounded-md border border-border bg-bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-[border-color,box-shadow] hover:border-text-muted" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-text-primary">Project or request</label>
                  <textarea id="contact-message" name="message" rows={6} required placeholder="Tell me about your request" className="contact-field min-h-36 w-full resize-y rounded-md border border-border bg-bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-[border-color,box-shadow] hover:border-text-muted" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="min-h-12 w-full cursor-pointer rounded-md bg-accent px-5 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90">Send message <span aria-hidden="true">→</span></button>
                </div>
              </div>
            </form>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <ul className="flex flex-wrap gap-5">{profile.socialLinks.map((link) => <li key={link.href}><a className="hover:text-text-primary" href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a></li>)}</ul>
      </footer>
    </>
  );
}
