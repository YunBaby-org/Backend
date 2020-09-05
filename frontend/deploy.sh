
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
# 部署到 https://github.com/chou0728/eric-project.git 分支為 gh-pages
git push -f https://github.com/Eric07110904/final.git master:gh-pages

