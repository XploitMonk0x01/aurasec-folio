'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

type StormSceneProps = {
  className?: string
  quality?: 'ambient' | 'hero'
}

const CONFIG = {
  coreColor: '#6a0a2a',
  midColor: '#ff2d6b',
  rimColor: '#ffd36b',
  atmoColor: '#ff7ab0',
  pointSize: 78,
  opacity: 1.85,
  brightness: 1.55,
  repelRadius: 1.4,
  repelStrength: 3.8,
  scrollDive: 2.45,
  scrollGrow: 0.42,
  scrollSpin: 0.48,
  parallax: 0.58,
}

const vertexShader = `
uniform float uTime; uniform float uSize; uniform float uBlowUp;
uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
uniform vec3 uCore; uniform vec3 uMid; uniform vec3 uRim;
attribute float aScale; attribute float aNoise; attribute float aRadialPush; attribute float aMix;
varying vec3 vColor; varying float vBlowUp;
void main() {
  vec3 pos = position;
  float t = uTime * 1.4 + aNoise * 6.2831;
  float wobble = sin(t) * 0.1 * aRadialPush;
  pos *= 1.0 + wobble;
  float swirlAngle = uTime * 0.05 + aNoise * 6.2831;
  mat2 swirl = mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle));
  pos.xz = swirl * pos.xz;
  vec3 outward = normalize(pos + vec3(0.0001));
  float blow = uBlowUp * uBlowUp;
  pos += outward * blow * (10.0 + aNoise * 18.0) * aRadialPush;
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec3 toParticle = modelPosition.xyz - uCursor;
  float dist = length(toParticle);
  float falloff = smoothstep(uRepelRadius, 0.0, dist);
  modelPosition.xyz += normalize(toParticle + vec3(0.0001)) * falloff * uRepelStrength * uActivity;
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / -viewPosition.z);
  float t1 = smoothstep(0.25, 0.85, aMix);
  vec3 mix1 = mix(uCore, uMid, t1);
  float t2 = clamp((aMix - 0.7) * 3.0, 0.0, 1.0);
  vColor = mix(mix1, uRim, t2);
  vBlowUp = uBlowUp;
}
`

const fragmentShader = `
uniform float uOpacity; uniform float uBrightness;
varying vec3 vColor; varying float vBlowUp;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float strength = pow(1.0 - d * 2.0, 4.5);
  vec3 color = mix(vec3(0.0), vColor, strength);
  float blowFade = 1.0 - smoothstep(0.15, 1.0, vBlowUp);
  gl_FragColor = vec4(color * uBrightness, strength * uOpacity * blowFade);
}
`

const atmoVertexShader = `
attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
varying float vA;
vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
  p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
  p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
  return cos(p+vec3(1,2,4)); }
void main(){
  vec3 v = position*4.0 + warp(position, uTime)*1.2;
  vec4 mv = modelViewMatrix * vec4(v, 1.0);
  float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
  vA = farF * nearF;
  gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
  gl_Position = projectionMatrix * mv;
}
`

const atmoFragmentShader = `
uniform vec3 uColor; varying float vA;
void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
  float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.6); }
`

function hexToVec3(hex: string) {
  const color = new THREE.Color(hex)
  return new THREE.Vector3(color.r, color.g, color.b)
}

function createStormGeometry(count: number, radius = 2.5) {
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const noises = new Float32Array(count)
  const radialPush = new Float32Array(count)
  const mixv = new Float32Array(count)

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3
    let u = 0
    let v = 0
    let s = 0

    do {
      u = Math.random() * 2 - 1
      v = Math.random() * 2 - 1
      s = u * u + v * v
    } while (s >= 1 || s === 0)

    const factor = 2 * Math.sqrt(1 - s)
    const dx = u * factor
    const dy = v * factor
    const dz = 1 - 2 * s
    const rN = Math.pow(Math.random(), 0.4)
    const r = radius * (0.55 + rN * 0.45)

    positions[i3] = dx * r
    positions[i3 + 1] = dy * r
    positions[i3 + 2] = dz * r
    mixv[i] = rN
    scales[i] = 0.45 + Math.random() * 0.8
    noises[i] = Math.random()
    radialPush[i] = 0.4 + rN * 1.1
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('aScale', new THREE.Float32BufferAttribute(scales, 1))
  geometry.setAttribute('aNoise', new THREE.Float32BufferAttribute(noises, 1))
  geometry.setAttribute('aRadialPush', new THREE.Float32BufferAttribute(radialPush, 1))
  geometry.setAttribute('aMix', new THREE.Float32BufferAttribute(mixv, 1))
  return geometry
}

function createAtmoGeometry(count = 300) {
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const seeds = new Float32Array(count)

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = 2 * Math.random() - 1
    positions[i * 3 + 1] = 2 * Math.random() - 1
    positions[i * 3 + 2] = 2 * Math.random() - 1
    sizes[i] = 24 * (0.4 + Math.random())
    seeds[i] = Math.random()
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
  geometry.setAttribute('seed', new THREE.Float32BufferAttribute(seeds, 1))
  return geometry
}

