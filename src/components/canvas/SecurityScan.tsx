'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, Mesh, ShaderMaterial } from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color;
  varying vec2 vUv;

  void main() {
    float scan = sin(vUv.y * 30.0 + time) * 0.5 + 0.5;
    float edge = smoothstep(0.0, 0.1, scan) * smoothstep(1.0, 0.9, scan);
    gl_FragColor = vec4(color * edge, edge * 0.5);
  }
`

export function SecurityScan() {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime()
    }
  })

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.transparent = true
    }
  }, [])

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          color: { value: new Vector3(0.0, 1.0, 0.5) },
        }}
      />
    </mesh>
  )
}
