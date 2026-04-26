'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers3,
  RadioTower,
  ShieldAlert,
} from 'lucide-react'

const projects = [
  {
    title: 'Trek Connect',
    description:
      'A full-stack travel companion that blends trek discovery, social planning, and AI guidance for outdoor communities.',
    objective:
      'Design a polished product flow where trekkers can discover routes, connect with people, and use AI assistance without leaving the planning experience.',
    tags: ['NEXT.JS', 'FIREBASE', 'GEMINI'],
    status: 'DEPLOYED',
    impact: 'AI product experience',
    signals: ['Responsive product UI', 'AI-assisted discovery', 'Realtime app foundation'],
    githubUrl: 'https://github.com/XploitMonk0x01/TrekConnect',
    liveUrl: 'https://trekconnect.vercel.app/',
  },
  {
    title: 'XploitVerse',
    description:
      'A cyber learning universe for guided labs, ethical hacking practice, vulnerability assessment workflows, and skill progression.',
    objective:
      'Create a structured arena where learners can move from fundamentals to hands-on exploitation, reporting, and remediation thinking through mission-style modules.',
    tags: ['AWS', 'MERN', 'CYBER_LABS'],
    status: 'IN_TESTING',
    impact: 'Cyber training platform',
    signals: ['Lab-first architecture', 'Mission-based lessons', 'Assessment-ready workflows'],
    githubUrl: '',
    liveUrl: '',
  },
  {
    title: 'Social Tracer',
    description:
      'An OSINT-focused username investigation platform for correlating public traces across online services.',
    objective:
      'Make username reconnaissance faster and more readable by organizing platform checks, investigation status, and discovered traces in one focused workspace.',
    tags: ['OSINT', 'FASTAPI', 'REACT'],
    status: 'MISSION_CRITICAL',
    impact: 'Investigation support',
    signals: ['OSINT workflow', 'FastAPI backend', 'Investigator-friendly UI'],
    githubUrl: 'https://github.com/XploitMonk0x01/SocialTracer',
    liveUrl: '',
  },
]

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-cyber-red">
              case file browser
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-6xl">
              OPERATIONAL_PROJECTS
            </h2>
          </div>
          <p className="max-w-xl font-mono text-sm leading-relaxed text-zinc-400">
            Select a mission card to inspect objective, stack, links, and
            deployment status.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="space-y-4">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group w-full border p-5 text-left transition ${
                  activeIndex === index
                    ? 'border-cyber-red bg-cyber-red/10'
                    : 'border-cyber-red/15 bg-black/50 hover:border-cyber-red/50'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <ShieldAlert className="h-5 w-5 text-cyber-red" />
                  <span
                    className={`border px-2 py-1 font-mono text-[9px] ${
                      project.status === 'MISSION_CRITICAL'
                        ? 'border-cyber-red text-cyber-red'
                        : 'border-army-olive text-army-olive'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl text-white group-hover:text-cyber-red">
                      {project.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-zinc-500">
                      {project.impact}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-zinc-600 transition group-hover:text-cyber-red" />
                </div>
              </button>
            ))}
          </div>

          <motion.article
            key={activeProject.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative min-h-[500px] overflow-hidden border border-cyber-red/20 bg-black/60 p-6 md:p-8"
          >
            <div className="absolute inset-0 opacity-30 dossier-grid" />
            <div className="relative">
              <div className="mb-8 flex items-center justify-between border-b border-cyber-red/15 pb-5">
                <div className="flex items-center gap-3">
                  <Layers3 className="h-6 w-6 text-cyber-red" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                    selected dossier
                  </span>
                </div>
                <RadioTower className="h-5 w-5 text-army-olive" />
              </div>

              <h3 className="text-5xl text-white md:text-7xl">
                {activeProject.title}
              </h3>
              <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-zinc-400">
                {activeProject.description}
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="border border-cyber-red/10 bg-black/50 p-5">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-red">
                    objective
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-zinc-400">
                    {activeProject.objective}
                  </p>
                </div>
                <div className="border border-cyber-red/10 bg-black/50 p-5">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-red">
                    stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-[10px] text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {activeProject.signals.map((signal) => (
                  <div
                    key={signal}
                    className="border border-white/10 bg-black/45 p-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500"
                  >
                    <span className="mb-3 block h-1 w-8 bg-cyber-red" />
                    {signal}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-cyber-red/15 pt-6">
                {activeProject.githubUrl ? (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-cyber-red/25 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition hover:border-cyber-red hover:bg-cyber-red hover:text-black"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                ) : null}

                {activeProject.liveUrl ? (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-army-olive/40 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition hover:border-army-olive hover:bg-army-olive"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live
                  </a>
                ) : null}

                {!activeProject.githubUrl && !activeProject.liveUrl ? (
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
                    Links classified until release
                  </span>
                ) : null}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
