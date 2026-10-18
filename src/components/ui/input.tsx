import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-lg border border-input bg-white/50 px-3.5 py-2 text-sm shadow-none transition-[color,box-shadow,background] outline-none placeholder:text-muted-foreground/80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-secondary/60',
        'hover:bg-white/80 focus-visible:bg-white focus-visible:border-primary/50 focus-visible:ring-[3px] focus-visible:ring-primary/15 dark:hover:bg-secondary/90 dark:focus-visible:bg-secondary',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
