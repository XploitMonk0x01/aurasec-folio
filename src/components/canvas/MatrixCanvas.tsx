'use client'

import { useEffect, useRef } from 'react'
import { useDprCanvas } from '@/lib/hooks/useDprCanvas'

interface MatrixCanvasProps {
  width?: number
  height?: number
  intensity?: number
}

const DEFAULTS = {
  fontSize: 18,
  baseSpeed: 110,
  intensity: 0.55,
  fadeAlpha: 0.06,
  maxDropsPerColumn: 2,
}

interface Drop {
  y: number
  speed: number
  length: number
  opacityStart: number
}

interface Column {
  x: number
  drops: Drop[]
  head: Drop | null
}

export const MatrixCanvas = ({
  width = window.innerWidth,
  height = window.innerHeight,
  intensity = DEFAULTS.intensity,
}: MatrixCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setupCanvas } = useDprCanvas()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { context: ctx, dpr } = setupCanvas(canvas, width, height)
    if (!ctx) return

    // Font setup
    const fontSize = DEFAULTS.fontSize
    ctx.font = `${fontSize}px "JetBrains Mono"`
    ctx.textAlign = 'center'

    // Initialize columns
    const columns: Column[] = []
    const columnWidth = fontSize
    const columnCount = Math.ceil(width / columnWidth)

    for (let i = 0; i < columnCount; i++) {
      columns.push({
        x: i * columnWidth,
        drops: [],
        head: null,
      })
    }

    // Animation state
    let rafId: number
    let last = performance.now()

    // Matrix characters
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'.split('')

    function rand() {
      return Math.random()
    }

    // Update function
    function update(now: number) {
      if (!ctx || !canvas) return
      const dt = (now - last) / 1000
      last = now

      ctx.fillStyle = `rgba(11,15,16,${DEFAULTS.fadeAlpha})` // #0b0f10 consistent with bg900
      ctx.fillRect(0, 0, width, height)

      // Update and draw columns
      for (const col of columns) {
        if (col.head) {
          col.head.y += col.head.speed * dt

          // Draw head
          ctx.fillStyle = '#00ff7a' // Consistent with theme neon color
          ctx.fillText(
            chars[Math.floor(rand() * chars.length)],
            col.x,
            col.head.y
          )

          // Draw tail
          const tailLength = col.head.length * fontSize
          for (let i = 1; i < tailLength / fontSize; i++) {
            const opacity = 1 - i / (tailLength / fontSize)
            ctx.fillStyle = `rgba(0,255,122,${opacity * 0.5})`
            ctx.fillText(
              chars[Math.floor(rand() * chars.length)],
              col.x,
              col.head.y - i * fontSize
            )
          }

          // Remove if offscreen
          if (col.head.y > canvas.height + col.head.length * fontSize) {
            col.head = null
          }
        }

        // Spawn new drops
        if (!col.head && rand() < 0.03 * intensity) {
          col.head = {
            y: -fontSize,
            speed: DEFAULTS.baseSpeed * (1 + rand() * 1.4 - 0.6),
            length: Math.floor(8 + rand() * 16),
            opacityStart: 1,
          }
        }
      }

      rafId = requestAnimationFrame(update)
    }

    // Start animation
    rafId = requestAnimationFrame(update)

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [width, height, intensity])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      width={width}
      height={height}
      aria-hidden="true"
    />
  )
}

export default MatrixCanvas
