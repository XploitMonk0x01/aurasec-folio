'use client'

import React, { useRef } from 'react'
import { Github, Linkedin } from 'lucide-react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const socialIconsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(TextPlugin, ScrollTrigger)

      // Container animation
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          }
        )
      }

      // Title animation
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          duration: 2,
          text: 'Chandan Semwal',
          ease: 'power3.out',
        })
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          duration: 1.5,
          text: 'Cybersecurity Student | Parul University | 3rd Year',
          ease: 'power3.out',
          delay: 0.5,
        })
      }

      // Social icons animation
      if (socialIconsRef.current?.children) {
        gsap.fromTo(
          socialIconsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 1.5,
          }
        )
      }
    }, containerRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <div
      ref={containerRef}
      className="text-center py-8 md:py-16"
      style={{ opacity: 0 }}
    >
      <h1
        className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 glitch neon-glow"
        ref={titleRef}
      ></h1>
      <p
        className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6"
        ref={subtitleRef}
      ></p>
      <div
        ref={socialIconsRef}
        className="flex space-x-4 md:space-x-6 mt-4 md:mt-8 justify-center"
      >
        <a
          href="https://www.linkedin.com/in/chandansemwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 glitch-effect"
        >
          <Linkedin className="h-6 w-6 md:h-8 md:w-8 glowing-icon" />
        </a>
        <a
          href="https://github.com/XploitMonk0x01"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-purple-400 glitch-effect"
        >
          <Github className="h-6 w-6 md:h-8 md:w-8 glowing-icon" />
        </a>
      </div>
    </div>
  )
}

export default HeroSection
