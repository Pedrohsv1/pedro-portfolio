import { useRef, useState, type PointerEvent } from 'react'

/** Live, interactive "snippet" tiles rendered directly in the masonry grid. */

export function OrbSnippet() {
  return (
    <div className="relative grid size-full place-items-center overflow-hidden bg-[#101012]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative size-44">
        <div className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,#ffffff,#71717a,#27272a,#d4d4d8,#ffffff)] opacity-70 blur-2xl [animation-duration:7s]" />
        <div className="absolute inset-6 animate-spin rounded-full bg-[conic-gradient(from_180deg,#fafafa,#52525b,#fafafa)] opacity-85 blur-md [animation-direction:reverse] [animation-duration:5s]" />
        <div className="absolute inset-12 rounded-full bg-white/80 blur-lg" />
      </div>
      <span className="absolute top-3.5 left-4 font-mono text-[10px] tracking-wider text-white/40">orb.frag</span>
    </div>
  )
}

export function MagneticSnippet() {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * 0.28,
      y: (e.clientY - (r.top + r.height / 2)) * 0.28,
    })
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
      className="shopify-grid-bg relative grid size-full place-items-center bg-[#f4f4f6] dark:bg-[#141417]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(244,244,246,0.92)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_35%,rgba(20,20,23,0.92)_100%)]"
      />
      <button
        ref={ref}
        type="button"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className="polaris-pill-primary relative z-10 cursor-pointer rounded-full px-5 py-2.5 text-[13px] font-medium tracking-[-0.01em] transition-transform duration-200 ease-out"
      >
        Passe o mouse
      </button>
    </div>
  )
}

const code = `export const spring = (
  t: number,
  damping = 0.6,
  freq = 4.5,
) =>
  1 - Math.exp(-damping * 10 * t)
    * Math.cos(freq * Math.PI * t)`

export function CodeSnippet() {
  return (
    <div className="flex size-full flex-col justify-center overflow-hidden bg-[#101012] p-6 font-mono text-[13px] leading-relaxed">
      <div className="mb-4 flex gap-1.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
      </div>
      <pre className="whitespace-pre text-[#d4d4d8]">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-3 text-right text-white/25 select-none">{i + 1}</span>
            <span
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/(export|const|number)/g, '<span style="color:#ffffff;font-weight:500">$1</span>')
                  .replace(/(\d+\.?\d*)/g, '<span style="color:#a1a1aa">$1</span>')
                  .replace(/(Math)/g, '<span style="color:#e4e4e7">$1</span>'),
              }}
            />
          </div>
        ))}
      </pre>
    </div>
  )
}

export const snippets = {
  orb: OrbSnippet,
  magnetic: MagneticSnippet,
  code: CodeSnippet,
}
