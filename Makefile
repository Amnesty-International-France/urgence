export UID=$(shell id -u)
export GID=$(shell id -g)

DOCKER_COMPOSE = docker-compose -p reaction-rapide -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_BUILD = docker-compose -p reaction-rapide-build -f docker-compose.build.yml
DOCKER_COMPOSE_TEST = docker-compose -p reaction-rapide-test -f docker-compose.yml -f docker-compose.test.yml
DOCKER_COMPOSE_E2E = docker-compose -p reaction-rapide-e2e -f docker-compose.yml -f docker-compose.e2e.yml
DOCKER_COMPOSE_STAGING = docker-compose -p reaction-rapide-staging -f docker-compose.yml -f docker-compose.staging.yml

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

test: test-unit test-e2e

test-unit:
	$(DOCKER_COMPOSE_TEST) run --rm test npm run test

test-watch:
	$(DOCKER_COMPOSE_TEST) run --rm test npm run test-watch

DB_MIGRATE = $(DOCKER_COMPOSE) run --rm api sh -c "./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

test-stop-dockers:
	$(DOCKER_COMPOSE_TEST) down

DB_MIGRATE_STAGING = $(DOCKER_COMPOSE_STAGING) run --rm api sh -c "./node_modules/.bin/db-migrate \
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

migration-staging:
	$(DB_MIGRATE_STAGING) up"

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

build-staging:
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps front_staging

build-admin-staging:
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps admin_staging
