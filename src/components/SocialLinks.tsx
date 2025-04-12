'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'

const SocialLinks = () => {
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.2,
      textShadow: '0px 0px 8px rgb(0,255,255)',
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  }

  return (
    <motion.div
      className="flex space-x-6 mt-8"
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
        href="https://www.linkedin.com/in/chandansemwal"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-400 glitch-effect"
        variants={linkVariants}
        whileHover="hover"
      >
        <Linkedin className="h-8 w-8 glowing-icon" />
      </motion.a>
      <motion.a
        href="https://github.com/XploitMonk0x01"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 hover:text-purple-400 glitch-effect"
        variants={linkVariants}
        whileHover="hover"
      >
        <Github className="h-8 w-8 glowing-icon" />
      </motion.a>
    </motion.div>
  )
}

export default SocialLinks
