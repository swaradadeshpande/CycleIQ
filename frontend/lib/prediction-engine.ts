import type { 
  UserProfile, 
  CycleData, 
  NutritionData, 
  StressData, 
  EnvironmentalData,
  HealthRisks 
} from './types'

// Dummy environmental data generator
export function generateDummyEnvironmentalData(): EnvironmentalData {
  const aqiLevels = [45, 78, 120, 156, 89, 67, 134]
  const aqi = aqiLevels[Math.floor(Math.random() * aqiLevels.length)]
  
  let pollutionLevel: 'low' | 'moderate' | 'high' | 'severe'
  if (aqi <= 50) pollutionLevel = 'low'
  else if (aqi <= 100) pollutionLevel = 'moderate'
  else if (aqi <= 150) pollutionLevel = 'high'
  else pollutionLevel = 'severe'

  return {
    aqi,
    temperature: 25 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
    uvIndex: Math.floor(Math.random() * 11),
    pollutionLevel
  }
}

// PCOS Risk Calculation
function calculatePCOSRisk(
  profile: UserProfile,
  cycleData: CycleData,
  nutritionData: NutritionData,
  stressData: StressData
): { risk: number; factors: string[] } {
  let riskScore = 0
  const factors: string[] = []

  // BMI calculation
  const heightInMeters = profile.height / 100
  const bmi = profile.weight / (heightInMeters * heightInMeters)
  
  if (bmi > 25) {
    riskScore += 15
    factors.push('Elevated BMI may increase hormonal imbalance risk')
  }
  if (bmi > 30) {
    riskScore += 10
    factors.push('Higher BMI associated with insulin resistance')
  }

  // Cycle irregularity
  if (cycleData.irregularity) {
    riskScore += 20
    factors.push('Irregular menstrual cycles detected')
  }
  
  if (cycleData.cycleLength < 21 || cycleData.cycleLength > 35) {
    riskScore += 15
    factors.push('Cycle length outside normal range (21-35 days)')
  }

  // Heavy flow
  if (cycleData.flowIntensity === 'heavy') {
    riskScore += 10
    factors.push('Heavy menstrual flow may indicate hormonal imbalance')
  }

  // Symptoms analysis
  const pcosSymptoms = ['acne', 'hair_growth', 'weight_gain', 'fatigue', 'mood_swings']
  const matchingSymptoms = cycleData.symptoms.filter(s => pcosSymptoms.includes(s))
  if (matchingSymptoms.length >= 2) {
    riskScore += matchingSymptoms.length * 5
    factors.push(`${matchingSymptoms.length} PCOS-associated symptoms reported`)
  }

  // Nutrition factors
  if (nutritionData.junkFoodFrequency > 3) {
    riskScore += 10
    factors.push('High processed food intake may affect hormonal balance')
  }

  // Stress factors
  if (stressData.stressLevel > 7) {
    riskScore += 12
    factors.push('High stress levels can disrupt hormonal regulation')
  }

  if (stressData.sleepHours < 6) {
    riskScore += 8
    factors.push('Insufficient sleep affects hormone production')
  }

  if (stressData.exerciseFrequency < 2) {
    riskScore += 8
    factors.push('Low physical activity may contribute to insulin resistance')
  }

  // Age factor
  if (profile.age >= 18 && profile.age <= 35) {
    riskScore += 5 // Peak reproductive age, higher monitoring needed
  }

  return {
    risk: Math.min(100, Math.max(0, riskScore)),
    factors
  }
}

// Iron Deficiency Risk Calculation
function calculateIronDeficiencyRisk(
  profile: UserProfile,
  cycleData: CycleData,
  nutritionData: NutritionData,
  stressData: StressData
): { risk: number; factors: string[] } {
  let riskScore = 0
  const factors: string[] = []

  // Heavy menstrual bleeding
  if (cycleData.flowIntensity === 'heavy') {
    riskScore += 25
    factors.push('Heavy menstrual flow increases iron loss')
  }

  if (cycleData.periodDuration > 7) {
    riskScore += 15
    factors.push('Extended period duration (>7 days) increases iron depletion')
  }

  // Diet factors
  if (nutritionData.dietType === 'vegan') {
    riskScore += 15
    factors.push('Vegan diet may have lower bioavailable iron')
  } else if (nutritionData.dietType === 'vegetarian') {
    riskScore += 10
    factors.push('Vegetarian diet - ensure adequate iron-rich plant foods')
  }

  if (nutritionData.ironRichFoods < 3) {
    riskScore += 20
    factors.push('Low consumption of iron-rich foods')
  }

  // Check for iron supplements
  if (!nutritionData.supplements.includes('iron') && !nutritionData.supplements.includes('multivitamin')) {
    riskScore += 8
    factors.push('No iron supplementation detected')
  }

  // Symptoms
  const ironSymptoms = ['fatigue', 'weakness', 'pale_skin', 'brittle_nails', 'dizziness']
  const matchingSymptoms = cycleData.symptoms.filter(s => ironSymptoms.includes(s))
  if (matchingSymptoms.length >= 2) {
    riskScore += matchingSymptoms.length * 8
    factors.push(`${matchingSymptoms.length} potential iron deficiency symptoms reported`)
  }

  // Low energy from stress data
  if (stressData.sleepQuality === 'poor') {
    riskScore += 5
    factors.push('Poor sleep quality may mask or worsen fatigue symptoms')
  }

  // Water intake affects nutrient absorption
  if (nutritionData.waterIntake < 1.5) {
    riskScore += 5
    factors.push('Low water intake may affect nutrient absorption')
  }

  return {
    risk: Math.min(100, Math.max(0, riskScore)),
    factors
  }
}

