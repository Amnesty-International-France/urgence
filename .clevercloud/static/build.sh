#!/bin/sh

echo "build amnesty-components/"
cd amnesty-components/
node ../.yarn/releases/yarn-3.2.1.cjs install
node ../.yarn/releases/yarn-3.2.1.cjs run build
cd ..

echo "build admin/"
cd admin/
export PUBLIC_URL=${ADMIN_PUBLIC_URL}
node ../.yarn/releases/yarn-3.2.1.cjs install
node ../.yarn/releases/yarn-3.2.1.cjs run build
cd ..

echo "build front/"
cd front/
export PUBLIC_URL=${FRONT_PUBLIC_URL}
node ../.yarn/releases/yarn-3.2.1.cjs install
node ../.yarn/releases/yarn-3.2.1.cjs run build-web
cd ..
