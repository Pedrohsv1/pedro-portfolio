import { useState } from 'react'
import { Asterisk, Check, Copy } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { profile } from '@/data/profile'

export function Navbar() {
  const [copied, setCopied] = useState(false)

  function handleCopyEmail() {
    navigator.clipboard?.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="relative z-30 w-full pt-4 pb-2">
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            if (window.location.pathname !== '/' || window.location.hash) {
              window.history.pushState(null, '', '/')
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="polaris-floating-bar group inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium tracking-[-0.015em] text-foreground transition-all duration-200 hover:-translate-y-[1px] hover:border-foreground/20 hover:bg-card dark:hover:border-white/20"
        >
          <Asterisk className="size-3.5 text-muted-foreground transition-transform duration-500 ease-out group-hover:rotate-180 group-hover:text-foreground" />
          <span>{profile.name}</span>
        </a>

        <nav
          aria-label="Navegação principal"
          className="polaris-floating-bar flex items-center gap-1 rounded-full p-1"
        >
          <a
            href="#work"
            className="inline-flex h-7 items-center rounded-full px-3 text-[12.5px] font-medium tracking-[-0.01em] text-muted-foreground transition-all duration-200 hover:bg-foreground/[0.08] hover:text-foreground dark:hover:bg-white/[0.12]"
          >
            Trabalhos
          </a>
          <a
            href="#sobre"
            className="inline-flex h-7 items-center rounded-full px-3 text-[12.5px] font-medium tracking-[-0.01em] text-muted-foreground transition-all duration-200 hover:bg-foreground/[0.08] hover:text-foreground dark:hover:bg-white/[0.12]"
          >
            Sobre
          </a>

          <span aria-hidden className="mx-0.5 h-3.5 w-px bg-border" />

          <button
            type="button"
            onClick={handleCopyEmail}
            className="group inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium tracking-[-0.01em] text-muted-foreground transition-all duration-200 hover:bg-foreground/[0.08] hover:text-foreground dark:hover:bg-white/[0.12]"
            title={`Copiar ${profile.email}`}
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-500" />
                <span className="hidden text-foreground sm:inline">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="size-3 transition-transform duration-200 group-hover:scale-110" />
                <span className="hidden sm:inline">E-mail</span>
              </>
            )}
          </button>

          <span aria-hidden className="mx-0.5 h-3.5 w-px bg-border" />

          <ThemeToggle className="px-0.5" />
        </nav>
      </div>
    </header>
  )
}
