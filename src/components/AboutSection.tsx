'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const AboutSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <motion.section
      id="about"
      className="py-6 md:py-12" // Adjusted py for mobile
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">About Me</CardTitle>
          <CardDescription>
            A brief overview of my background and interests.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {' '}
          {/* Adjusted padding for mobile */}
          <p>
            I am a cybersecurity student at Parul University, currently in my
            2nd year. I am passionate about network security, ethical hacking,
            and protecting digital assets.
          </p>
          <br />
          <p>My technical skills include:</p>
          <ul>
            <li>- Penetration Testing</li>
            <li>- Network Analysis</li>
            <li>- Cloud Security</li>
            <li>- OSINT</li>
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  )
}

export default AboutSection
