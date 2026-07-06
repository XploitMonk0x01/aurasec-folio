'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextProps {
  text?: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'center' | 'right'
  onLetterAnimationComplete?: () => void
}

export function SplitText({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const elements =
    splitType === 'chars'
      ? text.split('')
      : splitType === 'words'
        ? text.split(' ')
        : [text]

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.split-char')

    gsap.set(chars, from)

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: `top bottom${rootMargin}`,
      onEnter: () => {
        gsap.to(chars, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: onLetterAnimationComplete,
        })
      },
      once: true,
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [
    text,
    delay,
    duration,
    ease,
    from,
    to,
    rootMargin,
    onLetterAnimationComplete,
  ])

  return (
    <div ref={containerRef} className={className} style={{ textAlign }}>
      {elements.map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            marginRight: splitType === 'words' ? '0.3em' : undefined,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}
