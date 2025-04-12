'use client'

import AboutSection from '@/components/AboutSection'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <AboutSection />
    </motion.div>
  )
}
