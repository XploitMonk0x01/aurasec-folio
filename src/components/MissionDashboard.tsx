'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Crosshair,
  DatabaseZap,
  Fingerprint,
  Activity,
  ShieldCheck,
  Radar
} from 'lucide-react'

const telemetry = [
  { label: 'Open source contributions', value: '5+', color: 'from-violet-500 to-purple-600' },
  { label: 'GitHub repositories', value: '34', color: 'from-cyan-500 to-teal-600' },
  { label: 'THM rooms complete', value: '156', color: 'from-violet-400 to-cyan-500' },
  { label: 'THM badges', value: '12', color: 'from-fuchsia-500 to-purple-600' },
]

const streams = [
  'OSINT entity mapping and public trace review',
  'DFIR timeline reconstruction and artifact triage',
  'VAPT surface mapping with remediation notes',
  'AI workflow automation for repeatable research',
  'Full-stack deployment practice across app projects',
]

const capabilityMap = [
  { name: 'DFIR', icon: Fingerprint, note: 'evidence' },
  { name: 'OSINT', icon: Crosshair, note: 'signals' },
  { name: 'VAPT', icon: ShieldCheck, note: 'validation' },
  { name: 'DEV', icon: DatabaseZap, note: 'systems' },
  { name: 'AI', icon: Activity, note: 'workflow' },
]

export function MissionDashboard() {
  return (
    <section id="dashboard" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-primary">
              operating picture
            </p>
            <h2 className="mt-3 text-5xl text-foreground md:text-7xl">
              Mission Control
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-muted-foreground lg:text-right">
            A compact map of the work: investigations, hands-on labs,
            frontend systems, and the repeatable habits that turn scattered
            learning into useful output.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          
          {/* Left Column: Big Stats & Capabilities */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {telemetry.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="void-glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-violet/40 hover:bg-white/5"
                >
                  <div
                    className={`bg-gradient-to-r ${item.color} bg-clip-text font-display text-4xl font-bold text-transparent md:text-5xl`}
                  >
                    {item.value}
                  </div>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-paper">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="void-glass relative flex-1 overflow-hidden rounded-2xl p-8 lg:p-10"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)' }}
              />
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  capability matrix
                </span>
                <Radar className="h-5 w-5 text-violet-bright" />
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {capabilityMap.map((item, i) => (
                  <div key={item.name} className="group/item flex flex-col items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/2 p-4 transition-all hover:-translate-y-1 hover:border-violet/30 hover:bg-white/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/10 transition-colors group-hover/item:bg-violet/20">
                      <item.icon className="h-5 w-5 text-violet-bright" />
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">{item.name}</div>
                      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Streams */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="void-glass flex flex-col rounded-2xl p-8 lg:p-10"
          >
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                active streams
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-bright"></span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-1 flex-col justify-center space-y-6">
              {streams.map((stream, index) => (
                <div
                  key={stream}
                  className="group flex gap-4 text-sm leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="shrink-0 font-mono text-[10px] text-violet-bright transition-colors group-hover:text-teal-bright">
                    0{index + 1}
                  </span>
                  <span>{stream}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
