# soofShoot landing page — Astro + Tailwind v4

Dark monochrome landing page for soofShoot screen-capture app.

## Stack
- Astro 7.x
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` — **no** `tailwind.config.*`)
- `@tailwindcss/vite` plugin (not PostCSS)
- Geist / Geist Mono from Google Fonts

## Commands
| Command | Effect |
|---|---|
| `npm run dev` | Astro dev server |
| `npm run build` | Static build → `dist/` |
| `npm run preview` | Preview production build locally |

## Structure
| Path | Purpose |
|---|---|
| `src/pages/index.astro` | Single landing page |
| `src/layouts/Layout.astro` | Dark layout (``<html class="dark">``, Geist font) |
| `src/styles/globals.css` | Tailwind theme variables (zinc palette) |

## Color palette (`globals.css`)
| Variable | Value |
|---|---|
| `--color-background` | `#09090b` (zinc-950) |
| `--color-foreground` | `#fafafa` (zinc-50) |
| `--color-muted` | `#a1a1aa` (zinc-400) |
| `--color-surface` | `#18181b` (zinc-900) |
| `--color-border` | `#27272a` (zinc-800) |

## Sections
1. **Navbar** — fixed top, logo + Funciones / Descargar / GitHub
2. **Hero** — staggered entrance animation (`heroIn` keyframe), subtitle, description, 5 feature pills, CTA buttons
3. **Features** — 6 cards (grid: 1→2→3 col), scroll-reveal via IntersectionObserver, scale hover
4. **Download** — centered, Windows button + macOS (disabled, "próximamente")
5. **Footer** — logo, copyright, GitHub + Contacto links

## Animations
- **Hero**: `heroIn` keyframe — fade + translateY(20px) → 0, 0.8s cubic-bezier, staggered via `animation-delay` (0 / 0.12 / 0.24 / 0.36 / 0.48s)
- **Cards**: `.reveal` class — IntersectionObserver adds `.visible` (opacity 1 + translateY 0)
- **Hover**: `scale-[1.02]` with `duration-500 ease-out`, cards also dim border/surface on hover
- **Buttons**: `scale-[1.03]` + shadow glow (`hover:shadow-[0_0_28px_-4px_rgba(255,255,255,0.12)]`)

## Logo SVG
Two rounded boxes connected by a line with "SS" centered, used inline in navbar and footer.