export function StormScene({ className = '', quality = 'hero' }: StormSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCompact = window.innerWidth < 768
    const count = quality === 'hero' && !prefersReducedMotion ? (isCompact ? 26000 : 50000) : 14000
    const context =
      (canvas.getContext('webgl2', {
        antialias: true,
        alpha: true,
      }) as WebGL2RenderingContext | null)

    if (!context) {
      canvas.hidden = true
      return
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.35 : 1.8))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 0, 15)

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80)
    camera.position.set(0, 0, 7)
    scene.add(camera)

    const group = new THREE.Group()
    scene.add(group)

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: CONFIG.pointSize },
      uOpacity: { value: 0 },
      uBlowUp: { value: 0 },
      uCursor: { value: new THREE.Vector3() },
      uRepelRadius: { value: CONFIG.repelRadius },
      uRepelStrength: { value: CONFIG.repelStrength },
      uActivity: { value: 0 },
      uCore: { value: hexToVec3(CONFIG.coreColor) },
      uMid: { value: hexToVec3(CONFIG.midColor) },
      uRim: { value: hexToVec3(CONFIG.rimColor) },
      uBrightness: { value: CONFIG.brightness },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const storm = new THREE.Points(createStormGeometry(count), material)
    storm.frustumCulled = false
    group.add(storm)

    const atmoMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: hexToVec3(CONFIG.atmoColor) },
        uRes: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: atmoVertexShader,
      fragmentShader: atmoFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    })
    const atmo = new THREE.Points(createAtmoGeometry(isCompact ? 160 : 300), atmoMaterial)
    atmo.frustumCulled = false
    scene.add(atmo)

    const pointer = {
      ndc: new THREE.Vector2(0, 0),
      world: new THREE.Vector3(),
      activity: 0,
      active: false,
      lastMove: performance.now(),
    }
    const mouseSmooth = { x: 0, y: 0 }
    const ndc = new THREE.Vector3()
    const dir = new THREE.Vector3()
    const target = new THREE.Vector3()

    let scrollTarget = 0
    let scrollSmooth = 0
    let scrollCurrent = 0
    let animationFrame = 0
    let lastTime = performance.now() / 1000
    const appearStart = performance.now()

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollTarget = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(rect.width, 1)
      const height = Math.max(rect.height, 1)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      atmoMaterial.uniforms.uRes.value.set(
        width * renderer.getPixelRatio(),
        height * renderer.getPixelRatio(),
      )
      updateScroll()
    }

    const updatePointer = () => {
      target.set(0, 0, 0)
      if (pointer.active) {
        ndc.set(pointer.ndc.x, pointer.ndc.y, 0.5).unproject(camera)
        dir.copy(ndc).sub(camera.position).normalize()
        if (Math.abs(dir.z) > 0.0001) {
          const distance = -camera.position.z / dir.z
          if (distance > 0 && Number.isFinite(distance)) {
            target.copy(camera.position).addScaledVector(dir, distance)
          }
        }
      }

      pointer.world.lerp(target, 0.12)
      const idle = (performance.now() - pointer.lastMove) / 1000
      const want = pointer.active && idle < 3 ? 1 : 0
      pointer.activity += (want - pointer.activity) * 0.06
    }

    const onMouseMove = (event: MouseEvent) => {
      pointer.ndc.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.ndc.y = -((event.clientY / window.innerHeight) * 2 - 1)
      pointer.active = true
      pointer.lastMove = performance.now()
    }

    const onMouseOut = () => {
      pointer.active = false
    }

    const render = () => {
      animationFrame = requestAnimationFrame(render)
      const now = performance.now() / 1000
      const dt = Math.min(0.05, now - lastTime)
      lastTime = now

      scrollSmooth = lerp(scrollSmooth, scrollTarget, 0.1)
      scrollCurrent = lerp(scrollCurrent, scrollSmooth, 0.06)
      mouseSmooth.x = lerp(mouseSmooth.x, pointer.ndc.x, 0.06)
      mouseSmooth.y = lerp(mouseSmooth.y, pointer.ndc.y, 0.06)
      updatePointer()

      uniforms.uTime.value = now
      const parallax = prefersReducedMotion ? 0 : CONFIG.parallax
      camera.position.set(
        mouseSmooth.x * parallax,
        mouseSmooth.y * parallax,
        7 - scrollCurrent * CONFIG.scrollDive,
      )
      camera.lookAt(0, 0, 0)

      const fade = clamp((performance.now() - appearStart - 240) / 1200, 0, 1)
      uniforms.uOpacity.value = fade * CONFIG.opacity
      uniforms.uCursor.value.copy(pointer.world)
      uniforms.uActivity.value = prefersReducedMotion ? 0 : pointer.activity

      group.scale.setScalar(1 + scrollCurrent * CONFIG.scrollGrow)
      if (!prefersReducedMotion) {
        group.rotation.y += dt * (0.03 + scrollCurrent * CONFIG.scrollSpin)
        group.rotation.x += dt * 0.01
      }

      atmo.position.copy(camera.position)
      atmoMaterial.uniforms.uTime.value = now * 8
      renderer.render(scene, camera)
    }

    resize()
    updateScroll()
    render()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseout', onMouseOut, { passive: true })

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseOut)
      storm.geometry.dispose()
      atmo.geometry.dispose()
      material.dispose()
      atmoMaterial.dispose()
      renderer.dispose()
    }
  }, [quality])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 storm-flames" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0,rgba(7,6,9,0.2)_42%,rgba(7,6,9,0.88)_76%)]" />
    </div>
  )
}
