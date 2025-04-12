'use client'

import React, { useEffect, useRef } from 'react'
import { Github, Linkedin } from 'lucide-react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.registerPlugin(TextPlugin)

    const titleElement = titleRef.current
    const subtitleElement = subtitleRef.current

    if (titleElement && subtitleElement) {
      gsap.to(titleElement, {
        duration: 2,
        text: 'Chandan Semwal',
        ease: 'power3.out',
      })

      gsap.to(subtitleElement, {
        duration: 1.5,
        text: 'Cybersecurity Student | Parul University | 2nd Year',
        ease: 'power3.out',
        delay: 0.5,
      })
    }
  }, [])

  return (
    <div
      className="text-center py-8 md:py-16 fade-in" // Adjusted py for mobile
      style={{ opacity: 1, scale: 1 }}
    >
      <h1
        className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 glitch neon-glow" // Adjusted text size for mobile
        ref={titleRef}
      ></h1>
      <p
        className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6" // Adjusted text size for mobile
        ref={subtitleRef}
      ></p>
      <div
        className="flex space-x-4 md:space-x-6 mt-4 md:mt-8 justify-center" // Adjusted spacing for mobile
      >
        <a
          href="https://www.linkedin.com/in/chandansemwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 glitch-effect"
        >
          <Linkedin className="h-6 w-6 md:h-8 md:w-8 glowing-icon" />{' '}
          {/* Adjusted icon size for mobile */}
        </a>
        <a
          href="https://github.com/XploitMonk0x01"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-purple-400 glitch-effect"
        >
          <Github className="h-6 w-6 md:h-8 md:w-8 glowing-icon" />{' '}
          {/* Adjusted icon size for mobile */}
        </a>
      </div>
    </div>
  )
}

export default HeroSection
