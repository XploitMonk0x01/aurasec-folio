'use client'

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  Binary,
  Bug,
  Cloud,
  Code,
  Cpu,
  Database,
  Globe,
  Laptop,
  Lock,
  Microscope,
  Search,
  Shield,
  Smartphone,
  Terminal,
} from 'lucide-react'

const skills = [
  { name: 'Digital Forensics', icon: Search, category: 'Cyber', level: 92, detail: 'Timeline analysis, evidence handling, investigation workflows.' },
  { name: 'Network Analysis', icon: Activity, category: 'Cyber', level: 86, detail: 'Traffic inspection, suspicious pattern mapping, packet-level thinking.' },
  { name: 'OSINT', icon: Globe, category: 'Cyber', level: 90, detail: 'Username tracing, entity enrichment, public-source intelligence.' },
  { name: 'Incident Response', icon: Shield, category: 'Cyber', level: 84, detail: 'Containment mindset, triage, reporting, and response sequencing.' },
  { name: 'Cloud Security', icon: Cloud, category: 'Cyber', level: 74, detail: 'Cloud attack surface review and secure deployment awareness.' },
  { name: 'Prompt Engineering', icon: Terminal, category: 'AI', level: 88, detail: 'AI-assisted workflows, structured prompts, automation thinking.' },
  { name: 'VAPT', icon: Lock, category: 'Cyber', level: 87, detail: 'Reconnaissance, vulnerability validation, remediation-oriented notes.' },
  { name: 'Mobile App Pentesting', icon: Smartphone, category: 'Cyber', level: 78, detail: 'Android attack surface review, insecure storage checks, API traffic inspection.' },
  { name: 'Malware Analysis', icon: Bug, category: 'Cyber', level: 72, detail: 'Static and behavioral analysis mindset for suspicious files, indicators, and traces.' },
  { name: 'Reverse Engineering', icon: Binary, category: 'Cyber', level: 70, detail: 'Binary inspection fundamentals, control-flow reasoning, and unpacking software.' },
  { name: 'Threat Research', icon: Microscope, category: 'Cyber', level: 76, detail: 'Connecting artifacts, tools, infrastructure, and behavior into readable notes.' },
  { name: 'MERN Stack', icon: Database, category: 'Dev', level: 80, detail: 'Practical full-stack builds with modern JavaScript foundations.' },
  { name: 'Next.js', icon: Code, category: 'Dev', level: 83, detail: 'React interfaces, app routing, deployment-ready portfolio systems.' },
  { name: 'Docker', icon: Laptop, category: 'DevOps', level: 72, detail: 'Container-first thinking for reproducible app environments.' },
  { name: 'React Native', icon: Smartphone, category: 'Mobile', level: 70, detail: 'Cross-platform mobile UI and practical app prototyping.' },
  { name: 'Java', icon: Cpu, category: 'Core', level: 76, detail: 'Object-oriented foundations, data structures, and backend-ready Java.' },
]

export function InteractiveSkills() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = skills[activeIndex]

  const grouped = useMemo(() => {
    const byCat: Record<string, typeof skills> = {}
    for (const s of skills) {
      byCat[s.category] = byCat[s.category] ?? []
      byCat[s.category].push(s)
    }
    return byCat
  }, [])

  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-primary">
              expedition tags
            </p>
            <h2 className="mt-3 text-5xl text-foreground md:text-7xl">Skills</h2>
          </div>
          <p className="max-w-md text-base leading-8 text-muted-foreground md:text-right">
            A calm index of capabilities. Select a tag to reveal a short field
            note—practical craft, not decorative badge collecting.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
          
          {/* Left: Tags */}
          <div className="space-y-12">
            {Object.entries(grouped).map(([category, list], catIndex) => (
              <div key={category} className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                    {category}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-violet/50">
                    {String(list.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => {
                    const index = skills.findIndex((x) => x.name === skill.name)
                    const Icon = skill.icon
                    const selected = index === activeIndex

                    return (
                      <motion.button
                        key={skill.name}
                        onClick={() => setActiveIndex(index)}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.03 }}
                        className="relative overflow-hidden rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors"
                        style={{
                          background: selected ? 'rgba(124, 58, 237, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${selected ? 'rgba(124, 58, 237, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                          color: selected ? '#A855F7' : '#9090A0',
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="relative z-10 flex items-center gap-2">
                          <Icon className={`h-3.5 w-3.5 ${selected ? 'text-violet-bright' : 'opacity-50'}`} />
                          <span>{skill.name}</span>
                        </div>
                        {selected && (
                          <motion.div
                            layoutId="skill-pill"
                            className="absolute inset-0 rounded-full bg-violet/10"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Active Detail Card */}
          <div className="sticky top-32">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="void-glass rounded-2xl p-8"
              >
                <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/90">
                    active tag
                  </span>
                  <div className="flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 font-mono text-[10px] text-teal-bright">
                    {active.level}%
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-purple-600 shadow-lg shadow-violet/20">
                    <active.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-4xl text-foreground">{active.name}</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {active.detail}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 border-t border-white/10 pt-6">
                  {['research', 'execution', 'reporting'].map((phase, i) => (
                    <div key={phase} className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-violet-bright">
                        0{i + 1}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-violet/20 to-transparent" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {phase}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  )
}
