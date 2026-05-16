'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      // Smooth follow
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${targetRef.current.x - 150}px, ${targetRef.current.y - 150}px)`
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${positionRef.current.x - 100}px, ${positionRef.current.y - 100}px)`
      }

      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      {/* Main cursor glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-50"
        style={{
          background: 'radial-gradient(circle, rgba(139,0,255,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform'
        }}
      />

      {/* Trailing glow */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-[200px] h-[200px] pointer-events-none z-40"
        style={{
          background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: 'transform'
        }}
      />
    </>
  )
}
