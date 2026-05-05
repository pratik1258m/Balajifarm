#!/bin/bash
echo "Building Tailwind..."
npx tailwindcss -i ./src/input.css -o ./output.css --minify

echo "Preparing deploy folder..."
mkdir -p deploy
mkdir -p deploy/assets

echo "Copying files to deploy..."
cp index.html style.css script.js output.css netlify.toml robots.txt sitemap.xml deploy/
cp -r assets/* deploy/assets/

echo "Build complete."
