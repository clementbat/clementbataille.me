#!/usr/bin/env sh

set -e

npm run build

cd dist

echo 'clementbataille.me' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:clementbat/clementbat.github.io.git master

cd -
