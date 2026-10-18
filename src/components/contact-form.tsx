import { useState, type FormEvent } from 'react'
import { ArrowUp, Check } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'

/**
 * Minimal contact form. With no backend it opens the visitor's mail client;
 * swap `handleSubmit` for Formspree / Resend / your API when ready.
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
      <div className="grid grid-cols-2 gap-2.5">
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="relative flex items-center">
        <Textarea
          placeholder={sent ? 'Obrigado! Falo com você em breve.' : 'O que você tem em mente?'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e)
          }}
          rows={1}
          className="max-h-48 min-h-11 pr-12"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Enviar mensagem"
          className={cn(
            'absolute right-1 bottom-1 size-9 rounded-[6px] transition-all duration-300',
            canSend || sent ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0',
          )}
        >
          {sent ? <Check className="size-4" /> : <ArrowUp className="size-4" />}
        </Button>
      </div>
    </form>
  )
}
