'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'

// Placeholder mascot — swap to <MascotModel /> after dhamma.glb is dropped in public/mascot/
function PlaceholderMascot() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = Math.sin(t * 1.5) * 0.05
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.3
  })
  return (
    <mesh ref={ref} castShadow>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial color="#a8c67a" roughness={0.6} metalness={0.1} />
    </mesh>
  )
}

export function MascotCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1} />
      <PlaceholderMascot />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
      />
    </Canvas>
  )
}
