'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SocialLinks from '@/components/SocialLinks';
import { gsap } from 'gsap'; // Import GSAP

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
    const containerElement = containerRef.current;

    gsap.fromTo(
      titleElement,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Add a Matrix-style background effect using GSAP
    gsap.to(containerElement, {
      duration: 10,
      x: "+=200", // Move horizontally
      y: "+=100", // Move vertically
      rotation: 360, // Rotate
      scale: 1.2,    // Scale up
      opacity: 0.5,
      repeat: -1,     // Infinite repeat
      yoyo: true,      // Yoyo effect for a smooth loop
      ease: "power1.inOut",
    });
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
     {/*  <div className="terminal-style">
        <TypeAnimation
          sequence={quotes}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="text-green-500"
        />
      </div> */}
      <SocialLinks />
    </motion.div>
  );
};

export default HeroSection;
