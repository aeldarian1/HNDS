# WordPress Content Import Summary

## Overview
Successfully imported **ALL available content** from the old HNDS WordPress website (https://hnds.hr) using the WordPress REST API.

## 📊 Import Statistics

### Content Imported
- **Total Posts**: 193 events/articles
- **Pages Analyzed**: 12 pages
- **Date Range**: Historical content through 2026

### Category Breakdown
The imported content includes various types of posts:

1. **Category 135** (44 posts) - Chronicles/Kronika
   - HD Kronika publications
   - Historical chronicles

2. **Category 129** (43 posts) - Events/Događaji
   - General society events
   - Meetings and gatherings
   - Ambassador visits

3. **Category 8** (31 posts) - Cultural Events
   - Presentations
   - Lectures
   - Commemorations

4. **Category 40** (15 posts) - Specialized content
5. **Category 1** (14 posts) - General posts
6. **Category 20** (11 posts) - Regional events (Makarska branch)
7. **Category 38** (10 posts) - Additional content
8. **Category 26** (9 posts) - German language content
9. **Category 36** (8 posts)
10. **Category 24** (7 posts) - Multilingual content

### Sample Content Imported

**Recent Events (2025-2026):**
- Blagdansko druženje 2025 (Holiday gathering)
- HD Kronika #44 – Božić 2025 (Christmas chronicle)
- Zaključak poslovne godine uz bakalar (Year-end meeting)
- Novi veleposlanik SR Njemačke u Splitu (German Ambassador visit)
- Volkstrauertag 2025 (German Memorial Day)
- Various exhibitions and cultural events

**Historical Content:**
- Multiple HD Kronika editions from 2008-2025
- Photo gallery events
- Cultural exchanges
- Educational programs

## Integration Details

### Files Created
1. **`scripts/importWordPressContent.ts`** - Advanced import script with pagination
   - Fetches ALL posts from WordPress (not just first page)
   - Handles pagination automatically
   - Includes rate limiting to avoid overwhelming server
   - Transforms and cleans content

2. **`scripts/analyzeContent.ts`** - Content analysis tool
   - Analyzes category distribution
   - Shows content statistics
   - Helps understand the imported data structure

3. **`data/wordpress-events.json`** - Transformed events (**193 entries**)
4. **`data/wordpress-posts-raw.json`** - Raw post metadata for reference
5. **`data/wordpress-pages.json`** - Page information (12 pages)

### Updated Files
- **`app/events/page.tsx`** - Now displays **ALL 193 WordPress events** alongside custom events
  - Added proper TypeScript types for event handling
  - WordPress events show "hnds.hr" badge
  - Links open to original WordPress URLs (external links with icon)
  - Sorted by date (most recent first)
  - "Show all events" button reveals complete archive
  - Fully responsive with animations

## Sample Imported Events

**Most Recent (2025-2026):**
1. **Blagdansko druženje 2025** (December 28, 2025)
2. **HD Kronika #44 – Božić 2025** (December 15, 2025)
3. **Zaključak poslovne godine uz bakalar** (December 7, 2025)
4. **Novi veleposlanik SR Njemačke u Splitu** (November 21, 2025)
5. **Volkstrauertag 2025** (November 12, 2025)

## Features

### Event Display
- ✅ WordPress events are clearly marked with "hnds.hr" badge
- ✅ Links open to original WordPress articles in new tab
- ✅ Preserves event titles in Croatian
- ✅ Shows event dates in Croatian format
- ✅ Includes event descriptions (truncated to 300 characters)
- ✅ Filter functionality works with WordPress events
- ✅ "Show all events" button when more than 12 events

### Data Quality
- ✅ HTML tags removed from descriptions
- ✅ HTML entities properly decoded (–, ", …, etc.)
- ✅ Croatian special characters preserved (č, ć, š, ž, đ)
- ✅ Dates formatted in Croatian locale
- ✅ Sorted chronologically (newest first)

## How to Update WordPress Content

To fetch the latest content from WordPress:

```bash
npx ts-node scripts/importWordPressContent.ts
```

This will:
1. Fetch the latest 50 posts from WordPress API
2. Transform and clean the content
3. Update `data/wordpress-events.json`
4. The Events page will automatically show updated content

## WordPress API Endpoints Used

- **Posts**: `https://hnds.hr/wp-json/wp/v2/posts?per_page=50`
- **Pages**: `https://hnds.hr/wp-json/wp/v2/pages?per_page=50`

## Next Steps (Optional Enhancements)

1. **Automatic Updates**: Set up a cron job or GitHub Action to periodically fetch WordPress content
2. **Image Import**: Import featured images from WordPress posts
3. **Categories**: Import and display WordPress categories
4. **Full Content Pages**: Create individual event detail pages with full content
5. **Search Functionality**: Add search across WordPress events
6. **Pagination**: Add pagination for large event lists
7. **Archive Pages**: Create monthly/yearly archive pages

## Technical Notes

- WordPress content is read-only (not creating/editing content on WordPress)
- Original WordPress site remains unchanged
- All links point back to original WordPress articles
- Content is statically imported (not real-time API calls)
- Build-time data fetching ensures fast page loads

## Content Ownership

All content is copyrighted by Hrvatsko-njemačko društvo Split (HNDS).
Original articles: https://hnds.hr
