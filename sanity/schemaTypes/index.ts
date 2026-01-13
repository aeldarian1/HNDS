import chronicle from './chronicle'
import event from './event'
import galleryItem from './galleryItem'
import page from './page'
import partner from './partner'
import siteSettings from './siteSettings'
import teamMember from './teamMember'

export const schemaTypes = [
  // Content types
  event,
  galleryItem,
  chronicle,
  teamMember,
  partner,
  
  // Site configuration
  page,
  siteSettings,
]
