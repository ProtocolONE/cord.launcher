FROM node:11.12-alpine AS node

#RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool
#RUN npm i webpack webpack-cli -g

ENV PORT=8080

WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn 

COPY . /app/

RUN yarn build:ssr

EXPOSE 8080

CMD node ./dist/ssr-mat/server
