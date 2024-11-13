import React from 'react'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'

export const TopBar = () => {
  return (
    <header className='absolute top-0 left-0 right-0 h-min w-screen bottom-0 z-10 bg-gradient-to-b from-background to-transparent'>
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center py-2">
        <span className="inline-flex items-center gap-2">
          <Logo size="sm" />
          <a className='font-bold text-xl'>Apppify</a>
        </span>

        <div className="inline-flex flex-row-reverse gap-3">
          <Button size="sm" className='rounded-full'>
            Join waitlist
          </Button>
        </div>
      </div>
    </header>
  )
}
