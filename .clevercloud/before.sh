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

echo "build amnesty-components/"
echo "-----"
cd amnesty-components/
yarn install
yarn run build
cd ..

echo "build admin/"
echo "-----"
cd admin/
yarn install
yarn run build
cd ..

echo "build front/"
echo "-----"
cd front/
yarn install
yarn run build
cd ..

echo "build api/"
echo "-----"
cd api/
yarn install
#yarn workspaces focus --production reaction-rapide-api -vvv
