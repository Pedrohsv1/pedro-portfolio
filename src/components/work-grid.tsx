import { useState } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkCard } from '@/components/work-card'
import { work, type WorkKind } from '@/data/work'

type Filter = 'all' | WorkKind

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>('all')
  const hasSnippets = work.some((w) => w.kind === 'snippet')
  const sortedWork = [...work].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)))
  const items = filter === 'all' ? sortedWork : sortedWork.filter((w) => w.kind === filter)

  return (
    <section id="work" className="w-full overflow-x-clip scroll-mt-6 pb-24">
      {/* Sticky full-viewport-width bar: uses bg-background tone (not pure white) so there's zero visible seam against the page background */}
      <div className="sticky top-0 z-30 mb-3 w-full pt-3.5 pb-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/15 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 sm:px-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="items-start">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="project">Projetos</TabsTrigger>
              <TabsTrigger value="snippet" disabled={!hasSnippets} title={!hasSnippets ? 'Em breve' : undefined}>
                Snippets
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Larger 2-column side-by-side grid (matching the reference), keeping the stagger animation on filter change */}
      <div
        key={filter}
        className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2"
      >
        {items.map((item, i) => (
          <WorkCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
