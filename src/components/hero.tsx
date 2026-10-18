import { useEffect, useState } from 'react'
import { ArrowUpRight, Asterisk } from 'lucide-react'

import { AboutDialog } from '@/components/about-dialog'
import { ContactForm } from '@/components/contact-form'
import { brandIcons } from '@/components/brand-icons'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** Two-dot theme toggle (Sun / Moon), keeping the compact ring/dot indicator at rest and morphing on hover. */
function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div
      role="group"
      aria-label="Alternar tema"
      className="fixed top-6 right-6 z-40 flex items-center gap-0.5 rounded-full bg-background/70 p-1 backdrop-blur md:absolute md:top-0 md:right-0 md:bg-transparent md:p-0"
    >
      {/* Sol (Light Mode) */}
      <button
        type="button"
        aria-label="Tema claro"
        aria-pressed={theme === 'light'}
        onClick={() => setTheme('light')}
        className="group relative grid size-6 cursor-pointer place-items-center rounded-full outline-none"
      >
        {/* Hover-only Sun effects wrapper — strictly invisible (opacity-0) when not hovered */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 scale-50 opacity-0 transition-all duration-250 ease-out group-hover:scale-100 group-hover:opacity-100"
        >
          {/* Very subtle warm pulse behind the sun */}
          <span className="animate-sun-glow absolute inset-1 rounded-full bg-amber-400/10 blur-[1.5px]" />

          {/* Crisp rotating yellow sun rays */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="animate-sun-rays absolute inset-0 size-full text-amber-400"
          >
            <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
              <line x1="12" y1="2" x2="12" y2="4.6" />
              <line x1="12" y1="19.4" x2="12" y2="22" />
              <line x1="2" y1="12" x2="4.6" y2="12" />
              <line x1="19.4" y1="12" x2="22" y2="12" />
              <line x1="4.9" y1="4.9" x2="6.8" y2="6.8" />
              <line x1="17.2" y1="17.2" x2="19.1" y2="19.1" />
              <line x1="19.1" y1="4.9" x2="17.2" y2="6.8" />
              <line x1="6.8" y1="17.2" x2="4.9" y2="19.1" />
            </g>
          </svg>
        </span>

        {/* Resting indicator (ring when ON, small dot when OFF) -> crisp vibrant yellow sun core on hover */}
        <span
          className={cn(
            'relative z-10 block rounded-full transition-all duration-250 ease-out',
            theme === 'light'
              ? 'size-4 border-[3.5px] border-primary bg-background'
              : 'size-1.5 bg-primary/40',
            'group-hover:size-2.5 group-hover:border-0 group-hover:bg-amber-400',
          )}
        />
      </button>

      {/* Lua (Dark Mode) */}
      <button
        type="button"
        aria-label="Tema escuro"
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme('dark')}
        className="group relative grid size-6 cursor-pointer place-items-center rounded-full outline-none"
      >
        {/* Resting indicator (ring when ON, small dot when OFF) -> hides on hover as moon & stars appear */}
        <span
          className={cn(
            'relative z-10 block rounded-full transition-all duration-250 ease-out',
            theme === 'dark'
              ? 'size-4 border-[3.5px] border-primary bg-background'
              : 'size-1.5 bg-primary/40',
            'group-hover:scale-0 group-hover:opacity-0',
          )}
        />

        {/* Hover-only Moon effects wrapper — strictly invisible (opacity-0) when not hovered */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 grid scale-50 place-items-center opacity-0 transition-all duration-250 ease-out group-hover:scale-100 group-hover:opacity-100"
        >
          {/* Very subtle lunar pulse behind the moon */}
          <span className="animate-sun-glow absolute inset-1 rounded-full bg-primary/10 blur-[1.5px]" />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="animate-moon-tilt relative size-5 overflow-visible"
          >
            {/* Crescent moon in strong focal color */}
            <path
              d="M19.2 14.6A7.2 7.2 0 0 1 9.4 4.8a7.2 7.2 0 1 0 9.8 9.8Z"
              className="fill-primary"
            />
            {/* Twinkling Star 1 (top right) */}
            <path
              d="M17.5 3.5 L18.1 5.1 L19.7 5.7 L18.1 6.3 L17.5 7.9 L16.9 6.3 L15.3 5.7 L16.9 5.1 Z"
              className="animate-star-twinkle fill-amber-400"
              style={{ transformOrigin: '17.5px 5.7px' }}
            />
            {/* Twinkling Star 2 */}
            <circle
              cx="13.8"
              cy="4.2"
              r="1.05"
              className="animate-star-twinkle fill-primary"
              style={{ animationDelay: '450ms', transformOrigin: '13.8px 4.2px' }}
            />
            {/* Twinkling Star 3 */}
            <circle
              cx="20.2"
              cy="10.2"
              r="0.95"
              className="animate-star-twinkle fill-amber-400"
              style={{ animationDelay: '900ms', transformOrigin: '20.2px 10.2px' }}
            />
          </svg>
        </span>
      </button>
    </div>
  )
}

