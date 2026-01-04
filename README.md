# AuraSec Folio

A cutting-edge, hacker-themed portfolio website built for cybersecurity professionals. Features advanced Matrix-style animations, interactive terminal interface, and modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## Features

- 🔒 Cybersecurity/hacker-themed design
- ⚡ Interactive terminal component with typing animation
- 🎯 Smooth scroll navigation
- 📊 Real-time stats from GitHub & TryHackMe profiles
- 🎨 Framer Motion animations throughout
- 📱 Fully responsive (mobile-first)
- 🚀 Deployed on Vercel

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
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
