FROM node:14-alpine

LABEL image by 'Anderson Noguez'
LABEL version="1.0"

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /srv

RUN apk add --no-cache bash

# install dependencies
RUN npm install -g nodemon 