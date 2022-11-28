echo "yarn version"
echo "-----"
yarn --version
echo "-----"
yarn run build
yarn workspaces focus --production reaction-rapide-api
