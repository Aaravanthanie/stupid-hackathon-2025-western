'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EyeIcon, ShieldAlert, Unlock, Sparkles, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from '@/components/ui/checkbox'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false)
  const [securityQuestion, setSecurityQuestion] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [showTrustDialog, setShowTrustDialog] = useState(false)
  const [isTrustedUser, setIsTrustedUser] = useState(false)

  const handleCaptcha = () => {
    if (captchaInput.toLowerCase() === 'robot') {
      setCaptchaError(true)
      setCaptchaInput('')
      setTimeout(() => setCaptchaError(false), 2000)
    } else {
      // Store password in session storage for the reminder
      sessionStorage.setItem('userPassword', password)
      router.push('/dashboard')
    }
  }

  const handleTogglePassword = () => {
    if (showPassword) {
      // They're trying to hide it
      setShowTrustDialog(true)
    } else {
      setShowPassword(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <Dialog open={showTrustDialog} onOpenChange={setShowTrustDialog}>
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
            }} variant="outline">
              Sorry, I trust you
            </Button>
            <Button onClick={() => {
              setShowTrustDialog(false)
              setShowPassword(false)
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
          <p className="text-muted-foreground">Because security is overrated</p>
        </div>

        {/* Main Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials (we already know them)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.ex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 text-xs"
                  onClick={() => setForgotPasswordClicked(true)}
                >
                  Forgot Password?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {/* Forgot Password Message */}
            {forgotPasswordClicked && (
              <Alert>
                <AlertDescription className="text-center">
                  Here's your password: <span className="font-mono font-bold">{"supersecret123"}</span> 💅
                </AlertDescription>
              </Alert>
            )}

            {/* Pathetic Security Questions */}
            <div className="space-y-2">
              <Label>Security Question</Label>
              <select 
                className="w-full p-2 rounded-md border border-input bg-background"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
              >
                <option value="">Select a question...</option>
                <option value="password">What is your password?</option>
                <option value="hacker">Are you a hacker?</option>
                <option value="credit">What is your credit card number? (Optional 😉)</option>
              </select>
              {securityQuestion && (
                <Input placeholder="Your totally secure answer" />
              )}
            </div>

            <Button 
              className="w-full" 
              onClick={() => setShowVerify(true)}
              disabled={!email || !password}
            >
              <Unlock className="w-4 h-4 mr-2" />
              Login
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {showVerify && (
          <>
            {/* Two Factor "Aesthetic" */}
            <Card className="border-green-500 animate-in slide-in-from-bottom">
              <CardContent className="pt-6 space-y-4">
                <div className="text-center space-y-2">
                  <p className="font-semibold">Two-Factor Aesthetic™</p>
                  <p className="text-sm text-muted-foreground">Step 2 of 2</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="trust" 
                    checked={isTrustedUser}
                    onCheckedChange={(checked) => setIsTrustedUser(checked as boolean)}
                  />
                  <label
                    htmlFor="trust"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Trust me bro it's me
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Bullying Captcha */}
            <Card className="animate-in slide-in-from-bottom delay-150">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Captcha: Type "robot"</Label>
                  <Input
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Type here..."
                  />
                </div>
                {captchaError && (
                  <Alert variant="destructive">
                    <AlertDescription>You ARE a robot... try again.</AlertDescription>
                  </Alert>
                )}
                <Button 
                  className="w-full" 
                  onClick={handleCaptcha}
                  disabled={!isTrustedUser}
                >
                  Verify
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Auto-login for exes */}
        <Alert>
          <AlertDescription className="text-center text-xs">
            💔 Auto-Login for Exes™ Enabled
          </AlertDescription>
        </Alert>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          By logging in, you agree to share everything with everyone
        </p>
      </div>
    </div>
  )
}
