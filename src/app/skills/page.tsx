'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

const skills = [
  { name: 'VAPT', logo: '/images/skills/vapt.png' },
  { name: 'Network Analysis', logo: '/images/skills/network.png' },
  { name: 'OSINT', logo: '/images/skills/osint.png' },
  { name: 'Security Auditing', logo: '/images/skills/auditing.png' },
  { name: 'Incident Response', logo: '/images/skills/response.png' },
  { name: 'Cloud Security', logo: '/images/skills/cloud.png' },
  { name: 'Prompt Engineering', logo: '/images/skills/prompt.png' },
]

const SkillsSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.section
      id="skills"
      className="py-6 md:py-12"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Skills</CardTitle>
          <CardDescription>My arsenal of tools and techniques.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {' '}
            {/* Made grid responsive */}
            {skills.map((skill, index) => (
              <motion.li
                key={skill.name}
                variants={skillVariants}
                custom={index}
                whileHover="hover"
                className="flex items-center space-x-2 md:space-x-4 p-2 md:p-4 bg-card rounded-md shadow-md transition-transform"
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="h-6 w-6 md:h-8 md:w-8"
                />{' '}
                {/* Made image responsive */}
                <span className="text-base md:text-lg">{skill.name}</span>{' '}
                {/* Made text responsive */}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  )
}

export default SkillsSection
