# Hybrid Translation Architecture - Implementation Guide

## Overview

This document outlines the implementation of a hybrid translation architecture combining:
- **i18next** for UI strings (navigation, buttons, labels)
- **DeepL API** for one-time static page translation (statute, terms, privacy)
- **Sanity CMS** with i18n plugin for dynamic content (news, activities, membership)

## Phase 1: DeepL Static Pages Translation ✅ COMPLETED

### What Was Done:
1. ✅ Installed `deepl-node` package
2. ✅ Created automated translation script ([scripts/translate-static-pages.ts](scripts/translate-static-pages.ts))
3. ✅ Created component updater script ([scripts/update-static-components.ts](scripts/update-static-components.ts))
4. ✅ Translated 113 strings across 3 static pages using DeepL API

### Results:
- **Statute page**: 38 translation keys added
- **Terms page**: 33 translation keys added
- **Privacy page**: 42 translation keys added
- Total: 113 new keys in `locales/hr.json` and `locales/de.json`

### Usage:
```bash
# Run full automation pipeline
npm run translate:automate

# Or run individually:
npm run translate:static          # DeepL translation only
npm run update:static-components  # Component updates only
```

### Translation Keys Added:

#### Statute (pages.statute.*)
- title, subtitle
- mission.* (title, intro, 5 points)
- membership.* (title, types, regular, premium, sponsor, rights, 5 rights)
- organization.* (title, intro, assembly, board, president, secretary, treasurer)
- finance.* (title, intro, 5 sources)
- amendments.* (title, text)
- contact.* (title, text)

#### Terms (pages.terms.*)
- title, subtitle
- acceptance.* (title, text)
- services.* (title, intro, 5 services)
- userResponsibilities.* (title, intro, 5 responsibilities)
- intellectualProperty.* (title, text)
- privacy.* (title, text)
- limitation.* (title, text)
- modifications.* (title, text)
- termination.* (title, text)
- law.* (title, text)
- contact.* (title, text)
- lastUpdated

#### Privacy (pages.privacy.*)
- title, subtitle
- intro.* (title, text)
- dataCollection.* (title, intro, personal, technical, usage, cookies)
- dataUsage.* (title, intro, 5 uses)
- dataSharing.* (title, text)
- dataSecurity.* (title, text)
- cookies.* (title, intro, essential, analytics, preferences, manage)
- rights.* (title, intro, access, rectification, erasure, restriction, portability, objection)
- retention.* (title, text)
- changes.* (title, text)
- contact.* (title, text)
- lastUpdated

### Sample Translations:
```typescript
// Croatian
pages.statute.title: "Statut HNJD-a Split"
pages.statute.mission.title: "Misija i djelatnosti"

// German (via DeepL)
pages.statute.title: "Satzung des HNJD Split"
pages.statute.mission.title: "Mission und Aktivitäten"
```

---

## Phase 2: Sanity CMS Internationalization 🔄 IN PROGRESS

### Objective:
Enable multilingual content management for dynamic content that changes frequently:
- News articles
- Activity listings
- Membership tier descriptions
- FAQs

### Architecture Decision:
**Why Sanity for dynamic content?**
- ✅ Editor-friendly: Non-technical staff can translate content
- ✅ No code deployments needed for content updates
- ✅ Structured content with references and media
- ✅ Live preview in both languages
- ✅ Translation workflows and drafting

**Why NOT put everything in Sanity?**
- ❌ UI strings (buttons, labels) belong in i18next (developer-managed)
- ❌ Static legal pages are one-time translations (DeepL was faster)
- ❌ Navigation and footer rarely change (i18next is simpler)

### Implementation Steps:

#### Step 1: Install Dependencies ✅ COMPLETED
```bash
npm install @sanity/document-internationalization
```

#### Step 2: Configure Sanity Studio
Update `sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity'
import { documentInternationalization } from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { eventSchema, newsSchema, activitySchema, membershipTierSchema } from './lib/sanity-schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'HNDS Website',
  
  projectId,
  dataset,
  
  plugins: [
    documentInternationalization({
      // Supported languages
      supportedLanguages: [
        { id: 'hr', title: 'Croatian' },
        { id: 'de', title: 'German' }
      ],
      
      // Set Croatian as default
      schemaTypes: ['news', 'event', 'activity', 'membershipTier', 'faq'],
    }),
    visionTool(),
  ],
  
  schema: {
    types: [eventSchema, newsSchema, activitySchema, membershipTierSchema, faqSchema],
  },
})
```

