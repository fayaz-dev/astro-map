import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    author: z.string().default('Fayaz Ahmed'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    related: z.array(z.string()).optional(),
    category: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};