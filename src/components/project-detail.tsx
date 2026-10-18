import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Laptop, Monitor, Smartphone, Sparkles, Tablet } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'
import type { WorkItem } from '@/data/work'

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

export function ProjectDetail({ item, onBack }: { item: WorkItem; onBack: () => void }) {
  const cs = item.caseStudy
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string; caption?: string } | null>(null)
  const [activeId, setActiveId] = useState<string>('overview')
  const isClickScrolling = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [item.id])

  const tocItems = useMemo(() => {
    if (!cs) return []
    return [
      { id: 'overview', label: 'Visão geral' },
      { id: 'palette', label: 'Identidade visual' },
      ...cs.sections.map((section, idx) => ({
        id: `section-${idx}`,
        label: section.eyebrow.replace(/^\d+\s*[·•-]\s*/, ''),
      })),
    ]
  }, [cs])

  useEffect(() => {
    if (!tocItems.length) return

    const updateActiveSection = () => {
      if (isClickScrolling.current) return

      // Offset matches scroll-mt-24 (96px) + breathing room
      const triggerOffset = 140
      let currentId = tocItems[0].id

      for (const item of tocItems) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const { top } = el.getBoundingClientRect()
        if (top <= triggerOffset) {
          currentId = item.id
        } else {
          break
        }
      }

      setActiveId(currentId)
    }

    let rafId = 0
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [tocItems])

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  if (!cs) return null

  const isResponsive = /mobile|tablet|responsiv/i.test(cs.platform)

  const handleTocClick = (id: string) => {
    setActiveId(id)
    const el = document.getElementById(id)
    if (!el) return

    isClickScrolling.current = true
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current)
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const unlock = () => {
      isClickScrolling.current = false
      window.removeEventListener('scrollend', unlock)
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = null
      }
    }

    window.addEventListener('scrollend', unlock, { once: true })
    scrollTimeoutRef.current = window.setTimeout(unlock, 900)
  }

  return (
    <div className="min-h-svh">
      {/* Sticky full-width top navigation with subtle blur + background gradient */}
      <div className="sticky top-0 z-30 w-full pt-3.5 pb-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/15 to-transparent backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1080px] items-center justify-between gap-4 px-4 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-border/80 bg-white/60 px-3.5 text-[13px] font-medium text-foreground backdrop-blur-sm transition-colors duration-200 hover:bg-white dark:bg-secondary/70 dark:hover:bg-secondary"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            {cs.figmaUrl && (
              <a
                href={cs.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-primary bg-primary px-3.5 text-[13px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-white hover:text-primary"
              >
                <span>Ver no Figma</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <article className="mx-auto w-full max-w-[1080px] px-4 pt-6 pb-24 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
          {/* Left Main Content Column */}
          <div className="min-w-0">
            {/* Header */}
            <header className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/60 px-3 py-1 text-[11px] font-medium text-muted-foreground dark:bg-secondary/70">
                <Sparkles className="size-3 text-primary" />
                <span>Case Study · {cs.client}</span>
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {item.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {cs.subtitle}
              </p>
            </header>

            {/* Metadata bar */}
            <dl className="animate-fade-up mt-8 grid grid-cols-2 gap-3 rounded-[18px] bg-card p-1.5 [animation-delay:80ms] sm:grid-cols-4">
              {[
                { label: 'Cliente', value: cs.client },
                { label: 'Papel', value: cs.role },
                { label: 'Plataforma', value: cs.platform },
                { label: 'Ano', value: cs.period },
              ].map((meta) => (
                <div key={meta.label} className="rounded-[12px] bg-white/75 px-4 py-3 dark:bg-secondary/80">
                  <dt className="text-[11px] text-muted-foreground">{meta.label}</dt>
                  <dd className="mt-0.5 text-[13px] font-medium text-foreground">{meta.value}</dd>
                </div>
              ))}
            </dl>

            {/* Hero Screen Showcase */}
            <div className="animate-fade-up mt-6 [animation-delay:140ms]">
              <button
                type="button"
                onClick={() =>
                  setZoomImage({
                    src: cs.heroImage,
                    alt: item.title,
                    caption: item.title,
                  })
                }
                className="group relative block w-full cursor-zoom-in rounded-[18px] bg-card p-1.5 text-left outline-none"
              >
                <div className="relative overflow-hidden rounded-[12px]">
                  <img
                    src={cs.heroImage}
                    alt={item.title}
                    className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                </div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-primary ring-inset opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </button>
            </div>

            {/* Overview + Metrics */}
            <section id="overview" className="mt-16 scroll-mt-24">
              <p className="text-[13px] font-medium text-muted-foreground">
                Visão geral
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
                {cs.overviewTitle ?? 'Contexto & Desafio'}
              </h2>

              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/85">
                {cs.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Metrics */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="rounded-[18px] bg-card p-1.5">
                    <div className="h-full rounded-[12px] bg-white/80 p-4 dark:bg-secondary/80">
                      <span className="text-[11px] font-medium text-muted-foreground">{m.label}</span>
                      <p className="mt-1 text-base font-semibold text-foreground">{m.value}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Design System Palette */}
              <div id="palette" className="mt-12 scroll-mt-24">
                <p className="text-[13px] font-medium text-muted-foreground">
                  Sistema de cores
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Identidade visual do produto
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {cs.palette.map((swatch) => (
                    <div
                      key={swatch.hex}
                      className="rounded-[14px] bg-card p-1"
                    >
                      <div
                        className={cn(
                          'flex h-16 flex-col justify-between rounded-[10px] p-2.5 text-[11px] font-medium',
                          swatch.textLight ? 'text-white' : 'text-[#081217]',
                        )}
                        style={{ backgroundColor: swatch.hex }}
                      >
                        <span>{swatch.name}</span>
                        <span className="font-mono text-[10px] opacity-80">{swatch.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Detailed Flow Sections (Apple HIG inspired editorial layout) */}
            <div className="mt-20 space-y-20">
              {cs.sections.map((section, idx) => {
                const hasModals = section.images.some((img) => img.aspect === 'modal')
                const cleanSubtitle = section.eyebrow.replace(/^\d+\s*[·•-]\s*/, '')

                return (
                  <section
                    key={section.title}
                    id={`section-${idx}`}
                    className="scroll-mt-24"
                  >
                    <div>
                      <p className="text-[13px] font-medium text-muted-foreground">
                        {cleanSubtitle}
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
                        {section.title}
                      </h2>
                      <p className="mt-3.5 text-[15px] leading-relaxed text-foreground/85">
                        {section.description}
                      </p>

                      {section.bullets && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {section.bullets.map((b) => (
                            <span
                              key={b}
                              className="inline-flex items-center rounded-full border border-border/80 bg-white/75 px-3 py-1 text-[12px] font-medium text-foreground/85 dark:bg-secondary/80"
                            >
                              {renderBoldText(b)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Screen gallery */}
                    <div
                      className={cn(
                        'mt-7 grid gap-5',
                        hasModals
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : section.images.length > 1
                            ? 'grid-cols-1 sm:grid-cols-2'
                            : 'grid-cols-1',
                      )}
                    >
                      {section.images.map((img) => (
                        <figure key={img.src} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => setZoomImage(img)}
                            className="group relative block w-full cursor-zoom-in rounded-[18px] bg-card p-1.5 text-left outline-none"
                          >
                            <div
                              className={cn(
                                'relative overflow-hidden rounded-[12px] bg-[#081217]/5',
                                !hasModals && section.images.length > 1 && 'aspect-[16/11]',
                              )}
                            >
                              <img
                                src={img.src}
                                alt={img.alt}
                                className={cn(
                                  'block w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]',
                                  !hasModals && section.images.length > 1 ? 'size-full' : 'max-h-[740px]',
                                )}
                              />

                              {/* Concentric 4px bottom caption on hover */}
                              <div
                                className={cn(
                                  'absolute inset-x-1 bottom-1 flex items-center justify-between rounded-[8px] bg-primary px-3 py-2 text-[12px] text-white',
                                  'pointer-events-none translate-y-1.5 opacity-0 transition-[opacity,translate,background-color,color] duration-300 ease-out',
                                  'group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100',
                                  'hover:bg-white hover:text-primary',
                                )}
                              >
                                <span className="truncate pr-2">{img.alt}</span>
                                <span className="shrink-0 font-mono text-[10px] uppercase opacity-80">Ampliar</span>
                              </div>
                            </div>

                            <span
                              aria-hidden
                              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-primary ring-inset opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                          </button>

                          {img.caption && (
                            <figcaption className="mt-2.5 px-2 text-center text-[12px] text-muted-foreground">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>

            {/* Bottom CTA to go back */}
            <div className="mt-20 flex items-center justify-between rounded-[18px] bg-card p-1.5">
              <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-[12px] bg-white/80 px-5 py-4 dark:bg-secondary/80">
                <div>
                  <p className="text-[11px] text-muted-foreground">Fim do case</p>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-border/80 bg-white px-3.5 text-[13px] font-medium text-foreground transition-colors hover:bg-secondary dark:bg-card dark:hover:bg-background"
                  >
                    <ArrowLeft className="size-3.5" />
                    <span>Voltar aos projetos</span>
                  </button>
                  {cs.figmaUrl && (
                    <a
                      href={cs.figmaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-white hover:text-primary"
                    >
                      <span>Abrir protótipo no Figma</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar (Supported Platforms + Table of Contents / Sumário) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="text-[11px] font-semibold tracking-tight text-foreground">
                  Plataformas suportadas
                </p>
                <div className="mt-2.5 flex items-center gap-2.5 text-foreground/80">
                  <Monitor className="size-4" aria-label="Desktop" />
                  <Laptop className="size-4" aria-label="Laptop" />
                  {isResponsive && (
                    <>
                      <Tablet className="size-4" aria-label="Tablet" />
                      <Smartphone className="size-4" aria-label="Mobile" />
                    </>
                  )}
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  {cs.platform}
                </p>
              </div>

              <nav aria-label="Sumário do projeto">
                <ul className="border-l border-border/90 text-[12px]">
                  {tocItems.map((toc) => {
                    const isActive = activeId === toc.id
                    return (
                      <li key={toc.id}>
                        <button
                          type="button"
                          onClick={() => handleTocClick(toc.id)}
                          className={cn(
                            '-ml-px block w-full cursor-pointer border-l-2 py-1.5 pl-3.5 text-left leading-snug transition-colors duration-150',
                            isActive
                              ? 'border-foreground font-semibold text-foreground'
                              : 'border-transparent text-muted-foreground hover:text-foreground',
                          )}
                        >
                          {toc.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </article>

      {/* Lightbox Dialog for inspecting high-res Figma screens */}
      <Dialog open={!!zoomImage} onOpenChange={(o) => !o && setZoomImage(null)}>
        <DialogContent className="max-h-[92svh] overflow-y-auto p-2 sm:max-w-[92vw] lg:max-w-[1200px]">
          <DialogTitle className="sr-only">{zoomImage?.alt}</DialogTitle>
          {zoomImage && (
            <div>
              <img
                src={zoomImage.src}
                alt={zoomImage.alt}
                className="w-full rounded-xl"
              />
              {zoomImage.caption && (
                <p className="px-2 pt-2.5 pb-1 text-center text-xs text-muted-foreground">
                  {zoomImage.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

