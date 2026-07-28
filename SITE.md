# Personal site

This repository contains the Astro-powered personal site for writing,
photography, and projects.

## Local development

```sh
npm install
npm run dev
```

Build the production site with `npm run build`.

## Site structure

The site is a React single-page application hosted inside one Astro-generated
HTML shell. Client-side views use hash routes so direct links and refreshes work
on GitHub Pages:

- `#/` — landing view
- `#/projects` — projects view
- `#/blog` — blog view
- `#/photos` — photo collections
- `#/photos/:collection` — collection gallery

## Licensing

Unless otherwise stated, photographs are licensed under
[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/). See
[LICENSE-PHOTOS.md](LICENSE-PHOTOS.md) for details.

The site source code is licensed under the [MIT License](LICENSE). The photo
license is separate and does not grant permission to reuse the site source
code.
