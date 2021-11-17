include .env

TAG=`git rev-parse --short HEAD`


CRED_TMP := /tmp/.credentials.tmp
DURATION := 900
AWS_REGION := us-east-2
ETH_CLOUDFRONT := E2J1Z3UVJ0WBNS
BSC_CLOUDFRONT := E1Q0XCIKYCHTHZ
POLYGON_CLOUDFRONT := E11BELZ5J30GNQ
AVALANCHE_CLOUDFRONT := E347ZEGY5LMWML
ETH_CLOUDFRONT_SBX := E2XOPE0XC4MDU
BSC_CLOUDFRONT_SBX := E2WE2QUJJKY66W
POLYGON_CLOUDFRONT_SBX := EAKFTNX7JS1M0
AVALANCHE_CLOUDFRONT_SBX := E14OL2UN2WZFUE
ETH_S3 := umb-taurus-eth-frontend-app
BSC_S3 := umb-taurus-bsc-frontend-app
POLYGON_S3 := umb-taurus-polygon-frontend-app
AVALANCHE_S3 := umb-taurus-avalanche-frontend-app
ETH_S3_SBX := umb-taurus-eth-sbx-frontend-app
BSC_S3_SBX := umb-taurus-bsc-sbx-frontend-app
POLYGON_S3_SBX := umb-taurus-polygon-sbx-frontend-app
AVALANCHE_S3_SBX := umb-taurus-avalanche-sbx-frontend-app

default: dev-eth

update-stg:
	@aws sts assume-role --profile umb-master \
	--role-arn $(KUBE_ROLE_ARN) \
	--region us-east-2 --role-session-name temp-session --duration $(DURATION) --query 'Credentials' > $(CRED_TMP)
	@aws --profile umb-staging configure set aws_access_key_id $$(cat ${CRED_TMP} | jq -r '.AccessKeyId' )
	@aws --profile umb-staging configure set aws_secret_access_key $$(cat ${CRED_TMP} | jq -r '.SecretAccessKey' )
	@aws --profile umb-staging configure set aws_session_token $$(cat ${CRED_TMP} | jq -r '.SessionToken' )


build-s3:
	@yarn install
	@yarn build

dev-s3-eth-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(ETH_S3) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(ETH_S3) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(ETH_CLOUDFRONT) --no-cli-pager > /dev/null

sbx-s3-eth-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(ETH_S3_SBX) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(ETH_S3_SBX) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(ETH_CLOUDFRONT_SBX) --no-cli-pager > /dev/null

dev-s3-bsc-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(BSC_S3) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(BSC_S3) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(BSC_CLOUDFRONT) --no-cli-pager > /dev/null

sbx-s3-bsc-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(BSC_S3_SBX) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(BSC_S3_SBX) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(BSC_CLOUDFRONT_SBX) --no-cli-pager > /dev/null

dev-s3-polygon-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(POLYGON_S3) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(POLYGON_S3) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(POLYGON_CLOUDFRONT) --no-cli-pager > /dev/null

sbx-s3-polygon-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(POLYGON_S3_SBX) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(POLYGON_S3_SBX) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(POLYGON_CLOUDFRONT_SBX) --no-cli-pager > /dev/null

dev-s3-avalanche-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(AVALANCHE_S3) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(AVALANCHE_S3) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(AVALANCHE_CLOUDFRONT) --no-cli-pager > /dev/null

sbx-s3-avalanche-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(AVALANCHE_S3_SBX) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(AVALANCHE_S3_SBX) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(AVALANCHE_CLOUDFRONT_SBX) --no-cli-pager > /dev/null

dev-eth: build-s3 update-stg dev-s3-eth-sync
dev-bsc: build-s3 update-stg dev-s3-bsc-sync
dev-polygon: build-s3 update-stg dev-s3-polygon-sync
dev-avax: build-s3 update-stg dev-s3-avalanche-sync

sbx-eth: build-s3 update-stg sbx-s3-eth-sync
sbx-bsc: build-s3 update-stg sbx-s3-bsc-sync
sbx-polygon: build-s3 update-stg sbx-s3-polygon-sync
sbx-avax: build-s3 update-stg sbx-s3-avalanche-sync