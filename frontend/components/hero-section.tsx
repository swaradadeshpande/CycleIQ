'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Shield, Zap, Cloud, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useHealth } from '@/lib/health-context'
import { useAuth } from '@/lib/auth-context'

export function HeroSection() {
  const { setCurrentStep } = useHealth()
  const { isAuthenticated, setShowSignupModal } = useAuth()
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 30
      const y = (clientY / innerHeight - 0.5) * 30
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--mint)]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--lavender)]/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--coral)]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--mint)]/50 border border-[var(--mint-dark)]/20">
              <Sparkles className="w-4 h-4 text-[var(--mint-dark)]" />
              <span className="text-sm font-medium text-[var(--mint-dark)]">AI-Powered Health Insights</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-[var(--mint-dark)] via-[var(--lavender-dark)] to-[var(--coral)] bg-clip-text text-transparent">
                AI Health Co-Pilot
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              CycleIQ combines your menstrual data, nutrition patterns, stress levels, and local environmental factors 
              to predict health risks and provide personalized insights — even when you&apos;re offline.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={() => {
                  if (isAuthenticated) {
                    setCurrentStep(1)
                  } else {
                    setShowSignupModal(true)
                  }
                }}
                className="bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90 text-white gap-2"
              >
                {isAuthenticated ? 'Start Your Assessment' : 'Get Started Free'}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="border-[var(--mint-dark)]/30 hover:bg-[var(--mint)]/30"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-[var(--mint-dark)]" />
                <span>Privacy-First</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-5 h-5 text-[var(--coral)]" />
                <span>Offline Capable</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Cloud className="w-5 h-5 text-[var(--lavender-dark)]" />
                <span>Hyperlocal Context</span>
              </div>
            </div>
          </div>

          {/* Interactive Orb */}
          <div className="relative flex items-center justify-center">
            <div 
              ref={orbRef}
              className="relative w-72 h-72 sm:w-96 sm:h-96 transition-transform duration-200 ease-out"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--mint)] via-[var(--lavender)] to-[var(--coral)]/30 animate-pulse" />
              
              {/* Main Orb */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[var(--mint-dark)] via-[var(--lavender-dark)] to-[var(--coral)] opacity-80 blur-sm" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[var(--mint)] via-[var(--lavender)] to-white backdrop-blur-xl" />
              
              {/* Inner Core */}
              <div className="absolute inset-12 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] bg-clip-text text-transparent">
                    CycleIQ
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">AI Engine</div>
                </div>
              </div>

              {/* Floating Particles */}
              <div className="absolute top-0 left-1/4 w-4 h-4 rounded-full bg-[var(--coral)] animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1/4 right-0 w-3 h-3 rounded-full bg-[var(--mint-dark)] animate-bounce" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/4 left-0 w-5 h-5 rounded-full bg-[var(--lavender-dark)] animate-bounce" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-0 right-1/4 w-3 h-3 rounded-full bg-[var(--coral)] animate-bounce" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
