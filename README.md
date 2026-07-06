# Aura Operator

An interactive cyber-operator portfolio for Chandan Singh, built as a mission console with a command terminal, ATC-style capability topology, Three.js interface lab, project dossiers, certifications, and Medium dispatches.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## Features

- Interactive command terminal
- ATC-style cyber capability topology
- Three.js frontend interface lab
- Project case-file dossiers
- Medium blog dispatch section
- Certification filtering
- Responsive, mobile-first tactical UI

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4, Framer Motion, Three.js
- **Language:** TypeScript
- **Package Manager:** Bun
- **Deployment:** Vercel

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
