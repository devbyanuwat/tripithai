'use client'

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uDepth;
  uniform float uDisplacement;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float d = texture2D(uDepth, uv).r;
    // Higher displacement near image plane center, dampen at edges
    float edge = smoothstep(0.0, 0.15, uv.x) * smoothstep(0.0, 0.15, uv.y)
               * smoothstep(0.0, 0.15, 1.0 - uv.x) * smoothstep(0.0, 0.15, 1.0 - uv.y);
    pos.z += d * uDisplacement * edge;
    // Add subtle idle breathing
    pos.z += sin(uTime * 0.6 + uv.y * 3.0) * 0.01;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uColor;
  void main() {
    gl_FragColor = texture2D(uColor, vUv);
  }
`

function tryLoadTexture(url: string): Promise<THREE.Texture | null> {
  return new Promise((resolve) => {
    new THREE.TextureLoader().load(
      url,
      (tex) => resolve(tex),
      undefined,
      () => resolve(null),
    )
  })
}

function BodhiPlane() {
  const colorMap = useLoader(THREE.TextureLoader, '/hero/bodhi.webp')
  const [depthMap, setDepthMap] = useState<THREE.Texture | null>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const targetMouse = useRef(new THREE.Vector2(0, 0))
  const smoothMouse = useRef(new THREE.Vector2(0, 0))
  const { size } = useThree()

  useEffect(() => {
    tryLoadTexture('/hero/bodhi-depth.png').then(setDepthMap)
  }, [])

  const uniforms = useMemo(
    () => ({
      uColor: { value: colorMap },
      uDepth: { value: depthMap ?? colorMap }, // colorMap as harmless fallback (R channel ≈ brightness)
      uDisplacement: { value: depthMap ? 0.45 : 0.08 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [colorMap, depthMap],
  )

  // Track mouse in viewport
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      targetMouse.current.set(x, y)
    }
    function onLeave() {
      targetMouse.current.set(0, 0)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    smoothMouse.current.lerp(targetMouse.current, 0.05)
    meshRef.current.rotation.y = smoothMouse.current.x * 0.08
    meshRef.current.rotation.x = -smoothMouse.current.y * 0.05
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uMouse.value = smoothMouse.current
    uniforms.uDepth.value = depthMap ?? colorMap
    uniforms.uDisplacement.value = depthMap ? 0.45 : 0.08
  })

  // Plane sized to roughly fill 16:9 view at camera distance 3
  const aspect = size.width / size.height
  const planeHeight = 3.4
  const planeWidth = planeHeight * (16 / 9)

  return (
    <mesh ref={meshRef} scale={[Math.max(1, aspect / (16 / 9)), 1, 1]}>
      <planeGeometry args={[planeWidth, planeHeight, 200, 120]} />
      <shaderMaterial
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent={false}
      />
    </mesh>
  )
}

export function BodhiScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <BodhiPlane />
    </Canvas>
  )
}
