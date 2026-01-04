"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  lines: string[];
}

export function Terminal({ lines }: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < lines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, lines[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, lines]);

  return (
    <div className="w-full max-w-2xl overflow-hidden border border-cyber-red/30 bg-black/80 font-mono text-sm shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-cyber-red/30 bg-cyber-red/10 px-4 py-2">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-cyber-red" />
          <div className="h-3 w-3 rounded-full bg-army-olive" />
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-cyber-red/70">
          SECURE_TERMINAL_V.4.0
        </div>
      </div>
      <div className="p-4 text-cyber-red/90">
        {displayedLines.map((line, i) => (
          <div key={i} className="mb-1 flex">
            <span className="mr-2 text-army-olive">❯</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {line}
            </motion.span>
          </div>
        ))}
        {currentIndex < lines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block h-4 w-2 bg-cyber-red"
          />
        )}
      </div>
    </div>
  );
}
