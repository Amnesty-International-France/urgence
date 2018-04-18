export UID=$(shell id -u)
export GID=$(shell id -g)

DOCKER_COMPOSE = docker-compose -p reaction-rapide -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_TEST = docker-compose -p reaction-rapide-test -f docker-compose.yml -f docker-compose.test.yml
DOCKER_COMPOSE_E2E = docker-compose -p reaction-rapide-e2e -f docker-compose.e2e.yml
DOCKER_COMPOSE_STAGING = docker-compose -p reaction-rapide-staging -f docker-compose.yml -f docker-compose.staging.yml

install:
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app api yarn
	$(DOCKER_COMPOSE) run --rm --no-deps api bash -ci 'yarn'
	$(DOCKER_COMPOSE) run --rm --no-deps front bash -ci 'yarn'

install-staging:
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app api bash -ci 'yarn --production'
	$(DOCKER_COMPOSE) run --rm --no-deps api bash -ci 'yarn --production'
	$(DOCKER_COMPOSE) run --rm --no-deps front bash -ci 'yarn --production'

start:
	$(DOCKER_COMPOSE) up -d

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

test:
	$(DOCKER_COMPOSE_TEST) run --rm api yarn test ; $(DOCKER_COMPOSE_TEST) stop

test-watch:
	$(DOCKER_COMPOSE_TEST) run --rm api yarn run test-watch

DB_MIGRATE = $(DOCKER_COMPOSE) run --rm api sh -c "./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

test-stop-dockers:
	$(DOCKER_COMPOSE_TEST) down

DB_MIGRATE_PRODUCTION = $(DOCKER_COMPOSE_STAGING) run --rm api sh -c "./node_modules/.bin/db-migrate \
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
	$(DOCKER_COMPOSE) run --rm api bash -ci 'node src/bin/populateDb.js'

selenium:
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chrome

selenium-debug:
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chromedebug

test-e2e:
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chrome
	$(DOCKER_COMPOSE_E2E) run test-e2e

debug-e2e:
	$(DOCKER_COMPOSE_E2E) run test-e2e

deploy-staging:
	npx shipit staging deploy
