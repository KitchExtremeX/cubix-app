'use client'

import { useEffect, useRef } from 'react'

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 50
      const cols = Math.ceil(canvas.width / gridSize)
      const rows = Math.ceil(canvas.height / gridSize)

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize
          const y = j * gridSize

          // Distance from center
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
          const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2)

          // Wave effect
          const wave = Math.sin(dist * 0.02 - time * 2) * 0.5 + 0.5
          const opacity = (1 - dist / maxDist) * wave * 0.15

          // Pulse effect
          const pulse = Math.sin(time * 3 + i * 0.1 + j * 0.1) * 0.5 + 0.5

          ctx.beginPath()
          ctx.arc(x, y, 1 + pulse, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(139, 0, 255, ${opacity})`
          ctx.fill()

          // Connection lines (sparse)
          if (i < cols && j < rows && Math.random() > 0.98) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + gridSize, y + gridSize)
            ctx.strokeStyle = `rgba(139, 0, 255, ${opacity * 0.5})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
