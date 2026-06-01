import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const courses = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/courses" }),
  schema: z.object({
    title: z.string(),
    code: z.string(),
    family: z.string(),
    order: z.number().optional(),
    level: z.string(),
    type: z.string(),
    image: z.string(),
    summary: z.string(),
    featured: z.boolean().optional(),

    dates: z.string().optional(),
    schedule: z.string().optional(),
    modality: z.string().optional(),

    cta_label: z.string().optional(),
    cta_link: z.string().optional(),

    pricing: z.array(
      z.object({
        title: z.string(),
        price: z.string(),
        description: z.string(),
      })
    ).optional(),
  }),
});

const figures = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/figures" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    instagram: z.string().url().optional(),
  }),
});

const tutorials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tutorials" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { courses, figures, tutorials };