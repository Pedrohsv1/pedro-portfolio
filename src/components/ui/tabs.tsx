import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
}

/** Flat pill trigger matching the site's design language (no shadows, clean border, flat fills). */
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'relative inline-flex h-8 cursor-pointer items-center justify-center rounded-full border px-3.5 text-[13px] font-medium transition-colors duration-200 outline-none select-none',
        'border-border/80 bg-white/60 text-muted-foreground backdrop-blur-sm hover:bg-white hover:text-foreground dark:bg-secondary/70 dark:hover:bg-secondary',
        'data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary dark:data-[state=active]:text-primary-foreground',
        'focus-visible:ring-2 focus-visible:ring-primary/30',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
