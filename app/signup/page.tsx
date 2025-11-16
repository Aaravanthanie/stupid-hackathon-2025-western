'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EyeIcon, EyeOffIcon, ShieldAlert, UserPlus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [ssn, setSsn] = useState('')
  const [showTrustDialog, setShowTrustDialog] = useState(false)
  const [ssnFieldRequired, setSsnFieldRequired] = useState(false)

  const getPasswordStrength = (pwd: string) => {
    if (pwd === 'password' || pwd === '123456' || pwd === 'admin') {
      return { text: '🔥 Insanely Strong', color: 'bg-green-500' }
    }
    if (pwd.length > 12 || /[!@#$%^&*]/.test(pwd)) {
      return { text: '🥱 Too complicated!', color: 'bg-yellow-500' }
    }
    return { text: '⚠️ Adequate', color: 'bg-orange-500' }
  }

  const strength = getPasswordStrength(password)

  const handleSignup = () => {
    if (!ssn) {
      setSsnFieldRequired(true)
      alert('Social Security Number is required!')
      return
    }
    sessionStorage.setItem('userPassword', password)
    router.push('/dashboard')
  }

  const handleTogglePassword = () => {
    if (showPassword) {
      setShowTrustDialog(true)
    } else {
      setShowPassword(true)
    }
  }

  const handleToggleConfirmPassword = () => {
    if (showConfirmPassword) {
      setShowTrustDialog(true)
    } else {
      setShowConfirmPassword(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <Dialog open={showTrustDialog} onOpenChange={(open) => {
        setShowTrustDialog(open)
        if (!open) {
          setSsnFieldRequired(false)
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Wait a minute...</DialogTitle>
            <DialogDescription className="text-center text-lg pt-4">
              Why are you trying to hide your password? You don't trust us?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={() => {
              setShowTrustDialog(false)
              setShowPassword(true)
              setShowConfirmPassword(true)
            }} variant="outline">
              Sorry, I trust you
            </Button>
            <Button onClick={() => {
              setShowTrustDialog(false)
            }} variant="destructive">
              I still want to hide it
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <ShieldAlert className="w-12 h-12 text-destructive" />
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Insecure by Design™
          </h1>
          <p className="text-muted-foreground">Join the least secure platform</p>
        </div>

        {/* Signup Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Your data is our data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="totally-real@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We'll sell this to the highest bidder
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
                </Button>
              </div>
              
              {/* Password Strength */}
              {password && (
                <div className="space-y-1">
                  <div className={`h-2 rounded-full ${strength.color} transition-all`} />
                  <p className="text-xs text-muted-foreground">{strength.text}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="password123"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={handleToggleConfirmPassword}
                >
                  {showConfirmPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
                </Button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">Passwords don't match (we don't care though)</p>
              )}
            </div>

            {/* Social Security Number */}
            <div className="space-y-2">
              <Label htmlFor="ssn">
                Social Security Number {ssnFieldRequired ? (
                  <span className="text-destructive">*Required</span>
                ) : (
                  <span className="text-muted-foreground">(Optional)</span>
                )}
              </Label>
              <Input
                id="ssn"
                type="text"
                placeholder="XXX-XX-XXXX"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Just in case we need it later
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                I agree to let you do whatever you want with my data, including selling it to random strangers on the internet
              </Label>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSignup}
              disabled={!email || !password || !agreedToTerms}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Alert variant="destructive">
          <AlertDescription className="text-center text-xs">
            ⚠️ Warning: This is the least secure signup form ever created
          </AlertDescription>
        </Alert>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          By signing up, you forfeit all rights to privacy
        </p>
      </div>
    </div>
  )
}
