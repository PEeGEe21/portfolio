# Portfolio Site — Requirements

> **Document map:** this doc is the source of truth for functional requirements, the content model, and acceptance criteria. Visual identity (colors, type, motion) lives in `design.md` — reference it by name here rather than restating hex values or font names, so the two docs can't drift apart. Product goals and phasing live in `prd.md`. Setup/build steps live in `README.md`.

## 1. Overview

A personal portfolio site — projects, background, skills, contact. Own application, own repo/deploy, no shared codebase with Tailpoint or the AI Job Finder App. This document covers the **frontend build**, starting with mock data, with the CMS and cross-app data pull added in later phases.

## 2. Build Order & Phasing

- **Phase 1 (this build):** Frontend fully built against local mock/typed data. No backend, no CMS yet.
- **Phase 2:** Swap mock data for Sanity as the real content source.
- **Phase 3:** Optional read-only pull of live data from the AI Job Finder App's API (e.g. "currently exploring roles in X").

Each phase should be addable without rewriting the phase before it — see §5 on the data layer.

## 3. Core Stack

- **Next.js 16** (App Router, Turbopack default) + **React 19**
- **TypeScript** throughout
- **Tailwind CSS** — implements the color and type tokens defined in `design.md`
- **Framer Motion** — for the signature moments defined in `design.md` (page-load reveal, hover micro-interactions), used deliberately and sparingly, not on every element
- **next/font** — self-hosted, typefaces per `design.md`
- **next/image** — project screenshots/covers

## 4. Functional Requirements (Phase 1, mock-data build)

- Hero/intro section, Work section, Journey narrative, Skills grouped by category, Contact section.
- All content sourced from a local **typed mock data module**, not hardcoded directly into page components — this keeps the page components identical when Phase 2 swaps in Sanity.
- Fully responsive, keyboard-navigable, visible focus states.
- Static generation (SSG) — no server-side data fetching needed yet since data is local.

## 5. Data Layer Requirement (important for later phases)

Define a thin content-fetching interface now, even though it only reads local mock data today:

```ts
// lib/content/index.ts
export async function getProjects(): Promise<Project[]> { ... }
export async function getProject(slug: string): Promise<Project | null> { ... }
export async function getProfile(): Promise<Profile> { ... }
```

Page components call these functions — they never import the mock data file directly. When Sanity is added in Phase 2, only the internals change (local array → Sanity client query); no page or component code needs to change. Same swappable-provider instinct as HotelOS's `LockProvider`, scoped down to a few functions since the surface area is small.

Mock data shapes should already match the planned Sanity schema (Project, Profile, SkillGroup) so the Phase 2 migration is a data-source swap, not a redesign.

## 6. Project Content Model & Case Study Routing

**Decision: case studies are separate routes (`/work/[slug]`), not expanded in-page sections.** Reasoning:
- They need to be individually shareable — a recruiter or hiring manager should be able to get a direct link to one project, not "scroll to the Work section and expand the third card."
- Each case study gets its own page metadata (title, description, OG image) — see §8 — which an in-page accordion can't provide.
- The homepage Work section stays a lightweight summary (card grid); depth lives on the dedicated route. This matches the PRD's split between a recruiter's quick skim and a hiring manager's deeper read.

**Every `Project` requires the following fields.** A card with just a name, a stack-tag row, and a screenshot is not enough — the whole point of a case-study page is the reasoning, not the visual.

| Field | Type | Required? | Notes |
|---|---|---|---|
| `slug` | string | Required | URL identifier, e.g. `tailpoint` |
| `title` | string | Required | |
| `featured` | boolean | Required | Featured projects sort ahead of the rest on the homepage |
| `summary` | string | Required | One or two sentences, used on the homepage card |
| `status` | enum | Required | `shipped` \| `in-progress` \| `archived` — see §9 for how each renders |
| `problem` | rich text | Required | What problem the project solves and for whom |
| `role` | string | Required | Praise's specific role/ownership, not just "built the app" |
| `stack` | string[] | Required | Tags shown on both card and case study |
| `constraints` | rich text | Required | Real constraints faced — team size, timeline, legacy systems, compliance, whatever actually applied |
| `decisions` | rich text | Required | The 1–3 decisions worth telling (e.g. the `LockProvider` pattern, the automation dry-run API) — this is the section that differentiates a real case study from a portfolio-card cliché |
| `outcome` | rich text | Required | What happened as a result — even a modest, honest outcome beats a vague one |
| `screenshots` | image[] | Optional | See §9 for empty-state handling |
| `repoUrl` | url | Optional | See §9 |
| `liveUrl` | url | Optional | See §9 |

## 7. Acceptance Criteria

- **Lighthouse (production build, Vercel-deployed):** Performance ≥ 90 desktop / ≥ 80 mobile, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Re-check after Framer Motion and real images are added — motion and unoptimized images are the most likely regressions.
- **Viewport/browser baseline:** responsive from 375px (small mobile) to 1920px (desktop). Last 2 versions of Chrome, Firefox, Safari, and Edge. No IE/legacy support.
- **Image sizes:** served images (via `next/image`) capped at 200KB each after optimization; source assets uploaded at a reasonable resolution (no multi-MB raw screenshots committed to the repo).
- **Keyboard navigation:** every interactive element (nav links, buttons, project cards, contact links) reachable via Tab in a logical order; visible focus ring on all of them (see `design.md` §7); a skip-to-content link for keyboard users landing on the nav.
- **Reduced motion:** `prefers-reduced-motion` disables translate/stagger/hover-lift effects site-wide, keeping simple opacity fades only — per `design.md` §6.

