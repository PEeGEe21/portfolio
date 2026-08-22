# Portfolio Site — PRD

> **Document map:** this doc is the source of truth for product goals, phasing, and success criteria. Functional requirements, the project content model, and acceptance criteria live in `requirements.md`. Visual identity lives in `design.md`. Setup/build steps live in `README.md`.

## 1. Problem

Recruiters, hiring managers, and potential clients need a fast, credible way to evaluate Praise's work. A static resume or a GitHub profile alone doesn't tell the story behind the projects (why decisions were made, what problems were solved) or the unusual background (Mass Communication → journalism/education → software development) that makes the profile distinctive.

## 2. Goal

Ship a fast, distinctive personal portfolio site that a recruiter can skim in under a minute and a technical evaluator can go deeper into (real project decisions, real stack choices) without needing a live demo or a call.

## 3. Non-Goals

- Not a CMS for any other product (ruled out earlier — see project history).
- Not the AI Job Finder App's admin surface, and not dependent on it in v1.
- Not a place to manage applications, leads, or any transactional data — informational/marketing site only.

## 4. Users & Jobs-to-be-Done

| User | Job to be done |
|---|---|
| Recruiter | Quickly confirm stack fit and seniority signal before a screening call |
| Hiring manager | Understand real decisions made on real projects, not just a tech-tag list |
| Potential client | Judge whether Praise can own an ambiguous problem end-to-end |
| Praise | Have one link to send that's always current and doesn't require remembering to edit a file |

## 5. Scope by Phase

**Phase 1 — Frontend, mock data (this build)**
- Hero, Work (homepage summary), Background/Journey, Skills, Contact sections, plus a dedicated `/work/[slug]` case study route per project — see `requirements.md` §6 for why case studies are separate routes rather than in-page expansions.
- Each project's case study covers problem, role, constraints, decisions, and outcome, not just a name and a stack-tag list — see `requirements.md` §6 for the full content model. This is what makes the "go deeper" job-to-be-done (§4) actually work.
- Built against local typed mock data behind a swappable content-fetching interface.
- Framer Motion for the signature interaction moments; Tailwind implementing the token system — both defined in `design.md`.

**Phase 2 — Sanity as content source**
- Real schema for Project, Profile, SkillGroup.
- Editing happens in Sanity Studio, not in code — solves the "forgot to update the file" problem directly.
- ISR/on-demand revalidation so publishing in Sanity updates the live site without a redeploy.

**Phase 3 — Live Job Finder App data (optional)**
- Read-only fetch of a small live signal (e.g. "currently exploring roles in X") from the Job Finder App's API, using its `shared-types` package.
- Must degrade gracefully — site renders fully even if this call fails or the Job Finder App is down.

## 6. Success Criteria

- Site loads fast and reads cleanly on mobile (this is where most recruiter first-glances happen).
- Updating a project write-up or bio line, once Phase 2 ships, takes under two minutes and requires no code deploy.
- The "Journey" narrative reads as a genuine differentiator, not a generic bullet list.

## 7. Risks / Open Questions

- Learning curve on Sanity (schema authoring, GROQ queries, Portable Text rendering) — mitigated by deferring it to Phase 2, after the frontend shape is already proven with mock data.
- If Phase 3's live data pull ever becomes load-bearing rather than a nice-to-have, that's a scope change worth revisiting deliberately, not something to slide into by default.