#### Step 3: Update Schemas with Language Field

Example for News:
```typescript
export const newsSchema = {
  name: 'news',
  type: 'document',
  title: 'News Article',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      rows: 3,
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{type: 'block'}],
    },
    {
      name: 'image',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Vijesti', value: 'news' },
          { title: 'Događaji', value: 'events' },
          { title: 'Obavijesti', value: 'announcements' },
        ],
      },
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
```

#### Step 4: Create Additional Schemas

**Activity Schema:**
```typescript
export const activitySchema = {
  name: 'activity',
  type: 'document',
  title: 'Activity',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      type: 'string',
      title: 'Activity Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{type: 'block'}],
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Tečajevi jezika', value: 'language-courses' },
          { title: 'Događaji', value: 'events' },
          { title: 'Izleti', value: 'trips' },
          { title: 'Društveni događaji', value: 'social' },
        ],
      },
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Date',
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price (EUR)',
    },
  ],
}
```

**Membership Tier Schema:**
```typescript
export const membershipTierSchema = {
  name: 'membershipTier',
  type: 'document',
  title: 'Membership Tier',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'name',
      type: 'string',
      title: 'Tier Name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      type: 'number',
      title: 'Annual Price (EUR)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    },
    {
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [{type: 'string'}],
    },
    {
      name: 'highlighted',
      type: 'boolean',
      title: 'Highlight This Tier',
      description: 'Display as "Popular" or "Best Value"',
    },
  ],
}
```

#### Step 5: Update Components to Query with Language

Example for News page:
```typescript
// app/vijesti/page.tsx
"use client";

import { useI18n } from '@/app/context/I18nContext';
import { sanityClient } from '@/lib/sanity';

export default function VijesiPage() {
  const { language } = useI18n();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const query = `*[_type == "news" && language == $lang] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        image,
        category,
        publishedAt
      }`;
      
      const data = await sanityClient.fetch(query, { lang: language });
      setNews(data);
    };

    fetchNews();
  }, [language]);

  return (
    // Render news articles
  );
}
```

---

## Phase 3: Current i18next Setup ✅ WORKING

### What's Already Working:
- ✅ Homepage fully translated (200+ keys)
- ✅ Navigation & Footer fully translated
- ✅ Language switcher with localStorage persistence
- ✅ SSR hydration fixed
- ✅ 270+ translation keys in hr.json and de.json
- ✅ Backward-compatible API (no breaking changes)

### Current Translation Structure:
```
locales/
├── hr.json (Croatian - 383+ keys after DeepL additions)
│   ├── navigation.*
│   ├── hero.*
│   ├── features.*
│   ├── news.*
│   ├── gallery.*
│   ├── footer.*
│   ├── errors.*
│   ├── pages.* (NEW: statute, terms, privacy)
│   ├── contact.*
│   ├── common.*
│   └── ui.*
│
└── de.json (German - mirror structure)
```

---

## Content Type Decision Matrix

| Content Type | Solution | Reason | Managed By |
|-------------|----------|---------|------------|
| **UI Strings** (buttons, labels) | i18next | Rarely change, developer control | Developers |
| **Navigation & Footer** | i18next | Rarely change, structural | Developers |
| **Static Legal Pages** | i18next + DeepL | One-time translation, no regular updates | Developers |
| **News Articles** | Sanity CMS | Frequent updates, editors need control | Content Team |
| **Activities** | Sanity CMS | Frequent updates, scheduling | Content Team |
| **Membership Tiers** | Sanity CMS | Occasional updates, pricing | Content Team |
| **FAQs** | Sanity CMS | Occasional updates, questions change | Content Team |
| **Homepage Content** | Hybrid | Hero/features in i18next, dynamic sections in Sanity | Mixed |

---

## Migration Workflow for Existing Content

### For News Articles (currently hardcoded):
1. Create documents in Sanity Studio for Croatian
2. Use "Create Translation" button to create German version
3. Translate content in Sanity Studio (can use DeepL integration)
4. Update `app/vijesti/page.tsx` to fetch from Sanity
5. Remove hardcoded news data

### For Activities (currently hardcoded):
1. Create activity documents in Sanity
2. Create German translations
3. Update `app/aktivnosti/page.tsx` to fetch from Sanity
4. Remove hardcoded activity data

