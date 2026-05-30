'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, Filter } from 'lucide-react'

const categories = [
  'ALL',
  'QUICK HEAL',
  'NETWORKING',
  'API',
  'HACKATHONS',
  'UDEMY',
]

const certificates = [
  {
    id: 1,
    title: 'Quick Heal Certified Digital Forensics Investigator',
    issuer: 'Quick Heal Academy',
    category: 'QUICK HEAL',
    date: '2025',
  },
  {
    id: 2,
    title: 'Learn Ethical Hacking from Scratch Course',
    issuer: 'Udemy',
    category: 'UDEMY',
    date: '2023',
  },
  {
    id: 3,
    title: 'API Security Fundamentals',
    issuer: 'APIsec University',
    category: 'API',
    date: '2025',
  },
  {
    id: 4,
    title: 'Certified Network Security Practitioner',
    issuer: 'The SecOps Group',
    category: 'NETWORKING',
    date: '2025',
  },
  {
    id: 5,
    title: 'The Complete Ethical Hacking Course',
    issuer: 'Udemy',
    category: 'UDEMY',
    date: '2024',
  },
  {
    id: 6,
    title: 'Quick Heal Certified VAPT Analyst',
    issuer: 'Quick Heal Academy',
    category: 'QUICK HEAL',
    date: '2025',
  },
  {
    id: 7,
    title: 'Quick Heal Certified MCIS Analyst',
    issuer: 'Quick Heal Academy',
    category: 'QUICK HEAL',
    date: '2025',
  },
  {
    id: 8,
    title: 'Quick Heal Certified System and Security Analyst',
    issuer: 'Quick Heal Academy',
    category: 'QUICK HEAL',
    date: '2024',
  },
  {
    id: 9,
    title: 'Quick Heal Certified Network Security Analyst',
    issuer: 'Quick Heal Academy',
    category: 'QUICK HEAL',
    date: '2024',
  },
  {
    id: 10,
    title: 'Quick Heal Certified Cyber Security Analyst',
    issuer: 'Quick Heal Academy',
    category: 'QUICK HEAL',
    date: '2024',
  },
  {
    id: 14,
    title: 'Quick Heal Certified Malware Essentials',
    issuer: 'Quick Heal Academy',
    category: 'QUICK HEAL',
    date: '2026',
  },
  {
    id: 15,
    title: 'Quick Heal Certified Mobile Application Penetration Testing Analyst',
    issuer: 'Quick Heal Academy',
    category: 'QUICK HEAL',
    date: '2026',
  },
  {
    id: 11,
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    category: 'NETWORKING',
    date: '2024',
  },
  {
    id: 12,
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    category: 'NETWORKING',
    date: '2024',
  },
  {
    id: 13,
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    category: 'NETWORKING',
    date: '2024',
  },
]

export function Certificates() {
  const [filter, setFilter] = useState('ALL')
  const [verifiedIds, setVerifiedIds] = useState<Record<number, string>>({})

  useEffect(() => {
    // Avoid SSR/client hydration mismatches by generating IDs only after mount.
    const next: Record<number, string> = {}
    for (const cert of certificates) {
      next[cert.id] = Math.random().toString(36).substring(7).toUpperCase()
    }
    setVerifiedIds(next)
  }, [])

  const filtered =
    filter === 'ALL'
      ? certificates
      : certificates.filter((c) => c.category === filter)

  return (
    <section id="certificates" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-signal-red">
              verified records
            </p>
            <h2 className="mt-3 text-5xl text-paper md:text-7xl">
              Certifications
            </h2>
          </div>
          <p className="text-base leading-8 text-paper-muted">
            Filter the learning trail by issuer and topic. The certificates are
            presented as records, not trophy tiles.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 font-mono text-xs tracking-widest transition-all ${
                filter === cat
                  ? 'bg-paper text-ink'
                  : 'border border-paper/12 text-paper-muted hover:border-signal-red hover:text-paper'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative border border-paper/12 paper-panel p-6 hover:border-paper/35"
              >
                <div className="mb-4 flex items-start justify-between">
                  <Award className="h-8 w-8 text-signal-red/70 group-hover:text-signal-red" />
                  <span className="font-mono text-[10px] text-paper-muted">
                    {cert.date}
                  </span>
                </div>
                <h3 className="mb-2 font-mono text-sm font-bold uppercase tracking-wider text-paper">
                  {cert.title}
                </h3>
                <p className="mb-4 font-mono text-[10px] text-paper-muted">
                  ISSUER: {cert.issuer}
                </p>
                <div className="flex items-center justify-between border-t border-paper/10 pt-4">
                  <span className="text-[9px] uppercase tracking-widest text-oxide">
                    VERIFIED_ID: {verifiedIds[cert.id] ?? '------'}
                  </span>
                  <ExternalLink className="h-4 w-4 cursor-pointer text-paper-muted transition-colors hover:text-signal-red" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
