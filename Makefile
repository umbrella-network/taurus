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

###########  ETH  ##########
# DEV
build-s3-dev-eth: export REACT_APP_BLOCKS_API=$(DEV_ETH_REACT_APP_BLOCKS_API)
build-s3-dev-eth: export REACT_APP_SCAN_URL=$(DEV_ETH_REACT_APP_SCAN_URL)
build-s3-dev-eth: export REACT_APP_TOKEN_AUTH=$(DEV_ETH_REACT_APP_TOKEN_AUTH)
build-s3-dev-eth: export REACT_APP_FOREIGN_CHAIN_ID=$(DEV_ETH_REACT_APP_FOREIGN_CHAIN_ID)
build-s3-dev-eth: export REACT_APP_SHOULD_FALLBACK=$(DEV_ETH_REACT_APP_SHOULD_FALLBACK)
build-s3-dev-eth:
	@echo "## Building ETH DEV Environment ##"
	@yarn install
	@yarn build

dev-s3-eth-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(ETH_S3) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(ETH_S3) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(ETH_CLOUDFRONT) --no-cli-pager > /dev/null

# SBX
build-s3-sbx-eth: export REACT_APP_BLOCKS_API=$(SBX_ETH_REACT_APP_BLOCKS_API)
build-s3-sbx-eth: export REACT_APP_SCAN_URL=$(SBX_ETH_REACT_APP_SCAN_URL)
build-s3-sbx-eth: export REACT_APP_TOKEN_AUTH=$(SBX_ETH_REACT_APP_TOKEN_AUTH)
build-s3-sbx-eth: export REACT_APP_FOREIGN_CHAIN_ID=$(SBX_ETH_REACT_APP_FOREIGN_CHAIN_ID)
build-s3-sbx-eth: export REACT_APP_SHOULD_FALLBACK=$(SBX_ETH_REACT_APP_SHOULD_FALLBACK)
build-s3-sbx-eth:
	@echo "## Building ETH SBX Environment ##"
	@yarn install
	@yarn build

sbx-s3-eth-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(ETH_S3_SBX) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(ETH_S3_SBX) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(ETH_CLOUDFRONT_SBX) --no-cli-pager > /dev/null

###########  BSC  ##########
# DEV
build-s3-dev-bsc: export REACT_APP_BLOCKS_API=$(DEV_BSC_REACT_APP_BLOCKS_API)
build-s3-dev-bsc: export REACT_APP_SCAN_URL=$(DEV_BSC_REACT_APP_SCAN_URL)
build-s3-dev-bsc: export REACT_APP_TOKEN_AUTH=$(DEV_BSC_REACT_APP_TOKEN_AUTH)
build-s3-dev-bsc: export REACT_APP_SHOULD_FALLBACK=$(DEV_BSC_REACT_APP_SHOULD_FALLBACK)
build-s3-dev-bsc:
	@echo "## Building BSC DEV Environment ##"
	@yarn install
	@yarn build

dev-s3-bsc-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(BSC_S3) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(BSC_S3) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(BSC_CLOUDFRONT) --no-cli-pager > /dev/null

# SBX
build-s3-sbx-bsc: export REACT_APP_BLOCKS_API=$(SBX_BSC_REACT_APP_BLOCKS_API)
build-s3-sbx-bsc: export REACT_APP_SCAN_URL=$(SBX_BSC_REACT_APP_SCAN_URL)
build-s3-sbx-bsc: export REACT_APP_TOKEN_AUTH=$(SBX_BSC_REACT_APP_TOKEN_AUTH)
build-s3-sbx-bsc: export REACT_APP_SHOULD_FALLBACK=$(SBX_BSC_REACT_APP_SHOULD_FALLBACK)
build-s3-sbx-bsc:
	@echo "## Building BSC SBX Environment ##"
	@yarn install
	@yarn build

sbx-s3-bsc-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(BSC_S3_SBX) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(BSC_S3_SBX) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(BSC_CLOUDFRONT_SBX) --no-cli-pager > /dev/null

###########  POLYGON  ##########
# DEV
build-s3-dev-polygon: export REACT_APP_BLOCKS_API=$(DEV_POLYGON_REACT_APP_BLOCKS_API)
build-s3-dev-polygon: export REACT_APP_SCAN_URL=$(DEV_POLYGON_REACT_APP_SCAN_URL)
build-s3-dev-polygon: export REACT_APP_TOKEN_AUTH=$(DEV_POLYGON_REACT_APP_TOKEN_AUTH)
build-s3-dev-polygon: export REACT_APP_FOREIGN_CHAIN_ID=$(DEV_POLYGON_REACT_APP_FOREIGN_CHAIN_ID)
build-s3-dev-polygon: export REACT_APP_SHOULD_FALLBACK=$(DEV_POLYGON_REACT_APP_SHOULD_FALLBACK)
build-s3-dev-polygon:
	@echo "## Building POLYGON DEV Environment ##"
	@yarn install
	@yarn build

dev-s3-polygon-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(POLYGON_S3) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(POLYGON_S3) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(POLYGON_CLOUDFRONT) --no-cli-pager > /dev/null

