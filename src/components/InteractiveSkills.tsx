"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Search, Cpu, Globe, Terminal, Cloud, Activity, Code, Database, Smartphone, Laptop } from "lucide-react";

const skills = [
  { name: "Digital Forensics", icon: Search, category: "Cyber" },
  { name: "Network Analysis", icon: Activity, category: "Cyber" },
  { name: "OSINT", icon: Globe, category: "Cyber" },
  { name: "Incident Response", icon: Shield, category: "Cyber" },
  { name: "Cloud Security", icon: Cloud, category: "Cyber" },
  { name: "Prompt Engineering", icon: Terminal, category: "Cyber" },
  { name: "VAPT", icon: Lock, category: "Cyber" },
  { name: "MERN Stack", icon: Database, category: "Dev" },
  { name: "Next.js", icon: Code, category: "Dev" },
  { name: "Docker", icon: Laptop, category: "Dev" },
  { name: "React Native", icon: Smartphone, category: "Dev" },
  { name: "C / C++", icon: Cpu, category: "Dev" },
];

export function InteractiveSkills() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-stencil text-white md:text-6xl">
          <span className="text-cyber-red">_</span>SKILLS_MATRIX
        </h2>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="relative aspect-square overflow-hidden border border-cyber-red/20 bg-black/40 p-4 transition-colors hover:border-cyber-red/60"
            >
              <div className="flex h-full flex-col items-center justify-center space-y-4">
                <skill.icon className={`h-8 w-8 transition-colors ${hoveredIdx === idx ? 'text-cyber-red' : 'text-zinc-500'}`} />
                <span className="text-center font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  {skill.name}
                </span>
              </div>
              
              {hoveredIdx === idx && (
                <motion.div
                  layoutId="scan"
                  className="absolute inset-0 z-10 bg-cyber-red/5"
                  initial={{ top: "-100%" }}
                  animate={{ top: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              )}
              
              <div className="absolute top-0 right-0 p-1">
                <div className={`h-1 w-1 rounded-full ${skill.category === 'Cyber' ? 'bg-cyber-red' : 'bg-army-olive'}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
