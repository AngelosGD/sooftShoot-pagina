# soofShoot landing page — Astro + Tailwind v4

Dark landing page for soofShoot screen-capture app. Attio/Resend-style minimal dark: deep blue-black + single emerald accent, capsule nav, ambient motion, Space Grotesk. Copy is Spanish (rioplatense) — **never change existing copy**.

## Stack
- Astro 7.x
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` — **no** `tailwind.config.*`)
- `@tailwindcss/vite` plugin (not PostCSS)
- Fonts via Google Fonts in `Layout.astro`: **Space Grotesk** (sans/display) + Geist Mono

## Commands
| Command | Effect |
|---|---|
| `npm run dev` | Astro dev server |
| `npm run build` | Static build → `dist/` (this is the only check; no test/lint setup) |
| `npm run preview` | Preview production build locally |

## Design tokens (`src/styles/globals.css`)
| Variable | Value |
|---|---|
| `--color-background` | `#07070a` (never pure #000) |
| `--color-foreground` | `#f4f4f5` |
| `--color-muted` | `#a1a1aa` |
| `--color-surface` | `#101015` |
| `--color-border` | `#26262e` |
| `--color-accent` | `#34d399` (emerald-400) |

Accent rules: ONE emerald accent, used sparingly (eyebrow dots, num tags, marquee dots, icon hover, CTA glow, nav underline, selection/focus). Hairline borders use `rgb(255 255 255 / .06–.08)`, not `border-border`. Shape system: pills for buttons/nav-chips, `1.25rem` radius for cards — don't mix.

## Structure
| Path | Purpose |
|---|---|
| `src/pages/index.astro` | Whole landing page (all sections + scripts inline) |
| `src/layouts/Layout.astro` | Dark layout + fonts + `.grain` fixed film-grain overlay |
| `src/styles/globals.css` | Tokens + ALL component CSS (`.orb*`, `.dot-grid`, `.marquee-*`, `.nav-*`, `.bento-*`, `.spot-card`, `.eyebrow`, `.hero-e`, `.reveal`) |

## Sections (index.astro)
1. **Capsule nav** — floating glass pill (`max-w-3xl rounded-full`); `#nav-sentinel` feeds an IntersectionObserver toggling `.nav-scrolled` (denser bg + shadow + h shrink). Center links hidden on mobile.
2. **Centered hero** — `.dot-grid` masked layer + `.orb-layer` with two drifting orbs (emerald top-left, neutral bottom-right); staggered entrance via `.hero-e`.
3. **Marquee strip** — the 5 mono capability pills scroll infinitely (two duplicated `.marquee-group`s; pause on hover; edge fade mask).
4. **Features bento** — 12-col: Edición completa `lg:col-span-7` (text+placeholder split) + Mockups `lg:col-span-5` (both with `.shot-placeholder` viewfinder slots), then three numbered cards `lg:col-span-4` (`.num-tag`, no icons), then clickable "100% gratis" banner `lg:col-span-12`.
5. **Download** — centered, `.pulse-orb` breathing glow behind pill buttons.
6. **Footer** — giant `.footer-mark` watermark + bottom bar (logo, ©, links).

## Interaction & animation system (no libraries)
- **Scroll-reveal**: `.reveal` → IO adds `.visible`; stagger via inline `style="--reveal-delay:Xms"`.
- **Spotlight cards**: `.spot-card::before` radial gradient at `--mx/--my`; a `pointermove` listener writes those vars (only when `hover: hover` and not reduced motion).
- **Ambient**: orbs loop via keyframes; the whole `.orb-layer` parallaxes on scroll only inside `@supports (animation-timeline: scroll())`. Never position orbs with Tailwind transform utilities (keyframes own `transform`) — use inset/negative margins.
- **Buttons**: lift `-translate-y-0.5` + emerald-tinted glow + arrow nudge; press `active:scale-[0.97]`.
- **Reduced motion**: CSS disables hero/reveal/orbs/marquee AND JS short-circuits reveal observer + spotlight binder. Keep both sides in sync.
- No scroll listeners anywhere — nav + reveals are IntersectionObserver-driven by design.

## Gotchas
- `html { scroll-padding-top: 7rem }` exists because of the floating nav; keep it for anchors.
- Screenshot placeholders: search for `TODO: reemplazar por captura real` in index.astro.
- Marquee needs BOTH groups identical or the `-50%` translate loop jumps.
