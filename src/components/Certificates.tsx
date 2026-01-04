"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Filter } from "lucide-react";

const categories = ["ALL", "QUICK HEAL", "CLOUD", "API", "HACKATHONS"];

const certificates = [
  { id: 1, title: "Quick Heal Academy Certified Specialist", issuer: "Quick Heal Academy", category: "QUICK HEAL", date: "2023" },
  { id: 2, title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", category: "CLOUD", date: "2023" },
  { id: 3, title: "API Security Testing Expert", issuer: "Security Blue Team", category: "API", date: "2024" },
  { id: 4, title: "1st Place - National Cyber Hackathon", issuer: "Govt of India", category: "HACKATHONS", date: "2023" },
  { id: 5, title: "Azure Security Engineer Associate", issuer: "Microsoft", category: "CLOUD", date: "2024" },
  { id: 6, title: "Offensive Security API Research", issuer: "Quick Heal Academy", category: "QUICK HEAL", date: "2024" },
];

export function Certificates() {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" 
    ? certificates 
    : certificates.filter(c => c.category === filter);

  return (
    <section id="certificates" className="py-24 px-6 bg-tactical-black/50">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-stencil text-white md:text-6xl">
          <span className="text-cyber-red">_</span>CERTIFICATIONS
        </h2>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 font-mono text-xs tracking-widest transition-all ${
                filter === cat 
                  ? "bg-cyber-red text-black" 
                  : "border border-cyber-red/20 text-zinc-500 hover:border-cyber-red/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative border border-cyber-red/10 bg-black/60 p-6 hover:border-cyber-red/40"
              >
                <div className="mb-4 flex items-start justify-between">
                  <Award className="h-8 w-8 text-cyber-red/60 group-hover:text-cyber-red" />
                  <span className="font-mono text-[10px] text-zinc-600">{cert.date}</span>
                </div>
                <h3 className="mb-2 font-mono text-sm font-bold uppercase tracking-wider text-white">
                  {cert.title}
                </h3>
                <p className="mb-4 font-mono text-[10px] text-zinc-400">
                  ISSUER: {cert.issuer}
                </p>
                <div className="flex items-center justify-between border-t border-cyber-red/10 pt-4">
                  <span className="text-[9px] uppercase tracking-widest text-army-olive">
                    VERIFIED_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                  </span>
                  <ExternalLink className="h-4 w-4 text-zinc-600 transition-colors hover:text-cyber-red cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
