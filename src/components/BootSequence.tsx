'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootMessages = [
  { text: 'Initializing system...', delay: 0 },
  { text: 'Loading kernel modules...', delay: 1000 },
  { text: 'Checking security protocols...', delay: 2000 },
  { text: 'Establishing secure connection...', delay: 3000 },
  { text: 'Loading encryption keys...', delay: 4000 },
  { text: 'Starting defense mechanisms...', delay: 5000 },
  { text: 'System ready.', delay: 6000 },
]

interface BootSequenceProps {
  onComplete?: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [canSkip, setCanSkip] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (hasInitialized.current) return
    hasInitialized.current = true

    // Allow skipping after first message
    const skipTimer = setTimeout(() => {
      setCanSkip(true)
    }, 1000)

    const timeouts: NodeJS.Timeout[] = []

    bootMessages.forEach(({ text, delay }) => {
      const timeout = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, text])
        if (text === bootMessages[bootMessages.length - 1].text) {
          setIsComplete(true)
          const completeTimeout = setTimeout(() => {
            onComplete?.()
          }, 2000)
          timeouts.push(completeTimeout)
        }
      }, delay)
      timeouts.push(timeout)
    })

    return () => {
      clearTimeout(skipTimer)
      timeouts.forEach(clearTimeout)
    }
  }, [])

  // Handle key press to skip boot sequence
  useEffect(() => {
    const handleKeyPress = () => {
      if (canSkip || isComplete) {
        onComplete?.()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('click', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('click', handleKeyPress)
    }
  }, [canSkip, isComplete, onComplete])

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-2xl p-8">
        <AnimatePresence>
          {visibleMessages.map((message, index) => (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-green-500 mb-2 flex items-start gap-2"
            >
              <span className="text-blue-400">
                [{String(index).padStart(2, '0')}]
              </span>
              <span>{message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-green-400 font-mono text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="animate-pulse">▶</span>
              <span>Press any key to continue...</span>
              <span className="animate-pulse">◀</span>
            </div>
          </motion.div>
        )}
        {canSkip && !isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="mt-6 text-gray-500 font-mono text-center text-sm"
          >
            Press any key to skip...
          </motion.div>
        )}
      </div>
    </div>
  )
}
