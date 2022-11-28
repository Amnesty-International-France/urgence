echo "yarn version"
echo "-----"
yarn --version
echo "-----"
yarn install
yarn run build -vvv
yarn workspaces focus --production reaction-rapide-api -vvv
