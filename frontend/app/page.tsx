'use client'

import { HealthProvider, useHealth } from '@/lib/health-context'
import { AuthProvider, useAuth } from '@/lib/auth-context'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { ProfileForm } from '@/components/forms/profile-form'
import { CycleForm } from '@/components/forms/cycle-form'
import { NutritionForm } from '@/components/forms/nutrition-form'
import { StressForm } from '@/components/forms/stress-form'
import { Dashboard } from '@/components/dashboard'
import { Chatbot } from '@/components/chatbot'
import { DailyLogDialog } from '@/components/daily-log'
import { ComparisonSection } from '@/components/comparison-section'
import { RoadmapSection } from '@/components/roadmap-section'
import { AnalyticsSection } from '@/components/analytics-section'
import { LoginModal, SignupModal } from '@/components/auth-modals'

function AuthRequiredMessage() {
  const { setShowLoginModal, setShowSignupModal } = useAuth()
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--mint)]/50 to-[var(--lavender)]/50 flex items-center justify-center">
          <svg className="w-10 h-10 text-[var(--mint-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-3">Login Required</h2>
        <p className="text-muted-foreground mb-6">
          Please login or create an account to start your health assessment and access personalized insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-6 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
          >
            Login
          </button>
          <button
            onClick={() => setShowSignupModal(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

function AppContent() {
  const { currentStep } = useHealth()
  const { isAuthenticated } = useAuth()

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <ComparisonSection />
            <AnalyticsSection />
            <RoadmapSection />
            <Footer />
          </>
        )
      case 1:
      case 2:
      case 3:
      case 4:
        // Protected assessment steps - require authentication
        if (!isAuthenticated) {
          return <AuthRequiredMessage />
        }
        if (currentStep === 1) return <ProfileForm />
        if (currentStep === 2) return <CycleForm />
        if (currentStep === 3) return <NutritionForm />
        return <StressForm />
      case 5:
        if (!isAuthenticated) return <AuthRequiredMessage />
        return <Dashboard />
      case 6:
        if (!isAuthenticated) return <AuthRequiredMessage />
        return <Chatbot />
      default:
        return <HeroSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{renderStep()}</main>
      {currentStep >= 5 && isAuthenticated && <DailyLogDialog />}
      <LoginModal />
      <SignupModal />
    </div>
  )
}

function HowItWorksSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--mint)]/10 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Intelligence{' '}
            <span className="bg-gradient-to-r from-[var(--mint-dark)] to-[var(--coral)] bg-clip-text text-transparent">
              Path
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            How CycleIQ transforms your data into actionable health insights
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Input Your Data',
              description: 'Log your cycle, nutrition, mood, and location through our intuitive interface',
              icon: '📝'
            },
            {
              step: '02',
              title: 'On-Device Processing',
              description: 'TensorFlow Lite AI runs locally, ensuring privacy and offline access',
              icon: '🔐'
            },
            {
              step: '03',
              title: 'Context Integration',
              description: 'Your data merges with pollution, weather, and AQI factors for comprehensive analysis',
              icon: '🌍'
            },
            {
              step: '04',
              title: 'Personalized Insights',
              description: 'Receive your risk scores, predictions, and actionable health recommendations',
              icon: '✨'
            }
          ].map((item, index) => (
            <div key={index} className="relative">
              {index < 3 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[var(--mint-dark)] to-transparent z-0" />
              )}
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[var(--mint)]/50 to-[var(--lavender)]/50 flex items-center justify-center text-4xl shadow-lg">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-[var(--coral)] mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t bg-[var(--mint)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--mint-dark)] to-[var(--lavender-dark)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold">CycleIQ</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A hyperlocal AI health co-pilot for women, combining menstrual data, nutrition, stress patterns, 
              and environmental factors to predict health risks and provide personalized insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>PCOS Risk Predictor</li>
              <li>Iron Deficiency Warning</li>
              <li>Stress-Cycle Engine</li>
              <li>Offline-First Engine</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Privacy</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>On-Device Processing</li>
              <li>Zero Cloud Dependency</li>
              <li>Your Data, Your Control</li>
              <li>HIPAA Compliant</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 CycleIQ. Empowering women&apos;s health through AI.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-700">Works Offline</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <HealthProvider>
        <AppContent />
      </HealthProvider>
    </AuthProvider>
  )
}
