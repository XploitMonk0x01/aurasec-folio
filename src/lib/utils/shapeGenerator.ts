import * as THREE from 'three'

export const PARTICLE_COUNT = 5000

export const getDNAPoints = (count: number = PARTICLE_COUNT): Float32Array => {
  const points = new Float32Array(count * 3)
  const radius = 2
  const height = 10
  const turns = 5

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const progress = i / count
    const angle = progress * Math.PI * 2 * turns

    // Split into two strands
    const isStrandA = i % 2 === 0
    const phaseOffset = isStrandA ? 0 : Math.PI

    // Add some random scatter for "glitch" feel
    const randomScatter = (Math.random() - 0.5) * 0.2

    points[i3] = Math.cos(angle + phaseOffset) * radius + randomScatter
    points[i3 + 1] = (progress - 0.5) * height
    points[i3 + 2] = Math.sin(angle + phaseOffset) * radius + randomScatter
  }
  return points
}

export const getBiohazardPoints = (
  count: number = PARTICLE_COUNT
): Float32Array => {
  const points = new Float32Array(count * 3)
  const radius = 3

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    // Divide into 3 main circles
    const sector = i % 3
    const sectorAngle = (sector * Math.PI * 2) / 3

    // Offset center for each circle
    const centerX = Math.cos(sectorAngle) * 1.5
    const centerY = Math.sin(sectorAngle) * 1.5

    // Point on the circle
    const angle = Math.random() * Math.PI * 2
    // Thickness of the ring
    const r = 1.2 + (Math.random() - 0.5) * 0.5

    points[i3] = centerX + Math.cos(angle) * r
    points[i3 + 1] = centerY + Math.sin(angle) * r
    points[i3 + 2] = (Math.random() - 0.5) * 0.5 // Flattened on Z
  }
  return points
}

export const getNetworkPoints = (
  count: number = PARTICLE_COUNT
): Float32Array => {
  const points = new Float32Array(count * 3)
  const radius = 4

  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // Random point in sphere
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = Math.cbrt(Math.random()) * radius // Uniform distribution

    points[i3] = r * Math.sin(phi) * Math.cos(theta)
    points[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    points[i3 + 2] = r * Math.cos(phi)
  }
  return points
}
