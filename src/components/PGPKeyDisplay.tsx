'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PGPKeyDisplayProps {
  pgpKey: string
}

export function PGPKeyDisplay({ pgpKey }: PGPKeyDisplayProps) {
  const [displayedKey, setDisplayedKey] = useState('')
  const [isDecrypting, setIsDecrypting] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < pgpKey.length) {
        setDisplayedKey((prev) => prev + pgpKey[currentIndex])
        currentIndex++
      } else {
        setIsDecrypting(false)
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [pgpKey])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono text-sm bg-black/50 p-4 rounded-lg backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isDecrypting ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
          }`}
        />
        <span className="text-xs text-gray-400">
          {isDecrypting ? 'Decrypting PGP Key...' : 'PGP Key Loaded'}
        </span>
      </div>
      <pre className="whitespace-pre-wrap break-all text-green-400">
        {displayedKey}
      </pre>
    </motion.div>
  )
}
