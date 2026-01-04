# AuraSec Folio

Personal portfolio built with Next.js (App Router) + Tailwind, using Bun for package management.

## Prerequisites

- Node.js (recommended: Node 20+)
- Bun (recommended)

## Getting Started

Install dependencies:

```bash
bun install
```

Run the dev server (Turbopack):

```bash
bun run dev
```

Open http://localhost:3000 (or the next available port if 3000 is in use).

## Scripts

```bash
bun run dev
bun run build
bun run start
bun run lint
```

## Where To Edit Content

- Main page layout/sections: `src/app/page.tsx`
- Projects list + links (GitHub / Live): `src/components/Projects.tsx`
- Certificates list: `src/components/Certificates.tsx`
- Navigation: `src/components/Navigation.tsx`
- Global styles: `src/app/globals.css`

## Hydration Notes (SSR)

If you add dynamic values, avoid rendering non-deterministic output during the initial render (e.g. `Math.random()`, `Date.now()`, locale-dependent formatting). Prefer generating those values in `useEffect()` after mount, or use `useId()` for stable IDs.

## Deploy

This is a standard Next.js app. You can deploy to Vercel or any platform that supports Next.js:

```bash
bun run build
bun run start
```
