# bear-blog-astro

A minimal, multilingual Astro website template inspired by Bear Blog.

Includes profile, publications, news, contact, and optional now pages, with
Markdown content collections and English/Catalan translations.

Demo: https://example.marcfm.com.

## Development

```sh
bun install
bun run dev
```

Build a static site with `bun run build`; the output is written to `dist/`.

## Content

Replace the example collections in `src/content` with your own bio, settings,
translations, news, and publications. `settings.yaml` controls the site identity,
social links, profile image, and optional now page.

Content can also live in a separate repository: set `CONTENT_REPO` when running
`sh scripts/build.sh`. Private content requires Git access in the build environment.

## Deployment

The included `netlify.toml` builds the site and publishes `dist/`. Set `SITE_URL`
to your deployment's canonical URL.
