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

const ContactSection = () => {
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
      id="contact"
      className="py-6 md:py-12" // Adjusted py for mobile
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contact Me</CardTitle>
          <CardDescription>How to get in touch with me.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {' '}
          {/* Adjusted padding for mobile */}
          <p>Feel free to reach out to me through the following channels:</p>
          <ul>
            <li>
              - <b>Email:</b>{' '}
              <a href="mailto:ethicalrobo06@gmail.com">
                ethicalrobo06@gmail.com
              </a>
            </li>
            <li>
              - <b>LinkedIn:</b>{' '}
              <a
                href="https://www.linkedin.com/in/chandansemwal"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/chandansemwal
              </a>
            </li>
            <li>
              - <b>GitHub:</b>{' '}
              <a
                href="https://github.com/XploitMonk0x01"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/XploitMonk0x01
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  )
}

export default ContactSection
