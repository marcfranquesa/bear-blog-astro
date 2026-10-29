import { withBase } from "@i18n/utils";

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL(withBase("/sitemap-index.xml"), import.meta.env.SITE).href}
`.trim();

export const GET = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
