'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void
  showSignupModal: boolean
  setShowSignupModal: (show: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simulated user database (stored in localStorage for demo)
const USERS_STORAGE_KEY = 'cycleiq_users'
const CURRENT_USER_KEY = 'cycleiq_current_user'

function getStoredUsers(): { [email: string]: { name: string; password: string; id: string; createdAt: string } } {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  return stored ? JSON.parse(stored) : {}
}

function saveUsers(users: { [email: string]: { name: string; password: string; id: string; createdAt: string } }) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY)
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser({
        ...userData,
        createdAt: new Date(userData.createdAt)
      })
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const users = getStoredUsers()
    const userRecord = users[email.toLowerCase()]
    
    if (!userRecord) {
      return { success: false, error: 'No account found with this email. Please create an account first.' }
    }
    
    if (userRecord.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' }
    }
    
    const loggedInUser: User = {
      id: userRecord.id,
      name: userRecord.name,
      email: email.toLowerCase(),
      createdAt: new Date(userRecord.createdAt)
    }
    
    setUser(loggedInUser)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser))
    setShowLoginModal(false)
    
    return { success: true }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const users = getStoredUsers()
    
    if (users[email.toLowerCase()]) {
      return { success: false, error: 'An account with this email already exists. Please login instead.' }
    }
    
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      password,
      createdAt: new Date().toISOString()
    }
    
    users[email.toLowerCase()] = newUser
    saveUsers(users)
    
    const loggedInUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: email.toLowerCase(),
      createdAt: new Date(newUser.createdAt)
    }
    
    setUser(loggedInUser)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser))
    setShowSignupModal(false)
    
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      showLoginModal,
      setShowLoginModal,
      showSignupModal,
      setShowSignupModal
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
