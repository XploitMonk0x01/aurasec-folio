'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail } from 'lucide-react'

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-tactical-black/80 px-6 py-24 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-cyber-red">
              secure channel
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-6xl">
              ESTABLISH_COMMUNICATION
            </h2>
          </div>
          <p className="max-w-xl font-mono text-sm leading-relaxed text-zinc-400">
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
            <div className="border-l-2 border-cyber-red pl-6">
              <h3 className="mb-4 font-stencil text-2xl text-white">
                OPERATIONAL_BASE
              </h3>
              <div className="space-y-4 font-mono text-sm text-zinc-400">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-cyber-red" />
                  <span>VADODARA, INDIA // HQ_NORTH_COMMAND</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-cyber-red" />
                  <span>ETHICALROBO06@GMAIL.COM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-cyber-red" />
                  <span>+91 [REDACTED]</span>
                </div>
              </div>
            </div>

            <div className="bg-cyber-red/5 p-6 border border-cyber-red/10">
              <p className="font-mono text-[10px] leading-relaxed text-zinc-500 italic">
                NOTICE: THIS CHANNEL IS ENCRYPTED. ALL COMMUNICATIONS ARE
                MONITORED. SENSITIVE DATA SHOULD BE PGP SIGNED.
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="border border-cyber-red/15 bg-black/45 p-6 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  IDENTIFIER
                </label>
                <input
                  type="text"
                  className="w-full border border-cyber-red/20 bg-black/40 px-4 py-3 font-mono text-sm text-white focus:border-cyber-red focus:outline-none transition-colors"
                  placeholder="NAME / CALLSIGN"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  COMMS_ADDRESS
                </label>
                <input
                  type="email"
                  className="w-full border border-cyber-red/20 bg-black/40 px-4 py-3 font-mono text-sm text-white focus:border-cyber-red focus:outline-none transition-colors"
                  placeholder="EMAIL"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                MISSION_DETAILS
              </label>
              <textarea
                rows={4}
                className="w-full border border-cyber-red/20 bg-black/40 px-4 py-3 font-mono text-sm text-white focus:border-cyber-red focus:outline-none transition-colors"
                placeholder="MESSAGE..."
              />
            </div>
            <button className="group flex w-full items-center justify-center space-x-2 bg-cyber-red py-4 font-stencil text-black transition-all hover:bg-white">
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span>TRANSMIT_DATA</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
