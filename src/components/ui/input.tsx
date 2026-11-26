import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full min-w-0 rounded-xl border border-input bg-card px-3.5 py-2 text-[13.5px] text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-[color,box-shadow,border-color,background] outline-none placeholder:text-muted-foreground/75 disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-foreground/20 focus-visible:border-foreground/35 focus-visible:ring-[3px] focus-visible:ring-foreground/8',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
