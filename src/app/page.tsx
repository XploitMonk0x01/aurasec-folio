'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { Terminal } from '@/components/Terminal'
import { InteractiveSkills } from '@/components/InteractiveSkills'
import { Certificates } from '@/components/Certificates'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'
import { RadarBackground } from '@/components/RadarBackground'
import { Shield, Target, Lock, Cpu, Search } from 'lucide-react'

export default function Home() {
  const terminalLines = [
    'INITIALIZING_SECURE_CONNECTION...',
    'ACCESS_GRANTED: XPLOITMONK0X01',
    'DOMAIN: DFIR // OSINT // VAPT',
    'SPECIALIZATION: CYBER_SECURITY',
    'STATUS: MISSION_READY',
    'CURRENT_OBJECTIVE: SECURE_THE_FUTURE',
  ]

  return (
    <main className="relative min-h-screen selection:bg-cyber-red selection:text-black">
      <RadarBackground />
      <Navigation />

      {/* Hero / About Section */}
      <section
        id="about"
        className="flex min-h-screen flex-col items-center justify-center px-6 pt-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-4 font-stencil text-5xl leading-none text-white md:text-8xl">
                CHANDAN_<span className="text-cyber-red">SINGH</span>
              </h1>
              <p className="mb-8 font-mono text-sm tracking-widest text-army-olive md:text-lg">
                DFIR_PRACTITIONER // OSINT_SPECIALIST // PROMPT_ENGINEER
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyber-red px-8 py-3 font-stencil text-black transition-all hover:bg-white"
                >
                  DOWNLOAD_INTEL
                </motion.button>
                <motion.a
                  href="https://linkedin.com/in/chandansemwal"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-cyber-red/30 px-8 py-3 font-stencil text-white transition-all hover:border-cyber-red"
                >
                  CONNECT_LINKEDIN
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <Terminal lines={terminalLines} />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <div className="h-10 w-6 rounded-full border border-cyber-red/20 flex justify-center p-1">
            <div className="h-2 w-1 bg-cyber-red rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Description Section */}
      <section className="py-24 px-6 bg-black/40">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 font-stencil text-3xl text-white md:text-5xl uppercase tracking-tighter">
            <span className="text-cyber-red">OPERATOR</span>_PROFILE
          </h2>
          <div className="font-mono text-sm md:text-base leading-relaxed text-zinc-400">
            <p>
              I am a cybersecurity student at Parul University (3rd year). I'm
              passionate about network security, ethical hacking, and protecting
              digital assets. I enjoy hands-on learning through labs, CTF-style
              challenges, and building practical tools that improve security and
              automation. I also build web and Android apps, and I'm flexible
              with programming languages like Python, Java, C, C++, JavaScript,
              Bash scripting, and PowerShell.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'GITHUB_CONTRIBUTIONS', value: '305+' },
              { label: 'GITHUB_REPOS', value: '34' },
              { label: 'THM_ROOMS_COMPLETE', value: '156' },
              { label: 'THM_BADGES', value: '12' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-stencil text-3xl text-cyber-red">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] text-zinc-600 tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InteractiveSkills />
      <Projects />
      <Certificates />
      <Contact />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-cyber-red/10 text-center">
        <p className="font-mono text-[10px] text-zinc-600 tracking-[0.5em] uppercase">
          &copy; 2025 // XploitMonk0x01 // ALL_RIGHTS_RESERVED
        </p>
      </footer>
    </main>
  )
}
