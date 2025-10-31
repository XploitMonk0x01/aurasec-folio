'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Grid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.5) % 1
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[100, 100, '#00ff7a', '#102020']}
      position={[0, -2, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 2000

  const particlePositions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 50
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ff7a"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export function CyberpunkBackground() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} />
      <Grid />
      <Particles />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}
