import { useEffect, useState } from 'react'

import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { ProjectDetail } from '@/components/project-detail'
import { WorkGrid } from '@/components/work-grid'
import { work } from '@/data/work'

function getProjectIdFromHash() {
  const hash = window.location.hash
  if (hash.startsWith('#project/')) {
    return hash.slice('#project/'.length)
  }
  return null
}

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => getProjectIdFromHash())

  useEffect(() => {
    const onHashChange = () => setActiveProjectId(getProjectIdFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const activeProject = activeProjectId ? work.find((w) => w.id === activeProjectId && w.caseStudy) : null

  if (activeProject) {
    return (
      <ProjectDetail
        item={activeProject}
        onBack={() => {
          window.history.pushState(null, '', window.location.pathname)
          setActiveProjectId(null)
        }}
      />
    )
  }

  return (
    <main className="min-h-svh">
      <Hero />
      <WorkGrid />
      <Footer />
    </main>
  )
}
