'use client'

import { useState } from 'react'
import { Calendar, ArrowRight, ArrowLeft, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useHealth } from '@/lib/health-context'

const symptoms = [
  { id: 'cramps', label: 'Cramps' },
  { id: 'bloating', label: 'Bloating' },
  { id: 'headache', label: 'Headache' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'mood_swings', label: 'Mood Swings' },
  { id: 'acne', label: 'Acne' },
  { id: 'breast_tenderness', label: 'Breast Tenderness' },
  { id: 'back_pain', label: 'Back Pain' },
  { id: 'weight_gain', label: 'Weight Gain' },
  { id: 'hair_growth', label: 'Excess Hair Growth' },
  { id: 'weakness', label: 'Weakness' },
  { id: 'dizziness', label: 'Dizziness' }
]

export function CycleForm() {
  const { updateCycleData, setCurrentStep } = useHealth()
  const [formData, setFormData] = useState({
    lastPeriodDate: '',
    cycleLength: '28',
    periodDuration: '5',
    flowIntensity: 'moderate' as 'light' | 'moderate' | 'heavy',
    irregularity: false,
    symptoms: [] as string[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateCycleData({
      lastPeriodDate: formData.lastPeriodDate,
      cycleLength: parseInt(formData.cycleLength),
      periodDuration: parseInt(formData.periodDuration),
      flowIntensity: formData.flowIntensity,
      irregularity: formData.irregularity,
      symptoms: formData.symptoms
    })
    setCurrentStep(3)
  }

  const toggleSymptom = (symptomId: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(s => s !== symptomId)
        : [...prev.symptoms, symptomId]
    }))
  }

  const isValid = formData.lastPeriodDate && formData.cycleLength && formData.periodDuration

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--coral)]/30 to-[var(--coral)]/10 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[var(--coral)]" />
          </div>
          <CardTitle className="text-2xl">Menstrual Cycle Data</CardTitle>
          <CardDescription>
            Help us understand your cycle patterns for better predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lastPeriodDate">Last Period Start Date</Label>
              <Input
                id="lastPeriodDate"
                type="date"
                value={formData.lastPeriodDate}
                onChange={(e) => setFormData(prev => ({ ...prev, lastPeriodDate: e.target.value }))}
                className="h-12 bg-white/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cycleLength">Cycle Length (days)</Label>
                <Input
                  id="cycleLength"
                  type="number"
                  placeholder="28"
                  min="21"
                  max="45"
                  value={formData.cycleLength}
                  onChange={(e) => setFormData(prev => ({ ...prev, cycleLength: e.target.value }))}
                  className="h-12 bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="periodDuration">Period Duration (days)</Label>
                <Input
                  id="periodDuration"
                  type="number"
                  placeholder="5"
                  min="2"
                  max="10"
                  value={formData.periodDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, periodDuration: e.target.value }))}
                  className="h-12 bg-white/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Flow Intensity
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {(['light', 'moderate', 'heavy'] as const).map((intensity) => (
                  <button
                    key={intensity}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, flowIntensity: intensity }))}
                    className={`py-3 px-4 rounded-xl border-2 transition-all capitalize text-sm font-medium ${
                      formData.flowIntensity === intensity
                        ? 'border-[var(--coral)] bg-[var(--coral)]/10 text-[var(--coral)]'
                        : 'border-border hover:border-[var(--coral)]/30'
                    }`}
                  >
                    {intensity}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div>
                <Label htmlFor="irregularity">Irregular Cycles</Label>
                <p className="text-sm text-muted-foreground">Do your periods come irregularly?</p>
              </div>
              <Switch
                id="irregularity"
                checked={formData.irregularity}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, irregularity: checked }))}
              />
            </div>

            <div className="space-y-3">
              <Label>Common Symptoms (select all that apply)</Label>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    type="button"
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`py-2 px-3 rounded-full border text-sm transition-all ${
                      formData.symptoms.includes(symptom.id)
                        ? 'border-[var(--mint-dark)] bg-[var(--mint)]/50 text-[var(--mint-dark)]'
                        : 'border-border hover:border-[var(--mint-dark)]/30'
                    }`}
                  >
                    {symptom.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="flex-1 h-12"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                type="submit"
                disabled={!isValid}
                className="flex-1 h-12 bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90 text-white"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    step <= 2 ? 'bg-[var(--mint-dark)]' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
