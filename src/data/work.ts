import rawGallery from '@/content/gallery.json'
import rawProjects from '@/content/projects.json'
import type { GalleryTile, ProjectData } from '@/types/portfolio'

export type {
  CoverMockupConfig,
  CoverMockupTheme,
  CoverMockupVariant,
  GalleryCategory,
  GalleryTile,
  ProjectData,
  ProjectMedia,
  ProjectSection,
  ProjectType,
  SnippetKey,
  TileSize,
} from '@/types/portfolio'

export const projects = rawProjects as ProjectData[]
export const gallery = rawGallery as GalleryTile[]

export function getProjectById(id: string | null): ProjectData | null {
  if (!id) return null
  return projects.find((project) => project.id === id) ?? null
}

export function getNextProject(currentId: string): ProjectData | null {
  if (projects.length <= 1) return null
  const idx = projects.findIndex((project) => project.id === currentId)
  if (idx === -1) return projects[0]
  return projects[(idx + 1) % projects.length]
}
