'use client'

import React, { PointerEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardCheck,
  Clock3,
  FileSearch,
  Fingerprint,
  Layers3,
  MousePointer2,
} from 'lucide-react'
import * as THREE from 'three'

const views = [
  {
    id: 'evidence',
    label: 'Evidence View',
    icon: FileSearch,
    color: '#ff3131',
    note: 'Framed captures, artifact summaries, and visual hierarchy for fast review.',
  },
  {
    id: 'timeline',
    label: 'Timeline',
    icon: Clock3,
    color: '#8a9a35',
    note: 'Event sequencing, responsive rows, and clear investigative ordering.',
  },
  {
    id: 'artifacts',
    label: 'Artifacts',
    icon: Fingerprint,
    color: '#f8fafc',
    note: 'File hashes, memory clues, screenshots, and indicators grouped by confidence.',
  },
  {
    id: 'report',
    label: 'Report UI',
    icon: ClipboardCheck,
    color: '#ff7a45',
    note: 'Readable findings, remediation notes, and polished handoff-ready layouts.',
  },
]

const evidenceFrames = [
  {
    title: 'MEMORY SNAPSHOT',
    meta: 'PID: 1848 // IOC_MATCH',
    className: 'from-cyber-red/20 via-black to-zinc-950',
  },
  {
    title: 'DISK ARTIFACT',
    meta: 'MFT // HASH_LOCKED',
    className: 'from-army-olive/20 via-black to-zinc-950',
  },
  {
    title: 'NETWORK TRACE',
    meta: 'TLS // BEACON_PATTERN',
    className: 'from-white/10 via-black to-zinc-950',
  },
]

const craftStats = [
  { label: 'case views', value: '4' },
  { label: 'responsive frames', value: '3' },
  { label: 'webgl layers', value: '4' },
  { label: 'pointer review', value: 'live' },
]

type Pointer = {
  x: number
  y: number
}

