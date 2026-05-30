'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail } from 'lucide-react'

export function Contact() {
  return (
    <section
      id="contact"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.42em] text-signal-red">
              secure channel
            </p>
            <h2 className="mt-3 text-5xl text-paper md:text-7xl">
              Establish Contact
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-paper-muted">
            Open for security collaboration, project work, learning circles,
            and practical cyber or app-building missions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="border-l-2 border-signal-red pl-6">
              <h3 className="mb-4 text-4xl text-paper">
                Operational Base
              </h3>
              <div className="space-y-4 font-mono text-sm text-paper-muted">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-signal-red" />
                  <span>Vadodara, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-signal-red" />
                  <span>ethicalrobo06@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-signal-red" />
                  <span>+91 [REDACTED]</span>
                </div>
              </div>
            </div>

            <div className="border border-paper/12 paper-light p-6 text-ink">
              <p className="text-sm leading-7 text-ink/70">
                Best fit: DFIR learning, OSINT tooling, VAPT notes, web app
                builds, and practical cybersecurity collaboration.
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 border border-paper/12 paper-panel p-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-paper-muted">
                  Identifier
                </label>
                <input
                  type="text"
                  className="w-full border border-paper/15 bg-ink/50 px-4 py-3 font-mono text-sm text-paper transition-colors focus:border-signal-red"
                  placeholder="Name or callsign"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-paper-muted">
                  Comms address
                </label>
                <input
                  type="email"
                  className="w-full border border-paper/15 bg-ink/50 px-4 py-3 font-mono text-sm text-paper transition-colors focus:border-signal-red"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-paper-muted">
                Mission details
              </label>
              <textarea
                rows={4}
                className="w-full border border-paper/15 bg-ink/50 px-4 py-3 font-mono text-sm text-paper transition-colors focus:border-signal-red"
                placeholder="Message..."
              />
            </div>
            <button className="group flex w-full items-center justify-center space-x-2 bg-paper py-4 font-mono text-xs uppercase tracking-[0.22em] text-ink transition-all hover:bg-signal-red">
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span>Send message</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
