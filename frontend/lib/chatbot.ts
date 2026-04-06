import type { HealthData } from './types'

interface ChatResponse {
  message: string
  suggestions?: string[]
}

const greetings = [
  "Hello! I'm your CycleIQ health assistant. How can I help you today?",
  "Hi there! I'm here to help with any health-related questions. What's on your mind?",
  "Welcome! I'm your AI health co-pilot. Feel free to ask me anything about your health."
]

const pcosResponses = [
  "Based on your data, I'm monitoring several factors related to PCOS risk. Key indicators include cycle regularity, BMI, and hormonal symptoms. Would you like specific recommendations?",
  "PCOS is a hormonal condition that affects many women. Early detection through cycle tracking and symptom monitoring can help manage it effectively. Your current risk factors are being analyzed.",
  "I'm tracking your PCOS-related markers. Lifestyle modifications like regular exercise and a balanced diet can significantly help manage symptoms."
]

const ironResponses = [
  "Iron deficiency is common among women, especially with heavy menstrual flow. Based on your diet and cycle data, I can help you optimize iron intake.",
  "Your iron status is being monitored through your nutrition and menstrual data. Including more iron-rich foods and vitamin C for better absorption can help.",
  "I'm analyzing your risk factors for iron deficiency. Heavy periods and certain diets can increase the need for iron supplementation."
]

const stressResponses = [
  "Stress management is crucial for hormonal balance. Based on your sleep patterns and activity levels, I have some personalized recommendations.",
  "Your stress levels can significantly impact your menstrual cycle. Regular exercise, adequate sleep, and relaxation techniques can help.",
  "I'm tracking your stress indicators including sleep quality and work patterns. Would you like tips on managing stress better?"
]

const cycleResponses = [
  "Based on your tracking data, your next period is likely to start soon. I'll continue monitoring for any irregularities.",
  "Your cycle data helps me predict hormonal fluctuations and provide timely health insights. Keep logging for better predictions!",
  "Cycle tracking is essential for understanding your body's patterns. I'm analyzing your data to provide personalized insights."
]

const nutritionResponses = [
  "Nutrition plays a vital role in hormonal health. Based on your diet, I recommend focusing on iron-rich foods and reducing processed food intake.",
  "A balanced diet supports overall wellness. Your current nutrition patterns are being factored into your health predictions.",
  "I'm analyzing your dietary patterns to provide personalized nutrition recommendations for optimal health."
]

const generalResponses = [
  "That's an interesting question! Based on your health profile, I can provide some insights.",
  "I'm here to help! Let me analyze your data and provide relevant information.",
  "Great question! Your health data helps me give you personalized recommendations."
]

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)]
}

function analyzeHealthData(healthData: HealthData): string[] {
  const insights: string[] = []
  
  if (healthData.risks) {
    if (healthData.risks.pcosRisk > 50) {
      insights.push("Your PCOS risk is elevated. Consider consulting a healthcare provider.")
    }
    if (healthData.risks.ironDeficiencyRisk > 50) {
      insights.push("Your iron deficiency risk is notable. Focus on iron-rich foods.")
    }
    if (healthData.risks.stressImpact > 60) {
      insights.push("Your stress levels may be affecting your health. Consider relaxation techniques.")
    }
  }
  
  return insights
}

