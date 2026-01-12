export const eventSchema = {
  name: "event",
  type: "document",
  title: "Event",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Event Title",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
    },
    {
      name: "date",
      type: "datetime",
      title: "Event Date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "location",
      type: "string",
      title: "Location",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "image",
      type: "image",
      title: "Event Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Workshop", value: "workshop" },
          { title: "Social", value: "social" },
          { title: "Course", value: "course" },
          { title: "Trip", value: "trip" },
        ],
      },
    },
  ],
};

export const pageSchema = {
  name: "page",
  type: "document",
  title: "Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Page Title",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Page Slug",
      options: {
        source: "title",
      },
    },
    {
      name: "content",
      type: "array",
      title: "Page Content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
};

export const siteSettingsSchema = {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site Title",
    },
    {
      name: "description",
      type: "text",
      title: "Site Description",
    },
    {
      name: "address",
      type: "string",
      title: "Address",
    },
    {
      name: "phone",
      type: "string",
      title: "Phone",
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "socialLinks",
      type: "array",
      title: "Social Links",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "string", title: "URL" },
          ],
        },
      ],
    },
  ],
};
