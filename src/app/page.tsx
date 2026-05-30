'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Contact } from '@/components/Contact'
import { Certificates } from '@/components/Certificates'
import { InteractiveSkills } from '@/components/InteractiveSkills'
import { MissionDashboard } from '@/components/MissionDashboard'
import { MediumDispatches } from '@/components/MediumDispatches'
import { Navigation } from '@/components/Navigation'
import { Projects } from '@/components/Projects'
import { RadarBackground } from '@/components/RadarBackground'
import { Terminal } from '@/components/Terminal'
import { FrontendLab } from '@/components/FrontendLab'
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Fingerprint,
  Github,
  Linkedin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const practiceTiles = [
  { label: 'Forensics', value: 'Timeline, artifacts, evidence' },
  { label: 'OSINT', value: 'Entity traces and public signals' },
  { label: 'VAPT', value: 'Recon, validation, reporting' },
  { label: 'Frontend', value: 'Interfaces that explain work' },
]

const terminalLines = [
  'CASE FILE OPENED: CHANDAN_SINGH',
  'FOCUS: DFIR / OSINT / VAPT / FRONTEND',
  'CONTEXT: PARUL UNIVERSITY, 3RD YEAR',
  'PORTFOLIO MODE: INCIDENT DOSSIER',
  'TYPE "help" TO INSPECT THE RECORD',
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RadarBackground />
      <Navigation />

      <section
        id="about"
        className="relative flex min-h-screen items-center px-6 pb-16 pt-28"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[86px_1fr_430px] lg:items-stretch">
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden border-l border-r border-paper/12 bg-paper/5 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-6"
          >
            <span className="writing-mode-vertical font-mono text-[10px] uppercase tracking-[0.42em] text-paper-muted">
              incident portfolio
            </span>
            <Fingerprint className="h-6 w-6 text-signal-red" />
            <span className="writing-mode-vertical font-mono text-[10px] uppercase tracking-[0.42em] text-paper-muted">
              case 0x01
            </span>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex flex-col justify-center border-y border-paper/10 py-10"
          >
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-oxide/40 bg-oxide/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-oxide">
                <ShieldCheck className="h-4 w-4" />
                Student security practitioner
              </span>
              <span className="inline-flex items-center gap-2 border border-signal-red/40 bg-signal-red/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-signal-red">
                <Sparkles className="h-4 w-4" />
                GPT-assisted builder
              </span>
            </div>

            <h1 className="max-w-5xl text-balance text-[5.4rem] leading-[0.82] text-paper sm:text-[7rem] md:text-[9rem] xl:text-[10.8rem]">
              Chandan
              <span className="block italic text-signal-red">Singh</span>
            </h1>

            <div className="mt-8 grid max-w-4xl gap-6 lg:grid-cols-[1fr_0.75fr]">
              <p className="text-balance text-xl leading-8 text-paper md:text-2xl md:leading-9">
                Cybersecurity student shaping forensic thinking, OSINT craft,
                and practical app engineering into readable tools and reports.
              </p>
              <p className="border-l border-paper/15 pl-5 text-sm leading-7 text-paper-muted">
                I study at Parul University and build hands-on projects across
                network security, ethical hacking, automation, and frontend
                interfaces. The goal is simple: make technical evidence easier
                to trust, review, and act on.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition hover:bg-signal-red"
              >
                View work
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/chandansemwal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-paper/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:border-paper hover:bg-paper/10"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/XploitMonk0x01"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-paper/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper-muted transition hover:border-oxide hover:text-paper"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-signal-red/35 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-signal-red transition hover:bg-signal-red hover:text-ink"
              >
                <Download className="h-4 w-4" />
                Contact
              </a>
            </div>

            <div className="mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {practiceTiles.map((item) => (
                <div
                  key={item.label}
                  className="min-h-32 border border-paper/12 paper-panel p-4"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-signal-red">
                    {item.label}
                  </div>
                  <p className="mt-5 text-sm leading-6 text-paper-muted">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7 }}
            className="relative flex flex-col justify-center gap-5"
          >
            <div className="relative overflow-hidden border border-paper/12 paper-light p-5 text-ink grain">
              <div className="relative">
                <div className="flex items-center justify-between border-b border-ink/15 pb-4 font-mono text-[10px] uppercase tracking-[0.24em]">
                  <span>field note</span>
                  <span>2026</span>
                </div>
                <p className="mt-7 font-display text-4xl leading-none md:text-5xl">
                  Interfaces should feel like evidence, not decoration.
                </p>
                <p className="mt-5 text-sm leading-7 text-ink/70">
                  This portfolio now uses a case-file rhythm: quieter type,
                  tactile panels, restrained color, and concrete proof of work.
                </p>
              </div>
            </div>

            <Terminal lines={terminalLines} />
          </motion.div>
        </div>

        <a
          href="#dashboard"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-paper-muted transition hover:text-signal-red md:flex"
        >
          Scroll case file
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      <MissionDashboard />

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 border-y border-paper/10 py-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-signal-red">
              operator profile
            </p>
            <h2 className="mt-3 text-5xl text-paper md:text-7xl">
              Field Notes
            </h2>
          </div>
          <div className="grid gap-6 text-base leading-8 text-paper-muted md:grid-cols-2">
            <p>
              I work across web and Android app building, Python, Java, C, C++,
              JavaScript, Bash, and PowerShell. That range helps me understand
              systems from UI behavior down to operating details.
            </p>
            <p>
              My strongest interest is the overlap between security research
              and usable products: tools, reports, dashboards, and learning
              systems that make complex findings legible.
            </p>
          </div>
        </div>
      </section>

      <InteractiveSkills />
      <FrontendLab />
      <MediumDispatches />
      <Projects />
      <Certificates />
      <Contact />

      <footer className="border-t border-paper/10 px-6 py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-paper-muted">
          &copy; 2026 / XploitMonk0x01 / built as an incident dossier
        </p>
      </footer>
    </main>
  )
}
