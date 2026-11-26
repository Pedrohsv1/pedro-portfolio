import rawProfile from '@/content/profile.json'
import type { ProfileData } from '@/types/portfolio'

export type { LinkType, ProfileData, ProfileLink, ExperienceItem } from '@/types/portfolio'

export const profile = rawProfile as ProfileData