// Stress Impact Calculation
function calculateStressImpact(
  stressData: StressData,
  environmentalData: EnvironmentalData | null
): { impact: number; factors: string[] } {
  let impactScore = 0
  const factors: string[] = []

  // Direct stress level
  impactScore += stressData.stressLevel * 5

  // Sleep factors
  if (stressData.sleepHours < 6) {
    impactScore += 15
    factors.push('Sleep deprivation amplifies stress response')
  } else if (stressData.sleepHours < 7) {
    impactScore += 8
    factors.push('Slightly below optimal sleep duration')
  }

  if (stressData.sleepQuality === 'poor') {
    impactScore += 12
    factors.push('Poor sleep quality disrupts cortisol regulation')
  } else if (stressData.sleepQuality === 'fair') {
    impactScore += 6
    factors.push('Sleep quality could be improved')
  }

  // Work-life balance
  if (stressData.workHoursPerDay > 10) {
    impactScore += 15
    factors.push('Extended work hours increase chronic stress')
  } else if (stressData.workHoursPerDay > 8) {
    impactScore += 8
    factors.push('Above average work hours may contribute to stress')
  }

  // Screen time
  if (stressData.screenTimeHours > 8) {
    impactScore += 10
    factors.push('High screen time may affect sleep and stress levels')
  }

  // Exercise as stress buffer
  if (stressData.exerciseFrequency >= 4) {
    impactScore -= 10
    factors.push('Regular exercise helps manage stress (positive factor)')
  } else if (stressData.exerciseFrequency < 2) {
    impactScore += 8
    factors.push('Low physical activity reduces stress resilience')
  }

  // Environmental factors
  if (environmentalData) {
    if (environmentalData.pollutionLevel === 'high' || environmentalData.pollutionLevel === 'severe') {
      impactScore += 8
      factors.push('High pollution levels may increase oxidative stress')
    }
    if (environmentalData.uvIndex > 7) {
      impactScore += 3
      factors.push('High UV exposure - ensure sun protection')
    }
  }

  return {
    impact: Math.min(100, Math.max(0, impactScore)),
    factors
  }
}

// Overall Wellness Score
function calculateOverallWellness(
  pcosRisk: number,
  ironRisk: number,
  stressImpact: number
): number {
  // Invert risks to get wellness score
  const pcosWellness = 100 - pcosRisk
  const ironWellness = 100 - ironRisk
  const stressWellness = 100 - stressImpact

  // Weighted average
  const wellness = (pcosWellness * 0.3) + (ironWellness * 0.3) + (stressWellness * 0.4)
  return Math.round(wellness)
}

// Main prediction function
export function calculateHealthRisks(
  profile: UserProfile,
  cycleData: CycleData,
  nutritionData: NutritionData,
  stressData: StressData,
  environmentalData: EnvironmentalData | null
): HealthRisks {
  const pcosResult = calculatePCOSRisk(profile, cycleData, nutritionData, stressData)
  const ironResult = calculateIronDeficiencyRisk(profile, cycleData, nutritionData, stressData)
  const stressResult = calculateStressImpact(stressData, environmentalData)
  
  const overallWellness = calculateOverallWellness(
    pcosResult.risk,
    ironResult.risk,
    stressResult.impact
  )

  return {
    pcosRisk: Math.round(pcosResult.risk),
    pcosFactors: pcosResult.factors,
    ironDeficiencyRisk: Math.round(ironResult.risk),
    ironDeficiencyFactors: ironResult.factors,
    stressImpact: Math.round(stressResult.impact),
    stressFactors: stressResult.factors,
    overallWellness
  }
}

// Get risk level label
export function getRiskLevel(score: number): 'low' | 'moderate' | 'high' | 'critical' {
  if (score <= 25) return 'low'
  if (score <= 50) return 'moderate'
  if (score <= 75) return 'high'
  return 'critical'
}

// Get color for risk level
export function getRiskColor(level: 'low' | 'moderate' | 'high' | 'critical'): string {
  switch (level) {
    case 'low': return 'text-emerald-600'
    case 'moderate': return 'text-amber-500'
    case 'high': return 'text-orange-500'
    case 'critical': return 'text-red-500'
  }
}

export function getRiskBgColor(level: 'low' | 'moderate' | 'high' | 'critical'): string {
  switch (level) {
    case 'low': return 'bg-emerald-50 border-emerald-200'
    case 'moderate': return 'bg-amber-50 border-amber-200'
    case 'high': return 'bg-orange-50 border-orange-200'
    case 'critical': return 'bg-red-50 border-red-200'
  }
}
