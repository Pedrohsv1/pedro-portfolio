export type LinkType = 'linkedin' | 'github' | 'x'

export type ProfileLink = {
  type: LinkType
  label: string
  href: string
}

export type ExperienceItem = {
  role: string
  organization: string
  period: string
  summary: string
}

export type ProfileData = {
  name: string
  role: string
  tagline: string
  availability: string
  photo: string
  email: string
  location: string
  fullName: string
  footerNote: string
  bio: string[]
  links: ProfileLink[]
  experiences: ExperienceItem[]
  education: {
    course: string
    institution: string
    period: string
  }[]
  skills: string[]
  languages?: {
    name: string
    level: string
  }[]
}

export type CoverMockupVariant = 'single-closeup' | 'duo-overlap' | 'desktop-mobile'
export type CoverMockupTheme = 'light' | 'dark'

export type CoverMockupConfig = {
  variant: CoverMockupVariant
  theme?: CoverMockupTheme
  primary: string
  primaryAspect?: string
  secondary?: string
  secondaryAspect?: string
}

export type ProjectMedia = {
  type?: 'image' | 'video'
  src: string
  alt: string
  caption?: string
  aspect?: 'wide' | 'modal' | 'mobile'
}

export type ProjectComparison = {
  title?: string
  beforeLabel: string
  afterLabel: string
  before: ProjectMedia
  after: ProjectMedia
}

export type ProjectMosaicRow =
  | {
      layout: 'full'
      items: ProjectMedia[]
    }
  | {
      layout: 'tall-plus-stack'
      tall: ProjectMedia
      stack: ProjectMedia[]
    }
  | {
      layout: 'pair'
      items: ProjectMedia[]
    }
  | {
      layout: 'trio'
      items: ProjectMedia[]
    }

export type ProjectSection = {
  id: string
  eyebrow?: string
  title: string
  description: string
  highlights?: string[]
  comparisons?: ProjectComparison[]
  mosaic?: ProjectMosaicRow[]
  media: ProjectMedia[]
}

export type ProjectType = 'Projeto B2B' | 'Voluntário' | 'Projeto Autoral'

export type ProjectData = {
  id: string
  title: string
  projectType: ProjectType
  subtitle: string
  client: string
  role: string
  period: string
  figmaUrl?: string
  liveUrl?: string
  repoUrl?: string
  heroMedia: ProjectMedia
  overviewTitle: string
  overview: string[]
  processTitle?: string
  process?: string[]
  sections: ProjectSection[]
}

export type TileSize = 'square' | 'landscape' | 'tall' | 'featured'
export type GalleryCategory = 'project' | 'ui'
export type SnippetKey = 'orb' | 'code' | 'magnetic'

export type GalleryTile = {
  id: string
  title: string
  tag: string
  category: GalleryCategory
  tileSize: TileSize
  theme: CoverMockupTheme
  projectId?: string
  sectionId?: string
  mockup?: CoverMockupConfig
  media?: {
    type?: 'image' | 'video'
    src: string
    poster?: string
    alt: string
    fit?: 'cover' | 'contain'
    padding?: boolean
  }
  snippet?: SnippetKey
}
