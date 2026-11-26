import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** Two-dot theme toggle (Sun / Moon), keeping the compact ring/dot indicator at rest and morphing on hover. */
export function ThemeToggle({ className }: { className?: string }) {
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
      className={cn('inline-flex items-center gap-0.5', className)}
    >
      {/* Sol (Light Mode) */}
      <button
        type="button"
        aria-label="Tema claro"
        aria-pressed={theme === 'light'}
        onClick={() => setTheme('light')}
        className="group relative grid size-7 cursor-pointer place-items-center rounded-full transition-colors duration-200 outline-none hover:bg-foreground/[0.07] dark:hover:bg-white/[0.1]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0.5 scale-50 opacity-0 transition-all duration-250 ease-out group-hover:scale-100 group-hover:opacity-100"
        >
          <span className="animate-sun-glow absolute inset-1 rounded-full bg-amber-400/20 blur-[1.5px]" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="animate-sun-rays absolute inset-0 size-full text-amber-500 dark:text-amber-400"
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

        <span
          className={cn(
            'relative z-10 block rounded-full transition-all duration-250 ease-out',
            theme === 'light'
              ? 'size-3.5 border-[3px] border-foreground bg-background'
              : 'size-1.5 bg-foreground/40',
            'group-hover:size-2 group-hover:border-0 group-hover:bg-amber-500 dark:group-hover:bg-amber-400',
          )}
        />
      </button>

      {/* Lua (Dark Mode) */}
      <button
        type="button"
        aria-label="Tema escuro"
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme('dark')}
        className="group relative grid size-7 cursor-pointer place-items-center rounded-full transition-colors duration-200 outline-none hover:bg-foreground/[0.07] dark:hover:bg-white/[0.1]"
      >
        <span
          className={cn(
            'relative z-10 block rounded-full transition-all duration-250 ease-out',
            theme === 'dark'
              ? 'size-3.5 border-[3px] border-foreground bg-background'
              : 'size-1.5 bg-foreground/40',
            'group-hover:scale-0 group-hover:opacity-0',
          )}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 grid scale-50 place-items-center opacity-0 transition-all duration-250 ease-out group-hover:scale-100 group-hover:opacity-100"
        >
          <span className="animate-sun-glow absolute inset-1 rounded-full bg-foreground/10 blur-[1.5px]" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="animate-moon-tilt relative size-4.5 overflow-visible"
          >
            <path
              d="M19.2 14.6A7.2 7.2 0 0 1 9.4 4.8a7.2 7.2 0 1 0 9.8 9.8Z"
              className="fill-foreground"
            />
            <path
              d="M17.5 3.5 L18.1 5.1 L19.7 5.7 L18.1 6.3 L17.5 7.9 L16.9 6.3 L15.3 5.7 L16.9 5.1 Z"
              className="animate-star-twinkle fill-amber-400"
              style={{ transformOrigin: '17.5px 5.7px' }}
            />
            <circle
              cx="13.8"
              cy="4.2"
              r="1.05"
              className="animate-star-twinkle fill-foreground"
              style={{ animationDelay: '450ms', transformOrigin: '13.8px 4.2px' }}
            />
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
