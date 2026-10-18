import { useRef, useState, type PointerEvent } from 'react'

/** Live, interactive "snippet" tiles rendered directly in the 2-column grid. */

export function OrbSnippet() {
  return (
    <div className="relative grid size-full place-items-center overflow-hidden bg-[#0d1020]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative size-44">
        <div className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,#ff3d9a,#6a5cff,#1f5bff,#25d0ff,#ff3d9a)] blur-2xl [animation-duration:6s]" />
        <div className="absolute inset-6 animate-spin rounded-full bg-[conic-gradient(from_180deg,#ff7ac4,#7f8cff,#ff7ac4)] opacity-90 blur-md [animation-direction:reverse] [animation-duration:4s]" />
        <div className="absolute inset-12 rounded-full bg-white/70 blur-lg" />
      </div>
      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wider text-white/40">orb.frag</span>
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
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.35, y: (e.clientY - (r.top + r.height / 2)) * 0.35 })
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
      className="grid size-full place-items-center bg-[#e9edf5]"
    >
      <button
        ref={ref}
        type="button"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px] shadow-primary/70 transition-transform duration-200 ease-out"
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
    <div className="flex size-full flex-col justify-center overflow-hidden bg-[#0f1424] p-6 font-mono text-[13px] leading-relaxed">
      <div className="mb-4 flex gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <pre className="whitespace-pre text-[#c9d3ee]">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-3 text-right text-white/20 select-none">{i + 1}</span>
            <span
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/(export|const|number)/g, '<span style="color:#7aa2ff">$1</span>')
                  .replace(/(\d+\.?\d*)/g, '<span style="color:#ff9ecb">$1</span>')
                  .replace(/(Math)/g, '<span style="color:#7ee0c3">$1</span>'),
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
