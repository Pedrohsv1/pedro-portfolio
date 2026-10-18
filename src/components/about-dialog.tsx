import { MapPin } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { brandIcons } from '@/components/brand-icons'
import { profile } from '@/data/profile'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[440px]">
        <div className="relative aspect-[4/3] w-full bg-card">
          <img src={profile.photo} alt={profile.name} className="size-full object-cover object-[50%_25%]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-popover to-transparent" />
        </div>

        <div className="grid gap-4 px-6 pb-6">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {profile.name} <span className="font-normal text-muted-foreground">· {profile.role}</span>
            </DialogTitle>
            <DialogDescription className="flex items-center gap-1 text-xs">
              <MapPin className="size-3" /> {profile.location}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 text-sm leading-relaxed text-foreground/80">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="flex items-center gap-1 pt-1">
            {profile.links.map((l) => {
              const Icon = brandIcons[l.type]
              return (
                <Button key={l.href} variant="ghost" size="icon" asChild>
                  <a href={l.href} target="_blank" rel="noreferrer" aria-label={l.label}>
                    <Icon className="size-4" />
                  </a>
                </Button>
              )
            })}
            <Button className="ml-auto" size="sm" asChild>
              <a href={`mailto:${profile.email}`}>Diga olá</a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
