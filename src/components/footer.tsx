import { ArrowUp } from 'lucide-react'

import { brandIcons } from '@/components/brand-icons'
import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="mt-10 px-3 sm:px-6">
      {/* Top line */}
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-4 px-1 pb-3 text-[12px] text-muted-foreground">
        <span>Feito em {profile.location}</span>
        <span className="text-right">{profile.footerNote}</span>
      </div>

      {/* Blue gradient panel */}
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-t-2xl bg-gradient-to-b from-primary via-[#6f93ff] to-background">
        {/* halftone dot texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 0.6px, transparent 0.6px)',
            backgroundSize: '4px 4px',
          }}
        />

        <nav className="relative flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 pt-24 pb-10 text-[13px] text-white">
          {profile.links.map((l) => {
            const Icon = brandIcons[l.type]
            return (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100"
              >
                <Icon className="size-3" />
                <span className="underline-offset-4 hover:underline">{l.label}</span>
              </a>
            )
          })}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex cursor-pointer items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
          >
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span className="underline-offset-4 group-hover:underline">Voltar ao topo</span>
          </button>
        </nav>

        {/* Giant name, cropped at the bottom */}
        <div
          aria-hidden
          className="relative -mb-[0.28em] text-center text-[clamp(4rem,17vw,15rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-white/80 select-none"
        >
          {profile.fullName}
        </div>
      </div>
    </footer>
  )
}
