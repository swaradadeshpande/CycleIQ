'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { BsBoxArrowInRight, BsPersonPlus, BsEye, BsEyeSlash, BsEnvelope, BsLock, BsPerson } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Activity } from 'lucide-react'

export function LoginModal() {
  const { showLoginModal, setShowLoginModal, setShowSignupModal, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    
    setIsLoading(true)
    const result = await login(email, password)
    setIsLoading(false)
    
    if (!result.success) {
      setError(result.error || 'Login failed')
    } else {
      setEmail('')
      setPassword('')
    }
  }

  const switchToSignup = () => {
    setShowLoginModal(false)
    setShowSignupModal(true)
    setEmail('')
    setPassword('')
    setError('')
  }

  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--mint-dark)] to-[var(--lavender-dark)] flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">Welcome Back</DialogTitle>
          <DialogDescription>
            Login to access your health dashboard and continue your assessment
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <BsEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <BsLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <BsEyeSlash className="w-4 h-4" /> : <BsEye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full gap-2 bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="w-4 h-4" />
                Logging in...
              </>
            ) : (
              <>
                <BsBoxArrowInRight className="w-4 h-4" />
                Login
              </>
            )}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={switchToSignup}
              className="text-[var(--mint-dark)] hover:underline font-medium"
            >
              Create Account
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function SignupModal() {
  const { showSignupModal, setShowSignupModal, setShowLoginModal, signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    const result = await signup(name, email, password)
    setIsLoading(false)
    
    if (!result.success) {
      setError(result.error || 'Signup failed')
    } else {
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  }

  const switchToLogin = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError('')
  }

  return (
    <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--mint-dark)] to-[var(--lavender-dark)] flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">Create Account</DialogTitle>
          <DialogDescription>
            Join CycleIQ to start your personalized health journey
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative">
              <BsPerson className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <BsEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <BsLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <BsEyeSlash className="w-4 h-4" /> : <BsEye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <BsLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full gap-2 bg-gradient-to-r from-[var(--mint-dark)] to-[var(--lavender-dark)] hover:opacity-90 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="w-4 h-4" />
                Creating Account...
              </>
            ) : (
              <>
                <BsPersonPlus className="w-4 h-4" />
                Create Account
              </>
            )}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-[var(--mint-dark)] hover:underline font-medium"
            >
              Login
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
