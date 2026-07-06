'use client'

import { motion } from 'framer-motion'

interface GradientTextProps {
  text: string
  className?: string
  colors?: string[]
  animationSpeed?: number
  showBorder?: boolean
}

export function GradientText({
  text,
  className = '',
  colors = ['#ff0040', '#00ff88', '#00d4ff', '#ff0040'],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '300% 100%',
  }

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={gradientStyle}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: animationSpeed,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {showBorder && (
        <span
          className="absolute inset-0 rounded-lg"
          style={{
            ...gradientStyle,
            padding: '2px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
          }}
        />
      )}
      {text}
    </motion.span>
  )
}
