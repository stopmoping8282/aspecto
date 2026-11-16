#!/bin/sh
# Builds the site and publishes it to GitHub Pages (the gh-pages branch of the aspecto repository).
# Run from this folder:  sh deploy.sh
set -e
REPO=https://github.com/stopmoping8282/aspecto.git
node node_modules/vite/bin/vite.js build --base=/aspecto/
cp dist/index.html dist/404.html   # lets direct links such as /tjenester load the app
touch dist/.nojekyll
cd dist
git init -q -b gh-pages
git add -A
git commit -q -m "Publish site"
git push -q -f "$REPO" gh-pages
cd ..
rm -rf dist
echo "Published: https://stopmoping8282.github.io/aspecto/"
