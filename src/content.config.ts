import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
});

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
    
    status: z
      .enum(["open", "coming-soon", "archived"])
      .default("archived"),  

    dates: z.string().optional(),
    schedule: z.string().optional(),
    modality: z.string().optional(),

    cta_label: z.string().optional(),
    cta_link: z.string().optional(),

    pricing: z.array(
      z.object({
        title: z.string(),
        price_mxn: z.number(),
        price_usd: z.number(),
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
    github: z.string().url().optional(),
    tutorial: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),

  schema: z.object({
    title: z.string(),
    image: z.string(),
    date: z.coerce.string(),

    category: z.enum([
      "code",
      "template",
      "notes",
      "publication",
      "supplement",
    ]),

    tags: z.array(z.string()).default([]),

    link: z.string().url(),
    label: z.string(),

    featured: z.boolean().optional(),
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

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),

  schema: z.object({
    title: z.string(),

    date: z.coerce.date(),

    kind: z.enum([
      "course",
      "tutorial",
      "resource",
      "publication",
      "instagram",
      "github",
      "website",
    ]),

    tags: z.array(z.string()).default([]),

    link: z.string(),

    linkLabel: z.string(),

    featured: z.boolean().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    course: z.string(),
  }),
});

export const collections = { 
  courses,
  figures,
  tutorials,
  pages,
  news,
  resources,
  notes,
};