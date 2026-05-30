'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function RadarBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 ink-grid opacity-35" />
      <div className="absolute left-[7%] top-[18%] h-[36rem] w-[18rem] -rotate-12 border border-paper/10 bg-paper/5" />
      <div className="absolute right-[5%] top-[10%] h-[28rem] w-[28rem] border border-oxide/20 bg-oxide/5" />
      <div className="absolute bottom-[-18rem] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full border border-signal-red/15" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-40 top-28 h-[44rem] w-[44rem] rounded-full border border-paper/10"
      >
        <div className="absolute left-1/2 top-0 h-1/2 w-px bg-gradient-to-b from-signal-red/45 to-transparent" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,transparent,rgba(8,8,6,0.72)_68%)]" />
      <div className="scanline opacity-40" />
    </div>
  )
}
