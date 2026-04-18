'use client'

import { useState } from 'react'
import { Activity, Menu, X, Wifi, WifiOff, Database } from 'lucide-react'
import { BsHouse, BsPerson, BsSpeedometer2, BsChatDots, BsBoxArrowInRight, BsPersonPlus, BsBoxArrowRight } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import { useHealth } from '@/lib/health-context'
import { useAuth } from '@/lib/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isOnline, currentStep, setCurrentStep, isDataComplete } = useHealth()
  const { user, isAuthenticated, logout, setShowLoginModal, setShowSignupModal } = useAuth()

  const navItems = [
    { label: 'Home', step: 0, icon: BsHouse },
    { label: 'Profile', step: 1, icon: BsPerson },
    { label: 'Dashboard', step: 5, requiresData: true, icon: BsSpeedometer2 },
    { label: 'Chat', step: 6, requiresData: true, icon: BsChatDots },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--mint-dark)] to-[var(--lavender-dark)] flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] bg-clip-text text-transparent">
              CycleIQ
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  onClick={() => setCurrentStep(item.step)}
                  disabled={item.requiresData && !isDataComplete}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    currentStep === item.step
                      ? 'text-[var(--mint-dark)]'
                      : item.requiresData && !isDataComplete
                      ? 'text-muted-foreground/50 cursor-not-allowed'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Status Indicators & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Offline Mode Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              isOnline 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Offline Mode</span>
                  <Database className="w-3.5 h-3.5" />
                </>
              )}
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <BsPerson className="w-4 h-4" />
                    {user?.name || 'My Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    Signed in as {user?.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCurrentStep(1)} className="gap-2 cursor-pointer">
                    <BsPerson className="w-4 h-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setCurrentStep(5)} 
                    disabled={!isDataComplete}
                    className="gap-2 cursor-pointer"
                  >
                    <BsSpeedometer2 className="w-4 h-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      logout()
                      setCurrentStep(0)
                    }} 
                    className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <BsBoxArrowRight className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost"
                  onClick={() => setShowLoginModal(true)}
                  className="gap-2"
                >
                  <BsBoxArrowInRight className="w-4 h-4" />
                  Login
                </Button>
                <Button 
                  onClick={() => setShowSignupModal(true)}
                  className="gap-2 bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90 text-white"
                >
                  <BsPersonPlus className="w-4 h-4" />
                  Create Account
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setCurrentStep(item.step)
                      setMobileMenuOpen(false)
                    }}
                    disabled={item.requiresData && !isDataComplete}
                    className={`flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                      currentStep === item.step
                        ? 'bg-[var(--mint)]/50 text-[var(--mint-dark)]'
                        : item.requiresData && !isDataComplete
                        ? 'text-muted-foreground/50'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )
              })}
              
              {/* Mobile Auth Options */}
              <div className="border-t border-border mt-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-xs text-muted-foreground">
                      Signed in as {user?.email}
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setCurrentStep(0)
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <BsBoxArrowRight className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowLoginModal(true)
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg hover:bg-muted transition-colors"
                    >
                      <BsBoxArrowInRight className="w-5 h-5" />
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowSignupModal(true)
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg hover:bg-muted transition-colors"
                    >
                      <BsPersonPlus className="w-5 h-5" />
                      Create Account
                    </button>
                  </>
                )}
              </div>

              <div className="px-4 pt-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium w-fit ${
                  isOnline 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {isOnline ? (
                    <>
                      <Wifi className="w-3.5 h-3.5" />
                      <span>Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3.5 h-3.5" />
                      <span>Offline Mode</span>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
