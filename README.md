# bear-blog-astro

A minimal, multilingual Astro website template inspired by Bear Blog.

Includes profile, publications, news, contact, and optional now pages, with
Markdown content collections and English/Catalan translations.

Demo: https://marcfranquesa.github.io/bear-blog-astro/.

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

The example deploys to GitHub Pages through `.github/workflows/pages.yml` on
pushes to `main`. The workflow builds only the public example content and sets
`SITE_URL` and `BASE_PATH` from the repository's Pages configuration.

For your own deployment, set `SITE_URL` to the origin and `BASE_PATH` to the
deployment subpath, if any. The included `netlify.toml` is also available for
deployments on Netlify and publishes `dist/`.
