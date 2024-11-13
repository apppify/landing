import Link from 'next/link'
import React from 'react'
import { Logo } from '../ui/logo'

export const Footer = () => {
  return (
    <section className='w-full'>
      <div className="container mx-auto max-w-screen-xl">
        <div className="py-6">

          <span className="inline-flex items-center gap-2">
            <Logo size="sm" />
            <a className='font-bold text-xl'>Apppify</a>
          </span>

        </div>

        <div className="flex justify-between items-center text-muted-foreground py-4">
          <a>Ⓒ 2024 Apppify.com, all rights reserved</a>

          <div className="inline-flex gap-6">
            <Link href="#" className='hover:text-white'>Terms</Link>
            <Link href="#" className='hover:text-white'>Privacy</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
