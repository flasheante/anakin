<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ANAKIN website — project rules

Official site of ANAKIN (rock/punk/funk/psicodelia, Mendoza). Concept: "a 1997 underground band page that somehow still works perfectly in 2026". The full brief is the source of truth for design decisions; this file keeps the rules that matter when editing.

## Content lives in `src/data/`, never in components
- `shows.ts`, `releases.ts`, `members.ts`, `photos.ts`: typed by `src/data/types.ts`.
- `social.ts`: every external link and the booking email. Empty string = rendered as "SOON".
- `site.ts`: domain (`NEXT_PUBLIC_SITE_URL`), title, description, nav, band photo.
- Do not hardcode dates, links or names in components.

## Shows
- "Next show" and past/future are computed by `src/lib/shows.ts` (`getNextShow`, `isPastShow`) in the `America/Argentina/Mendoza` zone. Never hand-write "next show".
- Past shows stay in `shows.ts`; they render as the archive.
- Pages revalidate hourly (`revalidate = 3600` in the root layout) so dates flip without a deploy.
- Tests: `npm test` (Vitest). Keep them green when touching date logic.

## Design rules
- Tokens in `src/app/globals.css` (`@theme`): ink, coal, ash, dust, paper, blood, yolk, acid. No gradients, glassmorphism, soft shadows or rounded corners in UI.
- Fonts: VT323 (`font-pixel` / `.pixel`) only for logo, headings, dates, labels. Body copy uses the system Verdana/Tahoma stack.
- Effects live in `src/styles/retro.css`. Glitch only on logo/hero/decoration. Everything animated must stop under `prefers-reduced-motion`; heavy effects are reduced under 768px.
- Photos: never edit the originals. The photocopy look is CSS (`.photocopy`); the lightbox shows the untouched file.
- Decorative elements get `aria-hidden`. Keep visible focus, skip link, alt text, and one `h1` per page.
- Retro, not parody: no Comic Sans, no everything-blinks.

## Metadata
- Next merges metadata shallowly: inner pages must use `pageMetadata()` from `src/lib/metadata.ts` or they lose Open Graph images.
- Logo: the original JPEG lives in `src/assets/source/logo-original.jpg`. `npm run logo` cuts it out to `public/images/logo.png`; `npm run icons` builds favicon.ico, icon.png and apple-icon.png from it (plus the pixel cursors). Never hand-edit the generated files.
