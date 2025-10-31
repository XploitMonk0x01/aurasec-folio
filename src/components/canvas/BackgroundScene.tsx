'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { SecurityScan } from './SecurityScan'
import { CyberpunkBackground } from './3d/CyberpunkBackground'

function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{
          position: [0, 5, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CyberpunkBackground />
          <SecurityScan />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default BackgroundScene
export { BackgroundScene }
