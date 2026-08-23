# soofShoot landing page — Astro + Tailwind v4

Dark landing page for soofShoot screen-capture app. Linear/Raycast-style: monochrome + single cyan accent, bento grid, ambient glows. Copy is Spanish (rioplatense) — **never change existing copy**.

## Stack
- Astro 7.x
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` — **no** `tailwind.config.*`)
- `@tailwindcss/vite` plugin (not PostCSS)
- Geist / Geist Mono from Google Fonts (linked in `Layout.astro`)

## Commands
| Command | Effect |
|---|---|
| `npm run dev` | Astro dev server |
| `npm run build` | Static build → `dist/` (this is the only check; no test/lint setup) |
| `npm run preview` | Preview production build locally |

## Design tokens (`src/styles/globals.css`)
| Variable | Value |
|---|---|
| `--color-background` | `#09090b` (zinc-950) |
| `--color-foreground` | `#fafafa` |
| `--color-muted` | `#a1a1aa` |
| `--color-surface` | `#18181b` |
| `--color-border` | `#27272a` |
| `--color-accent` | `#38bdf8` (sky-400) |

Accent rules: ONE accent for the whole page, used sparingly (eyebrow dots, icon hover, CTA glow, nav underline, selection/focus rings). Hairline borders use `rgb(255 255 255 / .06)` utilities, not `border-border`.

## Structure
| Path | Purpose |
|---|---|
| `src/pages/index.astro` | Whole landing page (all sections + scripts inline) |
| `src/layouts/Layout.astro` | Dark layout (`<html class="dark">`, Geist fonts, theme-color meta) |
| `src/styles/globals.css` | Tokens + all component CSS (`.reveal`, `.glow`, `.nav-*`, `.bento-*`, `.hero-e`) |

## Sections (index.astro)
1. **Nav** — fixed `header#site-nav`; `#nav-sentinel` div before it feeds an IntersectionObserver that toggles `.nav-scrolled` (glass blur + h-16→h-14). Links use `.nav-link` (accent underline slide).
2. **Hero** — left-aligned, two `.glow` radial layers (accent top-left, neutral bottom-right), staggered entrance via `.hero-e` + inline `animation-delay`.
3. **Capability strip** — the 5 mono pills live here (NOT inside the hero), hairline top/bottom borders.
4. **Features bento** — 12-col asymmetric grid: Edición completa `lg:col-span-7` + Mockups `lg:col-span-5` (both with `.shot-placeholder` screenshot slots to replace with real captures), then three `lg:col-span-4`, then full-width "100% gratis" band.
5. **Download** — rounded panel (`rounded-3xl border-white/[0.06]`) with inner accent glow.
6. **Footer** — logo, copyright, GitHub/Contacto.

## Animation system (no libraries — vanilla CSS + IntersectionObserver)
- **Scroll-reveal**: `.reveal` → IntersectionObserver adds `.visible`; per-element stagger via inline `style="--reveal-delay:Xms"` (transition-delay reads the var).
- **Glows**: drift on scroll via `animation-timeline: scroll()` inside `@supports` — progressive enhancement only, static elsewhere. Never position glows with Tailwind transform utilities (the keyframes own `transform`); use inset/negative margins.
- **Hover**: buttons lift `-translate-y-0.5` + tinted glow + arrow nudge (`group-hover:`); cards lift via `.bento-card:hover` (translateY(-3px) + black shadow + faint accent glow).
- **Reduced motion**: `prefers-reduced-motion` disables hero/reveal/glow animations in CSS AND short-circuits the reveal observer in JS. Keep both in sync when editing.

## Gotchas
- No scroll listeners anywhere — nav state and reveals are IntersectionObserver-driven by design.
- `html { scroll-padding-top: 5.5rem }` exists because of the fixed nav; keep it when touching anchors.
- Screenshot placeholders: search for `TODO: reemplazar por captura real` in index.astro.
