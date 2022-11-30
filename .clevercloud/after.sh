yarn workspaces focus --production reaction-rapide-api
cd api/
npx db-migrate --config=database.cjs --migrations-dir=migrations --env api up
