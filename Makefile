export UID=$(shell id -u)
export GID=$(shell id -g)

DOCKER_COMPOSE = docker-compose -p reaction-rapide -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_BUILD = docker-compose -p reaction-rapide-build -f docker-compose.build.yml
DOCKER_COMPOSE_TEST = docker-compose -p reaction-rapide-test -f docker-compose.yml -f docker-compose.test.yml
DOCKER_COMPOSE_E2E = docker-compose -p reaction-rapide-e2e -f docker-compose.yml -f docker-compose.e2e.yml
DOCKER_COMPOSE_STAGING = docker-compose -p reaction-rapide-staging -f docker-compose.yml -f docker-compose.staging.yml
DOCKER_COMPOSE_DEV_NGINX = docker-compose -p reaction-rapide-dev-nginx -f docker-compose.yml -f docker-compose.dev-nginx.yml

install: install-admin
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app api npm install
	$(DOCKER_COMPOSE) run --rm --no-deps api npm install
	$(DOCKER_COMPOSE) run --rm --no-deps front npm install

install-staging:
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app api npm install --production
	$(DOCKER_COMPOSE) run --rm --no-deps api npm install --production

start:
	$(DOCKER_COMPOSE) up --force-recreate -d

start-staging:
	$(DOCKER_COMPOSE_STAGING) up -d

stop-staging:
	$(DOCKER_COMPOSE_STAGING) down

stop:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

connect-api:
	$(DOCKER_COMPOSE) exec api bash

psql:
	$(DOCKER_COMPOSE) exec db sh -c "psql --host=localhost --username=amnesty reaction-rapide"

test: migration-test test-unit test-e2e

test-unit:
	$(DOCKER_COMPOSE_TEST) run --rm test npm run test

test-watch:
	$(DOCKER_COMPOSE_TEST) run --rm test npm run test-watch

test-stop-dockers:
	$(DOCKER_COMPOSE_TEST) down

DB_MIGRATE = $(DOCKER_COMPOSE) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && ./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

DB_MIGRATE_TEST = $(DOCKER_COMPOSE_TEST) run --rm test sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && ./api/node_modules/.bin/db-migrate \
	--config=./api/database.js \
	--migrations-dir=/app/api/migrations \
	-e api

DB_MIGRATE_STAGING = $(DOCKER_COMPOSE_STAGING) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && ./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

DB_MIGRATE_E2E = $(DOCKER_COMPOSE_E2E) run --rm api sh -c "./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

migration:
	mkdir -p var/data # we can't commit it as PostGres wants an empty folder
	$(DB_MIGRATE) up"

migration-new: ## make create-migration MIGRATION_TITLE=whatever-title
	$(DB_MIGRATE) create ${MIGRATION_TITLE}"

migration-down: ## make create-migration NB_MIGRATIONS=2
	$(DB_MIGRATE) down -c ${NB_MIGRATIONS}"

migration-test:
	mkdir -p var/data-test/
	$(DB_MIGRATE_TEST) up"

migration-staging:
	$(DB_MIGRATE_STAGING) up"

migration-e2e:
	$(DB_MIGRATE_E2E) up"

populate-db:
	$(DOCKER_COMPOSE) run --rm api node src/bin/populateDb.js

selenium:
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chrome

selenium-debug:
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chromedebug

test-e2e:
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chrome
	sleep 10
	$(DOCKER_COMPOSE_E2E) run test-e2e

debug-e2e:
	$(DOCKER_COMPOSE_E2E) run test-e2e

deploy-staging:
	npx shipit staging deploy

install-admin:
	$(DOCKER_COMPOSE) run --rm --no-deps admin npm install

build-storybook:
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps storybook

build-front-staging:
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps front_staging

build-admin-staging:
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps admin_staging

build-api:
	$(DOCKER_COMPOSE) run --rm --no-deps api npm run build

build-front-dev:
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps front_dev

build-admin-dev:
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps admin_dev

build-dev: build-front-dev build-admin-dev

run-nginx-dev:
	${DOCKER_COMPOSE_DEV_NGINX} up --force-recreate

log-nginx-dev:
	${DOCKER_COMPOSE_DEV_NGINX} logs -f

nginx-dev: build-dev run-nginx-dev
