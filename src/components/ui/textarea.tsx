import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-10 w-full resize-none rounded-xl border border-input bg-card px-3.5 py-2.5 text-[13.5px] leading-5 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-[color,box-shadow,border-color,background] outline-none placeholder:text-muted-foreground/75 disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-foreground/20 focus-visible:border-foreground/35 focus-visible:ring-[3px] focus-visible:ring-foreground/8',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
