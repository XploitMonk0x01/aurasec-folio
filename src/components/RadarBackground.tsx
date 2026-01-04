"use client";

import React from "react";
import { motion } from "framer-motion";

export function RadarBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="scanline" />
      
      {/* Radar Sweep Effect */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[200vh] w-[200vh] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, rgba(255, 49, 49, 0.03) 10%, transparent 20%)",
        }}
      />
      
      {/* Decorative Circles */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-red/5" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-red/5" />
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-red/5" />
    </div>
  );
}
