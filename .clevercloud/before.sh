echo "-----"
echo "execute after.sh"
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

echo "build amnesty-components/"
echo "-----"
cd amnesty-components/
yarn install
yarn run build
cd ..
echo "-----"
echo "amnesty-components/ has been built"
echo "-----"

echo "build admin/"
echo "-----"
cd admin/
yarn install
yarn run build
cd ..
echo "-----"
echo "admin/ has been built"
echo "-----"

echo "build front/"
echo "-----"
cd front/
yarn install
yarn run build-web
cd ..
echo "-----"
echo "front/ has been built"
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
echo "after.sh has been executed"
echo "-----"
