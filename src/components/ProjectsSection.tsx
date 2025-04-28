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

const ProjectsSection = () => {
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
      id="projects"
      className="py-6 md:py-12" // Adjusted py for mobile
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Projects</CardTitle>
          <CardDescription>
            A selection of projects I've worked on.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {' '}
          {/* Adjusted padding for mobile */}
          <p>Here are some of the projects I've been involved in:</p>
          <ul>
            <li>
              - <b>A Netflix clone:</b> built using MERN stack and TMDB API.
              Users can sign in, view trailers, and watch movies
            </li>
            <li>
              - <b>Iphone Website Clone:</b> A clone of the official Apple
              website for Iphone 13. Stack: React, Tailwind CSS, Three js, GSAP
            </li>
            <li>
              - <b>Alumni Website</b> A website for the alumni of a university.
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  )
}

export default ProjectsSection
