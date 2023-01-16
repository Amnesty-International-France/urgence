#!/bin/sh

# Print commands and their arguments as they are executed
set -xe

echo "-----"
echo "execute before.sh"
echo "-----"

node --version

yarn --version

whereis yarn

echo "yarn config get cacheFolder"
echo "-----"
yarn config get cacheFolder
echo "-----"

echo "-----"
echo "install dependencies in api/"
echo "-----"

yarn workspaces focus reaction-rapide-api

echo "build api/"

cd api/
yarn run build

echo "install only prod dependencies"
cd ..
yarn workspaces focus --production reaction-rapide-api

echo "-----"
echo "before.sh has been executed"
echo "-----"
