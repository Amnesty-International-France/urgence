export UID=$(shell id -u)
export GID=$(shell id -g)

DOCKER_COMPOSE = docker-compose -p reaction-rapide

install:
	yarn
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
