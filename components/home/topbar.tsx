import React from 'react'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'

export const TopBar = () => {
  return (
    <div className='absolute top-0 left-0 right-0 h-min w-screen bottom-0 z-10 bg-gradient-to-b from-background to-transparent'>
      <div className="container mx-auto flex justify-between items-center py-2">
        <span className="inline-flex items-center gap-2">
          <Logo />
          <a className='font-bold text-xl'>Apppify</a>
        </span>

        <Button size="sm" className='rounded-full'>
          Join waitlist
        </Button>
      </div>
    </div>
  )
}
