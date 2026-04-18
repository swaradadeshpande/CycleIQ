'use client'

import { Rocket, Code, Building, Globe, CheckCircle, Circle } from 'lucide-react'

const roadmapItems = [
  {
    phase: 'Phase 1',
    title: 'Hackathon MVP',
    status: 'completed',
    items: [
      'Core cycle tracking engine',
      'AQI & weather integration',
      'PCOS risk predictor',
      'Basic AI chatbot'
    ],
    icon: Rocket
  },
  {
    phase: 'Phase 2',
    title: 'Beta Launch',
    status: 'current',
    items: [
      'Iron deficiency analysis',
      'Stress-cycle correlation',
      'Enhanced offline support',
      'Community features'
    ],
    icon: Code
  },
  {
    phase: 'Phase 3',
    title: 'Healthcare OS',
    status: 'upcoming',
    items: [
      'Hospital API integration',
      'Doctor consultation booking',
      'Lab report analysis',
      'Government health programs'
    ],
    icon: Building
  },
  {
    phase: 'Phase 4',
    title: 'Global Expansion',
    status: 'upcoming',
    items: [
      'Multi-language support',
      'Regional health insights',
      'Partner integrations',
      'Enterprise solutions'
    ],
    icon: Globe
  }
]

export function RoadmapSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--mint)]/10 to-transparent" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Product{' '}
            <span className="bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] bg-clip-text text-transparent">
              Roadmap
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our journey to revolutionize women&apos;s health across India
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--mint-dark)] via-[var(--lavender-dark)] to-muted transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div 
                key={index}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                    item.status === 'completed' 
                      ? 'bg-emerald-500 text-white' 
                      : item.status === 'current'
                      ? 'bg-gradient-to-br from-[var(--mint-dark)] to-[var(--lavender-dark)] text-white'
                      : 'bg-muted border-2 border-border text-muted-foreground'
                  }`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 ml-28 md:ml-0 ${index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'}`}>
                  <div className={`p-6 rounded-2xl border-2 transition-all ${
                    item.status === 'completed' 
                      ? 'bg-emerald-50 border-emerald-200' 
                      : item.status === 'current'
                      ? 'bg-gradient-to-br from-[var(--mint)]/30 to-[var(--lavender)]/30 border-[var(--mint-dark)]/30 shadow-lg'
                      : 'bg-white/50 border-border/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        item.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : item.status === 'current'
                          ? 'bg-[var(--mint-dark)] text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {item.phase}
                      </span>
                      {item.status === 'current' && (
                        <span className="flex items-center gap-1 text-xs text-[var(--mint-dark)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--mint-dark)] animate-pulse" />
                          In Progress
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          {item.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <Circle className={`w-4 h-4 shrink-0 ${
                              item.status === 'current' ? 'text-[var(--mint-dark)]' : 'text-muted-foreground'
                            }`} />
                          )}
                          <span className={item.status === 'completed' ? 'text-emerald-700' : ''}>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
