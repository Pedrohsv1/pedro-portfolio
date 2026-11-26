import { ArrowUp } from 'lucide-react'

import { brandIcons } from '@/components/brand-icons'
import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="mt-10 px-3 sm:px-6">
      {/* Top line */}
      <div className="mx-auto flex max-w-[1360px] items-end justify-between gap-4 px-1 pb-3 text-[12px] text-muted-foreground">
        <span>Feito em {profile.location}</span>
        <span className="text-right">{profile.footerNote}</span>
      </div>

      {/* Shopify soft-obsidian monochrome footer panel (replaces blue gradient) */}
      <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-t-[24px] border border-b-0 border-white/[0.08] bg-gradient-to-b from-[#141417] via-[#101012] to-[#0b0b0d]">
        {/* subtle dot texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.45) 0.6px, transparent 0.6px)',
            backgroundSize: '4px 4px',
          }}
        />

        <nav className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 pt-20 pb-10 text-[13px] text-white/80">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <span className="underline-offset-4 hover:underline">{profile.email}</span>
          </a>
          {profile.links.map((l) => {
            const Icon = brandIcons[l.type]
            return (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Icon className="size-3.5" />
                <span className="underline-offset-4 hover:underline">{l.label}</span>
              </a>
            )
          })}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-white"
          >
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span className="underline-offset-4 group-hover:underline">Voltar ao topo</span>
          </button>
        </nav>

        {/* Giant name, cropped at the bottom */}
        <div
          aria-hidden
          className="relative -mb-[0.28em] bg-gradient-to-b from-white/85 via-white/55 to-white/15 bg-clip-text text-center text-[clamp(4rem,17vw,15rem)] leading-none font-semibold tracking-[-0.045em] whitespace-nowrap text-transparent select-none"
        >
          {profile.fullName}
        </div>
      </div>
    </footer>
  )
}
