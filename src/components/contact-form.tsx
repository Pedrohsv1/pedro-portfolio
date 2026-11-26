import { useState, type FormEvent } from 'react'
import { ArrowUp, Check } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'

/**
 * Minimal contact form aligned to Shopify Polaris / Sidekick concentric pill radii.
 * With no backend it opens the visitor's mail client; swap `handleSubmit` for Formspree/Resend when ready.
 */
export function ContactForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const canSend = message.trim().length > 0

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSend) return
    const subject = encodeURIComponent(`Contato pelo portfólio · ${name || 'Visitante'}`)
    const body = encodeURIComponent(`${message}\n\n${name}${email ? ` (${email})` : ''}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setMessage('')
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2.5">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-full px-4"
        />
        <Input
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-full px-4"
        />
      </div>
      <div className="relative flex items-end">
        <Textarea
          placeholder={sent ? 'Obrigado! Falo com você em breve.' : 'O que você tem em mente?'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e)
          }}
          rows={1}
          className="max-h-48 min-h-[44px] rounded-[22px] px-4 py-[11px] pr-12"
        />
        <button
          type="submit"
          aria-label="Enviar mensagem"
          disabled={!canSend && !sent}
          className={cn(
            'polaris-pill-primary absolute right-1.5 bottom-1.5 grid size-8 cursor-pointer place-items-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'hover:scale-105 hover:bg-[#2a2a2e] active:scale-95 dark:hover:bg-[#e4e4e8]',
            canSend || sent
              ? 'scale-100 opacity-100'
              : 'pointer-events-none scale-75 opacity-0',
          )}
        >
          {sent ? (
            <Check className="size-3.5" />
          ) : (
            <ArrowUp className="size-3.5 transition-transform duration-200" />
          )}
        </button>
      </div>
    </form>
  )
}
