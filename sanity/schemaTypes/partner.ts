import { defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'About the partnership',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'partnershipType',
      title: 'Partnership Type',
      type: 'string',
      options: {
        list: [
          { title: 'Strategic Partner', value: 'strategic' },
          { title: 'Institutional Partner', value: 'institutional' },
          { title: 'Community Partner', value: 'community' },
          { title: 'Sponsor', value: 'sponsor' },
        ],
      },
    },
    {
      name: 'partnershipStartDate',
      title: 'Partnership Start Date',
      type: 'date',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to order partners (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Display this partner on the website',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'partnershipType',
      media: 'logo',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
