'use client'

import { TrendingUp, Users, Target, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const marketData = [
  { name: 'TAM', value: 450, label: 'Total Addressable Market', amount: '$450B' },
  { name: 'SAM', value: 120, label: 'Serviceable Market', amount: '$120B' },
  { name: 'SOM', value: 15, label: 'Target Market', amount: '$15B' },
]

const healthGapsData = [
  { name: 'PCOS', affected: 116, color: 'hsl(var(--chart-1))' },
  { name: 'Iron Deficiency', affected: 52, color: 'hsl(var(--chart-3))' },
  { name: 'Thyroid', affected: 42, color: 'hsl(var(--chart-2))' },
  { name: 'Mental Health', affected: 38, color: 'hsl(var(--chart-4))' },
]

const userProjections = [
  { year: '2024', users: 50 },
  { year: '2025', users: 250 },
  { year: '2026', users: 800 },
  { year: '2027', users: 2000 },
  { year: '2028', users: 5000 },
]

const COLORS = ['hsl(170, 50%, 40%)', 'hsl(270, 50%, 50%)', 'hsl(25, 80%, 60%)', 'hsl(200, 70%, 50%)']

export function AnalyticsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[var(--mint)]/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Market{' '}
            <span className="bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] bg-clip-text text-transparent">
              Opportunity
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Addressing critical health gaps in India&apos;s women&apos;s healthcare market
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Users, value: '500M+', label: 'Women in India', color: 'text-[var(--mint-dark)]' },
            { icon: Target, value: '116M', label: 'Affected by PCOS', color: 'text-[var(--coral)]' },
            { icon: TrendingUp, value: '52%', label: 'Anemia Prevalence', color: 'text-[var(--lavender-dark)]' },
            { icon: Globe, value: '70%', label: 'Rural Population', color: 'text-blue-500' },
          ].map((stat, index) => (
            <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* TAM/SAM/SOM */}
          <Card className="border-0 bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg">Market Size Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {marketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [`${props.payload.amount}`, props.payload.label]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {marketData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: COLORS[index] }}>{item.amount}</div>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Gaps */}
          <Card className="border-0 bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg">Health Gaps in India (Millions Affected)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={healthGapsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                    <Tooltip formatter={(value) => [`${value}M women`, 'Affected']} />
                    <Bar dataKey="affected" radius={[0, 8, 8, 0]}>
                      {healthGapsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Projections */}
          <Card className="border-0 bg-white/80 backdrop-blur-xl lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Projected User Growth (in thousands)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userProjections}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(170, 50%, 40%)" stopOpacity={1} />
                        <stop offset="100%" stopColor="hsl(270, 50%, 50%)" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value}K users`, 'Projected']} />
                    <Bar dataKey="users" fill="url(#colorUsers)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