# SBX
build-s3-sbx-polygon: export REACT_APP_BLOCKS_API=$(SBX_POLYGON_REACT_APP_BLOCKS_API)
build-s3-sbx-polygon: export REACT_APP_SCAN_URL=$(SBX_POLYGON_REACT_APP_SCAN_URL)
build-s3-sbx-polygon: export REACT_APP_TOKEN_AUTH=$(SBX_POLYGON_REACT_APP_TOKEN_AUTH)
build-s3-sbx-polygon: export REACT_APP_FOREIGN_CHAIN_ID=$(SBX_POLYGON_REACT_APP_FOREIGN_CHAIN_ID)
build-s3-sbx-polygon: export REACT_APP_SHOULD_FALLBACK=$(SBX_POLYGON_REACT_APP_SHOULD_FALLBACK)
build-s3-sbx-polygon:
	@echo "## Building POLYGON SBX Environment ##"
	@yarn install
	@yarn build

sbx-s3-polygon-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(POLYGON_S3_SBX) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(POLYGON_S3_SBX) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(POLYGON_CLOUDFRONT_SBX) --no-cli-pager > /dev/null

###########  AVALANCHE  ##########
# DEV
build-s3-dev-avalanche: export REACT_APP_BLOCKS_API=$(DEV_AVAX_REACT_APP_BLOCKS_API)
build-s3-dev-avalanche: export REACT_APP_SCAN_URL=$(DEV_AVAX_REACT_APP_SCAN_URL)
build-s3-dev-avalanche: export REACT_APP_TOKEN_AUTH=$(DEV_AVAX_REACT_APP_TOKEN_AUTH)
build-s3-dev-avalanche: export REACT_APP_FOREIGN_CHAIN_ID=$(DEV_AVAX_REACT_APP_FOREIGN_CHAIN_ID)
build-s3-dev-avalanche: export REACT_APP_SHOULD_FALLBACK=$(DEV_AVAX_REACT_APP_SHOULD_FALLBACK)
build-s3-dev-avalanche:
	@echo "## Building AVAX DEV Environment ##"
	@yarn install
	@yarn build

dev-s3-avalanche-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(AVALANCHE_S3) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(AVALANCHE_S3) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(AVALANCHE_CLOUDFRONT) --no-cli-pager > /dev/null

# SBX
build-s3-sbx-avalanche: export REACT_APP_BLOCKS_API=$(SBX_AVAX_REACT_APP_BLOCKS_API)
build-s3-sbx-avalanche: export REACT_APP_SCAN_URL=$(SBX_AVAX_REACT_APP_SCAN_URL)
build-s3-sbx-avalanche: export REACT_APP_TOKEN_AUTH=$(SBX_AVAX_REACT_APP_TOKEN_AUTH)
build-s3-sbx-avalanche: export REACT_APP_FOREIGN_CHAIN_ID=$(SBX_AVAX_REACT_APP_FOREIGN_CHAIN_ID)
build-s3-sbx-avalanche: export REACT_APP_SHOULD_FALLBACK=$(SBX_AVAX_REACT_APP_SHOULD_FALLBACK)
build-s3-sbx-avalanche:
	@echo "## Building AVAX SBX Environment ##"
	@yarn install
	@yarn build

sbx-s3-avalanche-sync:
	@aws --profile umb-staging s3 sync build/ s3://$(AVALANCHE_S3_SBX) --cache-control "max-age=86400" --delete --only-show-errors
	@aws --profile umb-staging s3 cp build/index.html s3://$(AVALANCHE_S3_SBX) --cache-control "no-cache, no-store, must-revalidate"
	@aws --profile umb-staging cloudfront create-invalidation --paths "/*" --distribution-id $(AVALANCHE_CLOUDFRONT_SBX) --no-cli-pager > /dev/null

#################################

dev-eth-deploy: build-s3-dev-eth dev-s3-eth-sync
dev-bsc-deploy: build-s3-dev-bsc dev-s3-bsc-sync
dev-polygon-deploy: build-s3-dev-polygon dev-s3-polygon-sync
dev-avax-deploy: build-s3-dev-avalanche dev-s3-avalanche-sync

sbx-eth-deploy: build-s3-sbx-eth sbx-s3-eth-sync
sbx-bsc-deploy: build-s3-sbx-bsc sbx-s3-bsc-sync
sbx-polygon-deploy: build-s3-sbx-polygon sbx-s3-polygon-sync
sbx-avax-deploy: build-s3-sbx-avalanche sbx-s3-avalanche-sync

dev-eth: update-stg dev-eth-deploy
dev-bsc: update-stg dev-bsc-deploy
dev-polygon: update-stg dev-polygon-deploy
dev-avax: update-stg dev-avax-deploy

sbx-eth: update-stg sbx-eth-deploy
sbx-bsc: update-stg sbx-bsc-deploy
sbx-polygon: update-stg sbx-polygon-deploy
sbx-avax: update-stg sbx-avax-deploy

dev: update-stg dev-eth-deploy dev-bsc-deploy dev-polygon-deploy dev-avax-deploy
sbx: update-stg sbx-eth-deploy sbx-bsc-deploy sbx-polygon-deploy sbx-avax-deploy