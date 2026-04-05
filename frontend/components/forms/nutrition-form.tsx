'use client'

import { useState } from 'react'
import { Utensils, ArrowRight, ArrowLeft, Droplet, Pill } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { useHealth } from '@/lib/health-context'

const supplements = [
  { id: 'iron', label: 'Iron' },
  { id: 'multivitamin', label: 'Multivitamin' },
  { id: 'vitamin_d', label: 'Vitamin D' },
  { id: 'calcium', label: 'Calcium' },
  { id: 'omega3', label: 'Omega-3' },
  { id: 'folic_acid', label: 'Folic Acid' },
  { id: 'b12', label: 'Vitamin B12' },
  { id: 'none', label: 'None' }
]

export function NutritionForm() {
  const { updateNutritionData, setCurrentStep } = useHealth()
  const [formData, setFormData] = useState({
    dietType: 'non-vegetarian' as 'vegetarian' | 'non-vegetarian' | 'vegan',
    ironRichFoods: 3,
    waterIntake: 2,
    mealsPerDay: 3,
    junkFoodFrequency: 2,
    supplements: [] as string[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateNutritionData({
      dietType: formData.dietType,
      ironRichFoods: formData.ironRichFoods,
      waterIntake: formData.waterIntake,
      mealsPerDay: formData.mealsPerDay,
      junkFoodFrequency: formData.junkFoodFrequency,
      supplements: formData.supplements.filter(s => s !== 'none')
    })
    setCurrentStep(4)
  }

  const toggleSupplement = (supplementId: string) => {
    if (supplementId === 'none') {
      setFormData(prev => ({
        ...prev,
        supplements: prev.supplements.includes('none') ? [] : ['none']
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        supplements: prev.supplements.includes(supplementId)
          ? prev.supplements.filter(s => s !== supplementId)
          : [...prev.supplements.filter(s => s !== 'none'), supplementId]
      }))
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-200 to-emerald-100 flex items-center justify-center">
            <Utensils className="w-8 h-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl">Nutrition & Diet</CardTitle>
          <CardDescription>
            Your dietary habits help us assess nutritional health risks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label>Diet Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {(['vegetarian', 'non-vegetarian', 'vegan'] as const).map((diet) => (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, dietType: diet }))}
                    className={`py-3 px-2 rounded-xl border-2 transition-all capitalize text-sm font-medium ${
                      formData.dietType === diet
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-border hover:border-emerald-300'
                    }`}
                  >
                    {diet.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Iron-Rich Foods (times/week)</Label>
                  <span className="text-sm font-medium text-emerald-600">{formData.ironRichFoods}x</span>
                </div>
                <Slider
                  value={[formData.ironRichFoods]}
                  onValueChange={([value]) => setFormData(prev => ({ ...prev, ironRichFoods: value }))}
                  min={0}
                  max={7}
                  step={1}
                  className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                  Spinach, lentils, red meat, beans, fortified cereals
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-1">
                    <Droplet className="w-4 h-4" />
                    Water Intake (liters/day)
                  </Label>
                  <span className="text-sm font-medium text-blue-600">{formData.waterIntake}L</span>
                </div>
                <Slider
                  value={[formData.waterIntake]}
                  onValueChange={([value]) => setFormData(prev => ({ ...prev, waterIntake: value }))}
                  min={0.5}
                  max={4}
                  step={0.5}
                  className="py-2"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Processed/Junk Food (times/week)</Label>
                  <span className="text-sm font-medium text-amber-600">{formData.junkFoodFrequency}x</span>
                </div>
                <Slider
                  value={[formData.junkFoodFrequency]}
                  onValueChange={([value]) => setFormData(prev => ({ ...prev, junkFoodFrequency: value }))}
                  min={0}
                  max={7}
                  step={1}
                  className="py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mealsPerDay">Meals Per Day</Label>
                <Input
                  id="mealsPerDay"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.mealsPerDay}
                  onChange={(e) => setFormData(prev => ({ ...prev, mealsPerDay: parseInt(e.target.value) || 3 }))}
                  className="h-12 bg-white/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Pill className="w-4 h-4" />
                Supplements You Take
              </Label>
              <div className="flex flex-wrap gap-2">
                {supplements.map((supplement) => (
                  <button
                    key={supplement.id}
                    type="button"
                    onClick={() => toggleSupplement(supplement.id)}
                    className={`py-2 px-3 rounded-full border text-sm transition-all ${
                      formData.supplements.includes(supplement.id)
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-border hover:border-emerald-300'
                    }`}
                  >
                    {supplement.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="flex-1 h-12"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                type="submit"
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
                    step <= 3 ? 'bg-[var(--mint-dark)]' : 'bg-muted'
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
