'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  Crosshair,
  DatabaseZap,
  Fingerprint,
  Radar,
  ShieldCheck,
} from 'lucide-react'

const telemetry = [
  { label: 'Open source contributions', value: '5+', tone: 'red' },
  { label: 'GitHub repositories', value: '34', tone: 'oxide' },
  { label: 'THM rooms complete', value: '156', tone: 'red' },
  { label: 'THM badges', value: '12', tone: 'amber' },
]

const streams = [
  'OSINT entity mapping and public trace review',
  'DFIR timeline reconstruction and artifact triage',
  'VAPT surface mapping with remediation notes',
  'AI workflow automation for repeatable research',
  'Full-stack deployment practice across app projects',
]

const capabilityMap = [
  { name: 'DFIR', x: '50%', y: '15%', icon: Fingerprint, note: 'evidence' },
  { name: 'OSINT', x: '78%', y: '42%', icon: Crosshair, note: 'signals' },
  { name: 'VAPT', x: '66%', y: '78%', icon: ShieldCheck, note: 'validation' },
  { name: 'DEV', x: '32%', y: '78%', icon: DatabaseZap, note: 'systems' },
  { name: 'AI', x: '22%', y: '42%', icon: Activity, note: 'workflow' },
]

export function MissionDashboard() {
  return (
    <section id="dashboard" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-signal-red">
              operating picture
            </p>
            <h2 className="mt-3 text-5xl text-paper md:text-7xl">
              Mission Control
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-paper-muted">
            A compact map of the work: investigations, hands-on labs,
            frontend systems, and the repeatable habits that turn scattered
            security learning into useful output.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[470px] overflow-hidden border border-paper/12 paper-panel p-6 grain">
            <div className="absolute inset-0 opacity-35 dossier-grid" />
            <div className="absolute inset-8 border border-paper/10" />
            <div className="absolute inset-20 border border-oxide/15" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper-muted">
                  capability topology
                </div>
                <Radar className="h-5 w-5 text-signal-red" />
              </div>

              <div className="relative mt-8 flex flex-1 items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-80 w-80 rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 0deg, rgba(231,71,46,0.30), rgba(231,71,46,0.05) 24deg, transparent 74deg, transparent 360deg)',
                    maskImage:
                      'radial-gradient(circle, transparent 0 18%, black 19% 100%)',
                  }}
                />
                <div className="absolute h-72 w-72 rounded-full border border-paper/15" />
                <div className="absolute h-48 w-48 rounded-full border border-oxide/25" />
                <div className="absolute h-20 w-20 border border-paper/15 bg-signal-red/10" />
                <div className="absolute h-px w-[70%] rotate-45 bg-paper/10" />
                <div className="absolute h-px w-[70%] -rotate-45 bg-paper/10" />
                <div className="absolute h-[70%] w-px bg-paper/10" />
                <div className="absolute h-px w-[70%] bg-paper/10" />

                {capabilityMap.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.86 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    className="absolute grid h-24 w-24 place-items-center border border-paper/15 bg-ink/80 text-center shadow-[0_16px_60px_rgba(0,0,0,0.28)]"
                    style={{ left: item.x, top: item.y, translate: '-50% -50%' }}
                  >
                    <item.icon className="h-5 w-5 text-signal-red" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
                      {item.name}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-oxide">
                      {item.note}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              {telemetry.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="min-h-40 border border-paper/12 paper-panel p-5"
                >
                  <div
                    className={`font-display text-6xl leading-none ${
                      item.tone === 'red'
                        ? 'text-signal-red'
                        : item.tone === 'amber'
                          ? 'text-amber'
                          : 'text-oxide'
                    }`}
                  >
                    {item.value}
                  </div>
                  <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-muted">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border border-paper/12 paper-light p-5 text-ink">
              <div className="mb-5 flex items-center justify-between border-b border-ink/15 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em]">
                  active streams
                </span>
                <span className="h-2 w-2 bg-signal-red" />
              </div>
              <div className="space-y-4">
                {streams.map((stream, index) => (
                  <motion.div
                    key={stream}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="grid grid-cols-[32px_1fr] gap-3 text-sm leading-6 text-ink/75"
                  >
                    <span className="font-mono text-[10px] text-signal-red">
                      0{index + 1}
                    </span>
                    <span>{stream}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
