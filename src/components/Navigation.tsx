"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Search, Lock, Cpu, Globe, Mail, BookOpen } from "lucide-react";

const navItems = [
  { name: "ABOUT", icon: Shield, href: "#about" },
  { name: "SKILLS", icon: Cpu, href: "#skills" },
  { name: "PROJECTS", icon: Target, href: "#projects" },
  { name: "CERTIFICATES", icon: BookOpen, href: "#certificates" },
  { name: "CONTACT", icon: Mail, href: "#contact" },
];

export function Navigation() {
  return (
    <nav className="fixed top-0 z-[100] w-full border-b border-cyber-red/20 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="flex h-8 w-8 items-center justify-center bg-cyber-red text-black font-stencil text-xl">
            S
          </div>
          <span className="font-stencil text-xl tracking-widest text-white">OPERATOR_LOG</span>
        </motion.div>
        
        <div className="hidden space-x-8 md:flex">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex items-center space-x-2 font-mono text-xs tracking-[0.2em] text-zinc-400 transition-colors hover:text-cyber-red"
            >
              <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>{item.name}</span>
            </motion.a>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyber-red" />
          <span className="font-mono text-[10px] text-cyber-red/50">SYSTEM_ACTIVE</span>
        </div>
      </div>
    </nav>
  );
}