export function generateChatResponse(message: string, healthData: HealthData): ChatResponse {
  const lowerMessage = message.toLowerCase()
  
  // Greeting detection
  if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return {
      message: getRandomResponse(greetings),
      suggestions: ["Tell me about my PCOS risk", "How is my iron level?", "Give me health tips"]
    }
  }
  
  // PCOS related
  if (lowerMessage.includes('pcos') || lowerMessage.includes('polycystic')) {
    let response = getRandomResponse(pcosResponses)
    if (healthData.risks) {
      response += `\n\nYour current PCOS risk score is ${healthData.risks.pcosRisk}%. `
      if (healthData.risks.pcosFactors.length > 0) {
        response += `Key factors: ${healthData.risks.pcosFactors.slice(0, 2).join(', ')}.`
      }
    }
    return {
      message: response,
      suggestions: ["How can I reduce PCOS risk?", "What symptoms should I watch for?", "Diet recommendations for PCOS"]
    }
  }
  
  // Iron related
  if (lowerMessage.includes('iron') || lowerMessage.includes('anemia') || lowerMessage.includes('deficiency')) {
    let response = getRandomResponse(ironResponses)
    if (healthData.risks) {
      response += `\n\nYour current iron deficiency risk is ${healthData.risks.ironDeficiencyRisk}%. `
      if (healthData.risks.ironDeficiencyFactors.length > 0) {
        response += `Key factors: ${healthData.risks.ironDeficiencyFactors.slice(0, 2).join(', ')}.`
      }
    }
    return {
      message: response,
      suggestions: ["Iron-rich foods to eat", "Should I take supplements?", "Signs of iron deficiency"]
    }
  }
  
  // Stress related
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
    let response = getRandomResponse(stressResponses)
    if (healthData.risks) {
      response += `\n\nYour current stress impact score is ${healthData.risks.stressImpact}%. `
      if (healthData.risks.stressFactors.length > 0) {
        response += `Key factors: ${healthData.risks.stressFactors.slice(0, 2).join(', ')}.`
      }
    }
    return {
      message: response,
      suggestions: ["Stress relief techniques", "How to improve sleep?", "Impact of stress on cycle"]
    }
  }
  
  // Cycle related
  if (lowerMessage.includes('period') || lowerMessage.includes('cycle') || lowerMessage.includes('menstrual')) {
    let response = getRandomResponse(cycleResponses)
    if (healthData.cycleData) {
      response += `\n\nYour average cycle length is ${healthData.cycleData.cycleLength} days. `
      response += `Flow intensity: ${healthData.cycleData.flowIntensity}. `
      if (healthData.cycleData.irregularity) {
        response += "I've noted some irregularity in your cycles - this is being monitored."
      }
    }
    return {
      message: response,
      suggestions: ["When is my next period?", "Why are my periods irregular?", "Track new symptoms"]
    }
  }
  
  // Nutrition related
  if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('nutrition') || lowerMessage.includes('eat')) {
    let response = getRandomResponse(nutritionResponses)
    if (healthData.nutritionData) {
      response += `\n\nYou're currently following a ${healthData.nutritionData.dietType} diet with ${healthData.nutritionData.mealsPerDay} meals per day. `
      response += `Water intake: ${healthData.nutritionData.waterIntake}L/day.`
    }
    return {
      message: response,
      suggestions: ["Best foods for hormonal balance", "Iron-rich vegetarian foods", "Meal planning tips"]
    }
  }
  
  // Health tips
  if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
    const insights = analyzeHealthData(healthData)
    let response = "Here are some personalized health recommendations based on your profile:\n\n"
    
    if (insights.length > 0) {
      response += insights.map((insight, i) => `${i + 1}. ${insight}`).join('\n')
    } else {
      response += "1. Maintain regular sleep patterns (7-8 hours)\n"
      response += "2. Stay hydrated with 2+ liters of water daily\n"
      response += "3. Include iron-rich foods in your diet\n"
      response += "4. Practice stress-relief activities\n"
      response += "5. Keep tracking your cycle and symptoms"
    }
    
    return {
      message: response,
      suggestions: ["More about PCOS", "Nutrition advice", "Stress management"]
    }
  }
  
  // Overall health
  if (lowerMessage.includes('health') || lowerMessage.includes('wellness') || lowerMessage.includes('score') || lowerMessage.includes('status')) {
    let response = "Let me give you an overview of your health status.\n\n"
    if (healthData.risks) {
      response += `🌟 Overall Wellness Score: ${healthData.risks.overallWellness}%\n`
      response += `🔬 PCOS Risk: ${healthData.risks.pcosRisk}%\n`
      response += `🩸 Iron Deficiency Risk: ${healthData.risks.ironDeficiencyRisk}%\n`
      response += `😰 Stress Impact: ${healthData.risks.stressImpact}%\n\n`
      response += "These scores are calculated based on your profile, cycle data, nutrition, and stress patterns."
    } else {
      response += "Complete your health profile to get personalized risk assessments and recommendations."
    }
    return {
      message: response,
      suggestions: ["How to improve my score?", "Explain PCOS risk", "What affects iron levels?"]
    }
  }
  
  // Environment
  if (lowerMessage.includes('weather') || lowerMessage.includes('pollution') || lowerMessage.includes('air quality') || lowerMessage.includes('environment')) {
    let response = "Environmental factors can impact your health in various ways.\n\n"
    if (healthData.environmentalData) {
      response += `🌡️ Temperature: ${healthData.environmentalData.temperature.toFixed(1)}°C\n`
      response += `💨 Air Quality Index: ${healthData.environmentalData.aqi}\n`
      response += `💧 Humidity: ${healthData.environmentalData.humidity.toFixed(0)}%\n`
      response += `☀️ UV Index: ${healthData.environmentalData.uvIndex}\n\n`
      if (healthData.environmentalData.pollutionLevel === 'high' || healthData.environmentalData.pollutionLevel === 'severe') {
        response += "⚠️ High pollution levels detected. Consider limiting outdoor activities and staying hydrated."
      }
    }
    return {
      message: response,
      suggestions: ["How does pollution affect me?", "Tips for high pollution days", "Seasonal health tips"]
    }
  }
  
  // Default response
  return {
    message: getRandomResponse(generalResponses) + "\n\nI can help you with:\n• PCOS risk assessment\n• Iron deficiency monitoring\n• Stress management\n• Cycle tracking insights\n• Nutrition recommendations\n• Environmental health factors\n\nWhat would you like to know more about?",
    suggestions: ["Check my health status", "PCOS information", "Nutrition tips"]
  }
}