/** Large photo card. Click opens the "about me" dialog. */
function PhotoCard({ className, onClick }: { className?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Sobre mim"
      className={cn(
        'group animate-fade-up relative block cursor-pointer rounded-[18px] bg-card p-1.5 text-left shadow-xl shadow-[#1c2333]/5 outline-none transition-[rotate] duration-500 ease-out [animation-delay:150ms] dark:shadow-black/30',
        className,
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[12px]">
        <img
          src={profile.photo}
          alt={profile.name}
          className="block size-full object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        <span className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] text-foreground backdrop-blur dark:bg-popover/85">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Disponível para projetos
        </span>

        {/* Caption: 4px from bottom and sides */}
        <div className="absolute inset-x-1 bottom-1 flex items-center justify-between rounded-[8px] bg-primary px-3.5 py-2.5 text-[13px] text-white transition-colors duration-300 ease-out group-hover:bg-white group-hover:text-primary">
          <span>Esse sou eu 👋</span>
          <Asterisk className="size-3.5 transition-transform duration-500 group-hover:rotate-180" />
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-primary ring-inset opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </button>
  )
}

export function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <section className="relative mx-auto flex min-h-[88svh] w-full max-w-[1000px] items-start justify-between gap-12 px-6 pt-20 pb-16 sm:pt-24">
      <div className="relative w-full max-w-[420px] md:ml-[18%] lg:ml-[22%]">
        <ThemeToggle />

        {/* Header: name + role */}
        <header className="animate-fade-up text-[13px] leading-snug">
          <h1 className="font-medium text-primary">Olá, sou {profile.name}</h1>
          <p className="text-muted-foreground">{profile.role}</p>
        </header>

        <PhotoCard onClick={() => setAboutOpen(true)} className="mt-8 aspect-[4/3] lg:hidden" />

        <p className="animate-fade-up mt-14 text-[13px] text-muted-foreground [animation-delay:100ms]">
          {profile.tagline}
        </p>

        <ul className="animate-fade-up mt-10 grid gap-1 text-[13px] [animation-delay:200ms]">
          <li>
            <button
              type="button"
              onClick={() => setAboutOpen(true)}
              className="group inline-flex cursor-pointer items-center gap-2 text-primary transition-all duration-200 ease-out hover:translate-x-1.5 hover:text-foreground"
            >
              <span className="relative flex size-3.5 items-center justify-center">
                <Asterisk className="size-3.5 transition-all duration-200 group-hover:scale-50 group-hover:opacity-0" />
                <ArrowUpRight className="absolute size-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
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
                  className="group inline-flex items-center gap-2 text-primary transition-all duration-200 ease-out hover:translate-x-1.5 hover:text-foreground"
                >
                  <span className="relative flex size-3.5 items-center justify-center">
                    <Icon className="size-3 transition-all duration-200 group-hover:scale-50 group-hover:opacity-0" />
                    <ArrowUpRight className="absolute size-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </span>
                  <span>{l.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="animate-fade-up mt-12 [animation-delay:300ms]">
          <ContactForm />
        </div>
      </div>

      <PhotoCard
        onClick={() => setAboutOpen(true)}
        className="hidden aspect-[4/5] w-[280px] shrink-0 rotate-2 hover:rotate-0 lg:block xl:-mr-10"
      />

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </section>
  )
}
