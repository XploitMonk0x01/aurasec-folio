'use client'

import { motion } from 'framer-motion'

interface ShinyTextProps {
  text: string
  className?: string
  shimmerWidth?: number
  speed?: number
}

export function ShinyText({
  text,
  className = '',
  shimmerWidth = 100,
  speed = 2,
}: ShinyTextProps) {
  return (
    <motion.span
      className={`relative inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
        backgroundSize: `${shimmerWidth}px 100%`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '-100px 0',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'inherit',
      }}
      animate={{
        backgroundPosition: ['calc(-100px)', 'calc(100% + 100px)'],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 1,
      }}
    >
      <span
        className="opacity-80"
        style={{ WebkitTextFillColor: 'currentColor' }}
      >
        {text}
      </span>
      <motion.span
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
          backgroundSize: `${shimmerWidth}px 100%`,
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{
          backgroundPosition: ['-100px 0', 'calc(100% + 100px) 0'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}
