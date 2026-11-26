import { useState } from 'react'
import { ArrowUpRight, Asterisk, Check, Copy } from 'lucide-react'

import { AboutDialog } from '@/components/about-dialog'
import { brandIcons } from '@/components/brand-icons'
import { ContactForm } from '@/components/contact-form'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

/** Large photo card with unmistakable hover grow, straighten, ring highlight, zoom, and spinning asterisk. */
function PhotoCard({ className, onClick }: { className?: string; onClick: () => void }) {
  return (
    <div className={cn('animate-fade-up [animation-delay:120ms]', className)}>
      <button
        type="button"
        onClick={onClick}
        aria-label="Sobre mim"
        className={cn(
          'group relative block size-full cursor-pointer overflow-hidden rounded-[22px] border border-border bg-card text-left outline-none',
          'shadow-[0_14px_36px_-14px_rgba(0,0,0,0.14)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'lg:rotate-2 lg:hover:rotate-0 hover:-translate-y-1.5 hover:scale-[1.03] hover:border-foreground/30 hover:shadow-[0_26px_54px_-16px_rgba(0,0,0,0.24)]',
          'dark:shadow-[0_18px_42px_-12px_rgba(0,0,0,0.65)] dark:hover:border-white/30 dark:hover:shadow-[0_28px_58px_-14px_rgba(0,0,0,0.88)]',
        )}
      >
        <div className="relative size-full overflow-hidden">
          <img
            src={profile.photo}
            alt={profile.name}
            fetchPriority="high"
            decoding="async"
            className="block size-full object-cover object-[50%_20%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />

          {/* <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#161618] backdrop-blur-md dark:border-white/[0.12] dark:bg-[#141417]/88 dark:text-[#f4f4f6]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </span> */}

          {/* Floating pill caption with inverted hover colors + spinning asterisk */}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-white/[0.12] bg-[#161618]/90 px-3.5 py-2 text-[12.5px] font-medium text-white backdrop-blur-md transition-all duration-300 ease-out group-hover:border-black/[0.08] group-hover:bg-white group-hover:text-[#161618]">
            <span>Esse sou eu 👋</span>
            <Asterisk className="size-3.5 transition-transform duration-500 ease-out group-hover:rotate-180" />
          </div>
        </div>

        {/* Crisp inset hover ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-foreground/25 ring-inset opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 dark:ring-white/30"
        />
      </button>
    </div>
  )
}

export function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleCopyEmail() {
    navigator.clipboard?.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative overflow-x-clip">
      {/* Ultra-subtle Shopify 24px grid canvas with radial fade */}
      <div
        aria-hidden
        className=" pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_75%_at_50%_35%,black_25%,transparent_100%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1040px] items-start justify-between gap-12 px-6 pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="relative w-full max-w-[440px] md:ml-[10%] lg:ml-[14%]">
          {/* Two-tone Shopify display header */}
          <header className="animate-fade-up">
            <h1 className="text-[14px] leading-[1.2] font-semibold tracking-[-0.03em] text-foreground sm:text-[14px]">
              Olá, sou {profile.name}
            </h1>
            <p className="mt-1 text-[14px] leading-snug font-medium tracking-[-0.02em] text-muted-foreground sm:text-[14px]">
              {profile.role}
            </p>
          </header>

          <PhotoCard onClick={() => setAboutOpen(true)} className="mt-7 aspect-[4/3] lg:hidden" />

          <p className="animate-fade-up mt-7 text-[14px] leading-relaxed text-muted-foreground [animation-delay:80ms]">
            {profile.tagline}
          </p>

          {/* Signature interactive links: clear muted->foreground color shift + translate-x-1.5 + icon morph to ArrowUpRight + spinning asterisk */}
          <ul className="animate-fade-up mt-7 grid gap-2 text-[13.5px] [animation-delay:140ms]">
            <li>
              <button
                type="button"
                onClick={() => setAboutOpen(true)}
                className="group inline-flex cursor-pointer items-center gap-2 font-medium text-muted-foreground transition-all duration-200 ease-out hover:translate-x-1.5 hover:text-foreground"
              >
                <span className="relative flex size-4 items-center justify-center">
                  <Asterisk className="size-3.5 transition-all duration-300 ease-out group-hover:rotate-180 group-hover:scale-50 group-hover:opacity-0" />
                  <ArrowUpRight className="absolute size-3.5 -translate-x-1.5 translate-y-1.5 text-foreground opacity-0 transition-all duration-250 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </span>
                <span>conheça um pouco sobre mim</span>
              </button>
            </li>
            {profile.links.map((l) => {
              const Icon = brandIcons[l.type]
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-medium text-muted-foreground transition-all duration-200 ease-out hover:translate-x-1.5 hover:text-foreground"
                  >
                    <span className="relative flex size-4 items-center justify-center">
                      <Icon className="size-3.5 transition-all duration-200 ease-out group-hover:scale-50 group-hover:opacity-0" />
                      <ArrowUpRight className="absolute size-3.5 -translate-x-1.5 translate-y-1.5 text-foreground opacity-0 transition-all duration-250 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </span>
                    <span>{l.label}</span>
                  </a>
                </li>
              )
            })}
            <li>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group inline-flex cursor-pointer items-center gap-2 font-medium text-muted-foreground transition-all duration-200 ease-out hover:translate-x-1.5 hover:text-foreground"
              >
                <span className="relative flex size-4 items-center justify-center">
                  {copied ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <>
                      <Copy className="size-3 transition-all duration-200 ease-out group-hover:scale-50 group-hover:opacity-0" />
                      <ArrowUpRight className="absolute size-3.5 -translate-x-1.5 translate-y-1.5 text-foreground opacity-0 transition-all duration-250 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </>
                  )}
                </span>
                <span className={copied ? 'text-foreground' : undefined}>
                  {copied ? 'E-mail copiado!' : profile.email}
                </span>
              </button>
            </li>
          </ul>

          <div className="animate-fade-up mt-8 [animation-delay:220ms]">
            <ContactForm />
          </div>
        </div>

        <PhotoCard
          onClick={() => setAboutOpen(true)}
          className="hidden aspect-[4/5] w-[280px] shrink-0 lg:block xl:-mr-6"
        />

        <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      </div>
    </section>
  )
}
