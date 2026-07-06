'use client'

import React from 'react'
import { Contact } from '@/components/Contact'
import { Certificates } from '@/components/Certificates'
import { InteractiveSkills } from '@/components/InteractiveSkills'
import { MissionDashboard } from '@/components/MissionDashboard'
import { MediumDispatches } from '@/components/MediumDispatches'
import { Navigation } from '@/components/Navigation'
import { Projects } from '@/components/Projects'
import { NewHero } from '@/components/NewHero'
import { ActionLink } from '@/components/PortfolioPrimitives'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <Navigation />

      <NewHero />

      <MissionDashboard />

      {/* Field Notes section */}
      <section className="content-section px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_0.4fr] lg:items-start">
            {/* Text side */}
            <div className="lg:pl-2">
              <p className="font-mono text-xs uppercase tracking-[0.42em] text-primary">
                expedition log
              </p>
              <h2 className="mt-3 text-5xl text-foreground md:text-7xl">Field Notes</h2>

              <div className="mt-6 grid gap-6 text-base leading-8 text-muted-foreground md:grid-cols-1">
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

              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink href="#projects" tone="primary">
                  View Expedition Cards
                </ActionLink>
                <ActionLink href="#contact" tone="quiet">
                  Request a briefing
                </ActionLink>
              </div>
            </div>

            {/* Visual side */}
            <div className="relative overflow-hidden rounded-xl border border-white/8 bg-card/30 p-6 backdrop-blur-xl">
              <div
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{ background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.12), transparent 60%)' }}
              />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/8 pb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  <span>approach</span>
                  <span className="text-violet-bright">active</span>
                </div>

                <div className="mt-6">
                  <div className="bg-gradient-to-r from-violet to-teal bg-clip-text text-[56px] font-bold leading-none text-transparent">
                    v2.0
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Precision over noise. Each section is shaped like a field instrument —
                    readable at a glance, detailed on inspection.
                  </p>
                </div>

                <div className="mt-6 border-t border-white/8 pt-5">
                  <div className="grid gap-3">
                    {[
                      { k: 'Focus', v: 'Security → product UI' },
                      { k: 'Method', v: 'Evidence-first workflows' },
                      { k: 'Output', v: 'Reusable, deployment-ready modules' },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        <span className="text-primary">{row.k}</span>
                        <span className="text-muted-foreground/90">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-section"><InteractiveSkills /></div>
      <div className="content-section"><MediumDispatches /></div>
      <div className="content-section"><Projects /></div>
      <div className="content-section"><Certificates /></div>
      <div className="content-section"><Contact /></div>

      <footer className="border-t border-white/6 px-6 py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-paper-muted">
          &copy; 2026 / XploitMonk0x01 / built with intention
        </p>
      </footer>
    </main>
  )
}
