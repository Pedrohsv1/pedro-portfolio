import { useEffect, useRef, type MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { CoverMockup } from '@/components/cover-mockup'
import { ExpandCornersIcon } from '@/components/media-lightbox'
import { snippets } from '@/components/snippets'
import { buildProjectPath, isModifiedClick, navigateTo } from '@/lib/router'
import { cn } from '@/lib/utils'
import type { GalleryTile, TileSize } from '@/types/portfolio'

const aspectByTileSize: Record<TileSize, string> = {
  square: 'aspect-[1/1.02]',
  landscape: 'aspect-[16/10]',
  tall: 'aspect-[4/4.8]',
  featured: 'aspect-[4/3]',
}

function getTileHref(tile: GalleryTile): string | undefined {
  if (!tile.projectId) return undefined
  return buildProjectPath(tile.projectId, tile.sectionId)
}

function AutoPlayLoopVideo({
  src,
  poster,
  alt,
  fit,
}: {
  src: string
  poster?: string
  alt: string
  fit?: 'cover' | 'contain'
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '180px 0px', threshold: 0.05 },
    )

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={alt}
      className={cn(
        'block size-full transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]',
        fit === 'contain' ? 'object-contain p-4' : 'object-cover object-center',
      )}
    />
  )
}

/**
 * Full-bleed Shopify Editions showcase tile with snappy tactile hover growth,
 * crisp border glow, subtle inner media zoom, and floating glass caption pill.
 */
export function WorkCard({
  tile,
  priority = false,
  onZoom,
}: {
  tile: GalleryTile
  priority?: boolean
  onZoom?: (tile: GalleryTile) => void
}) {
  const Snippet = tile.snippet ? snippets[tile.snippet] : null
  const href = getTileHref(tile)
  const canZoom = !href && !Snippet && Boolean(onZoom && (tile.media || tile.mockup))
  const Wrapper = href ? 'a' : canZoom ? 'button' : 'div'
  const isDarkSurface = tile.theme === 'dark'

  function handleLinkClick(event: MouseEvent<HTMLElement>) {
    if (!href || isModifiedClick(event)) return
    event.preventDefault()
    navigateTo(href)
  }

  return (
    <Wrapper
      {...(href ? { href, onClick: handleLinkClick } : {})}
      {...(canZoom
        ? {
            type: 'button' as const,
            onClick: () => onZoom?.(tile),
          }
        : {})}
      className={cn(
        'group relative isolate block w-full overflow-hidden rounded-[20px] text-left outline-none',
        'ring-1 ring-black/[0.08] transition-[transform,box-shadow] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_22px_48px_-14px_rgba(0,0,0,0.2)] hover:ring-black/[0.22]',
        'focus-visible:ring-2 focus-visible:ring-foreground/35',
        'dark:ring-white/[0.09] dark:hover:shadow-[0_26px_54px_-12px_rgba(0,0,0,0.75)] dark:hover:ring-white/[0.28]',
        canZoom && 'cursor-zoom-in',
        isDarkSurface ? 'bg-[#101012]' : 'bg-[#f1f1f3] dark:bg-[#16161a]',
        aspectByTileSize[tile.tileSize],
      )}
    >
      {/* Full-bleed media layer */}
      <div className="relative size-full overflow-hidden rounded-[inherit]">
        {tile.mockup ? (
          <CoverMockup config={tile.mockup} title={tile.title} />
        ) : tile.media ? (
          tile.media.type === 'video' ? (
            <AutoPlayLoopVideo
              src={tile.media.src}
              poster={tile.media.poster}
              alt={tile.media.alt}
              fit={tile.media.fit}
            />
          ) : (
            <img
              src={tile.media.src}
              alt={tile.media.alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={cn(
                'block size-full transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]',
                tile.media.fit === 'contain'
                  ? 'object-contain p-5'
                  : tile.category === 'ui'
                    ? 'object-cover object-top'
                    : 'object-cover object-center',
              )}
            />
          )
        ) : Snippet ? (
          <Snippet />
        ) : null}

        {/* Floating Shopify-style caption pill */}
        <div
          className={cn(
            'pointer-events-none absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2.5 rounded-full px-3.5 py-2',
            'border border-black/[0.08] bg-white/92 text-[#161618] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] backdrop-blur-md',
            'dark:border-white/[0.1] dark:bg-[#141417]/92 dark:text-[#f4f4f6] dark:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.65)]',
            'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'sm:translate-y-1.5 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100',
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-[12.5px] font-medium tracking-[-0.01em]">{tile.title}</span>
            <span className="hidden shrink-0 text-[11.5px] text-muted-foreground md:inline">· {tile.tag}</span>
          </div>
          {href ? (
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
              <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
            </span>
          ) : Snippet ? (
            <span className="shrink-0 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              interativo
            </span>
          ) : (
            <span
              aria-label="Ampliar"
              className="grid size-6 shrink-0 place-items-center rounded-[7px] bg-secondary text-foreground transition-transform duration-300 group-hover:scale-105"
            >
              <ExpandCornersIcon className="size-3.5" />
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
