# Sanity CMS Integration Guide for HNDS Website

## Overview

This guide walks you through setting up Sanity CMS for the HNDS Split website. Sanity provides a headless CMS that allows you to manage content without touching the code.

## Step 1: Create a Sanity Project

1. Go to [Sanity.io](https://www.sanity.io)
2. Sign up for a free account
3. Create a new project with these settings:
   - **Project name**: HNDS Split
   - **Dataset name**: production
   - **Workspace**: default
4. Note your **Project ID** from the dashboard

## Step 2: Update the Environment Configuration

Replace 'YOUR_PROJECT_ID' in lib/sanity.ts:

\\\	ypescript
const client = createClient({
  projectId: "your-actual-project-id-here",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
\\\

## Step 3: Set Up Sanity Studio (Optional but Recommended)

To get a UI for managing content:

\\\ash
npm install -D @sanity/cli @sanity/studio sanity
npx sanity init
\\\

Follow the prompts and select your project.

## Step 4: Available Content Types

### Events
- **Title**: Event name
- **Date**: Event date and time
- **Location**: Where the event takes place
- **Description**: Event details
- **Image**: Featured event photo
- **Category**: Workshop, Social, Course, or Trip

### Pages
- **Title**: Page name
- **Slug**: URL-friendly identifier
- **Content**: Rich text with images and formatting

### Site Settings
- **Title**: Website title
- **Description**: Meta description
- **Address**: Organization address
- **Phone**: Contact phone
- **Email**: Contact email
- **Social Links**: Instagram, Facebook, YouTube URLs

## Step 5: Fetch Content in Your App

Use the client in your pages:

\\\	ypescript
import client from '@/lib/sanity';
import { groq } from 'next-sanity';

// Fetch all events
export async function getEvents() {
  const query = groq\*[_type == "event"] | order(date desc)\;
  return await client.fetch(query);
}

// Fetch a single event by slug
export async function getEventBySlug(slug) {
  const query = groq\*[_type == "event" && slug.current == \][0]\;
  return await client.fetch(query, { slug });
}
\\\

## Step 6: Deploy to Production

1. Push your changes:
   \\\ash
   git add .
   git commit -m "Add Sanity CMS integration"
   git push
   \\\

2. Deploy to Vercel (or your hosting):
   - Connect your GitHub repo
   - Add environment variables in deployment settings:
     - \NEXT_PUBLIC_SANITY_PROJECT_ID\: Your project ID
     - \NEXT_PUBLIC_SANITY_DATASET\: production

3. Sanity content is now live!

## Troubleshooting

**Issue**: "Project not found"
- **Solution**: Double-check your Project ID in the Sanity dashboard

**Issue**: "Unauthorized"
- **Solution**: Check that your dataset is set to public in Sanity dashboard

**Issue**: No images loading
- **Solution**: Make sure \useCdn: true\ is set in sanity.ts

## Next Steps

1. Add more content types based on your needs
2. Customize the Sanity Studio interface
3. Set up webhooks to trigger rebuild on content changes
4. Consider adding scheduling for events

## Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://slack.sanity.io)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
