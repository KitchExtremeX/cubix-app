'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface KineticTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export function KineticText({ text, className, delay = 0, stagger = 0.03 }: KineticTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setIsVisible(true), delay * 1000)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [delay])

  const words = text.split(' ')

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => {
            const index = words.slice(0, wordIndex).join('').length + charIndex + wordIndex
            return (
              <span
                key={charIndex}
                className={cn(
                  'inline-block transition-all duration-700 ease-out',
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                )}
                style={{
                  transitionDelay: `${index * stagger}s`
                }}
              >
                {char}
              </span>
            )
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  )
}

// Glitch text effect
export function GlitchText({ text, className }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const interval = setInterval(() => {
      setIsGlitching(true)
      timeoutId = setTimeout(() => setIsGlitching(false), 200)
    }, 5000)

    return () => {
      clearInterval(interval)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <span className={cn('relative inline-block', className)}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-cyan-400 opacity-70"
            style={{ transform: 'translate(-2px, -1px)', clipPath: 'inset(20% 0 40% 0)' }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-pink-500 opacity-70"
            style={{ transform: 'translate(2px, 1px)', clipPath: 'inset(60% 0 10% 0)' }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  )
}
