include .env

REPOSITORY="$(AWS_REPOSITORY)/taurus"
TAG=`git rev-parse --short HEAD`
IMAGE="$(REPOSITORY):v$(TAG)"

default: build

build:
	@echo "## Building the docker image ##"
	@docker build -t $(IMAGE) .

buildm1:
	@echo "## Building the docker image ##"
	@docker buildx build --platform linux/amd64 -t $(IMAGE) .

login:
	@aws ecr get-login-password  | docker login --username AWS --password-stdin $(AWS_REPOSITORY)

push: login
	@echo "## Pushing image to AWS ##"
	@docker push $(IMAGE)

publish:
	@kubectl set image deployment/taurus taurus=$(IMAGE)

publish-staging:
	@kubectl set image deployment/taurus taurus=$(IMAGE) --namespace staging

publish-dev:
	@kubectl set image deployment/taurus taurus=$(IMAGE) --namespace dev

deploy: build push publish

stage: build push publish-staging

dev: build push publish-dev

dev-m1: buildm1 push publish-dev
