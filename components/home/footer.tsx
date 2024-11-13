import Link from 'next/link'
import React from 'react'
import { Logo } from '../ui/logo'
import { SvgGithub, SvgInstagram, SvgProductHunt, SvgX } from '@/lib/icons'

export const Footer = () => {
  return (
    <section className='w-full'>
      <div className="container mx-auto max-w-screen-xl">
        <div className="py-6 flex justify-between">
          <span className="inline-flex items-center gap-2">
            <Logo size="sm" />
            <a className='font-bold text-xl'>Apppify</a>
          </span>
          <div className="inline-flex gap-8">
            <Link href="#" className='hover:font-bold transition-all'>
              Dashboard
            </Link>
            <Link href="#" className='hover:font-bold transition-all'>
              API
            </Link>
            <Link href="#" className='hover:font-bold transition-all'>
              Docs
            </Link>
            <Link href="#" className='hover:font-bold transition-all'>
              Pricing
            </Link>
          </div>
          <div className='text-foreground inline-flex gap-4'>
            <Link href="#" className='hover:text-white'>
              <SvgX className="w-5 h-5" />
            </Link>
            <Link href="#" className='hover:text-white'>
              <SvgInstagram className="w-5 h-5" />
            </Link>
            <Link href="#" className='hover:text-white'>
              <SvgGithub className="w-5 h-5" />
            </Link>
            <Link href="#" className='hover:text-white'>
              <SvgProductHunt className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center text-muted-foreground py-4 text-sm">
          <a>Ⓒ 2024 Apppify.com, all rights reserved</a>

          <div className="inline-flex gap-6">
            <Link href="#" className='hover:text-white'>Terms</Link>
            <Link href="#" className='hover:text-white'>Privacy</Link>
            <Link href="#" className='hover:text-white'>Cookies</Link>
          </div>
        </div>
      </div>
    </section>
  )
}