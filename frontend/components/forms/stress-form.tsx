'use client'

import { useState } from 'react'
import { Brain, ArrowLeft, Moon, Dumbbell, Monitor, Briefcase, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { useHealth } from '@/lib/health-context'

const exerciseTypes = [
  { id: 'walking', label: 'Walking' },
  { id: 'running', label: 'Running' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'gym', label: 'Gym' },
  { id: 'swimming', label: 'Swimming' },
  { id: 'cycling', label: 'Cycling' },
  { id: 'dancing', label: 'Dancing' },
  { id: 'none', label: 'None' }
]

export function StressForm() {
  const { updateStressData, setCurrentStep } = useHealth()
  const [formData, setFormData] = useState({
    stressLevel: 5,
    sleepHours: 7,
    sleepQuality: 'good' as 'poor' | 'fair' | 'good' | 'excellent',
    exerciseFrequency: 3,
    exerciseType: [] as string[],
    workHoursPerDay: 8,
    screenTimeHours: 6
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateStressData({
      stressLevel: formData.stressLevel,
      sleepHours: formData.sleepHours,
      sleepQuality: formData.sleepQuality,
      exerciseFrequency: formData.exerciseFrequency,
      exerciseType: formData.exerciseType.filter(t => t !== 'none'),
      workHoursPerDay: formData.workHoursPerDay,
      screenTimeHours: formData.screenTimeHours
    })
    // Risks are auto-calculated in the context when all data is complete
    setCurrentStep(5)
  }

  const toggleExercise = (exerciseId: string) => {
    if (exerciseId === 'none') {
      setFormData(prev => ({
        ...prev,
        exerciseType: prev.exerciseType.includes('none') ? [] : ['none']
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        exerciseType: prev.exerciseType.includes(exerciseId)
          ? prev.exerciseType.filter(e => e !== exerciseId)
          : [...prev.exerciseType.filter(e => e !== 'none'), exerciseId]
      }))
    }
  }

  const getStressEmoji = (level: number) => {
    if (level <= 3) return '😌'
    if (level <= 5) return '😐'
    if (level <= 7) return '😰'
    return '😫'
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--lavender)] to-[var(--lavender)]/50 flex items-center justify-center">
            <Brain className="w-8 h-8 text-[var(--lavender-dark)]" />
          </div>
          <CardTitle className="text-2xl">Lifestyle & Stress</CardTitle>
          <CardDescription>
            Your lifestyle patterns affect hormonal balance and overall health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Current Stress Level</Label>
                <span className="text-2xl">{getStressEmoji(formData.stressLevel)}</span>
              </div>
              <Slider
                value={[formData.stressLevel]}
                onValueChange={([value]) => setFormData(prev => ({ ...prev, stressLevel: value }))}
                min={1}
                max={10}
                step={1}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Relaxed</span>
                <span>Moderate</span>
                <span>Very Stressed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-1">
                    <Moon className="w-4 h-4" />
                    Sleep (hours)
                  </Label>
                  <span className="text-sm font-medium text-[var(--lavender-dark)]">{formData.sleepHours}h</span>
                </div>
                <Slider
                  value={[formData.sleepHours]}
                  onValueChange={([value]) => setFormData(prev => ({ ...prev, sleepHours: value }))}
                  min={4}
                  max={12}
                  step={0.5}
                  className="py-2"
                />
              </div>

              <div className="space-y-3">
                <Label>Sleep Quality</Label>
                <div className="grid grid-cols-2 gap-1">
                  {(['poor', 'fair', 'good', 'excellent'] as const).map((quality) => (
                    <button
                      key={quality}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, sleepQuality: quality }))}
                      className={`py-2 px-2 rounded-lg border text-xs font-medium capitalize transition-all ${
                        formData.sleepQuality === quality
                          ? 'border-[var(--lavender-dark)] bg-[var(--lavender)]/50 text-[var(--lavender-dark)]'
                          : 'border-border hover:border-[var(--lavender-dark)]/30'
                      }`}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Work Hours
                  </Label>
                  <span className="text-sm font-medium">{formData.workHoursPerDay}h</span>
                </div>
                <Slider
                  value={[formData.workHoursPerDay]}
                  onValueChange={([value]) => setFormData(prev => ({ ...prev, workHoursPerDay: value }))}
                  min={0}
                  max={16}
                  step={1}
                  className="py-2"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-1">
                    <Monitor className="w-4 h-4" />
                    Screen Time
                  </Label>
                  <span className="text-sm font-medium">{formData.screenTimeHours}h</span>
                </div>
                <Slider
                  value={[formData.screenTimeHours]}
                  onValueChange={([value]) => setFormData(prev => ({ ...prev, screenTimeHours: value }))}
                  min={0}
                  max={16}
                  step={1}
                  className="py-2"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  Exercise Frequency
                </Label>
                <span className="text-sm font-medium text-emerald-600">{formData.exerciseFrequency}x/week</span>
              </div>
              <Slider
                value={[formData.exerciseFrequency]}
                onValueChange={([value]) => setFormData(prev => ({ ...prev, exerciseFrequency: value }))}
                min={0}
                max={7}
                step={1}
                className="py-2"
              />
            </div>

            <div className="space-y-3">
              <Label>Exercise Types</Label>
              <div className="flex flex-wrap gap-2">
                {exerciseTypes.map((exercise) => (
                  <button
                    key={exercise.id}
                    type="button"
                    onClick={() => toggleExercise(exercise.id)}
                    className={`py-2 px-3 rounded-full border text-sm transition-all ${
                      formData.exerciseType.includes(exercise.id)
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-border hover:border-emerald-300'
                    }`}
                  >
                    {exercise.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(3)}
                className="flex-1 h-12"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-[var(--mint-dark)] to-[var(--coral)] hover:opacity-90 text-white gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Get My Results
              </Button>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className="w-2 h-2 rounded-full bg-[var(--mint-dark)]"
                />
              ))}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
