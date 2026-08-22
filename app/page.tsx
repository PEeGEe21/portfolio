const colors = [
  ["Main", "bg-main", "#212121"],
  ["Surface", "bg-surface", "#272727"],
  ["Accent", "accent", "#DA5921"],
  ["Primary", "text-primary", "#EDEDE8"],
  ["Muted", "text-muted", "#9B9B95"],
  ["Border", "border", "#3A3A38"],
] as const;

export default function Home() {
  return (
    <main id="main-content" className="relative z-0 mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
      <header className="max-w-3xl">
        <p className="mb-5 font-mono text-xs tracking-[0.18em] text-text-muted uppercase">
          Visual foundation · v1
        </p>
        <h1 className="font-display text-5xl leading-[1.04] font-semibold tracking-[-0.04em] text-text-primary sm:text-7xl">
          Quiet confidence,
          <br />
          built with intention.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-text-muted">
          A tactile, cinematic foundation for Praise&apos;s portfolio—warm type,
          restrained color, and enough texture to feel human.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#preview" className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90">
            Explore tokens
          </a>
          <a href="mailto:hello@example.com" className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-text-muted hover:bg-bg-surface">
            Secondary action
          </a>
        </div>
      </header>

      <section id="preview" aria-labelledby="preview-title" className="mt-28 scroll-mt-12 border-t border-border pt-14">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-text-muted uppercase">01 · System</p>
            <h2 id="preview-title" className="mt-3 font-display text-3xl font-semibold tracking-tight">Color tokens</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-text-muted">One background, one raised surface, and one signal color keep the hierarchy deliberate.</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map(([label, token, hex]) => (
            <article key={token} className="rounded-lg border border-border bg-bg-surface p-5">
              <div className="h-16 rounded border border-border" style={{ backgroundColor: hex }} aria-hidden="true" />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-medium text-text-primary">{label}</h3>
                <code className="font-mono text-xs text-text-muted">{hex}</code>
              </div>
              <p className="mt-1 font-mono text-xs text-text-muted">{token}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="type-title" className="mt-24 border-t border-border pt-14">
        <p className="font-mono text-xs tracking-[0.18em] text-text-muted uppercase">02 · Voice</p>
        <h2 id="type-title" className="mt-3 font-display text-3xl font-semibold tracking-tight">Typography</h2>
        <div className="mt-8 grid overflow-hidden rounded-lg border border-border bg-bg-surface lg:grid-cols-3">
          <div className="p-6 lg:border-r lg:border-border">
            <p className="font-mono text-xs text-text-muted">Sora · Display</p>
            <p className="mt-8 font-display text-4xl font-semibold tracking-tight">Ideas deserve form.</p>
          </div>
          <div className="border-t border-border p-6 lg:border-t-0 lg:border-r">
            <p className="font-mono text-xs text-text-muted">Inter · Body</p>
            <p className="mt-8 leading-7 text-text-primary">Clear writing makes technical decisions easier to understand, challenge, and trust.</p>
          </div>
          <div className="border-t border-border p-6 lg:border-t-0">
            <p className="font-mono text-xs text-text-muted">JetBrains Mono · Meta</p>
            <p className="mt-8 font-mono text-sm leading-7 text-text-primary">Next.js · TypeScript<br />Lagos, NG · UTC+1</p>
          </div>
        </div>
      </section>
    </main>
  );
}
