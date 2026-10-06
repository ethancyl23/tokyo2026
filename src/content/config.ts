import { defineCollection, z } from 'astro:content';

// Each file in src/content/days/ is one day of the trip.
// Add a new day by copying an existing .md file and editing the fields below.
const days = defineCollection({
  type: 'content',
  schema: z.object({
    dayNumber: z.number(),        // 1, 2, 3... controls sort order
    date: z.string(),             // e.g. "8 Oct 2026 (Thu)"
    isoDate: z.string(),           // e.g. "2026-10-08" — used for Add to Calendar
    title: z.string(),            // short headline for the day
    location: z.string(),         // e.g. "Yokohama"
    hotel: z.string().optional(), // where you're staying that night
    heroImage: z.string().optional(), // path under /public, e.g. "/images/day-01.svg"
    mapQuery: z.string().optional(),  // place name/address for a single-point embedded map
    stops: z.array(z.object({         // optional: multiple points for a multi-stop map
      name: z.string(),
      lat: z.number(),
      lng: z.number(),
    })).optional(),
    status: z.enum(['confirmed', 'tentative', 'tbd']).default('confirmed'),
  }),
});

export const collections = { days };
