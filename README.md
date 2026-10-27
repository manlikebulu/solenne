# Solenne

Static, dependency-free build of Figma node `377:16` (file WP7tM6Je5NMWlEk7zOy3ja).

## Run
1. `./fetch-assets.sh` to download the 6 images + 2 SVGs into `assets/` (fonts are already included).
2. Open `index.html`, or serve the folder: `npx serve .`

## Asset map
| File | Figma use |
|---|---|
| img-frame.png | Hero bottom image, Garden Suite card |
| image-18.png | Philosophy banner, Ridge Loft card |
| image-12.png | Thoughtful spaces crops, Orchard Studio card |
| image-14.png | A sense of place crops, Meadow House card |
| image-15.png | Featured stay background |
| image-5.png | Featured stay inset card |
| icons.svg | Search icon (24x24) |
| arrow-right.svg | "View stay" arrow (16x16) |

## Notes
- Fonts: Boldonse + Plus Jakarta Sans, self-hosted WOFF2 (`assets/fonts`).
- Breakpoints: 1200 (hero), 1000 (philosophy, featured, CTA), 960 (nav), 700 (stay grid), 640 (footer).
- Links with `href="#"` are placeholders (stay pages, gallery, journal, company, help).
- Newsletter submit is a front-end stub; see the TODO in `script.js`.
