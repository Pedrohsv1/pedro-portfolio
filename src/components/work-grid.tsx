import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { MediaLightbox } from '@/components/media-lightbox'
import { WorkCard } from '@/components/work-card'
import { gallery } from '@/data/work'
import { cn } from '@/lib/utils'
import type { GalleryCategory, GalleryTile } from '@/types/portfolio'

type Filter = 'all' | GalleryCategory

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'project', label: 'Projetos' },
  { value: 'ui', label: 'UI & Interações' },
]

function useMasonryColumnCount() {
  const [cols, setCols] = useState<number>(() => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth >= 1024) return 3
    if (window.innerWidth >= 640) return 2
    return 1
  })

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCols(3)
      else if (window.innerWidth >= 640) setCols(2)
      else setCols(1)
    }
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return cols
}

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>('all')
  const [zoomTile, setZoomTile] = useState<GalleryTile | null>(null)
  const columnCount = useMasonryColumnCount()

  // Sliding pill refs & geometry
  const listRef = useRef<HTMLDivElement | null>(null)
  const buttonRefs = useRef<Record<Filter, HTMLButtonElement | null>>({
    all: null,
    project: null,
    ui: null,
  })
  const [pill, setPill] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  })

  const measureActivePill = useCallback(() => {
    const activeBtn = buttonRefs.current[filter]
    if (!activeBtn) return
    setPill({
      left: activeBtn.offsetLeft,
      width: activeBtn.offsetWidth,
      ready: true,
    })
  }, [filter])

  useLayoutEffect(() => {
    measureActivePill()
  }, [measureActivePill])

  useEffect(() => {
    const listEl = listRef.current
    if (!listEl) return
    const ro = new ResizeObserver(() => measureActivePill())
    ro.observe(listEl)
    return () => ro.disconnect()
  }, [measureActivePill])

  const filteredTiles = useMemo(
    () => (filter === 'all' ? gallery : gallery.filter((tile) => tile.category === filter)),
    [filter],
  )

  // Left-to-right column distribution preserves reading order across masonry columns
  const columns = useMemo(() => {
    const buckets: GalleryTile[][] = Array.from({ length: columnCount }, () => [])
    filteredTiles.forEach((tile, idx) => {
      buckets[idx % columnCount].push(tile)
    })
    return buckets
  }, [filteredTiles, columnCount])

  return (
    <section id="work" className="w-full scroll-mt-8 pb-20">
      {/* Sticky floating segmented filter bar (zero full-viewport backdrop-blur for 60fps scrolling) */}
      <div className="sticky top-0 z-30 mb-5 w-full pt-3.5 pb-3">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/85 to-transparent"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1360px] items-center justify-between px-4 sm:px-6">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Filtrar trabalhos"
            className="polaris-floating-bar relative inline-flex items-center gap-0.5 rounded-full p-1"
          >
            {/* Gliding active pill indicator */}
            <span
              aria-hidden
              style={{
                width: `${pill.width}px`,
                transform: `translate3d(${pill.left}px, 0, 0)`,
              }}
              className={cn(
                'pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_1px_2px_rgba(0,0,0,0.14)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_1px_2px_rgba(0,0,0,0.45)]',
                pill.ready
                  ? 'opacity-100 transition-[transform,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'
                  : 'opacity-0',
              )}
            />

            {FILTER_OPTIONS.map((option) => {
              const isActive = filter === option.value
              return (
                <button
                  key={option.value}
                  ref={(node) => {
                    buttonRefs.current[option.value] = node
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(option.value)}
                  className={cn(
                    'relative z-10 inline-flex h-8 cursor-pointer items-center justify-center rounded-full px-3.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 outline-none select-none',
                    'focus-visible:ring-2 focus-visible:ring-ring/25',
                    isActive
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>

          <span className="hidden text-[12px] font-medium tracking-[-0.01em] text-muted-foreground tabular-nums sm:inline">
            {filteredTiles.length} {filteredTiles.length === 1 ? 'item' : 'itens'}
          </span>
        </div>
      </div>

      {/* 3-column Shopify Editions Masonry Showcase */}
      <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 items-start gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {columns.map((colItems, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4">
            {colItems.map((tile, rowIdx) => (
              <WorkCard key={tile.id} tile={tile} priority={rowIdx === 0} onZoom={setZoomTile} />
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox for standalone isolated UI showcases */}
      <MediaLightbox
        media={
          zoomTile?.media
            ? {
                type: zoomTile.media.type,
                src: zoomTile.media.src,
                alt: zoomTile.media.alt,
                poster: zoomTile.media.poster,
                caption: `${zoomTile.title} · ${zoomTile.tag}`,
              }
            : null
        }
        onClose={() => setZoomTile(null)}
      />
    </section>
  )
}
