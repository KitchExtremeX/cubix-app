'use client'

import { useRef, useState, MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface HolographicCardProps {
  children: React.ReactNode
  className?: string
}

export function HolographicCard({ children, className }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    gradient: 'radial-gradient(circle at 50% 50%, rgba(139,0,255,0.1), transparent 70%)'
  })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      gradient: `radial-gradient(circle at ${x}px ${y}px, rgba(139,0,255,0.3), transparent 50%)`
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      gradient: 'radial-gradient(circle at 50% 50%, rgba(139,0,255,0.1), transparent 70%)'
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-300 ease-out',
        'bg-gradient-to-br from-white/[0.03] to-white/[0.01]',
        'border border-white/10',
        'backdrop-blur-xl',
        className
      )}
      style={{ transform: style.transform, transformStyle: 'preserve-3d' }}
    >
      {/* Holographic overlay */}
      <div
        className="absolute inset-0 opacity-50 transition-opacity duration-300"
        style={{ background: style.gradient }}
      />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          style={{
            animation: 'scan 4s linear infinite',
            top: '0%'
          }}
        />
      </div>

      {/* Edge glow */}
      <div className="absolute inset-0 rounded-2xl border border-purple-500/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  )
}
