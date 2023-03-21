#!/bin/sh

# Print commands and their arguments as they are executed
set -xe

echo "-----"
echo "execute after.sh"
echo "-----"

cd api/
npx db-migrate --config=database.cjs --migrations-dir=migrations --env api up

echo "-----"
echo "after.sh has been executed"
echo "-----"
