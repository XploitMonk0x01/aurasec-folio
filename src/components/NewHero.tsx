'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ParticleField } from '@/components/ParticleField'
import { ArrowRight, Fingerprint, Radar, ShieldCheck, Layers3 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Marquee strip tags ────────────────────────────────────────────────────────
const TAGS = [
  'Cybersecurity', 'DFIR', 'OSINT', 'Penetration Testing',
  'Web Dev', 'React', 'Next.js', 'Forensics',
  'CTF', 'Python', 'System Design', 'UI/UX',
]

// ── Floating stats ────────────────────────────────────────────────────────────
const STATS = [
  { value: '3+', label: 'Years\nBuilding', color: 'from-violet-500 to-purple-600' },
  { value: 'DFIR', label: 'Core\nSpecialty', color: 'from-cyan-500 to-teal-600' },
  { value: '∞', label: 'Forensic\nCuriosity', color: 'from-violet-400 to-cyan-500' },
]

// ── Practice tiles ─────────────────────────────────────────────────────────────
const TILES = [
  { label: 'Forensics', tag: 'DFIR', detail: 'Timeline & evidence-first case review', icon: Fingerprint, accent: '#7C3AED' },
  { label: 'Intelligence', tag: 'OSINT', detail: 'Entity traces, signals & correlation', icon: Radar, accent: '#06B6D4' },
  { label: 'Security', tag: 'VAPT', detail: 'Recon, validation & risk framing', icon: ShieldCheck, accent: '#A855F7' },
  { label: 'Interface', tag: 'UI/UX', detail: 'Reusable surfaces that earn trust', icon: Layers3, accent: '#22D3EE' },
]

// ── Word-split text for GSAP ───────────────────────────────────────────────────
function RevealWord({ word, className }: { word: string; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className ?? ''}`}>
      <span className="reveal-word inline-block translate-y-full opacity-0">{word}</span>
    </span>
  )
}

export function NewHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const orbA = useRef<HTMLDivElement>(null)
  const orbB = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Framer scroll binding
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const rawOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20, mass: 0.8 })
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // 1. Orb entrance
      tl.fromTo([orbA.current, orbB.current],
        { scale: 0.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.4, stagger: 0.3, ease: 'power4.out' },
        0
      )


      // 2. Title words reveal — sweeping upward
      tl.to('.reveal-word',
        { y: '0%', opacity: 1, duration: 1.4, stagger: 0.06 },
        0.4
      )

      // 4. Subtitle + desc
      tl.fromTo('.hero-sub',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12 },
        0.9
      )

      // 5. Tiles
      tl.fromTo('.hero-tile',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'back.out(1.4)' },
        1.1
      )

      // 6. Stats
      tl.fromTo('.hero-stat',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
        1.1
      )

      // 7. CTAs
      tl.fromTo('.hero-cta',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(2)' },
        1.4
      )

      // Scroll-driven title push
      gsap.to(titleRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // GSAP mouse parallax on orbs
  useEffect(() => {
    if (!sectionRef.current) return
    const qa = gsap.quickTo(orbA.current, 'x', { duration: 2, ease: 'power3.out' })
    const qaY = gsap.quickTo(orbA.current, 'y', { duration: 2, ease: 'power3.out' })
    const qb = gsap.quickTo(orbB.current, 'x', { duration: 2.5, ease: 'power3.out' })
    const qbY = gsap.quickTo(orbB.current, 'y', { duration: 2.5, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 60
      const ny = (e.clientY / window.innerHeight - 0.5) * 40
      qa(-nx * 0.6); qaY(-ny * 0.4)
      qb(nx * 0.4); qbY(ny * 0.3)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      style={{ opacity }}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-24 pt-32"
    >
      {/* ── Radial orbs (GSAP mouse parallax) ─────────────────────────── */}
      <div
        ref={orbA}
        className="animate-pulse-orb pointer-events-none absolute left-[-12%] top-[-8%] h-[700px] w-[700px] rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.38) 0%, transparent 70%)',
          willChange: 'transform, opacity',
        }}
        aria-hidden="true"
      />
      <div
        ref={orbB}
        className="animate-pulse-orb pointer-events-none absolute right-[-10%] top-[15%] h-[500px] w-[500px] rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.28) 0%, transparent 70%)',
          animationDelay: '2.5s',
          willChange: 'transform, opacity',
        }}
        aria-hidden="true"
      />

      {/* ── Canvas particle field ──────────────────────────────────────── */}
      <ParticleField />

      {/* ── Main two-column grid ──────────────────────────────────────── */}
      <motion.div
        style={{ y: yContent }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >


        <div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:gap-8 xl:gap-16">
          {/* ── Left: Giant title + desc + CTAs + tiles ─────────────── */}
          <div className="flex flex-col" ref={titleRef}>
            {/* Title */}
            <h1 className="text-[clamp(4.5rem,13vw,11rem)] font-bold leading-[0.85] tracking-[-0.04em] text-foreground">
              <span className="block">
                <RevealWord word="CHANDAN" />
              </span>
              <span className="block italic text-transparent" style={{
                WebkitTextStroke: '1px rgba(168,85,247,0.9)',
              }}>
                <RevealWord word="SINGH" />
              </span>
            </h1>

            {/* Divider line */}
            <div className="hero-sub mt-8 flex items-center gap-4 opacity-0">
              <span className="h-px flex-1 bg-gradient-to-r from-violet/60 via-teal/40 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper-muted">Portfolio 2026</span>
            </div>

            {/* Description */}
            <p className="hero-sub mt-7 max-w-2xl text-xl leading-9 text-paper-muted opacity-0">
              Building tools, shipping side projects, and{' '}
              <span className="text-foreground">playing with modern tech stacks</span>{' '}
              one project at a time.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                className="hero-cta inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet to-purple-600 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white opacity-0 shadow-lg transition-all"
                style={{ boxShadow: '0 8px 24px rgba(124,58,237,0.3)' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/chandansemwal/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta group inline-flex items-center gap-3 rounded-xl border border-white/10 px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-paper-muted opacity-0 backdrop-blur-sm transition-colors hover:border-violet/50 hover:text-paper"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Connect Linkedin
              </motion.a>
            </div>

            {/* Discipline tiles */}
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TILES.map((tile) => (
                <motion.article
                  key={tile.tag}
                  className="hero-tile group relative overflow-hidden rounded-xl border border-white/6 bg-white/3 p-4 opacity-0 backdrop-blur-sm"
                  style={{ ['--tile-accent' as string]: tile.accent, willChange: 'transform' }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.04, y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${tile.accent}22 0%, transparent 70%)` }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 0 1px ${tile.accent}44` }}
                  />
                  <tile.icon className="h-5 w-5 mb-3" style={{ color: tile.accent }} />
                  <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: tile.accent }}>{tile.tag}</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{tile.label}</div>
                  <div className="mt-1 text-[11px] leading-relaxed text-paper-muted">{tile.detail}</div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* ── Right: Stats + floating glass card ──────────────────── */}
          <div className="hidden flex-col justify-center gap-5 lg:flex">
            {/* Stats */}
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="hero-stat opacity-0"
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="void-glass group flex items-center gap-5 rounded-2xl p-5 transition-all hover:border-violet/30">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color}`}
                  >
                    <span className="text-2xl font-bold text-white">{s.value}</span>
                  </div>
                  <span className="whitespace-pre-line font-mono text-xs uppercase leading-relaxed tracking-widest text-paper-muted">
                    {s.label}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Floating editorial card — stable animate ref prevents restart */}
            <motion.div
              className="hero-stat mt-2 opacity-0"
              animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
              style={{ willChange: 'transform' }}
            >
              <div className="void-glass relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.18), transparent 60%)' }} />
                <div className="font-mono text-[10px] uppercase tracking-widest text-violet-bright">
                  Philosophy
                </div>
                <p className="mt-4 font-display text-2xl leading-tight text-foreground">
                  Build the interface like{' '}
                  <span className="italic text-teal-bright">people depend on it.</span>
                </p>
                <p className="mt-3 text-sm leading-7 text-paper-muted">
                  Loading states, empty views, responsive behavior — every edge case is part of the product.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-violet/50 to-transparent" />
                  <span className="font-mono text-[10px] text-paper-muted">Parul University, 3rd Year</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Marquee strip ──────────────────────────────────────────── */}
        <div className="hero-sub mt-16 overflow-hidden border-y border-white/6 py-3 opacity-0">
          <div className="flex animate-marquee gap-8 whitespace-nowrap" aria-hidden="true">
            {[...TAGS, ...TAGS].map((tag, i) => (
              <span key={i} className="font-mono text-[11px] uppercase tracking-widest text-paper-muted/50">
                {tag}
                <span className="mx-4 text-violet/40">◆</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll cue ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 md:flex"
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-violet/60 to-violet animate-bounce" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-paper-muted/60">Scroll</span>
      </motion.div>
    </motion.section>
  )
}
