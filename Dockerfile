FROM node:10.12-alpine AS node

#RUN apk update && apk add --no-cache --update make gcc g++ libc-dev libpng-dev automake autoconf libtool
#RUN npm i webpack webpack-cli -g

WORKDIR /app
COPY package.json  /app/

RUN npm i

COPY . /app/

RUN npm run build:ssr

CMD node ./dist/ssr-mat/server

EXPOSE 8080
