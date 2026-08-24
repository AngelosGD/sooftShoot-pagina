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
| Variable | Value (light → dark) |
|---|---|
| `--background` | `#fdfdfc` → `#07070a` |
| `--foreground` | `#0a0a0f` → `#f4f4f5` |
| `--muted` | `#71717a` → `#a1a1aa` |
| `--surface` | `#ffffff` → `#101015` |
| `--border` | `#e4e4e7` → `#26262e` |
| `--accent` | `#059669` → `#34d399` |
| `--accent-rgb` | `5 150 105` → `52 211 153` |

Mapped to Tailwind via `@theme inline { --color-* : var(--*) }`. Light is `:root`, dark is `html.dark`. All derived tokens (`--hairline`, `--wash`, `--nav-bg`, `--card-bg`, `--grid-dot`, `--orb-b-inner`, `--mark`, etc.) switch automatically — don't hardcode `rgb(255 255 255 / …)` or `border-white/*`, use those vars or `bg-[var(--wash)]`.

Accent rules: ONE emerald accent, used sparingly (eyebrow dots, num tags, marquee dots, icon hover, CTA glow, nav underline, selection/focus). Shape system: pills for buttons/nav-chips, `1.25rem` radius for cards — don't mix.

## Structure
| Path | Purpose |
|---|---|
| `src/pages/index.astro` | Whole landing page (all sections + scripts inline) |
| `src/layouts/Layout.astro` | Layout + fonts + `.grain` overlay + inline theme init script (`localStorage` + `prefers-color-scheme`) |
| `src/styles/globals.css` | Tokens + ALL component CSS (`.orb*`, `.dot-grid`, `.marquee-*`, `.nav-*`, `.bento-*`, `.spot-card`, `.eyebrow`, `.hero-e`, `.reveal`) |
| `public/logosintexto.png` | Brand mark (493×475) — used via `<img class="brand-mark">`, inverted in dark via `filter: invert(1)` |

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
- Theme: `html.dark` toggled by `#theme-toggle` (`Layout.astro` inline script prevents FOUC). Light/dark tokens are in `:root` / `html.dark`; derived vars follow automatically — never hardcode dark-only `rgb(255 255 255 / …)` values.
