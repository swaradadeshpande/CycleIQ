'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { 
  HealthData, 
  UserProfile, 
  CycleData, 
  NutritionData, 
  StressData, 
  EnvironmentalData,
  HealthRisks,
  DailyLog 
} from './types'
import { calculateHealthRisks, generateDummyEnvironmentalData } from './prediction-engine'

interface HealthContextType {
  healthData: HealthData
  updateProfile: (profile: UserProfile) => void
  updateCycleData: (data: CycleData) => void
  updateNutritionData: (data: NutritionData) => void
  updateStressData: (data: StressData) => void
  updateEnvironmentalData: (data: EnvironmentalData) => void
  addDailyLog: (log: DailyLog) => void
  calculateRisks: () => void
  isOnline: boolean
  currentStep: number
  setCurrentStep: (step: number) => void
  isDataComplete: boolean
}

const initialHealthData: HealthData = {
  profile: null,
  cycleData: null,
  nutritionData: null,
  stressData: null,
  environmentalData: null,
  risks: null,
  dailyLogs: []
}

const HealthContext = createContext<HealthContextType | undefined>(undefined)

export function HealthProvider({ children }: { children: React.ReactNode }) {
  const [healthData, setHealthData] = useState<HealthData>(initialHealthData)
  const [isOnline, setIsOnline] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  // Simulate offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Generate environmental data on mount
    const envData = generateDummyEnvironmentalData()
    setHealthData(prev => ({ ...prev, environmentalData: envData }))
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const updateProfile = useCallback((profile: UserProfile) => {
    setHealthData(prev => ({ ...prev, profile }))
  }, [])

  const updateCycleData = useCallback((cycleData: CycleData) => {
    setHealthData(prev => ({ ...prev, cycleData }))
  }, [])

  const updateNutritionData = useCallback((nutritionData: NutritionData) => {
    setHealthData(prev => ({ ...prev, nutritionData }))
  }, [])

  const updateStressData = useCallback((stressData: StressData) => {
    setHealthData(prev => {
      const newData = { ...prev, stressData }
      // Auto-calculate risks when all data is complete
      if (newData.profile && newData.cycleData && newData.nutritionData && newData.stressData) {
        const risks = calculateHealthRisks(
          newData.profile,
          newData.cycleData,
          newData.nutritionData,
          newData.stressData,
          newData.environmentalData
        )
        return { ...newData, risks }
      }
      return newData
    })
  }, [])

  const updateEnvironmentalData = useCallback((environmentalData: EnvironmentalData) => {
    setHealthData(prev => ({ ...prev, environmentalData }))
  }, [])

  const addDailyLog = useCallback((log: DailyLog) => {
    setHealthData(prev => ({
      ...prev,
      dailyLogs: [...prev.dailyLogs, log]
    }))
  }, [])

  const calculateRisks = useCallback(() => {
    if (healthData.profile && healthData.cycleData && healthData.nutritionData && healthData.stressData) {
      const risks = calculateHealthRisks(
        healthData.profile,
        healthData.cycleData,
        healthData.nutritionData,
        healthData.stressData,
        healthData.environmentalData
      )
      setHealthData(prev => ({ ...prev, risks }))
    }
  }, [healthData.profile, healthData.cycleData, healthData.nutritionData, healthData.stressData, healthData.environmentalData])

  const isDataComplete = !!(
    healthData.profile && 
    healthData.cycleData && 
    healthData.nutritionData && 
    healthData.stressData
  )

  return (
    <HealthContext.Provider value={{
      healthData,
      updateProfile,
      updateCycleData,
      updateNutritionData,
      updateStressData,
      updateEnvironmentalData,
      addDailyLog,
      calculateRisks,
      isOnline,
      currentStep,
      setCurrentStep,
      isDataComplete
    }}>
      {children}
    </HealthContext.Provider>
  )
}

export function useHealth() {
  const context = useContext(HealthContext)
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider')
  }
  return context
}
