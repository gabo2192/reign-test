# Use the official Node.js 14 Alpine image from https://hub.docker.com/_/node.
# Using an image with specific version tags allow deterministic builds.
FROM node:14.17.4 AS builder

RUN mkdir -p /usr/src/app

# Create and change to the app directory.
WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./yarn.lock ./
COPY ./client ./client
COPY ./server ./server

RUN yarn install
RUN yarn workspace server build
RUN yarn workspace client build

CMD ["yarn", "start:prod"]