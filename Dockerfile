FROM node:16.3.0-alpine3.11 as build-stage

ARG REACT_APP_BLOCKS_API
ARG REACT_APP_SCAN_URL
ARG REACT_APP_TOKEN_AUTH
ARG REACT_APP_FOREIGN_CHAIN_ID

RUN apk add --no-cache git

WORKDIR /app

COPY package*.json yarn.lock /app/

RUN yarn install

COPY ./ /app/

RUN yarn build

FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
