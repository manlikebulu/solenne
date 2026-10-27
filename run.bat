@echo off
cd /d "%~dp0"
if not exist assets mkdir assets
cd assets

curl -fL -o img-frame.png   "https://www.figma.com/api/mcp/asset/f4be9ac0-c08f-429f-9594-b50c015e8031.png" || goto :fail
curl -fL -o image-18.png    "https://www.figma.com/api/mcp/asset/db2e316b-7fa1-4831-ba99-4beffd6ac6f2.png" || goto :fail
curl -fL -o image-12.png    "https://www.figma.com/api/mcp/asset/505ab436-1a0a-4b73-9002-f7a1f8056554.png" || goto :fail
curl -fL -o image-14.png    "https://www.figma.com/api/mcp/asset/ca026da4-4fe8-4f46-a22e-84027a619e77.png" || goto :fail
curl -fL -o image-15.png    "https://www.figma.com/api/mcp/asset/d058f214-a865-43a2-86db-2b3c40f1fbbc.png" || goto :fail
curl -fL -o image-5.png     "https://www.figma.com/api/mcp/asset/a507b6e6-fb5a-4f3c-a876-9c063dfbea84.png" || goto :fail
curl -fL -o icons.svg       "https://www.figma.com/api/mcp/asset/f3fcf200-7644-4393-bfeb-4d6d2c8a521a.svg" || goto :fail
curl -fL -o arrow-right.svg "https://www.figma.com/api/mcp/asset/73aa7036-5d11-4764-a1a2-264c15214f84.svg" || goto :fail

cd ..
echo.
echo Assets downloaded. Starting server at http://localhost:8000
start "" http://localhost:8000
python -m http.server 8000
goto :eof

:fail
echo.
echo A download failed. The Figma links may have expired (they last 7 days).
echo Export the images from Figma into the assets folder by hand instead.
pause