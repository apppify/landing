"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import type { ImageProps } from "next/image"
import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const logoVariants = cva(
  "inline-flex",
  {
    variants: {
      size: {
        default: "size-10",
        sm: "size-9",
        lg: "size-11",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type LogoProps = Omit<ImageProps, 'src' | 'alt'> & VariantProps<typeof logoVariants>

const Logo: React.FC<LogoProps> = (props) => {
  const { className, size, ...rest } = props
  const { theme, systemTheme } = useTheme()

  const logoSrc = theme == 'dark' || (theme == 'system' && systemTheme == 'dark') ? '/apppify-dark.svg' : '/apppify.svg'

  return (
    <Image src={logoSrc} alt={'Apppify logo'} width={64} height={64} className={cn(logoVariants({ size, className }))} {...rest} />
  )
}

Logo.displayName = "Logo"

export { Logo, logoVariants }
