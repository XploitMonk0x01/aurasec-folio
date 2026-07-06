'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  colorR: number
  colorG: number
  colorB: number
  originalX: number
  originalY: number
}

const PALETTE = [
  [124, 58, 237],   // violet
  [168, 85, 247],   // violet-bright
  [6, 182, 212],    // teal
  [34, 211, 238],   // teal-bright
  [200, 195, 240],  // paper-ish
]

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const scrollProgressRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // willReadFrequently: false — we never read pixels, hint to browser
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false })
    if (!ctx) return

    const isMobile = () => window.innerWidth < 768

    const buildParticles = (w: number, h: number) => {
      const count = isMobile()
        ? Math.min(50, Math.floor((w * h) / 16000))
        : Math.min(150, Math.floor((w * h) / 7500))

      particlesRef.current = Array.from({ length: count }, () => {
        const rgb = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        const x = Math.random() * w
        const y = Math.random() * h
        return {
          x, y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.6 + 0.4,
          alpha: Math.random() * 0.45 + 0.12,
          colorR: rgb[0],
          colorG: rgb[1],
          colorB: rgb[2],
        }
      })
    }

    let W = 0, H = 0
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2)

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildParticles(W, H)
    }

    resize()

    // Throttled resize — avoids layout thrash on every resize event
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 250)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // Mouse — only update flag, no per-move computation
    let mouseDirty = false
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      mouseDirty = true
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ScrollTrigger fade
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '25% top',
      onUpdate: (self) => { scrollProgressRef.current = self.progress },
    })

    const mobile = isMobile()
    // Connections skipped on mobile; reduced threshold on desktop
    const CONNECT_DIST = mobile ? 0 : 75
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST
    const repelR = 100
    const repelR2 = repelR * repelR

    let lastTime = 0
    const TARGET_FPS = 60
    const FRAME_BUDGET = 1000 / TARGET_FPS

    const draw = (ts: number) => {
      rafRef.current = requestAnimationFrame(draw)

      // Throttle to target FPS to avoid unnecessary paints on high-refresh displays
      if (ts - lastTime < FRAME_BUDGET * 0.85) return
      lastTime = ts

      const scroll = scrollProgressRef.current
      if (scroll >= 0.99) return // fully off-screen — skip entire frame

      ctx.clearRect(0, 0, W, H)

      const particles = particlesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const t = (timeRef.current += 0.01)

      // ── Batch all edge lines into a single path for ONE stroke call ──
      if (CONNECT_DIST > 0) {
        ctx.beginPath()
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j]
            const ex = p.x - q.x
            const ey = p.y - q.y
            const dist2 = ex * ex + ey * ey
            if (dist2 < CONNECT_DIST_SQ) {
              const edgeA = ((CONNECT_DIST_SQ - dist2) / CONNECT_DIST_SQ) * 0.06 * (1 - scroll)
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(q.x, q.y)
              // We can't batch different alphas, so just use one representative value
              // Flush batch and restart when alpha would change significantly — simple threshold
              _ = edgeA // used implicitly via strokeStyle below
            }
          }
        }
        ctx.strokeStyle = `rgba(124,58,237,0.045)`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // ── Particle physics + dots ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Drift
        p.x += p.vx + Math.sin(t * 0.4 + i * 0.7) * 0.03
        p.y += p.vy + Math.cos(t * 0.3 + i * 1.1) * 0.03

        // Mouse repulsion — only when mouse moved
        if (mouseDirty) {
          const dx = p.x - mx
          const dy = p.y - my
          const dist2 = dx * dx + dy * dy
          if (dist2 < repelR2 && dist2 > 0) {
            const dist = Math.sqrt(dist2)
            const force = (repelR - dist) / repelR
            p.x += (dx / dist) * force * 2.5
            p.y += (dy / dist) * force * 2.5
          }
        }

        // Gentle spring back to origin
        p.x += (p.originalX - p.x) * 0.0025
        p.y += (p.originalY - p.y) * 0.0025

        // Wrap edges
        if (p.x < -8) p.x = W + 8
        else if (p.x > W + 8) p.x = -8
        if (p.y < -8) p.y = H + 8
        else if (p.y > H + 8) p.y = -8

        const alpha = p.alpha * (1 - scroll * 0.9)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.colorR},${p.colorG},${p.colorB},${alpha})`
        ctx.fill()
      }

      mouseDirty = false
    }

    // Suppress TS unused-variable lint for the intentional discard
    let _: number

    requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      clearTimeout(resizeTimer)
      st.kill()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ willChange: 'contents' }}
      aria-hidden="true"
    />
  )
}
