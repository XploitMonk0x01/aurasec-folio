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
  Download,
  FileSearch,
  GitBranch,
  Linkedin,
  Radar,
  Shield,
  ShieldCheck,
} from 'lucide-react'

export default function Home() {
  const workflowTiles = [
    { label: 'evidence', icon: FileSearch },
    { label: 'automation', icon: GitBranch },
    { label: 'recon', icon: Radar },
    { label: 'response', icon: ShieldCheck },
  ]

  const terminalLines = [
    'INITIALIZING_SECURE_CONNECTION...',
    'ACCESS_GRANTED: XPLOITMONK0X01',
    'DOMAIN: DFIR // OSINT // VAPT',
    'SPECIALIZATION: CYBER_SECURITY',
    'STATUS: MISSION_READY',
    'TYPE "help" TO INTERACT WITH THIS PORTFOLIO',
  ]

  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-cyber-red selection:text-black">
      <RadarBackground />
      <Navigation />

      <section
        id="about"
        className="relative flex min-h-screen items-center px-6 pb-16 pt-28"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="mb-6 inline-flex items-center gap-3 border border-cyber-red/20 bg-black/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.35em] text-cyber-red">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyber-red" />
              Service record unlocked
            </div>

            <h1 className="max-w-4xl text-6xl leading-[0.9] text-white md:text-8xl xl:text-9xl">
              CHANDAN
              <span className="block text-cyber-red">SINGH</span>
            </h1>

            <p className="mt-6 max-w-2xl font-mono text-sm uppercase leading-relaxed tracking-[0.24em] text-zinc-400 md:text-base">
              DFIR_PRACTITIONER // OSINT_SPECIALIST // PROMPT_ENGINEER
            </p>

            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-300">
              I am a cybersecurity student at Parul University (3rd year). I'm
              passionate about network security, ethical hacking, and protecting
              digital assets. I enjoy hands-on learning through labs, CTF-style
              challenges, and building practical tools that improve security and
              automation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-cyber-red px-5 py-3 font-stencil text-black transition hover:bg-white"
              >
                <Shield className="h-4 w-4" />
                VIEW_OPERATIONS
              </a>
              <a
                href="https://linkedin.com/in/chandansemwal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-cyber-red/30 px-5 py-3 font-stencil text-white transition hover:border-cyber-red hover:bg-cyber-red/10"
              >
                <Linkedin className="h-4 w-4" />
                CONNECT_LINKEDIN
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 font-stencil text-zinc-300 transition hover:border-white/30 hover:text-white"
              >
                <Download className="h-4 w-4" />
                REQUEST_INTEL
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 border border-cyber-red/15 bg-black/35">
              {['DFIR', 'OSINT', 'VAPT'].map((item) => (
                <div
                  key={item}
                  className="border-r border-cyber-red/10 p-4 last:border-r-0"
                >
                  <div className="font-stencil text-2xl text-cyber-red">
                    {item}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                    active
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-10 -top-10 hidden h-28 w-28 border-l border-t border-cyber-red/30 lg:block" />
            <Terminal lines={terminalLines} />
            <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:grid-cols-4">
              {workflowTiles.map((tile) => (
                <div
                  key={tile.label}
                  className="min-h-20 border border-cyber-red/10 bg-black/40 p-3 transition hover:border-cyber-red/40 hover:text-white"
                >
                  <tile.icon className="mb-2 h-4 w-4 text-cyber-red" />
                  {tile.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <a
          href="#dashboard"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600 transition hover:text-cyber-red md:flex"
        >
          scroll dossier
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      <MissionDashboard />

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-cyber-red">
              operator profile
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-6xl">
              FIELD_NOTES
            </h2>
          </div>
          <div className="border-l border-cyber-red/25 pl-6 text-base leading-8 text-zinc-300">
            <p>
              I also build web and Android apps, and I'm flexible with
              programming languages like Python, Java, C, C++, JavaScript, Bash
              scripting, and PowerShell. The portfolio is designed to reflect
              that combination: security thinking, practical engineering, and
              AI-assisted workflow design.
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

      <footer className="border-t border-cyber-red/10 px-6 py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600">
          &copy; 2026 // XploitMonk0x01 // ALL_RIGHTS_RESERVED
        </p>
      </footer>
    </main>
  )
}
