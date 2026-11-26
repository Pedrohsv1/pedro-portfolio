import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />
}

/** Shopify floating segmented pill bar */
function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'polaris-floating-bar inline-flex items-center gap-1 rounded-full p-1',
        className,
      )}
      {...props}
    />
  )
}

/** Crisp pill trigger with monochrome soft-black active state */
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'relative inline-flex h-8 cursor-pointer items-center justify-center rounded-full px-3.5 text-[13px] font-medium tracking-[-0.01em] transition-all duration-200 outline-none select-none',
        'text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
        'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_1px_2px_rgba(0,0,0,0.12)]',
        'dark:data-[state=active]:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.4)]',
        'focus-visible:ring-2 focus-visible:ring-ring/25',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
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
