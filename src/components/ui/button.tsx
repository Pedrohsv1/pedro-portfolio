import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[13px] font-medium tracking-[-0.01em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'polaris-pill-primary hover:bg-[#2a2a2e] dark:hover:bg-[#e4e4e8] active:scale-[0.99]',
        outline:
          'border border-border bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:bg-secondary/80 hover:border-foreground/15',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-accent',
        ghost:
          'text-muted-foreground hover:bg-secondary hover:text-foreground',
        link: 'text-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 rounded-full',
        sm: 'h-8 px-3.5 rounded-full gap-1.5 text-[12.5px]',
        lg: 'h-10 px-5 rounded-full text-[13.5px]',
        icon: 'size-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
