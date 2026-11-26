import type { MouseEvent } from 'react'

export type AppRoute = {
  projectId: string | null
  sectionId: string | null
}

const NAVIGATE_EVENT = 'portfolio:navigate'
const PROJECTS_PREFIX = '/projetos/'
const LEGACY_HASH_PREFIX = '#project/'

export function buildProjectPath(projectId: string, sectionId?: string | null): string {
  const safeProject = encodeURIComponent(projectId)
  if (sectionId) {
    return `${PROJECTS_PREFIX}${safeProject}/${encodeURIComponent(sectionId)}`
  }
  return `${PROJECTS_PREFIX}${safeProject}`
}

export function parseRouteFromLocation(): { route: AppRoute; legacyRedirectPath: string | null } {
  const { pathname, hash } = window.location

  if (hash.startsWith(LEGACY_HASH_PREFIX)) {
    const [rawProject, rawSection] = hash.slice(LEGACY_HASH_PREFIX.length).split('/')
    const projectId = rawProject ? decodeURIComponent(rawProject) : null
    const sectionId = rawSection ? decodeURIComponent(rawSection) : null
    if (projectId) {
      return {
        route: { projectId, sectionId },
        legacyRedirectPath: buildProjectPath(projectId, sectionId),
      }
    }
  }

  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  if (normalizedPath.startsWith(PROJECTS_PREFIX)) {
    const [rawProject, rawSection] = normalizedPath.slice(PROJECTS_PREFIX.length).split('/')
    const projectId = rawProject ? decodeURIComponent(rawProject) : null
    const sectionId = rawSection ? decodeURIComponent(rawSection) : null
    return {
      route: { projectId, sectionId },
      legacyRedirectPath: null,
    }
  }

  return {
    route: { projectId: null, sectionId: null },
    legacyRedirectPath: null,
  }
}

export function navigateTo(path: string, options?: { replace?: boolean }) {
  if (options?.replace) {
    window.history.replaceState(null, '', path)
  } else {
    window.history.pushState(null, '', path)
  }
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

export function subscribeToNavigation(listener: () => void): () => void {
  window.addEventListener('popstate', listener)
  window.addEventListener('hashchange', listener)
  window.addEventListener(NAVIGATE_EVENT, listener)

  return () => {
    window.removeEventListener('popstate', listener)
    window.removeEventListener('hashchange', listener)
    window.removeEventListener(NAVIGATE_EVENT, listener)
  }
}

export function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}
