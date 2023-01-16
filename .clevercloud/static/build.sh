#!/bin/sh

# Print commands and their arguments as they are executed
set -xe

yarn workspaces focus amnesty-components
yarn workspaces focus urgent_reaction
yarn workspaces focus reaction-rapide-admin

echo "build amnesty-components/"
cd amnesty-components/
yarn run build
cd ..

echo "build admin/"
cd admin/
export PUBLIC_URL=${ADMIN_PUBLIC_URL}
yarn run build
cd ..

echo "build front/"
cd front/
export PUBLIC_URL=${FRONT_PUBLIC_URL}
yarn run build-web
cd ..
