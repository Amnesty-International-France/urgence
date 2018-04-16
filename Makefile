export UID=$(shell id -u)
export GID=$(shell id -g)

DOCKER_COMPOSE = docker-compose -p reaction-rapide

install:
	yarn
	$(DOCKER_COMPOSE) run --rm --no-deps api bash -ci 'yarn'

start:
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

connect-api:
	$(DOCKER_COMPOSE) exec api bash -ci 'yarn'
