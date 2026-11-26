import { useEffect, useState } from 'react'

import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { ProjectDetail } from '@/components/project-detail'
import { WorkGrid } from '@/components/work-grid'
import { profile } from '@/data/profile'
import { getProjectById } from '@/data/work'
import {
  buildProjectPath,
  navigateTo,
  parseRouteFromLocation,
  subscribeToNavigation,
  type AppRoute,
} from '@/lib/router'

const DEFAULT_TITLE = `${profile.name} · UI/UX & Fullstack`
const DEFAULT_DESCRIPTION =
  'Portfólio de Pedro Varela, UI/UX e Fullstack em Natal/RN. Interfaces web responsivas, Design Systems, sistemas industriais e dashboards, do Figma ao código.'

function updateMetaDescription(content: string) {
  const tag = document.querySelector('meta[name="description"]')
  if (tag) {
    tag.setAttribute('content', content)
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseRouteFromLocation().route)

  useEffect(() => {
    const syncRoute = () => {
      const { route: nextRoute, legacyRedirectPath } = parseRouteFromLocation()
      if (legacyRedirectPath) {
        window.history.replaceState(null, '', legacyRedirectPath)
      }
      setRoute(nextRoute)
    }

    syncRoute()
    return subscribeToNavigation(syncRoute)
  }, [])

  const activeProject = getProjectById(route.projectId)

  useEffect(() => {
    if (activeProject) {
      document.title = `${activeProject.title} · ${profile.name}`
      updateMetaDescription(`${activeProject.subtitle} Projeto de ${profile.name} (${activeProject.client}).`)
    } else {
      document.title = DEFAULT_TITLE
      updateMetaDescription(DEFAULT_DESCRIPTION)
    }
  }, [activeProject])

  if (activeProject) {
    return (
      <ProjectDetail
        key={`${activeProject.id}-${route.sectionId ?? 'top'}`}
        project={activeProject}
        initialSectionId={route.sectionId}
        onBack={() => navigateTo('/')}
        onSelectProject={(projectId) => navigateTo(buildProjectPath(projectId))}
      />
    )
  }

  return (
    <main className="min-h-svh">
      <Navbar />
      <Hero />
      <WorkGrid />
      <AboutSection />
      <Footer />
    </main>
  )
}
