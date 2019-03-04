FROM node:10.10-alpine AS node

RUN apk update && apk add --no-cache --update ca-certificates
#RUN npm i webpack webpack-cli -g

ENV PORT=8080

WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn

COPY . /app/

RUN yarn release

EXPOSE 8080

CMD node ./dist/ssr-mat/server
