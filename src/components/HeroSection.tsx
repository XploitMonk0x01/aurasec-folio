'use client'

import React, { useRef } from 'react'
import { Github, Linkedin } from 'lucide-react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const socialIconsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Wait a frame to ensure DOM is ready
    const timeout = setTimeout(() => {
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

      // Social icons animation
      if (
        socialIconsRef.current?.children &&
        socialIconsRef.current.children.length > 0
      ) {
        gsap.fromTo(
          Array.from(socialIconsRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 0.5,
          }
        )
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="text-center py-8 md:py-16"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.2 },
      }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-green-400 mb-2 md:mb-4 glitch neon-glow"
        ref={titleRef}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false }}
        whileHover={{
          scale: 1.05,
          textShadow: '0 0 20px #00ff00, 0 0 40px #00ff00',
        }}
      >
        Chandan Semwal
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-cyan-300 mb-4 md:mb-6"
        ref={subtitleRef}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: false }}
        whileHover={{
          color: '#00ff00',
          scale: 1.02,
        }}
      >
        Cybersecurity Student | Parul University | 3rd Year
      </motion.p>
      <motion.div
        ref={socialIconsRef}
        className="flex space-x-4 md:space-x-6 mt-4 md:mt-8 justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: false }}
      >
        <motion.a
          href="https://www.linkedin.com/in/chandansemwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 glitch-effect"
          whileHover={{
            scale: 1.3,
            rotate: 360,
            filter: 'drop-shadow(0 0 15px #0077b5)',
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Linkedin className="h-6 w-6 md:h-8 md:w-8 glowing-icon" />
        </motion.a>
        <motion.a
          href="https://github.com/XploitMonk0x01"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-purple-400 glitch-effect"
          whileHover={{
            scale: 1.3,
            rotate: -360,
            filter: 'drop-shadow(0 0 15px #8b5cf6)',
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Github className="h-6 w-6 md:h-8 md:w-8 glowing-icon" />
        </motion.a>
      </motion.div>

      {/* Hacker-style data flow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        viewport={{ once: false }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-green-500/30 to-transparent"
            style={{ left: `${20 + i * 30}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: 1.5 + i * 0.5,
              repeat: Infinity,
              repeatDelay: 8,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default HeroSection
