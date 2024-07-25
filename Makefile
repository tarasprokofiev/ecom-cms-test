include .env

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(docker_bin) compose
compose_config := --env-file=./.env


check:
	$(docker_compose_bin) $(compose_config) config
up: check
	$(docker_compose_bin) $(compose_config) up -d
down:
	$(docker_compose_bin) $(compose_config) down
ps:
	$(docker_compose_bin) $(compose_config) ps -a
run:
	$(docker_compose_bin) $(compose_config) stop remix
	$(docker_compose_bin) $(compose_config) run --rm -v ./source:/app -p 3000:3000 remix bash
	$(docker_compose_bin) $(compose_config) start remix
