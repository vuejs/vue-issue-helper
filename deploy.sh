cp CNAME dist/CNAME
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:vuejs/vue-issue.git master:gh-pages
