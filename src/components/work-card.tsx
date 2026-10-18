import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Pin } from 'lucide-react'

import { CoverMockup } from '@/components/cover-mockup'
import { snippets } from '@/components/snippets'
import { cn } from '@/lib/utils'
import type { WorkItem } from '@/data/work'

/**
 * Concentric radii: outer 18px − 6px padding = inner 12px;
 * inner 12px − 4px caption inset = caption 8px.
 */
export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const Snippet = item.snippet ? snippets[item.snippet] : null
  const Wrapper = item.href ? 'a' : 'div'
  const isDirectional = index >= 2
  const isRightColumn = index % 2 === 1
  const cardRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(!isDirectional)

  useEffect(() => {
    if (!isDirectional) return
    const el = cardRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else if (entry.boundingClientRect.top > 0) {
          // Reset only when the card goes back below the viewport (scrolling up)
          setIsVisible(false)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [isDirectional])

  return (
    <Wrapper
      ref={(node: HTMLAnchorElement | HTMLDivElement | null) => {
        cardRef.current = node
      }}
      {...(item.href ? { href: item.href } : {})}
      style={
        !isDirectional
          ? { animationDelay: `${index * 60}ms` }
          : {
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
                : isRightColumn
                  ? 'translate3d(28px, 44px, 0) rotate(2.2deg) scale(0.985)'
                  : 'translate3d(-28px, 44px, 0) rotate(-2.2deg) scale(0.985)',
              transitionProperty: 'opacity, transform',
              transitionDuration: isVisible ? '750ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: isVisible && isRightColumn ? '90ms' : '0ms',
            }
      }
      className={cn(
        'group relative block rounded-[18px] bg-card p-1.5 outline-none will-change-[transform,opacity]',
        !isDirectional && 'animate-fade-up',
      )}
    >
      {/* Inner media — uniform aspect-[16/10] side-by-side cards, clips the image zoom so corners stay perfect */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#dce1ec] dark:bg-[#111622] [&>*:first-child]:rounded-none">
        {item.mockup ? (
          <CoverMockup config={item.mockup} title={item.title} />
        ) : item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="block size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : Snippet ? (
          <Snippet />
        ) : null}

        {item.pinned && (
          <span className="absolute top-2.5 right-2.5 z-30 grid size-6 place-items-center rounded-full bg-primary text-white shadow-md">
            <Pin className="size-3 fill-current" />
          </span>
        )}

        {/* Caption: 4px from bottom and sides */}
        <div
          className={cn(
            'absolute inset-x-1 bottom-1 z-30 flex items-center justify-between rounded-[8px] bg-primary px-3.5 py-2.5 text-[13px] text-white',
            'pointer-events-none translate-y-1.5 opacity-0 transition-[opacity,translate,background-color,color] duration-300 ease-out',
            'group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100',
            'hover:bg-white hover:text-primary',
          )}
        >
          <span>{item.title}</span>
          {item.href ? (
            <ArrowUpRight className="size-4" />
          ) : (
            <span className="font-mono text-[10px] tracking-wider uppercase opacity-70">snippet</span>
          )}
        </div>
      </div>

      {/* Ring as an inset overlay with the exact outer radius */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] ring-2 ring-primary ring-inset opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </Wrapper>
  )
}
