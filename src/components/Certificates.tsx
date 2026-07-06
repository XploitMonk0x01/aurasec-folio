'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, BadgeCheck, BookOpen, Cpu, Zap, Network, Shield } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  { id: 'ALL', label: 'All Records' },
  { id: 'QUICK HEAL', label: 'Quick Heal' },
  { id: 'NETWORKING', label: 'Networking' },
  { id: 'API', label: 'API Security' },
  { id: 'HACKATHONS', label: 'Hackathons' },
  { id: 'UDEMY', label: 'Udemy' },
]

const CERTIFICATES = [
  { id: 1, title: 'Quick Heal Certified Digital Forensics Investigator', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2025', index: '01', featured: true },
  { id: 6, title: 'Quick Heal Certified VAPT Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2025', index: '06', featured: true },
  { id: 4, title: 'Certified Network Security Practitioner', issuer: 'The SecOps Group', category: 'NETWORKING', date: '2025', index: '04', featured: true },
  { id: 3, title: 'API Security Fundamentals', issuer: 'APIsec University', category: 'API', date: '2025', index: '03', featured: false },
  { id: 7, title: 'Quick Heal Certified MCIS Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2025', index: '07', featured: false },
  { id: 15, title: 'Quick Heal Certified Mobile App Penetration Testing Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2026', index: '12', featured: false },
  { id: 14, title: 'Quick Heal Certified Malware Essentials', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2026', index: '11', featured: false },
  { id: 8, title: 'Quick Heal Certified System & Security Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2024', index: '08', featured: false },
  { id: 9, title: 'Quick Heal Certified Network Security Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2024', index: '09', featured: false },
  { id: 10, title: 'Quick Heal Certified Cyber Security Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2024', index: '10', featured: false },
  { id: 2, title: 'Learn Ethical Hacking from Scratch', issuer: 'Udemy', category: 'UDEMY', date: '2023', index: '02', featured: false },
  { id: 5, title: 'The Complete Ethical Hacking Course', issuer: 'Udemy', category: 'UDEMY', date: '2024', index: '05', featured: false },
  { id: 11, title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', category: 'NETWORKING', date: '2024', index: '13', featured: false },
  { id: 12, title: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy', category: 'NETWORKING', date: '2024', index: '14', featured: false },
  { id: 13, title: 'Networking Basics', issuer: 'Cisco Networking Academy', category: 'NETWORKING', date: '2024', index: '15', featured: false },
]

const ACCENT: Record<string, string> = {
  'QUICK HEAL': '#7C3AED',
  'NETWORKING': '#06B6D4',
  'API': '#A855F7',
  'HACKATHONS': '#22D3EE',
  'UDEMY': '#8B5CF6',
  'ALL': '#7C3AED',
}

const CATEGORY_ICON: Record<string, React.ElementType> = {
  'QUICK HEAL': Shield,
  'NETWORKING': Network,
  'API': Zap,
  'HACKATHONS': Cpu,
  'UDEMY': BookOpen,
}

function CertCard({ cert, index }: { cert: typeof CERTIFICATES[number]; index: number }) {
  const color = ACCENT[cert.category]
  const Icon = CATEGORY_ICON[cert.category] ?? Award

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06]"
      style={{ willChange: 'transform' }}
    >
      {/* Radial glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at top left, ${color}18 0%, transparent 65%)` }}
      />

      {/* Top accent line */}
      <div
        className="absolute left-0 top-0 h-[2px] w-0 rounded-tl-2xl transition-all duration-500 group-hover:w-full"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      <div className="relative flex h-full flex-col gap-4">
        {/* Icon + featured badge */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${color}18`, boxShadow: `0 0 0 1px ${color}30` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>

          {cert.featured && (
            <div className="flex items-center gap-1.5 rounded-full border px-2.5 py-1"
              style={{ borderColor: `${color}40`, background: `${color}10`, color }}
            >
              <BadgeCheck className="h-3 w-3" />
              <span className="font-mono text-[9px] uppercase tracking-wider">Featured</span>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-paper">
            {cert.title}
          </h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
            {cert.issuer}
          </p>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span
            className="rounded-lg px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest"
            style={{ background: `${color}12`, color }}
          >
            {cert.category}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
              {cert.date}
            </span>
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground/30">
              #{cert.index}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Certificates() {
  const [filter, setFilter] = useState('ALL')
  const sectionRef = useRef<HTMLElement>(null)

  const filtered = filter === 'ALL'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === filter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.cert-header', start: 'top 88%' }
        }
      )
      gsap.fromTo('.cert-filters',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.cert-filters', start: 'top 92%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const totalByCategory = filter === 'ALL' ? CERTIFICATES.length : filtered.length

  return (
    <section ref={sectionRef} id="certificates" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="cert-header mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-primary">
              verified records
            </p>
            <h2 className="mt-3 text-5xl text-foreground md:text-7xl">
              Certifications
            </h2>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-baseline gap-2">
              <span className="bg-gradient-to-r from-violet to-teal bg-clip-text font-display text-6xl font-bold text-transparent">
                {CERTIFICATES.length}
              </span>
              <span className="font-mono text-sm text-muted-foreground">credentials</span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
              Forensics · Networking · Security
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="cert-filters mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat.id
            return (
              <motion.button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className="relative overflow-hidden rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors"
                style={{
                  background: isActive ? `${ACCENT[cat.id]}15` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? `${ACCENT[cat.id]}50` : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? ACCENT[cat.id] : '#9090A0',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${ACCENT[cat.id]}08` }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Masonry-style responsive card grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            layout
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer count bar */}
        <motion.div
          className="mt-10 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="rounded-full border border-white/8 bg-white/3 px-4 py-2 font-mono text-[11px] text-muted-foreground">
            {totalByCategory} of {CERTIFICATES.length} records
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

      </div>
    </section>
  )
}
