'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Layers3, ShieldAlert } from 'lucide-react'

const projects = [
  {
    title: 'XploitVerse',
    description:
      'A practical cybersecurity training platform with interactive labs, realistic attack simulations, and guided learning paths for aspiring security professionals.',
    objective:
      'Launch isolated, browser-based cybersecurity labs on demand, allowing learners to practice exploitation, privilege escalation, and security concepts in realistic environments.',
    tags: ['GO', 'REACT', 'AWS'],
    status: 'IN_TESTING',
    color: '#7C3AED', // Violet
    signals: ['On-demand Docker Labs', 'WebSocket Terminals', 'RBAC System'],
    githubUrl: 'https://github.com/XploitMonk0x01/XploitVerse',
    liveUrl: '',
  },
  {
    title: 'CrimeGPT',
    description:
      'An AI-driven platform that streamlines crime documentation, maps legal sections, and generates case records from incident narratives.',
    objective:
      'Automate FIR-to-arrest documentation, maintain a live case diary, and surface relevant BNS/BNSS/BSA sections with RAG-backed legal intelligence.',
    tags: ['REACT', 'FASTAPI', 'RAG'],
    status: 'IN_TESTING',
    color: '#06B6D4', // Teal
    signals: ['Automated document drafts', 'Legal section intelligence', 'Case diary workflow'],
    githubUrl: 'https://github.com/XploitMonk0x01/crimegpt',
    liveUrl: '',
  },
  {
    title: 'Trek Connect',
    description:
      'A full-stack travel companion that blends trek discovery, social planning, and AI guidance for outdoor communities.',
    objective:
      'Design a polished product flow where trekkers can discover routes, connect with people, and use AI assistance without leaving the planning experience.',
    tags: ['NEXT.JS', 'FIREBASE', 'GEMINI'],
    status: 'DEPLOYED',
    color: '#8B5CF6',
    signals: ['Responsive product UI', 'AI-assisted discovery', 'Realtime app foundation'],
    githubUrl: 'https://github.com/XploitMonk0x01/TrekConnect',
    liveUrl: 'https://trekconnect.vercel.app/',
  },
  {
    title: 'CTF-GPT',
    description:
      'AI-powered CTF assistant CLI featuring progressive RAG hints, a LangGraph agent, and deep Kali Linux integration via MCP.',
    objective:
      'Provide progressive guidance grounded in real CTF writeups and execute tool workflows on Kali VMs to generate context-aware next steps.',
    tags: ['PYTHON', 'LANGGRAPH', 'MCP'],
    status: 'MISSION_CRITICAL',
    color: '#10B981',
    signals: ['Kali MCP Integration', 'Progressive RAG Hints', 'Auto-Reports'],
    githubUrl: 'https://github.com/XploitMonk0x01/ctfgpt',
    liveUrl: '',
  },
  {
    title: 'Merilang',
    description:
      'A desi-flavoured programming language with a full compiler front-end (Lexer, Parser, Semantic Analyser, IR Generator, and SSA Conversion).',
    objective:
      'Build a bilingual programming language with static type-checking, CFG analysis, IR optimization, and an explicit runtime memory model.',
    tags: ['PYTHON', 'COMPILER', 'OOP'],
    status: 'DEPLOYED',
    color: '#F59E0B',
    signals: ['Panic-mode Recovery', '3AC IR Generator', 'SSA Conversion'],
    githubUrl: 'https://github.com/XploitMonk0x01/merilang',
    liveUrl: '',
  },
]

function ProjectLinks({
  githubUrl,
  liveUrl,
}: {
  githubUrl: string
  liveUrl: string
}) {
  if (!githubUrl && !liveUrl) {
    return (
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
        Classified until release
      </span>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-foreground transition-all hover:border-violet/40 hover:bg-white/10"
        >
          <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
          GitHub
        </a>
      )}

      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-foreground transition-all hover:border-teal/40 hover:bg-white/10"
        >
          <ExternalLink className="h-4 w-4 transition-transform group-hover:scale-110" />
          Live
        </a>
      )}
    </div>
  )
}

function ProjectCard({
  project,
  variant,
}: {
  project: (typeof projects)[number]
  variant: 'featured' | 'tall' | 'small'
}) {
  const heightClass =
    variant === 'featured'
      ? 'min-h-[380px]'
      : variant === 'tall'
        ? 'min-h-[560px]'
        : 'min-h-[260px]'

  const gridSpan =
    variant === 'featured'
      ? 'lg:col-span-2'
      : variant === 'tall'
        ? 'lg:col-span-1'
        : 'lg:col-span-1'

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`void-glass group relative flex flex-col ${gridSpan} ${heightClass} overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/15 md:p-8`}
    >
      {/* Background radial gradient on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at center, ${project.color}15 0%, transparent 60%)` }}
      />

      {/* Accent strip */}
      <div
        className="absolute left-0 top-0 h-1 w-full opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:h-1.5"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
      />

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" style={{ color: project.color }} />
            <span
              className="rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em]"
              style={{ borderColor: `${project.color}40`, backgroundColor: `${project.color}10`, color: project.color }}
            >
              {project.status}
            </span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {variant === 'featured' ? 'featured' : variant === 'tall' ? 'flagship' : 'mission'}
          </span>
        </div>

        <h3 className={`${variant === 'featured' ? 'text-5xl md:text-6xl' : variant === 'tall' ? 'text-4xl md:text-5xl' : 'text-3xl'} mt-8 font-display text-foreground`}>
          {project.title}
        </h3>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto pt-8">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                <Layers3 className="h-4 w-4 text-violet-bright" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                  objective
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">{project.objective}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-widest text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const featured = projects.find((p) => p.title === 'XploitVerse') ?? projects[0]
  const tall = projects.find((p) => p.title === 'CrimeGPT') ?? projects[1]
  const smallA = projects.find((p) => p.title === 'CTF-GPT') ?? projects[3]
  const smallB = projects.find((p) => p.title === 'Trek Connect') ?? projects[2]
  const smallC = projects.find((p) => p.title === 'Merilang') ?? projects[4]

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-primary">
              expedition bento
            </p>
            <h2 className="mt-3 text-5xl text-foreground md:text-7xl">
              Operational Projects
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-muted-foreground md:text-right">
            Large featured modules with quiet highlights—hover to step closer,
            open links when release-ready.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <ProjectCard project={featured} variant="featured" />
          <ProjectCard project={tall} variant="tall" />
          <ProjectCard project={smallA} variant="small" />
          <ProjectCard project={smallB} variant="small" />
          <ProjectCard project={smallC} variant="small" />
        </div>
      </div>
    </section>
  )
}
