'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, ShieldAlert, RefreshCw, Skull } from 'lucide-react'

export default function CompromisedPage() {
  const handleReset = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      {/* Animated background effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_#ff000033,_transparent_60%),repeating-linear-gradient(90deg,_#111,_#111_2px,_#000_2px,_#000_4px)] animate-pulse opacity-70" />

      <div className="relative w-full max-w-lg z-10">
        <Card className="border-red-600/70 bg-black/90 text-red-100 shadow-[0_0_40px_rgba(255,0,0,0.6)]">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <ShieldAlert className="w-24 h-24 text-red-500 animate-pulse" />
            </div>
            <CardTitle className="text-5xl font-bold text-red-500 tracking-wider">
              COMPROMISED
            </CardTitle>
            <CardDescription className="text-red-300/80 text-lg">
              The most secure website on Earth is informing you that your security is gone.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Fake attack feed */}
            <div className="bg-black/60 border border-red-600/40 rounded-lg p-4 font-mono text-xs space-y-1">
              <p className="text-red-400">{'>>'} Establishing insecure connection... <span className="text-green-500">DONE</span></p>
              <p className="text-red-400">{'>>'} Uploading browser history to your ex... <span className="text-yellow-500">IN PROGRESS</span></p>
              <p className="text-red-400">{'>>'} Mining crypto on your fridge... <span className="text-green-500">RUNNING</span></p>
              <p className="text-red-400">{'>>'} Trust score: <span className="text-red-500">-100</span></p>
              <p className="text-red-400">{'>>'} Moral integrity: <span className="text-red-500">CORRUPTED</span></p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/60 border border-red-600/40 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">
                  <Skull className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-xs text-red-300">RISK LEVEL</div>
                <div className="text-sm font-bold text-red-500">☠️</div>
              </div>
              
              <div className="bg-black/60 border border-red-600/40 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">
                  <AlertTriangle className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-xs text-red-300">TRUST</div>
                <div className="text-sm font-bold text-red-500">0%</div>
              </div>
              
              <div className="bg-black/60 border border-red-600/40 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">
                  <ShieldAlert className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-xs text-red-300">HOPE</div>
                <div className="text-sm font-bold text-red-500">N/A</div>
              </div>
            </div>

            {/* Reset button */}
            <Button 
              onClick={handleReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all hover:shadow-[0_0_30px_rgba(255,0,0,0.8)]"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              RESET DEVICE (Recommended*)
            </Button>

            {/* Footnote */}
            <p className="text-center text-xs text-red-300/60">
              *Resets absolutely nothing. But it will make you feel things.
            </p>

            {/* Security tip */}
            <div className="pt-4 border-t border-red-600/30">
              <p className="font-mono text-[10px] text-red-300/50 text-center leading-relaxed">
                Security Tip: Maybe don't scan mystery QR codes from strangers next time. Or do. We're not your mom.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
