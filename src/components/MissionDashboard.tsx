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
  { label: 'Open Source Contributions', value: '5+', tone: 'red' },
  { label: 'GitHub Repos', value: '34', tone: 'olive' },
  { label: 'THM Rooms Complete', value: '156', tone: 'red' },
  { label: 'THM Badges', value: '12', tone: 'olive' },
]

const streams = [
  'OSINT_ENTITY_RESOLUTION_READY',
  'DFIR_TIMELINE_RECONSTRUCTED',
  'VAPT_SURFACE_MAPPING_ACTIVE',
  'PROMPT_WORKFLOW_AUTOMATION_ONLINE',
  'FULL_STACK_DEPLOYMENT_PIPELINE_STABLE',
]

const capabilityMap = [
  { name: 'DFIR', x: '50%', y: '16%', icon: Fingerprint, altitude: 'FL180' },
  { name: 'OSINT', x: '80%', y: '40%', icon: Crosshair, altitude: 'FL240' },
  { name: 'VAPT', x: '67%', y: '78%', icon: ShieldCheck, altitude: 'FL210' },
  { name: 'DEV', x: '31%', y: '78%', icon: DatabaseZap, altitude: 'FL160' },
  { name: 'AI', x: '20%', y: '40%', icon: Activity, altitude: 'FL300' },
]

export function MissionDashboard() {
  return (
    <section id="dashboard" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-cyber-red">
              live operator overview
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-6xl">
              MISSION_CONTROL
            </h2>
          </div>
          <div className="border-l border-cyber-red/30 pl-4 font-mono text-xs leading-relaxed text-zinc-400">
            Portfolio rebuilt as an interactive evidence console for cyber,
            development, and automation work.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[440px] overflow-hidden border border-cyber-red/20 bg-black/55 p-6">
            <div className="absolute inset-0 opacity-40 tactical-map" />
            <div className="absolute inset-6 rounded-full border border-cyber-red/10" />
            <div className="absolute inset-16 rounded-full border border-cyber-red/10" />
            <div className="absolute inset-28 rounded-full border border-army-olive/10" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                  capability topology // atc scan
                </div>
                <Radar className="h-5 w-5 text-cyber-red" />
              </div>

              <div className="relative mt-8 flex flex-1 items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-80 w-80 rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 0deg, rgba(255,49,49,0.34), rgba(255,49,49,0.06) 18deg, transparent 62deg, transparent 360deg)',
                    maskImage:
                      'radial-gradient(circle, transparent 0 14%, black 15% 100%)',
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-72 w-72 rounded-full border border-cyber-red/25"
                />
                <div className="absolute h-48 w-48 rounded-full border border-army-olive/30" />
                <div className="absolute h-20 w-20 rounded-full border border-white/10 bg-cyber-red/10" />
                <div className="absolute h-px w-[68%] rotate-45 bg-cyber-red/10" />
                <div className="absolute h-px w-[68%] -rotate-45 bg-cyber-red/10" />
                <div className="absolute h-[68%] w-px bg-cyber-red/10" />
                <div className="absolute h-px w-[68%] bg-cyber-red/10" />

                {capabilityMap.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    className="absolute grid h-20 w-20 place-items-center border border-cyber-red/25 bg-black/70 text-center shadow-[0_0_30px_rgba(255,49,49,0.08)]"
                    style={{ left: item.x, top: item.y, translate: '-50% -50%' }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.7, 1], opacity: [0.9, 0, 0.9] }}
                      transition={{
                        duration: 2.4,
                        delay: index * 0.28,
                        repeat: Infinity,
                      }}
                      className="absolute h-24 w-24 rounded-full border border-cyber-red/25"
                    />
                    <item.icon className="h-5 w-5 text-cyber-red" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white">
                      {item.name}
                    </span>
                    <span className="absolute -bottom-5 font-mono text-[8px] tracking-[0.18em] text-army-olive">
                      {item.altitude}
                    </span>
                  </motion.div>
                ))}

                <div className="absolute bottom-0 left-0 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                  sweep rate 07s
                </div>
                <div className="absolute right-0 top-0 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                  range 360
                </div>
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
                  className="border border-cyber-red/15 bg-black/55 p-5"
                >
                  <div
                    className={`font-stencil text-4xl ${
                      item.tone === 'red' ? 'text-cyber-red' : 'text-army-olive'
                    }`}
                  >
                    {item.value}
                  </div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border border-cyber-red/15 bg-black/55 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                  signal stream
                </span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyber-red" />
              </div>
              <div className="space-y-3">
                {streams.map((stream, index) => (
                  <motion.div
                    key={stream}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3 font-mono text-xs text-zinc-400"
                  >
                    <span className="text-cyber-red">0{index + 1}</span>
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
