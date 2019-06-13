FROM node:10.12-alpine AS node

RUN apk update \
    && apk add ca-certificates --no-cache --update \
    && addgroup -S cordgroup \
    && adduser -S -G cordgroup corduser

WORKDIR /app

COPY yarn.lock /app
COPY package.json /app
COPY oauth2-server /app/oauth2-server

RUN yarn install

EXPOSE 3000

CMD ["node", "oauth2-server"]
