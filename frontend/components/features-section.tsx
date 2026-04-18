'use client'

import { Activity, Droplets, Brain, CloudSun, Smartphone, Shield, Database, Wifi } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Activity,
    title: 'PCOS Risk Predictor',
    description: 'Flags potential PCOS risks 3-6 months early by analyzing cycle patterns, weight changes, and hormonal symptoms.',
    color: 'from-[var(--mint-dark)] to-[var(--mint)]',
    bgColor: 'bg-[var(--mint)]/30'
  },
  {
    icon: Droplets,
    title: 'Iron Deficiency Warning',
    description: 'Correlates your fatigue logs, menstrual flow data, and dietary patterns to predict iron deficiency risks.',
    color: 'from-[var(--coral)] to-[var(--coral)]/60',
    bgColor: 'bg-[var(--coral)]/20'
  },
  {
    icon: Brain,
    title: 'Stress-Cycle Engine',
    description: 'Analyzes cortisol proxies from your behavior patterns to predict emotional dips and cycle irregularities.',
    color: 'from-[var(--lavender-dark)] to-[var(--lavender)]',
    bgColor: 'bg-[var(--lavender)]/50'
  },
  {
    icon: CloudSun,
    title: 'Hyperlocal Context',
    description: 'Integrates real-time weather, AQI, and pollution data from your location for environmental health insights.',
    color: 'from-blue-500 to-blue-300',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Smartphone,
    title: 'On-Device AI',
    description: 'TensorFlow Lite powered predictions run locally on your device, ensuring complete privacy and data security.',
    color: 'from-emerald-500 to-emerald-300',
    bgColor: 'bg-emerald-100'
  },
  {
    icon: Shield,
    title: 'Privacy-First',
    description: 'Your health data never leaves your device. All processing happens locally with zero cloud dependency.',
    color: 'from-amber-500 to-amber-300',
    bgColor: 'bg-amber-100'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--lavender)]/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Intelligent Health{' '}
            <span className="bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] bg-clip-text text-transparent">
              Predictions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI engine combines multiple data sources to provide you with actionable health insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: 'inherit' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Offline-First Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[var(--mint)]/50 via-white to-[var(--lavender)]/50 border border-[var(--mint-dark)]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="w-4 h-0.5 bg-emerald-400" />
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Database className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Offline-First Engine</h3>
                <p className="text-sm text-muted-foreground">
                  Works seamlessly in zero-data rural environments with SQLite local storage
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">Local Processing Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
