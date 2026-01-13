import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

/**
 * TypeScript types for Sanity content
 */

export interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  date: string
  location?: string
  description?: string
  image?: SanityImageSource
  category?: 'workshop' | 'social' | 'course' | 'trip'
  published: boolean
}

export interface GalleryItem {
  _id: string
  title: string
  slug: {
    current: string
  }
  image: SanityImageSource
  description?: string
  year: number
  photographer?: string
  location?: string
  eventDate?: string
  tags?: string[]
  featured: boolean
  published: boolean
}

export interface Chronicle {
  _id: string
  title: string
  slug: {
    current: string
  }
  year: number
  issueNumber?: number
  coverImage: SanityImageSource
  description?: string
  content?: any[] // Portable Text
  highlights?: string[]
  publishedDate?: string
  pdfFile?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  published: boolean
}

export interface TeamMember {
  _id: string
  name: string
  slug: {
    current: string
  }
  position: string
  photo: SanityImageSource
  bio?: string
  email?: string
  phone?: string
  branch?: 'split' | 'makarska' | 'brac' | 'sinj' | 'trogir' | 'berlin'
  socialMedia?: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  order: number
  active: boolean
}

export interface Partner {
  _id: string
  name: string
  slug: {
    current: string
  }
  logo: SanityImageSource
  description?: string
  website?: string
  partnershipType?: 'strategic' | 'institutional' | 'community' | 'sponsor'
  partnershipStartDate?: string
  order: number
  active: boolean
}
