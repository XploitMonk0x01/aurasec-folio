'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  {
    name: 'Digital Forensics',
    icon: Search,
    category: 'Cyber',
    level: 92,
    detail: 'Timeline analysis, evidence handling, investigation workflows.',
  },
  {
    name: 'Network Analysis',
    icon: Activity,
    category: 'Cyber',
    level: 86,
    detail: 'Traffic inspection, suspicious pattern mapping, packet-level thinking.',
  },
  {
    name: 'OSINT',
    icon: Globe,
    category: 'Cyber',
    level: 90,
    detail: 'Username tracing, entity enrichment, public-source intelligence.',
  },
  {
    name: 'Incident Response',
    icon: Shield,
    category: 'Cyber',
    level: 84,
    detail: 'Containment mindset, triage, reporting, and response sequencing.',
  },
  {
    name: 'Cloud Security',
    icon: Cloud,
    category: 'Cyber',
    level: 74,
    detail: 'Cloud attack surface review and secure deployment awareness.',
  },
  {
    name: 'Prompt Engineering',
    icon: Terminal,
    category: 'AI',
    level: 88,
    detail: 'AI-assisted workflows, structured prompts, automation thinking.',
  },
  {
    name: 'VAPT',
    icon: Lock,
    category: 'Cyber',
    level: 87,
    detail: 'Reconnaissance, vulnerability validation, remediation-oriented notes.',
  },
  {
    name: 'Mobile App Pentesting',
    icon: Smartphone,
    category: 'Cyber',
    level: 78,
    detail:
      'Android attack surface review, insecure storage checks, API traffic inspection, and practical mobile security testing.',
  },
  {
    name: 'Malware Analysis',
    icon: Bug,
    category: 'Cyber',
    level: 72,
    detail:
      'Static and behavioral analysis mindset for suspicious files, indicators, and execution traces.',
  },
  {
    name: 'Reverse Engineering',
    icon: Binary,
    category: 'Cyber',
    level: 70,
    detail:
      'Binary inspection fundamentals, control-flow reasoning, and unpacking how software behaves internally.',
  },
  {
    name: 'Threat Research',
    icon: Microscope,
    category: 'Cyber',
    level: 76,
    detail:
      'Connecting artifacts, tools, infrastructure, and behavior into readable investigation notes.',
  },
  {
    name: 'MERN Stack',
    icon: Database,
    category: 'Dev',
    level: 80,
    detail: 'Practical full-stack builds with modern JavaScript foundations.',
  },
  {
    name: 'Next.js',
    icon: Code,
    category: 'Dev',
    level: 83,
    detail: 'React interfaces, app routing, deployment-ready portfolio systems.',
  },
  {
    name: 'Docker',
    icon: Laptop,
    category: 'DevOps',
    level: 72,
    detail: 'Container-first thinking for reproducible app environments.',
  },
  {
    name: 'React Native',
    icon: Smartphone,
    category: 'Mobile',
    level: 70,
    detail: 'Cross-platform mobile UI and practical app prototyping.',
  },
  {
    name: 'C / C++',
    icon: Cpu,
    category: 'Core',
    level: 76,
    detail: 'Systems fundamentals and low-level programming discipline.',
  },
]

export function InteractiveSkills() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = skills[activeIndex]

  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-cyber-red">
              selectable intelligence
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-6xl">
              SKILLS_MATRIX
            </h2>
          </div>
          <p className="font-mono text-sm leading-relaxed text-zinc-400">
            Hover or focus a node to inspect where each capability fits in the
            operator profile. The matrix favors practical, mission-ready skill
            clusters over decorative badges.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill, index) => (
              <motion.button
                key={skill.name}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className={`group relative min-h-40 overflow-hidden border p-4 text-left transition ${
                  activeIndex === index
                    ? 'border-cyber-red bg-cyber-red/10'
                    : 'border-cyber-red/15 bg-black/50 hover:border-cyber-red/60'
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-red/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <skill.icon
                    className={`h-7 w-7 ${
                      activeIndex === index ? 'text-cyber-red' : 'text-zinc-500'
                    }`}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    {skill.category}
                  </span>
                </div>
                <div className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white">
                  {skill.name}
                </div>
                <div className="mt-4 h-1 bg-white/5">
                  <div
                    className="h-full bg-cyber-red transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="sticky top-24 h-fit border border-cyber-red/20 bg-black/70 p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                active node
              </span>
              <span className="font-mono text-xs text-cyber-red">
                {active.level}%
              </span>
            </div>
            <active.icon className="mb-5 h-10 w-10 text-cyber-red" />
            <h3 className="text-3xl text-white">{active.name}</h3>
            <p className="mt-4 font-mono text-sm leading-relaxed text-zinc-400">
              {active.detail}
            </p>
            <div className="mt-8 space-y-3">
              {['research', 'execution', 'reporting'].map((phase, index) => (
                <div key={phase} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-cyber-red">
                    0{index + 1}
                  </span>
                  <div className="h-px flex-1 bg-cyber-red/20" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    {phase}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
