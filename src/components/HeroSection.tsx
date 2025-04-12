'use client';

import React, { useEffect, useRef } from 'react';
import { Github, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { TypeAnimation } from 'react-type-animation';

const quotes = [
  "The best way to predict the future is to create it. - Peter Drucker",
  "Security is always excessive until it's not enough. - Robbie Sinclair",
  "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards. - Gene Spafford",
  "To err is human, but to really foul things up requires a computer. - Paul Ehrlich",
];

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;

    if (titleElement && subtitleElement) {
      gsap.to(
        titleElement,
        {
          duration: 2,
          text: "Thomas Shelby",
          ease: "power3.out",
        }
      );

      gsap.to(
        subtitleElement,
        {
          duration: 1.5,
          text: "Cybersecurity Student | Milton University | 2nd Year",
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <div
      className="text-center py-16 fade-in"
      style={{ opacity: 1, scale: 1 }}
    >
      <h1
        className="text-4xl md:text-5xl font-bold text-white mb-4 glitch neon-glow"
        ref={titleRef}
      >
      </h1>
      <p
        className="text-lg md:text-xl text-gray-300 mb-6"
        ref={subtitleRef}
      >
      </p>
      <div
        className="flex space-x-6 mt-8 justify-center"
      >
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 glitch-effect"
        >
          <Linkedin className="h-8 w-8 glowing-icon" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-purple-400 glitch-effect"
        >
          <Github className="h-8 w-8 glowing-icon" />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
