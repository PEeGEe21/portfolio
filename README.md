# Portfolio Site — README

> **This doc is operational only** — setup steps and build order. Design tokens, typography, and motion rules live in `design.md`; functional requirements, content model, and acceptance criteria live in `requirements.md`; product goals and phasing live in `prd.md`. This file doesn't restate specifics from those docs, only points to them — so it can't drift out of sync with a design or scope change made elsewhere.

How to build Phase 1: the frontend, running on mock data.

## 1. Setup

Before scaffolding, verify the current Next.js runtime requirement in the official documentation and install a compatible Node.js LTS release. Record the exact runtime used in `.nvmrc`; do not leave the project dependent on whichever Node version happens to be installed locally.

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app
cd portfolio
npm config set save-exact true --location=project
npm install --save-exact framer-motion
```

After initialization:

- Record the exact Node version in `.nvmrc` and declare its compatible major version in `package.json#engines`.
- Confirm the installed Next.js and React versions with `npm ls next react`.
- Replace dependency ranges (`^` or `~`) in `package.json` with the exact installed versions. `save-exact=true` ensures later installs follow the same rule.
- Commit `package-lock.json`. It is the reproducible dependency record and must not be regenerated casually.
- Record the initial versions in the pull request or release notes so upgrades are deliberate rather than a side effect of reinstalling.

The requirements call for Next.js 16 and React 19, but the compatible patch versions must be selected and pinned when the app is initialized so current security releases can be used.

## 2. Project structure

```
portfolio/
  app/
    page.tsx                # hero + Intro/Work-summary/Journey/Skills/Contact, single scrolling page
    work/
      [slug]/page.tsx        # individual project case study — its own route, see requirements.md §6 for why
    layout.tsx
    globals.css              # Tailwind base + design tokens as CSS variables, per design.md
  lib/
    content/
      index.ts                # getProjects(), getProject(slug), getProfile() — the swappable interface (requirements.md §5)
      mock-projects.ts         # local typed mock data, Phase 1 only
      types.ts                 # Project, Profile, SkillGroup — matches the content model in requirements.md §6
  components/
    hero.tsx
    project-card.tsx
    scroll-reveal/...          # Framer Motion signature-moment components (see design.md §6 for the motion spec)
  public/
    fonts/                    # self-hosted via next/font — see design.md §3 for the actual typeface names
```

## 3. Build order

1. **Set up the design tokens first.** Define the tokens and type scale from `design.md` as CSS custom properties in `app/globals.css`, then expose them to Tailwind using the mechanism supported by the installed Tailwind version (for example, CSS-first theme configuration in current releases). Add a `tailwind.config.*` file only if that version or a required plugin needs one. Every component should consume the shared tokens, never hardcoded values.
2. **Write `lib/content/types.ts` and `mock-projects.ts`.** Shape these to match the project content model in `requirements.md` §6 (problem, role, constraints, decisions, outcome, screenshots, links, status) for your real project list (Tailpoint, Serene EMR, HotelOS, AI Job Finder App) — and to already resemble what a Sanity schema for the same content would look like.
3. **Write `lib/content/index.ts`** — `getProjects()`, `getProject(slug)`, and `getProfile()` reading from the mock module. Every page/component below calls these functions, never the mock file directly.
4. **Build static sections** — Hero, Skills, Contact. These are the simplest, get them done first to have something real to look at.
5. **Build the Work section (homepage summary cards) + `/work/[slug]` case study route.** Case studies are separate routes, not expanded in-page sections — each gets its own shareable URL and its own metadata (see requirements.md §6 and §8). Homepage cards link out to the full case study.
6. **Build Background/Journey section** — the narrative piece; worth spending real writing time here since it's the most differentiating section.
7. **Layer in Framer Motion** — last, once the static layout is right. Add the signature reveal/hover moments from `design.md` §6. Resist adding motion everywhere; this is a tool people should be able to revisit without friction, not a marketing-page spectacle.

## 4. What NOT to build yet

- No Sanity client, no schema files, no CMS setup — Phase 2.
- No fetch to the AI Job Finder App — Phase 3.
- No contact form backend — a `mailto:` link or simple external form service is enough for now.

## 5. Why mock data first

Building against typed mock data lets the entire frontend — layout, components, motion, responsiveness — get built and reviewed without Sanity's schema/GROQ/Portable Text learning curve blocking progress. Because `lib/content/index.ts` is the only place that changes in Phase 2, none of the work done here gets thrown away; it's a data-source swap, not a rebuild.

## 6. Deployment & Environment

- **Host:** Vercel — same as your other frontends, and it's what ISR/on-demand revalidation (Phase 2) will need anyway.
- **Node version:** verify Next.js 16's current runtime requirement when scaffolding, then pin the exact chosen LTS release in `.nvmrc` and declare its compatible major in `package.json#engines`. Local development, CI, and Vercel must use that pinned major; upgrades are explicit changes.
- **Package manager:** `npm`, matching the `create-next-app` default used in §1. This app doesn't need to share a package manager choice with the Tailpoint/Job Finder monorepo — it's a fully separate repo.
- **Dependency versions:** use exact versions in `package.json` and commit `package-lock.json`. Review and apply upgrades deliberately, especially Next.js security patches.
- **Build commands:** `npm run build` / `npm run start` (Vercel runs these automatically on deploy — no custom config needed for a standard Next.js app).
- **Preview deployments:** expected on — every PR/branch push gets its own preview URL via Vercel's Git integration. Use these to review before merging to the branch Vercel treats as production.

## 7. Analytics & Privacy

**Decision: no analytics in Phase 1.** Nothing to configure, nothing to disclose, no cookie/consent banner needed for a static informational site. Revisit only if you have a real reason to want traffic data — if so, prefer a privacy-conscious, cookieless option (e.g. Vercel Analytics or Plausible) over anything that requires a consent banner.
