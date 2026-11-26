import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe } from 'lucide-react'

import { Footer } from '@/components/footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { getNextProject } from '@/data/work'
import { cn } from '@/lib/utils'
import type { ProjectData, ProjectMedia } from '@/types/portfolio'

function MediaFrame({
  media,
  className,
  imgClassName,
  priority = false,
}: {
  media: ProjectMedia
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  if (media.type === 'video') {
    return (
      <video
        src={media.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className={cn('block w-full', imgClassName, className)}
      />
    )
  }

  return (
    <img
      src={media.src}
      alt={media.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('block', imgClassName ?? 'w-full', className)}
    />
  )
}

export function ProjectDetail({
  project,
  initialSectionId,
  onBack,
  onSelectProject,
}: {
  project: ProjectData
  initialSectionId?: string | null
  onBack: () => void
  onSelectProject: (projectId: string) => void
}) {
  const [zoomMedia, setZoomMedia] = useState<ProjectMedia | null>(null)
  const nextProject = useMemo(() => getNextProject(project.id), [project.id])

  useEffect(() => {
    if (initialSectionId) {
      const target = document.getElementById(initialSectionId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [project.id, initialSectionId])

  return (
    <div className="min-h-svh">
      {/* Sticky top bar aligned to the centered 1360px column */}
      <div className="sticky top-0 z-30 w-full pt-4 pb-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/85 to-transparent"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-4">
          <button
            type="button"
            onClick={onBack}
            className="polaris-floating-bar group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium tracking-[-0.01em] text-foreground transition-colors hover:bg-card"
          >
            <ArrowLeft className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-foreground" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="polaris-floating-bar hidden h-9 items-center rounded-full px-2 sm:inline-flex">
              <ThemeToggle />
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="polaris-pill-primary group inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium tracking-[-0.01em] transition-colors hover:bg-[#2a2a2e] dark:hover:bg-[#e4e4e8]"
              >
                <Globe className="size-3.5" />
                <span>Acessar site</span>
              </a>
            )}
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'group inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium tracking-[-0.01em] transition-colors',
                  project.liveUrl
                    ? 'polaris-floating-bar text-foreground hover:bg-card'
                    : 'polaris-pill-primary hover:bg-[#2a2a2e] dark:hover:bg-[#e4e4e8]',
                )}
              >
                <span>Ver no Figma</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/*
        Symmetric 3-track desktop grid so the 1360px main column sits mathematically dead-center
        on xl screens while the sticky TOC ("Neste projeto") stays on the right side.
      */}
      <article className="mx-auto w-full max-w-[1380px] px-4 pt-6 pb-20 sm:px-6">
        <div className="">
          {/* Invisible left balance track on xl screens to keep main content truly centered */}
          {/* <div aria-hidden className="hidden xl:block" /> */}

          {/* Dead-center Main Showcase Column (1360px) */}
          <div className="min-w-0 w-full">
            {/* Concise two-tone header */}
            <header id="overview" className="animate-fade-up scroll-mt-24">
              <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[11.5px] font-medium tracking-[-0.01em] text-muted-foreground">
                {project.projectType}
              </span>

              <h1 className="mt-4 text-[28px] leading-[1.15] font-semibold tracking-[-0.03em] text-foreground sm:text-[40px]">
                {project.title}
              </h1>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
                {project.subtitle}
              </p>
            </header>

            {/* Lean Polaris 3-cell metadata bar */}
            <dl className="polaris-card animate-fade-up mt-7 grid grid-cols-1 divide-y divide-border overflow-hidden rounded-[16px] [animation-delay:60ms] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { label: 'Cliente', value: project.client },
                { label: 'Papel', value: project.role },
                { label: 'Ano', value: project.period },
              ].map((meta) => (
                <div key={meta.label} className="px-5 py-3.5">
                  <dt className="text-[11.5px] font-medium text-muted-foreground">{meta.label}</dt>
                  <dd className="mt-0.5 text-[13.5px] font-medium tracking-[-0.01em] text-foreground tabular-nums">
                    {meta.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Full-width High-Res Hero Visual */}
            <div className="animate-fade-up mt-7 [animation-delay:110ms]">
              <button
                type="button"
                onClick={() => setZoomMedia(project.heroMedia)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-border bg-card text-left shadow-[0_2px_10px_rgba(0,0,0,0.03)] outline-none transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.008] hover:border-foreground/20 hover:shadow-[0_18px_42px_-16px_rgba(0,0,0,0.16)] focus-visible:ring-2 focus-visible:ring-ring/30 dark:hover:border-white/20 dark:hover:shadow-[0_22px_50px_-14px_rgba(0,0,0,0.7)]"
              >
                <MediaFrame
                  media={project.heroMedia}
                  priority
                  imgClassName="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3.5 bottom-3.5 rounded-full border border-black/[0.08] bg-white/92 px-3 py-1 font-mono text-[10px] tracking-wider text-[#161618] uppercase opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 dark:border-white/[0.1] dark:bg-[#141417]/90 dark:text-[#f4f4f6]"
                >
                  Ampliar
                </span>
              </button>
            </div>

            {/* Primary Challenge / Overview block (concise 2–5 lines) */}
            {project.overview.length > 0 && (
              <section className="mt-10 border-t border-border pt-10">
                <h2 className="text-[20px] leading-tight font-semibold tracking-[-0.025em] text-foreground sm:text-[24px]">
                  {project.overviewTitle}
                </h2>
                <div className="mt-3 max-w-[66ch] space-y-3 text-[15px] leading-[1.68] text-foreground/80">
                  {project.overview.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Optional Process block if filled later */}
            {project.processTitle && project.process && project.process.length > 0 && (
              <section id="process" className="mt-12 scroll-mt-24 border-t border-border pt-12">
                <h2 className="text-[20px] leading-tight font-semibold tracking-[-0.025em] text-foreground sm:text-[24px]">
                  {project.processTitle}
                </h2>
                <div className="mt-3 max-w-[66ch] space-y-3 text-[15px] leading-[1.68] text-foreground/80">
                  {project.process.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Visual-First High-Quality Sections (with Before/After comparisons & mobile frames) */}
            <div className="mt-14 space-y-16 border-t border-border pt-14">
              {project.sections.map((section) => {
                const isModalGrid =
                  section.media.length > 0 && section.media.every((item) => item.aspect === 'modal')

                return (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="mb-6">
                      {section.eyebrow && (
                        <p className="mb-1 text-[12px] font-medium tracking-[-0.01em] text-muted-foreground">
                          {section.eyebrow.replace(/^\d+\s*[·•-]\s*/, '')}
                        </p>
                      )}
                      <h2 className="text-[20px] leading-tight font-semibold tracking-[-0.025em] text-foreground sm:text-[24px]">
                        {section.title}
                      </h2>
                      {section.description && (
                        <p className="mt-2.5 max-w-[64ch] text-[14.5px] leading-[1.68] text-muted-foreground">
                          {section.description}
                        </p>
                      )}
                      {section.highlights && section.highlights.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {section.highlights.map((item) => (
                            <li
                              key={item}
                              className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[12px] font-medium tracking-[-0.01em] text-foreground/85"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Side-by-side Before / After comparison pairs (box-free, pixel-aligned, typographic labels) */}
                    {section.comparisons && section.comparisons.length > 0 && (
                      <div className="mb-8 space-y-10">
                        {section.comparisons.map((comp, idx) => (
                          <div key={comp.title ?? idx}>
                            {comp.title && (
                              <h3 className="mb-3.5 text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                                {comp.title}
                              </h3>
                            )}
                            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
                              {[
                                { label: comp.beforeLabel, media: comp.before, isAfter: false },
                                { label: comp.afterLabel, media: comp.after, isAfter: true },
                              ].map(({ label, media, isAfter }) => (
                                <figure key={media.src} className="flex flex-col">
                                  <p
                                    className={cn(
                                      'mb-2 text-[12.5px] tracking-[-0.01em]',
                                      isAfter
                                        ? 'font-semibold text-foreground'
                                        : 'font-medium text-muted-foreground',
                                    )}
                                  >
                                    {label}
                                  </p>

                                  <button
                                    type="button"
                                    onClick={() => setZoomMedia(media)}
                                    className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[18px] border border-border bg-card text-left outline-none transition-[transform,box-shadow,border-color] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01] hover:border-foreground/25 hover:shadow-[0_14px_34px_-12px_rgba(0,0,0,0.18)] focus-visible:ring-2 focus-visible:ring-ring/30 dark:hover:border-white/25 dark:hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
                                  >
                                    <div className="relative aspect-[16/10.4] w-full overflow-hidden bg-secondary/30">
                                      <MediaFrame
                                        media={media}
                                        imgClassName="size-full object-cover object-top transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                                      />
                                      <span
                                        aria-hidden
                                        className="pointer-events-none absolute right-2.5 bottom-2.5 rounded-full border border-black/[0.08] bg-white/92 px-2.5 py-0.5 font-mono text-[9.5px] tracking-wider text-[#161618] uppercase opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 dark:border-white/[0.1] dark:bg-[#141417]/90 dark:text-[#f4f4f6]"
                                      >
                                        Ampliar
                                      </span>
                                    </div>
                                  </button>

                                  {media.caption && (
                                    <figcaption className="mt-2.5 text-[12px] leading-relaxed text-muted-foreground">
                                      {media.caption}
                                    </figcaption>
                                  )}
                                </figure>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Curated Editorial Mosaic (full, tall-plus-stack, pair) */}
                    {section.mosaic && section.mosaic.length > 0 && (
                      <div className="mb-6 space-y-5">
                        {section.mosaic.map((row, rowIdx) => {
                          const renderTile = (
                            media: ProjectMedia,
                            containerClass: string,
                            imgClass: string,
                          ) => (
                            <button
                              key={media.src}
                              type="button"
                              onClick={() => setZoomMedia(media)}
                              className={cn(
                                'group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-border bg-card text-left outline-none',
                                'transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
                                'hover:scale-[1.008] hover:border-foreground/25 hover:shadow-[0_18px_42px_-16px_rgba(0,0,0,0.18)]',
                                'focus-visible:ring-2 focus-visible:ring-ring/30 dark:hover:border-white/25 dark:hover:shadow-[0_22px_50px_-14px_rgba(0,0,0,0.72)]',
                                containerClass,
                              )}
                            >
                              <MediaFrame
                                media={media}
                                imgClassName={cn(
                                  'transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]',
                                  imgClass,
                                )}
                              />

                              <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                              >
                                {media.caption ? (
                                  <span className="truncate rounded-full border border-black/[0.08] bg-white/92 px-3 py-1 text-[11.5px] font-medium text-[#161618] backdrop-blur-md dark:border-white/[0.1] dark:bg-[#141417]/92 dark:text-[#f4f4f6]">
                                    {media.caption}
                                  </span>
                                ) : (
                                  <span />
                                )}
                                <span className="shrink-0 rounded-full border border-black/[0.08] bg-white/92 px-2.5 py-1 font-mono text-[9.5px] tracking-wider text-[#161618] uppercase backdrop-blur-md dark:border-white/[0.1] dark:bg-[#141417]/92 dark:text-[#f4f4f6]">
                                  Ampliar
                                </span>
                              </div>
                            </button>
                          )

                          if (row.layout === 'full') {
                            return (
                              <div key={rowIdx} className="grid grid-cols-1 gap-5">
                                {row.items.map((media) =>
                                  renderTile(media, 'bg-secondary/30', 'h-auto w-full'),
                                )}
                              </div>
                            )
                          }

                          if (row.layout === 'tall-plus-stack') {
                            return (
                              <div
                                key={rowIdx}
                                className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]"
                              >
                                {/* Mobile tall frame stretched to align mathematically with the 2 stacked screens */}
                                {renderTile(
                                  row.tall,
                                  'mx-auto max-w-[380px] bg-secondary/40 dark:bg-[#101013] lg:mx-0 lg:h-full lg:max-w-none',
                                  'h-auto w-full object-cover object-top lg:absolute lg:inset-0 lg:size-full',
                                )}

                                {/* Two stacked desktop screens */}
                                <div className="grid grid-cols-1 gap-5">
                                  {row.stack.map((media) =>
                                    renderTile(
                                      media,
                                      'aspect-[16/10.6] bg-secondary/30',
                                      'size-full object-cover object-top',
                                    ),
                                  )}
                                </div>
                              </div>
                            )
                          }

                          if (row.layout === 'trio') {
                            return (
                              <div
                                key={rowIdx}
                                className="rounded-[22px] border border-border bg-secondary/45 px-6 py-8 sm:px-10 sm:py-12 dark:bg-[#111114]"
                              >
                                <div className="mx-auto grid max-w-[980px] grid-cols-1 justify-items-center gap-6 sm:grid-cols-3 lg:gap-8">
                                  {row.items.map((media) =>
                                    renderTile(
                                      media,
                                      'max-w-[295px] rounded-[22px] bg-card shadow-[0_18px_46px_-14px_rgba(0,0,0,0.18)] dark:shadow-[0_22px_50px_-14px_rgba(0,0,0,0.75)]',
                                      'h-auto w-full',
                                    ),
                                  )}
                                </div>
                              </div>
                            )
                          }

                          return (
                            <div key={rowIdx} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                              {row.items.map((media) =>
                                renderTile(
                                  media,
                                  'aspect-[16/10.8] bg-secondary/30',
                                  'size-full object-cover object-top',
                                ),
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Full-width crisp images for desktop UIs; 2-col for compact modals; centered phone frame for mobile */}
                    {section.media.length > 0 && (
                      <div
                        className={cn(
                          'grid gap-6',
                          isModalGrid ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1',
                        )}
                      >
                        {section.media.map((media) => {
                          const isMobile = media.aspect === 'mobile'

                          return (
                            <figure key={media.src} className="flex flex-col">
                              <button
                                type="button"
                                onClick={() => setZoomMedia(media)}
                                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-border bg-card text-left outline-none transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.008] hover:border-foreground/20 hover:shadow-[0_18px_42px_-16px_rgba(0,0,0,0.16)] focus-visible:ring-2 focus-visible:ring-ring/30 dark:hover:border-white/20 dark:hover:shadow-[0_22px_50px_-14px_rgba(0,0,0,0.7)]"
                              >
                                <div
                                  className={cn(
                                    'relative overflow-hidden',
                                    isMobile
                                      ? 'flex justify-center bg-secondary/50 px-6 py-10 dark:bg-[#101013]'
                                      : 'bg-secondary/30',
                                  )}
                                >
                                  {isMobile ? (
                                    <div className="w-full max-w-[320px] overflow-hidden rounded-[24px] border border-black/[0.1] bg-white shadow-[0_24px_60px_-16px_rgba(0,0,0,0.28)] transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] dark:border-white/[0.12] dark:shadow-[0_28px_64px_-14px_rgba(0,0,0,0.8)]">
                                      <MediaFrame media={media} imgClassName="h-auto w-full" />
                                    </div>
                                  ) : (
                                    <MediaFrame
                                      media={media}
                                      imgClassName="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
                                    />
                                  )}

                                  <span
                                    aria-hidden
                                    className="pointer-events-none absolute right-3.5 bottom-3.5 rounded-full border border-black/[0.08] bg-white/92 px-3 py-1 font-mono text-[10px] tracking-wider text-[#161618] uppercase opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 dark:border-white/[0.1] dark:bg-[#141417]/90 dark:text-[#f4f4f6]"
                                  >
                                    Ampliar
                                  </span>
                                </div>
                              </button>

                              {media.caption && (
                                <figcaption className="mt-2.5 px-1 text-[12px] text-muted-foreground">
                                  {media.caption}
                                </figcaption>
                              )}
                            </figure>
                          )
                        })}
                      </div>
                    )}
                  </section>
                )
              })}
            </div>

            {/* Next Project Polaris card */}
            {nextProject && (
              <div className="polaris-card mt-20 overflow-hidden rounded-[18px]">
                <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6">
                  <div className="min-w-0">
                    <p className="text-[11.5px] font-medium text-muted-foreground">Próximo projeto</p>
                    <p className="mt-0.5 text-[16px] font-semibold tracking-[-0.02em] text-foreground">
                      {nextProject.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onBack}
                      className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                      <span>Todos</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectProject(nextProject.id)}
                      className="polaris-pill-primary group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors hover:bg-[#2a2a2e] dark:hover:bg-[#e4e4e8]"
                    >
                      <span>Ver case</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sticky TOC floating gracefully in the right margin */}
          {/* <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-[11.5px] font-medium text-muted-foreground">Neste projeto</p>
              <nav aria-label="Sumário do projeto">
                <ul className="border-l border-border text-[12.5px]">
                  {tocItems.map((toc) => {
                    const isActive = activeId === toc.id
                    return (
                      <li key={toc.id}>
                        <button
                          type="button"
                          onClick={() => handleTocClick(toc.id)}
                          className={cn(
                            '-ml-px block w-full cursor-pointer border-l-2 py-1.5 pl-3.5 text-left leading-snug tracking-[-0.01em] transition-colors duration-150',
                            isActive
                              ? 'border-foreground font-medium text-foreground'
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
          </aside> */}
        </div>
      </article>

      {/* Lightbox Dialog */}
      <Dialog open={!!zoomMedia} onOpenChange={(open) => !open && setZoomMedia(null)}>
        <DialogContent className="max-h-[92svh] w-fit max-w-[92vw] overflow-y-auto p-2.5 sm:max-w-[92vw] lg:max-w-[1280px]">
          <DialogTitle className="sr-only">{zoomMedia?.alt}</DialogTitle>
          {zoomMedia && (
            <div className="flex flex-col items-center">
              <MediaFrame
                media={zoomMedia}
                imgClassName="max-h-[82svh] w-auto max-w-full rounded-[14px] object-contain"
              />
              {zoomMedia.caption && (
                <p className="px-2 pt-2.5 pb-1 text-center text-[12px] text-muted-foreground">
                  {zoomMedia.caption}
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
