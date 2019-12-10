git checkout master
git merge develop

VERSION=`npx select-version-cli`

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # add commit
  npm version $VERSION --message "[release] $VERSION"


  # change changelog
  npm run changelog

  git add .
  git ci -m "[changelog] $VERSION"

  # push master and tag
  git push upstream master
  git push upstream refs/tags/v$VERSION

  # async develop and push 
  git checkout develop
  git rebase master
  git push upstream develop

# build
  npm run build:lib

  # publish
  npm publish
fi
