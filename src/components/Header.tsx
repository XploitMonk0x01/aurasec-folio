'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { motion } from 'motion/react'

const Header: React.FC = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <SidebarTrigger className="lg:hidden" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="#" className="flex items-center space-x-2">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  filter: [
                    'drop-shadow(0 0 5px #00ff00)',
                    'drop-shadow(0 0 10px #00ff00)',
                    'drop-shadow(0 0 5px #00ff00)',
                  ],
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                  filter: { duration: 2.5, repeat: Infinity },
                }}
                whileHover={{ scale: 1.2 }}
              >
                <Icons.shield
                  className="h-6 w-6 text-green-500"
                  aria-hidden="true"
                />
              </motion.div>
              <motion.span
                className="font-bold"
                animate={{
                  textShadow: [
                    '0 0 5px #00ff00',
                    '0 0 15px #00ff00, 0 0 25px #00ff00',
                    '0 0 5px #00ff00',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{
                  scale: 1.05,
                  textShadow: '0 0 20px #00ff00',
                }}
              >
                Hacker's Portfolio
              </motion.span>
            </Link>
          </motion.div>
        </div>
        <nav className="flex items-center space-x-2">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild variant="ghost" size="sm">
              <a
                href="https://github.com/XploitMonk0x01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{
                    rotate: 360,
                    filter: 'drop-shadow(0 0 8px #00ff00)',
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icons.github className="mr-2 h-4 w-4" aria-hidden="true" />
                </motion.div>
                <motion.span whileHover={{ color: '#00ff00' }}>
                  GitHub
                </motion.span>
              </a>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild variant="ghost" size="sm">
              <a
                href="https://www.linkedin.com/in/chandansemwal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    filter: 'drop-shadow(0 0 8px #0077b5)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icons.linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                </motion.div>
                <motion.span whileHover={{ color: '#0077b5' }}>
                  LinkedIn
                </motion.span>
              </a>
            </Button>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
