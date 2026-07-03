import { getEntry } from "astro:content";

export async function getSiteSettings() {
  return (await getEntry("settings", "site"))!.data;
}

export async function isNowPageEnabled() {
  return (await getSiteSettings()).showNowPage;
}
