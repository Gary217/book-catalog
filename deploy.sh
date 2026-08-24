# Stop script if error happens
set -e

npm run build

cd dist

git init
git checkout -b gh-pages
git add -A
git commit -m 'deploy'

git push -f git@github.com:Gary217/book-catalog.git gh-pages

cd -
