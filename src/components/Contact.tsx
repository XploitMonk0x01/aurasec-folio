'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-primary">
              secure channel
            </p>
            <h2 className="mt-3 text-5xl text-foreground md:text-7xl">
              Establish Contact
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-muted-foreground md:text-right">
            Open for security collaboration, project work, learning circles,
            and practical cyber or app-building missions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="void-glass rounded-3xl p-8 md:p-10">
              <h3 className="mb-8 font-display text-3xl text-foreground">
                Operational Base
              </h3>
              
              <div className="space-y-6 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet/10 transition-colors group-hover:bg-violet/20">
                    <MapPin className="h-4 w-4 text-violet-bright" />
                  </div>
                  <span className="transition-colors group-hover:text-foreground">Vadodara, India</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/10 transition-colors group-hover:bg-teal/20">
                    <Mail className="h-4 w-4 text-teal-bright" />
                  </div>
                  <span className="transition-colors group-hover:text-foreground">ethicalrobo06@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10 transition-colors group-hover:bg-purple-500/20">
                    <Phone className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="transition-colors group-hover:text-foreground">+91 [REDACTED]</span>
                </div>
              </div>
            </div>

            <div className="void-glass flex-1 rounded-3xl p-8 md:p-10">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                  Target Profile
                </span>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                Best fit: DFIR learning, OSINT tooling, VAPT notes, web app builds, and practical cybersecurity collaboration. Let's build reliable systems together.
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="void-glass flex flex-col gap-6 rounded-3xl p-8 md:p-10"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Identifier
                </label>
                <input
                  type="text"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-foreground outline-none transition-all focus:border-violet/50 focus:bg-white/10"
                  placeholder="Name or callsign"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Comms Address
                </label>
                <input
                  type="email"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-foreground outline-none transition-all focus:border-violet/50 focus:bg-white/10"
                  placeholder="Email address"
                />
              </div>
            </div>
            
            <div className="flex flex-1 flex-col gap-3">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Mission Details
              </label>
              <textarea
                className="min-h-[160px] flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-foreground outline-none transition-all focus:border-violet/50 focus:bg-white/10"
                placeholder="How can we collaborate?"
              />
            </div>
            
            <button className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-violet to-purple-600 px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-violet/20 transition-all hover:shadow-xl hover:shadow-violet/40 hover:-translate-y-0.5">
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              <span>Send Transmission</span>
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </motion.form>
          
        </div>
      </div>
    </section>
  )
}