## 8. SEO & Social Requirements

- **Page titles:** templated, e.g. `{Page} · Praise` for subpages, `Praise — Full-Stack Developer` (or similar) for the homepage.
- **Meta description:** unique per page — homepage description differs from each case study's description (pulled from that project's `summary` field).
- **Canonical URL:** set on every page, including case study routes.
- **Open Graph image:** one default site-wide OG image for the homepage; case study pages use a project screenshot if available (§9 covers the fallback if not).
- **Favicon:** standard favicon set (ico + apple-touch-icon + any modern sizes Next's metadata API expects).
- **Sitemap & robots:** `sitemap.xml` generated (Next's built-in sitemap route) including all case study routes; `robots.txt` allowing indexing (this is a site that wants to be found).
- **Structured data:** JSON-LD `Person`/`ProfilePage` schema on the homepage (name, role, sameAs links to GitHub/LinkedIn) so search engines and any AI-driven surfaces can identify the site correctly.

## 9. Empty & Missing Content Behavior

- **No screenshots for a project:** render a plain, on-brand placeholder panel (using `bg-surface` and the grain texture, not a broken-image icon or a stock photo) rather than leaving a blank gap.
- **No `repoUrl` or `liveUrl`:** hide that specific link/button entirely — never show a disabled or dead link.
- **`status: archived` or `in-progress`:** shown with a small status label on both the card and the case study page (e.g. "In progress" badge) so it reads as intentional, not stale or abandoned.
- **Unpublished case study** (exists in content but not ready to show): excluded entirely from `getProjects()` output and its route returns a 404 — not listed anywhere, not a "coming soon" placeholder card.

## 10. Non-Functional Requirements

- **Simplicity first** — this is a personal site, not a product; avoid infrastructure with no near-term payoff (no backend, no auth, no database in Phase 1).
- **Fast** — SSG output, minimal JS shipped, animation used only where it earns its place (see §7 for the measurable target).
- **Accessible** — see §7 for concrete acceptance criteria.

## 11. Content Readiness Checklist

Content is a Phase 1 dependency, not placeholder work to defer until after the layout. Before a page is considered ready for visual review:

### Profile and site-wide content

- [ ] Final display name, role line, location/time-zone wording, short bio, and contact email are approved.
- [ ] GitHub, LinkedIn, resume, and any other public profile URLs work and open the intended public pages.
- [ ] The resume file is current, has a stable public filename, and contains no private contact details that should not be published.
- [ ] Hero copy states the kind of work Praise does and the value offered; it does not rely on a generic “I build digital experiences” claim.
- [ ] Skills reflect demonstrated capability and are grouped meaningfully; aspirational tools are not presented as established expertise.

### Journey narrative

- [ ] The narrative covers the story beats below and has been reviewed in Praise's own voice.
- [ ] At least one concrete example connects the earlier career to present-day engineering practice.
- [ ] The closing makes the current direction clear: the problems, teams, or roles Praise wants to contribute to next.
- [ ] The section is concise enough to scan on the homepage (target: 180–300 words); supporting detail belongs in project case studies or the resume.

Use these story beats rather than presenting the Journey as a chronology of job titles:

1. **Origin:** an interest in computers that began in school and developed into studying computer science.
2. **Growth:** the progression from learning programming fundamentals to understanding complete product systems.
3. **Full-stack direction:** the motivation to work across interfaces, APIs, data, permissions, and infrastructure rather than one isolated layer.
4. **Evidence of growth:** how that direction shows up in real work such as Tailpoint or HotelOS, including one meaningful technical or product decision.
5. **Present direction:** the kinds of full-stack problems Praise now solves and the value brought to a team.

Drafting frame (not publish-ready copy):

> My interest in computers began in school and led me to study computer science. As I moved from learning the fundamentals to building real products, I became interested in how the interface, backend, data, and infrastructure work together. Since then, projects such as **[choose one or two]** have pushed me to make decisions across the complete product. **[Add one specific decision and its effect.]** Today I build full-stack systems by understanding the real constraint, communicating the trade-off, and shipping something people can use. **[Close with the kinds of problems or opportunities sought next.]**

### Per-project case studies

- [ ] Every required field in §6 contains real, project-specific content; no lorem ipsum or generic claims remain.
- [ ] Praise's individual ownership is distinguishable from team accomplishments.
- [ ] Each case study includes at least one constraint and one consequential decision, with the trade-off explained.
- [ ] Outcomes use verifiable numbers where available. When metrics do not exist, describe an honest qualitative result without inventing impact.
- [ ] Screenshots contain no credentials, personal data, customer records, or confidential internal information and include useful alt text.
- [ ] Repository and live-site links are public and healthy; unavailable links are omitted according to §9.
- [ ] The project summary works independently as homepage card copy and as the basis of its meta description.
- [ ] Project status and dates are current, and permission to discuss client or employer work has been confirmed.

### Final editorial pass

- [ ] Claims, dates, product names, and technology names are consistent with the resume and linked profiles.
- [ ] Copy has been checked for spelling, unsupported superlatives, repeated phrases, and unexplained jargon.
- [ ] Link text and image alt text make sense without surrounding visual context.
- [ ] A recruiter can understand role fit from the homepage in under one minute; a technical reader can find concrete reasoning in each case study.

## 12. Explicitly Out of Scope (Phase 1)

- Sanity/CMS setup (Phase 2)
- Any live fetch from the AI Job Finder App (Phase 3)
- Contact form backend (mailto/simple link is enough for now)
- Admin/editing UI of any kind
- Analytics (see `README.md` §7 — explicitly deferred, not silently omitted)
