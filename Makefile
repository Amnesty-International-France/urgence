export UID=$(shell id -u)
export GID=$(shell id -g)

default: help

help: ## SOS? Usage make help (default).
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

#### STARTING ###

DOCKER_COMPOSE = docker-compose -p reaction-rapide -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_BUILD = docker-compose -p reaction-rapide-build -f docker-compose.build.yml
DOCKER_COMPOSE_TEST = docker-compose -p reaction-rapide-test -f docker-compose.yml -f docker-compose.test.yml
DOCKER_COMPOSE_E2E = docker-compose -p reaction-rapide-e2e -f docker-compose.yml -f docker-compose.e2e.yml
DOCKER_COMPOSE_STAGING = docker-compose -p reaction-rapide-staging -f docker-compose.yml -f docker-compose.staging.yml
DOCKER_COMPOSE_PROD = docker-compose -p reaction-rapide-prod -f docker-compose.yml -f docker-compose.prod.yml
DOCKER_COMPOSE_DEV_NGINX = docker-compose -p reaction-rapide-dev-nginx -f docker-compose.yml -f docker-compose.dev-nginx.yml

install: ## Install all dependencies. Usage `make install`.
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app api yarn install
	$(DOCKER_COMPOSE) run --rm --no-deps api yarn install
	$(DOCKER_COMPOSE) run --rm --no-deps admin yarn install
	$(DOCKER_COMPOSE) run --rm --no-deps front yarn install

install-staging:
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app api yarn install --production
	$(DOCKER_COMPOSE) run --rm --no-deps api yarn install --production

start: ## Start the project with docker. Usage `make start`.
	$(DOCKER_COMPOSE) up --force-recreate -d

stop: ## Stop the project with docker. Usage `make stop`.
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

start-staging:
	$(DOCKER_COMPOSE_STAGING) up -d

stop-staging:
	$(DOCKER_COMPOSE_STAGING) down

start-prod:
	$(DOCKER_COMPOSE_PROD) up -d

stop-prod:
	$(DOCKER_COMPOSE_PROD) down

run-nginx-dev:
	${DOCKER_COMPOSE_DEV_NGINX} up --force-recreate

stop-nginx-dev:
	${DOCKER_COMPOSE_DEV_NGINX} down

log-nginx-dev:
	${DOCKER_COMPOSE_DEV_NGINX} logs -f

nginx-dev: build-dev run-nginx-dev

connect-api:
	$(DOCKER_COMPOSE) exec api bash

#### TESTS ####

test: ## Run all the tests. Usage `make test`.
	make test-e2e
	make test-unit

test-unit: ## Run the unit tests. Usage `make test-unit`.
	$(MAKE) migration-test
	sleep 10
	$(DOCKER_COMPOSE_TEST) run --rm test yarn run test
	sleep 10
	$(DOCKER_COMPOSE_E2E) down

test-unit-watch: ## Run the unit tests in watch mode. Usage make `test-unit-watch`.
	$(DOCKER_COMPOSE_TEST) run --rm test yarn run test-watch

test-unit-stop: ## Stop the unit tests. Usage `make test-unit-stop`
	$(DOCKER_COMPOSE_TEST) down

test-e2e: ## Run the e2e tests. Usage `make test-e2e`.
	$(MAKE) migration-e2e
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chrome
	sleep 10
	$(DOCKER_COMPOSE_E2E) run test-e2e
	sleep 10
	$(DOCKER_COMPOSE_E2E) down

test-e2e-debug: ## Run the e2e tests for debugging. Usage `make test-e2e-debug`
	$(DOCKER_COMPOSE_E2E) run test-e2e

test-e2e-stop: ## Stop the e2e tests. Usage `make test-e2e-stop`
	$(DOCKER_COMPOSE_E2E) down

#### DATABASE & MIGRATIONS ####

psql: ## Connect to the running database. Usage `make psql`.
	$(DOCKER_COMPOSE) exec db sh -c "psql --host=localhost --username=amnesty reaction-rapide"

DB_MIGRATE = $(DOCKER_COMPOSE) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && npx db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

DB_MIGRATE_TEST = $(DOCKER_COMPOSE_TEST) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && npx db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

DB_MIGRATE_STAGING = $(DOCKER_COMPOSE_STAGING) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && npx db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

DB_MIGRATE_PROD = $(DOCKER_COMPOSE_PROD) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && npx db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

DB_MIGRATE_E2E = $(DOCKER_COMPOSE_E2E) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && npx db-migrate \
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
	$(DB_MIGRATE_TEST) up"

migration-staging:
	$(DB_MIGRATE_STAGING) up"

migration-prod:
	$(DB_MIGRATE_PROD) up"

migration-e2e:
	$(DB_MIGRATE_E2E) up"

populate-db:
	$(DOCKER_COMPOSE) run --rm api node src/bin/populateDb.js

#### DEPLOYMENT ####

deploy-staging:
	NODE_ENV=staging npx shipit staging deploy

deploy-prod:
	NODE_ENV=production npx shipit production deploy

build-storybook:
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps storybook

build-front:
ifeq ($(NODE_ENV),staging)
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps front_staging
else
    ifeq ($(NODE_ENV),production)
		$(DOCKER_COMPOSE_BUILD) run --rm --no-deps front_prod
    else
		$(DOCKER_COMPOSE_BUILD) run --rm --no-deps front_dev
    endif
endif

build-admin:
ifeq ($(NODE_ENV), staging)
	$(DOCKER_COMPOSE_BUILD) run --rm --no-deps admin_staging
else
    ifeq ($(NODE_ENV), production)
		$(DOCKER_COMPOSE_BUILD) run --rm --no-deps admin_prod
    else
		$(DOCKER_COMPOSE_BUILD) run --rm --no-deps admin_dev
    endif
endif

build-api:
	$(DOCKER_COMPOSE) run --rm --no-deps api yarn run build

build-dev: build-front-dev build-admin-dev
