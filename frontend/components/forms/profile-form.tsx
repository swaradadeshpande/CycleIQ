'use client'

import { useState } from 'react'
import { User, MapPin, ArrowRight, Scale, Ruler } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useHealth } from '@/lib/health-context'

export function ProfileForm() {
  const { updateProfile, setCurrentStep } = useHealth()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    location: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      name: formData.name,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      location: formData.location
    })
    setCurrentStep(2)
  }

  const isValid = formData.name && formData.age && formData.weight && formData.height && formData.location

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--mint)] to-[var(--lavender)] flex items-center justify-center">
            <User className="w-8 h-8 text-[var(--mint-dark)]" />
          </div>
          <CardTitle className="text-2xl">Create Your Profile</CardTitle>
          <CardDescription>
            Let&apos;s start with some basic information about you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="h-12 bg-white/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Years"
                  min="13"
                  max="65"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="h-12 bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" />
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="kg"
                  min="30"
                  max="200"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="h-12 bg-white/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5" />
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="cm"
                  min="100"
                  max="220"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  className="h-12 bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="h-12 bg-white/50"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit"
                disabled={!isValid}
                className="w-full h-12 bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90 text-white gap-2"
              >
                Continue to Cycle Data
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-center gap-2 pt-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    step === 1 ? 'bg-[var(--mint-dark)]' : 'bg-muted'
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
