#!/bin/sh

echo "build amnesty-components/"
cd amnesty-components/
node ../.yarn/releases/yarn-3.2.1.cjs install
node ../.yarn/releases/yarn-3.2.1.cjs run build
cd ..

echo "build admin/"
cd admin/
node ../.yarn/releases/yarn-3.2.1.cjs install
node ../.yarn/releases/yarn-3.2.1.cjs run build
cd ..

echo "build front/"
cd front/
node ../.yarn/releases/yarn-3.2.1.cjs install
node ../.yarn/releases/yarn-3.2.1.cjs run build-web
cd ..
