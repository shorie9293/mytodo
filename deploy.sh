#!/user/bin/env sh

set -env

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:shorie9293/mytodo.git master:gh-pages

cd -