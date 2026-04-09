export interface UserProfile {
  name: string
  age: number
  weight: number
  height: number
  location: string
}

export interface CycleData {
  lastPeriodDate: string
  cycleLength: number
  periodDuration: number
  flowIntensity: 'light' | 'moderate' | 'heavy'
  irregularity: boolean
  symptoms: string[]
}

export interface NutritionData {
  dietType: 'vegetarian' | 'non-vegetarian' | 'vegan'
  ironRichFoods: number // frequency per week
  waterIntake: number // liters per day
  mealsPerDay: number
  junkFoodFrequency: number // times per week
  supplements: string[]
}

export interface StressData {
  stressLevel: number // 1-10
  sleepHours: number
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent'
  exerciseFrequency: number // times per week
  exerciseType: string[]
  workHoursPerDay: number
  screenTimeHours: number
}

export interface EnvironmentalData {
  aqi: number
  temperature: number
  humidity: number
  uvIndex: number
  pollutionLevel: 'low' | 'moderate' | 'high' | 'severe'
}

export interface HealthRisks {
  pcosRisk: number // 0-100
  pcosFactors: string[]
  ironDeficiencyRisk: number // 0-100
  ironDeficiencyFactors: string[]
  stressImpact: number // 0-100
  stressFactors: string[]
  overallWellness: number // 0-100
}

export interface DailyLog {
  date: string
  mood: 'great' | 'good' | 'neutral' | 'low' | 'bad'
  energy: number // 1-10
  symptoms: string[]
  notes: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface HealthData {
  profile: UserProfile | null
  cycleData: CycleData | null
  nutritionData: NutritionData | null
  stressData: StressData | null
  environmentalData: EnvironmentalData | null
  risks: HealthRisks | null
  dailyLogs: DailyLog[]
}
