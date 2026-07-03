import { getCollection, type CollectionEntry } from "astro:content";
import { getStaticPaths as getLangStaticPaths } from "@i18n/utils";
import { isNowPageEnabled } from "@/lib/content/settings";

export type NowPost = CollectionEntry<"now">;

const byNewestFirst = (a: NowPost, b: NowPost) =>
  b.data.date.getTime() - a.data.date.getTime();

export async function getPublishedNowPosts(lang?: string) {
  return (await getCollection("now"))
    .filter((post) => !post.data.draft && (!lang || post.data.lang === lang))
    .sort(byNewestFirst);
}

export async function getLatestNowPost(lang: string) {
  const [post] = await getPublishedNowPosts(lang);
  return post;
}

export const getNowStaticPaths = async () =>
  (await isNowPageEnabled()) ? getLangStaticPaths() : [];
