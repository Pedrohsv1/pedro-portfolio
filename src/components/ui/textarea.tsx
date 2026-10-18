import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-11 w-full resize-none rounded-lg border border-input bg-white/50 px-3.5 py-[11px] text-sm leading-5 transition-[color,box-shadow,background] outline-none placeholder:text-muted-foreground/80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-secondary/60',
        'hover:bg-white/80 focus-visible:bg-white focus-visible:border-primary/50 focus-visible:ring-[3px] focus-visible:ring-primary/15 dark:hover:bg-secondary/90 dark:focus-visible:bg-secondary',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
