# Sanity Studio Setup Guide

## Overview

Your HNDS website now has a fully functional Sanity Studio for content management. You can access it at:

**http://localhost:3000/studio** (when running `npm run dev`)

## What's Included

### Content Types

1. **Events** - Manage workshops, social events, courses, and excursions
   - Title, date, location, description
   - Featured images
   - Categories for easy filtering
   
2. **Gallery Items** - Photo archive management
   - Upload images with metadata
   - Year-based organization
   - Tags, photographer, location info
   - Featured gallery highlights
   
3. **Chronicles** - Newsletter/Chronicle archive
   - Cover images
   - Issue numbers and years
   - Full content with rich text
   - PDF uploads for downloadable versions
   
4. **Team Members** - Leadership and team profiles
   - Photos and bios
   - Contact information
   - Branch assignments
   - Display order control
   - Social media links
   
5. **Partners** - Partnership organizations
   - Logos with transparent backgrounds
   - Partnership types and dates
   - Website links
   - Display order control

### Studio Features

- **Organized Structure**: Content is grouped by type in the sidebar
- **Visual Editing**: Upload images, edit rich text content
- **Draft System**: Preview changes before publishing
- **Search & Filter**: Quickly find content
- **Media Library**: Centralized image management

## How to Use

### 1. Access the Studio

```bash
npm run dev
```

Then open: http://localhost:3000/studio

### 2. Creating Content

#### Creating an Event:
1. Click "Events" in the sidebar
2. Click the "+" button
3. Fill in the event details:
   - Title (required)
   - Generate slug (click "Generate" button)
   - Date & time
   - Location
   - Description
   - Upload featured image
   - Select category
4. Click "Publish"

#### Adding Gallery Items:
1. Click "Gallery" in the sidebar
2. Click "+"
3. Upload image (required)
4. Add title, description
5. Set year (required)
6. Add tags, photographer, location
7. Check "Featured" to show on homepage
8. Click "Publish"

#### Creating Chronicles:
1. Click "Chronicles"
2. Click "+"
3. Upload cover image
4. Set year and issue number
5. Add description and highlights
6. Write full content using rich text editor
7. Upload PDF version (optional)
8. Click "Publish"

#### Managing Team Members:
1. Click "Team Members"
2. Click "+"
3. Upload photo
4. Enter name, position
5. Write bio
6. Add contact info (email, phone)
7. Select branch
8. Set display order (0 = first)
9. Add social media links (optional)
10. Click "Publish"

#### Adding Partners:
1. Click "Partners"
2. Click "+"
3. Upload logo (transparent PNG recommended)
4. Enter organization name
5. Add description
6. Enter website URL
7. Select partnership type
8. Set display order
9. Click "Publish"

### 3. Editing Existing Content

1. Click the content type in sidebar
2. Click the item you want to edit
3. Make your changes
4. Click "Publish" to save

### 4. Deleting Content

1. Open the document
2. Click the menu (three dots) in the top right
3. Select "Delete"
4. Confirm deletion

### 5. Unpublishing Content

Instead of deleting, you can unpublish content:
1. Open the document
2. Uncheck "Published" field
3. Click "Publish" to save

The content will be hidden on the website but preserved in Sanity.

## Integrating with Your Frontend

The helper functions are already created in `/sanity/lib/queries.ts`. Here's how to use them:

### Example: Fetching Events

```typescript
import { getEvents, getEvent } from '@/sanity/lib/queries'

// Get all events
const events = await getEvents()

// Get single event by slug
const event = await getEvent('summer-workshop-2026')
```

### Example: Fetching Gallery Items

```typescript
import { getGalleryItems, getFeaturedGalleryItems } from '@/sanity/lib/queries'

// Get all gallery items
const galleryItems = await getGalleryItems()

// Get gallery items from specific year
const items2025 = await getGalleryItems(2025)

// Get featured items for homepage
const featured = await getFeaturedGalleryItems()
```

### Example: Displaying Images

```typescript
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'

// In your component
<Image
  src={urlForImage(event.image).url()}
  alt={event.title}
  width={800}
  height={600}
/>
```

### Example: Using in a Page

```tsx
// app/events/page.tsx
import { getEvents } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'

export default async function EventsPage() {
  const events = await getEvents()
  
  return (
    <div>
      <h1>Events</h1>
      <div className="grid grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id}>
            {event.image && (
              <Image
                src={urlForImage(event.image).width(400).url()}
                alt={event.title}
                width={400}
                height={300}
              />
            )}
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Tips & Best Practices

### Image Management
- **Use WebP or PNG** for logos with transparency
- **Use JPEG** for photos (smaller file size)
- **Recommended sizes**:
  - Event images: 1200x800px
  - Gallery photos: 1920x1080px
  - Team photos: 400x400px (square)
  - Partner logos: 300x300px max

### Content Organization
- **Use Display Order**: Lower numbers appear first (0, 1, 2, etc.)
- **Use Featured flag**: Highlight important gallery items
- **Use Tags**: Make gallery items searchable
- **Use Categories**: Organize events by type

### Publishing Workflow
1. Create content as draft
2. Preview on website (if preview mode enabled)
3. Make adjustments
4. Publish when ready
5. Unpublish to hide without deleting

### Batch Operations
- You can duplicate documents using the menu
- Use filters to find specific content quickly
- Sort by date, order, or other fields

## Environment Variables

Your Sanity configuration is in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="lyaa7xcj"
NEXT_PUBLIC_SANITY_DATASET="production"
```

**Never commit these to a public repository!**

## Deployment

When deploying your website:

1. The Studio is included in your Next.js build
2. Access it at `https://yourdomain.com/studio`
3. Set up authentication in Sanity dashboard
4. Invite team members with appropriate roles

## Managing Access

To add editors to your Sanity Studio:

1. Go to https://sanity.io/manage
2. Select your project (lyaa7xcj)
3. Go to "Members" section
4. Invite users with Editor or Administrator roles

## Support

- **Sanity Documentation**: https://www.sanity.io/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Schema Reference**: https://www.sanity.io/docs/schema-types

## Next Steps

1. **Access the Studio**: http://localhost:3000/studio
2. **Create sample content**: Add 1-2 items in each content type
3. **Test the queries**: Use the helper functions in your pages
4. **Customize**: Adjust schemas in `/sanity/schemaTypes/` as needed
5. **Deploy**: Push to production and set up authentication

Your content management system is ready to use! 🎉
