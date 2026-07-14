import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/*.{jpg,jpeg,png,webp,svg}",
  { eager: true },
);

export function getContentImage(path: string) {
  const image = images[`/src/content/${path}`]?.default;
  if (!image) throw new Error(`Content image not found: ${path}`);
  return image;
}
