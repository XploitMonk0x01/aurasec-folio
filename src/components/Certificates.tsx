'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  { id: 'ALL', label: 'All' },
  { id: 'QUICK HEAL', label: 'Quick Heal' },
  { id: 'NETWORKING', label: 'Networking' },
  { id: 'API', label: 'API Security' },
  { id: 'HACKATHONS', label: 'Hackathons' },
  { id: 'UDEMY', label: 'Udemy' },
]

const CERTIFICATES = [
  { id: 1, title: 'Quick Heal Certified Digital Forensics Investigator', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2025', index: '01' },
  { id: 2, title: 'Learn Ethical Hacking from Scratch', issuer: 'Udemy', category: 'UDEMY', date: '2023', index: '02' },
  { id: 3, title: 'API Security Fundamentals', issuer: 'APIsec University', category: 'API', date: '2025', index: '03' },
  { id: 4, title: 'Certified Network Security Practitioner', issuer: 'The SecOps Group', category: 'NETWORKING', date: '2025', index: '04' },
  { id: 5, title: 'The Complete Ethical Hacking Course', issuer: 'Udemy', category: 'UDEMY', date: '2024', index: '05' },
  { id: 6, title: 'Quick Heal Certified VAPT Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2025', index: '06' },
  { id: 7, title: 'Quick Heal Certified MCIS Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2025', index: '07' },
  { id: 8, title: 'Quick Heal Certified System & Security Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2024', index: '08' },
  { id: 9, title: 'Quick Heal Certified Network Security Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2024', index: '09' },
  { id: 10, title: 'Quick Heal Certified Cyber Security Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2024', index: '10' },
  { id: 14, title: 'Quick Heal Certified Malware Essentials', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2026', index: '11' },
  { id: 15, title: 'Quick Heal Certified Mobile App Penetration Testing Analyst', issuer: 'Quick Heal Academy', category: 'QUICK HEAL', date: '2026', index: '12' },
  { id: 11, title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', category: 'NETWORKING', date: '2024', index: '13' },
  { id: 12, title: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy', category: 'NETWORKING', date: '2024', index: '14' },
  { id: 13, title: 'Networking Basics', issuer: 'Cisco Networking Academy', category: 'NETWORKING', date: '2024', index: '15' },
]

// Category accent colors
const ACCENT: Record<string, string> = {
  'QUICK HEAL': '#7C3AED',
  'NETWORKING': '#06B6D4',
  'API': '#A855F7',
  'HACKATHONS': '#22D3EE',
  'UDEMY': '#8B5CF6',
  'ALL': '#7C3AED',
}

export function Certificates() {
  const [filter, setFilter] = useState('ALL')
  const sectionRef = useRef<HTMLElement>(null)

  const filtered = filter === 'ALL'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === filter)

  // Section reveal via GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '.cert-header', start: 'top 88%' },
        }
      )
      gsap.fromTo('.cert-filters',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.cert-filters', start: 'top 92%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const accent = ACCENT[filter] ?? '#7C3AED'

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
          <p className="max-w-sm text-sm leading-7 text-muted-foreground md:text-right">
            {CERTIFICATES.length} verified credentials across forensics, networking, security & development.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="cert-filters mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat.id
            return (
              <motion.button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className="relative overflow-hidden rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors"
                style={{
                  background: isActive ? `${ACCENT[cat.id]}18` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? `${ACCENT[cat.id]}50` : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? ACCENT[cat.id] : '#9090A0',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {cat.label}
                {isActive && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${ACCENT[cat.id]}10` }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Certificate list — horizontal card rows */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, delay: i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative overflow-hidden rounded-xl border border-white/6 bg-white/2 p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/12 hover:bg-white/4"
              >
                {/* Hover gradient */}
                <div
                  className="pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: ACCENT[cert.category] ?? '#7C3AED' }}
                />

                <div className="flex items-center gap-4 md:gap-6">
                  {/* Index number */}
                  <span
                    className="hidden shrink-0 font-mono text-[11px] tabular-nums md:block"
                    style={{ color: ACCENT[cert.category] }}
                  >
                    {cert.index}
                  </span>

                  {/* Icon */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${ACCENT[cert.category]}18` }}
                  >
                    <Award className="h-4 w-4" style={{ color: ACCENT[cert.category] }} />
                  </div>

                  {/* Main content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-paper">
                      {cert.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Meta right side */}
                  <div className="ml-auto flex shrink-0 items-center gap-4">
                    <span
                      className="hidden rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider sm:block"
                      style={{
                        background: `${ACCENT[cert.category]}15`,
                        color: ACCENT[cert.category] ?? '#7C3AED',
                      }}
                    >
                      {cert.category}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                      {cert.date}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-muted-foreground/40 transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Count footer */}
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          <span className="font-mono text-[11px] text-muted-foreground">
            {filtered.length} of {CERTIFICATES.length} records
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
