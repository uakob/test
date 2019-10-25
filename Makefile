start: ## run using env
	cp .env.example .env
	docker-compose -f docker-compose.yml up --build --force-recreate --remove-orphans redis redis_proxy nginx

e2e: ## test using different container
	cp .env.example .env
	docker-compose -f docker-compose.yml up --build --force-recreate --remove-orphans test

build: ## build docker image
	docker build . --no-cache --tag=test

run: ## run docker container
	cp .env.example .env
	docker run --env-file=.env -p 80:80/tcp test:latest
