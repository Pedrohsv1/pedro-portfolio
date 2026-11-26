import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, ZoomIn, ZoomOut } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { SVGProps } from 'react'

export type LightboxMedia = {
  type?: 'image' | 'video'
  src: string
  alt: string
  poster?: string
  caption?: string
}

export function ExpandCornersIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M9 3.5H12.5V7" />
      <path d="M7 12.5H3.5V9" />
    </svg>
  )
}

const ZOOM_STEPS = [1, 1.75, 2.5, 3.5] as const

function MediaLightboxContent({
  media,
  onClose,
}: {
  media: LightboxMedia
  onClose: () => void
}) {
  const isImage = media.type !== 'video'

  const stageRef = useRef<HTMLDivElement | null>(null)
  const [stageEl, setStageEl] = useState<HTMLDivElement | null>(null)
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 })
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)

  const handleStageRef = useCallback((node: HTMLDivElement | null) => {
    stageRef.current = node
    setStageEl(node)
  }, [])

  const pendingFocalRef = useRef<{ rx: number; ry: number } | null>(null)
  const dragRef = useRef<{
    active: boolean
    moved: boolean
    pointerId: number
    startX: number
    startY: number
    scrollLeft: number
    scrollTop: number
  }>({
    active: false,
    moved: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  })

  // Measure available stage area once Radix Portal mounts the element
  useEffect(() => {
    if (!stageEl) return

    const update = () => {
      setStageSize({ width: stageEl.clientWidth, height: stageEl.clientHeight })
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(stageEl)
    return () => ro.disconnect()
  }, [stageEl])

  const getZoomedDimensions = useCallback(() => {
    if (!naturalSize || !stageSize.width || !stageSize.height) return null
    const padding = stageSize.width < 640 ? 16 : 48
    const availW = Math.max(120, stageSize.width - padding)
    const availH = Math.max(120, stageSize.height - padding)

    // Allow filling the viewport cleanly without excessive upscaling of tiny assets
    const fitScale = Math.min(availW / naturalSize.width, availH / naturalSize.height, 1.5)
    const baseW = Math.round(naturalSize.width * fitScale)
    const baseH = Math.round(naturalSize.height * fitScale)

    return {
      width: Math.round(baseW * zoom),
      height: Math.round(baseH * zoom),
    }
  }, [naturalSize, stageSize, zoom])

  const dims = getZoomedDimensions()

  // Keep focal point centered after zoom changes
  useLayoutEffect(() => {
    const stage = stageRef.current
    const focal = pendingFocalRef.current
    if (!stage || !focal) return
    pendingFocalRef.current = null

    if (zoom <= 1) {
      stage.scrollTo({ left: 0, top: 0 })
      return
    }

    const targetLeft = Math.max(0, stage.scrollWidth * focal.rx - stage.clientWidth / 2)
    const targetTop = Math.max(0, stage.scrollHeight * focal.ry - stage.clientHeight / 2)
    stage.scrollTo({ left: targetLeft, top: targetTop })
  }, [zoom, dims?.width, dims?.height])

  const setZoomWithFocal = useCallback((nextZoom: number, focal = { rx: 0.5, ry: 0.5 }) => {
    const clamped = Math.min(ZOOM_STEPS[ZOOM_STEPS.length - 1], Math.max(1, nextZoom))
    pendingFocalRef.current = focal
    setZoom(clamped)
  }, [])

  const handleZoomIn = useCallback(() => {
    const next = ZOOM_STEPS.find((step) => step > zoom + 0.05) ?? ZOOM_STEPS[ZOOM_STEPS.length - 1]
    setZoomWithFocal(next)
  }, [zoom, setZoomWithFocal])

  const handleZoomOut = useCallback(() => {
    const prev = [...ZOOM_STEPS].reverse().find((step) => step < zoom - 0.05) ?? 1
    setZoomWithFocal(prev)
  }, [zoom, setZoomWithFocal])

  const handleResetZoom = useCallback(() => {
    setZoomWithFocal(1)
  }, [setZoomWithFocal])

  // Keyboard shortcuts (+ / - / 0) when lightbox is open on an image
  useEffect(() => {
    if (!isImage) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        handleZoomIn()
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault()
        handleZoomOut()
      } else if (event.key === '0') {
        event.preventDefault()
        handleResetZoom()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isImage, handleZoomIn, handleZoomOut, handleResetZoom])

  function handleImageClick(event: MouseEvent<HTMLImageElement>) {
    event.stopPropagation()
    if (dragRef.current.moved) {
      dragRef.current.moved = false
      return
    }
    if (zoom > 1) {
      handleResetZoom()
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const rx = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0.5
    const ry = rect.height > 0 ? (event.clientY - rect.top) / rect.height : 0.5
    // Stronger initial zoom on mobile so wide desktop UIs become legible immediately
    const targetZoom = window.innerWidth < 640 ? 2.5 : 1.75
    setZoomWithFocal(targetZoom, { rx, ry })
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    // Touch devices use smooth native scroll/pan inside overflow-auto
    if (event.pointerType !== 'mouse' || zoom <= 1) return
    const stage = stageRef.current
    if (!stage) return

    dragRef.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: stage.scrollLeft,
      scrollTop: stage.scrollTop,
    }
    setIsDragging(true)
    stage.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.active) return
    const stage = stageRef.current
    if (!stage) return

    const dx = event.clientX - dragRef.current.startX
    const dy = event.clientY - dragRef.current.startY
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragRef.current.moved = true
    }
    stage.scrollLeft = dragRef.current.scrollLeft - dx
    stage.scrollTop = dragRef.current.scrollTop - dy
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    setIsDragging(false)
    if (stageRef.current?.hasPointerCapture(event.pointerId)) {
      stageRef.current.releasePointerCapture(event.pointerId)
    }
  }

  function handleStageClick(event: MouseEvent<HTMLDivElement>) {
    if (dragRef.current.moved) {
      dragRef.current.moved = false
      return
    }
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const label = media.caption || media.alt || 'Visualização ampliada'

  return (
    <>
      <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>

      {/* Top studio toolbar — never overlaps the media */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-3 pt-3 pb-1.5 sm:px-5 sm:pt-4 sm:pb-2">
        <p className="min-w-0 truncate text-[12.5px] font-medium tracking-[-0.01em] text-white/90 sm:text-[13.5px]">
          {label}
        </p>

        <div className="flex shrink-0 items-center gap-1.5">
          {isImage && (
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 p-0.5 text-white backdrop-blur-md">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                aria-label="Diminuir zoom"
                className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ZoomOut className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                aria-label="Resetar zoom"
                className="min-w-[44px] cursor-pointer px-1 text-center font-mono text-[11px] font-medium tabular-nums text-white/90 transition-colors hover:text-white"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
                aria-label="Aumentar zoom"
                className="grid size-8 cursor-pointer place-items-center rounded-full transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ZoomIn className="size-3.5" />
              </button>
            </div>
          )}

          <DialogPrimitive.Close
            aria-label="Fechar"
            className="grid size-9 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        </div>
      </div>

      {/* Full-viewport media stage with real layout zoom & smooth pan */}
      <div
        ref={handleStageRef}
        onClick={handleStageClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={cn(
          'relative flex min-h-0 flex-1 overflow-auto p-2 sm:p-6',
          zoom > 1 && (isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'),
        )}
      >
        <div className="m-auto flex shrink-0 items-center justify-center">
          {media.type === 'video' ? (
            <video
              src={media.src}
              poster={media.poster}
              autoPlay
              loop
              muted
              playsInline
              controls
              aria-label={media.alt}
              className="block max-h-[calc(100dvh-5.5rem)] max-w-[calc(100vw-1rem)] rounded-[12px] bg-black shadow-[0_24px_80px_-16px_rgba(0,0,0,0.7)] sm:max-w-[calc(100vw-3rem)] sm:rounded-[16px]"
            />
          ) : (
            <img
              ref={(img) => {
                if (img && img.complete && img.naturalWidth && img.naturalHeight) {
                  setNaturalSize((prev) =>
                    prev && prev.width === img.naturalWidth && prev.height === img.naturalHeight
                      ? prev
                      : { width: img.naturalWidth, height: img.naturalHeight },
                  )
                }
              }}
              src={media.src}
              alt={media.alt}
              draggable={false}
              onClick={handleImageClick}
              onLoad={(e) => {
                const img = e.currentTarget
                if (img.naturalWidth && img.naturalHeight) {
                  setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight })
                }
              }}
              style={
                dims
                  ? {
                      width: `${dims.width}px`,
                      height: `${dims.height}px`,
                      maxWidth: 'none',
                      maxHeight: 'none',
                    }
                  : undefined
              }
              className={cn(
                'block rounded-[12px] object-contain shadow-[0_24px_80px_-16px_rgba(0,0,0,0.7)] select-none sm:rounded-[16px]',
                !dims && 'max-h-[calc(100dvh-5.5rem)] max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-3rem)]',
                zoom === 1 ? 'cursor-zoom-in' : isDragging ? 'cursor-grabbing' : 'cursor-grab',
              )}
            />
          )}
        </div>
      </div>
    </>
  )
}

export function MediaLightbox({
  media,
  onClose,
}: {
  media: LightboxMedia | null
  onClose: () => void
}) {
  return (
    <DialogPrimitive.Root open={Boolean(media)} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/82 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
          {media && <MediaLightboxContent key={media.src} media={media} onClose={onClose} />}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
