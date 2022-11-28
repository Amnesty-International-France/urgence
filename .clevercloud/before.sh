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
yarn --silent install
yarn run build
cd ..
echo "-----"
echo "amnesty-components/ has been built"
echo "-----"

echo "build admin/"
echo "-----"
cd admin/
yarn --silent install
yarn run build
cd ..
echo "-----"
echo "admin/ has been built"
echo "-----"

echo "build front/"
echo "-----"
cd front/
yarn --silent install
yarn run build-web
cd ..
echo "-----"
echo "front/ has been built"
echo "-----"

echo "build api/"
echo "-----"
cd api/
yarn --silent install
cd ..
echo "-----"
echo "dependencies of api/ have been installed"
echo "-----"

#yarn workspaces focus --production reaction-rapide-api -vvv
