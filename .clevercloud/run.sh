#!/bin/sh

# Print commands and their arguments as they are executed
set -xe

echo "-----"
echo "execute run.sh"
echo "-----"

cd api/
yarn run start
