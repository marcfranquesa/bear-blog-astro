import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { languageCodes, type LanguageCode } from "@i18n/langs";
import { i18nSchema } from "@/lib/content/i18n-schema";
import { papersSchema } from "@/lib/content/papers-schema";

const contentPath = (path: string) => `./src/content/${path}`;

const oneLine = z.string().min(1).refine((value) => !/[\r\n]/.test(value), {
  message: "Expected a one-line description",
});

const translatedLine = z.object(
  Object.fromEntries(languageCodes.map((lang) => [lang, oneLine])) as Record<
    LanguageCode,
    typeof oneLine
  >,
);

const newsDate = z
  .string()
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?$/,
    "Expected YYYY-MM or YYYY-MM-DD",
  );
const optionalUrl = z.string().url().optional().nullable();

const i18n = defineCollection({
  loader: glob({ base: contentPath("i18n"), pattern: "*.yaml" }),
  schema: i18nSchema,
});

const bio = defineCollection({
  loader: glob({ base: contentPath("bio"), pattern: "*.md" }),
});

const settings = defineCollection({
  loader: file(contentPath("settings.yaml")),
  schema: z.object({
    fullName: z.string(),
    contactEmail: z.string().email(),
    analyticsUrl: optionalUrl,
    profileImage: z.string(),
    social: z.object({
      github: optionalUrl,
      googleScholar: optionalUrl,
      linkedin: optionalUrl,
    }),
    showNowPage: z.boolean(),
  }),
});

const now = defineCollection({
  loader: glob({ base: contentPath("now"), pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    date: z.coerce.date().transform((str) => {
      const date = new Date(str);
      return new Date(date.setUTCHours(12));
    }),
    draft: z.boolean().default(true),
    lang: z.enum(languageCodes),
  }),
});

const news = defineCollection({
  loader: file(contentPath("news.yaml")),
  schema: z.object({
    date: newsDate,
    description: translatedLine,
  }),
});

const papers = defineCollection({
  loader: glob({ base: contentPath("papers"), pattern: "**/*.{md,mdx}" }),
  schema: papersSchema,
});

export const collections = { i18n, bio, settings, now, news, papers };
