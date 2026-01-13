import { client } from './client'

/**
 * Queries for fetching content from Sanity
 */

// Events
export async function getEvents() {
  return client.fetch(
    `*[_type == "event" && published == true] | order(date desc) {
      _id,
      title,
      slug,
      date,
      location,
      description,
      image,
      category,
      published
    }`
  )
}

export async function getEvent(slug: string) {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      date,
      location,
      description,
      image,
      category,
      published
    }`,
    { slug }
  )
}

// Gallery Items
export async function getGalleryItems(year?: number) {
  const query = year
    ? `*[_type == "galleryItem" && published == true && year == $year] | order(eventDate desc)`
    : `*[_type == "galleryItem" && published == true] | order(year desc, eventDate desc)`
  
  return client.fetch(
    `${query} {
      _id,
      title,
      slug,
      image,
      description,
      year,
      photographer,
      location,
      eventDate,
      tags,
      featured
    }`,
    year ? { year } : {}
  )
}

export async function getFeaturedGalleryItems() {
  return client.fetch(
    `*[_type == "galleryItem" && published == true && featured == true] | order(year desc) [0...6] {
      _id,
      title,
      slug,
      image,
      description,
      year,
      location
    }`
  )
}

export async function getGalleryYears() {
  return client.fetch(
    `*[_type == "galleryItem" && published == true] | order(year desc) {
      "year": year
    } | {"years": array::unique([...year])}`
  )
}

// Chronicles
export async function getChronicles(year?: number) {
  const query = year
    ? `*[_type == "chronicle" && published == true && year == $year] | order(issueNumber desc)`
    : `*[_type == "chronicle" && published == true] | order(year desc, issueNumber desc)`
  
  return client.fetch(
    `${query} {
      _id,
      title,
      slug,
      year,
      issueNumber,
      coverImage,
      description,
      highlights,
      publishedDate,
      pdfFile
    }`,
    year ? { year } : {}
  )
}

export async function getChronicle(slug: string) {
  return client.fetch(
    `*[_type == "chronicle" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      year,
      issueNumber,
      coverImage,
      description,
      content,
      highlights,
      publishedDate,
      pdfFile
    }`,
    { slug }
  )
}

export async function getChronicleYears() {
  return client.fetch(
    `*[_type == "chronicle" && published == true] | order(year desc) {
      "year": year
    } | {"years": array::unique([...year])}`
  )
}

// Team Members
export async function getTeamMembers(branch?: string) {
  const query = branch
    ? `*[_type == "teamMember" && active == true && branch == $branch] | order(order asc)`
    : `*[_type == "teamMember" && active == true] | order(order asc)`
  
  return client.fetch(
    `${query} {
      _id,
      name,
      slug,
      position,
      photo,
      bio,
      email,
      phone,
      branch,
      socialMedia,
      order
    }`,
    branch ? { branch } : {}
  )
}

export async function getTeamMember(slug: string) {
  return client.fetch(
    `*[_type == "teamMember" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      position,
      photo,
      bio,
      email,
      phone,
      branch,
      socialMedia
    }`,
    { slug }
  )
}

// Partners
export async function getPartners() {
  return client.fetch(
    `*[_type == "partner" && active == true] | order(order asc) {
      _id,
      name,
      slug,
      logo,
      description,
      website,
      partnershipType,
      partnershipStartDate
    }`
  )
}

export async function getPartner(slug: string) {
  return client.fetch(
    `*[_type == "partner" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      logo,
      description,
      website,
      partnershipType,
      partnershipStartDate
    }`,
    { slug }
  )
}
