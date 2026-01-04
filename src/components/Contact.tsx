"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-tactical-black/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-stencil text-white md:text-6xl">
          <span className="text-cyber-red">_</span>ESTABLISH_COMMUNICATION
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="border-l-2 border-cyber-red pl-6">
              <h3 className="mb-4 font-stencil text-2xl text-white">OPERATIONAL_BASE</h3>
              <div className="space-y-4 font-mono text-sm text-zinc-400">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-cyber-red" />
                  <span>NEW DELHI, INDIA // HQ_NORTH_COMMAND</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-cyber-red" />
                  <span>OPERATOR@CYBER_MAROON.MIL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-cyber-red" />
                  <span>+91 [REDACTED]</span>
                </div>
              </div>
            </div>

            <div className="bg-cyber-red/5 p-6 border border-cyber-red/10">
              <p className="font-mono text-[10px] leading-relaxed text-zinc-500 italic">
                NOTICE: THIS CHANNEL IS ENCRYPTED. ALL COMMUNICATIONS ARE MONITORED. 
                SENSITIVE DATA SHOULD BE PGP SIGNED.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">IDENTIFIER</label>
                <input 
                  type="text" 
                  className="w-full border border-cyber-red/20 bg-black/40 px-4 py-3 font-mono text-sm text-white focus:border-cyber-red focus:outline-none transition-colors"
                  placeholder="NAME / CALLSIGN"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">COMMS_ADDRESS</label>
                <input 
                  type="email" 
                  className="w-full border border-cyber-red/20 bg-black/40 px-4 py-3 font-mono text-sm text-white focus:border-cyber-red focus:outline-none transition-colors"
                  placeholder="EMAIL"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">MISSION_DETAILS</label>
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
  );
}
