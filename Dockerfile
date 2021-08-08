# Use the official Node.js 14 Alpine image from https://hub.docker.com/_/node.
FROM node:lts-alpine3.11 AS builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./yarn.lock ./
COPY ./client ./client
COPY ./server ./server

RUN yarn install
RUN yarn workspace server build
RUN yarn workspace client build

CMD ["yarn", "start:prod"]