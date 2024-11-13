'use client'

import { usePixelAnimation } from '@/hooks/use-pixel-animation'
import { useRef } from 'react'

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  usePixelAnimation(canvasRef)

  return (
    <canvas ref={canvasRef} />
  )
}
