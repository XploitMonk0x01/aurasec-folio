'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Code2,
  Cpu,
  LayoutDashboard,
  Mail,
  Newspaper,
  Shield,
  Target,
} from 'lucide-react'

const navItems = [
  { name: 'ABOUT', icon: Shield, href: '#about' },
  { name: 'DASH', icon: LayoutDashboard, href: '#dashboard' },
  { name: 'SKILLS', icon: Cpu, href: '#skills' },
  { name: 'LAB', icon: Code2, href: '#frontend' },
  { name: 'BLOG', icon: Newspaper, href: '#blog' },
  { name: 'PROJECTS', icon: Target, href: '#projects' },
  { name: 'CERTS', icon: BookOpen, href: '#certificates' },
  { name: 'CONTACT', icon: Mail, href: '#contact' },
]

export function Navigation() {
  return (
    <nav className="fixed top-0 z-[100] w-full border-b border-cyber-red/15 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <motion.a
          href="#about"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center bg-cyber-red font-stencil text-xl text-black">
            S
          </div>
          <div className="min-w-0">
            <span className="block truncate font-stencil text-lg tracking-widest text-white md:text-xl">
              AURASEC
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 sm:block">
              operator log
            </span>
          </div>
        </motion.a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-cyber-red"
            >
              <item.icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              <span>{item.name}</span>
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyber-red" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-cyber-red/60 sm:block">
            system_active
          </span>
        </div>
      </div>
    </nav>
  )
}
