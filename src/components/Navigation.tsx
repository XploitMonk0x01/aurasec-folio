'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  FolderKanban,
  Mail,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
  Fingerprint,
} from 'lucide-react'

const navItems = [
  { name: 'Profile', icon: Fingerprint, href: '#about' },
  { name: 'Dashboard', icon: ShieldCheck, href: '#dashboard' },
  { name: 'Skills', icon: Sparkles, href: '#skills' },
  { name: 'Projects', icon: FolderKanban, href: '#projects' },
  { name: 'Writing', icon: Newspaper, href: '#blog' },
  { name: 'Records', icon: BookOpen, href: '#certificates' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? 'pt-4' : 'pt-6'
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`flex w-full items-center justify-between gap-4 rounded-full border transition-all duration-500 ${
              scrolled
                ? 'border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-2xl'
                : 'border-transparent bg-transparent px-2 py-2'
            }`}
          >
            {/* Logo */}
            <a href="#about" className="group flex shrink-0 items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet to-purple-600 font-display text-lg font-bold italic text-white transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                C
              </div>
              <div className="hidden min-w-0 md:block">
                <span className="block truncate font-mono text-[11px] uppercase tracking-[0.34em] text-foreground transition-colors group-hover:text-violet-bright">
                  Chandan Singh
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground"
                >
                  <item.icon className="h-3.5 w-3.5 opacity-50 transition-colors group-hover:text-violet-bright group-hover:opacity-100" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center lg:flex">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-violet-bright backdrop-blur-sm transition-all hover:bg-violet hover:text-white"
              >
                Contact
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition hover:bg-white/10 lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] bg-[#06060A]/95 backdrop-blur-2xl"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet to-purple-600 font-display text-lg font-bold italic text-white">
                  C
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.34em] text-foreground">
                  Navigation
                </div>
              </div>

              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex h-[calc(100vh-100px)] flex-col justify-center px-6 pb-12">
              <div className="grid gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, ease: 'easeOut' }}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-6 py-5 transition-all hover:border-violet/40 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/10">
                        <item.icon className="h-5 w-5 text-violet-bright" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-foreground">
                        {item.name}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet to-purple-600 py-5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-violet/20"
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
