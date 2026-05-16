'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, ShaderMaterial, Vector2, Color } from 'three'

// Custom holographic shader
const cubeVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uMorph;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;

    // Morphing effect
    vec3 pos = position;
    float morphAmount = sin(uTime * 0.5) * 0.1 * uMorph;
    pos += normal * morphAmount;

    // Pulse effect
    float pulse = sin(uTime * 2.0) * 0.02;
    pos *= 1.0 + pulse;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const cubeFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec2 uMouse;
  uniform float uHover;

  // Noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Base purple color
    vec3 baseColor = uColor;

    // Holographic edge glow
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
    vec3 edgeColor = vec3(0.8, 0.2, 1.0); // Bright purple edge

    // Animated scan lines
    float scanLine = sin(vPosition.y * 20.0 + uTime * 2.0) * 0.5 + 0.5;
    scanLine = smoothstep(0.4, 0.6, scanLine);

    // Grid pattern
    float gridX = smoothstep(0.95, 1.0, fract(vUv.x * 10.0));
    float gridY = smoothstep(0.95, 1.0, fract(vUv.y * 10.0));
    float grid = max(gridX, gridY) * 0.3;

    // Mouse reactive glow
    float dist = length(vUv - uMouse);
    float mouseGlow = smoothstep(0.5, 0.0, dist) * uHover;

    // Glitch effect
    float glitch = step(0.99, noise(vec2(floor(uTime * 10.0)))) * 0.5;

    // Combine colors
    vec3 color = baseColor;
    color += edgeColor * fresnel;
    color += vec3(0.5, 0.0, 1.0) * scanLine * 0.2;
    color += vec3(0.6, 0.3, 1.0) * grid;
    color += vec3(1.0, 0.5, 1.0) * mouseGlow * 0.5;
    color += vec3(1.0, 0.0, 0.5) * glitch;

    // Bloom intensity
    float bloom = fresnel * 0.8 + mouseGlow * 0.5;
    color += bloom * vec3(0.6, 0.2, 1.0);

    gl_FragColor = vec4(color, 0.95);
  }
`

// Glow trail shader
const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const glowFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec2 center = vec2(0.5);
    float dist = length(vUv - center);
    float glow = smoothstep(0.5, 0.0, dist);
    glow *= sin(uTime * 3.0) * 0.3 + 0.7;

    vec3 color = vec3(0.5, 0.0, 1.0) * glow;
    gl_FragColor = vec4(color, glow * 0.5);
  }
`

export function InteractiveCube() {
  const meshRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)
  const cubeMaterialRef = useRef<ShaderMaterial>(null)
  const glowMaterialRef = useRef<ShaderMaterial>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const hoverRef = useRef(0)
  const rotationRef = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new Color(0.3, 0.0, 0.5) },
    uMouse: { value: new Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uMorph: { value: 1 }
  }), [])

  const glowUniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const cubeUniforms = cubeMaterialRef.current?.uniforms
    const trailUniforms = glowMaterialRef.current?.uniforms

    // Update time
    if (cubeUniforms) {
      cubeUniforms.uTime.value = state.clock.elapsedTime
    }

    if (trailUniforms) {
      trailUniforms.uTime.value = state.clock.elapsedTime
    }

    // Smooth rotation with mouse influence
    rotationRef.current.x += delta * 0.3 + (mouseRef.current.y - 0.5) * delta * 0.5
    rotationRef.current.y += delta * 0.5 + (mouseRef.current.x - 0.5) * delta * 0.5

    meshRef.current.rotation.x = rotationRef.current.x
    meshRef.current.rotation.y = rotationRef.current.y

    // Update mouse uniform
    if (cubeUniforms) {
      cubeUniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
    }

    // Smooth hover transition
    if (cubeUniforms) {
      cubeUniforms.uHover.value += (hoverRef.current - cubeUniforms.uHover.value) * 0.1
    }

    // Floating motion
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2

    // Glow follows cube
    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current.position)
      glowRef.current.rotation.copy(meshRef.current.rotation)
    }
  })

  return (
    <group>
      {/* Main cube with holographic shader */}
      <mesh
        ref={meshRef}
        onPointerMove={(e) => {
          mouseRef.current.x = e.uv?.x ?? 0.5
          mouseRef.current.y = e.uv?.y ?? 0.5
        }}
        onPointerEnter={() => { hoverRef.current = 1 }}
        onPointerLeave={() => { hoverRef.current = 0 }}
      >
        <boxGeometry args={[2, 2, 2, 32, 32, 32]} />
        <shaderMaterial
          ref={cubeMaterialRef}
          vertexShader={cubeVertexShader}
          fragmentShader={cubeFragmentShader}
          uniforms={uniforms}
          transparent
          side={2}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={glowRef}>
        <boxGeometry args={[2.05, 2.05, 2.05]} />
        <shaderMaterial
          ref={glowMaterialRef}
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={glowUniforms}
          transparent
          side={2}
          wireframe
        />
      </mesh>

      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#8b00ff"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}
