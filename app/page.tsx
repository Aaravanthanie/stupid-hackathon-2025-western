'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EyeIcon, ShieldAlert, Lock, Unlock, Sparkles, Terminal, AlertTriangle } from 'lucide-react'

export default function InsecureAuth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('supersecret123')
  const [showPassword, setShowPassword] = useState(true) // Always on!
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hackerMode, setHackerMode] = useState(false)
  const [showReminder, setShowReminder] = useState(false)
  const [securityQuestion, setSecurityQuestion] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState(false)
  const [showDataPanel, setShowDataPanel] = useState(false)
  const [showVerify, setShowVerify] = useState(false) // Added state to control when to show verify section
  const [encryptedText, setEncryptedText] = useState('')
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn) {
        setShowReminder(true)
        setTimeout(() => setShowReminder(false), 3000)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [isLoggedIn])

  // Terrible password strength meter
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

  // Mock user data
  const getUserData = () => {
    const now = new Date()
    return {
      ip: '192.168.0.69',
      location: "Your Ex's House 👀",
      browser: 'Chrome (Incognito Mode - We Still Know)',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      lastLogin: now.toLocaleString(),
      deviceType: 'Fridge',
      secret_hobby: 'crying_at_3am',
      favorite_color: 'transparent',
      embarrassing_search: 'how to reset password 50 times'
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowDataPanel(true)
  }

  const handleCaptcha = () => {
    if (captchaInput.toLowerCase() === 'robot') {
      setCaptchaError(true)
      setCaptchaInput('')
      setTimeout(() => setCaptchaError(false), 2000)
    } else {
      handleLogin()
    }
  }

  const handleEncrypt = () => {
    setEncryptedText(encryptedText.toUpperCase())
  }

  if (isLoggedIn) {
    return (
      <div className={`min-h-screen p-4 md:p-8 transition-all duration-500 ${hackerMode ? 'hacker-mode' : ''}`}>
        {hackerMode && <div className="matrix-rain" />}
        
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Welcome Back! 🎉
            </h1>
            <p className="text-muted-foreground">You are now 2X more aesthetic</p>
          </div>

          {showReminder && (
            <Alert className="border-yellow-500 animate-in slide-in-from-top">
              <AlertDescription className="text-center font-mono">
                Hey, don't forget your password: {password}
              </AlertDescription>
            </Alert>
          )}

          {/* Creepy Data Panel */}
          {showDataPanel && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Creepily Honest Data Panel
                </CardTitle>
                <CardDescription>We track everything. You're welcome.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(getUserData()).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-mono text-sm">{key}:</span>
                      <span className="font-mono text-sm text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Live Login Wall */}
          <Card>
            <CardHeader>
              <CardTitle>Live Login Wall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Alert>
                  <AlertDescription>Logged in from: Your Ex's House 👀</AlertDescription>
                </Alert>
                <Alert>
                  <AlertDescription>Fridge · IP: 192.168.0.69</AlertDescription>
                </Alert>
                <Alert>
                  <AlertDescription>Microwave · IP: 192.168.0.42 (Suspicious activity detected)</AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Security Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-mono">
                  <p>12:05 AM – Sneezed. Might be compromised.</p>
                  <p>4:21 PM – Someone looked at you suspiciously.</p>
                  <p>9:15 AM – Coffee spilled. Data may be wet.</p>
                  <p>2:33 PM – Existential crisis detected.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Encryption Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Text to "Encrypt"</Label>
                  <Input
                    value={encryptedText}
                    onChange={(e) => setEncryptedText(e.target.value)}
                    placeholder="Enter secret message"
                  />
                </div>
                <Button onClick={handleEncrypt} variant="secondary" className="w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypt (Make UPPERCASE)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => alert('Data stolen. Thanks for your honesty.')}
            >
              Steal My Data
            </Button>
            
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => {
                const data = JSON.stringify(getUserData(), null, 2)
                const blob = new Blob([data], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'my-embarrassing-data.json'
                a.click()
              }}
            >
              Export My Data (JSON Dump)
            </Button>

            <Button 
              variant="secondary"
              className="w-full"
              onClick={() => setHackerMode(!hackerMode)}
            >
              <Terminal className="w-4 h-4 mr-2" />
              {hackerMode ? 'Exit' : 'Enter'} Hacker Mode
            </Button>
          </div>

          {/* QR Code */}
          {!showQR && (
            <Button variant="outline" className="w-full" onClick={() => setShowQR(true)}>
              Show Ultimate Access™ QR Code
            </Button>
          )}
          {showQR && (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                  <a 
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-6xl hover:scale-110 transition-transform"
                  >
                    🎵
                  </a>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Scan for Ultimate Access™</p>
              </CardContent>
            </Card>
          )}
        </div>

        <style jsx>{`
          .hacker-mode {
            background: #0d0d0d;
            color: #00ff00;
          }
          .matrix-rain {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 50;
            background: linear-gradient(180deg, 
              transparent 0%, 
              rgba(0, 255, 0, 0.03) 50%, 
              transparent 100%);
            animation: rain 20s linear infinite;
          }
          @keyframes rain {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
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
              The door that's always open
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
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeIcon className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Password Strength */}
              <div className="space-y-1">
                <div className={`h-2 rounded-full ${strength.color} transition-all`} />
                <p className="text-xs text-muted-foreground">{strength.text}</p>
              </div>
            </div>

            {/* Forgot Password Message */}
            {forgotPasswordClicked && (
              <Alert>
                <AlertDescription className="text-center">
                  Here's your password: <span className="font-mono font-bold">{password}</span> 💅
                </AlertDescription>
              </Alert>
            )}

            {/* Pathetic Security Questions */}
            {!forgotPasswordClicked && (
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
            )}

            <Button 
              className="w-full" 
              onClick={() => setShowVerify(true)}
              disabled={!email || !password}
            >
              <Unlock className="w-4 h-4 mr-2" />
              Login
            </Button>
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
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    // Proceed to captcha
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  I'm totally me
                </Button>
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
