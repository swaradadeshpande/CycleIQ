'use client'

import { Activity, Droplets, Brain, CloudSun, TrendingUp, AlertTriangle, CheckCircle, Thermometer, Wind, Sun, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useHealth } from '@/lib/health-context'
import { getRiskLevel, getRiskColor, getRiskBgColor } from '@/lib/prediction-engine'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts'

export function Dashboard() {
  const { healthData, setCurrentStep } = useHealth()
  const { profile, cycleData, risks, environmentalData } = healthData

  if (!risks || !profile) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <CardTitle className="mb-4">No Data Available</CardTitle>
          <CardDescription className="mb-6">
            Complete your health assessment to see your personalized dashboard
          </CardDescription>
          <Button onClick={() => setCurrentStep(1)}>
            Start Assessment
          </Button>
        </Card>
      </div>
    )
  }

  // Dummy cycle prediction data
  const cyclePredictionData = [
    { day: 'Day 1', hormoneLevel: 30, energy: 40 },
    { day: 'Day 7', hormoneLevel: 60, energy: 65 },
    { day: 'Day 14', hormoneLevel: 90, energy: 85 },
    { day: 'Day 21', hormoneLevel: 70, energy: 60 },
    { day: 'Day 28', hormoneLevel: 35, energy: 45 },
  ]

  const wellnessData = [
    { name: 'Wellness', value: risks.overallWellness, fill: 'hsl(var(--chart-1))' }
  ]

  const pcosLevel = getRiskLevel(risks.pcosRisk)
  const ironLevel = getRiskLevel(risks.ironDeficiencyRisk)
  const stressLevel = getRiskLevel(risks.stressImpact)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] bg-clip-text text-transparent">{profile.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here&apos;s your personalized health insights</p>
        </div>
        <Button 
          onClick={() => setCurrentStep(6)}
          className="bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90 text-white gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Chat with AI
        </Button>
      </div>

      {/* Overall Wellness Score */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1 border-0 bg-gradient-to-br from-[var(--mint)]/50 to-[var(--lavender)]/50 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Wellness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={wellnessData} startAngle={180} endAngle={0}>
                  <RadialBar background dataKey="value" cornerRadius={10} fill="url(#colorWellness)" />
                  <defs>
                    <linearGradient id="colorWellness" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(170, 50%, 40%)" />
                      <stop offset="100%" stopColor="hsl(270, 50%, 50%)" />
                    </linearGradient>
                  </defs>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center -mt-20">
              <div className="text-5xl font-bold bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] bg-clip-text text-transparent">
                {risks.overallWellness}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">Based on all health factors</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="lg:col-span-2 border-0 bg-white/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg">Cycle Prediction</CardTitle>
            <CardDescription>Hormone & energy levels throughout your cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cyclePredictionData}>
                  <defs>
                    <linearGradient id="colorHormone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(170, 50%, 40%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(170, 50%, 40%)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25, 80%, 60%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(25, 80%, 60%)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="hormoneLevel" stroke="hsl(170, 50%, 40%)" fillOpacity={1} fill="url(#colorHormone)" name="Hormone Level" />
                  <Area type="monotone" dataKey="energy" stroke="hsl(25, 80%, 60%)" fillOpacity={1} fill="url(#colorEnergy)" name="Energy" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* PCOS Risk */}
        <Card className={`border-2 ${getRiskBgColor(pcosLevel)}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[var(--mint)]/50 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[var(--mint-dark)]" />
              </div>
              {pcosLevel === 'low' ? (
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              ) : (
                <AlertTriangle className={`w-6 h-6 ${getRiskColor(pcosLevel)}`} />
              )}
            </div>
            <CardTitle className="text-lg mt-2">PCOS Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-3">
              <span className={`text-4xl font-bold ${getRiskColor(pcosLevel)}`}>{risks.pcosRisk}%</span>
              <span className="text-sm text-muted-foreground mb-1 capitalize">{pcosLevel} Risk</span>
            </div>
            <Progress value={risks.pcosRisk} className="h-2 mb-4" />
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Key Factors:</p>
              {risks.pcosFactors.slice(0, 2).map((factor, i) => (
                <p key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                  <TrendingUp className="w-3 h-3 mt-0.5 shrink-0" />
                  {factor}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Iron Deficiency */}
        <Card className={`border-2 ${getRiskBgColor(ironLevel)}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[var(--coral)]/30 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-[var(--coral)]" />
              </div>
              {ironLevel === 'low' ? (
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              ) : (
                <AlertTriangle className={`w-6 h-6 ${getRiskColor(ironLevel)}`} />
              )}
            </div>
            <CardTitle className="text-lg mt-2">Iron Deficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-3">
              <span className={`text-4xl font-bold ${getRiskColor(ironLevel)}`}>{risks.ironDeficiencyRisk}%</span>
              <span className="text-sm text-muted-foreground mb-1 capitalize">{ironLevel} Risk</span>
            </div>
            <Progress value={risks.ironDeficiencyRisk} className="h-2 mb-4" />
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Key Factors:</p>
              {risks.ironDeficiencyFactors.slice(0, 2).map((factor, i) => (
                <p key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                  <TrendingUp className="w-3 h-3 mt-0.5 shrink-0" />
                  {factor}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stress Impact */}
        <Card className={`border-2 ${getRiskBgColor(stressLevel)}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[var(--lavender)]/50 flex items-center justify-center">
                <Brain className="w-6 h-6 text-[var(--lavender-dark)]" />
              </div>
              {stressLevel === 'low' ? (
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              ) : (
                <AlertTriangle className={`w-6 h-6 ${getRiskColor(stressLevel)}`} />
              )}
            </div>
            <CardTitle className="text-lg mt-2">Stress Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-3">
              <span className={`text-4xl font-bold ${getRiskColor(stressLevel)}`}>{risks.stressImpact}%</span>
              <span className="text-sm text-muted-foreground mb-1 capitalize">{stressLevel}</span>
            </div>
            <Progress value={risks.stressImpact} className="h-2 mb-4" />
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Key Factors:</p>
              {risks.stressFactors.slice(0, 2).map((factor, i) => (
                <p key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                  <TrendingUp className="w-3 h-3 mt-0.5 shrink-0" />
                  {factor}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Environmental Data */}
        {environmentalData && (
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-sky-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-lg">Environmental Context</CardTitle>
              </div>
              <CardDescription>Local factors affecting your health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/60 text-center">
                  <Thermometer className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <p className="text-2xl font-bold">{environmentalData.temperature.toFixed(0)}°C</p>
                  <p className="text-xs text-muted-foreground">Temperature</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 text-center">
                  <Wind className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                  <p className="text-2xl font-bold">{environmentalData.aqi}</p>
                  <p className="text-xs text-muted-foreground">AQI</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 text-center">
                  <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold">{environmentalData.humidity.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 text-center">
                  <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <p className="text-2xl font-bold">{environmentalData.uvIndex}</p>
                  <p className="text-xs text-muted-foreground">UV Index</p>
                </div>
              </div>
              {(environmentalData.pollutionLevel === 'high' || environmentalData.pollutionLevel === 'severe') && (
                <div className="mt-4 p-3 rounded-lg bg-amber-100 border border-amber-200 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-sm text-amber-800">
                    High pollution detected. Consider limiting outdoor activities and staying hydrated.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Profile Summary */}
        <Card className="border-0 bg-white/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg">Your Profile Summary</CardTitle>
            <CardDescription>Data used for predictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-semibold">{profile.age} years</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">BMI</p>
                <p className="font-semibold">{(profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)}</p>
              </div>
              {cycleData && (
                <>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Cycle Length</p>
                    <p className="font-semibold">{cycleData.cycleLength} days</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Flow Intensity</p>
                    <p className="font-semibold capitalize">{cycleData.flowIntensity}</p>
                  </div>
                </>
              )}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(1)}
              className="w-full"
            >
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
