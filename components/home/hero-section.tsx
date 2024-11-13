'use client'

import { usePixelAnimation } from '@/hooks/use-pixel-animation'
import { useRef } from 'react'

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  usePixelAnimation(canvasRef)

  return (
    <section className="relative select-none pointer-events-none -mt-16">
      <canvas ref={canvasRef} />
      <div className="absolute w-screen h-[30vh] bottom-0 left-0 z-10 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}
