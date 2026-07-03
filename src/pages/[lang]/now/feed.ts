import { experimental_AstroContainer as AstroContainer } from "astro/container";
import mdxRenderer from "@astrojs/mdx/server.js";

import { getLangFromUrl, useTranslatedPath } from "@i18n/utils";
import rss from "@astrojs/rss";
import { render } from "astro:content";
import { getFormatDateString } from "@/lib/date/format";
import { getEntry } from "astro:content";
import { getPublishedNowPosts, getNowStaticPaths } from "@/lib/content/now";
import { getSiteSettings } from "@/lib/content/settings";

export { getNowStaticPaths as getStaticPaths };

export async function GET(context: any) {
    const lang = getLangFromUrl(context.url);
    const translatePath = useTranslatedPath(lang);
    const formatDateString = getFormatDateString(lang);

    const container = await AstroContainer.create({});
    container.addServerRenderer({ renderer: mdxRenderer, name: "mdx" });

    const i18n = (await getEntry("i18n", lang))!.data;
    const settings = await getSiteSettings();
    const updates = (await getPublishedNowPosts(lang)).slice(0, 1);

    return rss({
        title: i18n["now.feed.title"],
        description: i18n["now.feed.description"],
        site: import.meta.env.SITE,
        items: await Promise.all(
            updates.map(
                async (update) => ({
                    title: `${i18n["now.feed.itemTitle"]} ${formatDateString(update.data.date)}`,
                    author: settings.fullName,
                    pubDate: update.data.date,
                    link: translatePath("/now"),
                    content: await container.renderToString((await render(update)).Content),
                })
            )
        ),
        customData: `<language>${lang}</language>`,
    });
}
