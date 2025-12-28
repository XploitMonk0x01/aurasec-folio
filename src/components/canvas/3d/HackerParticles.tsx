import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import {
  getDNAPoints,
  getBiohazardPoints,
  getNetworkPoints,
  PARTICLE_COUNT,
} from '@/lib/utils/shapeGenerator'

const vertexShader = `
  uniform float uTime;
  uniform float uMix;
  uniform vec3 uMouse;
  uniform float uGlitchIntensity;
  
  attribute vec3 aTarget;
  
  varying float vDistance;
  varying vec3 vPos;

  // Simplex noise function (simplified)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) { 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
    //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    // Morphing
    vec3 pos = mix(position, aTarget, uMix);
    
    // Mouse Interaction (Repulsion)
    float dist = distance(pos.xy, uMouse.xy);
    float repulsionRadius = 4.0;
    if (dist < repulsionRadius) {
      vec3 dir = normalize(pos - uMouse);
      float force = (repulsionRadius - dist) / repulsionRadius;
      // Push away, but more on Z axis for 3D feel
      pos += dir * force * 2.0;
      pos.z += force * 2.0;
    }

    // Glitch / Noise movement
    float noiseVal = snoise(vec3(pos.x * 0.5, pos.y * 0.5, uTime * 0.5));
    pos += noiseVal * 0.1;
    
    // Hard Glitch
    if (uGlitchIntensity > 0.0) {
        float glitch = step(0.98, fract(uTime * 0.5 + pos.y * 0.1));
        pos.x += glitch * (sin(uTime * 20.0) * 0.5);
    }

    vPos = pos;
    vDistance = dist;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (500.0 / -mvPosition.z) * (1.0 + uGlitchIntensity);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  
  varying float vDistance;
  varying vec3 vPos;

  void main() {
    // Circular particle
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);
    
    // Discard edges
    if (strength < 0.1) discard;

    // Color mixing based on position and time
    vec3 color = mix(uColor1, uColor2, sin(vPos.y * 0.2 + uTime) * 0.5 + 0.5);
    
    // Boost base brightness
    color *= 1.5;
    
    // Add brightness based on mouse proximity
    float mouseGlow = 1.0 / (vDistance + 0.5);
    color += vec3(mouseGlow * 0.8);

    gl_FragColor = vec4(color, strength * 1.2);
  }
`

export default function HackerParticles() {
  const { camera, viewport } = useThree()
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Generate geometries
  const [dnaPoints, bioPoints, netPoints] = useMemo(() => {
    return [
      getDNAPoints(PARTICLE_COUNT),
      getBiohazardPoints(PARTICLE_COUNT),
      getNetworkPoints(PARTICLE_COUNT),
    ]
  }, [])

  const shapes = useMemo(
    () => [dnaPoints, bioPoints, netPoints],
    [dnaPoints, bioPoints, netPoints]
  )

  // Use refs for animation state to avoid re-renders
  const currentShapeIndex = useRef(0)
  const nextShapeIndex = useRef(1)
  const mixFactor = useRef(0)
  const isMorphing = useRef(false)

  // Cycle shapes
  useEffect(() => {
    const interval = setInterval(() => {
      isMorphing.current = true
    }, 8000) // Change every 8 seconds
    return () => clearInterval(interval)
  }, [])

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return

    // Update uniforms
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime

    // Mouse interaction
    const vector = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5)
    vector.unproject(camera)
    const dir = vector.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z
    const pos = camera.position.clone().add(dir.multiplyScalar(distance))

    // Smooth mouse movement
    materialRef.current.uniforms.uMouse.value.lerp(pos, 0.1)

    // Handle Morphing
    if (isMorphing.current) {
      const speed = 1.0 * delta
      let newMix = mixFactor.current + speed

      if (newMix >= 1) {
        newMix = 0
        isMorphing.current = false

        // Update indices
        const next = (nextShapeIndex.current + 1) % shapes.length
        currentShapeIndex.current = nextShapeIndex.current
        nextShapeIndex.current = next

        // Update attributes for next transition
        // Current position becomes the target we just reached
        // We need to cast to Float32Array because TS doesn't know the specific type of the attribute array
        const positionAttribute = pointsRef.current.geometry.attributes
          .position as THREE.BufferAttribute
        const targetAttribute = pointsRef.current.geometry.attributes
          .aTarget as THREE.BufferAttribute

        positionAttribute.array.set(shapes[currentShapeIndex.current])
        positionAttribute.needsUpdate = true

        // Target becomes the NEW target
        targetAttribute.array.set(shapes[next])
        targetAttribute.needsUpdate = true
      }

      mixFactor.current = newMix
      materialRef.current.uniforms.uMix.value = newMix
    }
  })

  // Initial setup of attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(dnaPoints, 3))
    geo.setAttribute('aTarget', new THREE.BufferAttribute(bioPoints, 3))
    return geo
  }, [dnaPoints, bioPoints])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMix: { value: 0 },
      uMouse: { value: new THREE.Vector3() },
      uColor1: { value: new THREE.Color('#00ff88') }, // Bright neon green
      uColor2: { value: new THREE.Color('#00ffff') }, // Bright cyan
      uGlitchIntensity: { value: 0.2 },
    }),
    []
  )

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
