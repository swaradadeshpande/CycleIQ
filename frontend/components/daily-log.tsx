'use client'

import { useState } from 'react'
import { CalendarDays, Plus, X, Smile, Meh, Frown, Zap, Battery } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useHealth } from '@/lib/health-context'
import type { DailyLog } from '@/lib/types'

const moods = [
  { value: 'great', label: 'Great', icon: Smile, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  { value: 'good', label: 'Good', icon: Smile, color: 'text-green-500 bg-green-50 border-green-200' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-gray-500 bg-gray-50 border-gray-200' },
  { value: 'low', label: 'Low', icon: Frown, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  { value: 'bad', label: 'Bad', icon: Frown, color: 'text-red-500 bg-red-50 border-red-200' },
] as const

const quickSymptoms = [
  'Headache', 'Cramps', 'Bloating', 'Fatigue', 'Nausea', 
  'Back Pain', 'Mood Swings', 'Insomnia', 'Anxiety', 'Irritability'
]

export function DailyLogDialog() {
  const { addDailyLog } = useHealth()
  const [open, setOpen] = useState(false)
  const [mood, setMood] = useState<DailyLog['mood']>('neutral')
  const [energy, setEnergy] = useState(5)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    )
  }

  const handleSubmit = () => {
    const log: DailyLog = {
      date: new Date().toISOString().split('T')[0],
      mood,
      energy,
      symptoms,
      notes
    }
    addDailyLog(log)
    setOpen(false)
    // Reset form
    setMood('neutral')
    setEnergy(5)
    setSymptoms([])
    setNotes('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-[var(--mint-dark)] to-[var(--coral)] hover:opacity-90 z-40"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[var(--mint-dark)]" />
            Daily Health Log
          </DialogTitle>
          <DialogDescription>
            Track how you&apos;re feeling today to improve predictions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Mood Selection */}
          <div className="space-y-3">
            <Label>How are you feeling?</Label>
            <div className="flex gap-2">
              {moods.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMood(m.value)}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                    mood === m.value ? m.color : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <m.icon className={`w-6 h-6 mx-auto ${mood === m.value ? '' : 'text-muted-foreground'}`} />
                  <p className="text-xs mt-1 text-center">{m.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div className="space-y-3">
            <Label className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Energy Level
              </span>
              <span className="text-sm font-medium">{energy}/10</span>
            </Label>
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-muted-foreground" />
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[var(--mint-dark)] [&::-webkit-slider-thumb]:rounded-full"
              />
              <Zap className={`w-5 h-5 ${energy > 7 ? 'text-amber-500' : 'text-muted-foreground'}`} />
            </div>
          </div>

          {/* Symptoms */}
          <div className="space-y-3">
            <Label>Any symptoms today?</Label>
            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`py-1.5 px-3 rounded-full text-sm transition-all ${
                    symptoms.includes(symptom)
                      ? 'bg-[var(--coral)]/20 text-[var(--coral)] border border-[var(--coral)]/30'
                      : 'bg-muted hover:bg-muted/80 border border-transparent'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="How was your day? Any observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90 text-white"
            >
              Save Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
