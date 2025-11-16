'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, Terminal, AlertTriangle, Download } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image'

export default function DashboardPage() {
  const router = useRouter()
  const [hackerMode, setHackerMode] = useState(false)
  const [showReminder, setShowReminder] = useState(false)
  const [showDataPanel, setShowDataPanel] = useState(true)
  const [encryptedText, setEncryptedText] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Get password from session storage
    const storedPassword = sessionStorage.getItem('userPassword')
    if (storedPassword) {
      setPassword(storedPassword)
    } else {
      // If no password, redirect to login
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    // Password reminder every 10 seconds
    const interval = setInterval(() => {
      setShowReminder(true)
      setTimeout(() => setShowReminder(false), 3000)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

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

  const handleEncrypt = () => {
    const encrypted = encryptedText.toUpperCase()
    const blob = new Blob([encrypted], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'encrypted-password.txt'
    a.click()
    URL.revokeObjectURL(url)
    setEncryptedText('')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('userPassword')
    router.push('/login')
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-all duration-500 ${hackerMode ? 'hacker-mode' : ''}`}>
      {hackerMode && <div className="matrix-rain" />}
      
      {/* Welcome Modal */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Welcome!</DialogTitle>
            <DialogDescription className="text-center text-lg pt-4">
              Welcome to the most trusted website in the world
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowWelcome(false)} className="w-32">
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Welcome Back! 🎉
            </h1>
            <p className="text-muted-foreground">You are now 2X more aesthetic</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
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
                <AlertDescription>Fridge · IP: 192.168.0.69 (Suspicious activity detected)</AlertDescription>
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
              <Button onClick={handleEncrypt} variant="secondary" className="w-full" disabled={!encryptedText}>
                <Download className="w-4 h-4 mr-2" />
                Encrypt
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
              <div className="w-64 h-64 mx-auto bg-white rounded-lg p-4 flex items-center justify-center">
                <Image
                  src="https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=https://insecure-by-design.vercel.app/compromised"
                  alt="Ultimate Access QR Code"
                  width={256}
                  height={256}
                  className="w-full h-full"
                />
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
