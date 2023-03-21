export UID=$(shell id -u)
export GID=$(shell id -g)

default: help

help: ## SOS? Usage make help (default).
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | gawk 'match($$0, /(makefile:)?(.*):.*?## (.*)/, a) {printf "\033[36m%-30s\033[0m %s\n", a[2], a[3]}'

#### STARTING ###

DOCKER_COMPOSE = docker compose -p reaction-rapide

install: ## Install all dependencies. Usage `make install`.
	$(DOCKER_COMPOSE) run --rm --no-deps next touch ok.ok

start: ## Start the project with docker. Usage `make start`.
	$(DOCKER_COMPOSE) up -d

stop: ## Stop the project with docker. Usage `make stop`.
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

connect:
	$(DOCKER_COMPOSE) exec next bash

#---------------
# Documentation
#---------------
doc-logs: ## View doc site logs
	@$(DOCKER_COMPOSE) logs -f documentation

doc-connect: ## Connection to the documentation container
	@$(DOCKER_COMPOSE) exec documentation bash

doc-new-adr: ## Create a new ADR
	@$(DOCKER_COMPOSE) run --rm --no-deps documentation bash -ci '\
		cd /documentation && ./new-adr.sh'

doc-new-doc: ## Create a new document
	@$(DOCKER_COMPOSE) run --rm --no-deps documentation bash -ci '\
		cd /documentation && ./new-docs.sh'

doc-generate: ## Génération des fichier statique de documentation
	@$(DOCKER_COMPOSE) run --rm --no-deps documentation bash -ci '\
		cd /documentation && hugo'
