echo "-----"
echo "execute before.sh"
echo "-----"

echo "node version"
echo "-----"
node --version
echo "-----"

echo "yarn version"
echo "-----"
yarn --version
echo "-----"

echo "whereis yarn"
echo "-----"
whereis yarn
echo "-----"

echo "yarn config get cacheFolder"
echo "-----"
whereis yarn config get cacheFolder
echo "-----"

echo "build api/"
echo "-----"
cd api/
yarn install
yarn run build
cd ..
echo "-----"
echo "api/ has been built"
echo "-----"

#yarn workspaces focus --production reaction-rapide-api -vvv

echo "-----"
echo "before.sh has been executed"
echo "-----"
