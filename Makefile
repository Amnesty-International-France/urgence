export UID=$(id -u)
export GID=$(id -g)

default: help

help: ## SOS? Usage make help (default).
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

#### STARTING ###

DOCKER_COMPOSE = docker compose -p reaction-rapide -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_INSTALL = docker compose -p reaction-rapide -f docker-compose.install.yml
DOCKER_COMPOSE_TEST = docker compose -p reaction-rapide-test -f docker-compose.yml -f docker-compose.test.yml
DOCKER_COMPOSE_E2E = docker compose -p reaction-rapide-e2e -f docker-compose.yml -f docker-compose.e2e.yml

install: ## Install all dependencies. Usage `make install`.
	$(DOCKER_COMPOSE_INSTALL) run --rm --no-deps install yarn
	$(DOCKER_COMPOSE_INSTALL) run --rm --no-deps install bash -c "cd amnesty-components && npx tsc"

install-production: ## Install all dependencies in production mode. Usage `make install-prod`.
	$(DOCKER_COMPOSE_INSTALL) run --rm --no-deps install bash -c "yarn workspaces focus --production reaction-rapide-api"

start: ## Start the project with docker. Usage `make start`.
	$(DOCKER_COMPOSE) up --force-recreate -d

stop: ## Stop the project with docker. Usage `make stop`.
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

connect-api:
	$(DOCKER_COMPOSE) exec api bash

#### TESTS ####

test: ## Run all tests. Usage `make test`.
	make test-unit
	make test-e2e

test-unit: ## Run the unit tests. Usage `make test-unit`.
	$(DOCKER_COMPOSE_TEST) up --force-recreate -d db
	$(MAKE) migration-test
	sleep 5
	$(DOCKER_COMPOSE_TEST) run test
	$(DOCKER_COMPOSE_TEST) down

test-unit-watch: ## Run the unit tests in watch mode. Usage make `test-unit-watch`.
	$(DOCKER_COMPOSE_TEST) run --rm test yarn run test-watch

test-unit-stop: ## Stop the unit tests. Usage `make test-unit-stop`
	$(DOCKER_COMPOSE_TEST) down

test-e2e: ## Run the e2e tests. Usage `make test-e2e`.
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d db
	$(MAKE) migration-e2e
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d chrome
	sleep 5
	$(DOCKER_COMPOSE_E2E) run test-e2e
	$(DOCKER_COMPOSE_E2E) down

test-e2e-debug: ## Run the e2e tests for debugging. Usage `make test-e2e-debug`
	$(DOCKER_COMPOSE_E2E) run test-e2e

test-e2e-stop: ## Stop the e2e tests. Usage `make test-e2e-stop`
	$(DOCKER_COMPOSE_E2E) down

#### DATABASE & MIGRATIONS ####

psql: ## Connect to the test database. Usage `make psql`.
	$(DOCKER_COMPOSE) up --force-recreate -d
	$(DOCKER_COMPOSE) exec db sh -c "psql --host=localhost --username=amnesty reaction-rapide"

psql-test: ## Connect to the test database. Usage `make psql-test`.
	$(DOCKER_COMPOSE_TEST) up --force-recreate -d
	$(DOCKER_COMPOSE_TEST) exec db sh -c "psql --host=localhost --username=amnesty reaction-rapide-test"

psql-e2e: ## Connect to the e2e database. Usage `make psql-e2e`.
	$(DOCKER_COMPOSE_E2E) up --force-recreate -d
	$(DOCKER_COMPOSE_E2E) exec db sh -c "psql --host=localhost --username=amnesty reaction-rapide-e2e"

DB_MIGRATE = $(DOCKER_COMPOSE) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && npx db-migrate \
	--config=database.cjs \
	--migrations-dir=migrations \
	-e api

migration:
	mkdir -p var/data # we can't commit it as PostGres wants an empty folder
	$(DB_MIGRATE) up"

DB_MIGRATE_TEST = $(DOCKER_COMPOSE_TEST) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && npx db-migrate \
	--config=database.cjs \
	--migrations-dir=migrations \
	-e api

migration-test:
	mkdir -p var/data # we can't commit it as PostGres wants an empty folder
	$(DB_MIGRATE_TEST) up"

DB_MIGRATE_E2E = $(DOCKER_COMPOSE_E2E) run --rm api sh -c "/app/var/wait-for-it.sh -h db -p 5432 -t 30 && npx db-migrate \
	--config=database.cjs \
	--migrations-dir=migrations \
	-e api

migration-e2e:
	mkdir -p var/data # we can't commit it as PostGres wants an empty folder
	$(DB_MIGRATE_E2E) up"

migration-new: ## make migration-new MIGRATION_TITLE=whatever-title
	$(DB_MIGRATE) create ${MIGRATION_TITLE}"

migration-down: ## make migration-down NB_MIGRATIONS=2
	$(DB_MIGRATE) down -c ${NB_MIGRATIONS}"

populate-db:
	$(DOCKER_COMPOSE) run --rm api node src/bin/populateDb.js

clean: # Clean the build folder and stop all docker. Usage `make clean`.
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE_TEST) down
	$(DOCKER_COMPOSE_E2E) down
	$(DOCKER_COMPOSE_INSTALL) down
	rm -rf api/dist/
	rm -rf api/.pm2/
	rm -rf admin/build/
	rm -rf front/build/
	rm -rf amnesty-components/dist/
