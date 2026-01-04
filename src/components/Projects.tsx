"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ShieldAlert } from "lucide-react";

const projects = [
  {
    title: "Project Ghost Protocol",
    description: "An automated OSINT framework for deep-web intelligence gathering and target profiling.",
    tags: ["OSINT", "PYTHON", "DOCKER"],
    status: "DEPLOYED",
  },
  {
    title: "Shadow Net Analyzer",
    description: "Real-time network traffic analysis tool with anomaly detection for DFIR operations.",
    tags: ["DFIR", "GO", "WIRESHARK"],
    status: "IN_TESTING",
  },
  {
    title: "Aegis Cloud Sentry",
    description: "Multi-cloud security posture management tool with automated compliance checks.",
    tags: ["CLOUD", "NEXT.JS", "AWS"],
    status: "MISSION_CRITICAL",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-stencil text-white md:text-6xl">
          <span className="text-cyber-red">_</span>OPERATIONAL_PROJECTS
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative border border-cyber-red/10 bg-black/40 p-1 hover:border-cyber-red/40"
            >
              <div className="bg-tactical-black p-6">
                <div className="mb-4 flex items-center justify-between">
                  <ShieldAlert className="h-6 w-6 text-cyber-red" />
                  <span className={`font-mono text-[9px] px-2 py-0.5 border ${
                    project.status === 'MISSION_CRITICAL' ? 'border-cyber-red text-cyber-red animate-pulse' : 'border-army-olive text-army-olive'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="mb-3 font-stencil text-xl text-white group-hover:text-cyber-red">
                  {project.title}
                </h3>
                
                <p className="mb-6 font-mono text-xs leading-relaxed text-zinc-400">
                  {project.description}
                </p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-zinc-900 px-2 py-1 font-mono text-[9px] text-zinc-500">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4 border-t border-cyber-red/10 pt-4">
                  <Github className="h-5 w-5 text-zinc-500 hover:text-white cursor-pointer" />
                  <ExternalLink className="h-5 w-5 text-zinc-500 hover:text-white cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
