'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import gsap from 'gsap'; // Import GSAP for client-side usage

const quotes = [
  "The best way to predict the future is to create it. - Peter Drucker",
  "Security is always excessive until it's not enough. - Robbie Sinclair",
  "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards. - Gene Spafford",
  "To err is human, but to really foul things up requires a computer. - Paul Ehrlich",
];

const HeroSection = () => {
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const titleElement = titleRef.current;

    // Add animations using GSAP
    gsap.fromTo(
      titleElement,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <motion.div
      className="text-center py-16 fade-in"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      ref={containerRef}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 glitch neon-glow" ref={titleRef}>
        Thomas Shelby
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-6">
        Cybersecurity Student | Milton University | 2nd Year
      </p>
      <motion.div
        className="flex space-x-6 mt-8 justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              delayChildren: 0.8,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 glitch-effect"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            hover: {
              scale: 1.2,
              textShadow: "0px 0px 8px rgb(0,255,255)",
              transition: {
                duration: 0.3,
                yoyo: Infinity
              }
            },
          }}
          whileHover="hover"
        >
          <Linkedin className="h-8 w-8 glowing-icon" />
        </motion.a>
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-purple-400 glitch-effect"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            hover: {
              scale: 1.2,
              textShadow: "0px 0px 8px rgb(0,255,255)",
              transition: {
                duration: 0.3,
                yoyo: Infinity
              }
            },
          }}
          whileHover="hover"
        >
          <Github className="h-8 w-8 glowing-icon" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
