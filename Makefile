export UID=$(shell id -u)
export GID=$(shell id -g)

DOCKER_COMPOSE = docker-compose -p reaction-rapide -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_TEST = docker-compose -p reaction-rapide-test -f docker-compose.yml -f docker-compose.test.yml

install:
	yarn
	mkdir -p var/data # we can't commit it as PostGres wants an empty folder
	$(DOCKER_COMPOSE) run --rm --no-deps api bash -ci 'yarn'
	$(DOCKER_COMPOSE) run --rm --no-deps front bash -ci 'yarn'

start:
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

connect-api:
	$(DOCKER_COMPOSE) exec api bash -ci 'yarn'

psql:
	$(DOCKER_COMPOSE) exec db sh -c "psql --host=localhost --username=amnesty reaction-rapide"

test:
	$(MAKE) migration-test
	$(DOCKER_COMPOSE_TEST) run --rm api yarn test ; $(DOCKER_COMPOSE_TEST) stop

test-watch:
	$(MAKE) migration-test
	$(DOCKER_COMPOSE_TEST) run --rm api yarn run test-watch

DB_MIGRATE = $(DOCKER_COMPOSE) run --rm api sh -c "./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

DB_MIGRATE_TEST = $(DOCKER_COMPOSE_TEST) run --rm api sh -c "./node_modules/.bin/db-migrate \
	--config=database.js \
	--migrations-dir=migrations \
	-e api

migration:
	$(DB_MIGRATE) up"

migration-new: ## make create-migration MIGRATION_TITLE=whatever-title
	$(DB_MIGRATE) create ${MIGRATION_TITLE}"

migration-down: ## make create-migration NB_MIGRATIONS=2
	$(DB_MIGRATE) down -c ${NB_MIGRATIONS}"

migration-test:
	mkdir -p var/data-test # we can't commit it as PostGres wants an empty folder
	$(DB_MIGRATE_TEST) up"
	sleep 1

populate-db:
	$(DOCKER_COMPOSE) run --rm api bash -ci 'node src/bin/populateDb.js'
