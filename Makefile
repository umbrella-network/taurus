include .env

REPOSITORY="$(AWS_REPOSITORY)/taurus"
TAG=`git rev-parse --short HEAD`
IMAGE="$(REPOSITORY):v$(TAG)"
DEVELOP="$(NEW_AWS_REPOSITORY)/taurus:develop"

CRED_TMP := /tmp/.credentials.tmp
DURATION := 900
AWS_REGION := us-east-2


default: build

assume:
	@aws sts assume-role --profile umb-master \
	--role-arn $(ECR_ROLE_ARN) \
	--region us-east-2 --role-session-name temp-session --duration $(DURATION) --query 'Credentials' > $(CRED_TMP)
	@aws --profile umb-central configure set aws_access_key_id $$(cat ${CRED_TMP} | jq -r '.AccessKeyId' )
	@aws --profile umb-central configure set aws_secret_access_key $$(cat ${CRED_TMP} | jq -r '.SecretAccessKey' )
	@aws --profile umb-central configure set aws_session_token $$(cat ${CRED_TMP} | jq -r '.SessionToken' )

update-stg-kubeconfig:
	@aws sts assume-role --profile umb-master \
	--role-arn $(KUBE_ROLE_ARN) \
	--region us-east-2 --role-session-name temp-session --duration $(DURATION) --query 'Credentials' > $(CRED_TMP)
	@aws --profile umb-staging configure set aws_access_key_id $$(cat ${CRED_TMP} | jq -r '.AccessKeyId' )
	@aws --profile umb-staging configure set aws_secret_access_key $$(cat ${CRED_TMP} | jq -r '.SecretAccessKey' )
	@aws --profile umb-staging configure set aws_session_token $$(cat ${CRED_TMP} | jq -r '.SessionToken' )
	@aws --profile umb-staging --region us-east-2 eks update-kubeconfig --kubeconfig ~/.kube/config-staging --name umb_staging

build-new-dev:
	@echo "## Building the docker image ##"
	@docker buildx build  --push --platform linux/amd64 -t $(DEVELOP) .


build:
	@echo "## Building the docker image ##"
	@docker build -t $(IMAGE) .

login:
	@aws ecr get-login-password  | docker login --username AWS --password-stdin $(AWS_REPOSITORY)

login-new-dev:
	@aws ecr --profile umb-central --region $(AWS_REGION) get-login-password  | docker login --username AWS --password-stdin $(NEW_AWS_REPOSITORY)


push: login
	@echo "## Pushing image to AWS ##"
	@docker push $(IMAGE)



publish-dev:
	@kubectl set image deployment/taurus taurus=$(IMAGE) --namespace dev

publish-bsc:

	@kubectl --kubeconfig ~/.kube/config-staging scale --replicas=0 deployment/frontend-taurus-bsc -n dev
	@kubectl --kubeconfig ~/.kube/config-staging scale --replicas=1 deployment/frontend-taurus-bsc -n dev



dev: build push publish-dev

dev-bsc: assume login-new-dev build-new-dev update-stg-kubeconfig publish-bsc
dev-bsc-all: dev dev-bsc
