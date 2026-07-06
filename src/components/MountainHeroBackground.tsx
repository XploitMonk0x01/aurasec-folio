'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

type MountainHeroBackgroundProps = {
  className?: string
  overlayOpacity?: number
}

const DEFAULT_PLACEHOLDER =
  // Placeholder "night ridge photo" vibe using inline SVG noise + ridge silhouettes.
  // Swap by editing DEFAULT_PLACEHOLDER or extracting to a prop later.
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="g0" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070812"/>
      <stop offset="0.6" stop-color="#0D0D12"/>
      <stop offset="1" stop-color="#050509"/>
    </linearGradient>
    <linearGradient id="h" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5DA9E9" stop-opacity="0.12"/>
      <stop offset="0.55" stop-color="#F2994A" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <filter id="n" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="matrix"
        values="0 0 0 0 0.2
                0 0 0 0 0.2
                0 0 0 0 0.3
                0 0 0 0.65 0" />
    </filter>
  </defs>
  <rect width="1600" height="900" fill="url(#g0)"/>
  <rect width="1600" height="900" filter="url(#n)" opacity="0.25"/>
  <path d="M0,650 C220,580 320,590 520,540 C760,480 920,520 1120,470 C1330,415 1460,470 1600,430 L1600,900 L0,900 Z"
        fill="#0B0B14" opacity="0.9"/>
  <path d="M0,700 C180,640 360,670 520,610 C760,520 860,580 1080,540 C1290,500 1460,540 1600,510 L1600,900 L0,900 Z"
        fill="#0A0A12" opacity="0.95"/>
  <rect width="1600" height="900" fill="url(#h)"/>
</svg>
`)

export function MountainHeroBackground({
  className = '',
  overlayOpacity = 0.72,
}: MountainHeroBackgroundProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrollY(window.scrollY || 0))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const bgStyle = useMemo(() => {
    // 30% scroll speed for the background layer
    const parallax = scrollY * 0.3
    return {
      transform: `translateY(${parallax}px) scale(1.05)`,
      backgroundImage: `url("${DEFAULT_PLACEHOLDER}")`,
    } as React.CSSProperties
  }, [scrollY])

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={bgStyle}
      />
      {/* darken/desaturate overlay to keep editorial readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(13,13,18,0.15) 0%, rgba(13,13,18,0.65) 48%, rgba(13,13,18,0.92) 100%)',
          opacity: overlayOpacity,
        }}
      />
      {/* subtle contour-line pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.10) 0 1px, transparent 2px), radial-gradient(circle at 82% 26%, rgba(255,255,255,0.08) 0 1px, transparent 2px), radial-gradient(circle at 52% 78%, rgba(255,255,255,0.06) 0 1px, transparent 2px)',
          mixBlendMode: 'overlay',
          opacity: 0.18,
        }}
      />
    </div>
  )
}
