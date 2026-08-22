# Portfolio Site — Design Direction

> **Source of truth:** this doc is the only place color tokens, typography, and motion rules are defined. `requirements.md`, `prd.md`, and `README.md` reference this doc by name and never restate specific hex values, font names, or token names — if any of them appear to conflict with what's here, this doc wins and the other should be corrected to match.

Dark, textured, single-page portfolio — noisy film-grain background over a near-black palette, one warm accent color for action. This direction is specified directly (colors below are fixed, not proposals), so this doc focuses on making the rest — type, layout, texture, motion — distinctive enough that the dark-bg-plus-accent combination doesn't read as a generic template.

## 1. Concept

The feeling this should produce: **quiet confidence, tactile and a little cinematic** — closer to a film credit sequence than a SaaS marketing page. The grain texture is doing real work here: it's what keeps a dark, minimal palette from reading flat or stock. Everything else (type, layout, motion) should support that tactile feeling rather than compete with it.

**Signature element:** the noise/grain layer itself, applied consistently as a fixed, page-wide texture — not just a hero decoration. It's subtle enough to be felt rather than noticed, and it's the one visual signature carried across every section, so the site reads as one considered surface rather than a stack of separate blocks.

## 2. Color Tokens

| Token | Hex | Use |
|---|---|---|
| `bg-main` | `#212121` | Page background |
| `bg-surface` | `#272727` | Cards, section panels, raised surfaces |
| `accent` | `#DA5921` | Buttons, links, active states, the one warm note in an otherwise dark palette |
| `accent-foreground` | `#000000` | Text placed on an `accent` fill; required for AA contrast at normal text sizes |
| `text-primary` | `#EDEDE8` | Headings, primary body text |
| `text-muted` | `#9B9B95` | Secondary text, captions, meta info (dates, location) |
| `border` | `#3A3A38` | Hairline dividers, card borders — barely visible, just enough to separate surfaces |

Warm off-white (`text-primary`) rather than pure white — pure white on `#212121` is harsh; a slightly warm, slightly desaturated white sits better with the orange accent and feels less like a default dark-mode toggle.

## 3. Typography

- **Display:** `Sora` — geometric, confident, a little unusual without being decorative. Used for name/section headers only, set large and used with restraint (a handful of instances per page, not every label).
- **Body:** `Inter` — long-form project write-ups and the Journey narrative need to read easily; this stays out of the way.
- **Mono/meta:** `JetBrains Mono` — dates, location, stack tags, "Work" index numbers if used. Reinforces the slightly technical, credits-sequence feeling in small doses (a role label, a year, a tech tag) rather than as decoration.

## 4. The Grain/Noise Treatment

Applied as a fixed, full-viewport overlay sitting above `bg-main` but below all content — same layer everywhere, one implementation, not re-generated per section.

```css
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.05; /* subtle — should be felt, not read as visual noise */
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;base64,..."); /* SVG feTurbulence, tiled */
}
```

Generate the texture with an SVG `feTurbulence` filter (baseFrequency ~0.8–0.9, tiled as a small repeating pattern) rather than a shipped raster image — keeps the asset tiny and lets you tune the grain's coarseness in code. Keep opacity low (0.04–0.06); the point is texture on the eye, not a visibly "grainy photo" effect.

If Framer Motion is used for anything with the grain layer, keep it to a very slow, barely-perceptible drift (a few pixels over many seconds) rather than a fast animated static effect — fast noise animation reads as glitchy rather than filmic.

## 5. Layout

Single scrolling page with anchor-linked nav — same shape you flagged as effective when we looked at the reference site: **Intro · Work · Journey · Skills · Contact**, with resume/GitHub/LinkedIn/email as persistent links (header or footer, not buried). This structural pattern is common for good reason for a portfolio (skimmable top to bottom); the distinctiveness here should come from the grain treatment, type, and how the Journey section is written — not from inventing an unusual nav pattern for its own sake.

```
┌───────────────────────────────────────────┐
│ Praise.            Work  Journey  Skills   │ <- Sora, text-primary, sticky
│                              [Resume →]    │ <- accent-colored button
├───────────────────────────────────────────┤
│                                             │
│   Full-stack developer with a               │ <- Sora, large, hero statement
│   journalism background.                     │
│                                             │
│   [View work]  [Get in touch]               │ <- primary = accent fill, secondary = outline
│                                             │
├───────────────────────────────────────────┤
│ Work                                        │
│ ┌─────────────────┐ ┌─────────────────┐    │
│ │ bg-surface card  │ │ bg-surface card  │    │ <- project cards, hairline border
│ │ Tailpoint        │ │ AI Job Finder    │    │
│ │ NestJS·Next.js   │ │ NestJS·Prisma    │    │ <- JetBrains Mono tag row
│ └─────────────────┘ └─────────────────┘    │
├───────────────────────────────────────────┤
│ Journey                                     │ <- narrative, body serif-free, generous line height
├───────────────────────────────────────────┤
│ Skills          Contact                     │
└───────────────────────────────────────────┘
```

Cards (`bg-surface` on `bg-main`) use a hairline `border` and modest radius (6–8px) — enough to lift them from the background without looking like heavy dark-mode UI chrome.

## 6. Motion (Framer Motion)

- **Page load:** hero text and nav fade/slide in on a short staggered sequence — one orchestrated moment, not per-element scroll triggers everywhere.
- **Scroll reveals:** each section fades/slides in once, on first entry into view — restrained (8–12px translate, 200–300ms), never bouncy.
- **Project cards:** on hover, a soft `accent`-tinted glow at low opacity behind the card, plus a subtle lift (2–4px translateY). This is the one place motion gets a little more expressive, since it's the primary click target on the page.
- **Buttons:** simple color/opacity transition on hover/focus — no motion needed here, the accent color already does the work.
- Respect `prefers-reduced-motion` — disable translate/stagger effects, keep opacity fades only.

## 7. Accessibility

- `accent` (#DA5921) does not reach AA contrast against `bg-main` at normal text sizes (4.17:1). Use it as a control fill with `accent-foreground` text, for focus rings and other non-text indicators, or for large decorative text—not as small body/link text on a dark surface.
- `text-muted` on `bg-surface` needs a contrast check too — dark-on-dark palettes are the easiest place to accidentally fail AA.
- Visible focus rings in `accent`, consistent across nav links, buttons, and card hover targets.
- Grain overlay must have `pointer-events: none` and never sit above interactive elements in a way that affects click targets.

## 8. What to Avoid

- Don't let the grain effect become a moving/flashing texture — keep it near-static, low-opacity, and slow if animated at all; flashing dark textures are both a poor look and a motion-sensitivity concern.
- Don't use the `accent` orange for large background fills — it's a signal color (buttons, active states), not a surface color; overusing it flattens its meaning.
- Don't add more than one dark surface tone beyond `bg-main`/`bg-surface` — resist the urge to add a third "darker" or "lighter" gray; two tones plus one accent is enough structure for this palette to stay legible.
