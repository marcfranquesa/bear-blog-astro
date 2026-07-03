import { z } from "astro/zod";
import { languageCodes } from "@i18n/langs";

export const i18nSchema = z
    .object({
        // site
        "site.description": z.string(),

        // nav
        "nav.home": z.string(),
        "nav.now": z.string(),
        "nav.contact": z.string(),
        "nav.langSwitch": z.string(),

        // footer
        "footer.website": z.string(),

        // home
        "home.imgAlt": z.string(),

        // news
        "news.title": z.string(),

        // 404
        "404.imgAlt": z.string(),
        "404.text": z.string(),

        // now
        "now.title": z.string(),
        "now.tabTitle": z.string(),
        "now.fallback": z.string(),
        "now.feed.title": z.string(),
        "now.feed.description": z.string(),
        "now.feed.itemTitle": z.string(),

        // contact
        "contact.title": z.string(),
        "contact.tabTitle": z.string(),
        "contact.string": z.string(),

        // website
        "website.title": z.string(),
        "website.tabTitle": z.string(),
        "website.tech": z.array(z.string()),

        // publications
        "papers.title": z.string(),
        "papers.availableUponRequest": z.string(),

        // random
        "otherLang": z.enum(languageCodes),
        "lastUpdated": z.string(),
    })
