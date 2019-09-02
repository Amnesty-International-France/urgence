export UID=$(shell id -u)
export GID=$(shell id -g)

default: help

help: ## SOS? Usage make help (default).
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

DOCKER_COMPOSE = docker-compose -p reaction-rapide -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_BUILD = docker-compose -p reaction-rapide-build -f docker-compose.build.yml
DOCKER_COMPOSE_TEST = docker-compose -p reaction-rapide-test -f docker-compose.yml -f docker-compose.test.yml
DOCKER_COMPOSE_E2E = docker-compose -p reaction-rapide-e2e -f docker-compose.yml -f docker-compose.e2e.yml
DOCKER_COMPOSE_STAGING = docker-compose -p reaction-rapide-staging -f docker-compose.yml -f docker-compose.staging.yml
DOCKER_COMPOSE_PROD = docker-compose -p reaction-rapide-prod -f docker-compose.yml -f docker-compose.prod.yml
DOCKER_COMPOSE_DEV_NGINX = docker-compose -p reaction-rapide-dev-nginx -f docker-compose.yml -f docker-compose.dev-nginx.yml

install: install-admin ## Install all dependencies. Usage make install.
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app api yarn install
	$(DOCKER_COMPOSE) run --rm --no-deps api yarn install
	$(DOCKER_COMPOSE) run --rm --no-deps front yarn install

install-staging:
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app api yarn install --production
	$(DOCKER_COMPOSE) run --rm --no-deps api yarn install --production

start: ## Start the project with docker. Usage make start.
	$(DOCKER_COMPOSE) up --force-recreate -d

stop: ## Stop the project with docker. Usage make stop.
	$(DOCKER_COMPOSE) down

start-staging:
	$(DOCKER_COMPOSE_STAGING) up -d

stop-staging:
	$(DOCKER_COMPOSE_STAGING) down

start-prod:
	$(DOCKER_COMPOSE_PROD) up -d

stop-prod:
	$(DOCKER_COMPOSE_PROD) down

logs:
	$(DOCKER_COMPOSE) logs -f

connect-api:
	$(DOCKER_COMPOSE) exec api bash

psql:
	$(DOCKER_COMPOSE) exec db sh -c "psql --host=localhost --username=amnesty reaction-rapide"

update-icons-components:
	$(DOCKER_COMPOSE) run --rm --no-deps --workdir=/app front bash -ci "\
		./node_modules/.bin/svgr --no-semi --icon --ids -d front/src/icons front/src/icons && \
		./node_modules/.bin/prettier --write front/src/icons/*.js \
	"

test: ## Run the tests. Usage `make test`.
	make test-e2e
	make test-unit

test-unit: ## Run the unit tests. Usage `make test-unit`.
	$(MAKE) migration-test
	sleep 10
	$(DOCKER_COMPOSE_TEST) run --rm test yarn run test

test-watch: ## Run the tests in watch mode. Usage make test.
	$(DOCKER_COMPOSE_TEST) run --rm test yarn run test-watch

test-stop-dockers:
	$(DOCKER_COMPOSE_TEST) down

test-e2e: ## Run the e2e tests. Usage `make test-e2e`.
	$(MAKE) migration-e2e
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chrome
	sleep 10
	$(DOCKER_COMPOSE_E2E) run test-e2e
	sleep 10
	$(DOCKER_COMPOSE_E2E) down

debug-e2e:
	$(DOCKER_COMPOSE_E2E) run test-e2e

test-e2e-stop-dockers:
	$(DOCKER_COMPOSE_E2E) down

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

DB_MIGRATE_PROD = $(DOCKER_COMPOSE_PROD) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && ./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

DB_MIGRATE_E2E = $(DOCKER_COMPOSE_E2E) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && ./node_modules/.bin/db-migrate \
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

selenium:
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chrome

selenium-debug:
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chromedebug

deploy-staging:
	NODE_ENV=staging npx shipit staging deploy

deploy-prod:
	NODE_ENV=production npx shipit production deploy

install-admin:
	$(DOCKER_COMPOSE) run --rm --no-deps admin yarn install

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

run-nginx-dev:
	${DOCKER_COMPOSE_DEV_NGINX} up --force-recreate

stop-nginx-dev:
	${DOCKER_COMPOSE_DEV_NGINX} down

log-nginx-dev:
	${DOCKER_COMPOSE_DEV_NGINX} logs -f

nginx-dev: build-dev run-nginx-dev