function createEvidenceTexture(label: string, color: string) {
  const textureCanvas = document.createElement('canvas')
  textureCanvas.width = 512
  textureCanvas.height = 320
  const context = textureCanvas.getContext('2d')

  if (!context) {
    return new THREE.CanvasTexture(textureCanvas)
  }

  context.fillStyle = '#050505'
  context.fillRect(0, 0, textureCanvas.width, textureCanvas.height)

  context.strokeStyle = color
  context.globalAlpha = 0.22
  for (let x = 24; x < textureCanvas.width; x += 32) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, textureCanvas.height)
    context.stroke()
  }
  for (let y = 24; y < textureCanvas.height; y += 32) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(textureCanvas.width, y)
    context.stroke()
  }

  context.globalAlpha = 0.9
  context.strokeStyle = color
  context.lineWidth = 2
  context.strokeRect(28, 28, 456, 264)

  context.globalAlpha = 0.65
  for (let radius = 28; radius < 116; radius += 18) {
    context.beginPath()
    context.ellipse(256, 160, radius * 1.55, radius, 0.24, 0.2, Math.PI * 1.78)
    context.stroke()
  }

  context.globalAlpha = 1
  context.fillStyle = '#f8fafc'
  context.font = '600 28px monospace'
  context.fillText(label, 46, 78)
  context.fillStyle = color
  context.font = '14px monospace'
  context.fillText('FORENSIC FRAME // VERIFIED', 46, 108)

  const texture = new THREE.CanvasTexture(textureCanvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function FrontendLab() {
  const [activeView, setActiveView] = useState(views[0])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeViewRef = useRef(activeView)
  const pointerRef = useRef<Pointer>({ x: 0, y: 0 })

  useEffect(() => {
    activeViewRef.current = activeView
  }, [activeView])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0.25, 5.8)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))

    const caseFile = new THREE.Group()
    scene.add(caseFile)

    const frameMaterial = new THREE.MeshBasicMaterial({
      color: '#ff3131',
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    })

    const textures = [
      createEvidenceTexture('MEMORY', '#ff3131'),
      createEvidenceTexture('DISK', '#8a9a35'),
      createEvidenceTexture('TRACE', '#f8fafc'),
    ]

    const cards = textures.map((texture, index) => {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(2.35, 1.46),
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: index === 0 ? 0.96 : 0.7,
        }),
      )
      card.position.set((index - 1) * 0.58, (1 - index) * 0.14, -index * 0.38)
      card.rotation.z = (index - 1) * -0.08
      caseFile.add(card)

      const frame = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.6), frameMaterial.clone())
      frame.position.copy(card.position)
      frame.position.z -= 0.02
      frame.rotation.copy(card.rotation)
      caseFile.add(frame)

      return card
    })

    const sweep = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 0.035),
      new THREE.MeshBasicMaterial({
        color: '#ff3131',
        transparent: true,
        opacity: 0.78,
      }),
    )
    sweep.position.z = 0.08
    caseFile.add(sweep)

    const artifactRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.012, 10, 96),
      new THREE.MeshBasicMaterial({
        color: '#8a9a35',
        transparent: true,
        opacity: 0.45,
      }),
    )
    artifactRing.rotation.x = Math.PI / 2.6
    artifactRing.position.z = -0.85
    caseFile.add(artifactRing)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height, false)
      camera.aspect = rect.width / Math.max(rect.height, 1)
      camera.updateProjectionMatrix()
    }

    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const viewIndex = views.findIndex((view) => view.id === activeViewRef.current.id)
      const activeColor = activeViewRef.current.color

      sweep.material.color.set(activeColor)
      frameMaterial.color.set(activeColor)
      sweep.position.y = Math.sin(Date.now() * 0.0018) * 0.72
      artifactRing.rotation.z += 0.006

      cards.forEach((card, index) => {
        const material = card.material as THREE.MeshBasicMaterial
        material.opacity = index === viewIndex % cards.length ? 0.98 : 0.58
        card.position.z += ((index === viewIndex % cards.length ? 0.16 : -index * 0.34) - card.position.z) * 0.04
      })

      caseFile.rotation.y += (pointerRef.current.x * 0.22 - caseFile.rotation.y) * 0.04
      caseFile.rotation.x += (pointerRef.current.y * 0.12 - caseFile.rotation.x) * 0.04
      caseFile.rotation.z = Math.sin(Date.now() * 0.0007) * 0.025

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      textures.forEach((texture) => texture.dispose())
      cards.forEach((card) => {
        card.geometry.dispose()
        const material = card.material as THREE.MeshBasicMaterial
        material.dispose()
      })
      caseFile.children.forEach((child) => {
        const mesh = child as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose())
        } else if (mesh.material) {
          mesh.material.dispose()
        }
      })
    }
  }, [])

  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * -2,
    }
  }

  return (
    <section id="frontend" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-cyber-red">
              forensic interface proof
            </p>
            <h2 className="mt-3 text-4xl text-white md:text-6xl">
              INTERFACE_LAB
            </h2>
          </div>
          <p className="font-mono text-sm leading-relaxed text-zinc-400">
            A quieter frontend showcase styled as a digital forensics review
            desk: framed captures, case-state controls, scroll reveals, and a
            focused Three.js evidence stack.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_410px]">
          <div
            className="relative min-h-[440px] overflow-hidden border border-cyber-red/20 bg-black/60 md:min-h-[580px]"
            onPointerMove={updatePointer}
            onPointerLeave={() => {
              pointerRef.current = { x: 0, y: 0 }
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_42%,rgba(255,49,49,0.16),transparent_28rem)]" />
            <div className="absolute inset-0 dossier-grid opacity-35" />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              aria-label="Interactive Three.js forensic evidence viewer"
            />

            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 border border-cyber-red/20 bg-black/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cyber-red">
              <MousePointer2 className="h-4 w-4" />
              review surface
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent p-5 md:p-6">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-red">
                  <Layers3 className="h-4 w-4" />
                  {activeView.label}
                </div>
                <p className="font-mono text-sm leading-relaxed text-zinc-300">
                  {activeView.note}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {views.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setActiveView(view)}
                  className={`min-h-28 border p-4 text-left transition ${
                    activeView.id === view.id
                      ? 'border-cyber-red bg-cyber-red/10 text-white'
                      : 'border-cyber-red/15 bg-black/50 text-zinc-500 hover:border-cyber-red/50 hover:text-white'
                  }`}
                >
                  <view.icon
                    className="mb-4 h-5 w-5"
                    style={{ color: view.color }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                    {view.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid gap-3">
              {evidenceFrames.map((frame, index) => (
                <motion.div
                  key={frame.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="group overflow-hidden border border-cyber-red/15 bg-black/55 p-3"
                >
                  <div
                    className={`relative h-24 overflow-hidden border border-white/10 bg-gradient-to-br ${frame.className}`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:18px_18px]" />
                    <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                      {frame.title}
                    </div>
                    <div className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                      {frame.meta}
                    </div>
                    <div className="absolute right-4 top-4 h-12 w-12 rounded-full border border-cyber-red/30 transition group-hover:scale-110" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {craftStats.map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-black/45 p-4">
                  <div className="font-stencil text-3xl text-cyber-red">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
