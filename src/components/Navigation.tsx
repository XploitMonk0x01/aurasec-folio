'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Code2,
  Fingerprint,
  FolderKanban,
  Mail,
  Newspaper,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

const navItems = [
  { name: 'Profile', icon: Fingerprint, href: '#about' },
  { name: 'Control', icon: ShieldCheck, href: '#dashboard' },
  { name: 'Skills', icon: Sparkles, href: '#skills' },
  { name: 'Lab', icon: Code2, href: '#frontend' },
  { name: 'Writing', icon: Newspaper, href: '#blog' },
  { name: 'Work', icon: FolderKanban, href: '#projects' },
  { name: 'Records', icon: BookOpen, href: '#certificates' },
  { name: 'Contact', icon: Mail, href: '#contact' },
]

export function Navigation() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[100] border-b border-paper/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <motion.a
          href="#about"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center border border-paper/20 bg-paper text-xl font-display italic text-ink">
            C
          </div>
          <div className="min-w-0">
            <span className="block truncate font-mono text-[11px] uppercase tracking-[0.34em] text-paper">
              Chandan Singh
            </span>
            <span className="hidden text-xs text-paper-muted sm:block">
              DFIR, OSINT and frontend systems
            </span>
          </div>
        </motion.a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.035 }}
              className="group flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted transition-colors hover:text-paper"
            >
              <item.icon className="h-4 w-4 text-oxide transition-colors group-hover:text-signal-red" />
              <span>{item.name}</span>
            </motion.a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden border border-signal-red/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-signal-red transition hover:bg-signal-red hover:text-ink md:inline-flex"
        >
          Available
        </a>
      </div>
    </nav>
  )
}
