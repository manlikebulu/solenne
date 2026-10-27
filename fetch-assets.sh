#!/usr/bin/env bash
# Downloads the Figma image/SVG assets into ./assets
# Figma asset URLs are temporary (7 days). If they have expired, re-export
# the nodes listed in README.md, or re-run get_design_context for node 377:16.
set -euo pipefail
cd "$(dirname "$0")/assets"

get() { curl -fL --retry 2 -o "$1" "$2" && [ -s "$1" ] && echo "ok  $1"; }

get img-frame.png   "https://www.figma.com/api/mcp/asset/f4be9ac0-c08f-429f-9594-b50c015e8031.png"
get image-18.png    "https://www.figma.com/api/mcp/asset/db2e316b-7fa1-4831-ba99-4beffd6ac6f2.png"
get image-12.png    "https://www.figma.com/api/mcp/asset/505ab436-1a0a-4b73-9002-f7a1f8056554.png"
get image-14.png    "https://www.figma.com/api/mcp/asset/ca026da4-4fe8-4f46-a22e-84027a619e77.png"
get image-15.png    "https://www.figma.com/api/mcp/asset/d058f214-a865-43a2-86db-2b3c40f1fbbc.png"
get image-5.png     "https://www.figma.com/api/mcp/asset/a507b6e6-fb5a-4f3c-a876-9c063dfbea84.png"
get icons.svg       "https://www.figma.com/api/mcp/asset/f3fcf200-7644-4393-bfeb-4d6d2c8a521a.svg"
get arrow-right.svg "https://www.figma.com/api/mcp/asset/73aa7036-5d11-4764-a1a2-264c15214f84.svg"
echo "Done. Open index.html (or run: npx serve .)"
