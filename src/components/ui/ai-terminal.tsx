'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Terminal, Sparkles, ChevronRight } from 'lucide-react'

const aiResponses = [
  '> Initializing Cubix Engine...',
  '> GPU Acceleration: ENABLED',
  '> WebGL 2.0 Context: ACTIVE',
  '> Shader Pipeline: COMPILED',
  '> Particle System: 2000 instances',
  '> Physics Engine: RUNNING at 60fps',
  '> AI Model: READY',
  '> Welcome to the future.'
]

export function AITerminal() {
  const [lines, setLines] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-type sequence
    let index = 0
    const timeouts = new Set<ReturnType<typeof setTimeout>>()

    const queueTimeout = (callback: () => void, delay: number) => {
      const timeoutId = setTimeout(() => {
        timeouts.delete(timeoutId)
        callback()
      }, delay)

      timeouts.add(timeoutId)
    }

    const typeNextLine = () => {
      if (index < aiResponses.length) {
        setIsTyping(true)
        queueTimeout(() => {
          setLines(prev => [...prev, aiResponses[index]])
          index++
          setIsTyping(false)
          typeNextLine()
        }, 500 + Math.random() * 500)
      }
    }

    queueTimeout(typeNextLine, 1500)

    return () => {
      timeouts.forEach(clearTimeout)
      timeouts.clear()
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/80 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 ml-4 text-neutral-500 text-xs">
            <Terminal className="w-3 h-3" />
            <span>cubix-ai-terminal</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="p-4 h-64 overflow-y-auto font-mono text-sm"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                'text-green-400 mb-1 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]',
                line.includes('Welcome') && 'text-violet-400 font-bold'
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {line}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-neutral-500">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span className="animate-pulse">Processing...</span>
            </div>
          )}

          {/* Input line */}
          <div className="flex items-center gap-2 mt-4">
            <ChevronRight className="w-4 h-4 text-violet-500" />
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Ask Cubix AI anything..."
              className="flex-1 bg-transparent text-neutral-300 outline-none placeholder:text-neutral-600"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
