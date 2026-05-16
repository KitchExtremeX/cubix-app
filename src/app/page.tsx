'use client'

import dynamic from 'next/dynamic'
import { GlassNav } from '@/components/ui/glass-nav'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { HolographicCard } from '@/components/ui/holographic-card'
import { KineticText, GlitchText } from '@/components/ui/kinetic-text'
import { CursorGlow } from '@/components/ui/cursor-glow'
import { AITerminal } from '@/components/ui/ai-terminal'
import { ArrowRight, Cpu, Layers, Zap, Sparkles, Box, Code, Shield, Globe } from 'lucide-react'

const featureColorClasses = {
  violet: {
    background: 'bg-violet-500/20',
    text: 'text-violet-400'
  },
  fuchsia: {
    background: 'bg-fuchsia-500/20',
    text: 'text-fuchsia-400'
  },
  pink: {
    background: 'bg-pink-500/20',
    text: 'text-pink-400'
  },
  amber: {
    background: 'bg-amber-500/20',
    text: 'text-amber-400'
  },
  emerald: {
    background: 'bg-emerald-500/20',
    text: 'text-emerald-400'
  },
  cyan: {
    background: 'bg-cyan-500/20',
    text: 'text-cyan-400'
  }
} as const

// Dynamic import for 3D scene to avoid SSR issues
const CubeScene = dynamic(
  () => import('@/components/3d/scene').then(mod => ({ default: mod.CubeScene })),
  { ssr: false, loading: () => <div className="w-full h-full bg-black" /> }
)

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
      {/* Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      <CursorGlow />

      {/* Navigation */}
      <GlassNav />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* 3D Scene Background */}
        <div className="absolute inset-0 z-0">
          <CubeScene />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs text-neutral-400 uppercase tracking-wider">Powered by AI & GPU</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6">
              <KineticText
                text="THE FUTURE"
                className="block bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent"
              />
              <KineticText
                text="OF CREATION"
                className="block mt-2"
                delay={0.3}
              />
            </h1>

            {/* Glitch subtitle */}
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-8">
              <GlitchText text="Cubix" /> is an AI-native creative platform that transforms how you
              build, ship, and scale immersive digital experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton variant="primary" className="text-base px-8 py-4">
                <Sparkles className="w-5 h-5 mr-2 inline" />
                Launch Experience
              </MagneticButton>
              <MagneticButton variant="secondary" className="text-base px-8 py-4">
                <Code className="w-5 h-5 mr-2 inline" />
                View Source
              </MagneticButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
              {[
                { value: '60fps', label: 'GPU Rendering' },
                { value: '<10ms', label: 'Latency' },
                { value: '10M+', label: 'Particles' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-xs text-neutral-500 uppercase tracking-wider">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ==================== AI TERMINAL SECTION ==================== */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs text-violet-400 uppercase tracking-wider">AI-Powered</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Command Your <GlitchText text="Creation" className="text-violet-400" />
            </h2>
            <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
              Interact with Cubix through natural language. Our AI understands intent, not just syntax.
            </p>
          </div>
          <AITerminal />
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-wider">Features</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
                Built for the
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  next generation.
                </span>
              </h2>
            </div>
            <MagneticButton variant="ghost" className="mt-6 md:mt-0">
              View all features
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Cpu className="w-6 h-6" />,
                title: 'GPU Acceleration',
                description: 'WebGL 2.0 and WebGPU powered rendering pipeline for buttery smooth 60fps experiences.',
                color: 'violet'
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: '3D Shader System',
                description: 'Custom GLSL shaders with real-time compilation. Create effects impossible with CSS alone.',
                color: 'fuchsia'
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: 'AI Assistant',
                description: 'Natural language interface for building complex 3D scenes. Describe what you want, watch it appear.',
                color: 'pink'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Real-time Physics',
                description: 'Particle systems, cloth simulation, rigid body dynamics - all running in the browser.',
                color: 'amber'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Production Ready',
                description: 'Code splitting, lazy loading, adaptive quality. Heavy VFX without the performance hit.',
                color: 'emerald'
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: 'Full Stack',
                description: 'Frontend to backend. Authentication, APIs, databases - everything you need to ship.',
                color: 'cyan'
              }
            ].map((feature, i) => {
              const colorClasses = featureColorClasses[feature.color as keyof typeof featureColorClasses]

              return (
                <HolographicCard key={i} className="p-6 min-h-[200px]">
                  <div className={`w-12 h-12 rounded-xl ${colorClasses.background} flex items-center justify-center mb-4`}>
                    <div className={colorClasses.text}>{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm">{feature.description}</p>
                </HolographicCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== ARCHITECTURE SECTION ==================== */}
      <section id="architecture" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs text-violet-400 uppercase tracking-wider">Architecture</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Engineered for
                <br />
                performance.
              </h2>
              <p className="text-neutral-400 mb-8">
                Cubix isn&apos;t just a pretty interface. Under the hood, it&apos;s a high-performance
                graphics engine designed to push the boundaries of what&apos;s possible in the browser.
              </p>

              <div className="space-y-4">
                {[
                  'React Three Fiber + Three.js rendering pipeline',
                  'Custom GLSL shader compilation',
                  'WebGL 2.0 with WebGPU migration path',
                  'Instanced particle systems (10M+ particles)',
                  'Adaptive quality scaling',
                  'Zero-config deployment'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-violet-400" />
                    </div>
                    <span className="text-neutral-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <HolographicCard className="p-8">
                <pre className="text-sm text-neutral-300 font-mono overflow-x-auto">
                  <code>{`// Cubix Rendering Pipeline
const pipeline = new CubixPipeline({
  renderer: 'webgpu',  // or 'webgl2'
  shaders: {
    vertex: cubeVertexShader,
    fragment: cubeFragmentShader,
    compute: particleCompute
  },
  postProcessing: {
    bloom: { intensity: 1.5 },
    chromatic: { offset: 0.003 },
    noise: { amount: 0.05 }
  },
  physics: {
    engine: 'custom',
    particles: 10_000_000,
    threads: navigator.hardwareConcurrency
  }
});

pipeline.render(scene, camera);`}</code>
                </pre>
              </HolographicCard>

              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SHOWCASE SECTION ==================== */}
      <section id="experience" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs text-neutral-500 uppercase tracking-wider">Interactive</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Move your cursor.
              <br />
              <span className="text-violet-400">Watch it react.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <HolographicCard key={i} className="aspect-square p-4 flex items-center justify-center">
                <Box className="w-12 h-12 text-violet-500/50" />
              </HolographicCard>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            {/* Glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[150px]" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Ready to build
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  the future?
                </span>
              </h2>

              <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
                Join thousands of creators building immersive experiences with Cubix.
                Start free, scale when ready.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <MagneticButton variant="primary" className="text-lg px-10 py-5">
                  <Sparkles className="w-5 h-5 mr-2 inline" />
                  Start Creating
                </MagneticButton>
                <MagneticButton variant="secondary" className="text-lg px-10 py-5">
                  Talk to Sales
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                  <Box className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">Cubix.ai</span>
              </div>
              <p className="text-neutral-500 text-sm">
                The future of creative development.
              </p>
            </div>

            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Documentation', 'Changelog']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press']
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Security', 'Cookies']
              }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-600 text-sm">
              &copy; 2026 Cubix. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
