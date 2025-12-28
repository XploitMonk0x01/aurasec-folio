'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { SecurityScan } from './SecurityScan'
import HackerParticles from './3d/HackerParticles'

function BackgroundScene() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ width: '100vw', height: '100vh', background: '#050505' }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#050505']} />
        <Suspense fallback={null}>
          <HackerParticles />
          <SecurityScan />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default BackgroundScene
export { BackgroundScene }