### For Membership Tiers (currently hardcoded):
1. Create tier documents in Sanity
2. Create German translations
3. Update `app/membership/page.tsx` to fetch from Sanity
4. Remove hardcoded tier data

---

## Next Steps

### Immediate (This Session):
- [ ] Complete Sanity config setup
- [ ] Create news/activity/membership schemas
- [ ] Test Sanity Studio with i18n plugin
- [ ] Create sample bilingual documents

### Short-term (Next Few Days):
- [ ] Migrate existing news data to Sanity
- [ ] Migrate activity data to Sanity
- [ ] Update components to fetch from Sanity
- [ ] Test language switching with Sanity content

### Long-term (Ongoing):
- [ ] Train content team on Sanity Studio
- [ ] Set up translation workflows
- [ ] Monitor DeepL API usage
- [ ] Consider adding more languages (Italian, English)

---

## API Usage & Costs

### DeepL API:
- **Current usage**: 6,138 characters
- **Limit**: 500,000 characters/month (free tier)
- **Cost**: Free for now, €5.49/month for 1M characters if needed
- **Usage**: One-time translation of static pages

### Sanity CMS:
- **Current plan**: Free tier (likely)
- **Limits**: 100k API requests, 5GB bandwidth, 3 users
- **Cost**: $15/month for Growth plan if needed
- **Usage**: Dynamic content hosting and management

---

## Benefits of Hybrid Approach

### 1. **Separation of Concerns**
- Developers manage UI strings (git-tracked, reviewed)
- Content team manages content (Sanity Studio, no deployments)

### 2. **Optimal Tool for Each Job**
- i18next: Perfect for UI translations (mature, React-friendly)
- DeepL: Best-in-class translation quality for static content
- Sanity: Powerful CMS for structured multilingual content

### 3. **Scalability**
- Easy to add more languages (just add to both systems)
- Content team can work independently
- Developers focus on features, not content updates

### 4. **Performance**
- i18next: Instant client-side language switching
- Sanity: Fast CDN-cached content delivery
- No excessive API calls (proper caching)

### 5. **Developer Experience**
- Familiar patterns (React hooks, GROQ queries)
- Type-safe (TypeScript throughout)
- Easy testing (mock translations, mock Sanity data)

---

## Technical Reference

### i18next Configuration:
```typescript
// lib/i18n.config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import hrTranslations from '@/locales/hr.json';
import deTranslations from '@/locales/de.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      hr: { translation: hrTranslations },
      de: { translation: deTranslations }
    },
    fallbackLng: 'hr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false
    }
  });
```

### Sanity Client:
```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
});
```

### Language-aware GROQ Queries:
```typescript
// Fetch news in current language
const query = `*[_type == "news" && language == $lang] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  image,
  category,
  publishedAt
}`;

const news = await sanityClient.fetch(query, { lang: language });
```

---

## Troubleshooting

### Issue: DeepL API Key Not Found
**Solution**: Ensure `DEEPL_API_KEY` is in `.env.local`:
```bash
DEEPL_API_KEY=your-api-key-here
```

### Issue: Sanity Studio Not Loading
**Solution**: Check `sanity.config.ts` has correct projectId and dataset

### Issue: Language Not Switching
**Solution**: 
1. Check localStorage for language preference
2. Clear cache and reload
3. Verify `useI18n()` hook is being used

### Issue: Translations Missing
**Solution**:
1. Check key exists in `locales/hr.json` and `locales/de.json`
2. Verify correct nesting: `t('pages.statute.title')` not `t('statute.title')`
3. Restart dev server after locale file changes

---

## Success Metrics

✅ **Phase 1 Complete (DeepL Static Pages)**:
- 113 strings translated in < 2 minutes
- Zero manual translation work
- Production-ready German translations

🔄 **Phase 2 In Progress (Sanity CMS)**:
- Plugin installed
- Schemas need creation
- Configuration pending

✅ **Phase 3 Complete (i18next UI)**:
- 270+ UI translations working
- Language switching functional
- SSR-compatible

---

## Conclusion

This hybrid architecture provides:
- **Fast automated translation** for static content (DeepL)
- **Flexible content management** for dynamic content (Sanity)
- **Developer-friendly UI translations** (i18next)

**Next:** Complete Sanity setup and migrate dynamic content.
