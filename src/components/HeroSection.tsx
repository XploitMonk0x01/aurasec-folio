'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import SocialLinks from '@/components/SocialLinks'; // Import SocialLinks

const quotes = [
  "The best way to predict the future is to create it. - Peter Drucker",
  "Security is always excessive until it's not enough. - Robbie Sinclair",
  "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards. - Gene Spafford",
  "To err is human, but to really foul things up requires a computer. - Paul Ehrlich",
];

const HeroSection = () => {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 glitch">
        Thomas Shelby
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-6">
        Cybersecurity Student | Milton University | 2nd Year
      </p>
      <div className="terminal-style">
        <TypeAnimation
          sequence={quotes}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="text-green-500"
        />
      </div>
      <SocialLinks />
    </motion.div>
  );
};

export default HeroSection;

