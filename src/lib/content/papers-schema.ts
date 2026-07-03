import { z } from "astro/zod";

const linkType = z.string().optional().nullable();

export const papersSchema = z
    .object({
        title: z.string(),
        author: z.string(),
        venue: z.string().optional().nullable(),
        date: z.coerce.date().transform((str) => {
            const date = new Date(str);
            return new Date(date.setUTCHours(12));
        }),
        show: z.boolean().optional().default(true),
        links: z.object({
            arxiv: linkType,
            conference: linkType,
            proceedings: linkType,
            code: linkType,
        }).optional(),
    })