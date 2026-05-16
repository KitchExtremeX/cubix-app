'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { InteractiveCube } from './cube'
import { ParticleField, FloatingOrbs } from './particles'

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#8b00ff" wireframe />
    </mesh>
  )
}

export function CubeScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />

        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />

        {/* Purple point lights */}
        <pointLight position={[5, 5, 5]} color="#8b00ff" intensity={2} />
        <pointLight position={[-5, -5, 5]} color="#ff00ff" intensity={1} />
        <pointLight position={[0, 5, -5]} color="#9400d3" intensity={1.5} />

        {/* Spotlight for dramatic effect */}
        <spotLight
          position={[0, 10, 0]}
          color="#8b00ff"
          intensity={3}
          angle={0.5}
          penumbra={1}
        />

        <Suspense fallback={<LoadingFallback />}>
          <InteractiveCube />
          <ParticleField />
          <FloatingOrbs />
        </Suspense>

        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 8, 25]} />
      </Canvas>
    </div>
  )
}
