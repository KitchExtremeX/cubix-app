'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, BufferGeometry, Float32BufferAttribute, Color, Group } from 'three'

const particleCount = 2000

function createSeededRandom(seed: number) {
  let value = seed

  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

export function ParticleField() {
  const pointsRef = useRef<Points>(null)

  const { positions, colors } = useMemo(() => {
    const random = createSeededRandom(0xc0ffee)
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const purple = new Color(0x8b00ff)
    const violet = new Color(0x9400d3)
    const pink = new Color(0xff00ff)

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a sphere
      const radius = 5 + random() * 10
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Random purple shade
      const colorChoice = random()
      const color = colorChoice < 0.5 ? purple : colorChoice < 0.8 ? violet : pink
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  useFrame((state) => {
    if (!pointsRef.current) return

    // Slow rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1

    // Pulse effect
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    pointsRef.current.scale.setScalar(scale)
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={2}
      />
    </points>
  )
}

// Floating orbs
export function FloatingOrbs() {
  const groupRef = useRef<Group>(null)

  const orbs = useMemo(() => {
    const random = createSeededRandom(0x51a7e)

    return Array.from({ length: 8 }, () => ({
      position: [
        (random() - 0.5) * 8,
        (random() - 0.5) * 6,
        (random() - 0.5) * 6
      ] as [number, number, number],
      scale: 0.1 + random() * 0.2,
      speed: 0.5 + random() * 1,
      offset: random() * Math.PI * 2
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i]
      child.position.y = orb.position[1] + Math.sin(state.clock.elapsedTime * orb.speed + orb.offset) * 0.5
      child.position.x = orb.position[0] + Math.cos(state.clock.elapsedTime * orb.speed * 0.5 + orb.offset) * 0.3
    })
  })

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#8b00ff' : '#ff00ff'}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}
