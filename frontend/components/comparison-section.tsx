'use client'

import { Check, X, Minus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  { feature: 'Menstrual Cycle Tracking', cycleiq: true, flo: true, clue: true },
  { feature: 'PCOS Risk Prediction', cycleiq: true, flo: false, clue: false },
  { feature: 'Iron Deficiency Warning', cycleiq: true, flo: false, clue: false },
  { feature: 'Stress-Cycle Correlation', cycleiq: true, flo: 'partial', clue: false },
  { feature: 'Hyperlocal AQI Integration', cycleiq: true, flo: false, clue: false },
  { feature: 'Weather Impact Analysis', cycleiq: true, flo: false, clue: false },
  { feature: 'Offline-First Architecture', cycleiq: true, flo: false, clue: false },
  { feature: 'On-Device AI Processing', cycleiq: true, flo: false, clue: false },
  { feature: 'Rural-Ready (Zero Data)', cycleiq: true, flo: false, clue: false },
  { feature: 'Privacy-First Design', cycleiq: true, flo: 'partial', clue: true },
  { feature: 'AI Health Assistant', cycleiq: true, flo: true, clue: false },
  { feature: 'Personalized Insights', cycleiq: true, flo: true, clue: true },
]

function FeatureStatus({ status }: { status: boolean | 'partial' }) {
  if (status === true) {
    return (
      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
        <Check className="w-4 h-4 text-emerald-600" />
      </div>
    )
  }
  if (status === 'partial') {
    return (
      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
        <Minus className="w-4 h-4 text-amber-600" />
      </div>
    )
  }
  return (
    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
      <X className="w-4 h-4 text-red-500" />
    </div>
  )
}

export function ComparisonSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[var(--lavender)]/20 to-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-[var(--mint-dark)] to-[var(--coral)] bg-clip-text text-transparent">
              CycleIQ
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we compare to other period tracking apps
          </p>
        </div>

        <Card className="border-0 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[var(--mint)]/50 to-[var(--lavender)]/50">
                    <th className="text-left p-4 font-medium">Feature</th>
                    <th className="p-4 text-center">
                      <div className="font-bold text-[var(--mint-dark)]">CycleIQ</div>
                      <div className="text-xs text-muted-foreground">Hyperlocal AI</div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="font-medium">Flo</div>
                      <div className="text-xs text-muted-foreground">General</div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="font-medium">Clue</div>
                      <div className="text-xs text-muted-foreground">Science-based</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-t border-border/50 ${index % 2 === 0 ? 'bg-white/50' : 'bg-muted/20'}`}
                    >
                      <td className="p-4 text-sm">{row.feature}</td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <FeatureStatus status={row.cycleiq} />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <FeatureStatus status={row.flo} />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <FeatureStatus status={row.clue} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Legend: <Check className="w-4 h-4 inline text-emerald-600" /> Full Support | <Minus className="w-4 h-4 inline text-amber-600" /> Partial | <X className="w-4 h-4 inline text-red-500" /> Not Available</p>
        </div>
      </div>
    </section>
  )
}
