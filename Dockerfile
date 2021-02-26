FROM node:14.8.0 as build-stage

ARG REACT_APP_BLOCKS_API
ARG REACT_APP_SCAN_URL
ARG REACT_APP_PROVIDER_URL
ARG REACT_APP_CONTRACT_REGISTRY_ADDRESS
ARG REACT_APP_TOKEN_AUTH
ARG REACT_APP_SHOULD_FALLBACK

WORKDIR /app

COPY package*.json /app/

RUN yarn install

COPY ./ /app/

RUN yarn build

FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
