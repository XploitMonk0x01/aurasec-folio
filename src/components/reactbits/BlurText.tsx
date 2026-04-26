'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface BlurTextProps {
  text?: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  stepDuration?: number
  onAnimationComplete?: () => void
}

export function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  stepDuration = 0.35,
  onAnimationComplete,
}: BlurTextProps) {
  const elements = useMemo(() => {
    return animateBy === 'words' ? text.split(' ') : text.split('')
  }, [text, animateBy])

  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)
  const animatedCount = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'top' ? -20 : 20,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * (delay / 1000),
        duration: stepDuration,
        ease: 'easeOut',
      },
    }),
  }

  const handleAnimationComplete = () => {
    animatedCount.current += 1
    if (animatedCount.current === elements.length && onAnimationComplete) {
      onAnimationComplete()
    }
  }

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          onAnimationComplete={handleAnimationComplete}
          className="inline-block"
          style={{ marginRight: animateBy === 'words' ? '0.3em' : '0' }}
        >
          {el}
        </motion.span>
      ))}
    </p>
  )
}
