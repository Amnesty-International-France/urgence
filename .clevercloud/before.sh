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

cd amnesty-components/
yarn install
yarn run build
cd ..

cd admin/
yarn install
yarn run build
cd ..

cd front/
yarn install
yarn run build
cd ..

cd api/
yarn install
#yarn workspaces focus --production reaction-rapide-api -vvv
